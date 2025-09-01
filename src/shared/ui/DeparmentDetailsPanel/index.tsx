import { memo } from 'react'
import { Badge } from '../Badge'
import Typography from '../Typography'

export const DeparmentDetailsPanel = memo(({ deparment }: { deparment?: (string | null)[] }) => {
	const santizedDeparment = deparment?.filter(Boolean)
	if (santizedDeparment?.length === 0) {
		return null
	}
	return (
		<div className="pt-1">
			<Typography variant="h4" color="naranja" weight="semibold" className="mb-2">
				Departamentos en este piso:
			</Typography>
			<div className="flex flex-wrap gap-2 pl-2">
				{santizedDeparment?.map((dep, index) => (
					<Badge variant="outline" key={`${index}-${dep}`}>
						{dep}
					</Badge>
				))}
			</div>
		</div>
	)
})
DeparmentDetailsPanel.displayName = 'DeparmentDetailsPanel'
