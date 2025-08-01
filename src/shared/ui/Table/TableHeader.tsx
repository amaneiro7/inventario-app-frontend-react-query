import { type TableHeadSize, type TableHead } from './TableHead'
import { type TableRow } from './TableRow'

export interface Headers {
	key: string
	label: string
	hasOrder: boolean
	size: keyof typeof TableHeadSize
	isTab: boolean
	visible: boolean
}

interface Props
	extends React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLTableSectionElement>,
		HTMLTableSectionElement
	> {
	children: React.ReactElement<typeof TableRow<typeof TableHead>>
}

export function TableHeader({ children, ...props }: Props) {
	return (
		<thead
			className="border-l-azul bg-azul sticky top-0 z-10 w-max min-w-max border-l-3 text-white drop-shadow-lg"
			role="rowgroup"
			{...props}
		>
			{children}
		</thead>
	)
}
