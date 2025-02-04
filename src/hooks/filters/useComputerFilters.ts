import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
	DeviceComputerFilter,
	DeviceComputerFilters,
	defaultMainCategoryValue
} from '@/core/devices/devices/application/DeviceComputerFilter'

export function wuseComputerFilter() {
	const mainCategoryId = defaultMainCategoryValue
	const [searchParams, setSearchParams] = useSearchParams()

	const categoryId = searchParams.get(
		'categoryId'
	) as DeviceComputerFilters['options']['categoryId']
	const brandId = searchParams.get('brandId') as DeviceComputerFilters['options']['brandId']
	const statusId = searchParams.get('statusId') as DeviceComputerFilters['options']['statusId']
	const activo = searchParams.get('activo') as DeviceComputerFilters['options']['activo']
	const serial = searchParams.get('serial') as DeviceComputerFilters['options']['serial']
	const modelId = searchParams.get('modelId') as DeviceComputerFilters['options']['modelId']
	const employeeId = searchParams.get(
		'employeeId'
	) as DeviceComputerFilters['options']['employeeId']
	const locationId = searchParams.get(
		'locationId'
	) as DeviceComputerFilters['options']['locationId']
	const typeOfSiteId = searchParams.get(
		'typeOfSiteId'
	) as DeviceComputerFilters['options']['typeOfSiteId']
	const cityId = searchParams.get('cityId') as DeviceComputerFilters['options']['cityId']
	const stateId = searchParams.get('stateId') as DeviceComputerFilters['options']['stateId']
	const regionId = searchParams.get('regionId') as DeviceComputerFilters['options']['regionId']
	const computerName = searchParams.get(
		'computerName'
	) as DeviceComputerFilters['options']['computerName']
	const operatingSystemId = searchParams.get(
		'operatingSystemId'
	) as DeviceComputerFilters['options']['operatingSystemId']
	const operatingSystemArqId = searchParams.get(
		'operatingSystemArqId'
	) as DeviceComputerFilters['options']['operatingSystemArqId']
	const processor = searchParams.get('processor') as DeviceComputerFilters['options']['processor']
	const ipAddress = searchParams.get('ipAddress') as DeviceComputerFilters['options']['ipAddress']

	const pageNumber = searchParams.get('pageNumber')
		? parseInt(searchParams.get('pageNumber') as string)
		: 1
	const pageSize = searchParams.get('pageSize')
		? parseInt(searchParams.get('pageSize') as string)
		: DeviceComputerFilter.defaultPageSize

	const setFilters = useCallback((filters: DeviceComputerFilters['options']) => {
		setSearchParams(params => {
			Object.keys(filters).forEach(key => {
				const filterKey = key as keyof DeviceComputerFilters['options']
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
