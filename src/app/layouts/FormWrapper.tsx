import { lazy, memo, useMemo } from 'react'
import { Navigate, useLocation, useOutletContext } from 'react-router-dom'
import { formIndexPath } from './constants/FORM_ROUTES_METADATA'
import { type RouterMetadata } from './types/metaData'

const FormWrapperRender = lazy(() =>
	import('./FormWrapperRender').then(m => ({ default: m.FormWrapperRender }))
)

const FormWrapper = memo(() => {
	const location = useLocation()
	const isFormIndex = location.pathname === formIndexPath
	const availableSubRoutesMetadata = useOutletContext<RouterMetadata[]>()

	const pathname = useMemo(() => {
		const parts = location.pathname.split('/')
		const form = parts[1]
		const entity = parts[2] ? `/${parts[2]}` : ''
		return `/${form}${entity}`
	}, [location.pathname])

	if (isFormIndex && availableSubRoutesMetadata?.length === 0) {
		return <Navigate to="/403" replace />
	}

	return <FormWrapperRender isFormIndex={isFormIndex} pathname={pathname} />
})

FormWrapper.displayName = 'FormWrapper'

export default FormWrapper
