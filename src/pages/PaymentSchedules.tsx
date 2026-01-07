import { useState } from 'react'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { LazyPaymentSchedulesImage } from '@/shared/ui/Images/LazyPaymentSchedulesImage'
import { Seo } from '@/shared/ui/Seo'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/Select'

export default function PaymentSchedules() {
	const currentYear = new Date().getFullYear()
	const [year, setYear] = useState(currentYear)

	return (
		<>
			{/* Breadcrumb Navigation */}
			<Seo
				title={`Calendario de Pagos ${year} | Gestión del Sistema`}
				description={`Consulta el calendario de pagos correspondiente al año ${year}. Visualiza las fechas importantes y los plazos establecidos para las transacciones y operaciones del sistema.`}
			/>
			<DynamicBreadcrumb segments={['Calendario de pagos']} />
			<PageTitle title={`Calendario de pagos ${year}`} />

			<div className="mb-6 w-full max-w-xs">
				<Select
					defaultValue={String(currentYear)}
					value={String(year)}
					onValueChange={val => setYear(Number(val))}
				>
					<SelectTrigger>
						<SelectValue placeholder="Seleccionar año" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="2025">2025</SelectItem>
						<SelectItem value="2026">2026</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<DetailsWrapper>
				<LazyPaymentSchedulesImage year={year} />
			</DetailsWrapper>
		</>
	)
}
