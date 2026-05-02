import { useClearCache } from '@/entities/admin/infra/hook/useClearCache'
import { Input } from '@/shared/ui/Input/Input'
import { FormLayout } from '@/widgets/FormContainer/FormLayout'

export default function FormClearCache() {
	const { handleChange, handleSubmit, isSubmitting, pattern, submitError } = useClearCache()

	return (
		<FormLayout
			id="admin-clear-cache"
			description="Ingrese el patrón para limpiar el caché del sistema. Use '*' para limpiar todo o patrones específicos."
			isAddForm={true}
			url="/form/admin/clear-cache"
			isSubmitting={isSubmitting}
			submitError={submitError}
			handleSubmit={handleSubmit}
			isDirty={true}
			title="Mantenimiento de Sistema"
			subtitle="Limpieza de Caché"
			submitLabel="Limpiar"
		>
			<Input
				id="admin-pattern"
				value={pattern}
				name="pattern"
				label="Patrón de búsqueda (ej: products:* o *)"
				placeholder="Ingrese el patrón de caché"
				isLoading={isSubmitting}
				onChange={handleChange}
				transform
			/>
		</FormLayout>
	)
}
