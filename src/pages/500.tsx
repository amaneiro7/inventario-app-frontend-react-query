import { Seo } from '@/components/Seo' // Asumo que tienes un componente Seo

export default function ErrorPage() {
	const title = '¡Oops! Algo salió mal'
	const description =
		'Página de error. Lo sentimos, ha ocurrido un problema inesperado en la aplicación.'

	return (
		<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
			<Seo title={title} description={description} />
			<div className="text-center">
				<p className="text-rojo-600 text-base font-semibold">500</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
					¡Algo salió mal!
				</h1>
				<p className="mt-6 text-base leading-7 text-gray-600">
					Lo sentimos, no pudimos encontrar la página que estabas buscando.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<a
						href="/"
						className="bg-rojo-600 hover:bg-rojo-500 focus-visible:outline-rojo-600 rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
					>
						Volver al inicio
					</a>
					{/* Opcional: Agregar un botón para reportar el error */}
					{/* <button className="text-sm font-semibold text-gray-900 hover:text-gray-700">
            Reportar este problema <span aria-hidden="true">&rarr;</span>
          </button> */}
				</div>
			</div>
		</main>
	)
}
