import { lazy, useContext, useState } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { PageTitle } from '@/shared/ui/PageTitle'

const PaymentSchedulesContent = lazy(() =>
	import('@/widgets/PaymentSchedule').then(m => ({ default: m.PaymentSchedulesContent }))
)

const PrivateLayout = lazy(() =>
	import('@/widgets/Layout/PrivateLayout').then(m => ({ default: m.PrivateLayout }))
)
const PublicLayout = lazy(() =>
	import('@/widgets/Layout/PublicLayout').then(m => ({ default: m.PublicLayout }))
)

export default function PaymentSchedules() {
	const {
		auth: { isLogged }
	} = useContext(AuthContext)

	const currentYear = new Date().getFullYear()
	const [year, setYear] = useState(currentYear)

	if (isLogged) {
		return (
			<PrivateLayout>
				<DynamicBreadcrumb segments={['Calendario de pagos']} />
				<PageTitle title={`Calendario de pagos ${year}`} />
				<PaymentSchedulesContent currentYear={currentYear} year={year} setYear={setYear} />
			</PrivateLayout>
		)
	}

	return (
		<>
			<PublicLayout
				title="Calendario de Pagos"
				subtitle="Consulta y descarga tu calendario de pagos de manera sencilla y rápida"
			>
				<PaymentSchedulesContent currentYear={currentYear} year={year} setYear={setYear} />
			</PublicLayout>
		</>
	)
}
