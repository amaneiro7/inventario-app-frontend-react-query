import { Suspense, use, useRef, type JSX } from 'react'
import { Seo } from '@/shared/ui/Seo'
import Button from '@/shared/ui/Button'
import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import { ConfirmationModal } from '@/shared/ui/Modal/ConfirmationModal'
import { LogoutIcon } from '@/shared/ui/icon/LogoutIcon'
import { AuthContext } from '@/app/providers/AuthContext'
import { Navigate } from 'react-router-dom'

/**
 * `NoPermissionsPage`
 * @returns {JSX.Element}
 * @description Página 403. Muestra estado de autenticación correcta pero sin autorización.
 */
const NoPermissionsPage = (): JSX.Element => {
	const dialogExitRef = useRef<ModalRef>(null)
	const {
		auth: { logout, user, isLogged, permissions }
	} = use(AuthContext)
	const handleOpen = () => dialogExitRef.current?.handleOpen()
	const handleClose = () => dialogExitRef.current?.handleClose()
	const handleLogout = async () => {
		handleClose()
		logout()
	}

	if (!isLogged) {
		return <Navigate to={'/login'} />
	}

	if (isLogged && permissions && permissions.length > 0) {
		return <Navigate to={'/'} />
	}

	// Preparar el asunto del correo dinámicamente
	const mailSubject = `Solicitud de Acceso - ${user?.userName || 'Usuario Nuevo'}`

	return (
		<>
			<Seo
				title="403 - Acceso Denegado"
				description="No tienes permisos para ver este contenido."
			/>
			<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-indigo-600">403</p>

					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Acceso Denegado
					</h1>
					<div className="mt-6 text-base leading-7 text-gray-600">
						<p>
							Tu cuenta ha sido creada, pero aún no tienes{' '}
							<strong>roles ni permisos</strong> asignados en el sistema.
						</p>
						{user?.userName && (
							<p className="mt-2 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-500">
								Logueado como:{' '}
								<span className="font-medium text-gray-900">{user.userName}</span>
							</p>
						)}
					</div>
					<p className="mt-6 text-sm text-gray-500">
						Si crees que esto es un error o necesitas acceso inmediato,
						<br />
						por favor contacta a tu supervisor o al administrador de TI.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Button
							aria-label="Botón para cerrar sesión del usuario"
							buttonSize="medium"
							color="blue"
							size="content"
							type="button"
							text="Cerrar Sesión"
							onClick={handleOpen}
							icon={<LogoutIcon width={20} className="aspect-square" aria-hidden />}
						/>
						<a
							href={`mailto:soporte@tuempresa.com?subject=${encodeURIComponent(mailSubject)}`}
							className="text-sm font-semibold text-gray-900 transition-colors hover:text-indigo-600"
						>
							Contactar soporte <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</div>
			</main>
			<Suspense>
				<Dialog ref={dialogExitRef}>
					<ConfirmationModal
						onCancel={handleClose}
						onConfirm={handleLogout}
						description={
							<>¿Está seguro que desea {<strong>Cerrar la Sesión</strong>}?</>
						}
					/>
				</Dialog>
			</Suspense>
		</>
	)
}

export default NoPermissionsPage
