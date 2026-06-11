import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import { AuxiliarButton } from '@/shared/ui/Button/AuxiliarButton'
import { Icon } from '@/shared/ui/icon/Icon'
import Typography from '@/shared/ui/Typography'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'
import type { RefObject } from 'react'

export function ModalSummaryApprovedProcessors({
	rules,
	dialogRef
}: {
	rules: EvaluationHardwareDashboardResponse['migrationRule']
	dialogRef: RefObject<ModalRef | null>
}) {
	return (
		<Dialog ref={dialogRef}>
			<div className="max-w-md p-6">
				<div className="mb-4 flex items-center justify-between">
					<Typography variant="h3">Procesadores Autorizados</Typography>
					<AuxiliarButton
						variant="ghost"
						size="sm"
						onClick={() => dialogRef.current?.handleClose()}
					>
						<Icon name="x" className="h-4 w-4" />
					</AuxiliarButton>
				</div>
				<div className="custom-scrollbar max-h-60 overflow-y-auto rounded-lg border bg-gray-50 p-4">
					{rules?.approvedProcessor && rules.approvedProcessor.length > 0 ? (
						<ul className="grid grid-cols-1 gap-1">
							{rules.approvedProcessor
								.sort((a, b) => a.name.localeCompare(b.name))
								.map((cpu, index) => (
									<li
										key={index}
										className="flex items-center gap-2 text-xs text-gray-600"
									>
										<div className="h-1 w-1 rounded-full bg-blue-400" />
										{cpu.name}
									</li>
								))}
						</ul>
					) : (
						<Typography variant="p" className="text-center text-sm text-gray-400">
							No se han definido procesadores específicos.
						</Typography>
					)}
				</div>
				<div className="mt-6 flex justify-end">
					<AuxiliarButton onClick={() => dialogRef.current?.handleClose()}>
						Cerrar
					</AuxiliarButton>
				</div>
			</div>
		</Dialog>
	)
}
