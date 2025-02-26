import { memo, useMemo, useState } from 'react'
import { useGetAllTypeOfSite } from '@/core/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'
import { TabsNav } from './TabsNav'
import { TabNav } from './TabNav'

interface Props {
	handleChange: (name: string, value: string) => void
	value: string
}
export const TypeOfSiteTabNav = memo(function ({ handleChange, value }: Props) {
	const [inputValue, setInputValue] = useState(() => (value ? value : '0'))
	const { typeOfSites } = useGetAllTypeOfSite({})

	const typeOfSiteTab = useMemo(() => {
		return [{ id: '0', name: 'Todos' }].concat(typeOfSites?.data)
	}, [typeOfSites?.data])

	const handleClick = (typeId: string) => {
		console.log('typeId', typeId, 'inputValue', inputValue)
		if (typeId === inputValue) return
		setInputValue(typeId)
		handleChange('typeOfSiteId', typeId === '0' ? '' : typeId)
	}

	return (
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
	)
})
