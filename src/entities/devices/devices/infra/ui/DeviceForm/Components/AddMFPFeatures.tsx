import { memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import {
	type Action,
	type DefaultDevice,
	type DevicesErrors
} from '@/entities/devices/devices/infra/reducers/devicesFormReducer'

interface AddMFPFeaturesProps {
	error: DevicesErrors['ipAddress']
	ipAddress: DefaultDevice['ipAddress']
	isLoading: boolean
	canEdit: boolean
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const AddMFPFeatures = memo(
	({ ipAddress, error, isLoading, canEdit, handleChange }: AddMFPFeaturesProps) => {
		return (
			<Input
				id="mfp-ipaddress"
				value={ipAddress ?? ''}
				name="ipAddress"
				isLoading={isLoading}
				label="Dirección IP"
				readOnly={!canEdit}
				type="text"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('ipAddress', e.target.value)
				}
				error={!!error}
				errorMessage={error}
			/>
		)
	}
)

AddMFPFeatures.displayName = 'AddMFPFeatures'
