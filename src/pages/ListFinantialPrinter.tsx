import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloadExcelService } from '@/shared/lib/hooks/useDownloadExcelService'
import { useFinantialPrinterFilter } from '@/entities/devices/devices/infra/hook/useFinantialPrinterFilters'
import { FilterAside, type FilterAsideRef } from '@/widgets/FilterAside'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { FilterSection } from '@/shared/ui/FilterSection'
import { ButtonSection } from '@/shared/ui/ButttonSection/ButtonSection'
import { Loading } from '@/shared/ui/Loading'
import { TableFinantialWrapper } from '@/widgets/FinantialPrinterTable/TableFinantialWrapper'

const DevicePrimaryFilter = lazy(() =>
	import('@/features/device-filter/ui/DevicePrimaryFilter').then(m => ({
		default: m.DevicePrimaryFilter
	}))
)

const ComputerPrimaryFilter = lazy(() =>
	import('@/features/computer-filter/ui/ComputerPrimaryFilter').then(m => ({
		default: m.ComputerPrimaryFilter
	}))
)

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
		<Suspense fallback={<Loading />}>
			<DetailsBoxWrapper>
				<FilterSection>
					<ComputerPrimaryFilter
						categoryId={query.categoryId}
						employeeId={query.employeeId}
						serial={query.serial}
						locationId={query.locationId}
						regionId={query.regionId}
						mainCategoryId={mainCategoryId}
						administrativeRegionId={query.administrativeRegionId}
						typeOfSiteId={query.typeOfSiteId}
						directivaId={query.directivaId}
						vicepresidenciaEjecutivaId={query.vicepresidenciaEjecutivaId}
						vicepresidenciaId={query.vicepresidenciaId}
						departamentoId={query.departamentoId}
						handleChange={handleChange}
					/>
					<FilterAside ref={filterAsideRef}>
						<Suspense>
							<DevicePrimaryFilter
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
			<TableFinantialWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleChange={handleChange}
				handleSort={handleSort}
				query={query}
			/>
		</Suspense>
	)
}
