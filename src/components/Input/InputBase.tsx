import React, { memo } from 'react'
import './input.css'
import { Label } from './Label'
import { Fieldset } from './Fieldset'

interface Props<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label: string
	type?: React.HTMLInputTypeAttribute
	value: T
	name: string
	required?: boolean
	disabled?: boolean
	error?: boolean
	valid?: boolean
	errorMessage?: string
	className?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	rightAdorment?: React.ReactNode
	ref?: React.RefObject<HTMLDivElement | null>
	onRightIconClick?: () => void
}
export const InputBase = memo(
	<T extends string | number | readonly string[]>({
		error,
		ref,
		valid,
		value,
		name,
		errorMessage,
		label,
		required = false,
		disabled = false,
		leftIcon,
		rightIcon,
		rightAdorment,
		type,
		children,
		onRightIconClick,
		...props
	}: React.PropsWithChildren<Props<T>>) => {
		return (
			<div
				ref={ref}
				className={`inputBox group after:text-error ${error ? 'error' : ''}`}
				data-error={errorMessage}
				{...props}
			>
				<Label
					label={label}
					value={value}
					error={error}
					required={required}
					disabled={disabled}
					type={type}
					valid={valid}
					leftIcon={leftIcon ? true : false}
				/>
				<div className="inputArea">
					{leftIcon ? <span className="leftIcon">{leftIcon}</span> : null}
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
					/>
				</div>
			</div>
		)
	}
)
