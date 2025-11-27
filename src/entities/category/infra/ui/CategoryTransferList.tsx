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
	isLoading?: boolean
	onAddCategory: (name: 'addCategory', value: string) => void
	onRemoveCategory: (name: 'removeCategory', value: string) => void
}

/**
 * `CategoryTransferList`
 * @component
 * @description Componente que permite añadir y eliminar categorías de una lista.
 * Utiliza un `Combobox` para seleccionar categorías disponibles y muestra las seleccionadas en una lista.
 * @param {object} props - Las propiedades del componente.
 * @param {CategoryDto['id'][]} [props.value=[]] - Un array de IDs de categorías seleccionadas.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {boolean} [props.readonly=false] - Indica si el campo es de solo lectura.
 * @param {(name: 'addCategory', value: string) => void} props.onAddCategory - Función de callback para añadir una categoría.
 * @param {(name: 'removeCategory', value: string) => void} props.onRemoveCategory - Función de callback para eliminar una categoría.
 */
export function CategoryTransferList({
	value: categories = [],
	name,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	onAddCategory,
	onRemoveCategory
}: CategoryTransferListProps) {
	const [inputValue, setInputValue] = useState('')
	const { data: allCategories, isLoading: loading } = useGetAllCategory({})

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
				loading={loading}
				isLoading={isLoading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={(_name, value) => handleAddCategory(value)}
				readOnly={readonly}
			/>
			<div className="rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					Categorias Seleccionadas
				</Typography>
				{categories.length > 0 ? (
					<ul role="options" className="flex w-full flex-col rounded">
						{categories.map(categoryId => {
							const cargo = allCategories?.data?.find(c => c.id === categoryId)
							return (
								<TransferListItem
									key={categoryId}
									isLoading={isLoading}
									id={categoryId}
									name={cargo?.name}
									readOnly={readonly}
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
