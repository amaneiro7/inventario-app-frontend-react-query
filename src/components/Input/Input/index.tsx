import React, { lazy, memo } from 'react'

const InputBase = lazy(async () => import('../InputBase').then(m => ({ default: m.InputBase })))

interface InputProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	value: T
	isRequired?: boolean
	error?: boolean
	name: string
	valid?: boolean
	errorMessage?: string
	className?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	onRightIconClick?: () => void
}
export const Input = memo(
	<T extends string | number | readonly string[]>({
		value,
		error,
		valid,
		errorMessage,
		isRequired = false,
		label,
		leftIcon,
		rightIcon,
		type,
		name,
		onRightIconClick,
		...props
	}: InputProps<T>) => {
		return (
			<InputBase
				label={label}
				type={type}
				value={value}
				name={name}
				error={error}
				valid={valid}
				errorMessage={errorMessage}
				isRequired={isRequired}
				leftIcon={leftIcon}
				rightIcon={rightIcon}
				onRightIconClick={onRightIconClick}
			>
				<input {...props} type={type} name={name} value={value} required={isRequired} />
			</InputBase>
		)
	}
)
