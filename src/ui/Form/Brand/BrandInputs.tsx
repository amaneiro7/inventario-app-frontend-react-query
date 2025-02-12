import { lazy, Suspense } from 'react'
import { InputSkeletonLoading } from '@/sections/components/skeleton/inputSkeletonLoading'
import {
	type FormBrandDisabled,
	type FormBrandErrors,
	type FormBrandRequired,
	type DefaultBrandProps
} from '@/sections/Hooks/brand/DefaultInitialBrandState'

const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

interface Props {
	disabled: FormBrandDisabled
	error: FormBrandErrors
	required: FormBrandRequired
	formData: DefaultBrandProps
	handleChange: (name: string, value: string) => void
}

export function BrandInputs({ required, disabled, error, formData, handleChange }: Props) {
	return (
		<Input
			value={formData.name}
			onChange={() => handleChange()}
			error={error.name}
			isDisabled={disabled.name}
			isRequired={required.name}
		/>
	)
}
