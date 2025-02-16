import { JSX, memo } from 'react'
import './checkbox.css'
interface Props {
	text: string
	value: boolean
	name: string
	label: string
}
export const Checkbox = memo(function ({
	value,
	name,
	text,
	label,
	onChange,
	...props
}: Props & Omit<JSX.IntrinsicElements['input'], 'value'>) {
	return (
		<div className="checkbox-wrapper-4">
			<input
				className="inp-cbx"
				checked={value}
				name={name}
				id={label}
				aria-describedby={label}
				type="checkbox"
				onChange={onChange}
				{...props}
			/>
			<label className="cbx" htmlFor={label}>
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
})
