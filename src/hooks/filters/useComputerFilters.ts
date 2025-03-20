import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	DeviceComputerFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/computerFilter/DeviceComputerFilter'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/computerFilter/CreateDeviceComputerParams'

export function useComputerFilter() {
	const mainCategoryId = defaultMainCategoryValue
	const [searchParams, setSearchParams] = useSearchParams()

	const getFilterValue = useCallback(
		<T extends keyof DeviceComputerFilters>(key: T): DeviceComputerFilters[T] => {
			return searchParams.get(key) as DeviceComputerFilters[T]
		},
		[searchParams]
	)

	const setFilters = useCallback(
		(filters: DeviceComputerFilters) => {
			setSearchParams(params => {
				Object.entries(filters).forEach(([key, value]) => {
					if (value) {
						params.set(key, String(value))
					} else {
						params.delete(key)
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

	const filters: DeviceComputerFilters = {
		categoryId: getFilterValue('categoryId'),
		brandId: getFilterValue('brandId'),
		statusId: getFilterValue('statusId'),
		activo: getFilterValue('activo'),
		serial: getFilterValue('serial'),
		modelId: getFilterValue('modelId'),
		employeeId: getFilterValue('employeeId'),
		locationId: getFilterValue('locationId'),
		typeOfSiteId: getFilterValue('typeOfSiteId'),
		cityId: getFilterValue('cityId'),
		stateId: getFilterValue('stateId'),
		regionId: getFilterValue('regionId'),
		computerName: getFilterValue('computerName'),
		operatingSystemId: getFilterValue('operatingSystemId'),
		operatingSystemArqId: getFilterValue('operatingSystemArqId'),
		processor: getFilterValue('processor'),
		ipAddress: getFilterValue('ipAddress')
	}

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: undefined
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: DeviceComputerFilter.defaultPageSize

	return {
		...filters,
		mainCategoryId,
		pageNumber,
		pageSize,
		cleanFilters,
		setFilters,
		setPageNumber,
		setPageSize
	}
}
