import React, { memo } from 'react'
import './prueba.css'

export function Prueba() {
	return (
		<>
			<Popover label="Popover" value="?" />
		</>
	)
}
interface InputProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	value: T
	isRequired?: boolean
	error?: boolean
	valid?: boolean
	errorMessage?: string
	className?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	onRightIconClick?: () => void
}

function InputComponet<T extends string | number | readonly string[]>({
	error,
	valid,
	value,
	errorMessage,
	label,
	isRequired = false,
	leftIcon,
	rightIcon,
	onRightIconClick,
	...props
}: InputProps<T>) {
	return (
		<>
			<div
				className={`comboBox group after:text-error ${error ? 'error' : ''} ${
					props.className ? props.className : ''
				}`}
				data-error={errorMessage}
			>
				<label
					className={`${value || props.type === 'number' ? 'transform' : ''} ${
						error ? '!text-error' : ''
					} ${valid ? '!text-success' : ''} group-focus-within:text-focus ${
						leftIcon ? 'with-left-icon' : ''
					}`}
				>
					{`${label} ${isRequired ? '*' : ''}`}
				</label>
				<div className="inputArea relative">
					{leftIcon ? <span className="leftIcon">{leftIcon}</span> : null}
					<button className="button-popover" popoverTarget="info">
						<p aria-hidden>{value}</p>
					</button>
					<div popover="auto" id="info" role="combobox" className="div-popover">
						<div className="flex items-center border-b px-3" cmdk-input-wrapper="">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="lucide lucide-search mr-2 h-4 w-4 shrink-0 opacity-50"
							>
								<circle cx="11" cy="11" r="8"></circle>
								<path d="m21 21-4.3-4.3"></path>
							</svg>
							<input
								className="flex w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 h-9"
								placeholder={label}
								autoComplete="off"
								autoCorrect="off"
								spellCheck="false"
								aria-autocomplete="list"
								role="combobox"
								aria-expanded="true"
								aria-controls="radix-:r4t:"
								aria-labelledby="radix-:r4u:"
								id="radix-:r4v:"
								type="text"
							/>
						</div>
					</div>
					{rightIcon ? (
						<button
							type="button"
							name={props?.name}
							onClick={onRightIconClick}
							className="rightIcon"
							tabIndex={-1}
						>
							{rightIcon}
						</button>
					) : null}
					<fieldset
						aria-hidden
						className={`${error ? '!border-2 !border-error' : ''} ${
							valid ? '!border-2 !border-success' : ''
						} group-focus-within:border-focus group-focus-within:border-2`}
					>
						<legend className={value || props.type === 'number' ? 'transform' : ''}>
							<span>{`${label} ${isRequired ? '*' : ''}`}</span>
						</legend>
					</fieldset>
				</div>
			</div>
		</>
	)
}

export const Popover = memo(InputComponet)
