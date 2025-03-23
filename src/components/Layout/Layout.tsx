import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { ProtectedRoute } from '@/routes/ProtectedRoute'
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'

const Layout = memo(() => {
	return (
		<>
			<Header />
			<Main>
				<Outlet />
			</Main>
			<Footer />
		</>
	)
})

export default ProtectedRoute(Layout)
