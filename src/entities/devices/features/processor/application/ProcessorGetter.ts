import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type ProcessorDto } from '../domain/dto/Processor.dto'
import { type ProcessorId } from '../domain/value-object/ProcessorId'
import { GetBaseService } from '@/entities/shared/domain/methods/getter.abstract'

/**
 * @class ProcessorGetter
 * @extends {GetBaseService<Primitives<ProcessorId>, ProcessorDto>}
 * @description Servicio de aplicación para obtener una entidad `Processor` por su ID.
 * Extiende de `GetBaseService` para reutilizar la lógica común de obtención por ID.
 */
export class ProcessorGetter extends GetBaseService<Primitives<ProcessorId>, ProcessorDto> {}
