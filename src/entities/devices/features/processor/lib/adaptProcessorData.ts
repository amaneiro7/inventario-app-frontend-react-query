import { ProcessorFrequency } from '../../domain/value-object/ProcessorFrequency'
import { type ProcessorDto } from '../../domain/dto/Processor.dto'
import { type DefaultProcessor } from '../reducers/processorFormReducer'

export const adaptProcessorData = (data: ProcessorDto): DefaultProcessor => ({
	id: data.id,
	cores: data.cores,
	numberModel: data.numberModel,
	productCollection: data.productCollection,
	threads: data.threads,
	frequency: ProcessorFrequency.convertToNumber(data.frequency),
	updatedAt: data.updatedAt
})
