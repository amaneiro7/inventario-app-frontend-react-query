import { lazy } from 'react'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/DeviceComputerFilter'
import { useComputerFilter } from '@/hooks/filters/useComputerFilters'
import { useGetAllDevicess } from '@/hooks/getAll/useGetAllDevices'

const ListWrapper = lazy(
	async () => await import('@/ui/List/ListWrapper').then(m => ({ default: m.ListWrapper }))
)
const MainComputerFilter = lazy(
	async () =>
		await import('@/ui/List/MainComputerFilter').then(m => ({ default: m.MainComputerFilter }))
)
const OtherComputerFilter = lazy(
	async () =>
		await import('@/ui/List/FilterAside/OtherComputerFilter').then(m => ({
			default: m.OtherComputerFilter
		}))
)
const DefaultDeviceFilter = lazy(
	async () =>
		await import('@/ui/List/DefaultDeviceFilter').then(m => ({
			default: m.DefaultDeviceFilter
		}))
)
const DeviceTable = lazy(() =>
	import('@/ui/List/TableDevice').then(m => ({ default: m.TableWrapper }))
)

export default function ListComputer() {
	const {
		setFilters,
		employeeId,
		categoryId,
		mainCategoryId,
		activo,
		brandId,
		cityId,
		computerName,
		ipAddress,
		locationId,
		modelId,
		operatingSystemArqId,
		operatingSystemId,
		processor,
		regionId,
		serial,
		stateId,
		statusId,
		cleanFilters,
		typeOfSiteId
	} = useComputerFilter()

	const handleChange = (name: string, value: string) => {
		const key = name as keyof DeviceComputerFilters
		setFilters({ [key]: value })
	}

	const { devices, isLoading } = useGetAllDevicess({
		options: {
			employeeId,
			categoryId,
			mainCategoryId,
			activo,
			brandId,
			cityId,
			computerName,
			ipAddress,
			locationId,
			modelId,
			operatingSystemArqId,
			operatingSystemId,
			processor,
			regionId,
			serial,
			stateId,
			statusId,
			typeOfSiteId
		},
		pageSize: 20
	})

	return (
		<ListWrapper
			title="Lista de equipos de computación"
			typeOfSiteId={typeOfSiteId}
			handleChange={handleChange}
			handleClear={cleanFilters}
			url="/device/add"
			// source='computer'
			mainFilter={
				<MainComputerFilter
					categoryId={categoryId}
					employeeId={employeeId}
					serial={serial}
					locationId={locationId}
					regionId={regionId}
					mainCategoryId={mainCategoryId}
					typeOfSiteId={typeOfSiteId}
					handleChange={handleChange}
				/>
			}
			otherFilter={
				<>
					<DefaultDeviceFilter
						activo={activo}
						statusId={statusId}
						brandId={brandId}
						modelId={modelId}
						categoryId={categoryId}
						stateId={stateId}
						regionId={regionId}
						cityId={cityId}
						handleChange={handleChange}
					/>
					<OtherComputerFilter
						ipAddress={ipAddress}
						computerName={computerName}
						handleChange={handleChange}
						operatingSystemId={operatingSystemId}
						operatingSystemArqId={operatingSystemArqId}
						processor={processor}
					/>
				</>
			}
			total={devices?.info.total}
			loading={isLoading}
			table={<DeviceTable devices={devices?.data} loading={isLoading} />}
		/>
	)
}
