import React, { memo, useRef, useState } from 'react'
import { useCLoseClickOrEscape } from '@/hooks/utils/useCloseClickOrEscape'
import { InputBase } from '../InputBase'
import { Popover } from './Popover'
import { ButtonClear } from './ButtonClear'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { ButtonOpen } from './ButtonOpen'

// const Popover = lazy(async () => import('./Popover').then(m => ({ default: m.Popover })))
// const ButtonOpen = lazy(async () =>
// 	import('@/components/Input/Combobox/ButtonOpen').then(m => ({ default: m.ButtonOpen }))
// )
// const ButtonClear = lazy(async () =>
// 	import('@/components/Input/Combobox/ButtonClear').then(m => ({ default: m.ButtonClear }))
// )
// const CircleSpinningIcon = lazy(async () =>
// 	import('@/icon/CircleSpinning').then(m => ({ default: m.CircleSpinningIcon }))
// )
// const InputBase = lazy(async () => import('../InputBase').then(m => ({ default: m.InputBase })))

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
		isRequired = false,
		leftIcon,
		loading = false,
		rightIcon,
		inputValue,
		onInputChange,
		onRightIconClick,
		onChangeValue
	}: ComboboxProps<T, O>) => {
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
				isRequired={isRequired}
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
