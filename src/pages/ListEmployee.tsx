import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { useEmployeeFilter } from '@/core/employee/employee/infra/hook/useEmployeeFilters'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { EmployeeMainFilter } from '@/ui/List/employee/EmployeeMainFilter'
import { TableEmployeeWrapper } from '@/ui/List/employee/TableEmployeeWrapper'
import { FilterSection } from '@/ui/List/FilterSection'
import { FilterAside, type FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { EmployeeOtherilter } from '@/ui/List/employee/OtherFilter'
import { type EmployeeFilters } from '@/core/employee/employee/application/createEmployeeQueryParams'

export default function ListEmployee() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, ...query } = useEmployeeFilter()
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()

	const handleChange = useCallback(
		(name: string, value: string | number) => {
			const key = name as keyof EmployeeFilters
			setFilters({ [key]: value })
			setPageNumber(1)
		},
		[setFilters, setPageNumber]
	)

	return (
		<>
			<DetailsBoxWrapper>
				<FilterSection>
					<EmployeeMainFilter
						cargoId={query.cargoId}
						isStillWorking={query.isStillWorking}
						locationId={query.locationId}
						departamentoId={query.departamentoId}
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
							centroTrabajoId={query.centroTrabajoId}
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
				setPageNumber={setPageNumber}
				setPageSize={setPageSize}
				query={query}
			/>
		</>
	)
}
