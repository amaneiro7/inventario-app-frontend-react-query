import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import Typography from '@/shared/ui/Typography'
import { Checkbox } from '@/shared/ui/Checkbox'
import { MainCategoryCombobox } from '@/entities/mainCategory/infra/ui/MainCategoryComboBox'
import { CategoryCombobox } from '@/entities/category/infra/ui/CategoryComboBox'
import { BrandCombobox } from '@/entities/brand/infra/ui/BrandComboBox'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const AddtionalModelFeatures = lazy(() =>
	import('@/entities/model/models/infra/ui/ModelFeatures/AdditionalModelFeatures').then(m => ({
		default: m.AddtionalModelFeatures
	}))
)

interface ModelInputsProps {
	/**
	 * The current form data for the model.
	 */
	formData: DefaultModel
	/**
	 * An object containing validation errors for each form field.
	 */
	errors: ModelErrors
	/**
	 * An object indicating which form fields are required.
	 */
	required: ModelRequired
	/**
	 * An object indicating which form fields are disabled.
	 */
	disabled: ModelDisabled
	/**
	 * The current mode of the form (e.g., 'add' or 'edit').
	 */
	mode?: FormMode
	/**
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: any) => void
	isLoading: boolean
}

/**
 * `ModelInputs` is a memoized functional component that renders the input fields
 * for model information. It includes comboboxes for main category, category, and brand,
 * a text input for the model name, a checkbox for generic models, and dynamically loaded
 * additional features based on the selected main category and category.
 */
export const ModelInputs = memo(function ({
	errors,
	disabled,
	required,
	formData,
	mode,
	isLoading,
	handleChange
}: ModelInputsProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Clasificación del dispositivo
					</Typography>

					<MainCategoryCombobox
						value={formData.mainCategoryId}
						handleChange={(_name, value) => handleChange('mainCategoryId', value)}
						name="mainCategoryId"
						error={errors.mainCategoryId}
						required={required.mainCategoryId}
						disabled={disabled.mainCategoryId}
						readonly={mode === 'edit'}
						isLoading={isLoading}
					/>
					<CategoryCombobox
						value={formData.categoryId}
						handleChange={(_name, value) => handleChange('categoryId', value)}
						mainCategoryId={formData.mainCategoryId}
						name="categoryId"
						error={errors.categoryId}
						required={required.categoryId}
						disabled={disabled.categoryId}
						readonly={mode === 'edit'}
						isLoading={isLoading}
					/>
					<BrandCombobox
						value={formData.brandId}
						handleChange={(_name, value) => handleChange('brandId', value)}
						name="brandId"
						error={errors.brandId}
						required={required.brandId}
						disabled={disabled.brandId}
						readonly={mode === 'edit'}
						isLoading={isLoading}
					/>
				</div>
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Información del modelo
					</Typography>
					<Input
						id="model-name"
						value={formData.name}
						name="name"
						isLoading={isLoading}
						label="Nombre del modelo"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('name', e.target.value)
						}
						error={!!errors?.name}
						errorMessage={errors?.name}
						required={required.name}
						disabled={disabled.name}
					/>
					<Checkbox
						label="modelo genérico"
						text="¿Es un modelo genérico?"
						name="generic"
						value={formData.generic}
						onChange={e => {
							handleChange('generic', e.target.checked)
						}}
					/>
				</div>
			</div>

			{/* Informacion Adicional */}

			<AddtionalModelFeatures
				formData={formData}
				errors={errors}
				required={required}
				disabled={disabled}
				handleChange={handleChange}
				isLoading={isLoading}
			/>
		</div>
	)
})
