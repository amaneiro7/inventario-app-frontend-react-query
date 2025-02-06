import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useGetAllBrands } from '@/hooks/getAll/useGetAllBrand'
import { Combobox } from '@/components/ComboBox/Combobox'
import { type BrandFilters } from '@/core/brand/application/BrandGetByCiteria'

export function BrandCombobox({
	value = '',
	name,
	handleChange
}: {
	value?: string
	name: string
	handleChange: (name: string, value: string) => void
}) {
	const [query, setQuery] = useState<BrandFilters>({
		options: {
			id: value
		}
	})
	const { brands, isLoading } = useGetAllBrands(query)
	const initialValue = useMemo(() => {
		return brands?.data.find(brand => brand.id === value) ?? null
	}, [value, brands])
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	useEffectAfterMount(() => {
		if (debouncedSearch === '') return
		setQuery({
			options: {
				name: debouncedSearch
			},
			pageSize: debouncedSearch === '' ? 10 : undefined
		})
	}, [debouncedSearch])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Marca"
				value={initialValue}
				options={brands?.data ?? []}
				inputValue={inputValue}
				onChange={(_, newValue) => {
					handleChange(name, newValue?.id ?? '')
				}}
				onInputChange={(_, newInputValue, reason) => {
					if (reason === 'reset') return
					setInputValue(newInputValue)
				}}
			/>
		</>
	)
}
