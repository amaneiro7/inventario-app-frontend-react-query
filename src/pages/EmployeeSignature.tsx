import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, FileSignature, Info } from 'lucide-react'
import { LazyLogoImage } from '@/shared/ui/Images/LazyLogoImage'
import { Seo } from '@/shared/ui/Seo'
import Typography from '@/shared/ui/Typography'
import { SignatureGeneratorSkeleton } from '@/widgets/SignatureGenerator/components/SignatureGeneratorSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { EmployeeGetSignatureInfoService } from '@/entities/employee/employee/infra/service/employeeGetSignatureInfo.service'
import { EmployeeGetSignatureInfo } from '@/entities/employee/employee/application/EmployeeGetSignatureInfo'

const SignatureGenerator = lazy(() =>
	import('@/widgets/SignatureGenerator').then(m => ({ default: m.SignatureGenerator }))
)

const repositroy = new EmployeeGetSignatureInfoService()
const get = new EmployeeGetSignatureInfo(repositroy)

export default function EmployeeSignature() {
	return (
		<div className="min-h-screen bg-gray-50 pb-12">
			<Seo
				title="Generador de Firma Corporativa | BNC"
				description="Genera y descarga tu firma oficial de correo corporativo."
			/>

			{/* Cabecera pública con navegación de retorno */}
			<header className="border-b border-gray-200 bg-white shadow-xs">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
					<div className="flex items-center gap-3">
						<LazyLogoImage className="h-10 w-auto" width="40" height="40" />
						<div>
							<Typography
								variant="h4"
								weight="bold"
								color="azul"
								className="leading-tight"
							>
								Firma Corporativa
							</Typography>
							<Typography variant="p" className="text-gray-500">
								Plataforma de identidad visual para empleados
							</Typography>
						</div>
					</div>

					<Link
						to="/login"
						className="hover:text-azul-700 flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-50"
					>
						<ArrowLeft className="h-4 w-4" />
						<span>Volver al Login</span>
					</Link>
				</div>
			</header>

			{/* Contenido principal */}
			<main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
				{/* Banner instructivo */}
				<div className="border-azul-200 bg-azul-50/80 text-azul-900 mb-6 flex items-start gap-3 rounded-xl border p-4 shadow-xs">
					<Info className="text-azul-600 mt-0.5 h-5 w-5 shrink-0" />
					<div className="text-sm">
						<span className="font-semibold">Instrucciones:</span> Completa los campos
						con tus datos laborales. Comprueba la previsualización en tiempo real y
						presiona <strong>Descargar como JPG</strong> para guardarla e insertarla en
						la configuración de firma de tu cliente de correo (Outlook / Webmail).
					</div>
				</div>

				{/* Contenedor del Widget */}
				<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
					<ErrorBoundary
						fallback={({ onReset }) => (
							<WidgetErrorFallback
								onReset={onReset}
								message="Error al cargar el generador de firmas."
							/>
						)}
					>
						<Suspense fallback={<SignatureGeneratorSkeleton />}>
							{/* Al no haber empleado logueado, inicia con placeholders interactivos */}
							<SignatureGenerator employeeData={undefined} />
						</Suspense>
					</ErrorBoundary>
				</div>
			</main>
		</div>
	)
}
