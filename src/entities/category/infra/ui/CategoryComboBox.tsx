import { memo, useMemo, useState } from 'react'
import { useGetAllCategory } from '@/entities/category/infra/hook/useGetAllCategory'
import { useFilterOptions } from '@/shared/lib/hooks/useFilterOptions'
import { Combobox } from '@/shared/ui/Input/Combobox'
import { type CategoryFilters } from '@/entities/category/application/CreateCategoryQueryParams'

/**
 * `CategoryCombobox`
 * @component
 * @description Componente Combobox para seleccionar una categoría.
 * Permite buscar y seleccionar categorías, con opciones de filtrado por categoría principal.
 * @param {object} props - Las propiedades del componente.
 * @param {string} [props.value=''] - El ID de la categoría seleccionada.
 * @param {string} props.name - El nombre del campo del formulario.
 * @param {string} [props.error=''] - Mensaje de error a mostrar.
 * @param {boolean} [props.required=false] - Indica si el campo es requerido.
 * @param {boolean} [props.disabled=false] - Indica si el campo está deshabilitado.
 * @param {boolean} [props.readonly=false] - Indica si el campo es de solo lectura.
 * @param {string} [props.mainCategoryId=''] - ID de la categoría principal para filtrar categorías.
 * @param {(name: string, value: string | number) => void} props.handleChange - Función de callback para manejar el cambio de valor.
 */
export const CategoryCombobox = memo(function ({
	value = '',
	name,
	mainCategoryId,
	error = '',
	required = false,
	disabled = false,
	readonly = false,
	isLoading = false,
	handleChange
}: {
	value?: string
	name: string
	mainCategoryId?: string
	error?: string
	required?: boolean
	disabled?: boolean
	readonly?: boolean
	isLoading?: boolean
	handleChange: (name: string, value: string | number) => void
}) {
	const [inputValue, setInputValue] = useState('')
	const query: CategoryFilters = useMemo(
		() => ({
			mainCategoryId
		}),
		[value, mainCategoryId]
	)

	const { data, isLoading: loading } = useGetAllCategory(query)

	const options = useMemo(() => data?.data ?? [], [data])

	const filteredOptions = useFilterOptions({ options, inputValue })

	return (
		<>
			<Combobox
				id="category"
				label="SubCategoria"
				value={value}
				inputValue={inputValue}
				name={name}
				required={required}
				disabled={disabled}
				error={!!error}
				errorMessage={error}
				isLoading={isLoading}
				loading={loading}
				options={filteredOptions}
				onInputChange={setInputValue}
				onChangeValue={handleChange}
				readOnly={readonly}
			/>
		</>
	)
})
