/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/shared/ui/Typography'
import { History } from '@/entities/history/domain/dto/History.dto'
import { memo } from 'react'

interface ChangeDisplayProps {
	/**
	 * An object containing the changes, where keys are field names and values are objects
	 * with `oldValue` and `newValue` properties.
	 */
	changes: Record<string, { oldValue: Record<string, any>; newValue: Record<string, any> }>
	/**
	 * The action type of the history record (e.g., 'CREATE', 'UPDATE', 'DELETE').
	 * This is used to determine if an "Old Value" should be displayed.
	 */
	action: History['action']
}

const titleMap: Record<string, any> = {
	brandId: 'Marca',
	categoryId: 'Categoria',
	computerName: 'Nombre de computadora',
	hardDriveCapacityId: 'Capacidad del disco duro',
	hardDriveTypeId: 'Tipo de disco',
	ipAddress: 'Dirección IP',
	locationId: 'Ubicación',
	macAddress: 'Dirección MAC',
	memoryRam: 'Memorias RAM',
	memoryRamCapacity: 'Memorias RAM Total',
	modelId: 'Modelo',
	employeeId: 'Usuario',
	observation: 'Observación',
	operatingSystemArqId: 'Arquitectura',
	operatingSystemId: 'Sistema Operativo',
	processorId: 'Procesador',
	serial: 'Serial',
	statusId: 'Estatus'
}

/**
 * Helper function to render a value, handling arrays by joining them with ' / '.
 * @param value - The value to render.
 * @returns A string representation of the value.
 */
const renderValue = (value: any): string => {
	return Array.isArray(value) ? value.join(' / ') : String(value ?? 'Sin asignar')
}

/**
 * `ChangeDisplay` is a memoized functional component that displays a list of changes
 * from a history record. It iterates over the `changes` object and formats the old and new values
 * for display, using a `titleMap` to provide user-friendly labels for field names.
 */
export const ChangeDisplay = memo(({ changes, action }: ChangeDisplayProps) => {
	return Object.entries(changes).map(([key, { oldValue, newValue }]) => {
		const title = titleMap[key] ?? key
		const hasChanged = action !== 'CREATE'
		return (
			<Typography
				key={key}
				variant="p"
				color="azul"
				option="tiny"
				className="flex max-w-fit flex-col gap-1"
			>
				<Typography variant="span" option="tiny" className="font-extrabold">
					{title}:
				</Typography>

				<Typography variant="span" option="tiny" className="ml-2 font-light">
					{hasChanged && <span className="block">Antiguo: {renderValue(oldValue)}</span>}
					<span className="block">
						{hasChanged && 'Nuevo: '}
						{renderValue(newValue)}
					</span>
				</Typography>
			</Typography>
		)
	})
})