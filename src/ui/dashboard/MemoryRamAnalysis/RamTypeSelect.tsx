import { memo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'

interface RamTypeSelectProps {
	selectedRamType: string
	availableRamTypes: string[]
	setSelectedRamType: React.Dispatch<React.SetStateAction<string>>
}

export const RamTypeSelect = memo(
	({ selectedRamType, setSelectedRamType, availableRamTypes }: RamTypeSelectProps) => {
		return (
			<Select value={selectedRamType} onValueChange={setSelectedRamType}>
				<SelectTrigger className="w-[188px]">
					<SelectValue placeholder="Seleccione un tipo de memoria" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">Todas los tipos de memoria</SelectItem>
					{availableRamTypes.map(ramType => (
						<SelectItem key={ramType} value={ramType}>
							{ramType}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		)
	}
)

RamTypeSelect.displayName = 'RamTypeSelect'
