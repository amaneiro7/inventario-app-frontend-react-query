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
	if (!isDescString) {
		return (
			<div className="flex flex-row gap-2">
				{desc}
				{text}
			</div>
		)
	}
	return (
		<Typography
			variant="p"
			color="gris"
			align="left"
			weight="normal"
			option="small"
			className={cn(className)}
		>
			<b>{`${desc}: `}</b>
			{text}
		</Typography>
	)
})

InfoBoxText.displayName = 'InfoBoxText'
