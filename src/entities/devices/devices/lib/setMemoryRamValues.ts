import { type DeviceDto } from '../domain/dto/Device.dto'

export const setMemoryRamValues = (
	computer: DeviceDto['computer'],
	memoryRamSlotQuantity?: number
): number[] => {
	if (!computer || !memoryRamSlotQuantity) {
		return [0]
	}

	const { memoryRam } = computer
	const currentRamCount = memoryRam.length

	if (currentRamCount === memoryRamSlotQuantity) {
		return memoryRam
	}

	if (currentRamCount < memoryRamSlotQuantity) {
		return [...memoryRam, ...Array(memoryRamSlotQuantity - currentRamCount).fill(0)]
	}

	// Caso donde currentRamCount > memoryRamSlotQuantity
	console.error('Error: memoryRamSlotQuantity es menor que la cantidad actual de módulos de RAM.')
	return memoryRam.slice(0, memoryRamSlotQuantity)
}
