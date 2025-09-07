import { lazy } from 'react'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'
import { convertNumberMiles } from '@/shared/lib/utils/convertNumberMiles'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { type EmployeeDto } from '../../domain/dto/Employee.dto'

const EmployeeDeviceSummaryCard = lazy(() =>
	import('./EmployeeDeviceSummaryCard').then(m => ({ default: m.EmployeeDeviceSummaryCard }))
)

const DetailModalWrapper = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalWrapper').then(m => ({
		default: m.DetailModalWrapper
	}))
)
const DetailModalHeader = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalHeader').then(m => ({
		default: m.DetailModalHeader
	}))
)
const DetailModalContent = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailModalContent').then(m => ({
		default: m.DetailModalContent
	}))
)
const EmployeeModalTitle = lazy(() =>
	import('./EmployeeModalTitle').then(m => ({ default: m.EmployeeModalTitle }))
)
const DetailItem = lazy(() =>
	import('@/shared/ui/DescriptionList/DetailItem').then(m => ({ default: m.DetailItem }))
)
const CardDetail = lazy(() =>
	import('@/shared/ui/DescriptionList/CardDetail').then(m => ({ default: m.CardDetail }))
)
const Icon = lazy(() => import('@/shared/ui/icon/Icon').then(m => ({ default: m.Icon })))

interface DetailsEmployeeModalProps {
	employee: EmployeeDto
	onClose: () => void
}
export const DetailsEmployeeModal = ({ employee, onClose }: DetailsEmployeeModalProps) => {
	const fullName = employee.name ? `${employee?.name} ${employee?.lastName}`.trim() : null
	const cedula = employee.cedula
		? `${employee.nationality}-${convertNumberMiles(employee.cedula)}`
		: null
	const phones = employee.phone?.map(tel => formatearTelefono(tel)).join(' / ')
	const extensions = employee.extension?.map(ext => formatearTelefono(ext)).join(' / ')

	return (
		<DetailModalWrapper>
			<DetailModalHeader onClose={onClose} url={`/form/employee/edit/${employee.id}`}>
				<EmployeeModalTitle
					isStillWorking={employee.isStillWorking}
					userName={employee.userName}
					type={employee.type}
				/>
			</DetailModalHeader>
			{/* --- Tarjeta de Información Personal y de Contacto --- */}
			<DetailModalContent>
				<CardDetail
					title="Información Personal"
					icon={<Icon name="contact" className="h-5 w-5" />}
				>
					<div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
						{fullName && (
							<DetailItem
								classNameBox="sm:col-span-2"
								label="Nombre Completo"
								value={fullName}
							/>
						)}
						{cedula && <DetailItem label="Cédula" value={cedula} />}
						<DetailItem label="Código de empleado" value={employee?.employeeCode} />
						<DetailItem
							classNameBox="sm:col-span-2"
							label="Email"
							value={employee?.email}
						/>
						<DetailItem classNameBox="sm:col-span-2" label="Teléfonos" value={phones} />
						<DetailItem
							classNameBox="sm:col-span-2"
							label="Extensiones"
							value={extensions}
						/>
					</div>
				</CardDetail>
				{/* --- Tarjeta de Información Organizacional --- */}
				<CardDetail
					// className="lg:col-span-2"
					title="Info. Organizacional"
					icon={<Icon name="briefcase" className="h-5 w-5" />}
				>
					<DetailItem label="Cargo" value={employee?.cargo?.name} />
					<DetailItem label="Departamento" value={employee?.departamento?.name} />
					<DetailItem label="Vicepresidencia" value={employee?.vicepresidencia?.name} />
					<DetailItem
						label="V.E. Ejecutiva"
						value={employee?.vicepresidenciaEjecutiva?.name}
					/>
					<DetailItem label="Directiva" value={employee?.directiva?.name} />
				</CardDetail>
				{/* --- Tarjeta de Ubicación --- */}
				{employee.location && (
					<CardDetail
						// className="lg:col-span-2"
						title="Ubicación"
						icon={<Icon name="mapPin" className="h-5 w-5" />}
					>
						<DetailItem label="Sitio" value={employee?.location?.site?.name} />
						<DetailItem label="Ubicación" value={employee?.location?.name} />
						<DetailItem label="Dirección" value={employee?.location?.site?.address} />
					</CardDetail>
				)}
				{/* --- Tarjeta de Dispositivos Asignados --- */}
				{employee.devices && employee.devices.length > 0 && (
					<CardDetail
						className="lg:col-span-2"
						title={`Dispositivos Asignados (${employee.devices.length})`}
						icon={<Icon name="computer" className="h-5 w-5" />}
					>
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							{employee.devices.map(device => (
								<EmployeeDeviceSummaryCard key={device.id} device={device} />
							))}
						</div>
					</CardDetail>
				)}
				{/* --- Tarjeta de Metadatos --- */}
				<CardDetail className="lg:col-span-2" title="Metadatos">
					<DetailItem
						label="Última Actualizacón"
						value={
							employee.updatedAt
								? `${new Date(
										employee.updatedAt
									).toLocaleDateString()} (${getRelativeTime(employee.updatedAt)})`
								: 'Sin Actualización'
						}
					/>
				</CardDetail>
			</DetailModalContent>
		</DetailModalWrapper>
	)
}
