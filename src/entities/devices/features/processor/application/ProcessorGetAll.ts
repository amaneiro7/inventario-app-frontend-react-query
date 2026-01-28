import { GetAllBaseService } from '@/entities/shared/domain/methods/getAll.abstract'
import { type ProcessorDto } from '../domain/dto/Processor.dto'

/**
 * @class ProcessorGetAll
 * @extends {GetAllBaseService<ProcessorDto>}
 * @description Servicio de aplicación para obtener todas las entidades `Processor`.
 * Extiende de `GetAllBaseService` para reutilizar la lógica común de obtención de todos los elementos.
 */
export class ProcessorGetAll extends GetAllBaseService<ProcessorDto> {}
