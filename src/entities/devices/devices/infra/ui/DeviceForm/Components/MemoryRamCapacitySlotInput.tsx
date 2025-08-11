import { useEffect, useState } from 'react'
import { MemoryRamValues } from '../../../../domain/value-object/MemoryRamValues'
import { Input } from '@/shared/ui/Input/Input'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'

interface MemoryRamCapacitySlotInputProps {
	value: Primitives<MemoryRamValues>
	index: number
	isLoading: boolean
	onChange: (value: string, index: number) => void
}

export function MemoryRamCapacitySlotInput({
	value,
	index,
	isLoading,
	onChange
}: MemoryRamCapacitySlotInputProps) {
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
			id={`MemoriaRamSlot-${index}`}
			name="memoryRam"
			label={`Memoria Ram Slot ${index}`}
			type="number"
			value={value}
			isLoading={isLoading}
			transform
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
