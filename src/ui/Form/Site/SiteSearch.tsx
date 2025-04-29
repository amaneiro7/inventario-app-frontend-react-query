import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { SearchInput } from '@/components/Input/Search'
import { useGetAllSites } from '@/core/locations/site/infra/hook/useGetAllSite'
import { SiteRenderOption } from '@/components/Input/Combobox/RenderOption/SiteRenderOption'
import { type SiteFilters } from '@/core/locations/site/application/createSiteQueryParams'

export function SiteSearch() {
	const [searchValue, setSearchValue] = useState('')
	const [debouncedSearch] = useDebounce(searchValue, 250)
	const [value, setValue] = useState('')

	const query: SiteFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 })
		}
	}, [debouncedSearch])

	const { sites, isLoading } = useGetAllSites(query)

	const options = useMemo(() => sites?.data ?? [], [sites])

	const handleValue = (value: string) => {
		setValue(value)
	}
	return (
		<SearchInput
			id="site-search-name"
			search={searchValue}
			handleChange={value => {
				setSearchValue(value)
			}}
			url={`/form/site/edit/${value}`}
			name="siteSearch"
			onChangeValue={handleValue}
			loading={isLoading}
			options={options}
			value={value}
			title="Búsqueda por sitio"
			renderOption={SiteRenderOption}
		/>
	)
}
