type Props = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>
export function ButtonOpen({ id, onClick, ...props }: Props) {
	return (
		<button
			className="openButton w-6 min-w-6 aspect-square rounded-full hover:bg-slate-200 disabled:hover:bg-transparent disabled:cursor-default disabled:invisible"
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
				className="w-6 aspect-square transition-transform duration-300"
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
