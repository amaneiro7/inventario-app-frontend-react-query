import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { EmployeeGetByCriteria } from '../../application/EmployeeGetByCriteria'
import { type EmployeeFilters } from '../../application/createEmployeeQueryParams'

export function useEmployeeFilter() {
	const [searchParams, setSearchParams] = useSearchParams()

	const getFilterValue = useCallback(
		<T extends keyof EmployeeFilters>(key: T): EmployeeFilters[T] => {
			return searchParams.get(key) as EmployeeFilters[T]
		},
		[searchParams]
	)

	const setFilters = useCallback(
		(filters: EmployeeFilters) => {
			setSearchParams(params => {
				Object.entries(filters).forEach(([key, value]) => {
					if (!value) {
						params.delete(key)
					} else {
						params.set(key, String(value))
					}
				})
				return params
			})
		},
		[setSearchParams]
	)

	const setPageNumber = useCallback(
		(page: number) => {
			setSearchParams(params => {
				params.set('pageNumber', page.toString())
				return params
			})
		},
		[setSearchParams]
	)

	const setPageSize = useCallback(
		(pageSize: number) => {
			setSearchParams(params => {
				params.set('pageSize', pageSize.toString())
				return params
			})
		},
		[setSearchParams]
	)

	const cleanFilters = useCallback(() => {
		setSearchParams(new URLSearchParams())
	}, [searchParams])

	const filters: EmployeeFilters = {
		userName: getFilterValue('userName'),
		type: getFilterValue('type'),
		name: getFilterValue('name'),
		lastName: getFilterValue('lastName'),
		email: getFilterValue('email'),
		isStillWorking: getFilterValue('isStillWorking'),
		employeeCode: getFilterValue('employeeCode'),
		nationality: getFilterValue('nationality'),
		cedula: getFilterValue('cedula'),
		centroTrabajoId: getFilterValue('centroTrabajoId'),
		locationId: getFilterValue('locationId'),
		departamentoId: getFilterValue('departamentoId'),
		vicepresidenciaEjecutivaId: getFilterValue('vicepresidenciaEjecutivaId'),
		directivaId: getFilterValue('directivaId'),
		cargoId: getFilterValue('cargoId'),
		pageNumber: getFilterValue('pageNumber')
	}
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: EmployeeGetByCriteria.defaultPageSize

	return {
		...filters,
		pageSize,
		cleanFilters,
		setFilters,
		setPageNumber,
		setPageSize
	}
}
