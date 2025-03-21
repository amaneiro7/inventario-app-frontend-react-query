import { lazy, memo, Suspense, useContext, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '@/context/Auth/AuthContext'
import { RoleOptions } from '@/core/role/domain/entity/RoleOptions'
import { type ModalRef } from '@/components/Modal/Modal'

const LogoutIcon = lazy(() => import('@/icon/LogoutIcon').then(m => ({ default: m.LogoutIcon })))
const Nav = lazy(async () => import('./Nav').then(m => ({ default: m.Nav })))
const WelcomeTitle = lazy(async () =>
	import('./WelcomeTitle').then(m => ({ default: m.WelcomeTitle }))
)
const HamburgerMenu = lazy(async () =>
	import('./HamburgerMenu').then(m => ({ default: m.HamburgerMenu }))
)
const WrapperBox = lazy(async () => import('./WrapperBox').then(m => ({ default: m.WrapperBox })))
const Logo = lazy(async () => import('../Logo/Logo'))
const Button = lazy(async () => import('../Button/Button').then(m => ({ default: m.default })))

const ConfirmationModal = lazy(async () =>
	import('@/components/Modal/ConfirmationModal').then(m => ({
		default: m.ConfirmationModal
	}))
)
const Modal = lazy(async () =>
	import('@/components/Modal/Modal').then(m => ({ default: m.Dialog }))
)

export const Header = memo(() => {
	const location = useLocation()
	const dialogExitRef = useRef<ModalRef>(null)

	const {
		auth: { logout, user }
	} = useContext(AuthContext)

	return (
		<>
			<header className="min-h-16 h-16 md:text-sm md:border-none gap-4 flex items-center justify-between md:top-0 md:sticky z-50 bg-azul w-full shadow-lg pr-4 py-4 overflow-visible">
				<div className="pl-8 pr-4 p-1 bg-white rounded-e-full">
					<Logo />
				</div>

				<WelcomeTitle user={user} />

				<div className="flex flex-1 gap-8 items-center justify-end">
					{(user?.roleId === RoleOptions.COORDINADOR ||
						user?.roleId === RoleOptions.ADMIN) && (
						<Link
							to="/user-management"
							className="text-white text-xs md:text-sm lg:text-base font-medium p-1 border-b hover:text-orange hover:border-orange transition-colors duration-200"
						>
							Gestión de Usuarios
						</Link>
					)}

					{/* <Link to='/dashboard' className='text-white text-xs md:text-sm lg:text-base font-medium p-1 border-b hover:text-orange hover:border-orange transition-colors duration-200'>Dashboard</Link> */}
					<Link
						to="/profile"
						className="text-white text-xs md:text-sm lg:text-base font-medium p-1 border-b hover:text-orange hover:border-orange transition-colors duration-200"
					>
						Perfil
					</Link>

					<Button
						aria-label="Botón para cerrar sesión del usuario"
						role="logout"
						color="orange"
						size="content"
						text="Salir"
						onClick={() => dialogExitRef.current?.handleOpen()}
						type="button"
						buttonSize="medium"
						icon={<LogoutIcon width={20} className="aspect-square" />}
					/>
				</div>
				<div className="hamburger-wrapper">
					<HamburgerMenu key={location.key} />
					<WrapperBox />
					<Nav />
				</div>
			</header>
			<Suspense>
				<Modal ref={dialogExitRef}>
					<ConfirmationModal
						handleClose={() => dialogExitRef.current?.handleClose()}
						handle={logout}
						text="¿Está seguro que desea "
						strongText="Cerrar la Sesión?"
					/>
				</Modal>
			</Suspense>
		</>
	)
})
