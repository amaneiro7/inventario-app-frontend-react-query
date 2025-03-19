import { memo } from 'react'
import Typography from '../Typography'

interface InfoBoxTextProps {
	text: string
	desc?: string
	className?: string
}

export const InfoBoxText = memo(({ desc, text, className }: InfoBoxTextProps) => {
	return (
		<Typography variant="p" color="gris" align="left" weight="normal" className={className}>
			<b>{`${desc}: `}</b>
			{text}
		</Typography>
	)
})
