import { lazy, memo, Suspense } from 'react'
import { InputFallback } from '@/components/Loading/InputFallback'

const BrandCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/BrandComboBox').then(m => ({
		default: m.BrandCombobox
	}))
)
const ModelCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/ModelComboBox').then(m => ({
		default: m.ModelCombobox
	}))
)
const CategoryCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/CategoryComboBox').then(m => ({
		default: m.CategoryCombobox
	}))
)
const MainCategoryCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/MainCategoryComboBox').then(m => ({
		default: m.MainCategoryCombobox
	}))
)

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
})
