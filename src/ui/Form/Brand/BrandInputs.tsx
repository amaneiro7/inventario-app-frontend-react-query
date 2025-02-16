import { lazy, memo } from 'react'
import { type BrandErrors, type Action } from '@/core/brand/infra/reducers/brandFormReducer'
import { type BrandParams } from '@/core/brand/domain/dto/Brand.dto'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	errors?: BrandErrors
	formData: BrandParams
	handleChange: (name: Action['type'], value: string) => void
}

export const BrandInputs = memo(function ({ errors, formData, handleChange }: Props) {
	return (
		<Input
			value={formData.name}
			name="name"
			label="Nombre de la marca"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
				handleChange('name', e.target.value)
			}
			error={!!errors?.name}
			errorMessage={errors?.name}
			required
		/>
	)
})
