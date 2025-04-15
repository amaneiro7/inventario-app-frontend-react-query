import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { useEmployeeFilter } from '@/core/employee/employee/infra/hook/useEmployeeFilters'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { EmployeeMainFilter } from '@/ui/List/employee/EmployeeMainFilter'
import { TableEmployeeWrapper } from '@/ui/List/employee/TableEmployeeWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { FilterAside, type FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { EmployeeOtherilter } from '@/ui/List/employee/OtherFilter'

export default function ListEmployee() {
	const { handleChange, cleanFilters, handlePageSize, handlePageClick, handleSort, ...query } =
		useEmployeeFilter()
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()

	return (
		<>
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
						<EmployeeOtherilter
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
				</FilterSection>
				<ButtonSection
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/employee/add')
					}}
					handleFilter={filterAsideRef.current?.handleOpen}
				/>
			</DetailsBoxWrapper>

			<TableEmployeeWrapper
				handlePageSize={handlePageSize}
				handlePageClick={handlePageClick}
				handleSort={handleSort}
				query={query}
			/>
		</>
	)
}
