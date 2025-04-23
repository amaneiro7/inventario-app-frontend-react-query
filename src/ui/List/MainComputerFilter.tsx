import { lazy, memo, Suspense, useCallback, useState } from 'react'
import { useDebounce } from '@/hooks/utils/useDebounce'
import { useEffectAfterMount } from '@/hooks/utils/useEffectAfterMount'
import { InputFallback } from '@/components/Loading/InputFallback'
import { Input } from '@/components/Input/Input'

const CategoryCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/CategoryComboBox').then(m => ({
		default: m.CategoryCombobox
	}))
)
const EmployeeCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/EmployeeComboBox').then(m => ({
		default: m.EmployeeCombobox
	}))
)
const LocationCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/LocationComboBox').then(m => ({
		default: m.LocationCombobox
	}))
)
const RegionCombobox = lazy(() =>
	import('@/components/ComboBox/Sincrono/RegionComboBox').then(m => ({
		default: m.RegionCombobox
	}))
)
const DepartamentoCombobox = lazy(() =>
	import('@/components/ComboBox/Asincrono/DepartamentoComboBox').then(m => ({
		default: m.DepartamentoCombobox
	}))
)

export const MainComputerFilter = memo(function ({
	handleChange,
	employeeId,
	categoryId,
	mainCategoryId,
	locationId,
	regionId,
	typeOfSiteId,
	serial,
	departamentoId,
	vicepresidenciaId
}: {
	employeeId?: string
	categoryId?: string
	mainCategoryId?: string
	regionId?: string
	locationId?: string
	serial?: string
	departamentoId?: string
	vicepresidenciaId?: string
	typeOfSiteId?: string
	handleChange: (name: string, value: string | number) => void
}) {
	const [localSerial, setLocalSerial] = useState(serial ?? '')
	const [debounceSerial] = useDebounce(localSerial)

	useEffectAfterMount(() => {
		handleChange('serial', debounceSerial)
	}, [debounceSerial])

	useEffectAfterMount(() => {
		if (!serial) {
			setLocalSerial('')
		}
	}, [serial])

	const handleSerial = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim().toUpperCase()
		setLocalSerial(value)
	}, [])

	return (
		<>
			<Suspense fallback={<InputFallback />}>
				<EmployeeCombobox
					name="employeeId"
					handleChange={handleChange}
					value={employeeId}
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

			<Input
				value={localSerial}
				label="Serial"
				name="serial"
				type="search"
				onChange={handleSerial}
			/>

			<Suspense fallback={<InputFallback />}>
				<LocationCombobox
					name="locationId"
					handleChange={handleChange}
					value={locationId}
					method="search"
					typeOfSiteId={typeOfSiteId}
				/>
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<RegionCombobox name="regionId" handleChange={handleChange} value={regionId} />
			</Suspense>

			<Suspense fallback={<InputFallback />}>
				<DepartamentoCombobox
					name="departamentoId"
					handleChange={handleChange}
					value={departamentoId}
					vicepresidenciaId={vicepresidenciaId}
				/>
			</Suspense>
		</>
	)
})
