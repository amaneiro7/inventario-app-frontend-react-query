import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@/components/Breadcrumb'
import { DetailsWrapper } from '@/components/DetailsWrapper/DetailsWrapper'
import { LazyPaymentSchedulesImage } from '@/components/Images/LazyPaymentSchedulesImage'
import { PageTitle } from '@/ui/PageTitle'
import { Home } from 'lucide-react'

export default function PaymentSchedules() {
	return (
		<>
			{/* Breadcrumb Navigation */}
			<Breadcrumb className="mb-6">
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href="/" className="flex items-center">
							<Home className="mr-2 h-4 w-4" />
							Inicio
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Calendario de pagos</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<PageTitle title={`Calendario de pagos ${new Date().getFullYear()}`} />
			<DetailsWrapper>
				<LazyPaymentSchedulesImage />
			</DetailsWrapper>
		</>
	)
}
