import { useGetAllTypeOfSite } from '@/hooks/getAll/useGetAllTypeOfSite'
import { lazy, memo, useMemo, useState } from 'react'

interface Props {
	handleChange: (name: string, value: string) => void
	value: string
}

const TabsNav = lazy(async () => import('./TabsNav').then(m => ({ default: m.TabsNav })))
const TabNav = lazy(async () => import('./TabNav').then(m => ({ default: m.TabNav })))

export const TypeOfSiteTabNav = memo(function ({ handleChange, value }: Props) {
	const [inputValue, setInputValue] = useState(value ?? '0')
	const { isLoading, typeOfSites } = useGetAllTypeOfSite({
		options: {}
	})
	const typeOfSiteTab = useMemo(() => {
		const defaultTab = [{ id: '0', name: 'Todos' }]
		if (typeOfSites) {
			return defaultTab.concat(typeOfSites?.data)
		}
		return defaultTab
	}, [typeOfSites?.data])

	return (
		<TabsNav>
			{!isLoading
				? typeOfSiteTab.map(type => (
						<TabNav
							key={type.id}
							displayName={type.name}
							handleClick={() => {
								if (type.id === inputValue) return
								setInputValue(type.id)
								handleChange('typeOfSiteId', type.id === '0' ? '' : type.id)
							}}
							value={inputValue}
							active={inputValue === type.id}
						/>
				  ))
				: []}
		</TabsNav>
	)
})
