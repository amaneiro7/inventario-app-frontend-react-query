/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, memo, Suspense } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import Typography from '@/shared/ui/Typography'
import { Checkbox } from '@/shared/ui/Checkbox'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

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
const MainCategoryCombobox = lazy(() =>
	import('@/entities/mainCategory/infra/ui/MainCategoryComboBox').then(m => ({
		default: m.MainCategoryCombobox
	}))
)
const CategoryCombobox = lazy(() =>
	import('@/entities/category/infra/ui/CategoryComboBox').then(m => ({
		default: m.CategoryCombobox
	}))
)
const BrandCombobox = lazy(() =>
	import('@/entities/brand/infra/ui/BrandComboBox').then(m => ({ default: m.BrandCombobox }))
)

interface Props {
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
}

export const ModelInputs = memo(function ({
	errors,
	disabled,
	required,
	formData,
	mode,
	handleChange
}: Props) {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-5">
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Clasificación del dispositivo
					</Typography>
					<Suspense fallback={<InputFallback />}>
						<MainCategoryCombobox
							value={formData.mainCategoryId}
							handleChange={(_name, value) => handleChange('mainCategoryId', value)}
							name="mainCategoryId"
							error={errors.mainCategoryId}
							required={required.mainCategoryId}
							disabled={disabled.mainCategoryId}
							readonly={mode === 'edit'}
						/>
					</Suspense>
					<Suspense fallback={<InputFallback />}>
						<CategoryCombobox
							value={formData.categoryId}
							handleChange={(_name, value) => handleChange('categoryId', value)}
							mainCategoryId={formData.mainCategoryId}
							name="categoryId"
							error={errors.categoryId}
							required={required.categoryId}
							disabled={disabled.categoryId}
							readonly={mode === 'edit'}
						/>
					</Suspense>
					<Suspense fallback={<InputFallback />}>
						<BrandCombobox
							value={formData.brandId}
							handleChange={(_name, value) => handleChange('brandId', value)}
							name="brandId"
							error={errors.brandId}
							required={required.brandId}
							disabled={disabled.brandId}
							readonly={mode === 'edit'}
						/>
					</Suspense>
				</div>
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Información del modelo
					</Typography>
					<Input
						id="model-name"
						value={formData.name}
						name="name"
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
			<Suspense>
				<AddtionalModelFeatures
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					handleChange={handleChange}
				/>
			</Suspense>
		</div>
	)
})
