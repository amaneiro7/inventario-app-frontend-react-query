import { lazy } from 'react'
import { type DeviceComputerFilters } from '@/core/devices/devices/application/DeviceComputerFilter'
import { useComputerFilter } from '@/hooks/filters/useComputerFilters'

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
		typeOfSiteId
	} = useComputerFilter()

	const handleChange = (name: string, value: string) => {
		const key = name as keyof DeviceComputerFilters
		setFilters({ [key]: value })
	}

	return (
		<ListWrapper
			title="Lista de equipos de computación"
			typeOfSiteId={typeOfSiteId}
			handleChange={handleChange}
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
			total={5}
			loading={false}
			// table={<DeviceTable />}
		/>
	)
}
