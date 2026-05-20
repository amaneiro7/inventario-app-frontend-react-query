import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type AccessPolicyErrors,
	type Action,
	type DefaultAccessPolicy
} from '@/entities/accessControl/accessPolicy/infra/reducers/accessPolicyFormReducer'
import { PermissionGroupTrasnferList } from '@/features/permissions-group-transfer-list/ui/PermissionGroupTransferList'

const RoleCombobox = lazy(() =>
	import('@/entities/role/infra/ui/RoleComboBox').then(m => ({
		default: m.RoleCombobox
	}))
)

const CargoCombobox = lazy(() =>
	import('@/entities/employee/cargo/infra/ui/CargoComboBox').then(m => ({
		default: m.CargoCombobox
	}))
)
const UnidadCombobox = lazy(() =>
	import('@/entities/employee/unidad/infra/ui/UnidadComboBox').then(m => ({
		default: m.UnidadCombobox
	}))
)

interface AccessPolicyInputsProps {
	formData: DefaultAccessPolicy
	errors?: AccessPolicyErrors
	isLoading: boolean
	canEdit?: boolean
	handleChange: (name: Action['type'], value: string | number) => void
}

export const AccessPolicyInputs = memo(
	({ errors, canEdit, isLoading, formData, handleChange }: AccessPolicyInputsProps) => {
		return (
			<>
				<div className="gap-4 md:flex md:flex-row">
					<Input
						id="access-policy-name"
						value={formData.name}
						name="name"
						label="Nombre de la política de acceso"
						isLoading={isLoading}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('name', e.target.value)
						}
						error={!!errors?.name}
						errorMessage={errors?.name}
						required
						readOnly={!canEdit}
					/>
					<Input
						id="access-policy-priority"
						value={formData.priority}
						name="priority"
						label="Prioridad"
						type="number"
						isLoading={isLoading}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('priority', Number(e.target.value))
						}
						error={!!errors?.priority}
						errorMessage={errors?.priority}
						required
						readOnly={!canEdit}
					/>
				</div>
				<div className="gap-4 md:flex md:flex-row">
					<RoleCombobox
						value={formData.roleId ?? ''}
						handleChange={(_name, value) => handleChange('roleId', value as string)}
						name="roleId"
						isLoading={isLoading}
						readonly={!canEdit}
					/>
					<UnidadCombobox
						value={formData.unidadId ?? ''}
						handleChange={(_name, value) => handleChange('unidadId', value as string)}
						name="unidadId"
						method="search"
						isLoading={isLoading}
						readonly={!canEdit}
					/>
				</div>

				<div className="gap-4 md:flex md:flex-row">
					<CargoCombobox
						value={formData.cargoId ?? ''}
						handleChange={(_name, value) => handleChange('cargoId', value as string)}
						name="cargoId"
						unidadId={formData.unidadId ?? ''}
						isLoading={isLoading}
						readonly={!canEdit}
					/>
				</div>

				<PermissionGroupTrasnferList
					isLoading={isLoading}
					value={formData.permissionGroupIds}
					name="permissions"
					readonly={!canEdit}
					onAddPermissionGroup={handleChange}
					onRemovePermissionGroup={handleChange}
				/>
			</>
		)
	}
)

AccessPolicyInputs.displayName = 'AccessPolicyInputs'
