import { lazy, Suspense, useContext } from 'react'
import { AuthContext } from '@/context/Auth/AuthContext'
import { Navigate } from 'react-router-dom'
import { Loading } from '@/shared/ui/Loading'

const FormLogin = lazy(async () => import('@/ui/FormLogin').then(m => ({ default: m.FormLogin })))

export default function Login() {
	const {
		auth: { isLogged }
	} = useContext(AuthContext)

	if (isLogged) {
		return <Navigate to={'/'} />
	}

	return (
		<Suspense fallback={<Loading />}>
			<FormLogin />
		</Suspense>
	)
}
