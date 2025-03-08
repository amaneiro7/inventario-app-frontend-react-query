import { memo } from 'react'
import {
	type DeviceRequired,
	type DevicesDisabled,
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { type FormMode } from '@/hooks/useGetFormMode'
import { StatusCombobox } from '@/components/ComboBox/Sincrono/StatusComboBox'
import { MainCategoryCombobox } from '@/components/ComboBox/Sincrono/MainCategoryComboBox'
import { CategoryCombobox } from '@/components/ComboBox/Sincrono/CategoryComboBox'
import { BrandCombobox } from '@/components/ComboBox/Asincrono/BrandComboBox'
import { ModelCombobox } from '@/components/ComboBox/Asincrono/ModelComboBox'

interface Props {
	mode: FormMode
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

export const ClasifyMainDeviceInputs = memo(function ({
	mode,
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
}: Props) {
	return (
		<>
			<StatusCombobox
				value={statusId}
				handleChange={(_name, value) => handleChange('statusId', value)}
				name="statusId"
				error={errorStatusId}
				required={requiredStatusId}
				disabled={disabledStatusId}
			/>
			<MainCategoryCombobox
				value={mainCategoryId}
				handleChange={(_name, value) => handleChange('mainCategoryId', value)}
				name="mainCategoryId"
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
				error={errorCategoryId}
				required={requiredCategoryId}
				disabled={disabledCategoryId}
				readonly={mode === 'edit'}
			/>
			<BrandCombobox
				value={brandId}
				handleChange={(_name, value) => handleChange('brandId', value)}
				name="brandId"
				error={errorBrandId}
				required={requiredBrandId}
				disabled={disabledBrandId}
				readonly={mode === 'edit'}
			/>
			<ModelCombobox
				value={modelId}
				handleFormChange={handleModel}
				brandId={brandId}
				categoryId={categoryId}
				name="modelId"
				method="form"
				readonly={mode === 'edit'}
				error={errorModelId}
				required={requiredModelId}
				disabled={disabledModelId}
			/>
		</>
	)
})
