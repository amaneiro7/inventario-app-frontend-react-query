import { lazy, memo, Suspense } from 'react'

const CategoryCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Sincrono/CategoryComboBox').then(m => ({
			default: m.CategoryCombobox
		}))
)
const MainCategoryCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Sincrono/MainCategoryComboBox').then(m => ({
			default: m.MainCategoryCombobox
		}))
)
const BrandCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Asincrono/BrandComboBox').then(m => ({
			default: m.BrandCombobox
		}))
)
const ModelCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Asincrono/ModelComboBox').then(m => ({
			default: m.ModelCombobox
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
			<Suspense>
				<MainCategoryCombobox
					name="mainCategoryId"
					handleChange={handleChange}
					value={mainCategoryId}
				/>
			</Suspense>
			<Suspense>
				<CategoryCombobox
					name="categoryId"
					mainCategoryId={mainCategoryId}
					handleChange={handleChange}
					value={categoryId}
				/>
			</Suspense>
			<Suspense>
				<BrandCombobox name="brandId" value={brandId} handleChange={handleChange} />
			</Suspense>
			<Suspense>
				<ModelCombobox
					name="id"
					value={id}
					brandId={brandId}
					categoryId={categoryId}
					handleChange={handleChange}
				/>
			</Suspense>
		</>
	)
})
