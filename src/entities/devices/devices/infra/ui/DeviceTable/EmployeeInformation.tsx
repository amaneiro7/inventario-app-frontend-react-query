import { Pencil, User } from 'lucide-react'
import { CardDetail } from '@/shared/ui/DescriptionList/CardDetail'
import { DetailItem } from '@/shared/ui/DescriptionList/DetailItem'
import { convertNumberMiles } from '@/shared/lib/utils/convertNumberMiles'
import { formatearTelefono } from '@/shared/lib/utils/formatearTelefono'
import { type DeviceDto } from '../../../domain/dto/Device.dto'
import { LinkAsButton } from '@/shared/ui/Button/LinkAsButton'
import { hierarchyLevelTranslations } from '@/entities/employee/unidad/infra/ui/hierarchyLevelTranslations'

export const EmployeeInformation = ({ employee }: { employee: DeviceDto['employee'] }) => {
	const employeeFullName = employee ? `${employee.name} ${employee.lastName}`.trim() : ''
	const cedula =
		employee?.cedula && employee?.nationality
			? `${employee.nationality}-${convertNumberMiles(employee.cedula)}`
			: ''
	const unidadOrganizativaChain = employee.unidad?.full_chain?.levels
		? employee.unidad.full_chain.levels
		: null
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
			{employee.unidad && (
				<DetailItem label="Unidad Específica" value={employee.unidad?.name} />
			)}
			{unidadOrganizativaChain &&
				unidadOrganizativaChain.length > 0 &&
				unidadOrganizativaChain.map((level, index) => {
					const levelNum = index + 1
					const levelName = hierarchyLevelTranslations[levelNum]
					const label = `Jerarquía Nivel ${levelNum}${levelName ? ` (${levelName})` : ''}`

					return <DetailItem key={`${level}-${index}`} label={label} value={level} />
				})}
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
