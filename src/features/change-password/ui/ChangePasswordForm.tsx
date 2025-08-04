import { lazy, Suspense } from 'react'
import { UserPassword } from '@/entities/user/domain/value-objects/UserPassword'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type UserEmail } from '@/entities/user/domain/value-objects/UserEmail'
import { Input } from '@/shared/ui/Input/Input'
import { UnlockIcon } from '@/shared/ui/icon/UnlockIcon'
import { LockIcon } from '@/shared/ui/icon/LockIcon'
import Typography from '@/shared/ui/Typography'
import Button from '@/shared/ui/Button'
import { RightArrowIcon } from '@/shared/ui/icon/RightArrowIcon'
import { CancelIcon } from '@/shared/ui/icon/CancelIcon'
import { useChangePassword } from '@/features/change-password/model/useChangePassword'

const Modal = lazy(async () => import('@/shared/ui/Modal/Modal').then(m => ({ default: m.Dialog })))
const ConfirmationModal = lazy(async () =>
	import('@/shared/ui/Modal/ConfirmationModal').then(m => ({
		default: m.ConfirmationModal
	}))
)
interface ChangePassowrdFormProps {
	userEmail: Primitives<UserEmail>
}

export function ChangePassowrdForm({ userEmail }: ChangePassowrdFormProps) {
	const {
		dialogRef,
		errors,
		formData,
		formId,
		handleChange,
		handleClose,
		handleCloseModal,
		handleOpenModal,
		handleSubmit,
		handleToggleInputs,
		isDisabled,
		loading,
		toggleInputs
	} = useChangePassword()
	return (
		<>
			<form
				id={formId}
				className="grid gap-4 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2"
				method="post"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-4">
					<div className="hidden">
						<label htmlFor="email" className="sr-only">
							Correo Electrónico
						</label>
						<input
							type="text"
							id="email"
							autoComplete="email"
							name="email"
							defaultValue={userEmail}
						/>
					</div>

					<Input
						id="profile-current-password"
						label="Clave Actual"
						type={toggleInputs.password ? 'text' : 'password'}
						name="password"
						autoComplete="current-password"
						onChange={handleChange}
						value={formData.password}
						errorMessage={errors.password}
						error={errors.password ? true : false}
						required
						rightIcon={
							toggleInputs.password ? (
								<UnlockIcon className="aspect-square w-4 fill-black/60" />
							) : (
								<LockIcon className="aspect-square w-4 fill-black/60" />
							)
						}
						onRightIconClick={() => handleToggleInputs('password')}
					/>

					<Input
						id="profile-newPassword"
						label="Nueva Clave"
						type={toggleInputs.newPassword ? 'text' : 'password'}
						name="newPassword"
						autoComplete="new-password"
						onChange={handleChange}
						value={formData.newPassword}
						errorMessage={errors.newPassword}
						error={errors.newPassword ? true : false}
						required
						rightIcon={
							toggleInputs.newPassword ? (
								<UnlockIcon className="aspect-square w-4 fill-black/60" />
							) : (
								<LockIcon className="aspect-square w-4 fill-black/60" />
							)
						}
						onRightIconClick={() => handleToggleInputs('newPassword')}
					/>

					<Input
						id="profile-reTypePassword"
						label="Confirmación de Clave"
						type={toggleInputs.reTypePassword ? 'text' : 'password'}
						name="reTypePassword"
						autoComplete="new-password"
						onChange={handleChange}
						value={formData.reTypePassword}
						errorMessage={errors.reTypePassword}
						error={errors.reTypePassword ? true : false}
						required
						rightIcon={
							toggleInputs.reTypePassword ? (
								<UnlockIcon className="aspect-square w-4 fill-black/60" />
							) : (
								<LockIcon className="aspect-square w-4 fill-black/60" />
							)
						}
						onRightIconClick={() => handleToggleInputs('reTypePassword')}
					/>
				</div>
				<div className="rounded bg-gray-200 p-4 text-sm">
					<Typography>
						<strong>Nota:</strong> Su nueva clave debe cumplir las siguientes
						condiciones:
					</Typography>
					<ol className="ml-2">
						<li>1. Debe ser de mínimo {UserPassword.HAS_MIN_LENGTH} carácteres.</li>
						<li>
							2. Debe incluir caracteres alfabéticos (sensitivos a mayúsculas y
							minúsculas), numéricos y especiales.
						</li>
						<li>3. Los caracteres especiales válidos son ! . @ # $ % ^ & *</li>
					</ol>
				</div>
				<div />
				<div className="flex justify-center gap-4">
					<Button
						color="green"
						type="button"
						disabled={isDisabled || loading}
						onClick={handleOpenModal}
						size="content"
						text={loading ? 'Actualizando...' : 'Continuar'}
						hoverTranslation
						buttonSize="large"
						icon={<RightArrowIcon width={20} className="aspect-square fill-white" />}
					/>
					<Button
						type="button"
						color="gray"
						text="Reset"
						onClick={handleClose}
						size="content"
						hoverTranslation
						buttonSize="large"
						icon={<CancelIcon width={20} className="aspect-square" />}
					/>
				</div>
			</form>
			<Suspense>
				<Modal key="profilePageModal" ref={dialogRef}>
					<ConfirmationModal
						handleClose={handleCloseModal}
						formId={formId}
						text="¿Seguro que desea cambiar la contraseña?"
					/>
				</Modal>
			</Suspense>
		</>
	)
}
