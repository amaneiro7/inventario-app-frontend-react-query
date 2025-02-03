import { lazy, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'

const CategoryCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/CategoryComboBox').then(m => ({
			default: m.CategoryCombobox
		}))
)
const EmployeeCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/EmployeeComboBox').then(m => ({
			default: m.EmployeeCombobox
		}))
)
const LocationCombobox = lazy(
	async () =>
		await import('@/components/ComboBox/LocationComboBox').then(m => ({
			default: m.LocationCombobox
		}))
)
const Input = lazy(
	async () => await import('@/components/Input/Input').then(m => ({ default: m.Input }))
)

export function MainComputerFilter({
	handleChange,
	employeeId,
	categoryId,
	mainCategoryId,
	locationId,
	regionId,
	typeOfSiteId,
	serial
}: {
	employeeId: string
	categoryId: string
	mainCategoryId: string
	regionId: string
	locationId: string
	serial: string
	typeOfSiteId: string
	handleChange: (name: string, value: string) => void
}) {
	const [localSerial, setLocalSerial] = useState(serial)
	const [debounceSerial] = useDebounce(localSerial)

	useEffectAfterMount(() => {
		handleChange('serial', debounceSerial)
	}, [debounceSerial])

	console.log('MainComputerFilter', mainCategoryId)

	return (
		<>
			<EmployeeCombobox name="employeeId" handleChange={handleChange} value={employeeId} />
			<CategoryCombobox
				name="categoryId"
				mainCategoryId={mainCategoryId}
				handleChange={handleChange}
				value={categoryId}
			/>
			<Input
				value={localSerial}
				label="Serial"
				name="serial"
				onChange={e => setLocalSerial(e.target.value)}
			/>
			<LocationCombobox
				name="locationId"
				handleChange={handleChange}
				value={locationId}
				typeOfSiteId={typeOfSiteId}
			/>
		</>
	)
}
