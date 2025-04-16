import { useFormStatus } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'
import Button from '../Button'
import { UpdatedBy } from '../UpdatedBy'
import { LastUpdated } from '../LastUpdated'
import { ResetIcon } from '@/icon/ResetIcon'
import { CancelIcon } from '@/icon/CancelIcon'
import { RightArrowIcon } from '@/icon/RightArrowIcon'
import { CircleSpinningIcon } from '@/icon/CircleSpinning'
import { type HistoryDto } from '@/core/history/domain/dto/History.dto'

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
	const status = useFormStatus()

	const classes = twMerge(
		'w-full bg-white flex justify-center',
		cn({
			[borderStyle]: border
		}),
		className
	)

	return (
		<form id={id} action="submit" onSubmit={handleSubmit} className={classes} {...props}>
			<fieldset className="relative grid min-h-64 w-full gap-5">
				{children}
				<div className="mt-8 flex flex-col justify-end gap-5 justify-self-end md:w-1/3 md:flex-row">
					<Button
						color={method === 'form' ? 'green' : 'blue'}
						type="submit"
						form={id}
						text={status.pending ? 'Procesando...' : 'Guardar'}
						buttonSize="large"
						disabled={status.pending}
						hoverTranslation
						size="full"
						icon={
							status.pending ? (
								<CircleSpinningIcon width={20} />
							) : (
								<RightArrowIcon width={20} className="aspect-square fill-white" />
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
						disabled={status.pending}
						hoverTranslation
						icon={<CancelIcon width={20} className="aspect-square" />}
					/>
					{/* Boton pare restablecer el formulario, solo si es en editar */}
					{reset && (
						<Button
							type="button"
							color="blue"
							size="content"
							buttonSize="large"
							text="Reset"
							onClick={reset}
							disabled={status.pending}
							icon={<ResetIcon width={20} className="aspect-square" />}
						/>
					)}
				</div>
				<p className="justify-self-end text-sm text-black/80">
					{lastUpdated !== undefined && <LastUpdated updatedAt={lastUpdated} />}
					{updatedBy && updatedBy.length > 0 && <UpdatedBy history={updatedBy} />}
				</p>
			</fieldset>
		</form>
	)
}
