import cn from 'classnames'
import { twMerge } from 'tailwind-merge'
interface FieldsetProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<
		React.FieldsetHTMLAttributes<HTMLFieldSetElement>,
		HTMLFieldSetElement
	> {
	required?: boolean
	disabled?: boolean
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
	required,
	disabled,
	type,
	className,
	...props
}: FieldsetProps<T>) {
	const legendTransform = value || type === 'number'

	const filedSetClasses = twMerge(
		cn({
			['group-focus-within:!border-focus group-focus-within:!border-2']:
				!error && !valid && !disabled,
			['!border-2 !border-error']: error,
			['!border-2 !border-success']: valid
		}),
		className
	)

	return (
		<fieldset
			aria-hidden
			className={filedSetClasses}
			{...(error ? { 'aria-invalid': true } : {})}
			{...props}
		>
			<legend className={legendTransform ? 'transform' : ''}>
				<span>{`${label} ${required ? '*' : ''}`}</span>
			</legend>
		</fieldset>
	)
}
