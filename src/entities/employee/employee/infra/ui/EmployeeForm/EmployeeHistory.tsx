import { useMemo } from 'react'
import Typography from '@/shared/ui/Typography'
import { EmployeeDto } from '../../../domain/dto/Employee.dto'

interface DeviceSnapshot {
	id: string
	serial?: string
	computerName?: string
	employeeId?: string
	locationId?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any
}

export interface HistoryItem {
	id: string
	deviceId: string
	userId: string
	employeeId: string
	action: string
	oldData: DeviceSnapshot
	newData: DeviceSnapshot
	createdAt: string
	updatedAt: string
}

interface EmployeeHistoryProps {
	history?: EmployeeDto['history']
}

export const EmployeeHistory = ({ history = [] }: EmployeeHistoryProps) => {
	if (history === null || (history && history.length === 0)) {
		return (
			<div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50">
				<Typography variant="p" className="text-gray-500">
					No hay historial de dispositivos disponible para este empleado.
				</Typography>
			</div>
		)
	}
	const sortedHistory = useMemo(() => {
		return [...history].sort(
			(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		)
	}, [history])

	return (
		<div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full text-left text-sm">
					<thead className="bg-gray-50 text-gray-500">
						<tr>
							<th className="px-6 py-3 font-medium">Fecha</th>
							<th className="px-6 py-3 font-medium">Acción</th>
							<th className="px-6 py-3 font-medium">Dispositivo</th>
							<th className="px-6 py-3 font-medium">Detalles del Cambio</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{sortedHistory.map(item => {
							const date = new Date(item.createdAt).toLocaleString('es-VE', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit'
							})

							const deviceName =
								item.newData?.computerName ||
								item.newData?.serial ||
								item.oldData?.computerName ||
								item.oldData?.serial ||
								'Desconocido'

							// Lógica simple para describir el cambio
							const changes: string[] = []
							if (item.action === 'CREATE')
								changes.push('Registro inicial del equipo')

							if (item.action === 'UPDATE') {
								// Cambio de asignación
								if (item.oldData?.employeeId !== item.newData?.employeeId) {
									if (item.newData?.employeeId) {
										changes.push('Equipo asignado al empleado')
									} else {
										changes.push('Equipo desasignado')
									}
								}
								// Cambio de ubicación
								if (item.oldData?.locationId !== item.newData?.locationId) {
									changes.push('Cambio de ubicación')
								}
								// Cambio de IP
								if (item.oldData?.ipAddress !== item.newData?.ipAddress) {
									changes.push(
										`IP: ${item.oldData?.ipAddress || 'N/A'} -> ${item.newData?.ipAddress}`
									)
								}

								// Fallback si no detectamos algo específico pero hubo update
								if (changes.length === 0)
									changes.push('Actualización de datos técnicos')
							}

							return (
								<tr key={item.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-gray-900">
										{date}
									</td>
									<td className="px-6 py-4">
										<span
											className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
												item.action === 'CREATE'
													? 'bg-green-100 text-green-800'
													: 'bg-blue-100 text-blue-800'
											}`}
										>
											{item.action === 'CREATE'
												? 'CREACIÓN'
												: 'ACTUALIZACIÓN'}
										</span>
									</td>
									<td className="px-6 py-4 font-medium text-gray-700">
										{deviceName}
									</td>
									<td className="px-6 py-4 text-gray-500">
										{changes.join(', ')}
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
