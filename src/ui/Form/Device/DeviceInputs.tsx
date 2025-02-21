import { lazy, memo, Suspense } from 'react'
import {
	Action,
	DefaultDevice,
	DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'
import { StatusCombobox } from '@/components/ComboBox/Sincrono/StatusComboBox'

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
					handleChange={handleChange}
					name="statusId"
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
				list="productCollection"
			/>
		</div>
	)
})
