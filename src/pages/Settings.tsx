import { Suspense } from 'react'
import { DynamicBreadcrumb } from '@/shared/ui/DynamicBreadcrumb'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'
import { PageTitle } from '@/shared/ui/PageTitle'
import { Seo } from '@/shared/ui/Seo'
import { FormLayout } from '@/widgets/FormContainer/FormLayout'
import { useUpdateAppSettings } from '@/entities/appSettings/infra/hook/useUpdateAppSettings'
import { DetailsWrapper } from '@/shared/ui/DetailsWrapper/DetailsWrapper'
import { AppSettingsInputs } from '@/entities/appSettings/infra/ui/AppSettingsInputs'

export default function Settings() {
	const { errors, handleChange, handleSubmit, isLoading, resetForm, settings } =
		useUpdateAppSettings()
	return (
		<>
			<Seo
				title="Configuración | Gestión del Sistema"
				description="Ajusta las configuraciones generales del sistema, personaliza las preferencias de la interfaz y gestiona las opciones de la cuenta."
			/>
			<DynamicBreadcrumb segments={['Configuración']} />
			<PageTitle title="Configuración" />
			<DetailsWrapper>
				<ErrorBoundary
					fallback={({ onReset }) => (
						<WidgetErrorFallback
							onReset={onReset}
							variant="default"
							message="No se pudo cargar el formulario."
						/>
					)}
				>
					<FormLayout
						id="app-settings-form"
						description="Ingrese los datos de la ciudad el cual desea registar."
						isAddForm={false}
						isLoading={isLoading}
						handleSubmit={handleSubmit}
						// isError={isError}
						// isNotFound={isNotFound}
						// onRetry={onRetry}
						// reset={mode === 'edit' ? resetForm : undefined}
						url="/form/city/add"
						border
					>
						<Suspense>
							<AppSettingsInputs
								handleChange={handleChange}
								isLoading={isLoading}
								errors={errors}
								settings={settings}
							/>
						</Suspense>
					</FormLayout>
				</ErrorBoundary>
			</DetailsWrapper>
		</>
	)
}
