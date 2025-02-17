import { lazy, Suspense } from 'react'
import { type DeviceDto } from '@/core/devices/devices/domain/dto/Device.dto'

const Table = lazy(async () =>
	import('@/components/Table/Table').then(m => ({
		default: m.Table
	}))
)
const LoadingTable = lazy(async () =>
	import('@/components/Table/LoadingTable').then(m => ({
		default: m.LoadingTable
	}))
)
const TableHeader = lazy(async () =>
	import('@/components/Table/TableHeader').then(m => ({
		default: m.TableHeader
	}))
)
const TableRow = lazy(async () =>
	import('@/components/Table/TableRow').then(m => ({
		default: m.TableRow
	}))
)
const TableBody = lazy(async () =>
	import('@/components/Table/TableBody').then(m => ({
		default: m.TableBody
	}))
)
const TableHead = lazy(async () =>
	import('@/components/Table/TableHead').then(m => ({
		default: m.TableHead
	}))
)
const TableDevice = lazy(async () =>
	import('./TableDevice').then(m => ({
		default: m.TableDevice
	}))
)

interface Props {
	devices?: DeviceDto[]
	loading: boolean
	pageSize?: number
}

export function TableWrapper({ devices, loading = true, pageSize = 25 }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead size="small" name="Usuario" />
					<TableHead size="large" name="Ubicación" />
					<TableHead size="small" name="Dirección IP" />
					<TableHead size="small" name="Serial" />
					<TableHead size="small" name="Categoria" />
					<TableHead size="small" name="Marca" />
					<TableHead size="xLarge" name="Modelo" />
					<TableHead size="small" name="Nombre de Equipo" />
					<TableHead size="small" name="Observaciones" />
					<TableHead size="xxSmall" name="" />
				</TableRow>
			</TableHeader>
			<TableBody>
				{loading ? (
					<LoadingTable colspan={9} registerPerPage={pageSize} />
				) : (
					<Suspense>
						<TableDevice devices={devices} />
					</Suspense>
				)}
			</TableBody>
		</Table>
	)
}
