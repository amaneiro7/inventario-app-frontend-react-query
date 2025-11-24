import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/shared/lib/utils'
import Button from '@/shared/ui/Button'
import { ResetIcon } from '@/shared/ui/icon/ResetIcon'
import { CancelIcon } from '@/shared/ui/icon/CancelIcon'
import { RightArrowIcon } from '@/shared/ui/icon/RightArrowIcon'
import { CircleSpinningIcon } from '@/shared/ui/icon/CircleSpinning'
import { FormSkeleton } from './FormSkeleton'
import { FormFooter } from './FormFooter'
import { type HistoryDto } from '@/entities/history/domain/dto/History.dto'

import { NotFoundState } from './NotFoundState'
import { FormErrorState } from './FormErrorState'

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
	isSubmitting?: boolean
	isDirty?: boolean
	isReadOnly?: boolean
	title?: string
	subtitle?: string
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
		isSubmitting = false,
		isDirty = false,
		isReadOnly = true,
		title,
		subtitle,
		...props
	}: FormComponentProps) => {
		const navigate = useNavigate()

		if (isNotFound) return <NotFoundState />
		if (isError) return <FormErrorState onRetry={onRetry} />

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

		// 💡 Lógica de deshabilitación del botón de Guardar
		// El botón está deshabilitado si:
		// 1. Está en proceso de envío (isSubmitting)
		// 2. El formulario no ha cambiado (!isDirty)
		// 3. Está cargando datos iniciales (isLoading)
		// 4. Hay un error irrecuperable (isError)
		// 5. El usuario NO TIENE PERMISO para editar (isReadOnly)
		const isSubmitDisabled = isSubmitting || !isDirty || isLoading || isError || isReadOnly

		return (
			<form
				id={id}
				action="submit"
				onSubmit={handleSubmit}
				className={cn(
					'flex w-full justify-center bg-white',
					{
						[borderStyle]: border
					},
					className
				)}
				{...props}
			>
				{/* 💡 RENDERIZAR TÍTULO Y SUBTÍTULO */}
				{(title || subtitle) && (
					<header className="mb-4">
						{title && <h2 className="text-2xl font-bold">{title}</h2>}
						{subtitle && <p className="text-gray-600">{subtitle}</p>}
					</header>
				)}
				<fieldset className="relative grid min-h-64 w-full gap-5">
					{isLoading ? <FormSkeleton /> : children}
					<div className="mt-8 flex flex-col justify-end gap-5 justify-self-end md:w-1/3 md:flex-row">
						<Button
							color={method === 'form' ? 'green' : 'blue'}
							type="submit"
							form={id}
							text={
								isReadOnly
									? 'Ver Datos'
									: isSubmitting
										? 'Procesando...'
										: 'Guardar'
							}
							buttonSize="large"
							disabled={isSubmitDisabled}
							hoverTranslation
							size="full"
							icon={
								isSubmitting ? (
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
							onClick={handleCloseClick}
							disabled={isSubmitting}
							hoverTranslation
							icon={<CancelIcon width={20} className="aspect-square" />}
						/>
						{reset && !isReadOnly && (
							<Button
								type="button"
								color="blue"
								size="content"
								buttonSize="large"
								text="Reset"
								onClick={reset}
								disabled={isSubmitting}
								icon={<ResetIcon width={20} className="aspect-square" />}
							/>
						)}
					</div>
					<FormFooter lastUpdated={lastUpdated} updatedBy={updatedBy} />
				</fieldset>
			</form>
		)
	}
)

FormComponent.displayName = 'FormComponent'
