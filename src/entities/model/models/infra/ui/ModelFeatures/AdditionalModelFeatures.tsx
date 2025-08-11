/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useMemo } from 'react'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'
import Typography from '@/shared/ui/Typography'
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'

const AddModelComputerFeatures = lazy(async () =>
	import('./AddModelComputerFeatures').then(m => ({ default: m.AddModelComputerFeatures }))
)
const AddModelMonitorFeatures = lazy(async () =>
	import('./AddModelMonitorFeatures').then(m => ({ default: m.AddModelMonitorFeatures }))
)
const AddModelPrinterFeatures = lazy(async () =>
	import('./AddModelPrinterFeatures').then(m => ({ default: m.AddModelPrinterFeatures }))
)
const AddModelKeyboardFeatures = lazy(async () =>
	import('./AddModelKeyboardFeatures').then(m => ({ default: m.AddModelKeyboardFeatures }))
)

interface AddtionalModelFeaturesProps {
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
	 * Callback function to handle changes in form input fields.
	 * @param name - The name of the field being changed.
	 * @param value - The new value of the field.
	 */
	handleChange: (name: Action['type'], value: any) => void
	isLoading: boolean
}

/**
 * `AddtionalModelFeatures` is a functional component that dynamically renders additional input fields
 * based on the selected main category and category of the model. It uses lazy loading for feature components.
 */
export function AddtionalModelFeatures({
	formData,
	disabled,
	errors,
	required,
	isLoading,
	handleChange
}: AddtionalModelFeaturesProps) {
	const additionalFeatures = useMemo(() => {
		// Condición adicional para teclados basada en categoryId
		if (formData.categoryId === CategoryOptions.KEYBOARD) {
			return (
				<AddModelKeyboardFeatures
					formData={formData}
					errors={errors}
					required={required}
					disabled={disabled}
					handleChange={handleChange}
					isLoading={isLoading}
				/>
			)
		}
		// Lógica existente basada en mainCategoryId
		switch (formData.mainCategoryId) {
			case MainCategoryOptions.COMPUTER:
				return (
					<AddModelComputerFeatures
						formData={formData}
						errors={errors}
						required={required}
						disabled={disabled}
						handleChange={handleChange}
						isLoading={isLoading}
					/>
				)
			case MainCategoryOptions.SCREENS:
				return (
					<AddModelMonitorFeatures
						formData={formData}
						errors={errors}
						required={required}
						disabled={disabled}
						handleChange={handleChange}
						isLoading={isLoading}
					/>
				)
			case MainCategoryOptions.PRINTERS:
				return (
					<AddModelPrinterFeatures
						formData={formData}
						errors={errors}
						required={required}
						disabled={disabled}
						handleChange={handleChange}
						isLoading={isLoading}
					/>
				)
			default:
				return null
		}
	}, [formData, errors, disabled, required, handleChange])
	return (
		<>
			{additionalFeatures !== null && (
				<div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-8 pt-4">
					<Typography color="azul" variant="h4">
						Información Adicional
					</Typography>
					<Suspense>{additionalFeatures}</Suspense>
				</div>
			)}
		</>
	)
}
