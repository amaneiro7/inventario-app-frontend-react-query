import { memo } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/Select'

interface TypeOfSiteSelectProps {
	availableTypeOfSite: string[]
	selectedTypeOfSite: string
	setSelectedTypeOfSite: React.Dispatch<React.SetStateAction<string>>
}

export const TypeOfSiteSelect = memo(
	({ availableTypeOfSite, selectedTypeOfSite, setSelectedTypeOfSite }: TypeOfSiteSelectProps) => {
		return (
			<Select value={selectedTypeOfSite} onValueChange={setSelectedTypeOfSite}>
				<SelectTrigger className="w-fit min-w-48">
					<SelectValue placeholder="Filtrar por tipo de sitio" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="All">Mostrar todos los sitios</SelectItem>
					{availableTypeOfSite.map(typeOfSite => (
						<SelectItem key={typeOfSite} value={typeOfSite}>
							{typeOfSite}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		)
	}
)

TypeOfSiteSelect.displayName = 'TypeOfSiteSelect'
