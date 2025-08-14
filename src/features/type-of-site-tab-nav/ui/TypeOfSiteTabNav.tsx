import { memo, useCallback, useMemo, useState } from 'react'
import { useGetAllTypeOfSite } from '@/entities/locations/typeOfSites/infra/hook/useGetAllTypeOfSite'
import { TypeOfSiteOptions } from '@/entities/locations/typeOfSites/domain/entity/TypeOfSiteOptions'
import { TabNav } from '@/shared/ui/Tabs/TabNav'
import { useEffectAfterMount } from '@/shared/lib/hooks/useEffectAfterMount'

interface TypeOfSiteTabNavProps {
	handleChange: (name: string, value: string) => void
	value?: string
	omit?: Array<keyof typeof TypeOfSiteOptions>
}

export const TypeOfSiteTabNav = memo(
	({ handleChange, value, omit = [] }: TypeOfSiteTabNavProps) => {
		const { data: typeOfSites, isLoading } = useGetAllTypeOfSite({})
		// estado local del componente para la UI optimista.
		// Se inicializa con el valor que viene de las props para el primer renderizado.
		const [activeTabId, setActiveTabId] = useState(value ?? '0')

		useEffectAfterMount(() => {
			setActiveTabId(value ?? '0')
		}, [value])

		const typeOfSiteTab = useMemo(() => {
			// el valor Omit es por si se quiere omitar algun valo del array
			// por ejemplo en una lista donde no hay equipos en almacen, no seria necesario que aparezca la opcion
			// no seria necesario filtrar por ese campo
			const idsToOmit = new Set(omit.map(key => TypeOfSiteOptions[key]))
			const filteredTypes = (typeOfSites?.data ?? []).filter(
				type =>
					!idsToOmit.has(
						type.id as (typeof TypeOfSiteOptions)[keyof typeof TypeOfSiteOptions]
					)
			)
			return [{ id: '0', name: 'Todos' }].concat(filteredTypes)
		}, [typeOfSites?.data, omit])

		const handleClick = useCallback(
			(typeId: string) => {
				// Comprobar contra el estado local
				// Si la pestaña ya está activa, no hacer nada
				if (typeId === activeTabId) return

				// Actualiza el estado global
				setActiveTabId(typeId)

				// Llamar a handleChange con el nuevo valor
				handleChange('typeOfSiteId', typeId === '0' ? '' : typeId)
			},
			[handleChange, activeTabId]
		)

		// Generar skeletons de forma más dinámica y limpia
		const renderSkeletons = useMemo(() => {
			return Array.from({ length: 4 }).map((_, index) => (
				<div
					key={`skeleton-${index}`}
					role="tab"
					aria-selected={index === 0}
					aria-label={`Cargando pestaña ${index + 1}`}
					className="flex h-7 animate-pulse items-center justify-center rounded-t-md bg-gray-300 p-4 px-4 text-center"
				/>
			))
		}, [])

		if (isLoading) {
			return renderSkeletons
		}

		return (
			<>
				{typeOfSiteTab.map(type => (
					<TabNav
						key={type.id}
						id={type.id}
						displayName={type.name}
						handleClick={() => handleClick(type.id)}
						value={activeTabId}
						active={activeTabId === type.id}
					/>
				))}
			</>
		)
	}
)

TypeOfSiteTabNav.displayName = 'TypeOfSiteTabNav'
