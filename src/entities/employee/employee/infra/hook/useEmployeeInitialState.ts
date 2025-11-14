import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useGetFormMode } from '@/shared/lib/hooks/useGetFormMode'
import { EmployeeGetService } from '../service/employeeGet.service'
import { EmployeeGetter } from '../../application/EmployeeGetter'
import { type DefaultEmployee } from '../reducers/employeeFormReducer'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'
import { useGetAllowedDomainsAppSettings } from '@/entities/appSettings/infra/hook/useGeAllowedDomainsAppSettings'
import { cleanStringToArray } from '@/shared/lib/utils/cleanStringToArray'

const repository = new EmployeeGetService()
const get = new EmployeeGetter(repository)

/**
 * A React hook that manages the initial state for the employee form.
 * It fetches employee data if in 'edit' mode and an ID is present, or initializes with default state.
 * It also provides a way to reset the form state.
 *
 * @param defaultState - The default initial state for the employee form.
 * @returns An object containing the initial state, a reset function, the form mode, and a loading indicator.
 */
export function useEmployeeInitialState(defaultState: DefaultEmployee): {
	initialState: DefaultEmployee
	resetState: () => void
	mode: 'edit' | 'add'
	isLoading: boolean
	employeeData: EmployeeDto | undefined
	isNotFound: boolean
	isError: boolean
	onRetry: () => void
} {
	const { id } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const mode = useGetFormMode()
	const [state, setState] = useState<DefaultEmployee>(defaultState)
	const [isNotFound, setIsNotFound] = useState<boolean>(false)

	const {
		data: employeeData,
		refetch,
		error,
		isError,
		isLoading,
		isFetching
	} = useQuery({
		queryKey: ['employee', id],
		queryFn: () => (id ? get.execute({ id }) : Promise.reject('ID is missing')),
		enabled: !!id && mode === 'edit' && !location?.state?.Employee,
		retry: false
	})
	const { data: allowedDomainsRaw } = useGetAllowedDomainsAppSettings()
	const allowedDomains = allowedDomainsRaw ? cleanStringToArray(allowedDomainsRaw?.value) : []

	/**
	 * Maps the fetched EmployeeDto to the DefaultEmployee form state.
	 * @param employee - The EmployeeDto object fetched from the API.
	 */
	const mappedEmployeeState = useCallback((employee: EmployeeDto): void => {
		setState(() => {
			const phone = employee.phone ?? []
			const extension = employee.extension ?? []
			return {
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
				allowedDomians: allowedDomains,
				extensionSegments: extension?.map(ext => {
					const match = ext.match(/(\d{4})(\d{7})/)
					const operadora = match ? match?.[1] : ''
					const numero = match ? match?.[2] : ''

					return { operadora, numero }
				}) ?? [
					{
						operadora: '',
						numero: ''
					}
				],
				phoneSegments: phone.map(ph => {
					const match = ph.match(/(\d{4})(\d{7})/)
					const operadora = match ? match?.[1] : ''
					const numero = match ? match?.[2] : ''
					return { operadora, numero }
				}),
				devices: employee.devices ?? [],
				updatedAt: employee.updatedAt
			}
		})
	}, [])

	useEffect(() => {
		if (mode === 'add' || !location.pathname.includes('employee')) {
			setState({ ...defaultState, allowedDomians: allowedDomains })
			return
		}

		if (!id) {
			navigate('/error')
			return
		}

		if (error?.message.includes('Recurso no encontrado.')) {
			setIsNotFound(true)
		} else {
			setIsNotFound(false)
		}

		if (location?.state?.employee) {
			setState(location.state.employee)
		} else if (employeeData && !isFetching) {
			mappedEmployeeState(employeeData)
		}
	}, [
		mode,
		employeeData,
		isFetching,
		location.state,
		defaultState,
		navigate,
		id,
		mappedEmployeeState,
		location.pathname
	])

	/**
	 * Resets the form state. If in 'add' mode, it resets to the default state.
	 * If in 'edit' mode, it refetches the employee data to revert changes.
	 */
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
		employeeData,
		initialState: state,
		isLoading,
		isError,
		isNotFound,
		resetState,
		onRetry: refetch
	}
}
