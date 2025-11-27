/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense, useMemo } from 'react'
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'
import { CategoryOptions } from '@/entities/category/domain/entity/CategoryOptions'
import Typography from '@/shared/ui/Typography'
import { ModelSkeleton } from '../ModelSkeletons/ModelFormLayoutSkeleton'
import {
	type Action,
	type DefaultModel,
	type ModelDisabled,
	type ModelErrors,
	type ModelRequired
} from '@/entities/model/models/infra/reducers/modelFormReducer'

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
	required: ModelRequired
	disabled: ModelDisabled
	handleChange: (name: Action['type'], value: any) => void
	isLoading: boolean
	canEdit: boolean
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
	canEdit,
	handleChange
}: AddtionalModelFeaturesProps) {
	const additionalFeatures = useMemo(() => {
		// Condición adicional para teclados basada en categoryId
		if (formData.categoryId === CategoryOptions.KEYBOARD) {
			return (
				<Suspense fallback={<ModelSkeleton type="keyboard" />}>
					<AddModelKeyboardFeatures
						formData={formData}
						errors={errors}
						required={required}
						disabled={disabled}
						handleChange={handleChange}
						isLoading={isLoading}
						canEdit={canEdit}
					/>
				</Suspense>
			)
		}
		// Lógica existente basada en mainCategoryId
		switch (formData.mainCategoryId) {
			case MainCategoryOptions.COMPUTER:
				return (
					<Suspense fallback={<ModelSkeleton type="computer" />}>
						<AddModelComputerFeatures
							formData={formData}
							errors={errors}
							required={required}
							disabled={disabled}
							handleChange={handleChange}
							isLoading={isLoading}
							canEdit={canEdit}
						/>
					</Suspense>
				)
			case MainCategoryOptions.SCREENS:
				return (
					<Suspense fallback={<ModelSkeleton type="screens" />}>
						<AddModelMonitorFeatures
							formData={formData}
							errors={errors}
							required={required}
							disabled={disabled}
							handleChange={handleChange}
							isLoading={isLoading}
							canEdit={canEdit}
						/>
					</Suspense>
				)
			case MainCategoryOptions.PRINTERS:
				return (
					<Suspense fallback={<ModelSkeleton type="printer" />}>
						<AddModelPrinterFeatures
							formData={formData}
							errors={errors}
							required={required}
							disabled={disabled}
							handleChange={handleChange}
							isLoading={isLoading}
							canEdit={canEdit}
						/>
					</Suspense>
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
					{additionalFeatures}
				</div>
			)}
		</>
	)
}
