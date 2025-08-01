import { useMemo, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { SearchInput } from '@/shared/ui/Input/Search'
import { useGetAllSites } from '@/entities/locations/site/infra/hook/useGetAllSite'
import { SiteRenderOption } from '@/shared/ui/Input/Combobox/RenderOption/SiteRenderOption'
import { type SiteFilters } from '@/entities/locations/site/application/createSiteQueryParams'

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
