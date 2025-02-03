interface Props
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	displayName: string
	active: boolean
	value: string
	handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export function TabNav({ displayName, value, active, handleClick, ...props }: Props) {
	return (
		<button
			className={`flex p-4 h-7 will-change-auto items-center justify-center rounded-t-md px-4 text-center text-xs  ${
				active
					? 'bg-azul text-white font-bold cursor-default'
					: 'bg-azul/10 text-azul hover:bg-slate-200 font-medium'
			}`}
			{...props}
			value={value}
			onClick={handleClick}
		>
			{displayName}
		</button>
	)
}
