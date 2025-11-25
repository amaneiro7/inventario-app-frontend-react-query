import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type AccessPolicyErrors,
	type Action,
	type DefaultAccessPolicy
} from '@/entities/accessControl/accessPolicy/infra/reducers/accessPolicyFormReducer'

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
const PermissionGroupCombobox = lazy(() =>
	import('@/entities/accessControl/permissionGroup/infra/ui/PermissionGroupComboBox').then(m => ({
		default: m.PermissionGroupCombobox
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
				<DepartamentoCombobox
					value={formData.departamentoId ?? ''}
					handleChange={(_name, value) => handleChange('departamentoId', value as string)}
					name="departamentoId"
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
				<PermissionGroupCombobox
					value={formData.permissionGroupId ?? ''}
					handleChange={(_name, value) =>
						handleChange('permissionGroupId', value as string)
					}
					name="permissionGroupId"
					isLoading={isLoading}
					readonly={!canEdit}
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
			</>
		)
	}
)

AccessPolicyInputs.displayName = 'AccessPolicyInputs'
