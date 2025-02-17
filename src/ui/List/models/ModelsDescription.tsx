import { ModelDto } from '@/core/model/models/domain/dto/Model.dto'
import { lazy } from 'react'

interface Props {
	open: boolean
	model: ModelDto
}

const TableCellDescInfo = lazy(async () =>
	import('@/components/Table/TableCellDescInfo').then(m => ({
		default: m.TableCellDescInfo
	}))
)
const TableCellDescription = lazy(async () =>
	import('@/components/Table/TableCellDescription').then(m => ({
		default: m.TableCellDescription
	}))
)
const TableDescDivider = lazy(async () =>
	import('@/components/Table/TableDescDivider').then(m => ({
		default: m.TableDescDivider
	}))
)

export function ModelDescription({ open, model }: Props) {
	return (
		<>
			<TableCellDescription
				open={open}
				state={model}
				stateId={model.id}
				url={`/model/edit/${model.id}`}
				colspan={5}
			>
				{model?.modelComputer && (
					<TableDescDivider label="Información de computadoras">
						<TableCellDescInfo
							title="Tipo de Memoria Ram"
							text={`${model?.modelComputer?.memoryRamType?.name ?? ''}`}
						/>

						<TableCellDescInfo
							title="Cantidad de ranuras"
							text={`${model?.modelComputer?.memoryRamSlotQuantity ?? ''}`}
						/>
						<TableCellDescInfo
							title="Puerto VGA"
							text={model?.modelComputer?.hasVGA ? 'Si' : 'No'}
						/>
						<TableCellDescInfo
							title="Puerto DVI"
							text={model?.modelComputer?.hasDVI ? 'Si' : 'No'}
						/>
						<TableCellDescInfo
							title="Puerto HDMI"
							text={model?.modelComputer?.hasHDMI ? 'Si' : 'No'}
						/>
						<TableCellDescInfo
							title="Adaptador Bluetooth"
							text={model?.modelComputer?.hasBluetooth ? 'Si' : 'No'}
						/>
						<TableCellDescInfo
							title="Adaptador Wifi"
							text={model?.modelComputer?.hasWifiAdapter ? 'Si' : 'No'}
						/>
						{model?.modelLaptop && (
							<TableCellDescInfo
								title="Modelo de bateria"
								text={model?.modelLaptop?.batteryModel ?? ''}
							/>
						)}
					</TableDescDivider>
				)}

				{/* <TableDescDivider label="Información de ubicación">
					<TableCellDescInfo
						title="Región"
						text={`${model?.location?.site.city.state.region.name ?? ''}`}
					/>
					<TableCellDescInfo
						title="Estado"
						text={`${model?.location?.site.city.state.name ?? ''}`}
					/>
					<TableCellDescInfo
						title="Ciudad"
						text={`${model?.location?.site.city.name ?? ''}`}
					/>
				</TableDescDivider>

				<TableDescDivider label="Información de pantalla">
					<TableCellDescInfo
						title="Tamaño de Pantalla"
						text={
							model?.model?.modelMonitor
								? `${model?.model?.modelMonitor?.screenSize}'`
								: ''
						}
					/>
					<TableCellDescInfo
						title="Puerto VGA"
						text={model?.model?.modelMonitor?.hasVGA ? 'Si' : 'No'}
					/>
					<TableCellDescInfo
						title="Puerto DVI"
						text={model?.model?.modelMonitor?.hasDVI ? 'Si' : 'No'}
					/>
					<TableCellDescInfo
						title="Puerto HDMI"
						text={model?.model?.modelMonitor?.hasHDMI ? 'Si' : 'No'}
					/>
				</TableDescDivider> */}

				<TableCellDescInfo
					title="Última Actualización"
					text={model.updatedAt ? new Date(model.updatedAt).toLocaleDateString() : ''}
				/>
			</TableCellDescription>
		</>
	)
}
