import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type AccessPolicyErrors,
	type Action,
	type DefaultAccessPolicy
} from '@/entities/accessControl/accessPolicy/infra/reducers/accessPolicyFormReducer'
import { PermissionGroupTrasnferList } from '@/features/permissions-group-transfer-list/ui/PermissionGroupTrasnferList'

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
const DepartamentoCombobox = lazy(() =>
	import('@/entities/employee/departamento/infra/ui/DepartamentoComboBox').then(m => ({
		default: m.DepartamentoCombobox
	}))
)

const VicepresidenciaCombobox = lazy(() =>
	import('@/entities/employee/vicepresidencia/infra/ui/VicepresidenciaComboBox').then(m => ({
		default: m.VicepresidenciaCombobox
	}))
)
const VicepresidenciaEjecutivaCombobox = lazy(() =>
	import(
		'@/entities/employee/vicepresidenciaEjecutiva/infra/ui/VicepresidenciaEjecutivaComboBox'
	).then(m => ({
		default: m.VicepresidenciaEjecutivaCombobox
	}))
)
const DirectivaCombobox = lazy(() =>
	import('@/entities/employee/directiva/infra/ui/DirectivaComboBox').then(m => ({
		default: m.DirectivaCombobox
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
					<DirectivaCombobox
						value={formData.directivaId ?? ''}
						handleChange={(_name, value) =>
							handleChange('directivaId', value as string)
						}
						name="directivaId"
						isLoading={isLoading}
						readonly={!canEdit}
					/>
				</div>
				<div className="gap-4 md:flex md:flex-row">
					<VicepresidenciaEjecutivaCombobox
						value={formData.vicepresidenciaEjecutivaId ?? ''}
						directivaId={formData.directivaId ?? ''}
						handleChange={(_name, value) =>
							handleChange('vicepresidenciaEjecutivaId', value as string)
						}
						name="vicepresidenciaEjecutivaId"
						isLoading={isLoading}
						readonly={!canEdit}
					/>
					<VicepresidenciaCombobox
						value={formData.vicepresidenciaId ?? ''}
						directivaId={formData.directivaId ?? ''}
						vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId ?? ''}
						handleChange={(_name, value) =>
							handleChange('vicepresidenciaId', value as string)
						}
						name="vicepresidenciaId"
						isLoading={isLoading}
						readonly={!canEdit}
					/>
				</div>
				<div className="gap-4 md:flex md:flex-row">
					<DepartamentoCombobox
						value={formData.departamentoId ?? ''}
						handleChange={(_name, value) =>
							handleChange('departamentoId', value as string)
						}
						name="departamentoId"
						directivaId={formData.directivaId ?? ''}
						vicepresidenciaId={formData.vicepresidenciaId ?? ''}
						vicepresidenciaEjecutivaId={formData.vicepresidenciaEjecutivaId ?? ''}
						isLoading={isLoading}
						readonly={!canEdit}
					/>
					<CargoCombobox
						value={formData.cargoId ?? ''}
						handleChange={(_name, value) => handleChange('cargoId', value as string)}
						name="cargoId"
						departamentoId={formData.departamentoId ?? ''}
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
