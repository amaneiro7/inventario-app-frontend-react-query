import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	DevicePrinterFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/printer/DevicePrinterFilter'
import { type DevicePrinterFilters } from '@/core/devices/devices/application/printer/CreateDevicePrinterParams'

export function usePrinterFilter() {
	const mainCategoryId = defaultMainCategoryValue
	const [searchParams, setSearchParams] = useSearchParams()

	const setFilters = useCallback((filters: DevicePrinterFilters) => {
		setSearchParams(params => {
			Object.keys(filters).forEach(key => {
				const filterKey = key as keyof DevicePrinterFilters
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

	const categoryId = searchParams.get('categoryId') as DevicePrinterFilters['categoryId']
	const brandId = searchParams.get('brandId') as DevicePrinterFilters['brandId']
	const statusId = searchParams.get('statusId') as DevicePrinterFilters['statusId']
	const activo = searchParams.get('activo') as DevicePrinterFilters['activo']
	const serial = searchParams.get('serial') as DevicePrinterFilters['serial']
	const modelId = searchParams.get('modelId') as DevicePrinterFilters['modelId']
	const employeeId = searchParams.get('employeeId') as DevicePrinterFilters['employeeId']
	const locationId = searchParams.get('locationId') as DevicePrinterFilters['locationId']
	const typeOfSiteId = searchParams.get('typeOfSiteId') as DevicePrinterFilters['typeOfSiteId']
	const cityId = searchParams.get('cityId') as DevicePrinterFilters['cityId']
	const stateId = searchParams.get('stateId') as DevicePrinterFilters['stateId']
	const regionId = searchParams.get('regionId') as DevicePrinterFilters['regionId']
	const ipAddress = searchParams.get('ipAddress') as DevicePrinterFilters['ipAddress']

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: undefined
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: DevicePrinterFilter.defaultPageSize

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
		ipAddress,
		pageNumber,
		pageSize,
		cleanFilters,
		setFilters,
		setPageNumber,
		setPageSize
	}
}
