import { memo, useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllUser } from '@/entities/user/infra/hooks/useGetAlUser'
import { type UserFilters } from '@/entities/user/application/createUserQueryParams'
import { UserRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/UserRenderOption'

export const UserServiceSearch = memo(() => {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: UserFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { userName: debouncedSearch } : { pageSize: 10 })
			// ...{ orderBy: 'userName' }
		}
	}, [debouncedSearch])

	const { data: users, isLoading } = useGetAllUser(query)

	console.log('value', value)
	const options = useMemo(() => users?.data ?? [], [users])
	return (
		<SearchInput
			id="user-search-form"
			search={searchValue}
			handleChange={setSearchValue}
			url={`/user-management/profile/${value}`}
			name="userSearch"
			onChangeValue={setValue}
			loading={isLoading}
			options={options}
			value={value}
			displayAccessor="userName"
			title="Búsqueda por usuario"
			renderOption={UserRenderOption}
		/>
	)
})

UserServiceSearch.displayName = 'UserServiceSearch'
