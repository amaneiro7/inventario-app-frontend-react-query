import { Pencil, User } from 'lucide-react'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { convertNumberMiles } from '@/shared/lib/utils/convertNumberMiles'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { type DeviceDto } from '../../../domain/dto/Device.dto'
import { LinkAsButton } from '@/shared/ui/Button/LinkAsButton'

export const EmployeeInformation = ({ employee }: { employee: DeviceDto['employee'] }) => {
	const employeeFullName = employee ? `${employee.name} ${employee.lastName}`.trim() : ''
	const cedula =
		employee?.cedula && employee?.nationality
			? `${employee.nationality}-${convertNumberMiles(employee.cedula)}`
			: ''
	return (
		<CardDetail
			title="Usuario Asignado"
			icon={<User className="h-5 w-5" />}
			headerAction={
				<LinkAsButton
					to={`/form/employee/edit/${employee.id}`}
					icon={<Pencil className="h-4 w-4" />}
					text="Editar"
					buttonSize="small"
					color="blue"
				/>
			}
		>
			<DetailItem label="Usuario" value={employee.userName} />
			{employee.name && <DetailItem label="Nombre" value={employeeFullName} />}
			<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
				{employee.employeeCode && (
					<DetailItem label="Cod. Empleado" value={employee.employeeCode} />
				)}
				{employee.cedula && <DetailItem label="Cédula" value={cedula} />}
			</div>
			{employee.directiva && (
				<DetailItem label="Directiva" value={employee.directiva?.name} />
			)}
			{employee.vicepresidenciaEjecutiva && (
				<DetailItem label="V.P.E" value={employee.vicepresidenciaEjecutiva?.name} />
			)}
			{employee.vicepresidencia && (
				<DetailItem label="V.P." value={employee.vicepresidencia?.name} />
			)}
			{employee.departamento && (
				<DetailItem label="Departamento" value={employee.departamento?.name} />
			)}
			{employee.cargo && <DetailItem label="Cargo" value={employee.cargo?.name} />}
			<DetailItem
				label="Extensiones"
				value={employee.extension?.map(ext => formatearTelefono(ext)).join('  ')}
			/>
			<DetailItem
				label="Teléfono"
				value={employee.phone?.map(ext => formatearTelefono(ext)).join('  ')}
			/>
		</CardDetail>
	)
}
