import { lazy, memo } from 'react'
import { Navigate, useLocation, useOutletContext } from 'react-router-dom'
import { listIndexPath } from './constants/LIST_ROUTES_METADATA'
import { type RouterMetadata } from './types/metaData'

const ListWrapperRender = lazy(() =>
	import('./ListWrapperRender').then(m => ({ default: m.ListWrapperRender }))
)

/**
 * @component ListWrapper
 * @description Layout principal que aplica control de acceso y pasa el contexto de rutas permitidas.
 */
const ListWrapper = memo(() => {
	const { pathname } = useLocation()
	const isListIndex = pathname === listIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()

	if (isListIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}

	return <ListWrapperRender isListIndex={isListIndex} pathname={location.pathname} />
})

ListWrapper.displayName = 'ListWrapper'

export default ListWrapper
