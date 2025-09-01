import { memo } from 'react'
import Typography from '@/shared/ui/Typography'

interface PanelHeaderProps {
	title: string
	description: string
	titleId: string
	descriptionId: string
}

export const PanelHeader = memo(
	({ title, description, titleId, descriptionId }: PanelHeaderProps) => {
		return (
			<>
				<Typography variant="h4" color="azul" id={titleId}>
					{title}
				</Typography>
				<p id={descriptionId} className="sr-only">
					{description}
				</p>
			</>
		)
	}
)

PanelHeader.displayName = 'PanelHeader'
