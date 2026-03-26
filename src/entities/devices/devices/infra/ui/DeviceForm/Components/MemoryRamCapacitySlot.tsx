import { useMemo } from 'react'
import { MemoryRamCapacitySlotInput } from './MemoryRamCapacitySlotInput'
import type { DefaultDevice } from '../../../reducers/devicesFormReducer'

export function MemoryRamCapacitySlot({
	memoryRam,
	handleMemory,
	canEdit,
	isLoading
}: {
	memoryRam: DefaultDevice['memoryRam']
	handleMemory: (value: string, index: number) => void
	canEdit: boolean
	isLoading: boolean
}) {
	const memoryWithKeys = useMemo(() => {
		return memoryRam.map((val, index) => ({
			id: index,
			val
		}))
	}, [memoryRam])
	return (
		<div className="grid grid-cols-2 gap-4">
			{memoryWithKeys.length > 0
				? memoryWithKeys?.map((memory, index) => (
						<MemoryRamCapacitySlotInput
							key={`slot-${memory.id}`}
							index={index}
							readOnly={!canEdit}
							onChange={handleMemory}
							value={memoryRam[index]}
							isLoading={isLoading}
						/>
					))
				: null}
		</div>
	)
}
