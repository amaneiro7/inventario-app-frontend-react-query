import { lazy, memo, useState, Suspense } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'

const CategoryCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Sincrono/CategoryComboBox').then(m => ({
			default: m.CategoryCombobox
		}))
)
const RegionCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Sincrono/RegionComboBox').then(m => ({
			default: m.RegionCombobox
		}))
)
const EmployeeCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Asincrono/EmployeeComboBox').then(m => ({
			default: m.EmployeeCombobox
		}))
)
const LocationCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/Asincrono/LocationComboBox').then(m => ({
			default: m.LocationCombobox
		}))
)
const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

export const MainComputerFilter = memo(function ({
	handleChange,
	employeeId,
	categoryId,
	mainCategoryId,
	locationId,
	regionId,
	typeOfSiteId,
	serial
}: {
	employeeId?: string
	categoryId?: string
	mainCategoryId?: string
	regionId?: string
	locationId?: string
	serial?: string
	typeOfSiteId?: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [localSerial, setLocalSerial] = useState(serial ?? '')
	const [debounceSerial] = useDebounce(localSerial)

	useEffectAfterMount(() => {
		handleChange('serial', debounceSerial)
	}, [debounceSerial])

	return (
		<>
			<Suspense>
				<EmployeeCombobox
					name="employeeId"
					handleChange={handleChange}
					value={employeeId}
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
				<Input
					value={localSerial}
					label="Serial"
					name="serial"
					type="search"
					onChange={e => {
						let { value } = e.target
						value = value.trim().toUpperCase()
						setLocalSerial(value)
					}}
				/>
			</Suspense>
			<Suspense>
				<LocationCombobox
					name="locationId"
					handleChange={handleChange}
					value={locationId}
					typeOfSiteId={typeOfSiteId}
				/>
			</Suspense>
			<Suspense>
				<RegionCombobox name="regionId" handleChange={handleChange} value={regionId} />
			</Suspense>
		</>
	)
})
