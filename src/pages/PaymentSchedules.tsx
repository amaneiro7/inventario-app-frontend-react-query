import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { LazyPaymentSchedulesImage } from '@/shared/ui/Images/LazyPaymentSchedulesImage'
import { Seo } from '@/shared/ui/Seo'
import { PageTitle } from '@/shared/ui/PageTitle'

export default function PaymentSchedules() {
	const currentYear = new Date().getFullYear()
	return (
		<>
			{/* Breadcrumb Navigation */}
			<Seo
				title={`Calendario de Pagos ${currentYear} | Gestión del Sistema`}
				description={`Consulta el calendario de pagos correspondiente al año ${currentYear}. Visualiza las fechas importantes y los plazos establecidos para las transacciones y operaciones del sistema.`}
			/>
			<DynamicBreadcrumb segments={['Calendario de pagos']} />
			<PageTitle title={`Calendario de pagos ${currentYear}`} />
			<DetailsWrapper>
				<LazyPaymentSchedulesImage />
			</DetailsWrapper>
		</>
	)
}
