import { DetailsBoxWrapper } from '@/components/DetailsWrapper/DetailsBoxWrapper'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { LoadingTable } from '@/components/Table/LoadingTable'
import { TablePageWrapper } from '@/components/Table/TablePageWrapper'
import { useEmployeeFilter } from '@/core/employee/employee/infra/hook/useEmployeeFilters'
import { useGetAllEmployees } from '@/core/employee/employee/infra/hook/useGetAllEmployee'
import { ButtonSection } from '@/ui/List/ButttonSection/ButtonSection'
import { TableEmployees } from '@/ui/List/employee/TableEmployees'
import { TableEmployeeWrapper } from '@/ui/List/employee/TableEmployeeWrapper'
import { FilterAsideRef } from '@/ui/List/FilterAside/FilterAside'
import { FilterSection } from '@/ui/List/FilterSection'
import { useCallback, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ListEmployee() {
	const { setFilters, cleanFilters, setPageNumber, setPageSize, ...query } = useEmployeeFilter()
	const filterAsideRef = useRef<FilterAsideRef>(null)
	const navigate = useNavigate()
	const handleChange = useCallback(
		(name: string, value: string | number) => {
			setFilters({ [name]: value })
			setPageNumber(1)
		},
		[setFilters, setPageNumber]
	)

	const handlePageSize = useCallback(
		(pageSize: number) => {
			setPageSize(pageSize)
			setPageNumber(1)
		},
		[setPageSize, setPageNumber]
	)

	const handlePageClick = useCallback(
		({ selected }: { selected: number }) => {
			setPageNumber(selected + 1)
		},
		[setPageNumber]
	)

	const { employees, isLoading } = useGetAllEmployees({ ...query })

	const tableContent = useMemo(() => {
		return isLoading ? (
			<LoadingTable registerPerPage={query.pageSize} colspan={10} />
		) : (
			<TableEmployees employees={employees?.data} />
		)
	}, [isLoading, employees?.data, query.pageSize])

	return (
		<DetailsWrapper borderColor="blue">
			<DetailsBoxWrapper>
				<FilterSection></FilterSection>
				<ButtonSection
					handleClear={cleanFilters}
					handleAdd={() => {
						navigate('/employee/add')
					}}
					handleFilter={filterAsideRef.current?.handleOpen}
				/>
			</DetailsBoxWrapper>
			<TablePageWrapper>
				<TableEmployeeWrapper>{tableContent}</TableEmployeeWrapper>
			</TablePageWrapper>
		</DetailsWrapper>
	)
}
