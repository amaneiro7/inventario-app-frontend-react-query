import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { CategoryTransferList } from '@/entities/category/infra/ui/CategoryTransferList'
import {
	type BrandErrors,
	type Action,
	type DefaultBrand
} from '@/entities/brand/infra/reducers/brandFormReducer'

interface BrandInputsProps {
	formData: DefaultBrand
	errors?: BrandErrors
	handleChange: (name: Action['type'], value: string) => void
}

export const BrandInputs = memo(({ errors, formData, handleChange }: BrandInputsProps) => {
	return (
		<>
			<Input
				id="brand-name"
				value={formData.name}
				name="name"
				label="Nombre de la marca"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('name', e.target.value)
				}
				error={!!errors?.name}
				errorMessage={errors?.name}
				required
			/>
			<CategoryTransferList
				value={formData.categories}
				name="categories"
				onAddCategory={handleChange}
				onRemoveCategory={handleChange}
			/>
		</>
	)
})

BrandInputs.displayName = 'BrandInputs'
