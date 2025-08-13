import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEmployeeFilter } from '@/entities/employee/employee/infra/hook/useEmployeeFilters'
import { PrimaryFilterSkeleton } from '@/widgets/tables/PrimaryFilterSkeleton'
import { ButtonSectionSkeleton } from '@/shared/ui/ButttonSection/ButtonSectionSkeleton'
import { TableSkeleton } from '@/widgets/tables/TableSkeleton'
import { type FilterAsideRef } from '@/widgets/FilterAside'

const DetailsBoxWrapper = lazy(() =>
	import('@/shared/ui/DetailsWrapper/DetailsBoxWrapper').then(m => ({
		default: m.DetailsBoxWrapper
	}))
)

const FilterAside = lazy(() =>
	import('@/widgets/FilterAside').then(m => ({ default: m.FilterAside }))
)
const FilterSection = lazy(() =>
	import('@/shared/ui/FilterSection').then(m => ({ default: m.FilterSection }))
)
const ButtonSection = lazy(() =>
	import('@/shared/ui/ButttonSection/ButtonSection').then(m => ({ default: m.ButtonSection }))
)

const EmployeeOtherFilter = lazy(() =>
	import('@/features/employee-filter/ui/EmployeeOtherFilter').then(m => ({
		default: m.EmployeeOtherFilter
	}))
)
const EmployeePrimaryFilter = lazy(() =>
	import('@/features/employee-filter/ui/EmployeePrimaryFilter').then(m => ({
		default: m.EmployeePrimaryFilter
	}))
)
const TableEmployeeWrapper = lazy(() =>
	import('@/widgets/tables/EmployeeTable').then(m => ({ default: m.TableEmployeeWrapper }))
)

export default function ListEmployee() {
	const { handleChange, cleanFilters, handlePageSize, handlePageClick, handleSort, ...query } =
		useEmployeeFilter()
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()

	return (
		<>
			<DetailsBoxWrapper>
				<FilterSection>
					<Suspense fallback={<PrimaryFilterSkeleton inputQuantity={6} />}>
						<EmployeePrimaryFilter
							cargoId={query.cargoId}
							isStillWorking={query.isStillWorking}
							locationId={query.locationId}
							departamentoId={query.departamentoId}
							vicepresidenciaId={query.vicepresidenciaId}
							type={query.type}
							cityId={query.cityId}
							stateId={query.stateId}
							regionId={query.regionId}
							userName={query.userName}
							handleChange={handleChange}
						/>
					</Suspense>
					<Suspense fallback={null}>
						<FilterAside ref={filterAsideRef}>
							<EmployeeOtherFilter
								name={query.name}
								lastName={query.lastName}
								email={query.email}
								cedula={query.cedula}
								employeeCode={query.employeeCode}
								vicepresidenciaId={query.vicepresidenciaId}
								directivaId={query.directivaId}
								vicepresidenciaEjecutivaId={query.vicepresidenciaEjecutivaId}
								regionId={query.regionId}
								stateId={query.stateId}
								cityId={query.cityId}
								handleChange={handleChange}
							/>
						</FilterAside>
					</Suspense>
				</FilterSection>
				<Suspense fallback={<ButtonSectionSkeleton />}>
					<ButtonSection
						handleClear={cleanFilters}
						handleAdd={() => {
							navigate('/form/employee/add')
						}}
						filterButton
						handleFilter={() => filterAsideRef.current?.handleOpen()}
					/>
				</Suspense>
			</DetailsBoxWrapper>
			<Suspense fallback={<TableSkeleton />}>
				<TableEmployeeWrapper
					handlePageSize={handlePageSize}
					handlePageClick={handlePageClick}
					handleSort={handleSort}
					query={query}
				/>
			</Suspense>
		</>
	)
}
