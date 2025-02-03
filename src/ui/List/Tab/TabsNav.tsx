import { type TabNav } from './TabNav'
interface Props<T>
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children: React.ReactElement<T> | React.ReactElement<T>[]
}
export function TabsNav<T extends typeof TabNav>({ children, ...props }: Props<T>) {
	return (
		<div className="min-h-7 flex items-center justify-self-end" {...props}>
			{children}
		</div>
	)
}
