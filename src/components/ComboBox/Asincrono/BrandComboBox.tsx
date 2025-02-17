import { lazy, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useGetAllBrands } from '@/core/brand/infra/hooks/useGetAllBrand'
import { type BrandFilters } from '@/core/brand/application/BrandGetByCiteria'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

export function BrandCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [query, setQuery] = useState<BrandFilters>({
		options: {
			id: value
		},
		pageSize: value ? undefined : 10
	})
	const { brands, isLoading } = useGetAllBrands(query)
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	useEffectAfterMount(() => {
		setQuery({
			options: {
				name: debouncedSearch
			},
			pageSize: debouncedSearch === '' ? 10 : undefined
		})
	}, [debouncedSearch])

	useEffect(() => {
		setQuery({
			options: {
				id: value
			},
			pageSize: value ? undefined : 10
		})
	}, [value])

	useEffect(() => {
		setQuery({
			options: {
				id: value
			},
			pageSize: value ? undefined : 10
		})
	}, [value])

	return (
		<>
			<Combobox
				id="brand"
				label="Marca"
				value={value}
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={brands?.data ?? []}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
				onChangeValue={handleChange}
			/>
		</>
	)
}
