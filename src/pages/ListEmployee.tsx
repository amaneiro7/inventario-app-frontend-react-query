import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { useEmployeeFilter } from '@/core/employee/employee/infra/hook/useEmployeeFilters'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { TableEmployeeWrapper } from '@/ui/List/employee/TableEmployeeWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { FilterAside, type FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { Loading } from '@/components/Loading'

const EmployeeOtherFilter = lazy(() =>
	import('@/ui/List/employee/OtherFilter').then(m => ({ default: m.EmployeeOtherFilter }))
)
const EmployeeMainFilter = lazy(() =>
	import('@/ui/List/employee/EmployeeMainFilter').then(m => ({ default: m.EmployeeMainFilter }))
)

export default function ListEmployee() {
	const { handleChange, cleanFilters, handlePageSize, handlePageClick, handleSort, ...query } =
		useEmployeeFilter()
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()

	return (
		<Suspense fallback={<Loading />}>
			<DetailsBoxWrapper>
				<FilterSection>
					<EmployeeMainFilter
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
					<FilterAside ref={filterAsideRef}>
						<Suspense>
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
						</Suspense>
					</FilterAside>
				</FilterSection>
				<ButtonSection
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/form/employee/add')
					}}
					filterButton
					handleFilter={filterAsideRef.current?.handleOpen}
				/>
			</DetailsBoxWrapper>

			<TableEmployeeWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleSort={handleSort}
				query={query}
			/>
		</Suspense>
	)
}
