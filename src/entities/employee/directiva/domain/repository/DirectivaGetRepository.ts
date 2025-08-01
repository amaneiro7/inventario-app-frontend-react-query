import { GetRepository } from '@/entities/shared/domain/repository/GetterRepository.abstract'
import { type DirectivaDto } from '../dto/Directiva.dto'
import { type Primitives } from '@/entities/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../value-object/DirectivaId'

export abstract class DirectivaGetRepository extends GetRepository<
	Primitives<DirectivaId>,
	DirectivaDto
> {}
