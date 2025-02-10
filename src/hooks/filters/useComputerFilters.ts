import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	DeviceComputerFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/DeviceComputerFilter'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/CreateDeviceComputerParams'

export function useComputerFilter() {
	const mainCategoryId = defaultMainCategoryValue
	const [searchParams, setSearchParams] = useSearchParams()

	const setFilters = useCallback((filters: DeviceComputerFilters) => {
		setSearchParams(params => {
			Object.keys(filters).forEach(key => {
				const filterKey = key as keyof DeviceComputerFilters
				if (filters[filterKey] !== undefined) {
					params.set(filterKey, filters[filterKey] as string)
				}
				if (!filters[filterKey]) {
					params.delete(filterKey)
				}
			})
			return params
		})
	}, [])

	const setPageNumber = useCallback((page: number) => {
		setSearchParams(params => {
			params.set('pageNumber', page.toString())
			return params
		})
	}, [])

	const setPageSize = useCallback((pageSize: number) => {
		setSearchParams(params => {
			params.set('pageSize', pageSize.toString())
			return params
		})
	}, [])

	const cleanFilters = useCallback(() => {
		const newSearchParams = new URLSearchParams()

		setSearchParams(newSearchParams)
	}, [])

	const categoryId = searchParams.get('categoryId') as DeviceComputerFilters['categoryId']
	const brandId = searchParams.get('brandId') as DeviceComputerFilters['brandId']
	const statusId = searchParams.get('statusId') as DeviceComputerFilters['statusId']
	const activo = searchParams.get('activo') as DeviceComputerFilters['activo']
	const serial = searchParams.get('serial') as DeviceComputerFilters['serial']
	const modelId = searchParams.get('modelId') as DeviceComputerFilters['modelId']
	const employeeId = searchParams.get('employeeId') as DeviceComputerFilters['employeeId']
	const locationId = searchParams.get('locationId') as DeviceComputerFilters['locationId']
	const typeOfSiteId = searchParams.get('typeOfSiteId') as DeviceComputerFilters['typeOfSiteId']
	const cityId = searchParams.get('cityId') as DeviceComputerFilters['cityId']
	const stateId = searchParams.get('stateId') as DeviceComputerFilters['stateId']
	const regionId = searchParams.get('regionId') as DeviceComputerFilters['regionId']
	const computerName = searchParams.get('computerName') as DeviceComputerFilters['computerName']
	const operatingSystemId = searchParams.get(
		'operatingSystemId'
	) as DeviceComputerFilters['operatingSystemId']
	const operatingSystemArqId = searchParams.get(
		'operatingSystemArqId'
	) as DeviceComputerFilters['operatingSystemArqId']
	const processor = searchParams.get('processor') as DeviceComputerFilters['processor']
	const ipAddress = searchParams.get('ipAddress') as DeviceComputerFilters['ipAddress']

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: 1
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: DeviceComputerFilter.defaultPageSize

	return {
		categoryId,
		mainCategoryId,
		brandId,
		statusId,
		activo,
		serial,
		modelId,
		employeeId,
		locationId,
		typeOfSiteId,
		cityId,
		stateId,
		regionId,
		computerName,
		operatingSystemId,
		operatingSystemArqId,
		processor,
		ipAddress,
		pageNumber,
		pageSize,
		cleanFilters,
		setFilters,
		setPageNumber,
		setPageSize
	}
}
