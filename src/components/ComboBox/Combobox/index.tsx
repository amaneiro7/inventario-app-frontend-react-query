import React, { memo, useMemo, useRef } from 'react'
import './Combobox.css'
import { ButtonClose } from './ButtonClose'
import { ButtonOpen } from './ButtonOpen'
import { SearchBar } from './SearchBar'
import { Fieldset } from './Fieldset'
import { Label } from './Label'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'

interface ValidType {
	id: string | number
	name: string
}
interface InputProps<T extends string | number | readonly string[], O extends ValidType>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	value: T
	name: string
	options: O[]
	inputValue?: string | number | readonly string[]
	isRequired?: boolean
	error?: boolean
	valid?: boolean
	errorMessage?: string
	className?: string
	loading?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	onChangeValue: (name: ValidType['name'], value: ValidType['id']) => void
	onInputChange: React.ChangeEventHandler<HTMLInputElement>
	onRightIconClick?: () => void
}

function InputComponet<T extends string | number | readonly string[], O extends ValidType>({
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
	loading = false,
	rightIcon,
	inputValue,
	onInputChange,
	onRightIconClick,
	onChangeValue,
	className,
	...props
}: InputProps<T, O>) {
	// const [labelValue, setLabelValue] = useState('')

	const labelValue = useMemo(() => {
		if (value) {
			console.log(options, value)
			const res = options.find(data => String(data.id) === String(value))?.name
			// console.log(res)
			return res
		}
		return
	}, [value, options])
	const inputRef = useRef<HTMLInputElement>(null)
	const handlePopoverOpen = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}
	return (
		<>
			<div
				className={`comboBox group after:text-error ${error ? 'error' : ''} ${className}`}
				data-error={errorMessage}
			>
				<Label
					label={label}
					value={value}
					error={error}
					isRequired={isRequired}
					type={props.type}
					valid={valid}
					leftIcon={leftIcon ? true : false}
				/>
				<div className="inputArea relative">
					{leftIcon ? <span className="leftIcon">{leftIcon}</span> : null}
					<button
						type="button"
						className="button-popover"
						popoverTarget={`combobox-${id}`}
						onClick={handlePopoverOpen}
					>
						<p className="text-left " aria-hidden>
							{labelValue}
						</p>
					</button>
					<div
						popover="auto"
						id={`combobox-${id}`}
						role="combobox"
						className="div-popover"
					>
						<SearchBar
							ref={inputRef}
							id={id}
							value={inputValue}
							onInputChange={onInputChange}
						/>
						<ul
							role="listbox"
							className="flex flex-col  text-black/85 text-xs"
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
										onClick={() => {
											onChangeValue(name, data.id)
										}}
										tabIndex={-1}
										role="option"
										className="w-full cursor-pointer pl-2 rounded py-1 hover:bg-slate-200"
									>
										{data.name}
									</li>
								))}
						</ul>
					</div>
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
					<div className="flex items-center justify-center pr-1">
						{loading && <CircleSpinningIcon width={16} height={16} color="gray" />}

						{value && (
							<ButtonClose
								onClick={() => {
									onChangeValue(name, '')
								}}
							/>
						)}
						<ButtonOpen id={id} />
					</div>
					<Fieldset
						label={label}
						value={value}
						error={error}
						isRequired={isRequired}
						type={props.type}
						valid={valid}
					/>
				</div>
			</div>
		</>
	)
}

export const Combobox = memo(InputComponet)
