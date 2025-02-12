import { lazy, useMemo } from 'react'

const Typography = lazy(async () => await import('../Typography'))

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
			className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-start justify-center text-left group-hover:opacity-0 group-hover:pointer-events-none p-4 flex-wrap content-center transition-all duration-500 ease-in-out"
		>
			<Typography variant="h3">{title}</Typography>
			<Typography variant="p" className="drop-shadow-md">
				{desc}
			</Typography>
		</div>
	)
}
