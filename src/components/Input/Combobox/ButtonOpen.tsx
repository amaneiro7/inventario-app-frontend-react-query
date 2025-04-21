type Props = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>
export function ButtonOpen({ id, onClick, ...props }: Props) {
	return (
		<button
			className="openButton aspect-square w-6 min-w-6 cursor-pointer rounded-full hover:bg-slate-200 disabled:invisible disabled:cursor-default disabled:hover:bg-transparent"
			tabIndex={-1}
			id={id}
			key={id}
			onClick={onClick}
			type="button"
			aria-label="Abrir"
			title="Abrir"
			{...props}
		>
			<svg
				className="aspect-square w-6 transition-transform duration-300"
				focusable="false"
				aria-hidden="true"
				viewBox="0 0 24 24"
				data-testid="ArrowDropDownIcon"
			>
				<path d="M7 10l5 5 5-5z"></path>
			</svg>
		</button>
	)
}
