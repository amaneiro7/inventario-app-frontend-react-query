import { memo } from 'react'
import './checkbox.css'

interface CheckboxProps {
	id?: string
	text: string
	value: boolean
	name: string
	readOnly?: boolean
}

export const Checkbox = memo(
	({
		id,
		value,
		name,
		text,
		onChange,
		readOnly = false,
		...props
	}: CheckboxProps & Omit<React.ComponentPropsWithoutRef<'input'>, 'value' | 'id'>) => {
		const inputId = id ?? name

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (readOnly) {
				return
			}
			onChange?.(e)
		}

		return (
			<div className="checkbox-wrapper-4" data-readonly={readOnly}>
				<input
					className="inp-cbx"
					checked={value}
					name={name}
					id={inputId}
					type="checkbox"
					onChange={handleChange}
					aria-readonly={readOnly}
					{...props}
				/>
				<label className="cbx" htmlFor={inputId}>
					<span>
						<svg width="12px" height="10px">
							<use xlinkHref="#check-4" />
						</svg>
					</span>
					<span>{text}</span>
				</label>
				<svg className="inline-svg">
					<symbol id="check-4" viewBox="0 0 12 10">
						<polyline points="1.5 6 4.5 9 10.5 1" />
					</symbol>
				</svg>
			</div>
		)
	}
)

Checkbox.displayName = 'Checkbox'
