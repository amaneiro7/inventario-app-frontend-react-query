import { useState, useMemo, memo, useCallback } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useGetAllSites } from '@/entities/locations/site/infra/hook/useGetAllSite'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type SiteFilters } from '@/entities/locations/site/application/createSiteQueryParams'

interface BaseProps {
	value?: string
	name: string
	cityId?: string
	stateId?: string
	regionId?: string
	administrativeRegionId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
}
interface SearchProps extends BaseProps {
	method: 'search'
	handleChange: (name: string, value: string | number) => void
}

interface FormProps extends BaseProps {
	method: 'form'
	handleFormChange: ({ value, siteName }: { value: string; siteName: string }) => void
}

type Props = SearchProps | FormProps

export const SiteCombobox = memo(function ({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	cityId,
	stateId,
	regionId,
	administrativeRegionId,
	method = 'search',
	...props
}: Props) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: SiteFilters = useMemo(() => {
		return {
			...(value ? { id: value } : {}),
			...(debouncedSearch ? { id: undefined, name: debouncedSearch } : { pageSize: 10 }),
			cityId,
			stateId,
			regionId,
			administrativeRegionId
		}
	}, [debouncedSearch, value, cityId, stateId, regionId])

	const { data, isLoading: loading } = useGetAllSites(query)

	const options = useMemo(() => data?.data ?? [], [data])

	const getSiteData = useCallback(
		(value: string | number) => {
			return options.find(site => site.id === value)
		},
		[options]
	)

	const handleChangeValue = useCallback(
		(name: string, value: string | number) => {
			if (method === 'form' && 'handleFormChange' in props) {
				const data = getSiteData(value)
				props.handleFormChange({
					value: `${value}`,
					siteName: data?.name ?? ''
				})
			} else if (method === 'search' && 'handleChange' in props) {
				props.handleChange(name, value)
			}
		},
		[getSiteData, method, props]
	)

	return (
		<>
			<Combobox
				id="site"
				label="Sitios"
				value={value}
				name={name}
				required={required}
				disabled={disabled}
				loading={loading}
				isLoading={isLoading}
				error={!!error}
				errorMessage={error}
				options={options}
				inputValue={inputValue}
				onInputChange={setInputValue}
				onChangeValue={handleChangeValue}
				readOnly={readonly}
			/>
		</>
	)
})
