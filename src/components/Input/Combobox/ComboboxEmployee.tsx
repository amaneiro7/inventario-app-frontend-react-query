import React, { memo, useRef, useState } from 'react'
import { useCLoseClickOrEscape } from '@/hooks/utils/useCloseClickOrEscape'
import { ButtonOpen } from './ButtonOpen'
import { ButtonClear } from './ButtonClear'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { PopoverEmployee } from './PopoverEmployee'
import { InputBase } from '../InputBase'
import { type EmployeeDto } from '@/core/employee/employee/domain/dto/Employee.dto'

interface ComboboxProps<T extends string | number | readonly string[]>
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label: string
	value: T
	name: string
	options: EmployeeDto[]
	inputValue?: string
	required?: boolean
	error?: boolean
	valid?: boolean
	errorMessage?: string
	className?: string
	loading?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	onChangeValue: (name: EmployeeDto['userName'], value: EmployeeDto['id']) => void
	onInputChange: (value: string) => void
	onRightIconClick?: () => void
}
export const ComboboxEmployee = memo(
	<T extends string>({
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
		rightIcon,
		inputValue,
		onInputChange,
		onRightIconClick,
		onChangeValue
	}: ComboboxProps<T>) => {
		const [open, setOpen] = useState(false)
		const divRef = useRef(null)
		const handlePopoverOpen = () => {
			setOpen(!open)
		}
		useCLoseClickOrEscape({ open, onClose: handlePopoverOpen, ref: divRef })
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
				<PopoverEmployee
					id={id}
					options={options}
					value={value}
					name={name}
					loading={loading}
					inputValue={inputValue}
					onInputChange={onInputChange}
					onChangeValue={onChangeValue}
					open={open}
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
