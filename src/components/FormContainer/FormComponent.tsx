import { Suspense } from 'react'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'
import { useFormStatus } from 'react-dom'
import Button from '../Button'
import { UpdatedBy } from '../UpdatedBy'
import { LastUpdated } from '../LastUpdated'
import { ResetIcon } from '@/icon/ResetIcon'
import { CancelIcon } from '@/icon/CancelIcon'
import { RightArrowIcon } from '@/icon/RightArrowIcon'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'

interface Props
	extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose: () => void
	reset?: () => void
	id: string
	border?: boolean
	method?: 'dialog' | 'form'
	lastUpdated?: string
	updatedBy?: HistoryDto[] | null
}

const borderStyle = 'flex flex-col gap-4 border border-gray-400 rounded-lg p-8 pt-4'

export function FormComponent({
	handleSubmit,
	handleClose,
	reset,
	id,
	method = 'form',
	border,
	updatedBy,
	lastUpdated,
	children,
	className,
	...props
}: Props) {
	const { pending } = useFormStatus()

	const classes = twMerge(
		'w-full bg-white flex justify-center',
		cn({
			[borderStyle]: border
		}),
		className
	)
	return (
		<form id={id} action="submit" onSubmit={handleSubmit} className={classes} {...props}>
			<fieldset className="w-full grid gap-5 relative">
				{children}
				<div className="flex flex-col mt-8 md:flex-row md:w-1/3 gap-5 justify-end justify-self-end">
					<Button
						color={method === 'form' ? 'green' : 'blue'}
						type="submit"
						form={id}
						text={pending ? 'Procesando...' : 'Guardar'}
						buttonSize="large"
						disabled={pending}
						hoverTranslation
						size="full"
						icon={
							pending ? (
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
						disabled={pending}
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
							disabled={pending}
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
					{updatedBy && updatedBy.length > 0 && <UpdatedBy history={updatedBy} />}
				</p>
			</fieldset>
		</form>
	)
}
