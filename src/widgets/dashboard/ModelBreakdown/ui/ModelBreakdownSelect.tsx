import { memo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'

interface ModelBreakdownSelectProps {
	selectedBrand: string
	brands: string[]
	setSelectedBrand: React.Dispatch<React.SetStateAction<string>>
}

export const ModelBreakdownSelect = memo(
	({ selectedBrand, setSelectedBrand, brands }: ModelBreakdownSelectProps) => {
		return (
			<Select value={selectedBrand} onValueChange={setSelectedBrand}>
				<SelectTrigger className="w-[188px]">
					<SelectValue placeholder="Seleccione una marca" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">Todas las marcas</SelectItem>
					{brands.map(brand => (
						<SelectItem key={brand} value={brand}>
							{brand}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		)
	}
)

ModelBreakdownSelect.displayName = 'ModelBreakdownSelect'
