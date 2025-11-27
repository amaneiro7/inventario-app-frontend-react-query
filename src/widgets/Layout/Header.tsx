import { lazy, memo, Suspense, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '@/app/providers/AuthContext'
import Logo from '@/shared/ui/Logo/Logo'
import { HamburgerMenu } from './HamburgerMenu'
import { Icon } from '@/shared/ui/icon/Icon'
import { PERMISSIONS } from '@/shared/config/permissions'
import { WelcomeBanner } from './WelcomeBanner'

const WrapperBox = lazy(() => import('./WrapperBox').then(m => ({ default: m.WrapperBox })))
const Nav = lazy(() => import('./Nav').then(m => ({ default: m.Nav })))

export const Header = memo(() => {
	const location = useLocation()
	const {
		auth: { user, hasPermission }
	} = useContext(AuthContext)

	return (
		<header className="z-50 md:sticky md:top-0">
			<WelcomeBanner user={user} />
			<div className="bg-azul flex h-16 min-h-16 w-full items-center justify-between gap-4 overflow-visible px-4 py-2 pl-0 shadow-lg md:text-sm">
				<div className="rounded-e-full bg-white p-1 pr-4 pl-8">
					<Logo />
				</div>

				<nav
					aria-label="Navegación de usuario"
					className="flex flex-1 items-center justify-end gap-4 md:gap-8"
				>
					{hasPermission(PERMISSIONS.USERS.READ_LIST) && (
						<Link
							to="/user-management"
							title="Gestión de Usuarios"
							className="hover:text-orange p-1 text-white transition-colors duration-200"
						>
							<Icon name="users" />
						</Link>
					)}
					<Link
						to="/profile"
						title="Perfil"
						className="hover:text-orange p-1 text-white transition-colors duration-200"
					>
						<Icon name="user" />
					</Link>

					{hasPermission(PERMISSIONS.SETTINGS.READ_LIST) && (
						<Link
							to="/settings"
							title="Configuración"
							className="hover:text-orange p-1 text-white transition-colors duration-200"
						>
							<Icon name="settings" />
						</Link>
					)}
				</nav>
				<div className="hamburger-wrapper">
					<HamburgerMenu key={location.key} />
					<Suspense>
						<WrapperBox />
						<Nav />
					</Suspense>
				</div>
			</div>
		</header>
	)
})
