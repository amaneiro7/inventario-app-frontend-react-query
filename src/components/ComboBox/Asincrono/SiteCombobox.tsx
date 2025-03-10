import { useState, useMemo, Suspense, lazy } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useGetAllSites } from '@/core/locations/site/infra/hook/useGetAllSite'
import { type SiteFilters } from '@/core/locations/site/application/createSiteQueryParams'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)
const Input = lazy(async () => import('@/components/Input/Input').then(m => ({ default: m.Input })))

interface SearchProps {
	value?: string
	name: string
	cityId?: string
	stateId?: string
	regionId?: string
	method: 'search'
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleChange: (name: string, value: string | number) => void
}

interface FormProps {
	value?: string
	name: string
	cityId?: string
	stateId?: string
	regionId?: string
	method: 'form'
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	handleFormChange: ({ value, siteName }: { value: string; siteName: string }) => void
}

type Props = SearchProps | FormProps

export function SiteCombobox({
	value = '',
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	cityId,
	stateId,
	regionId,
	method = 'search',
	...props
}: Props) {
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue, 250)

	const query: SiteFilters = useMemo(() => {
		return {
			...(debouncedSearch ? { name: debouncedSearch } : { pageSize: 10 }),
			...(value ? { id: value } : {}),
			cityId,
			stateId,
			regionId
		}
	}, [debouncedSearch, value, cityId, stateId, regionId])

	const { sites, isLoading } = useGetAllSites(query)

	const options = useMemo(() => sites?.data ?? [], [sites])

	const handleChangeValue = (name: string, value: string | number) => {
		if (method === 'form') {
			const data = options.find(location => location.id === value) // Optional chaining
			;(props as FormProps).handleFormChange({
				// Type assertion for FormProps
				value: `${value}`,
				siteName: data?.name ?? ''
			})
		} else {
			;(props as SearchProps).handleChange(name, value) // Type assertion for SearchProps
		}
	}

	const render = useMemo(() => {
		const id = 'site'
		const label = 'Sitios'

		if (readonly) {
			const initialValue = options.find(Site => Site.id === value)
			return (
				<Suspense>
					<Input
						id={id}
						label={label}
						value={initialValue?.name ?? ''}
						required
						name={name}
						readOnly
						tabIndex={-1}
						aria-readonly
					/>
				</Suspense>
			)
		}
		return (
			<Suspense>
				<Combobox
					id={id}
					label={label}
					value={value}
					name={name}
					required={required}
					disabled={disabled}
					loading={isLoading}
					error={!!error}
					errorMessage={error}
					options={options}
					inputValue={inputValue}
					onInputChange={value => {
						setInputValue(value)
					}}
					onChangeValue={handleChangeValue}
				/>
			</Suspense>
		)
	}, [
		sites,
		regionId,
		stateId,
		cityId,
		value,
		readonly,
		isLoading,
		required,
		disabled,
		error,
		name,
		handleChangeValue
	])

	return <>{render}</>
}
