/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/shared/ui/Typography'
import { History } from '@/entities/history/domain/dto/History.dto'
import { memo } from 'react'
import { cn } from '@/shared/lib/utils'

interface ChangeDisplayProps {
	className?: HTMLElement['className']
	changes: Record<string, { oldValue: Record<string, any>; newValue: Record<string, any> }>

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
export const ChangeDisplay = memo(({ changes, action, className }: ChangeDisplayProps) => {
	return Object.entries(changes).map(([key, { oldValue, newValue }]) => {
		const title = titleMap[key] ?? key
		const hasChanged = action !== 'CREATE'
		return (
			<div
				key={key}
				className={cn('flex flex-col items-start justify-start py-1.5', className)}
			>
				<Typography variant="p" option="tiny" weight="semibold" color="azul">
					{title}:
				</Typography>

				<Typography variant="p" color="gris" option="tiny" className="ml-2">
					{hasChanged && (
						<span className="block">
							<strong>Antiguo: </strong>
							{renderValue(oldValue)}
						</span>
					)}
					<span className="block">
						{hasChanged && <strong>Nuevo: </strong>}
						{renderValue(newValue)}
					</span>
				</Typography>
			</div>
		)
	})
})
