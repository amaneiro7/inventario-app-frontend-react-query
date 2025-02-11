import { lazy, Suspense } from 'react'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'

interface Props
	extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose: () => void
	reset?: () => void
	id: string
	key: string
	isDisabled: boolean
	method?: 'dialog' | 'form'
	lastUpdated?: string
	updatedBy?: HistoryDto[]
}

const Button = lazy(async () => await import('@/components/Button'))
const LastUpdated = lazy(async () =>
	import('@/components/LastUpdated').then(m => ({ default: m.LastUpdated }))
)
const UpdatedBy = lazy(async () =>
	import('@/components/UpdatedBy').then(m => ({ default: m.UpdatedBy }))
)
const CancelIcon = lazy(() => import('@/icon/CancelIcon').then(m => ({ default: m.CancelIcon })))
const RightArrowIcon = lazy(() =>
	import('@/icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon }))
)
const ResetIcon = lazy(() => import('@/icon/ResetIcon').then(m => ({ default: m.ResetIcon })))
const CircleSpinningIcon = lazy(() =>
	import('@/icon/CircleSpinning').then(m => ({
		default: m.CircleSpinningIcon
	}))
)

export function FormComponent({
	handleSubmit,
	handleClose,
	reset,
	id,
	key,
	method = 'form',
	isDisabled,
	updatedBy,
	lastUpdated,
	children,
	...props
}: Props) {
	return (
		<form
			key={key}
			id={id}
			action="submit"
			onSubmit={handleSubmit}
			className="w-full bg-white flex justify-center border border-gray-400 rounded-lg p-8"
			{...props}
		>
			<fieldset className="w-full grid gap-5 relative">
				{children}
				<div className="flex flex-col mt-8 md:flex-row md:w-1/3 gap-5 justify-end justify-self-end">
					<Button
						color={method === 'form' ? 'green' : 'blue'}
						type="submit"
						text={isDisabled ? 'Procesando...' : 'Guardar'}
						buttonSize="large"
						disabled={isDisabled}
						hoverTranslation
						size="full"
						icon={
							isDisabled ? (
								<Suspense
									fallback={
										<div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse" />
									}
								>
									<CircleSpinningIcon width={20} />
								</Suspense>
							) : (
								<Suspense
									fallback={
										<div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse" />
									}
								>
									<RightArrowIcon
										width={20}
										className="aspect-square fill-white"
									/>
								</Suspense>
							)
						}
					/>
					<Button
						form={id}
						type="button"
						color={method === 'form' ? 'gray' : 'red'}
						size="full"
						buttonSize="large"
						text="Regresar"
						onClick={handleClose}
						disabled={isDisabled}
						hoverTranslation
						icon={
							<Suspense
								fallback={
									<div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse" />
								}
							>
								<CancelIcon width={20} className="aspect-square" />
							</Suspense>
						}
					/>
					{/* Boton pare restablecer el formulario, solo si es en editar */}
					{reset ? (
						<Button
							type="button"
							color="blue"
							size="content"
							buttonSize="large"
							text="Reset"
							onClick={reset}
							disabled={isDisabled}
							icon={
								<Suspense
									fallback={
										<div className="w-6 h-6 rounded-full bg-slate-200 animate-pulse" />
									}
								>
									<ResetIcon width={20} className="aspect-square" />
								</Suspense>
							}
						/>
					) : null}
				</div>
				<p className="justify-self-end text-sm text-black/80">
					{lastUpdated !== undefined && <LastUpdated updatedAt={lastUpdated} />}
					{updatedBy !== undefined && updatedBy.length > 0 && (
						<UpdatedBy history={updatedBy} />
					)}
				</p>
			</fieldset>
		</form>
	)
}
