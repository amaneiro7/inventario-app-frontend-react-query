import { lazy, memo } from 'react'
import {
	Action,
	DefaultDevice,
	DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'

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
		<>
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
		</>
	)
})
