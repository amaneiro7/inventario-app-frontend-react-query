type Props = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLTableSectionElement>,
	HTMLTableSectionElement
>

export function TableBody({ children, ...props }: React.PropsWithChildren<Props>) {
	return (
		<tbody role="rowgroup" {...props}>
			{children}
		</tbody>
	)
}
