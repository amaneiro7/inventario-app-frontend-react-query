import { lazy, memo } from 'react'
import { useMigrationRulesPrimaryFilter } from '../model/useMigrationRulesPrimaryFilter'
import { Input } from '@/shared/ui/Input/Input'
import { SelectOperatorCombobox } from '@/entities/devices/devices/infra/ui/SelectOperator'

const IsActiveMigrationRulesCombobox = lazy(() =>
	import('@/entities/devices/deviceEvaluation/infra/ui/IsActiveMigrationRuleComboBox').then(
		m => ({
			default: m.IsActiveMigrationRulesCombobox
		})
	)
)

export const MigrationRulesPrimaryFilter = memo(
	({
		handleChange,
		isActive,
		minRamGb = '',
		minRamGbOperator = '',
		minDiskGb = '',
		minDiskGbOperator = ''
	}: {
		isActive?: boolean
		minRamGb?: string
		minRamGbOperator?: string
		minDiskGb?: string
		minDiskGbOperator?: string
		handleChange: (name: string, value: string | number) => void
	}) => {
		const { handleMinDiskGb, handleMinRamGb, localMinRamGb, localminDiskGb } =
			useMigrationRulesPrimaryFilter({
				handleChange,
				minRamGb,
				minRamGbOperator,
				minDiskGb,
				minDiskGbOperator
			})
		return (
			<>
				<IsActiveMigrationRulesCombobox
					handleChange={handleChange}
					name="isActive"
					value={isActive === undefined || isActive === null ? 'all' : String(isActive)}
				/>
				<div className="grid grid-cols-[7rem_1fr] items-center gap-x-2">
					<Input
						id="memoryRamCapacity-filter"
						name="minRamGb"
						label="Memoria Ram"
						value={localMinRamGb}
						type="number"
						max={64}
						onChange={handleMinRamGb}
					/>

					<SelectOperatorCombobox
						name="minRamGbOperator"
						value={minRamGbOperator}
						handleChange={handleChange}
					/>
				</div>
				<div className="grid grid-cols-[7rem_1fr] items-center gap-x-2">
					<Input
						id="hardDriveCapacity-filter"
						name="minDiskGb"
						label="Disco Duro"
						value={localminDiskGb}
						type="number"
						max={8000}
						onChange={handleMinDiskGb}
					/>

					<SelectOperatorCombobox
						name="minDiskGbOperator"
						value={minDiskGbOperator}
						handleChange={handleChange}
					/>
				</div>
			</>
		)
	}
)

MigrationRulesPrimaryFilter.displayName = 'MigrationRulesPrimaryFilter'
