import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllUser } from '@/entities/user/infra/hooks/useGetAlUser'
import { type UserFilters } from '@/entities/user/application/createUserQueryParams'

export function UserServiceSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: UserFilters = useMemo(() => {
		return {
			...(debouncedSearch
				? { email: debouncedSearch, name: debouncedSearch, lastName: debouncedSearch }
				: { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { users, isLoading } = useGetAllUser(query)

	const options = useMemo(() => users?.data ?? [], [users])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="user-search-email"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/user-management/profile/${value}`}
			name="userSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por usuario"
			displayAccessor="email"
		/>
	)
}
