import { memo, useMemo } from 'react'
import {
	type ProcessorsErrors,
	type Action
} from '@/entities/devices/features/processor/infra/reducers/processorFormReducer'
import { type ProcessorParams } from '@/entities/devices/features/processor/domain/dto/Processor.dto'
import { Processorentitiess } from '@/entities/devices/features/processor/domain/value-object/Processorentitiess'
import { ProcessorFrequency } from '@/entities/devices/features/processor/domain/value-object/ProcessorFrequency'
import { useGetAllProcessor } from '@/entities/devices/features/processor/infra/hooks/useGetAllProcessors'
import { Input } from '@/shared/ui/Input/Input'
import { Checkbox } from '@/shared/ui/Checkbox/Checbox'

interface Props {
	errors?: ProcessorsErrors
	formData: ProcessorParams
	handleChange: (name: Action['type'], value: string | number | boolean) => void
}

export const ProcessorInputs = memo(function ({ errors, formData, handleChange }: Props) {
	const { processor } = useGetAllProcessor({})

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
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('productCollection', e.target.value)
				}
				error={!!errors?.productCollection}
				errorMessage={errors?.productCollection}
				required
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
				label="Número de modelo del procesador"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleChange('numberModel', e.target.value)
				}
				error={!!errors?.numberModel}
				errorMessage={errors?.numberModel}
				required
			/>
			<div className="flex gap-4">
				<Input
					id="processor-entitiess"
					value={formData.entitiess}
					name="entitiess"
					type="number"
					label="entitiess o núcleos"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('entitiess', Number(e.target.value))
					}
					error={!!errors?.entitiess}
					errorMessage={errors?.entitiess}
					required
					min={Processorentitiess.MIN}
					max={Processorentitiess.MAX}
				/>
				<Input
					id="processor-frequency"
					value={formData.frequency}
					name="frequency"
					type="number"
					label="Frecuencia"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleChange('frequency', Number(e.target.value))
					}
					rightAdorment={<p>Ghz</p>}
					error={!!errors?.frequency}
					errorMessage={errors?.frequency}
					required
					min={ProcessorFrequency.MIN}
					max={ProcessorFrequency.MAX}
					step={0.01}
				/>
				<Checkbox
					label="Tiene threads"
					text="¿Tiene threads?"
					name="threads"
					value={formData.threads}
					onChange={e => {
						handleChange('threads', e.target.checked)
					}}
				/>
			</div>
		</>
	)
})
