import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { DynamicBreadcrumb } from '@/components/DynamicBreadcrumb'
import { LazyPaymentSchedulesImage } from '@/components/Images/LazyPaymentSchedulesImage'
import { PageTitle } from '@/ui/PageTitle'

export default function PaymentSchedules() {
	return (
		<>
			{/* Breadcrumb Navigation */}
			<DynamicBreadcrumb segments={['Calendario de pagos']} />
			<PageTitle title={`Calendario de pagos ${new Date().getFullYear()}`} />
			<DetailsWrapper>
				<LazyPaymentSchedulesImage />
			</DetailsWrapper>
		</>
	)
}
