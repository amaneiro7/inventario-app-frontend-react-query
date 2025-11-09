import { memo, useState } from 'react'
import { Badge } from '@/shared/ui/Badge'
import { X, Plus } from 'lucide-react'
import { Input } from '@/shared/ui/Input/Input'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'

interface SettingArrayInputProps {
	value: string
	onChange: (value: string) => void
}

export const SettingArrayInput = memo(({ onChange, value }: SettingArrayInputProps) => {
	const [newItem, setNewItem] = useState('')
	// Parse the array value (format: "['item1','item2']")
	const cleanStringToArray = (inputString: string): string[] => {
		try {
			// 1. Verificar y limpiar los corchetes exteriores
			// Quita el '[' al inicio (^) y el ']' al final ($)
			let content = inputString.replace(/^\[|\]$/g, '')

			// 2. Limpiear las comillas que envuelven a los items.
			// La expresión regular /'/g reemplaza TODAS las comillas simples (') por vacías.
			// La expresión regular /"/g reemplaza TODAS las comillas dobles (") por vacías.
			content = content.replace(/'/g, '').replace(/"/g, '')

			// 3. Dividir la cadena or la coma.
			// El metodo .split(',') genera el array.
			// El método .map(item => item.trim()) se asegura de quitar cualquier espacio extra.
			const finalArray: string[] = content.split(',').map(item => item.trim())

			// Si el array resultante es [''] (lo que ocurre si la string original era "[]"),
			// devolvemos un array vacío real.
			if (finalArray.length === 1 && finalArray[0] === '') {
				return []
			}

			return finalArray
		} catch {
			return []
		}
	}

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
						console.log(e.key)
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
