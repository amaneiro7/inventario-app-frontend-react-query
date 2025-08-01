interface LiOptionProps<O extends { id: string | number }>
	extends React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
	option: O
	index: number
	isSelected: boolean
	onOptionClick: (option: O) => void
}
export function LiOption<O extends { id: string | number }>({
	option,
	index,
	isSelected,
	onOptionClick,
	children,
	...props
}: React.PropsWithChildren<LiOptionProps<O>>) {
	return (
		<li
			key={option.id}
			data-option-index={index}
			aria-disabled={false}
			aria-selected={false}
			onClick={e => {
				e.preventDefault()
				e.stopPropagation()
				onOptionClick(option)
			}}
			role="option"
			className={`w-full cursor-pointer pl-2 rounded py-1 hover:bg-slate-200 ${
				isSelected ? 'bg-slate-300' : ''
			}`}
			{...props}
		>
			{children}
		</li>
	)
}
