/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import { Input } from '@/components/Input/Input'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/core/model/models/infra/reducers/modelFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { MainCategoryCombobox } from '@/components/ComboBox/Sincrono/MainCategoryComboBox'
import { CategoryCombobox } from '@/components/ComboBox/Sincrono/CategoryComboBox'
import { BrandCombobox } from '@/components/ComboBox/Asincrono/BrandComboBox'
import { Checkbox } from '@/components/Checkbox/Checbox'
import { MainCategoryOptions } from '@/core/mainCategory/domain/entity/MainCategoryOptions'
import { AddModelComputerFeatures } from './AddModelComputerFeatures'
import { AddModelMonitorFeatures } from './AddModelMonitorFeatures'
import { AddModelPrinterFeatures } from './AddModelPrinter'
import { CategoryOptions } from '@/core/category/domain/entity/CategoryOptions'
import { AddModelKeyboardFeatures } from './AddModelKeyboardFeatures'

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
		<>
			<MainCategoryCombobox
				value={formData.mainCategoryId}
				handleChange={(_name, value) => handleChange('mainCategoryId', value)}
				name="mainCategoryId"
				error={errors.mainCategoryId}
				required={required.mainCategoryId}
				disabled={disabled.mainCategoryId}
				readonly={mode === 'edit'}
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
			/>
			<BrandCombobox
				value={formData.brandId}
				handleChange={(_name, value) => handleChange('brandId', value)}
				name="brandId"
				error={errors.brandId}
				required={required.brandId}
				disabled={disabled.brandId}
				readonly={mode === 'edit'}
			/>
			<Input
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
			{formData.mainCategoryId === MainCategoryOptions.COMPUTER ? (
				<AddModelComputerFeatures
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					handleChange={handleChange}
				/>
			) : null}
			{formData.mainCategoryId === MainCategoryOptions.SCREENS ? (
				<AddModelMonitorFeatures
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					handleChange={handleChange}
				/>
			) : null}
			{formData.mainCategoryId === MainCategoryOptions.PRINTERS ? (
				<AddModelPrinterFeatures
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					handleChange={handleChange}
				/>
			) : null}
			{formData.categoryId === CategoryOptions.KEYBOARD ? (
				<AddModelKeyboardFeatures
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					handleChange={handleChange}
				/>
			) : null}
		</>
	)
})
