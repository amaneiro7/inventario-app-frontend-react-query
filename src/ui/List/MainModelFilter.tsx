import { memo } from 'react'
import { BrandCombobox } from '@/components/ComboBox/Asincrono/BrandComboBox'
import { ModelCombobox } from '@/components/ComboBox/Asincrono/ModelComboBox'
import { CategoryCombobox } from '@/components/ComboBox/Sincrono/CategoryComboBox'
import { MainCategoryCombobox } from '@/components/ComboBox/Sincrono/MainCategoryComboBox'

export const MainModelFilter = memo(function ({
	handleChange,
	categoryId,
	mainCategoryId,
	brandId,
	id
}: {
	categoryId?: string
	mainCategoryId?: string
	brandId?: string
	id?: string
	handleChange: (name: string, value: string | number) => void
}) {
	return (
		<>
			<MainCategoryCombobox
				name="mainCategoryId"
				handleChange={handleChange}
				value={mainCategoryId}
			/>

			<CategoryCombobox
				name="categoryId"
				mainCategoryId={mainCategoryId}
				handleChange={handleChange}
				value={categoryId}
			/>

			<BrandCombobox name="brandId" value={brandId} handleChange={handleChange} />

			<ModelCombobox
				name="id"
				value={id}
				brandId={brandId}
				categoryId={categoryId}
				handleChange={handleChange}
			/>
		</>
	)
})
