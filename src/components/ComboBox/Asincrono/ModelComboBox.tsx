import { lazy, useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { useGetAllModel } from '@/hooks/getAll/useGetAllModel'
import { type ModelFilters } from '@/core/model/models/application/ModelGetByCriteria'

const Combobox = lazy(async () =>
	import('@/components/Input/Combobox').then(m => ({ default: m.Combobox }))
)

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
	handleChange: (name: string, value: string | number) => void
}) {
	const [query, setQuery] = useState<ModelFilters>({
		options: {
			id: value,
			categoryId,
			brandId
		},
		pageSize: value || categoryId || brandId ? undefined : 10
	})
	const { models, isLoading } = useGetAllModel(query)
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

	useEffect(() => {
		setQuery({
			options: {
				id: value,
				categoryId,
				brandId
			},
			pageSize: value || categoryId || brandId ? undefined : 10
		})
	}, [value, categoryId, brandId])

	return (
		<>
			<Combobox
				id="modelId"
				value={value}
				label="Modelos"
				inputValue={inputValue}
				name={name}
				loading={isLoading}
				options={models?.data ?? []}
				onChangeValue={handleChange}
				onInputChange={e => {
					setInputValue(e.target.value)
				}}
			/>
		</>
	)
}
