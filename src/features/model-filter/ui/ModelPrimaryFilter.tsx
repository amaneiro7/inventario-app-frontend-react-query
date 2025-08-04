import { lazy, memo, Suspense } from 'react'
import { InputFallback } from '@/shared/ui/Loading/InputFallback'

const BrandCombobox = lazy(() =>
	import('@/entities/brand/infra/ui/BrandComboBox').then(m => ({
		default: m.BrandCombobox
	}))
)
const ModelCombobox = lazy(() =>
	import('@/entities/model/models/infra/ui/ModelComboBox').then(m => ({
		default: m.ModelCombobox
	}))
)
const CategoryCombobox = lazy(() =>
	import('@/entities/category/infra/ui/CategoryComboBox').then(m => ({
		default: m.CategoryCombobox
	}))
)
const MainCategoryCombobox = lazy(() =>
	import('@/entities/mainCategory/infra/ui/MainCategoryComboBox').then(m => ({
		default: m.MainCategoryCombobox
	}))
)

export const ModelPrimaryFilter = memo(
	({
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
	}) => {
		return (
			<>
				<Suspense fallback={<InputFallback />}>
					<MainCategoryCombobox
						name="mainCategoryId"
						handleChange={handleChange}
						value={mainCategoryId}
					/>
				</Suspense>

				<Suspense fallback={<InputFallback />}>
					<CategoryCombobox
						name="categoryId"
						mainCategoryId={mainCategoryId}
						handleChange={handleChange}
						value={categoryId}
					/>
				</Suspense>

				<Suspense fallback={<InputFallback />}>
					<BrandCombobox
						name="brandId"
						value={brandId}
						categoryId={categoryId}
						mainCategoryId={mainCategoryId}
						handleChange={handleChange}
					/>
				</Suspense>

				<Suspense fallback={<InputFallback />}>
					<ModelCombobox
						name="id"
						value={id}
						brandId={brandId}
						categoryId={categoryId}
						mainCategoryId={mainCategoryId}
						handleChange={handleChange}
					/>
				</Suspense>
			</>
		)
	}
)

ModelPrimaryFilter.displayName = 'ModelPrimaryFilter'
