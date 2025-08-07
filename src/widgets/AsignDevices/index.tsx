import { InfoBox } from '@/shared/ui/InfoBox/InfoBox'
import { InfoBoxText } from '@/shared/ui/InfoBox/InfoBoxText'
import { InfoBoxTitle } from '@/shared/ui/InfoBox/InfoBoxTitle'
import Typography from '@/shared/ui/Typography'
import { type EmployeeDto } from '@/entities/employee/employee/domain/dto/Employee.dto'

interface AsignDevicesProps {
	data: EmployeeDto | undefined
}

export const AsignDevices = ({ data }: AsignDevicesProps) => {
	return (
		<div>
			<div className="rounded-lg border border-gray-400 p-6 pt-4 sm:p-8 sm:pt-4">
				<div className="mb-4">
					<Typography color="azul" variant="h5">
						Información de dispositivos asignados
					</Typography>
					<Typography color="gris" option="small" variant="p">
						Para el usuario: <strong>{data?.userName}</strong>
					</Typography>
					<Typography color="gris" option="small" variant="p">
						Nombre completo:{' '}
						<strong>
							{data?.name} {data?.lastName}
						</strong>
					</Typography>
					<Typography color="gris" option="small" variant="p">
						Departamento: <strong>{data?.departamento?.name}</strong>
					</Typography>
				</div>

				{!data?.devices || data?.devices.length === 0 ? (
					<Typography color="gris" variant="p">
						No hay dispositivos asignados actualmente.
					</Typography>
				) : (
					<div className="flex flex-row flex-wrap gap-8">
						{data?.devices.map(
							({ id, category, brand, serial, model, location, computer }) => (
								<InfoBox key={id}>
									<InfoBoxTitle
										title={category.name}
										url={`/form/device/edit/${id}`}
									/>
									<InfoBoxText desc="Marca" text={brand.name} />
									<InfoBoxText desc="Model" text={model.name} />
									<InfoBoxText desc="Serial" text={serial ?? 'Sin serial'} />
									<InfoBoxText desc="Ubicación" text={location.name} />
									{computer && (
										<InfoBoxText
											desc="Dirección IP"
											text={computer.ipAddress ?? 'Sin IP'}
										/>
									)}
								</InfoBox>
							)
						)}
					</div>
				)}
			</div>
		</div>
	)
}
