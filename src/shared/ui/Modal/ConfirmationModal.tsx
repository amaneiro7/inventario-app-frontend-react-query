import React, { lazy, Suspense } from 'react'
import Typography from '../Typography'
import Button from '../Button'
const CheckIcon = lazy(async () =>
	import('@/shared/ui/icon/CheckIcon').then(m => ({ default: m.CheckIcon }))
)
const CancelIcon = lazy(async () =>
	import('@/shared/ui/icon/CancelIcon').then(m => ({ default: m.CancelIcon }))
)

interface ConfirmationModalProps {
	formId?: string
	title?: string
	description?: React.ReactNode
	confirmText?: string
	cancelText?: string
	handle?: () => void
	onConfirm?: () => Promise<void>
	onCancel: () => void
}

export function ConfirmationModal({
	onConfirm,
	onCancel,
	formId,
	title = 'Confirmación',
	description = '¿Estás seguro?',
	confirmText = 'Sí',
	cancelText = 'No'
}: ConfirmationModalProps) {
	return (
		<>
			<div className="bg-azul rounded-t p-4 text-white">
				<Typography variant="h3" color="white">
					{title}
				</Typography>
			</div>
			<div className="p-4">
				<Typography variant="p">{description}</Typography>
				<div className="mt-6 flex justify-end gap-4">
					<Button
						form={formId}
						color="blue"
						type={!onConfirm ? 'submit' : 'button'}
						onClick={onConfirm}
						text={confirmText}
						buttonSize="large"
						size="content"
						hoverTranslation
						icon={
							<Suspense
								fallback={
									<div className="h-6 w-6 animate-pulse rounded-full bg-slate-200" />
								}
							>
								<CheckIcon width={20} className="aspect-square stroke-3" />
							</Suspense>
						}
					/>
					<Button
						type="button"
						color="red"
						text={cancelText}
						buttonSize="large"
						size="content"
						onClick={onCancel}
						hoverTranslation
						icon={
							<Suspense
								fallback={
									<div className="h-6 w-6 animate-pulse rounded-full bg-slate-200" />
								}
							>
								<CancelIcon width={20} className="aspect-square" />
							</Suspense>
						}
					/>
				</div>
			</div>
		</>
	)
}
