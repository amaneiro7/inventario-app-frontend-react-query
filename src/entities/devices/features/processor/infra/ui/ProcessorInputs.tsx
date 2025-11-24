import { memo, useMemo } from 'react'
import { useGetAllProcessor } from '@/entities/devices/features/processor/infra/hooks/useGetAllProcessors'
import { ProcessorCores } from '@/entities/devices/features/processor/domain/value-object/ProcessorCores'
import { ProcessorFrequency } from '@/entities/devices/features/processor/domain/value-object/ProcessorFrequency'
import { Input } from '@/shared/ui/Input/Input'
import { Checkbox } from '@/shared/ui/Checkbox'
import {
	type ProcessorsErrors,
	type Action
} from '@/entities/devices/features/processor/infra/reducers/processorFormReducer'
import { type ProcessorParams } from '@/entities/devices/features/processor/domain/dto/Processor.dto'

interface ProcessorInputsProps {
	errors?: ProcessorsErrors
	formData: ProcessorParams
	isLoading: boolean
	canEdit?: boolean
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const ProcessorInputs = memo(
	({ errors, formData, isLoading, canEdit, handleChange }: ProcessorInputsProps) => {
		const { data: processor } = useGetAllProcessor({})

		const productOptions = useMemo(() => {
			const productCollectionList = new Set<string>()
			processor?.data?.forEach(processor => {
				productCollectionList.add(processor.productCollection)
			})
			return Array.from(productCollectionList)
		}, [processor])

		return (
			<>
				<Input
					id="productCollection"
					value={formData.productCollection}
					name="productCollection"
					label="Collección de Productos"
					isLoading={isLoading}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('productCollection', e.target.value)
					}
					error={!!errors?.productCollection}
					errorMessage={errors?.productCollection}
					required
					autoComplete="off"
					readOnly={!canEdit}
					list="productCollection"
				/>
				<datalist id="productCollection">
					{productOptions.map(option => (
						<option key={option} value={option}></option>
					))}
				</datalist>
				<Input
					id="numberModel"
					value={formData.numberModel}
					name="numberModel"
					isLoading={isLoading}
					label="Número de modelo del procesador"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('numberModel', e.target.value)
					}
					error={!!errors?.numberModel}
					errorMessage={errors?.numberModel}
					readOnly={!canEdit}
					required
				/>
				<div className="flex gap-4">
					<Input
						id="processor-cores"
						value={formData.cores}
						name="cores"
						isLoading={isLoading}
						type="number"
						label="cores o núcleos"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('cores', Number(e.target.value))
						}
						error={!!errors?.cores}
						errorMessage={errors?.cores}
						required
						readOnly={!canEdit}
						min={ProcessorCores.MIN}
						max={ProcessorCores.MAX}
					/>
					<Input
						id="processor-frequency"
						value={formData.frequency}
						name="frequency"
						isLoading={isLoading}
						type="number"
						label="Frecuencia"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleChange('frequency', Number(e.target.value))
						}
						rightAdorment={<p>Ghz</p>}
						error={!!errors?.frequency}
						errorMessage={errors?.frequency}
						required
						readOnly={!canEdit}
						min={ProcessorFrequency.MIN}
						max={ProcessorFrequency.MAX}
						step={0.01}
					/>
					<Checkbox
						label="Tiene threads"
						text="¿Tiene threads?"
						name="threads"
						value={formData.threads}
						readOnly={!canEdit}
						onChange={e => {
							handleChange('threads', e.target.checked)
						}}
					/>
				</div>
			</>
		)
	}
)

ProcessorInputs.displayName = 'ProcessorInputs'
