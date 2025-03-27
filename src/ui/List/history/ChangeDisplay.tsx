/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from '@/components/Typography'
import { memo } from 'react'

interface ChangeDisplayProps {
	changes: Record<string, { oldValue: Record<string, any>; newValue: Record<string, any> }>
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
	observation: 'Observación',
	operatingSystemArqId: 'Arquiectura',
	operatingSystemId: 'Sistema Operativo',
	processorId: 'Procesador',
	serial: 'Serial',
	status: 'Estatus'
}

export const ChangeDisplay = memo(({ changes }: ChangeDisplayProps) => {
	return Object.entries(changes).map(([key, { oldValue, newValue }]) => {
		const title = titleMap[key] ?? key
		return (
			<Typography
				key={key}
				variant="p"
				color="azul"
				option="tiny"
				className="max-w-fit flex flex-col gap-1"
			>
				<Typography variant="span" option="tiny" className="font-extrabold">
					{title}:
				</Typography>
				{Array.isArray(oldValue) && Array.isArray(newValue) ? (
					<Typography variant="span" option="tiny" className="ml-2 font-light">
						<span className="block">Antiguo: {oldValue.join(', ')}</span>
						<span className="block">Nuevo: {newValue.join(', ')}</span>
					</Typography>
				) : (
					<Typography variant="span" option="tiny" className="ml-2 font-light">
						<span className="block">Antiguo: {String(oldValue)}</span>
						<span className="block">Nuevo: {String(newValue)}</span>
					</Typography>
				)}
			</Typography>
		)
	})
})
