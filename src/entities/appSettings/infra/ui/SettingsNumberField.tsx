import { Input } from '@/shared/ui/Input/Input'

interface SettingNumberFieldProps {
	value: string
	onChange: (value: string) => void
}

export function SettingNumberField({ value, onChange }: SettingNumberFieldProps) {
	return (
		<Input
			id=""
			label=""
			name=""
			type="number"
			value={value}
			onChange={e => onChange(e.target.value)}
			className="w-24"
		/>
	)
}
