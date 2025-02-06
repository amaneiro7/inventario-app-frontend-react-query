import { useMemo, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { Combobox } from '@/components/ComboBox/Combobox'
import { useGetAllModel } from '@/hooks/getAll/useGetAllModel'
import { type ModelFilters } from '@/core/model/models/application/ModelGetByCriteria'

export function ModelCombobox({
	value = '',
	name,
	categoryId,
	brandId,
	handleChange
}: {
	value?: string
	name: string
	categoryId?: string
	brandId?: string
	handleChange: (name: string, value: string) => void
}) {
	const [query, setQuery] = useState<ModelFilters>({
		options: {
			id: value,
			categoryId,
			brandId
		}
	})
	const { models, isLoading } = useGetAllModel(query)
	const initialValue = useMemo(() => {
		return models?.data.find(model => model.id === value) ?? null
	}, [value, models])
	const [inputValue, setInputValue] = useState('')
	const [debouncedSearch] = useDebounce(inputValue)

	useEffectAfterMount(() => {
		setQuery({
			options: {
				name: debouncedSearch,
				categoryId,
				brandId
			},
			pageSize: debouncedSearch === '' ? 10 : undefined
		})
	}, [debouncedSearch, categoryId, brandId])

	return (
		<>
			<Combobox
				loading={isLoading}
				label="Modelos"
				value={initialValue}
				options={models?.data ?? []}
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
