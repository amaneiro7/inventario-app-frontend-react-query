import { twMerge } from 'tailwind-merge'
import cn from 'classnames'

interface Props<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
	required?: boolean
	disabled?: boolean
	error?: boolean
	valid?: boolean
	label: string
	type?: React.HTMLInputTypeAttribute
	value: T
	leftIcon?: boolean
}

export function Label<T extends string | number | readonly string[]>({
	label,
	value,
	error,
	required,
	valid,
	leftIcon,
	className,
	disabled,
	...props
}: Props<T>) {
	const labelClasses = twMerge(
		cn({
			['group-focus-within:text-focus']: !disabled,
			['transform']: value && !disabled,
			['!text-error']: error,
			['!text-success']: valid,
			['with-left-icon']: leftIcon
		}),
		className
	)
	return (
		<label className={labelClasses} {...props}>
			{`${label} ${required ? '*' : ''}`}
		</label>
	)
}
