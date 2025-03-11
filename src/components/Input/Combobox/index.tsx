import React, { memo, useCallback, useMemo, useRef } from 'react'
import { useComboboxFocusInputs } from './hook/useComboboxFocusInputs'
import { useCloseClickOrEscape } from '@/hooks/utils/useCloseClickOrEscape'
import { InputBase } from '../InputBase'
import { ButtonClear } from './ButtonClear'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { ButtonOpen } from './ButtonOpen'
import { ListBox } from './ListBox'
import { type Highlight } from './RenderOption/RenderComboboxOption'
interface ComboboxProps<T extends string | number | readonly string[], O extends { id: string }>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	value: T
	name: string
	options: O[]
	inputValue?: string
	required?: boolean
	error?: boolean
	valid?: boolean
	errorMessage?: string
	className?: string
	loading?: boolean
	searchField?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	onChangeValue: (name: string, value: string) => void
	onInputChange?: (value: string) => void
	onRightIconClick?: () => void
	// Props para que sea reutilizable el popover
	displayAccessor?: string | ((option: O) => string)
	highlightFunction?: (option: O, inputValue?: string) => { text: string; highlight: boolean }[]
	renderOption?: ({
		option,
		inputValue,
		highlight
	}: {
		option: O
		inputValue?: string
		highlight: Highlight<O>
	}) => React.ReactNode
}
export const Combobox = memo(function <
	T extends string | number | readonly string[],
	O extends { id: string }
>({
	error,
	id,
	options,
	name,
	type,
	valid,
	value,
	errorMessage,
	label,
	required = false,
	leftIcon,
	loading = false,
	searchField = true,
	rightIcon,
	inputValue,
	onInputChange,
	onRightIconClick,
	onChangeValue,
	disabled = false,
	displayAccessor = 'name',
	highlightFunction,
	renderOption,
	...props
}: ComboboxProps<T, O>) {
	const divRef = useRef<HTMLDivElement>(null) // Referencia al contenedor
	const { open, handleInputBlur, handleInputFocus, handlePopoverClose, handlePopoverOpen } =
		useComboboxFocusInputs({ ref: divRef })

	useCloseClickOrEscape({ open, onClose: handlePopoverClose, ref: divRef })

	const labelValue: string = useMemo(() => {
		const found = options.find(data => String(data.id) === String(value))
		if (!found) return ''
		if (typeof displayAccessor === 'string') {
			return String(found[displayAccessor as keyof O] ?? '') // Acceso tipado
		}
		return displayAccessor(found)
	}, [value, options, displayAccessor])

	const handleOptionClick = useCallback(
		(option: O) => {
			onChangeValue(name, option.id)
			handlePopoverClose()
		},
		[value, onChangeValue, handlePopoverClose, name]
	)

	const togglePopover = useCallback(
		(event: React.MouseEvent) => {
			event.stopPropagation()
			event.preventDefault()
			if (open) {
				handlePopoverClose()
			} else {
				handlePopoverOpen()
			}
		},
		[open, handlePopoverClose, handlePopoverOpen]
	)

	return (
		<InputBase
			ref={divRef}
			label={label}
			type={type}
			value={value}
			name={name}
			error={error}
			valid={valid}
			errorMessage={errorMessage}
			required={required}
			disabled={disabled}
			leftIcon={leftIcon}
			rightIcon={rightIcon}
			onRightIconClick={onRightIconClick}
			onFocus={disabled ? undefined : handleInputFocus}
			onBlur={disabled ? undefined : handleInputBlur}
			tabIndex={disabled ? -1 : 0}
		>
			<>
				<input
					type="button"
					className="button-popover text-left"
					value={labelValue}
					disabled={disabled}
					data-combobox-input-button="true"
					onClick={event => {
						event.stopPropagation()
						event.preventDefault()
						if (open) {
							handlePopoverClose()
						} else {
							handlePopoverOpen()
						}
					}}
					tabIndex={disabled ? -1 : 0}
					{...props}
				/>

				<ListBox
					id={id}
					searchField={searchField}
					inputValue={inputValue}
					options={options}
					value={value}
					name={name}
					loading={loading}
					open={open}
					displayAccessor={displayAccessor}
					highlightFunction={highlightFunction}
					renderOption={renderOption}
					onInputChange={onInputChange}
					handleOptionClick={handleOptionClick}
					tabIndex={0}
				/>
			</>

			<div className="flex items-center justify-center pr-1">
				{loading && <CircleSpinningIcon width={16} height={16} color="gray" />}
				{value && (
					<ButtonClear
						tabIndex={-1}
						onClick={() => {
							onChangeValue(name, '')
						}}
					/>
				)}
				<ButtonOpen
					tabIndex={-1}
					id={id}
					disabled={disabled}
					data-combobox-toggle="true"
					onClick={togglePopover}
				/>
			</div>
		</InputBase>
	)
})
