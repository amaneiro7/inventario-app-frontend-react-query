import { CategoryCombobox } from '@/components/ComboBox/Sincrono/CategoryComboBox'
import React, { memo, useState } from 'react'

export function Prueba() {
	const [value, setValue] = useState('')
	return (
		<CategoryCombobox
			value={value}
			key="category"
			name="categoryId"
			handleChange={(name, value) => {
				setValue(value)
			}}
		/>
	)
}
