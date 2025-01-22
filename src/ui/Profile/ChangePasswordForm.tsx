import { lazy, Suspense } from 'react'
import { UserPassword } from '@/core/user/domain/value-objects/UserPassword'
import {
	type Errors,
	type FormData,
	type ToggleInputs
} from '@/reducers/changePassword.reducers'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type UserEmail } from '@/core/user/domain/value-objects/UserEmail'

interface Props {
	formId?: string
	formData: FormData
	errors: Errors
	toggleInputs: ToggleInputs
	userEmail: Primitives<UserEmail>
	loading: boolean
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleSubmit: (event: React.FormEvent) => Promise<void>
	handleClose: () => void
	handleOpenModal: () => void
	handleToggleInputs: (
		name: 'password' | 'newPassword' | 'reTypePassword'
	) => void
	isDisabled: boolean
}
const Typography = lazy(async () => await import('@/components/Typography'))

const Input = lazy(async () =>
	import('@/components/Input/Input').then(m => ({ default: m.Input }))
)
const Button = lazy(async () => await import('@/components/Button/Button'))
const CancelIcon = lazy(() =>
	import('@/icon/CancelIcon').then(m => ({ default: m.CancelIcon }))
)
const RightArrowIcon = lazy(() =>
	import('@/icon/RightArrowIcon').then(m => ({ default: m.RightArrowIcon }))
)
const LockIcon = lazy(
	async () =>
		await import('@/icon/LockIcon').then(m => ({ default: m.LockIcon }))
)
const UnlockIcon = lazy(
	async () =>
		await import('@/icon/UnlockIcon').then(m => ({ default: m.UnlockIcon }))
)

export function ChangePassowrdForm({
	formData,
	errors,
	toggleInputs,
	formId,
	loading,
	userEmail,
	handleChange,
	handleSubmit,
	handleClose,
	handleOpenModal,
	handleToggleInputs,
	isDisabled
}: Props) {
	return (
		<form
			className="p-4 rounded-2xl shadow bg-white grid md:grid-cols-2 gap-4"
			method="post"
			id={formId}
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
					label="Clave Actual"
					type={toggleInputs.password ? 'text' : 'password'}
					name="password"
					autoComplete="current-password"
					onChange={handleChange}
					value={formData.password}
					errorMessage={errors.password}
					error={errors.password ? true : false}
					isRequired
					rightIcon={
						toggleInputs.password ? (
							<UnlockIcon className="w-4 fill-black/60 aspect-square" />
						) : (
							<LockIcon className="w-4 fill-black/60 aspect-square" />
						)
					}
					onRightIconClick={() => handleToggleInputs('password')}
				/>

				<Input
					label="Nueva Clave"
					type={toggleInputs.newPassword ? 'text' : 'password'}
					name="newPassword"
					autoComplete="new-password"
					onChange={handleChange}
					value={formData.newPassword}
					errorMessage={errors.newPassword}
					error={errors.newPassword ? true : false}
					isRequired
					rightIcon={
						toggleInputs.newPassword ? (
							<UnlockIcon className="w-4 fill-black/60 aspect-square" />
						) : (
							<LockIcon className="w-4 fill-black/60 aspect-square" />
						)
					}
					onRightIconClick={() => handleToggleInputs('newPassword')}
				/>

				<Input
					label="Confirmación de Clave"
					type={toggleInputs.reTypePassword ? 'text' : 'password'}
					name="reTypePassword"
					autoComplete="new-password"
					onChange={handleChange}
					value={formData.reTypePassword}
					errorMessage={errors.reTypePassword}
					error={errors.reTypePassword ? true : false}
					isRequired
					rightIcon={
						toggleInputs.reTypePassword ? (
							<UnlockIcon className="w-4 fill-black/60 aspect-square" />
						) : (
							<LockIcon className="w-4 fill-black/60 aspect-square" />
						)
					}
					onRightIconClick={() =>
						handleToggleInputs('reTypePassword')
					}
				/>
			</div>
			<div className="rounded text-sm bg-gray-200 p-4">
				<Typography>
					<strong>Nota:</strong> Su nueva clave debe cumplir las
					siguientes condiciones:
				</Typography>
				<ol className="ml-2">
					<li>
						1. Debe ser de mínimo {UserPassword.HAS_MIN_LENGTH}{' '}
						carácteres.
					</li>
					<li>
						2. Debe incluir caracteres alfabéticos (sensitivos a
						mayúsculas y minúsculas), numéricos y especiales.
					</li>
					<li>
						3. Los caracteres especiales válidos son ! . @ # $ % ^ &
						*
					</li>
				</ol>
			</div>
			<div />
			<div className="flex gap-4 justify-center">
				<Button
					color="green"
					type="button"
					disabled={isDisabled || loading}
					onClick={handleOpenModal}
					size="content"
					text={loading ? 'Actualizando...' : 'Continuar'}
					hoverTranslation
					buttonSize="large"
					icon={
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
					}
				/>
				<Button
					type="button"
					color="gray"
					text="Reset"
					onClick={handleClose}
					size="content"
					hoverTranslation
					buttonSize="large"
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
			</div>
		</form>
	)
}
