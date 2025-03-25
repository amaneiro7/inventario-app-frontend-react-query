import React, { memo } from 'react'
import { InputBase } from '../InputBase'

interface InputProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	value: T
	isRequired?: boolean
	error?: boolean
	name: string
	valid?: boolean
	transform?: boolean
	errorMessage?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	selectInput?: React.ReactNode
	rightAdorment?: React.ReactNode
	onRightIconClick?: () => void
}
export const Input = memo(
	<T extends string | number | readonly string[]>({
		value,
		error,
		valid,
		errorMessage,
		required = false,
		readOnly = false,
		disabled = false,
		transform = false,
		label,
		leftIcon,
		rightIcon,
		rightAdorment,
		type,
		name,
		selectInput,
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
				transform={transform}
				errorMessage={errorMessage}
				required={required}
				leftIcon={leftIcon}
				rightIcon={rightIcon}
				selectInput={selectInput}
				rightAdorment={rightAdorment}
				onRightIconClick={onRightIconClick}
			>
				<input
					type={type}
					name={name}
					value={value}
					required={required}
					readOnly={readOnly}
					disabled={disabled || readOnly}
					onMouseDown={
						readOnly
							? e => {
									e.preventDefault()
							  }
							: undefined
					}
					aria-readonly={readOnly}
					tabIndex={readOnly ? -1 : 0}
					{...props}
				/>
			</InputBase>
		)
	}
)
