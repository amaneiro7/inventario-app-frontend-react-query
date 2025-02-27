import React, { memo, useRef, useState } from 'react'
import { useCLoseClickOrEscape } from '@/hooks/utils/useCloseClickOrEscape'
import { InputBase } from '../InputBase'
import { Popover } from './Popover'
import { ButtonClear } from './ButtonClear'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { ButtonOpen } from './ButtonOpen'

interface ValidType {
	id: string | number
	name: string
}
interface ComboboxProps<T extends string | number | readonly string[], O extends ValidType>
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
	onChangeValue: (name: ValidType['name'], value: ValidType['id']) => void
	onInputChange: (value: string) => void
	onRightIconClick?: () => void
}
export const Combobox = memo(
	<T extends string | number | readonly string[], O extends ValidType>({
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
		onChangeValue
	}: ComboboxProps<T, O>) => {
		const [open, setOpen] = useState(false)
		const divRef = useRef<HTMLDivElement>(null)
		const handlePopoverOpen = () => {
			setOpen(!open)
		}

		useCLoseClickOrEscape({ open, onClose: handlePopoverOpen, ref: divRef })

		// const handleFocusVisibleChange = (isVisible: boolean) => {
		// 	setOpen(isVisible)
		// }
		// useEffect(() => {
		// 	const divElement = divRef.current
		// 	if (!divElement) return

		// 	const hanldFocusIn = () => handleFocusVisibleChange(true)
		// 	const handleFocusOut = (event: FocusEvent) => {
		// 		if (!divElement.contains(event.relatedTarget as Node)) {
		// 			handleFocusVisibleChange(false)
		// 		}
		// 	}
		// 	divElement.addEventListener('focusin', hanldFocusIn)
		// 	divElement.addEventListener('focusout', handleFocusOut)

		// 	return () => {
		// 		divElement.removeEventListener('focusin', hanldFocusIn)
		// 		divElement.removeEventListener('focusout', handleFocusOut)
		// 	}
		// }, [])
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
				leftIcon={leftIcon}
				rightIcon={rightIcon}
				onRightIconClick={onRightIconClick}
			>
				<Popover
					id={id}
					options={options}
					value={value}
					name={name}
					loading={loading}
					inputValue={inputValue}
					onInputChange={onInputChange}
					onChangeValue={onChangeValue}
					open={open}
					searchField={searchField}
					handlePopoverOpen={handlePopoverOpen}
				/>

				<div className="flex items-center justify-center pr-1">
					{loading && <CircleSpinningIcon width={16} height={16} color="gray" />}
					{value && (
						<ButtonClear
							onClick={() => {
								onChangeValue(name, '')
							}}
						/>
					)}
					<ButtonOpen id={id} onClick={handlePopoverOpen} />
				</div>
			</InputBase>
		)
	}
)
