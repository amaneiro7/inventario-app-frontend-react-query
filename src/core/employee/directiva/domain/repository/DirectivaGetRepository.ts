import { GetRepository } from '@/core/shared/domain/repository/GetterRepository.abstract'
import { type DirectivaDto } from '../dto/Directiva.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type DirectivaId } from '../value-object/DirectivaId'

export abstract class DirectivaGetRepository extends GetRepository<
	Primitives<DirectivaId>,
	DirectivaDto
> {}
