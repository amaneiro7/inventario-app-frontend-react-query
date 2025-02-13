import { lazy } from 'react'
import { type Action } from '@/core/brand/infra/reducers/brandFormReducer'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	error: boolean
	key?: string
	errorMessage?: string
	formData: BrandParams
	handleChange: (name: Action['type'], value: string) => void
}

export function BrandInputs({ errorMessage, error, formData, key, handleChange }: Props) {
	return (
		<Input
			key={key}
			value={formData.name}
			name="name"
			label="Nombre de la marca"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				handleChange('name', e.target.value)
			}
			error={error}
			errorMessage={errorMessage}
			required
		/>
	)
}
