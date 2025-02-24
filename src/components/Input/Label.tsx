interface Props<T extends string | number | readonly string[]> {
	required?: boolean
	error?: boolean
	valid?: boolean
	label: string
	type?: React.HTMLInputTypeAttribute
	value: T
	leftIcon?: boolean
}

export function Label<T extends string | number | readonly string[]>({
	label,
	type,
	value,
	error,
	required,
	valid,
	leftIcon
}: Props<T>) {
	return (
		<label
			className={`${value || type === 'number' ? 'transform' : ''} ${
				error ? '!text-error' : ''
			} ${valid ? '!text-success' : ''} group-focus-within:text-focus ${
				leftIcon ? 'with-left-icon' : ''
			}`}
		>
			{`${label} ${required ? '*' : ''}`}
		</label>
	)
}
