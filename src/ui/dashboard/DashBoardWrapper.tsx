import { memo, Suspense, useMemo } from 'react'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { PageTitle } from '../PageTitle'

const DashboardWrapper = memo(() => {
    const location = useLocation()

    const routeTitles = useMemo(
        (): Record<string, string> => ({
            '/computer': 'Dashboard de equipos de computación',
            '/monitor': 'Lista de monitores',
            '/printer': 'Lista de impresoras',
            '/parts': 'Lista de partes',
            '/finantialprinter': 'Lista de impresoras financieras',
            '/usuarios': 'Gestión de empleados',
            '/model': 'Lista de modelos',
            '/location': 'Lista de sitios',
            '/history': 'Historial de cambios'
        }),
        []
    )

    const defaultTitle = useMemo(() => {
        for (const route in routeTitles) {
            if (location.pathname.includes(route)) {
                return routeTitles[route]
            }
        }
        return 'Dashboard'
    }, [location.pathname, routeTitles])

    const outletTitle = useOutletContext<string>()
    const title = outletTitle || defaultTitle
    return (
        <>
            <PageTitle title={title} />
            <DetailsWrapper>
                <Suspense>
                    <Outlet context={title} />
                </Suspense>
            </DetailsWrapper>
        </>
    )
})

export default DashboardWrapper

