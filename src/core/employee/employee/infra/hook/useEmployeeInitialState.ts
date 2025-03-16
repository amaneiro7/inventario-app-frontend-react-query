import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/hooks/useGetFormMode'
import { EmployeeGetService } from '../service/employeeGet.service'
import { EmployeeGetter } from '../../application/EmployeeGetter'
import { type DefaultEmployee } from '../reducers/employeeFormReducer'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'

const repository = new EmployeeGetService()
const get = new EmployeeGetter(repository)
export function useEmployeeInitialState(defaultState: DefaultEmployee): {
	initialState: DefaultEmployee
	resetState: () => void
	mode: 'edit' | 'add'
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultEmployee>(defaultState)

	const { data: employeeData, refetch } = useQuery({
		queryKey: ['employee', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.Employee,
		retry: false
	})

	const mappedEmployeeState = useCallback((employee: EmployeeDto): void => {
		setState({
			id: employee.id,
			userName: employee.userName,
			type: employee.type,
			name: employee.name,
			lastName: employee.lastName,
			email: employee.email,
			isStillWorking: employee.isStillWorking,
			employeeCode: employee.employeeCode,
			nationality: employee.nationality,
			cedula: employee.cedula,
			locationId: employee.locationId,
			departamentoId: employee.departamentoId,
			centroCostoId: employee.departamento.centroCostoId,
			centroTrabajoId: employee.centroTrabajoId,
			cargoId: employee.cargoId,
			extension: employee.extension,
			phone: employee.phone,
			updatedAt: employee.updatedAt
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('employee')) {
			setState(defaultState)
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (location?.state?.employee) {
			setState(location.state.employee)
		} else if (employeeData) {
			mappedEmployeeState(employeeData)
		}
	}, [mode, employeeData, location.state, defaultState, navigate, id, mappedEmployeeState])

	const resetState = useCallback(async () => {
		if (!location.pathname.includes('employee')) return

		if (mode === 'add') {
			setState({ id: undefined, ...defaultState })
		} else if (id) {
			const { data } = await refetch()
			if (data) {
				mappedEmployeeState(data)
			}
		}
	}, [defaultState, location.pathname, mode, refetch, mappedEmployeeState, id])

	return {
		mode,
		initialState: state,
		resetState
	}
}
