import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ThinRightIcon } from '@/icon/ThinRightIcon'

interface InfoBoxTitleProps {
	title: string
	url?: string
	state?: object
}

export const InfoBoxTitle = memo(({ title, url, state }: InfoBoxTitleProps) => {
	return (
		<h3 className="inline-flex justify-between items-center font-sans font-bold text-azul text-left text-sm md:text-base lg:text-lg mb-2">
			<span>{title}</span>
			{url && (
				<span className="relative w-10 h-10 group">
					<Link className="absolute w-10 h-10 z-10" state={state} to={url} />
					<ThinRightIcon className="w-10 fill-azul group-hover:translate-x-2 transition-transform duration-300" />
				</span>
			)}
		</h3>
	)
})
