import { lazy, memo, useCallback, useState } from 'react'
import { useDebounce } from '@/shared/lib/hooks/useDebounce'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'
import { Input } from '@/shared/ui/Input/Input'
import { MainCategoryOptions } from '@/entities/mainCategory/domain/entity/MainCategoryOptions'

const CategoryCombobox = lazy(() =>
	import('@/entities/category/infra/ui/CategoryComboBox').then(m => ({
		default: m.CategoryCombobox
	}))
)
const BrandCombobox = lazy(() =>
	import('@/entities/brand/infra/ui/BrandComboBox').then(m => ({
		default: m.BrandCombobox
	}))
)
const SiteCombobox = lazy(() =>
	import('@/entities/locations/site/infra/ui/SiteCombobox').then(m => ({
		default: m.SiteCombobox
	}))
)

export const MainInventoryBrandTableFilter = memo(
	({
		handleChange,
		brandId,
		siteId,
		categoryId,
		modelName
	}: {
		siteId?: string
		modelName?: string
		categoryId?: string
		brandId?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const [localModelName, setLocalModelName] = useState(modelName ?? '')
		const [debounceModelName] = useDebounce(localModelName)

		useEffectAfterMount(() => {
			handleChange('modelName', debounceModelName)
		}, [debounceModelName])

		useEffectAfterMount(() => {
			if (!modelName) {
				setLocalModelName('')
			}
		}, [modelName])

		const handleModelName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value.trim().toUpperCase()
			setLocalModelName(value)
		}, [])

		return (
			<>
				<Input
					id="modelName-search"
					value={localModelName}
					label="Nombre de equipo"
					name="modelName"
					type="search"
					transform
					placeholder="Buscar por nombre de equipo"
					onChange={handleModelName}
				/>
				<BrandCombobox
					name="brandId"
					handleChange={handleChange}
					value={brandId}
					categoryId={categoryId}
					mainCategoryId={MainCategoryOptions.COMPUTER}
				/>
				<CategoryCombobox
					name="categoryId"
					handleChange={handleChange}
					value={categoryId}
					mainCategoryId={MainCategoryOptions.COMPUTER}
				/>
				<SiteCombobox
					name="siteId"
					handleChange={handleChange}
					value={siteId}
					method="search"
				/>
			</>
		)
	}
)

MainInventoryBrandTableFilter.displayName = 'MainInventoryBrandTableFilter'
