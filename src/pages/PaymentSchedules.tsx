import { lazy, useContext } from 'react'
import { AuthContext } from '@/app/providers/AuthContext'

const PaymentSchedulesContent = lazy(() =>
	import('@/widgets/PaymentSchedule').then(m => ({ default: m.PaymentSchedulesContent }))
)

const PrivateLayout = lazy(() =>
	import('@/widgets/Layout/PrivateLayout').then(m => ({ default: m.PrivateLayout }))
)
const PublicHeader = lazy(() =>
	import('@/widgets/Layout/PublicHeader').then(m => ({ default: m.PublicHeader }))
)

export default function PaymentSchedules() {
	const {
		auth: { isLogged }
	} = useContext(AuthContext)

	if (isLogged) {
		return (
			<PrivateLayout>
				<PaymentSchedulesContent />
			</PrivateLayout>
		)
	}

	return (
		<>
			<PublicHeader title="" subtitle="" />
			<PaymentSchedulesContent />
		</>
	)
}
