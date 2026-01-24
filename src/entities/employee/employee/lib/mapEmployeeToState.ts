import { type EmployeeDto } from '../domain/dto/Employee.dto'
import { type DefaultEmployee } from '../infra/reducers/employeeFormReducer'

/**
 * Maps the fetched EmployeeDto to the DefaultEmployee form state.
 * @param employee - The EmployeeDto object fetched from the API.
 */
export const mapEmployeeToState = (
	employee: EmployeeDto
): {
	originalData: EmployeeDto
	mappedData: DefaultEmployee
} => {
	const phone = isPhoneEmpty(employee.phone)
	const extension = isPhoneEmpty(employee.extension)
	const mappedData: DefaultEmployee = {
		id: employee.id,
		userName: employee.userName,
		type: employee.type,
		name: employee.name ?? '',
		lastName: employee.lastName ?? '',
		email: employee.email ?? '',
		isStillWorking: employee.isStillWorking,
		employeeCode: employee.employeeCode ?? '',
		nationality: employee.nationality ?? '',
		cedula: employee.cedula ?? '',
		locationId: employee.locationId ?? '',
		directivaId: employee.directivaId ?? '',
		vicepresidenciaEjecutivaId: employee.vicepresidenciaEjecutivaId ?? '',
		vicepresidenciaId: employee.vicepresidenciaId ?? '',
		departamentoId: employee.departamentoId ?? '',
		cargoId: employee.cargoId ?? '',
		extension: extension,
		phone: phone,
		// extensionSegments: extension?.map(ext => {
		// 	const match = ext.match(/(\d{4})(\d{7})/)
		// 	const operadora = match ? match?.[1] : ''
		// 	const numero = match ? match?.[2] : ''

		// 	return { operadora, numero }
		// }) ?? [
		// 	{
		// 		operadora: '',
		// 		numero: ''
		// 	}
		// ],
		// phoneSegments: phone.map(ph => {
		// 	const match = ph.match(/(\d{4})(\d{7})/)
		// 	const operadora = match ? match?.[1] : ''
		// 	const numero = match ? match?.[2] : ''
		// 	return { operadora, numero }
		// }),
		devices: employee.devices ?? [],
		updatedAt: employee.updatedAt
	}

	return {
		originalData: employee,
		mappedData
	}
}

const isPhoneEmpty = (number?: string[]) => {
	return number && number.length > 0 ? number : ['']
}
