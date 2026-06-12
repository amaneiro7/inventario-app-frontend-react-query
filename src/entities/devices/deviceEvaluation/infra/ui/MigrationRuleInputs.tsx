import { lazy, memo } from 'react'
import { Input } from '@/shared/ui/Input/Input'
import { Checkbox } from '@/shared/ui/Checkbox'
import type {
	Action,
	DefaultMigrationRule,
	MigrationRuleDisabled,
	MigrationRuleErrors,
	MigrationRuleRequired
} from '@/entities/devices/deviceEvaluation/infra/reducers/migrationRuleFormReducer'
import { type FormMode } from '@/shared/lib/hooks/useGetFormMode'

const ProcessorTransferList = lazy(() =>
	import('@/entities/devices/features/processor/infra/ui/ProcessorTransferList').then(m => ({
		default: m.ProcessorTransferList
	}))
)

interface MigrationRuleInputsProps {
	formData: DefaultMigrationRule
	errors: MigrationRuleErrors
	required: MigrationRuleRequired
	disabled: MigrationRuleDisabled
	mode?: FormMode
	handleChange: (name: Action['type'], value: any) => void
	isLoading: boolean
	canEdit: boolean
}

/**
 * `MigrationRuleInputs` is a memoized functional component that renders the input fields
 * for migration rule information. It includes comboboxes for main category, category, and brand,
 * a text input for the model name, a checkbox for generic models, and dynamically loaded
 * additional features based on the selected main category and category.
 */
export const MigrationRuleInputs = memo(function ({
	errors,
	disabled,
	required,
	formData,
	// mode,
	isLoading,
	canEdit,
	handleChange
}: MigrationRuleInputsProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="grid grid-cols-2 gap-5">
				<Input
					id="min-ram-gb"
					value={formData.minRamGb}
					type="number"
					name="minRamGb"
					isLoading={isLoading}
					label="Memoria RAM Mínima (GB)"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('minRamGb', e.target.value)
					}
					error={!!errors?.minRamGb}
					errorMessage={errors?.minRamGb}
					required={required.minRamGb}
					disabled={disabled.minRamGb}
					readOnly={!canEdit}
				/>
				<Input
					id="min-disk-gb"
					value={formData.minDiskGb}
					type="number"
					name="minDiskGb"
					isLoading={isLoading}
					label="Disco Duro Mínimo (GB)"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('minDiskGb', e.target.value)
					}
					error={!!errors?.minDiskGb}
					errorMessage={errors?.minDiskGb}
					required={required.minDiskGb}
					disabled={disabled.minDiskGb}
					readOnly={!canEdit}
				/>
				<Checkbox
					text="Regla activa"
					name="isActive"
					id="is-active"
					value={formData.isActive}
					readOnly={!canEdit}
					disabled={disabled.isActive}
					onChange={e => {
						handleChange('isActive', e.target.checked)
					}}
				/>
			</div>

			{/* Informacion Adicional */}

			<ProcessorTransferList
				value={formData.approvedProcessors}
				name="processors"
				readonly={!canEdit}
				isLoading={isLoading}
				onAddProcessor={handleChange}
				onRemoveProcessor={handleChange}
			/>
		</div>
	)
})
