import { lazy, useMemo } from 'react'

const Typography = lazy(async () => await import('../../shared/ui/Typography'))

interface Props
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string
	desc: string
	isPar: number
}
export function TilesVisible({ title, desc, isPar }: Props) {
	const textShadow = useMemo(() => {
		return `1px 1px 4px ${(isPar + 1) % 2 === 0 ? 'white' : 'black'}`
	}, [isPar])
	return (
		<div
			style={{ textShadow }}
			className="absolute top-0 left-0 flex h-full w-1/2 flex-col flex-wrap content-center items-start justify-center p-4 text-left transition-all duration-500 ease-in-out group-hover:pointer-events-none group-hover:opacity-0"
		>
			<Typography variant="h3">{title}</Typography>
			<Typography variant="p" className="drop-shadow-md">
				{desc}
			</Typography>
		</div>
	)
}
