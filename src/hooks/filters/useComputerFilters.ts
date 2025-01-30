import { DeviceComputerFilters } from '@/core/devices/devices/application/DeviceComputerFilter'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export function useComputerFilter() {
	const [searchParams, setSearchParams] = useSearchParams()

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

	const setFilters = useCallback((filters: DeviceComputerFilters) => {
		setSearchParams(params => {
			if (filters.categoryId !== undefined) {
				params.set('categoryId', filters.categoryId)
			}
			if (filters.brandId !== undefined) {
				params.set('brandId', filters.brandId)
			}
			if (filters.statusId !== undefined) {
				params.set('statusId', filters.statusId)
			}
			if (filters.activo !== undefined) {
				params.set('activo', filters.activo)
			}
			if (filters.serial !== undefined) {
				params.set('serial', filters.serial)
			}
			if (filters.modelId !== undefined) {
				params.set('modelId', filters.modelId)
			}
			if (filters.employeeId !== undefined) {
				params.set('employeeId', filters.employeeId)
			}
			if (filters.locationId !== undefined) {
				params.set('locationId', filters.locationId)
			}
			if (filters.typeOfSiteId !== undefined) {
				params.set('typeOfSiteId', filters.typeOfSiteId)
			}
			if (filters.cityId !== undefined) {
				params.set('cityId', filters.cityId)
			}
			if (filters.stateId !== undefined) {
				params.set('stateId', filters.stateId)
			}
			if (filters.regionId !== undefined) {
				params.set('regionId', filters.regionId)
			}
			if (filters.computerName !== undefined) {
				params.set('computerName', filters.computerName)
			}
			if (filters.operatingSystemId !== undefined) {
				params.set('operatingSystemId', filters.operatingSystemId)
			}
			if (filters.operatingSystemArqId !== undefined) {
				params.set('operatingSystemArqId', filters.operatingSystemArqId)
			}
			if (filters.processor !== undefined) {
				params.set('processor', filters.processor)
			}
			if (filters.ipAddress !== undefined) {
				params.set('ipAddress', filters.ipAddress)
			}

			return params
		})
	}, [])

	return {
		categoryId,
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
		setFilters
	}
}
