import React, { lazy, memo } from 'react'
import './input.css'

const Fieldset = lazy(async () => import('./Fieldset').then(m => ({ default: m.Fieldset })))
const Label = lazy(async () => import('./Label').then(m => ({ default: m.Label })))

interface Props<T extends string | number | readonly string[]> {
	label: string
	type?: React.HTMLInputTypeAttribute
	value: T
	name: string
	required?: boolean
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
		leftIcon,
		rightIcon,
		rightAdorment,
		type,
		children,
		onRightIconClick
	}: React.PropsWithChildren<Props<T>>) => {
		return (
			<div
				className={`inputBox group after:text-error ${error ? 'error' : ''}`}
				data-error={errorMessage}
				ref={ref}
			>
				<Label
					label={label}
					value={value}
					error={error}
					required={required}
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
						type={type}
						valid={valid}
					/>
				</div>
			</div>
		)
	}
)
