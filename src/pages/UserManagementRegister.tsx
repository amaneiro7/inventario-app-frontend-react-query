import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/Card'
import { RoleCombobox } from '@/entities/role/infra/ui/RoleComboBox'
import Button from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/icon/Icon'
import Typography from '@/shared/ui/Typography'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { useCreateUser } from '@/entities/user/infra/hooks/useCreateModels'
import { EmployeeCombobox } from '@/entities/employee/employee/infra/ui/EmployeeComboBox'

// --- Simulación de componentes y datos ---
// Deberás reemplazar esto con tu implementación real.

/**
 * Simulación de un Combobox para buscar empleados que aún no son usuarios.
 * Deberías crear este componente para que haga una llamada a tu API
 * y busque en la tabla de empleados.
 */

// const EmployeeSearchCombobox = ({ onSelectEmployee }) => {
// 	// Lógica interna para buscar y mostrar empleados...
// 	return (
// 		<div className="w-full rounded-md border border-dashed p-4 text-center">
// 			<Typography color="gray-600" variant="span" option="small">
// 				Aquí iría tu `EmployeeSearchCombobox`.
// 			</Typography>
// 			<Button
// 				text="Seleccionar Empleado (Simulación)"
// 				buttonSize="medium"
// 				color="orange"
// 				size="content"
// 				onClick={() =>
// 					onSelectEmployee({
// 						id: 'EMP-123',
// 						name: 'Juan',
// 						lastName: 'Pérez',
// 						email: 'juan.perez@example.com'
// 					})
// 				}
// 				className="mt-2"
// 			/>
// 		</div>
// 	)
// }

// --- Componente principal ---

export default function UserManagementRegister() {
	const { formData, isLoading, isSaving, handleChange, handleSubmit } = useCreateUser()

	return (
		<DetailsBoxWrapper position="center">
			<Card className="w-xl">
				<CardHeader>
					<CardTitle>Registrar Nuevo Usuario</CardTitle>
					<CardDescription>
						Busca un empleado existente y asígnale un rol para crear su cuenta de
						usuario.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Paso 1: Seleccionar Empleado */}
					<div>
						<Typography weight="medium" color="gray-600" variant="h6" className="mb-2">
							1. Seleccionar Empleado
						</Typography>
						<EmployeeCombobox
							value={formData.employeeId ?? ''}
							handleChange={(_name, value) => handleChange('employeeId', value)}
							name="employeeId"
						/>
					</div>

					{/* Datos del Empleado Seleccionado */}
					{/* {selectedEmployee && (
						<div className="space-y-2 rounded-md border bg-slate-50 p-4 dark:bg-slate-800/50">
							<p className="font-semibold">
								{selectedEmployee.name} {selectedEmployee.lastName}
							</p>
							<p className="text-muted-foreground text-sm">
								{selectedEmployee.email}
							</p>
						</div>
					)} */}

					{/* Paso 2: Asignar Rol */}
					<div>
						<Typography weight="medium" color="gray-600" variant="h6" className="mb-2">
							2. Asignar Rol de Servicio
						</Typography>
						<RoleCombobox
							value={formData.roleId}
							handleChange={(_name, value) => handleChange('roleId', value)}
							name="roleId"
							label=""
							readonly={!formData.employeeId} // Deshabilitado hasta que se elija un empleado
							required
						/>
					</div>

					{/* Botón de Acción */}
					<div className="flex justify-end pt-4">
						<Button
							text={isSaving ? 'Creando...' : 'Crear Usuario'}
							size="content"
							buttonSize="medium"
							color="green"
							onClick={handleSubmit}
							disabled={!formData.employeeId || !formData.roleId || isSaving}
							icon={<Icon name="userPlus" className="h-4 w-4" />}
						/>
					</div>
				</CardContent>
			</Card>
		</DetailsBoxWrapper>
	)
}
