import { Link } from 'react-router-dom'
import { Seo } from '../shared/ui/Seo'

export default function UnauthorizedPage() {
	return (
		<>
			<Seo
				title="403 - Acceso Denegado"
				description="No tienes permisos para acceder a esta página."
			/>
			<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
				<div className="text-center">
					<p className="text-base font-semibold text-red-600">403</p>
					<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
						Acceso Denegado
					</h1>
					<p className="mt-6 text-base leading-7 text-gray-600">
						Lo sentimos, no tienes los permisos necesarios para acceder a esta página.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<Link
							to="/"
							className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Volver al inicio
						</Link>
						<a
							href="mailto:support@example.com"
							className="text-sm font-semibold text-gray-900"
						>
							Contactar soporte <span aria-hidden="true">&rarr;</span>
						</a>
					</div>
				</div>
			</main>
		</>
	)
}
