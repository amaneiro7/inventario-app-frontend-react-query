import { memo, lazy, Suspense } from 'react'
import Button from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/icon/Icon'
import Typography from '@/shared/ui/Typography'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'
import { type DefaultUsers } from '@/entities/user/infra/reducers/usersFormReducer'

const RoleCombobox = lazy(() =>
	import('@/entities/role/infra/ui/RoleComboBox').then(m => ({ default: m.RoleCombobox }))
)
const EmployeeCombobox = lazy(() =>
	import('@/entities/employee/employee/infra/ui/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)

interface UserRegisterFormProps {
	formData: DefaultUsers
	handleSubmit: (event: React.FormEvent<Element>) => Promise<void>
	handleChange: (
		name: 'name' | 'employeeId' | 'roleId' | 'reset' | 'lastName' | 'email' | 'init',
		value: any
	) => void
	formId: string
	isSaving: boolean
	openCreateConfirmation: () => void
}

export const UserRegisterForm = memo(
	({
		formData,
		formId,
		handleChange,
		handleSubmit,
		isSaving,
		openCreateConfirmation
	}: UserRegisterFormProps) => {
		return (
			<form id={formId} onSubmit={handleSubmit} method="post" className="space-y-6 p-6 pt-0">
				{/* Paso 1: Seleccionar Empleado */}
				<div>
					<Typography weight="medium" color="gray-600" variant="h6" className="mb-2">
						1. Seleccionar Empleado
					</Typography>
					<Suspense fallback={<InputFallback />}>
						<EmployeeCombobox
							value={formData.employeeId ?? ''}
							handleChange={(_name, value) => handleChange('employeeId', value)}
							name="employeeId"
							label="Empleados"
							required
							disabled={isSaving}
						/>
					</Suspense>
				</div>

				{/* Paso 2: Asignar Rol */}
				<div>
					<Typography weight="medium" color="gray-600" variant="h6" className="mb-2">
						2. Asignar Rol de Servicio
					</Typography>
					<Suspense fallback={<InputFallback />}>
						<RoleCombobox
							value={formData.roleId}
							handleChange={(_name, value) => handleChange('roleId', value)}
							name="roleId"
							label="Roles"
							readonly={!formData.employeeId}
							required
						/>
					</Suspense>
				</div>

				{/* Botón de Acción */}
				<div className="flex justify-end pt-4">
					<Button
						text={isSaving ? 'Creando...' : 'Crear Usuario'}
						size="content"
						buttonSize="medium"
						color="green"
						type="button"
						onClick={openCreateConfirmation}
						disabled={!formData.employeeId || !formData.roleId || isSaving}
						icon={<Icon name="userPlus" className="h-4 w-4" />}
					/>
				</div>
			</form>
		)
	}
)
