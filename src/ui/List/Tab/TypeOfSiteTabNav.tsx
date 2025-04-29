import { memo, useCallback, useMemo, useState } from 'react'
import { useGetAllTypeOfSite } from '@/core/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'
import { TabNav } from './TabNav'

interface Props {
	handleChange: (name: string, value: string) => void
	value?: string
}
export const TypeOfSiteTabNav = memo(({ handleChange, value }: Props) => {
	const [inputValue, setInputValue] = useState(() => (value ? value : '0'))
	const { typeOfSites, isLoading } = useGetAllTypeOfSite({})

	const typeOfSiteTab = useMemo(() => {
		return [{ id: '0', name: 'Todos' }].concat(typeOfSites?.data ?? [])
	}, [typeOfSites?.data])

	const handleClick = useCallback(
		(typeId: string) => {
			if (typeId === inputValue) return
			setInputValue(typeId)
			handleChange('typeOfSiteId', typeId === '0' ? '' : typeId)
		},
		[setInputValue, handleChange]
	)

	const skeletonTabs = useMemo(() => [{ id: '0', name: 'Todos' }, {}, {}, {}], [])

	return (
		<>
			{isLoading
				? skeletonTabs.map((_, index) => (
						<div
							key={`skeleton-${index + 1}`}
							role="tab"
							aria-selected={index === 0}
							aria-label={`Cargando pestaña ${index + 1}`}
							className={`flex h-7 animate-pulse items-center justify-center rounded-t-md bg-gray-300 p-4 px-4 text-center text-xs will-change-auto ${
								index === 0 ? 'font-bold text-gray-100' : 'text-gray-500'
							}`}
						/>
					))
				: typeOfSiteTab.map(type => (
						<TabNav
							key={type.id}
							id={type.id}
							displayName={type.name}
							handleClick={() => handleClick(type.id)}
							value={inputValue}
							active={inputValue === type.id}
						/>
					))}
		</>
	)
})

TypeOfSiteTabNav.displayName = 'TypeOfSiteTabNav'
