import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useComputerFilter } from '@/core/devices/devices/infra/hook/useComputerFilters'
import { useDownloadExcelService } from '@/hooks/useDownloadExcelService'
//components
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { MainComputerFilter } from '@/ui/List/MainComputerFilter'
import { FilterAside, type FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { DefaultDeviceFilter } from '@/ui/List/DefaultDeviceFilter'
import { OtherComputerFilter } from '@/ui/List/FilterAside/OtherComputerFilter'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { TableWrapper } from '@/ui/List/computer/TableWrapper'
import { ComputerOrderByCombobox } from '@/components/ComboBox/Sincrono/ComputerOrderByComboBox'

export default function ListComputer() {
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()
	const {
		cleanFilters,
		handlePageSize,
		handlePageClick,
		handleSort,
		handleChange,
		mainCategoryId,
		...query
	} = useComputerFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'computer', query })
	}

	return (
		<>
			<DetailsBoxWrapper>
				<FilterSection>
					<MainComputerFilter
						categoryId={query.categoryId}
						employeeId={query.employeeId}
						serial={query.serial}
						locationId={query.locationId}
						regionId={query.regionId}
						mainCategoryId={mainCategoryId}
						typeOfSiteId={query.typeOfSiteId}
						departamentoId={query.departamentoId}
						handleChange={handleChange}
					/>
					<FilterAside ref={filterAsideRef}>
						<DefaultDeviceFilter
							activo={query.activo}
							statusId={query.statusId}
							brandId={query.brandId}
							modelId={query.modelId}
							categoryId={query.categoryId}
							stateId={query.stateId}
							regionId={query.regionId}
							cityId={query.cityId}
							handleChange={handleChange}
						/>

						<OtherComputerFilter
							handleChange={handleChange}
							ipAddress={query.ipAddress}
							computerName={query.computerName}
							operatingSystemId={query.operatingSystemId}
							operatingSystemArqId={query.operatingSystemArqId}
							processor={query.processor}
						/>
					</FilterAside>
				</FilterSection>
				<ButtonSection
					handleExportToExcel={handleDownloadToExcel}
					loading={isDownloading}
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/device/add')
					}}
					handleFilter={filterAsideRef.current?.handleOpen}
				>
					<ComputerOrderByCombobox
						handleSort={handleSort}
						orderBy={query.orderBy}
						orderType={query.orderType}
						name="orderBy"
					/>
				</ButtonSection>
			</DetailsBoxWrapper>
			<TableWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleChange={handleChange}
				handleSort={handleSort}
				query={query}
			/>
		</>
	)
}
