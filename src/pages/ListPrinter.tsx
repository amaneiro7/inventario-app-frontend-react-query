import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { usePrinterFilter } from '@/entities/devices/devices/infra/hook/usePrinterFilters'
import { Loading } from '@/shared/ui/Loading'
import { TablePrinterWrapper } from '@/ui/List/printer/TablePrinterWrapper'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'
import { FilterAside, type FilterAsideRef } from '@/widgets/FilterAside'
import { ButtonSection } from '@/shared/ui/ButttonSection/ButtonSection'

const MainComputerFilter = lazy(() =>
	import('@/features/computer-filter/ui/MainComputerFilter').then(m => ({
		default: m.MainComputerFilter
	}))
)
const DefaultDeviceFilter = lazy(() =>
	import('@/features/device-filter/ui/DefaultDeviceFilter').then(m => ({
		default: m.DefaultDeviceFilter
	}))
)

export default function ListPrinter() {
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
	} = usePrinterFilter()

	const { download, isDownloading } = useDownloadExcelService()

	const handleDownloadToExcel = async () => {
		await download({ source: 'printer', query })
	}

	return (
		<Suspense fallback={<Loading />}>
			<DetailsBoxWrapper>
				<FilterSection>
					<MainComputerFilter
						categoryId={query.categoryId}
						employeeId={query.employeeId}
						serial={query.serial}
						locationId={query.locationId}
						regionId={query.regionId}
						administrativeRegionId={query.administrativeRegionId}
						mainCategoryId={mainCategoryId}
						typeOfSiteId={query.typeOfSiteId}
						directivaId={query.directivaId}
						vicepresidenciaEjecutivaId={query.vicepresidenciaEjecutivaId}
						vicepresidenciaId={query.vicepresidenciaId}
						departamentoId={query.departamentoId}
						handleChange={handleChange}
					/>
					<FilterAside ref={filterAsideRef}>
						<Suspense>
							<DefaultDeviceFilter
								activo={query.activo}
								statusId={query.statusId}
								brandId={query.brandId}
								modelId={query.modelId}
								categoryId={query.categoryId}
								mainCategoryId={mainCategoryId}
								stateId={query.stateId}
								regionId={query.regionId}
								administrativeRegionId={query.administrativeRegionId}
								cityId={query.cityId}
								handleChange={handleChange}
							/>
						</Suspense>
					</FilterAside>
				</FilterSection>
				<ButtonSection
					handleExportToExcel={handleDownloadToExcel}
					loading={isDownloading}
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/form/device/add')
					}}
					filterButton
					handleFilter={() => filterAsideRef.current?.handleOpen()}
				/>
			</DetailsBoxWrapper>
			<TablePrinterWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleChange={handleChange}
				handleSort={handleSort}
				query={query}
			/>
		</Suspense>
	)
}
