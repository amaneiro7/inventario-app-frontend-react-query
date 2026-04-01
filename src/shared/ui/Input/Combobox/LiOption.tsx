interface LiOptionProps<O extends { id: string | number }> extends React.DetailedHTMLProps<
	React.LiHTMLAttributes<HTMLLIElement>,
	HTMLLIElement
> {
	option: O
	index: number
	isSelected: boolean
	onClose?: () => void
	onOptionClick: (option: O) => void
}
export function LiOption<O extends { id: string | number }>({
	option,
	index,
	isSelected,
	onOptionClick,
	onClose,
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
			onKeyDown={e => {
				if (e.key === ' ') {
					e.preventDefault()
					e.stopPropagation()
					onOptionClick(option)
				}
				if (e.key === 'Escape' || e.key === 'ArrowUp') {
					e.preventDefault()
					onClose?.()
				}
			}}
			role="option"
			tabIndex={isSelected ? 0 : -1}
			className={`w-full cursor-pointer rounded py-1 pl-2 hover:bg-slate-200 ${
				isSelected ? 'bg-slate-300' : ''
			}`}
			{...props}
		>
			{children}
		</li>
	)
}
