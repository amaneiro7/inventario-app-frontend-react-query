import { ProcessorParams } from '../../domain/dto/Processor.dto'
import { ProcessorProductCollection } from '../../domain/value-object/ProcessorCollection'
import { ProcessorCores } from '../../domain/value-object/ProcessorCores'
import { ProcessorFrequency } from '../../domain/value-object/ProcessorFrequency'
import { ProcessorNumberModel } from '../../domain/value-object/ProcessorNumberModel'

export async function processorAction(
	_prevState: unknown,
	formData: FormData
): Promise<{
	productCollection: string
	numberModel: string
	cores: string
	frequency: string
}> {
	const productCollection = formData.get(
		'productCollection'
	) as ProcessorParams['productCollection']
	const numberModel = formData.get('numberModel') as ProcessorParams['numberModel']
	const cores = formData.get('cores') as unknown as ProcessorParams['cores']
	const frequency = formData.get('frequency') as unknown as ProcessorParams['frequency']

	return {
		productCollection: ProcessorProductCollection.isValid(productCollection)
			? ''
			: ProcessorProductCollection.invalidMessage(productCollection),
		numberModel: ProcessorNumberModel.isValid(numberModel)
			? ''
			: ProcessorNumberModel.invalidMessage(numberModel),
		cores: ProcessorCores.isValid(cores) ? '' : ProcessorCores.invalidMessage(cores),
		frequency: ProcessorFrequency.isValid(frequency)
			? ''
			: ProcessorFrequency.invalidMessage(frequency)
	}
}
