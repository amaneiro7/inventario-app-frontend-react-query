import { MemoryRamValues } from '@/entities/devices/devices/domain/value-object/MemoryRamValues'
import { Input } from '@/shared/ui/Input/Input'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'

interface MemoryRamCapacitySlotInputProps {
	value: Primitives<MemoryRamValues>
	index: number
	isLoading: boolean
	readOnly: boolean
	onChange: (value: string, index: number) => void
}

export const MemoryRamCapacitySlotInput = ({
	value,
	index,
	isLoading,
	readOnly,
	onChange
}: MemoryRamCapacitySlotInputProps) => {
	const isValid = MemoryRamValues.isValid(value)
	const isError = !isValid
	const errorMessage = isValid ? '' : MemoryRamValues.invalidMessage()

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.preventDefault()
			const currentValue = Number(value)
			const sequence = MemoryRamValues.generarSecuencia()

			let newValue = currentValue

			if (e.key === 'ArrowUp') {
				const next = sequence.find(val => val > currentValue)
				if (next !== undefined) {
					newValue = next
				}
			} else {
				const prev = [...sequence].reverse().find(val => val < currentValue)
				if (prev !== undefined) {
					newValue = prev
				}
			}

			if (newValue !== currentValue) {
				onChange(String(newValue), index)
			}
		}
	}

	return (
		<Input
			id={`MemoriaRamSlot-${index}`}
			name="memoryRam"
			label={`Memoria Ram Slot ${index}`}
			type="number"
			readOnly={readOnly}
			value={value}
			isLoading={isLoading}
			transform
			onChange={event => {
				const { value } = event.target
				onChange(value, index)
			}}
			max={MemoryRamValues.max}
			onKeyDown={handleKeyDown}
			min={MemoryRamValues.min}
			step={MemoryRamValues.minStep * 2}
			error={isError}
			errorMessage={errorMessage}
		/>
	)
}
