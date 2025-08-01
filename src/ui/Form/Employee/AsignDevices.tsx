import { InfoBox } from '@/shared/ui/InfoBox/InfoBox'
import { InfoBoxText } from '@/shared/ui/InfoBox/InfoBoxText'
import { InfoBoxTitle } from '@/shared/ui/InfoBox/InfoBoxTitle'
import Typography from '@/shared/ui/Typography'
import { type DefaultEmployee } from '@/entities/employee/employee/infra/reducers/employeeFormReducer'

export const AsignDevices = ({ devices }: { devices: DefaultEmployee['devices'] }) => {
	if (!devices || devices.length === 0) {
		return (
			<div className="rounded-lg border border-gray-400 p-6 pt-4 sm:p-8 sm:pt-4">
				<Typography color="azul" variant="h5">
					Información de dispositivos asignados
				</Typography>
				<Typography color="gris" variant="p">
					Este usuario no tiene dispositivos asignados
				</Typography>
			</div>
		)
	}
	return (
		<div className="rounded-lg border border-gray-400 p-6 pt-4 sm:p-8 sm:pt-4">
			<div className="mb-4">
				<Typography color="azul" variant="h5">
					Información de dispositivos asignados
				</Typography>
				<Typography color="gris" variant="p">
					Este usuario tiene los siguientes dispositivos asignados:
				</Typography>
			</div>
			<div className="flex flex-row flex-wrap gap-8">
				{devices.map(({ id, category, brand, serial, model, location, computer }) => (
					<InfoBox key={id}>
						<InfoBoxTitle title={category.name} url={`/form/device/edit/${id}`} />
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
				))}
			</div>
		</div>
	)
}
