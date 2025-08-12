import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type BrandErrors,
	type Action,
	type DefaultBrand
} from '@/entities/brand/infra/reducers/brandFormReducer'

const CategoryTransferList = lazy(() =>
	import('@/entities/category/infra/ui/CategoryTransferList').then(m => ({
		default: m.CategoryTransferList
	}))
)
interface BrandInputsProps {
	formData: DefaultBrand
	errors?: BrandErrors
	isLoading: boolean
	handleChange: (name: Action['type'], value: string) => void
}

/**
 * `BrandInputs`
 * @component
 * @description Componente que renderiza los campos de entrada para la entidad `Brand`.
 * Incluye el nombre de la marca y la lista de categorías asociadas.
 * @param {object} props - Las propiedades del componente.
 * @param {DefaultBrand} props.formData - Los datos del formulario de la marca.
 * @param {BrandErrors} [props.errors] - Los errores de validación para los campos del formulario.
 * @param {(name: Action['type'], value: string) => void} props.handleChange - Función de callback para manejar los cambios en los campos de entrada.
 */
export const BrandInputs = memo(
	({ errors, isLoading, formData, handleChange }: BrandInputsProps) => {
		return (
			<>
				<Input
					id="brand-name"
					value={formData.name}
					name="name"
					label="Nombre de la marca"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('name', e.target.value)
					}
					error={!!errors?.name}
					errorMessage={errors?.name}
					required
				/>
				<CategoryTransferList
					isLoading={isLoading}
					value={formData.categories}
					name="categories"
					onAddCategory={handleChange}
					onRemoveCategory={handleChange}
				/>
			</>
		)
	}
)

BrandInputs.displayName = 'BrandInputs'
