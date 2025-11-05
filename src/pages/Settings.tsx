import { Suspense } from 'react'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Seo } from '@/shared/ui/Seo'
import { AppSettingsInputs } from '@/entities/appSettings/infra/ui/AppSettingsInputs'

export default function Settings() {
	return (
		<>
			<Seo
				title="Configuración | Gestión del Sistema"
				description="Ajusta las configuraciones generales del sistema, personaliza las preferencias de la interfaz y gestiona las opciones de la cuenta."
			/>
			<DynamicBreadcrumb segments={['Configuración']} />
			<PageTitle title="Configuración del Sistema" />
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						onReset={onReset}
						variant="default"
						message="No se pudo cargar el formulario."
					/>
				)}
			>
				<Suspense>
					<AppSettingsInputs />
				</Suspense>
			</ErrorBoundary>
		</>
	)
}
