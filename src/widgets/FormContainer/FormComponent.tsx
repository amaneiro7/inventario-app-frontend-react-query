import { memo } from 'react'
import { useFormStatus } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import cn from 'classnames'
import Button from '@/shared/ui/Button'
import { UpdatedBy } from '@/shared/ui/UpdatedBy'
import { LastUpdated } from '@/shared/ui/LastUpdated'
import { ResetIcon } from '@/shared/ui/icon/ResetIcon'
import { CancelIcon } from '@/shared/ui/icon/CancelIcon'
import { RightArrowIcon } from '@/shared/ui/icon/RightArrowIcon'
import { CircleSpinningIcon } from '@/shared/ui/icon/CircleSpinning'
import { FormSkeleton } from './FormSkeleton'
import { NotFoundState } from './NotFoundState'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'
//import { FormErrorState } from './FormErrorState'

interface FormComponentProps
	extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose?: () => void
	reset?: () => void
	onRetry?: () => void
	id: string
	border?: boolean
	method?: 'dialog' | 'form'
	lastUpdated?: string
	updatedBy?: HistoryDto[] | null
	isLoading?: boolean
	isError?: boolean
	isNotFound?: boolean
}

const borderStyle = 'flex flex-col gap-4 border border-gray-400 rounded-lg p-8 pt-4'

export const FormComponent = memo(
	({
		handleSubmit,
		handleClose,
		reset,
		onRetry,
		id,
		method = 'form',
		border,
		updatedBy,
		lastUpdated,
		children,
		className,
		isLoading,
		isError,
		isNotFound,
		...props
	}: FormComponentProps) => {
		const status = useFormStatus()
		const navigate = useNavigate()

		if (isNotFound) return <NotFoundState />
		//if (isError) return <FormErrorState onRetry={onRetry} />

		const classes = twMerge(
			'w-full bg-white flex justify-center',
			cn({
				[borderStyle]: border
			}),
			className
		)

		// Manejador para el botón de cerrar/regresar
		const handleCloseClick = () => {
			// Si se proporciona una función handleClose personalizada, se usa.
			if (handleClose) {
				handleClose()
			} else {
				// De lo contrario, se usa la navegación por defecto para ir hacia atrás.
				navigate(-1)
			}
		}

		return (
			<form id={id} action="submit" onSubmit={handleSubmit} className={classes} {...props}>
				<fieldset className="relative grid min-h-64 w-full gap-5">
					{isLoading ? <FormSkeleton /> : children}
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
									<RightArrowIcon
										width={20}
										className="aspect-square fill-white"
									/>
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
							onClick={handleCloseClick} // Se llama directamente a la nueva función
							disabled={status.pending}
							hoverTranslation
							icon={<CancelIcon width={20} className="aspect-square" />}
						/>
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
)

FormComponent.displayName = 'FormComponent'
