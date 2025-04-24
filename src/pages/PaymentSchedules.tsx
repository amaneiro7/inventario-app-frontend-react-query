import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { LazyPaymentSchedulesImage } from '@/components/Images/LazyPaymentSchedulesImage'
import { PageTitle } from '@/ui/PageTitle'

export default function PaymentSchedules() {
	return (
		<>
			<PageTitle title={`Calendario de pagos ${new Date().getFullYear()}`} />
			<DetailsWrapper>
				<LazyPaymentSchedulesImage />
			</DetailsWrapper>
		</>
	)
}
