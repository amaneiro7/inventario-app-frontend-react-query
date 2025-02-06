import React, { memo } from 'react'
import './Combobox.css'
interface InputProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	value: T
	name: string
	options: any[]
	inputValue?: string | number | readonly string[]
	isRequired?: boolean
	error?: boolean
	valid?: boolean
	errorMessage?: string
	className?: string
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	onChangeValue: (value: T) => void
	onInputChange: React.ChangeEventHandler<HTMLInputElement>
	onRightIconClick?: () => void
}

function InputComponet<T extends string | number | readonly string[]>({
	error,
	id,
	options,
	name,
	valid,
	value,
	errorMessage,
	label,
	isRequired = false,
	leftIcon,
	rightIcon,
	inputValue,
	onInputChange,
	onRightIconClick,
	onChangeValue,
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
					<button className="button-popover" popoverTarget={`combobox-${id}`}>
						<p aria-hidden>{value}</p>
					</button>
					<div
						popover="auto"
						id={`combobox-${id}`}
						role="combobox"
						className="div-popover"
					>
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
								className="mr-2 h-4 w-4 shrink-0 opacity-50"
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
								aria-controls={id}
								aria-labelledby={id}
								id={id}
								type="text"
								value={inputValue}
								onChange={onInputChange}
							/>
						</div>
						<ul
							role="listbox"
							id={`combo-box-${name}-listbox`}
							aria-labelledby={`combo-box-${name}-label`}
						>
							{options &&
								options.map((data, index) => (
									<li
										key={data.id}
										data-option-index={index}
										aria-disabled={false}
										aria-selected={false}
										value={value}
										onClick={on}
										tabIndex={-1}
										role="option"
									>
										{data.name}
									</li>
								))}
						</ul>
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

export const Combobox = memo(InputComponet)
