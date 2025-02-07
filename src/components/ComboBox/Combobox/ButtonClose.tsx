type Props = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>
export function ButtonClose({ onClick, ...props }: Props) {
	return (
		<button
			className="w-6 aspect-square rounded-full flex items-center justify-center hover:bg-slate-200"
			tabIndex={-1}
			type="button"
			aria-label="Limpiar"
			title="Limpiar"
			onClick={onClick}
			{...props}
		>
			<svg
				className="w-4 aspect-square text-center text-black/50"
				focusable="false"
				color="currentColor"
				aria-hidden="true"
				viewBox="0 0 24 24"
				data-testid="CloseIcon"
			>
				<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
			</svg>
		</button>
	)
}
