import { Input } from '@/components/ui/input'

interface SettingNumberFieldProps {
	value: string
	onChange: (value: string) => void
}

export function SettingNumberField({ value, onChange }: SettingNumberFieldProps) {
	return (
		<Input
			type="number"
			value={value}
			onChange={e => onChange(e.target.value)}
			className="w-24"
		/>
	)
}
