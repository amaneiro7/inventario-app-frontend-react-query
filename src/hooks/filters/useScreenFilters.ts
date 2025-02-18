import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	defaultMainCategoryValue,
	DeviceScreenFilter
} from '@/core/devices/devices/application/screenFilter/DeviceScreenFilter'
import { type DeviceScreenFilters } from '@/core/devices/devices/application/screenFilter/CreateDeviceScreenParams'

export function useScreenFilter() {
	const mainCategoryId = defaultMainCategoryValue
	const [searchParams, setSearchParams] = useSearchParams()

	const setFilters = useCallback((filters: DeviceScreenFilters) => {
		setSearchParams(params => {
			Object.keys(filters).forEach(key => {
				const filterKey = key as keyof DeviceScreenFilters
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

	const categoryId = searchParams.get('categoryId') as DeviceScreenFilters['categoryId']
	const brandId = searchParams.get('brandId') as DeviceScreenFilters['brandId']
	const statusId = searchParams.get('statusId') as DeviceScreenFilters['statusId']
	const activo = searchParams.get('activo') as DeviceScreenFilters['activo']
	const serial = searchParams.get('serial') as DeviceScreenFilters['serial']
	const modelId = searchParams.get('modelId') as DeviceScreenFilters['modelId']
	const employeeId = searchParams.get('employeeId') as DeviceScreenFilters['employeeId']
	const locationId = searchParams.get('locationId') as DeviceScreenFilters['locationId']
	const typeOfSiteId = searchParams.get('typeOfSiteId') as DeviceScreenFilters['typeOfSiteId']
	const cityId = searchParams.get('cityId') as DeviceScreenFilters['cityId']
	const stateId = searchParams.get('stateId') as DeviceScreenFilters['stateId']
	const regionId = searchParams.get('regionId') as DeviceScreenFilters['regionId']

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: undefined
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: DeviceScreenFilter.defaultPageSize

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
