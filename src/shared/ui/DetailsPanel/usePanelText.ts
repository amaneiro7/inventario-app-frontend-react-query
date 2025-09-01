import { useMemo } from 'react'

type PanelType = 'devices' | 'locations'

export const usePanelText = (panelType: PanelType, selectedItemName: string | null) => {
	const texts = useMemo(() => {
		const common = {
			noSelectionMessage: `Haz clic en cualquier ${panelType === 'locations' ? 'estado del mapa' : 'piso'} para ver el detalle.`
		}

		if (panelType === 'devices') {
			return {
				...common,
				mainTitle: selectedItemName
					? `Conectividad de Equipos en ${selectedItemName}`
					: 'Selecciona un piso en el mapa.',
				mainDescription: selectedItemName
					? `Mostrando el estado de conectividad de los equipos de red en ${selectedItemName}.`
					: 'Panel para mostrar información detallada.',
				percentageTitle: 'Porcentaje de Equipos Activos',
				totalCountTitle: 'Total de Equipos',
				noEquipmentOrLinksMessage: 'No hay equipos de red registrados para esta ubicación.'
			}
		} else {
			return {
				...common,
				mainTitle: selectedItemName
					? `Conectividad de Enlaces en ${selectedItemName}`
					: 'Selecciona un estado en el mapa.',
				mainDescription: selectedItemName
					? `Mostrando el estado de conectividad de los enlaces y agencias en ${selectedItemName}.`
					: 'Panel para mostrar información detallada.',
				percentageTitle: 'Porcentaje de Enlaces Operativos',
				totalCountTitle: 'Total de Enlaces/Agencias',
				noEquipmentOrLinksMessage: 'No hay enlaces o agencias registrados para este estado.'
			}
		}
	}, [panelType, selectedItemName])

	return texts
}
