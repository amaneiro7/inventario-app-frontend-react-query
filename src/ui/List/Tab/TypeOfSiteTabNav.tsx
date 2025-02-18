import { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { useGetAllTypeOfSite } from '@/core/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'

interface Props {
	handleChange: (name: string, value: string) => void
	value: string
}

const TabsNav = lazy(async () => import('./TabsNav').then(m => ({ default: m.TabsNav })))
const TabNav = lazy(async () => import('./TabNav').then(m => ({ default: m.TabNav })))

export const TypeOfSiteTabNav = memo(function ({ handleChange, value }: Props) {
	const [inputValue, setInputValue] = useState(value ?? '0')
	const { typeOfSites } = useGetAllTypeOfSite({
		options: {}
	})
	const typeOfSiteTab = useMemo(() => {
		const defaultTab = [{ id: '0', name: 'Todos' }]
		return typeOfSites?.data ? defaultTab.concat(typeOfSites.data) : defaultTab
	}, [typeOfSites.data])

	const handleClick = useCallback((typeId: string) => {
		if (typeId === inputValue) return
		setInputValue(typeId)
		handleChange('typeOfSiteId', typeId === '0' ? '' : typeId)
	}, [])

	return (
		<Suspense>
			<TabsNav>
				{typeOfSiteTab.map(type => (
					<TabNav
						key={type.id}
						displayName={type.name}
						handleClick={() => handleClick(type.id)}
						value={inputValue}
						active={inputValue === type.id}
					/>
				))}
			</TabsNav>
		</Suspense>
	)
})
