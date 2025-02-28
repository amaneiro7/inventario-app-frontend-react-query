import { useEffect, useState } from 'react'
import { MemoryRamValues } from '@/core/devices/devices/domain/value-object/MemoryRamValues'
import { Input } from '@/components/Input/Input'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

interface Props {
	value: Primitives<MemoryRamValues>
	index: number
	onChange: (value: string, index: number) => void
}

export function MemoryRamCapacitySlotInput({ value, index, onChange }: Props) {
	const [errorMessage, setErrorMessage] = useState('')
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		const isValid = MemoryRamValues.isValid(value)

		setIsError(!isValid)
		setErrorMessage(isValid ? '' : MemoryRamValues.invalidMessage())

		return () => {
			setErrorMessage('')
			setIsError(false)
		}
	}, [index, value])

	return (
		<Input
			name="memoryRam"
			label={`Memoria Ram Slot ${index}`}
			type="number"
			value={value}
			onChange={event => {
				const { value } = event.target
				onChange(value, index)
			}}
			max={MemoryRamValues.max}
			min={MemoryRamValues.min}
			step={MemoryRamValues.minStep * 2}
			error={isError}
			errorMessage={errorMessage}
		/>
	)
}
