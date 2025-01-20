import { SaveRepository } from '@/core/shared/domain/repository/SaveRepository'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'
import { type CentroCostoPrimitives } from '../dto/CentroCosto.dto'
import { type CentroCostoId } from '../value-object/CentroCostoId'

export abstract class CentroCostoSaveRepository extends SaveRepository<
  Primitives<CentroCostoId>,
  CentroCostoPrimitives
> {}
