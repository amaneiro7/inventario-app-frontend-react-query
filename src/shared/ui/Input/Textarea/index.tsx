import React, { memo } from 'react'
import { InputBase } from '../InputBase'

interface InputProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	> {
	id: string
	label: string
	value: T
	error?: boolean
	isLoading?: boolean
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
export const Textarea = memo(
	<T extends string | number | readonly string[]>({
		id,
		value,
		error,
		valid,
		errorMessage,
		required = false,
		isLoading = false,
		readOnly = false,
		disabled = false,
		transform = false,
		label,
		leftIcon,
		rightIcon,
		rightAdorment,
		name,
		selectInput,
		onRightIconClick,
		...props
	}: InputProps<T>) => {
		return (
			<InputBase
				id={id}
				label={label}
				value={value}
				name={name}
				error={error}
				valid={valid}
				isLoading={isLoading}
				transform={transform}
				errorMessage={errorMessage}
				required={required}
				leftIcon={leftIcon}
				rightIcon={rightIcon}
				selectInput={selectInput}
				rightAdorment={rightAdorment}
				onRightIconClick={onRightIconClick}
			>
				<textarea
					id={id}
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

Textarea.displayName = 'Textarea'
