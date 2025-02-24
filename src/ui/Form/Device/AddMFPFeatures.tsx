import { lazy, memo } from 'react'
import {
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/core/devices/devices/infra/reducers/devicesFormReducer'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	error: DevicesErrors['ipAddress']
	ipAddress: DefaultDevice['ipAddress']
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const AddMFPFeatures = memo(function ({ ipAddress, error, handleChange }: Props) {
	return (
		<Input
			value={ipAddress ?? ''}
			name="ipAddress"
			label="Dirección IP"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				handleChange('ipAddress', e.target.value)
			}
			error={!!error}
			errorMessage={error}
		/>
	)
})
