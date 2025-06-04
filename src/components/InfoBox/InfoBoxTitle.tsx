import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ThinRightIcon } from '@/icon/ThinRightIcon'
import Typography from '../Typography'

interface InfoBoxTitleProps {
	title: string | React.ReactNode
	url?: string
	state?: object
}

export const InfoBoxTitle = memo(({ title, url, state }: InfoBoxTitleProps) => {
	const isTitleString = typeof title === 'string'
	return (
		<Typography
			variant="h6"
			weight="bold"
			color="azul"
			align="left"
			className="mb-2 inline-flex grow items-center justify-between"
		>
			{isTitleString ? <span>{title}</span> : title}
			{url && isTitleString && (
				<span className="group relative ml-4 h-8 w-8 flex-shrink-0">
					<Link
						className="absolute inset-0 z-10 h-8 w-8"
						state={state}
						to={url ?? '#'}
						aria-label={`Ir a ${title}`}
					/>
					<ThinRightIcon className="fill-azul w-8 transition-transform duration-300 group-hover:translate-x-2" />
				</span>
			)}
		</Typography>
	)
})
