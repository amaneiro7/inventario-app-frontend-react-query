import { memo } from 'react'
import { TableCellDescInfo } from '@/shared/ui/Table/TableCellDescInfo'
import { TableCellDescription } from '@/shared/ui/Table/TableCellDescription'
import { type ModelDto } from '@/entities/model/models/domain/dto/Model.dto'
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime'

interface ModelDescriptionProps {
	/**
	 * Controls the visibility of the description.
	 */
	open: boolean
	/**
	 * The model data to display.
	 */
	model: ModelDto
	/**
	 * The number of columns the description should span in the table.
	 */
	colSpan: number
	/**
	 * An array of column names that are currently visible in the table.
	 * Used to conditionally hide redundant information in the description.
	 */
	visibleColumns: string[]
}

/**
 * `ModelDescription` is a memoized component that displays detailed information about a model.
 * It is typically used within a table row to show additional details when expanded, including
 * computer-specific, keyboard-specific, monitor-specific, and printer-specific features.
 */
export const ModelDescription = memo(
	({ open, model, colSpan, visibleColumns }: ModelDescriptionProps) => {
		return (
			<>
				<TableCellDescription
					open={open}
					state={model}
					stateId={model.id}
					url={`/form/model/edit/${model.id}`}
					colspan={colSpan}
				>
					{!visibleColumns.includes('generic') && (
						<TableCellDescInfo title="Genérico" text={model?.generic ? 'Si' : 'No'} />
					)}
					{model?.modelComputer && (
						<>
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
						</>
					)}

					{model?.modelKeyboard && (
						<>
							<TableCellDescInfo
								title="Tipo de entrada"
								text={`${model?.modelKeyboard?.inputType.name ?? ''}`}
							/>
							<TableCellDescInfo
								title="Lector de huella"
								text={`${model?.modelKeyboard?.hasFingerPrintReader ? 'Si' : 'No'}`}
							/>
						</>
					)}
					{model?.modelMonitor && (
						<>
							<TableCellDescInfo
								title="Tamaño"
								text={`${model?.modelMonitor?.screenSize ?? ''}"`}
							/>
							<TableCellDescInfo
								title="Puerto VGA"
								text={`${model?.modelMonitor?.hasVGA ? 'Si' : 'No'}`}
							/>
							<TableCellDescInfo
								title="Puerto HDMI"
								text={`${model?.modelMonitor?.hasHDMI ? 'Si' : 'No'}`}
							/>
							<TableCellDescInfo
								title="Puerto DVI"
								text={`${model?.modelMonitor?.hasDVI ? 'Si' : 'No'}`}
							/>
						</>
					)}
					{model?.modelPrinter && (
						<>
							<TableCellDescInfo
								title="Modelo del cartucho"
								text={`${model?.modelPrinter?.cartridgeModel ?? ''}"`}
							/>
						</>
					)}

					<TableCellDescInfo
						title="Última Actualización"
						text={
							model.updatedAt
								? `${new Date(
										model.updatedAt
									).toLocaleDateString()} (${getRelativeTime(model.updatedAt)})`
								: 'Sin Actualización'
						}
					/>
				</TableCellDescription>
			</>
		)
	}
)

ModelDescription.displayName = 'ModelDescription'