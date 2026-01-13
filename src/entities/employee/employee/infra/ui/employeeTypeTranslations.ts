import { EmployeeTypes } from '../../domain/value-object/EmployeeType'

export const employeeTypeTranslations: Record<EmployeeTypes, string> = {
	[EmployeeTypes.GENERIC]: 'Usuario Genérico',
	[EmployeeTypes.REGULAR]: 'Empleado Regular',
	[EmployeeTypes.SERVICE]: 'Usuario de Sistema',
	[EmployeeTypes.APPRENTICE]: 'Aprendiz',
	[EmployeeTypes.CONTRACTOR]: 'Contratado'
}
