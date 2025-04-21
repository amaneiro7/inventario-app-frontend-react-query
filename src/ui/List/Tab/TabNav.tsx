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
			className={`flex h-7 items-center justify-center rounded-t-md p-4 px-4 text-center text-xs will-change-auto ${
				active
					? 'bg-azul cursor-default font-bold text-white'
					: 'bg-azul/10 text-azul cursor-pointer font-medium hover:bg-slate-200'
			}`}
			{...props}
			value={value}
			onClick={handleClick}
		>
			{displayName}
		</button>
	)
}
