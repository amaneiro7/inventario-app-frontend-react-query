import { lazy, memo, Suspense, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '@/app/providers/AuthContext'
import { RoleOptions } from '@/entities/role/domain/entity/RoleOptions'
import { Dialog, type ModalRef } from '@/shared/ui/Modal/Modal'
import Logo from '@/shared/ui/Logo/Logo'
import { WelcomeTitle } from './WelcomeTitle'
import Button from '@/shared/ui/Button'
import { HamburgerMenu } from './HamburgerMenu'
import { ConfirmationModal } from '@/shared/ui/Modal/ConfirmationModal'
import { LogoutIcon } from '@/shared/ui/icon/LogoutIcon'

const WrapperBox = lazy(() => import('./WrapperBox').then(m => ({ default: m.WrapperBox })))
const Nav = lazy(() => import('./Nav').then(m => ({ default: m.Nav })))

export const Header = memo(() => {
	const location = useLocation()
	const dialogExitRef = useRef<ModalRef>(null)

	const handleOpen = () => dialogExitRef.current?.handleOpen()
	const handleClose = () => dialogExitRef.current?.handleClose()
	const handleLogout = async () => {
		logout()
		handleClose()
	}

	const {
		auth: { logout, user }
	} = useContext(AuthContext)

	return (
		<>
			<header className="bg-azul z-50 flex h-16 min-h-16 w-full items-center justify-between gap-4 overflow-visible py-4 pr-4 shadow-lg md:sticky md:top-0 md:border-none md:text-sm">
				<div className="rounded-e-full bg-white p-1 pr-4 pl-8">
					<Logo />
				</div>

				<WelcomeTitle user={user} />

				<div className="flex flex-1 items-center justify-end gap-8">
					{(user?.roleId === RoleOptions.COORDINADOR ||
						user?.roleId === RoleOptions.ADMIN) && (
						<Link
							to="/user-management"
							className="hover:text-orange hover:border-orange border-b p-1 text-xs font-medium text-white transition-colors duration-200 md:text-sm lg:text-base"
						>
							Gestión de Usuarios
						</Link>
					)}

					{user?.roleId === RoleOptions.ADMIN && (
						<Link
							to="/settings"
							className="hover:text-orange hover:border-orange border-b p-1 text-xs font-medium text-white transition-colors duration-200 md:text-sm lg:text-base"
						>
							Configuración
						</Link>
					)}

					{user?.roleId !== RoleOptions.ADMIN && (
						<Link
							to="/profile"
							className="hover:text-orange hover:border-orange border-b p-1 text-xs font-medium text-white transition-colors duration-200 md:text-sm lg:text-base"
						>
							Perfil
						</Link>
					)}

					<Button
						aria-label="Botón para cerrar sesión del usuario"
						color="orange"
						size="content"
						text="Salir"
						onClick={handleOpen}
						type="button"
						buttonSize="medium"
						icon={<LogoutIcon width={20} className="aspect-square" aria-hidden />}
					/>
				</div>
				<div className="hamburger-wrapper">
					<HamburgerMenu key={location.key} />
					<Suspense>
						<WrapperBox />
						<Nav />
					</Suspense>
				</div>
			</header>
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
})
