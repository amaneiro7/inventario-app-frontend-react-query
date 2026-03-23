import { lazy, memo } from 'react'
import { Navigate, useLocation, useOutletContext } from 'react-router-dom'
import { dashboardIndexPath } from './constants/DASHBOARD_ROUTES_METADATA'
import { type RouterMetadata } from './types/metaData'

const DashboardWrapperRender = lazy(() =>
	import('./DashboardWrapperRender').then(m => ({ default: m.DashboardWrapperRender }))
)

/**
 * @component DashBoardWrapper
 * @description Layout principal que aplica control de acceso y pasa el contexto de rutas permitidas.
 */
const DashboardWrapper = memo(() => {
	const { pathname } = useLocation()
	const isDashboardIndex = pathname === dashboardIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()

	if (isDashboardIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}
	return <DashboardWrapperRender isDashboardIndex={isDashboardIndex} pathname={pathname} />
})

DashboardWrapper.displayName = 'DashboardWrapper'

export default DashboardWrapper
