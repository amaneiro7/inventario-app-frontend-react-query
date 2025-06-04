import React, { memo } from 'react'
import Typography from '../Typography'
import { cn } from '@/lib/utils'

interface InfoBoxTextProps {
	text: string | React.ReactNode
	desc?: string | React.ReactNode
	className?: string
}

export const InfoBoxText = memo(({ desc, text, className }: InfoBoxTextProps) => {
	const isDescString = typeof desc === 'string'
	return (
		<Typography
			variant="p"
			color="gris"
			align="left"
			weight="normal"
			option="small"
			className={cn(className)}
		>
			{desc && <b>{isDescString ? `${desc}: ` : desc}</b>}
			{text}
		</Typography>
	)
})

InfoBoxText.displayName = 'InfoBoxText'
