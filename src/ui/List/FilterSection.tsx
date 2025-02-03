export function FilterSection({
	children,
	...props
}: React.PropsWithChildren<React.JSX.IntrinsicElements['search']>) {
	const { className } = props
	return (
		<search {...props}>
			<form
				className={`relative h-10 min-h-min w-full grid grid-cols-[repeat(auto-fit,_250px)] gap-4 ${className}`}
			>
				{children}
			</form>
		</search>
	)
}
