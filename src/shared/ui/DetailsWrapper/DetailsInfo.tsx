import { memo } from 'react'
import Typography from '../Typography'

interface Props {
	title: string
	children: React.ReactNode
}

export const DetailsInfo = memo(({ title, children }: Props) => {
	return (
		<div className="fit flex w-full justify-center rounded-2xl bg-white p-4 shadow-sm">
			<div className="h-full w-1/2 rounded shadow-lg shadow-slate-400">
				<Typography color="white" className="bg-azul w-full rounded-t px-4 py-2">
					{title}
				</Typography>
				<dl className="divide-y divide-gray-300">{children}</dl>
			</div>
		</div>
	)
})
