import { memo, useCallback, useMemo, useState } from 'react'
import { useGetAllTypeOfSite } from '@/core/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'
import { TabNav } from './TabNav'
import { TypeOfSiteOptions } from '@/core/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
interface Props {
	handleChange: (name: string, value: string) => void
	value?: string
	omit?: Array<keyof typeof TypeOfSiteOptions>
}
export const TypeOfSiteTabNav = memo(({ handleChange, value, omit = [] }: Props) => {
	const [inputValue, setInputValue] = useState(() => (value ? value : '0'))
	const { typeOfSites, isLoading } = useGetAllTypeOfSite({})

	const typeOfSiteTab = useMemo(() => {
		// Create a set of IDs to omit for efficient lookup
		const idsToOmit = new Set(omit.map(key => TypeOfSiteOptions[key]))

		const filteredTypes = (typeOfSites?.data ?? []).filter(
			type =>
				!idsToOmit.has(
					type.id as (typeof TypeOfSiteOptions)[keyof typeof TypeOfSiteOptions]
				)
		)
		return [{ id: '0', name: 'Todos' }].concat(filteredTypes)
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
