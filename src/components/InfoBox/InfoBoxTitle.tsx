import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ThinRightIcon } from '@/icon/ThinRightIcon'
import Typography from '../Typography'

interface InfoBoxTitleProps {
	title: string
	url?: string
	state?: object
}

export const InfoBoxTitle = memo(({ title, url, state }: InfoBoxTitleProps) => {
	return (
		<Typography
			variant="h6"
			weight="bold"
			color="azul"
			align="left"
			className="inline-flex justify-between items-center mb-2"
		>
			<span>{title}</span>
			{url && (
				<span className="relative w-8 h-8 group">
					<Link className="absolute w-8 h-8 z-8" state={state} to={url} />
					<ThinRightIcon className="w-8 fill-azul group-hover:translate-x-2 transition-transform duration-300" />
				</span>
			)}
		</Typography>
	)
})
