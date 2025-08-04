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
	formData: DefaultModel
	errors: ModelErrors
	required: ModelDisabled
	disabled: ModelRequired
	handleChange: (name: Action['type'], value: any) => void
}

export function AddtionalModelFeatures({
	formData,
	disabled,
	errors,
	required,
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
