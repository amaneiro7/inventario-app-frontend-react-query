import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	DeviceFinantialPrinterFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/finantialPrinter/DeviceFinantialPrinterFilter'
import { type DeviceFinantialPrinterFilters } from '@/core/devices/devices/application/finantialPrinter/CreateDeviceFinantialPrinterParams'

export function useFinantialPrinterFilter() {
	const mainCategoryId = defaultMainCategoryValue
	const [searchParams, setSearchParams] = useSearchParams()

	const setFilters = useCallback((filters: DeviceFinantialPrinterFilters) => {
		setSearchParams(params => {
			Object.keys(filters).forEach(key => {
				const filterKey = key as keyof DeviceFinantialPrinterFilters
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

	const categoryId = searchParams.get('categoryId') as DeviceFinantialPrinterFilters['categoryId']
	const brandId = searchParams.get('brandId') as DeviceFinantialPrinterFilters['brandId']
	const statusId = searchParams.get('statusId') as DeviceFinantialPrinterFilters['statusId']
	const activo = searchParams.get('activo') as DeviceFinantialPrinterFilters['activo']
	const serial = searchParams.get('serial') as DeviceFinantialPrinterFilters['serial']
	const modelId = searchParams.get('modelId') as DeviceFinantialPrinterFilters['modelId']
	const employeeId = searchParams.get('employeeId') as DeviceFinantialPrinterFilters['employeeId']
	const locationId = searchParams.get('locationId') as DeviceFinantialPrinterFilters['locationId']
	const typeOfSiteId = searchParams.get(
		'typeOfSiteId'
	) as DeviceFinantialPrinterFilters['typeOfSiteId']
	const cityId = searchParams.get('cityId') as DeviceFinantialPrinterFilters['cityId']
	const stateId = searchParams.get('stateId') as DeviceFinantialPrinterFilters['stateId']
	const regionId = searchParams.get('regionId') as DeviceFinantialPrinterFilters['regionId']

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: undefined
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: DeviceFinantialPrinterFilter.defaultPageSize

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
		pageNumber,
		pageSize,
		cleanFilters,
		setFilters,
		setPageNumber,
		setPageSize
	}
}
