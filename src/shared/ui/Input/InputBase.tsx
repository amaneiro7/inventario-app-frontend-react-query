import React, { memo } from 'react'
import './input.css'
import { Label } from './Label'
import { Fieldset } from './Fieldset'

interface InputBaseProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label: string
	type?: React.HTMLInputTypeAttribute
	value: T
	name: string
	required?: boolean
	disabled?: boolean
	isLoading?: boolean
	error?: boolean
	valid?: boolean
	transform?: boolean
	errorMessage?: string
	className?: string
	leftIcon?: React.ReactNode
	selectInput?: React.ReactNode
	rightIcon?: React.ReactNode
	rightAdorment?: React.ReactNode
	ref?: React.RefObject<HTMLDivElement | null>
	onRightIconClick?: () => void
}
export const InputBase = memo(
	<T extends string | number | readonly string[]>({
		id,
		error,
		ref,
		valid,
		value,
		name,
		errorMessage,
		label,
		required = false,
		disabled = false,
		transform = false,
		isLoading = false,
		leftIcon,
		selectInput,
		rightIcon,
		rightAdorment,
		type,
		children,
		onRightIconClick,
		...props
	}: React.PropsWithChildren<InputBaseProps<T>>) => {
		return (
			<div
				ref={ref}
				className={`inputBox group after:text-error ${error ? 'error' : ''}`}
				data-error={error ? errorMessage : undefined}
				{...props}
			>
				<Label
					id={id}
					label={label}
					value={value}
					error={error}
					required={required}
					disabled={disabled}
					type={type}
					valid={valid}
					leftIcon={leftIcon || selectInput ? true : false}
					transform={transform}
				/>
				<div className={`inputArea ${isLoading ? 'isLoading' : ''}`}>
					{leftIcon ? <span className="leftIcon">{leftIcon}</span> : null}
					{selectInput ? <>{selectInput}</> : null}
					{children}
					{rightAdorment ? <span className="rightAdorment">{rightAdorment}</span> : null}
					{rightIcon ? (
						<button
							type="button"
							name={name}
							onClick={onRightIconClick}
							className="rightIcon"
							tabIndex={-1}
						>
							{rightIcon}
							<span className="sr-only" />
						</button>
					) : null}
					<Fieldset
						label={label}
						value={value}
						error={error}
						required={required}
						disabled={disabled}
						type={type}
						valid={valid}
						transform={transform}
					/>
				</div>
			</div>
		)
	}
)

InputBase.displayName = 'InputBase'
