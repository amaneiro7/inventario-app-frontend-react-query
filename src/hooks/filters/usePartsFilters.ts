import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { type DevicePartsFilters } from '@/core/devices/devices/application/parts/CreateDevicePartsParams'
import {
	DevicePartsFilter,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/parts/DevicePartsFilter'

export function usePartsFilter() {
	const mainCategoryId = defaultMainCategoryValue
	const [searchParams, setSearchParams] = useSearchParams()

	const setFilters = useCallback((filters: DevicePartsFilters) => {
		setSearchParams(params => {
			Object.keys(filters).forEach(key => {
				const filterKey = key as keyof DevicePartsFilters
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

	const categoryId = searchParams.get('categoryId') as DevicePartsFilters['categoryId']
	const brandId = searchParams.get('brandId') as DevicePartsFilters['brandId']
	const statusId = searchParams.get('statusId') as DevicePartsFilters['statusId']
	const activo = searchParams.get('activo') as DevicePartsFilters['activo']
	const serial = searchParams.get('serial') as DevicePartsFilters['serial']
	const modelId = searchParams.get('modelId') as DevicePartsFilters['modelId']
	const employeeId = searchParams.get('employeeId') as DevicePartsFilters['employeeId']
	const locationId = searchParams.get('locationId') as DevicePartsFilters['locationId']
	const typeOfSiteId = searchParams.get('typeOfSiteId') as DevicePartsFilters['typeOfSiteId']
	const cityId = searchParams.get('cityId') as DevicePartsFilters['cityId']
	const stateId = searchParams.get('stateId') as DevicePartsFilters['stateId']
	const regionId = searchParams.get('regionId') as DevicePartsFilters['regionId']

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: 1
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: DevicePartsFilter.defaultPageSize

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
