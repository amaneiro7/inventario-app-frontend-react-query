import { memo } from 'react'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '@/shared/ui/TransferList/TransferListItem'
import { usePermissionTransferList } from '../model/usePermissionTransferList'
import { type PermissionDto } from '../../../entities/accessControl/permission/domain/dto/Permission.dto'
import { GroupedTransferList } from './GroupedTransferList'

interface PermissionTransferListProps {
	value?: PermissionDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	onAddPermission: (name: 'addPermission', value: string) => void
	onRemovePermission: (name: 'removePermission', value: string) => void
}

/**
 * `PermissionTransferList`
 * @component
 * @description Componente que permite añadir y eliminar categorías de una lista.
 * Utiliza un `Combobox` para seleccionar categorías disponibles y muestra las seleccionadas en una lista.
 * @param {object} props - Las propiedades del componente.
 * @param {PermissionDto['id'][]} [props.value=[]] - Un array de IDs de categorías seleccionadas.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {boolean} [props.readonly=false] - Indica si el campo es de solo lectura.
 * @param {(name: 'addPermission', value: string) => void} props.onAddPermission - Función de callback para añadir una categoría.
 * @param {(name: 'removePermission', value: string) => void} props.onRemovePermission - Función de callback para eliminar una categoría.
 */
export const PermissionTransferList = memo(function PermissionTransferList({
	value: permissions = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	onAddPermission,
	onRemovePermission
}: PermissionTransferListProps) {
	const {
		filteredOptions,
		groupedPermissions,
		inputValue,
		loading,
		handleAddPermission,
		handleRemovePermission,
		setInputValue
	} = usePermissionTransferList({
		permissions,
		onAddPermission,
		onRemovePermission
	})

	console.log('Rendering PermissionTransferList', groupedPermissions)

	return (
		<div className="grid items-start justify-between gap-4 md:grid-cols-2">
			<Combobox
				id="permissionId"
				label="Permisos"
				value=""
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled || readonly}
				error={!!error}
				errorMessage={error}
				loading={loading}
				isLoading={isLoading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={(_name, value) => handleAddPermission(value)}
				readOnly={readonly}
			/>
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					Permisos Seleccionados
				</Typography>
				{permissions.length > 0 ? (
					<div className="w-full rounded-b">
						{Object.entries(groupedPermissions).map(
							([groupName, permissionsInGroup]) => (
								<GroupedTransferList
									key={groupName}
									title={`${groupName} (${permissionsInGroup.length})`}
								>
									{permissionsInGroup.map(permission => (
										<TransferListItem
											key={permission.id}
											isLoading={isLoading}
											id={permission.id}
											name={permission.name}
											description={permission.description}
											onRemove={handleRemovePermission}
											readOnly={readonly}
										/>
									))}
								</GroupedTransferList>
							)
						)}
					</div>
				) : (
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado permisos.
					</Typography>
				)}
			</div>
		</div>
	)
})
