import { use } from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { AuthContext } from '@/app/providers/AuthContext'

export function PasswordExpiredRoute() {
	const {
		auth: { user }
	} = use(AuthContext)
	const location = useLocation()

	// Si la contraseña ha expirado Y NO estamos ya en la página de perfil, redirigimos.
	// Esto evita un bucle de redirección infinito.
	console.log(user?.passwordChangeAt)
	if (user?.passwordExpired === true && location.pathname !== '/profile') {
		return <Navigate to="/profile" replace={true} />
	}

	// Si no, renderizamos las rutas hijas (el <Outlet />)
	return <Outlet />
}
