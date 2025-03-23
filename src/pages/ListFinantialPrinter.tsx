import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/hooks/download/useDownloadExcelService'
import { useFinantialPrinterFilter } from '@/hooks/filters/useFinantialPrinterFilters'
import { FilterAside, type FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { MainComputerFilter } from '@/ui/List/MainComputerFilter'
import { DefaultDeviceFilter } from '@/ui/List/DefaultDeviceFilter'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { TableFinantialWrapper } from '@/ui/List/finantialPrinter/TableFinantialWrapper'

export default function ListFinantialPrinter() {
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
	} = useFinantialPrinterFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'finantialPrinter', query })
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
				/>
			</DetailsBoxWrapper>
			<TableFinantialWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleChange={handleChange}
				handleSort={handleSort}
				query={query}
			/>
		</>
		// <Suspense fallback={<Loading />}>
		// 	<ListWrapper
		// 		title="Lista de impresoras financieras"
		// 		typeOfSiteId={query.typeOfSiteId}
		// 		handleChange={handleChange}
		// 		handleClear={cleanFilters}
		// 		handleExportToExcel={download}
		// 		isDownloading={isDownloading}
		// 		url="/device/add"
		// 		mainFilter={
		// 			<Suspense>
		// 				<MainComputerFilter
		// 					categoryId={query.categoryId}
		// 					employeeId={query.employeeId}
		// 					serial={query.serial}
		// 					locationId={query.locationId}
		// 					regionId={query.regionId}
		// 					mainCategoryId={mainCategoryId}
		// 					typeOfSiteId={query.typeOfSiteId}
		// 					handleChange={handleChange}
		// 				/>
		// 			</Suspense>
		// 		}
		// 		otherFilter={
		// 			<Suspense>
		// 				<DefaultDeviceFilter
		// 					activo={query.activo}
		// 					statusId={query.statusId}
		// 					brandId={query.brandId}
		// 					modelId={query.modelId}
		// 					categoryId={query.categoryId}
		// 					stateId={query.stateId}
		// 					regionId={query.regionId}
		// 					cityId={query.cityId}
		// 					handleChange={handleChange}
		// 				/>
		// 			</Suspense>
		// 		}
		// 		total={devices?.info.total}
		// 		loading={isLoading}
		// 		table={<TableDefaultDevice>{tableContent}</TableDefaultDevice>}
		// 		currentPage={devices?.info.page}
		// 		totalPages={devices?.info.totalPage}
		// 		registerOptions={DeviceFinantialPrinterFilter.pegaSizeOptions}
		// 		pageSize={query.pageSize}
		// 		handlePageClick={handlePageSelected}
		// 		handlePageSize={handlePageSize}
		// 	/>
		// </Suspense>
	)
}
