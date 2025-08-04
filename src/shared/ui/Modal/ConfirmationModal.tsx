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
	text: React.ReactNode
	strongText?: string
	handle?: () => void
	formId?: string
	handleClose: () => void
}

export function ConfirmationModal({
	text,
	strongText,
	handle,
	handleClose,
	formId
}: ConfirmationModalProps) {
	return (
		<>
			<div className="bg-azul rounded-t p-4 text-white">
				<Typography variant="p" color="white">
					Confirmación
				</Typography>
			</div>
			<div className="p-4">
				<Typography variant="p">
					{text}
					<strong>{strongText}</strong>
				</Typography>
				<div className="mt-6 flex justify-end gap-4">
					<Button
						form={formId}
						color="blue"
						type={!handle ? 'submit' : 'button'}
						onClick={handle}
						text="Si"
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
						text="No"
						buttonSize="large"
						size="content"
						onClick={handleClose}
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
