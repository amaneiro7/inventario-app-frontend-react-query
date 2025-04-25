/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/Typography'
import { History } from '@/core/history/domain/dto/History.dto'
import { memo } from 'react'

interface ChangeDisplayProps {
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

const renderValue = (value: any): string => {
	return Array.isArray(value) ? value.join(' / ') : String(value ?? 'Sin asignar')
}

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
