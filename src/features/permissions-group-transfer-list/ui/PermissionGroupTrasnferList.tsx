import { PermissionGroupDto } from '@/entities/accessControl/permissionGroup/domain/dto/PermissionGroup.dto'
import { memo } from 'react'
import { usePermissionsGroupsTransferList } from '../model/usePermissionGroupTransferList'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '@/shared/ui/TransferList/TransferListItem'

interface PermissionGroupTransferListProps {
	value?: PermissionGroupDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	onAddPermissionGroup: (name: 'addPermissionGroup', value: string) => void
	onRemovePermissionGroup: (name: 'removePermissionGroup', value: string) => void
}

export const PermissionGroupTrasnferList = memo(
	({
		value: permissionsGroups = [],
		name,
		error = '',
		required = false,
		disabled = false,
		readonly = false,
		isLoading = false,
		onAddPermissionGroup,
		onRemovePermissionGroup
	}: PermissionGroupTransferListProps) => {
		const {
			filteredOptions,
			inputValue,
			loading,
			allPermissionsGroups,
			handleAddPermissionsGroups,
			handleRemovePermissionsGroups,
			setInputValue
		} = usePermissionsGroupsTransferList({
			permissionsGroups,
			onAddPermissionGroup,
			onRemovePermissionGroup
		})

		return (
			<div className="grid items-start justify-between gap-4 md:grid-cols-2">
				<Combobox
					id="permissionGroupId"
					label="Grupo de Permisos"
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
					onChangeValue={(_name, value) => handleAddPermissionsGroups(value)}
					readOnly={readonly}
				/>
				<div className="rounded shadow-lg shadow-slate-400">
					<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
						Grupos de Permisos Seleccionados
					</Typography>
					{permissionsGroups.length > 0 ? (
						<ul role="options" className="flex w-full flex-col rounded">
							{permissionsGroups.map(permissionGroupId => {
								const permissionGroup = allPermissionsGroups?.data?.find(
									pg => pg.id === permissionGroupId
								)
								return (
									<TransferListItem
										key={permissionGroupId}
										isLoading={isLoading}
										id={permissionGroupId}
										name={permissionGroup?.name}
										readOnly={readonly}
										onRemove={handleRemovePermissionsGroups}
									/>
								)
							})}
						</ul>
					) : (
						<Typography className="p-2" variant="p" color="gris">
							No se han seleccionado grupos de permisos.
						</Typography>
					)}
				</div>
			</div>
		)
	}
)

PermissionGroupTrasnferList.displayName = 'PermissionGroupTrasnferList'
