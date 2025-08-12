import { lazy, memo } from 'react'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/entities/devices/devices/infra/reducers/devicesFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const StatusCombobox = lazy(() =>
	import('@/entities/status/status/infra/ui/StatusComboBox').then(m => ({
		default: m.StatusCombobox
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
const ModelCombobox = lazy(() =>
	import('@/entities/model/models/infra/ui/ModelComboBox').then(m => ({
		default: m.ModelCombobox
	}))
)
interface ClasifyMainDeviceInputsProps {
	mode: FormMode
	isLoading: boolean
	statusId: DefaultDevice['statusId']
	mainCategoryId: DefaultDevice['mainCategoryId']
	categoryId: DefaultDevice['categoryId']
	brandId: DefaultDevice['brandId']
	modelId: DefaultDevice['modelId']
	errorStatusId: DevicesErrors['statusId']
	errorMainCategoryId: DevicesErrors['mainCategoryId']
	errorCategoryId: DevicesErrors['categoryId']
	errorBrandId: DevicesErrors['brandId']
	errorModelId: DevicesErrors['modelId']
	disabledStatusId: DevicesDisabled['statusId']
	disabledMainCategoryId: DevicesDisabled['mainCategoryId']
	disabledCategoryId: DevicesDisabled['categoryId']
	disabledBrandId: DevicesDisabled['brandId']
	disabledModelId: DevicesDisabled['modelId']
	requiredStatusId: DeviceRequired['statusId']
	requiredMainCategoryId: DeviceRequired['mainCategoryId']
	requiredCategoryId: DeviceRequired['categoryId']
	requiredBrandId: DeviceRequired['brandId']
	requiredModelId: DeviceRequired['modelId']
	handleChange: (name: Action['type'], value: string | number | boolean) => void
	handleModel: ({
		value,
		memoryRamSlotQuantity,
		memoryRamType,
		generic
	}: {
		value: string
		memoryRamSlotQuantity?: number
		memoryRamType?: string
		generic?: boolean
	}) => Promise<void>
}

export const ClasifyMainDeviceInputs = memo(
	({
		mode,
		isLoading,
		statusId,
		mainCategoryId,
		categoryId,
		brandId,
		modelId,
		errorStatusId,
		errorMainCategoryId,
		errorCategoryId,
		errorBrandId,
		errorModelId,
		disabledStatusId,
		disabledMainCategoryId,
		disabledCategoryId,
		disabledBrandId,
		disabledModelId,
		requiredStatusId,
		requiredMainCategoryId,
		requiredCategoryId,
		requiredBrandId,
		requiredModelId,
		handleChange,
		handleModel
	}: ClasifyMainDeviceInputsProps) => {
		return (
			<>
				<StatusCombobox
					value={statusId}
					handleChange={(_name, value) => handleChange('statusId', value)}
					name="statusId"
					isLoading={isLoading}
					error={errorStatusId}
					required={requiredStatusId}
					disabled={disabledStatusId}
				/>

				<MainCategoryCombobox
					value={mainCategoryId}
					handleChange={(_name, value) => handleChange('mainCategoryId', value)}
					name="mainCategoryId"
					isLoading={isLoading}
					error={errorMainCategoryId}
					required={requiredMainCategoryId}
					disabled={disabledMainCategoryId}
					readonly={mode === 'edit'}
				/>

				<CategoryCombobox
					value={categoryId}
					handleChange={(_name, value) => handleChange('categoryId', value)}
					mainCategoryId={mainCategoryId}
					name="categoryId"
					isLoading={isLoading}
					error={errorCategoryId}
					required={requiredCategoryId}
					disabled={disabledCategoryId}
					readonly={mode === 'edit'}
				/>

				<BrandCombobox
					value={brandId}
					handleChange={(_name, value) => handleChange('brandId', value)}
					name="brandId"
					isLoading={isLoading}
					error={errorBrandId}
					required={requiredBrandId}
					disabled={disabledBrandId}
					categoryId={categoryId}
					readonly={mode === 'edit'}
				/>

				<ModelCombobox
					value={modelId}
					handleFormChange={handleModel}
					brandId={brandId}
					categoryId={categoryId}
					name="modelId"
					isLoading={isLoading}
					method="form"
					readonly={mode === 'edit'}
					error={errorModelId}
					required={requiredModelId}
					disabled={disabledModelId}
				/>
			</>
		)
	}
)

ClasifyMainDeviceInputs.displayName = 'ClasifyMainDeviceInputs'
