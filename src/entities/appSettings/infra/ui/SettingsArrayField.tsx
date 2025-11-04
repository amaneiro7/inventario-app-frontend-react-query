import Button from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input/Input'
import { useState } from 'react'

interface SettingArrayFieldProps {
	value: string
	onChange: (value: string) => void
}
export const SettingArrayField = ({ value, onChange }: SettingArrayFieldProps) => {
	const parseArray = (str: string): string[] => {
		try {
			const cleaned = str.replace(/[[\]']/g, '')
			return cleaned.split(',').filter(item => item.trim() !== '')
		} catch {
			return []
		}
	}

	const [items, setItems] = useState<string[]>(parseArray(value))
	const [newItem, setNewItem] = useState('')

	const addItem = () => {
		if (newItem.trim()) {
			const updated = [...items, newItem.trim()]
			setItems(updated)
			onChange(`[${updated.map(item => `'${item}'`).join(',')}]`)
			setNewItem('')
		}
	}

	const removeItem = (index: number) => {
		const updated = items.filter((_, i) => i !== index)
		setItems(updated)
		onChange(`[${updated.map(item => `'${item}'`).join(',')}]`)
	}

	return (
		<div className="w-80 space-y-2">
			<div className="space-y-2">
				{items.map((item, index) => (
					<div key={index} className="flex items-center gap-2">
						<span className="bg-muted flex-1 rounded px-2 py-1 text-sm">{item}</span>
						<Button
							text="X"
							size="content"
							buttonSize="small"
							color="blue"
							onClick={() => removeItem(index)}
						/>
					</div>
				))}
			</div>
			<div className="flex gap-2">
				<Input
					placeholder="Nuevo item"
					value={newItem}
					onChange={e => setNewItem(e.target.value)}
					// onKeyPress={e => {
					// 	if (e.key === 'Enter') {
					// 		e.preventDefault()
					// 		addItem()
					// 	}
					// }}
					className="text-sm"
				/>
				<Button text="X" size="content" buttonSize="small" color="blue" onClick={addItem} />
			</div>
		</div>
	)
}
