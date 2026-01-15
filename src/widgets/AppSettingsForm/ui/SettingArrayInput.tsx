import { memo, useState } from 'react'
import { Badge } from '@/shared/ui/Badge'
import { X, Plus } from 'lucide-react'
import { Input } from '@/shared/ui/Input/Input'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'
import { cleanStringToArray } from '@/shared/lib/utils/cleanStringToArray'

interface SettingArrayInputProps {
	value: string
	onChange: (value: string) => void
}

export const SettingArrayInput = memo(({ onChange, value }: SettingArrayInputProps) => {
	const [newItem, setNewItem] = useState('')
	// Parse the array value (format: "['item1','item2']")

	const arrayItems = cleanStringToArray(value)

	const handleAddItem = () => {
		if (newItem.trim() === '') return
		const updatedArray = [...arrayItems, newItem.trim()]
		onChange(`['${updatedArray.join("','")}']`)
		setNewItem('')
	}

	const handleRemoveItem = (index: number) => {
		const updated = arrayItems.filter((_, i) => i !== index)
		onChange(`['${updated.join("','")}']`)
	}

	return (
		<div className="max-w-md space-y-3">
			<div className="flex flex-wrap gap-2">
				{arrayItems.map((item, index) => (
					<Badge key={index} variant="secondary" className="gap-1">
						{item}
						<button
							onClick={() => handleRemoveItem(index)}
							className="hover:text-destructive ml-1 transition-colors"
							type="button"
						>
							<X className="h-3 w-3" />
						</button>
					</Badge>
				))}
			</div>
			<div className="flex gap-2">
				<Input
					id="domain-inputs"
					label=""
					name="Dominios"
					transform
					value={newItem}
					onChange={e => setNewItem(e.target.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							e.preventDefault()
							handleAddItem()
						}
					}}
					placeholder="Agregar nuevo dominio..."
				/>
				<AuxiliarButton type="button" onClick={handleAddItem} size="icon" variant="outline">
					<Plus className="h-4 w-4" />
				</AuxiliarButton>
			</div>
		</div>
	)
})

SettingArrayInput.displayName = 'SettingArrayInput'
