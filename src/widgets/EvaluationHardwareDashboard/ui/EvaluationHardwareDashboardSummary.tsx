import { lazy, Suspense, useRef } from 'react'
import { formatDateTime } from '@/shared/lib/utils/formatDate'
import { BasicStatCard } from '@/shared/ui/BasicStatCard'
import { CountUpComponent } from '@/shared/ui/CountUpComponent'
import { Icon } from '@/shared/ui/icon/Icon'
import Button from '@/shared/ui/Button'
import Typography from '@/shared/ui/Typography'
import type { EvaluationHardwareDashboardResponse } from '@/entities/devices/deviceEvaluation/domain/dto/EvaluationHardwareDashboard.dto'
import type { ModalRef } from '@/shared/ui/Modal/Modal'
import { LinkAsButton } from '@/shared/ui/Button/LinkAsButton'

const ModalSummaryApprovedProcessors = lazy(() =>
	import('./ModalSummaryApprovedProcessors').then(m => ({
		default: m.ModalSummaryApprovedProcessors
	}))
)

export function EvaluationHardwareDashboardSummary({
	summary,
	rules,
	isLoading = false,
	dataUpdatedAt,
	isFetching,
	isError = false,
	error
}: {
	summary?: EvaluationHardwareDashboardResponse['summary']
	rules?: EvaluationHardwareDashboardResponse['migrationRule']
	isLoading?: boolean
	dataUpdatedAt: number
	isFetching: boolean
	isError: boolean
	error: Error | null
}) {
	const dialogRef = useRef<ModalRef>(null)
	// Si hay un error, mostramos un estado de error dentro de las tarjetas para no romper la UI.
	if (isError) {
		return (
			<section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<BasicStatCard
					title="Error"
					icon={<Icon name="alertTriangle" className="h-4 w-4 text-red-500" />}
					value="Fallo"
					desc={error?.message ?? 'No se pudieron cargar los datos.'}
					error
				/>
				<BasicStatCard title="Equipos Aptos" value="-" error />
				<BasicStatCard title="Equipos No Aptos" value="-" error />
				<BasicStatCard title="Última Actualización" value="-" error />
			</section>
		)
	}

	const total = summary?.total ?? 0
	const apto = summary?.apto ?? 0
	const noApto = summary?.noApto ?? 0

	const ramOk = summary?.isRamOk ?? 0
	const diskOk = summary?.isDiskOk ?? 0
	const cpuOk = summary?.isProcessorOk ?? 0

	const ramNotOk = total - ramOk
	const diskNotOk = total - diskOk
	const cpuNotOk = total - cpuOk

	const totalAptoPercentage = total > 0 ? ((apto / total) * 100).toFixed(0) : '0'
	const totalNoAptoPercentage = total > 0 ? ((noApto / total) * 100).toFixed(0) : '0'

	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
				<section className="flex flex-col gap-4" aria-label="Resumen General">
					<BasicStatCard
						title="Dispositivos Totales"
						className="min-h-27.5 border-slate-100"
						icon={
							<Icon
								name="monitor"
								className="h-4 w-4 text-gray-600"
								aria-hidden="true"
							/>
						}
						value={<CountUpComponent end={total} duration={1.5} separator="." />}
						desc="Base total de inventario evaluado."
						loading={isLoading}
					/>
					<BasicStatCard
						title="Aptitud General: OK"
						className="min-h-27.5"
						icon={
							<Icon
								name="checkCircle2"
								className="h-4 w-4 text-green-600"
								aria-hidden="true"
							/>
						}
						value={<CountUpComponent end={apto} duration={1.5} separator="." />}
						desc={`${totalAptoPercentage}% del total cumple los requisitos.`}
						loading={isLoading}
					/>
					<BasicStatCard
						title="Aptitud General: No Apto"
						className="min-h-27.5"
						icon={
							<Icon
								name="xCircle"
								className="h-4 w-4 text-red-600"
								aria-hidden="true"
							/>
						}
						value={<CountUpComponent end={noApto} duration={1.5} separator="." />}
						desc={`${totalNoAptoPercentage}% requiere atención técnica.`}
						loading={isLoading}
					/>
				</section>

				<section
					className="flex flex-col gap-4 md:col-span-1 lg:col-span-2"
					aria-label="Desglose por Componentes"
				>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<BasicStatCard
							title="RAM: Aptos"
							className="min-h-27.5 border-emerald-100 bg-emerald-50"
							icon={
								<Icon
									name="cpu"
									className="h-3.5 w-3.5 text-emerald-600 opacity-70"
								/>
							}
							value={<CountUpComponent end={ramOk} duration={1.2} />}
							desc={`Superan los ${rules?.minRamGb ?? '-'}GB.`}
							loading={isLoading}
						/>
						<BasicStatCard
							title="RAM: Insuficiente"
							className="min-h-27.5 border-rose-100 bg-rose-50"
							icon={
								<Icon name="cpu" className="h-3.5 w-3.5 text-rose-600 opacity-70" />
							}
							value={<CountUpComponent end={ramNotOk} duration={1.2} />}
							desc="Equipos con memoria limitada."
							loading={isLoading}
						/>
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<BasicStatCard
							title="Disco: Suficiente"
							className="min-h-27.5 border-emerald-100 bg-emerald-50"
							icon={
								<Icon
									name="database"
									className="h-3.5 w-3.5 text-emerald-600 opacity-70"
								/>
							}
							value={<CountUpComponent end={diskOk} duration={1.2} />}
							desc={`Espacio > ${rules?.minDiskGb ?? '-'}GB.`}
							loading={isLoading}
						/>
						<BasicStatCard
							title="Disco: Crítico"
							className="min-h-27.5 border-rose-100 bg-rose-50"
							icon={
								<Icon
									name="database"
									className="h-3.5 w-3.5 text-rose-600 opacity-70"
								/>
							}
							value={<CountUpComponent end={diskNotOk} duration={1.2} />}
							desc="Capacidad insuficiente detectada."
							loading={isLoading}
						/>
					</div>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<BasicStatCard
							title="Procesador: Soportado"
							className="min-h-27.5 border-emerald-100 bg-emerald-50"
							icon={
								<Icon
									name="microchip"
									className="h-3.5 w-3.5 text-emerald-600 opacity-70"
								/>
							}
							value={<CountUpComponent end={cpuOk} duration={1.2} />}
							desc="Modelos autorizados por reglas."
							loading={isLoading}
						/>
						<BasicStatCard
							title="Procesador: No Apto"
							className="min-h-27.5 border-rose-100 bg-rose-50"
							icon={
								<Icon
									name="microchip"
									className="h-3.5 w-3.5 text-rose-600 opacity-70"
								/>
							}
							value={<CountUpComponent end={cpuNotOk} duration={1.2} />}
							desc="No aptos para la migración."
							loading={isLoading}
						/>
					</div>
				</section>
				<section className="flex flex-col gap-4" aria-label="Configuración y Estado">
					<BasicStatCard
						title="Sincronización"
						className="min-h-27.5 border-blue-100 bg-blue-50"
						icon={
							<Icon
								name="activity"
								className="h-4 w-4 text-blue-500"
								aria-hidden="true"
							/>
						}
						value={dataUpdatedAt ? formatDateTime(dataUpdatedAt) : 'N/A'}
						desc={isFetching ? 'Refrescando...' : 'Información actualizada.'}
						loading={isLoading}
					/>
					{/* Sección de Reglas de Evaluación */}
					<div className="flex flex-1 flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md">
						<Typography
							variant="h4"
							className="text-[10px] font-bold tracking-widest text-slate-500 uppercase"
						>
							Reglas Activas (W10/11)
						</Typography>
						<div className="mt-3 space-y-2">
							<div className="flex items-center justify-between text-sm">
								<span className="text-slate-500">RAM Mínima</span>
								<span className="font-semibold text-slate-900">
									{rules?.minRamGb} GB
								</span>
							</div>
							<div className="flex items-center justify-between text-sm">
								<span className="text-slate-500">Disco Mínimo</span>
								<span className="font-semibold text-slate-900">
									{rules?.minDiskGb} GB
								</span>
							</div>
						</div>
						<div className="mt-4 flex flex-col gap-2">
							<Button
								buttonSize="small"
								color="blanco"
								size="full"
								text="Lista de CPUs"
								onClick={() => dialogRef.current?.handleOpen()}
							/>
							<LinkAsButton
								buttonSize="small"
								color="blue"
								size="full"
								text="Editar Reglas"
								to={`/form/migration-rules/edit/${rules?.id}`}
							/>
						</div>
					</div>
				</section>
			</div>
			<Suspense fallback={null}>
				<ModalSummaryApprovedProcessors dialogRef={dialogRef} rules={rules} />
			</Suspense>
		</div>
	)
}
