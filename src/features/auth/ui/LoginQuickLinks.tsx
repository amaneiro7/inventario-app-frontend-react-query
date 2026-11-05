import { Link } from 'react-router-dom'
import { CalendarDays, FileSignature } from 'lucide-react'

export const LoginQuickLinks = () => {
	return (
		<div className="mt-4 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
			{/* Calendario de pagos */}
			<Link
				to="/payment-schedules"
				className="group text-azul-950 hover:text-naranja flex w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/90 px-4 py-2 text-xs font-semibold shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg sm:w-auto"
			>
				<CalendarDays className="text-azul-700 group-hover:text-naranja h-4 w-4 transition-colors" />
				<span>Calendario de pagos</span>
			</Link>
			{/* Firma corporativa */}
			<Link
				to="/employee-signature"
				className="group text-azul-950 hover:text-naranja flex w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/90 px-4 py-2 text-xs font-semibold shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-lg sm:w-auto"
			>
				<FileSignature className="text-azul-700 group-hover:text-naranja h-4 w-4 transition-colors" />
				<span>Firma corporativa</span>
			</Link>
		</div>
	)
}
