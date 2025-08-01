import { useCallback, useMemo, useState } from 'react'
import { useGetAllCategory } from '@/entities/category/infra/hook/useGetAllCategory'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import Typography from '@/shared/ui/Typography'
import { TransferListItem } from '@/shared/ui/TransferList/TransferListItem'
import { type CategoryDto } from '@/entities/category/domain/dto/Category.dto'

interface CategoryTransferListProps {
	value?: CategoryDto['id'][]
	name: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	onAddCategory: (name: 'addCategory', value: string) => void
	onRemoveCategory: (name: 'removeCategory', value: string) => void
}

export function CategoryTransferList({
	value: categories = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	onAddCategory,
	onRemoveCategory
}: CategoryTransferListProps) {
	const [inputValue, setInputValue] = useState('')
	const { categories: allCategories, isLoading } = useGetAllCategory({})

	const availableOptions = useMemo(
		() => allCategories?.data?.filter(category => !categories.includes(category.id)) ?? [],
		[allCategories, categories]
	)

	const filteredOptions = useFilterOptions({ inputValue, options: availableOptions })

	const handleAddCategory = useCallback(
		(categoryId: string) => {
			onAddCategory('addCategory', categoryId)
		},
		[onAddCategory]
	)

	const handleRemoveCategory = useCallback(
		(categoryId: string) => {
			onRemoveCategory('removeCategory', categoryId)
		},
		[onRemoveCategory]
	)

	return (
		<div className="grid items-start justify-between gap-4 md:grid-cols-2">
			<Combobox
				id="CategoryId"
				label="Categories"
				value=""
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				loading={isLoading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={(_name, value) => handleAddCategory(value)}
				readOnly={readonly}
			/>
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					Categoria Seleccionadas
				</Typography>
				{categories.length > 0 ? (
					<ul role="options" className="flex w-full flex-col rounded">
						{categories.map(categoryId => {
							const cargo = allCategories?.data?.find(c => c.id === categoryId)
							return (
								<TransferListItem
									key={categoryId}
									id={categoryId}
									name={cargo?.name}
									onRemove={handleRemoveCategory}
								/>
							)
						})}
					</ul>
				) : (
					<Typography className="p-2" variant="p" color="gris">
						No se han seleccionado categorias.
					</Typography>
				)}
			</div>
		</div>
	)
}
