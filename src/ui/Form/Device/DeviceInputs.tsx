import { lazy, memo, Suspense } from 'react'
import {
	Action,
	DefaultDevice,
	DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { StatusCombobox } from '@/components/ComboBox/Sincrono/StatusComboBox'
import { MainCategoryCombobox } from '@/components/ComboBox/Sincrono/MainCategoryComboBox'
import { CategoryCombobox } from '@/components/ComboBox/Sincrono/CategoryComboBox'
import { BrandCombobox } from '@/components/ComboBox/Asincrono/BrandComboBox'
import { ModelCombobox } from '@/components/ComboBox/Asincrono/ModelComboBox'
import { EmployeeCombobox } from '@/components/ComboBox/Asincrono/EmployeeComboBox'
import { LocationCombobox } from '@/components/ComboBox/Asincrono/LocationComboBox'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	errors?: DevicesErrors
	formData: DefaultDevice
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const DeviceInputs = memo(function ({ errors, formData, handleChange }: Props) {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-5 gap-y-6">
			<Suspense>
				<StatusCombobox
					value={formData.statusId}
					handleChange={(_name, value) => handleChange('statusId', value)}
					name="statusId"
				/>
			</Suspense>
			<Suspense>
				<MainCategoryCombobox
					value={formData.mainCategoryId}
					handleChange={(_name, value) => handleChange('mainCategoryId', value)}
					name="mainCategoryId"
				/>
			</Suspense>
			<Suspense>
				<CategoryCombobox
					value={formData.categoryId}
					handleChange={(_name, value) => handleChange('categoryId', value)}
					mainCategoryId={formData.mainCategoryId}
					name="categoryId"
				/>
			</Suspense>
			<Suspense>
				<BrandCombobox
					value={formData.brandId}
					handleChange={(_name, value) => handleChange('brandId', value)}
					name="brandId"
				/>
			</Suspense>
			<Suspense>
				<ModelCombobox
					value={formData.modelId}
					handleChange={(_name, value) => handleChange('modelId', value)}
					brandId={formData.brandId}
					categoryId={formData.categoryId}
					name="modelId"
				/>
			</Suspense>
			<Input
				value={formData.serial ?? ''}
				name="serial"
				label="Serial"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('serial', e.target.value)
				}
				error={!!errors?.serial}
				errorMessage={errors?.serial}
				required
			/>
			<Input
				value={formData.activo ?? ''}
				name="activo"
				label="Activo"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('activo', e.target.value)
				}
				error={!!errors?.activo}
				errorMessage={errors?.activo}
				required
			/>
			<Suspense>
				<EmployeeCombobox
					value={formData.employeeId ?? ''}
					handleChange={(_name, value) => handleChange('employeeId', value)}
					name="employeeId"
				/>
			</Suspense>
			<div className="flex gap-5 col-span-2">
				<Suspense>
					<LocationCombobox
						value={formData.locationId ?? ''}
						handleChange={(_name, value) => handleChange('locationId', value)}
						name="locationId"
					/>
				</Suspense>
				<Input
					value={formData.stockNumber ?? ''}
					name="stockNumber"
					label="N° de Stock"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('stockNumber', e.target.value)
					}
					error={!!errors?.stockNumber}
					errorMessage={errors?.stockNumber}
				/>
			</div>
			<Input
				value={formData.observation ?? ''}
				name="observation"
				label="Observación"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('observation', e.target.value)
				}
				error={!!errors?.observation}
				errorMessage={errors?.observation}
				required
			/>
		</div>
	)
})
