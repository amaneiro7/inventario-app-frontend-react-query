import { useCallback, useMemo, useState } from 'react'
import { useGetAllPermissions } from '../hooks/useGetAllPermission'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '@/shared/ui/TransferList/TransferListItem'
import { type PermissionDto } from '../../domain/dto/Permission.dto'

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
export function PermissionTransferList({
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
	const [inputValue, setInputValue] = useState('')
	const { data: allPermissions, isLoading: loading } = useGetAllPermissions({})

	const availableOptions = useMemo(
		() =>
			allPermissions?.data?.filter(Permission => !permissions.includes(Permission.id)) ?? [],
		[allPermissions, permissions]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddPermission = useCallback(
		(permissionId: string) => {
			onAddPermission('addPermission', permissionId)
		},
		[onAddPermission]
	)

	const handleRemovePermission = useCallback(
		(permissionId: string) => {
			onRemovePermission('removePermission', permissionId)
		},
		[onRemovePermission]
	)

	return (
		<div className="grid items-start justify-between gap-4 md:grid-cols-2">
			<Combobox
				id="permissionId"
				label="Permisos"
				value=""
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
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
					<ul role="options" className="flex w-full flex-col rounded">
						{permissions.map(permissionId => {
							const permiso = allPermissions?.data?.find(c => c.id === permissionId)
							return (
								<TransferListItem
									key={permissionId}
									isLoading={isLoading}
									id={permissionId}
									name={permiso?.name}
									onRemove={handleRemovePermission}
								/>
							)
						})}
					</ul>
				) : (
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado permisos.
					</Typography>
				)}
			</div>
		</div>
	)
}
