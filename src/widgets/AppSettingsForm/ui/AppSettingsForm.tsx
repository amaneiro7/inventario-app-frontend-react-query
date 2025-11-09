import { lazy, memo, Suspense } from 'react'
import { useUpdateAppSettings } from '@/entities/appSettings/infra/hook/useUpdateAppSettings'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import Button from '@/shared/ui/Button'
import { Icon, type IconName } from '@/shared/ui/icon/Icon'
import { SettingsGroupCard } from './SettingsGroupCard'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary'
import { WidgetErrorFallback } from '@/shared/ui/ErrorBoundary/WidgetErrorFallback'

const Dialog = lazy(() =>
	import('@/shared/ui/Modal/Modal').then(m => ({
		default: m.Dialog
	}))
)
const ConfirmationModal = lazy(() =>
	import('@/shared/ui/Modal/ConfirmationModal').then(m => ({
		default: m.ConfirmationModal
	}))
)

const groupConfigs: Record<string, { title: string; description: string; iconName: IconName }> = {
	security: {
		title: 'Seguridad',
		description: 'Configuraciones de seguridad y autenticación',
		iconName: 'shield'
	},
	location_monitoring: {
		title: 'Monitoreo de Ubicación',
		description: 'Configuraciones para el seguimiento de ubicación',
		iconName: 'mapPin'
	},
	device_monitoring: {
		title: 'Monitoreo de Dispositivos',
		description: 'Configuraciones para el seguimiento de dispositivos',
		iconName: 'smartphone'
	}
}

export const AppSettingsForm = memo(() => {
	const {
		handleChange,
		handleSubmit,
		isLoading,
		isSubmitting,
		hasChanges,
		saveDialogRef,
		formId,
		resetForm,
		getGroupSettings,
		handleClose,
		handleOpen
	} = useUpdateAppSettings()

	return (
		<div className="bg-background min-h-screen">
			<div className="container mx-auto px-4 py-8">
				<Tabs defaultValue="security" className="space-y-6">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="security" className="gap-2">
							<Icon name="shield" className="h-4 w-4" />
							Seguridad
						</TabsTrigger>
						<TabsTrigger value="location_monitoring" className="gap-2">
							<Icon name="mapPin" className="h-4 w-4" />
							Ubicaciones
						</TabsTrigger>
						<TabsTrigger value="device_monitoring" className="gap-2">
							<Icon name="smartphone" className="h-4 w-4" />
							Dispositivos
						</TabsTrigger>
					</TabsList>

					{Object.entries(groupConfigs).map(([groupKey, config]) => (
						<TabsContent key={groupKey} value={groupKey}>
							<SettingsGroupCard
								formId={formId}
								handleSubmit={handleSubmit}
								groupKey={groupKey}
								title={config.title}
								description={config.description}
								iconName={config.iconName}
								settings={getGroupSettings(groupKey)}
								handleChange={handleChange}
							/>
						</TabsContent>
					))}
				</Tabs>

				<div className="mt-8 flex justify-end gap-3">
					<Button
						type="button"
						buttonSize="medium"
						color="green"
						size="content"
						text={isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
						disabled={isSubmitting || isLoading || !hasChanges}
						onClick={handleOpen}
						icon={<Icon name="save" className="h-4 w-4" />}
					/>
					<Button
						type="button"
						buttonSize="medium"
						color="red"
						size="content"
						onClick={resetForm}
						text="Descartar Cambios"
					/>
				</div>
			</div>
			<ErrorBoundary
				fallback={({ onReset }) => (
					<WidgetErrorFallback
						message="No se pudo abrir el diálogo de confirmación."
						onReset={onReset}
					/>
				)}
			>
				<Suspense fallback={null}>
					<Dialog ref={saveDialogRef}>
						<ConfirmationModal
							title="Confirmar Guardado"
							formId={formId}
							description={
								<>
									¿Estás seguro de que deseas guardar los cambios realizados en la{' '}
									{<strong>configuración del sistema</strong>}?
								</>
							}
							onCancel={handleClose}
						/>
					</Dialog>
				</Suspense>
			</ErrorBoundary>
		</div>
	)
})
AppSettingsForm.displayName = 'AppSettingsForm'
