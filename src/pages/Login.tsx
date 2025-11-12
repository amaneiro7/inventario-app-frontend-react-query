import { lazy, Suspense, useContext } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'
import { Navigate } from 'react-router-dom'
import { Loading } from '@/shared/ui/Loading'

const FormLogin = lazy(async () =>
	import('@/features/auth/ui/FormLogin').then(m => ({ default: m.FormLogin }))
)

export default function Login() {
	const {
		auth: { isLogged, tempToken }
	} = useContext(AuthContext)

	console.log(isLogged, tempToken)

	if (isLogged) {
		return <Navigate to={'/'} />
	}

	if (tempToken) {
		return <Navigate to={'/auth/expired-password'} />
	}

	return (
		<Suspense fallback={<Loading />}>
			<FormLogin />
		</Suspense>
	)
}
