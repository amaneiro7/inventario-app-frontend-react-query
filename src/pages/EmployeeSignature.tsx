import { lazy, Suspense, useContext } from 'react'
import { Seo } from '@/shared/ui/Seo'
import { SignatureGeneratorSkeleton } from '@/widgets/SignatureGenerator/components/SignatureGeneratorSkeleton'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { EmployeeSignatureSearch } from '@/features/employee-signature-search/ui/EmployeeSignatureSearch'
import { useSignatureEmployeeSearch } from '@/features/employee-signature-search/model/useEmployeeSignatureSearch'
import { SignatureInstructions } from '@/widgets/SignatureGenerator/components/SignatureInstructions'
import { EmployeeSignatureErrorAlert } from '@/features/employee-signature-search/ui/EmployeeSignatureErrorAlert'
import { AuthContext } from '@/app/providers/AuthContext'

const SignatureGenerator = lazy(() =>
	import('@/widgets/SignatureGenerator').then(m => ({ default: m.SignatureGenerator }))
)

const PrivateLayout = lazy(() =>
	import('@/widgets/Layout/PrivateLayout').then(m => ({ default: m.PrivateLayout }))
)
const PublicHeader = lazy(() =>
	import('@/widgets/Layout/PublicHeader').then(m => ({ default: m.PublicHeader }))
)

export default function EmployeeSignature() {
	const {
		auth: { isLogged }
	} = useContext(AuthContext)

	if (isLogged) {
		return (
			<PrivateLayout>
				<EmployeeSignatureContent />
			</PrivateLayout>
		)
	}
	return (
		<>
			{/* 1. Header público modular */}
			<PublicHeader
				title="Firma Corporativa"
				subtitle="Plataforma de identidad visual para empleados"
			/>
			<EmployeeSignatureContent />
		</>
	)
}

const EmployeeSignatureContent = () => {
	const { data, handleSearch, isLoading, handleChange, submitError, value } =
		useSignatureEmployeeSearch()
	return (
		<div className="min-h-screen bg-gray-50 pb-12">
			<Seo
				title="Generador de Firma Corporativa | BNC"
				description="Genera y descarga tu firma oficial de correo corporativo."
			/>

			{/* Contenido principal */}
			<main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
				{/* 2. Banner instructivo modular */}
				<SignatureInstructions />

				{/* 3. Bloque de búsqueda con feedback de error */}
				<div className="flex justify-between pb-4">
					<EmployeeSignatureSearch
						handleChange={handleChange}
						value={value}
						isLoading={isLoading}
						handleSearch={handleSearch}
					/>

					{submitError && <EmployeeSignatureErrorAlert message={submitError} />}
				</div>

				{/* 4. Widget generador */}
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
							<SignatureGenerator signatureData={data} />
						</Suspense>
					</ErrorBoundary>
				</div>
			</main>
		</div>
	)
}
