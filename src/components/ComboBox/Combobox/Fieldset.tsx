interface Props<T extends string | number | readonly string[]> {
	isRequired?: boolean
	error?: boolean
	valid?: boolean
	label: string
	type?: React.HTMLInputTypeAttribute
	value: T
}
export function Fieldset<T extends string | number | readonly string[]>({
	error,
	valid,
	label,
	value,
	isRequired,
	type
}: Props<T>) {
	return (
		<fieldset
			aria-hidden
			className={`${error ? '!border-2 !border-error' : ''} ${
				valid ? '!border-2 !border-success' : ''
			} group-focus-within:border-focus group-focus-within:border-2`}
		>
			<legend className={value || type === 'number' ? 'transform' : ''}>
				<span>{`${label} ${isRequired ? '*' : ''}`}</span>
			</legend>
		</fieldset>
	)
}
