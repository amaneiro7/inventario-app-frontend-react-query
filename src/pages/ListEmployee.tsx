import { lazy, Suspense, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/shared/ui/DetailsWrapper/DetailsBoxWrapper'
import { useEmployeeFilter } from '@/entities/employee/employee/infra/hook/useEmployeeFilters'
import { ButtonSection } from '@/shared/ui/ButttonSection/ButtonSection'
import { TableEmployeeWrapper } from '@/widgets/tables/EmployeeTable'
import { FilterSection } from '@/shared/ui/FilterSection'
import { FilterAside, type FilterAsideRef } from '@/widgets/FilterAside'
import { Loading } from '@/shared/ui/Loading'

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

export default function ListEmployee() {
	const { handleChange, cleanFilters, handlePageSize, handlePageClick, handleSort, ...query } =
		useEmployeeFilter()
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()

	return (
		<Suspense fallback={<Loading />}>
			<DetailsBoxWrapper>
				<FilterSection>
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
					handleFilter={() => filterAsideRef.current?.handleOpen()}
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
