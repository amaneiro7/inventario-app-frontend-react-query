import { type TableHead } from './TableHead'
import { type TableRow } from './TableRow'

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
			className="w-max min-w-max sticky z-10 top-0 drop-shadow-lg border-l-3 border-l-azul bg-azul text-white"
			role="rowgroup"
			{...props}
		>
			{children}
		</thead>
	)
}
