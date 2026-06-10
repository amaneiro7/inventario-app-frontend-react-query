import { DeleteRepository } from '@/entities/shared/domain/repository/DeleteRepository.abstract'
import type { MigrationRuleId } from '../value-object/MigrationRuleId'
import type { Primitives } from '@/entities/shared/domain/value-objects/Primitives'

/**
 * `MigrationRuleDeleteRepository`
 * @abstract
 * @class
 * @extends {DeleteRepository<Primitives<MigrationRuleId>, void>}
 * @description Contrato (interfaz abstracta) para un repositorio que permite eliminar una entidad `MigrationRule` por su ID.
 * Define el método `deleteById` que debe ser implementado por los adaptadores de infraestructura.
 */
export abstract class MigrationRuleDeleteRepository extends DeleteRepository<
	Primitives<MigrationRuleId>,
	void
> {}
