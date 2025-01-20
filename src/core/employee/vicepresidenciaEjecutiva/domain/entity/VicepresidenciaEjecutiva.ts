import { DirectivaId } from '@/core/employee/directiva/domain/value-object/DirectivaId'
import { VicepresidenciaEjecutivaName } from '../value-object/VicepresidenciaEjecutivaName'
import { type VicepresidenciaEjecutivaPrimitives } from '../dto/VicepresidenciaEjecutiva.dto'
import { type Primitives } from '@/core/shared/domain/value-objects/Primitives'

export class VicepresidenciaEjecutiva {
  constructor(
    private readonly name: VicepresidenciaEjecutivaName,
    private readonly directivaId: DirectivaId
  ) {}

  public static create(
    params: VicepresidenciaEjecutivaPrimitives
  ): VicepresidenciaEjecutiva {
    return new VicepresidenciaEjecutiva(
      new VicepresidenciaEjecutivaName(params.name),
      new DirectivaId(params.directivaId)
    )
  }

  get nameValue(): Primitives<VicepresidenciaEjecutivaName> {
    return this.name.value
  }

  get directivaValue(): Primitives<DirectivaId> {
    return this.directivaId.value
  }

  toPrimitives(): VicepresidenciaEjecutivaPrimitives {
    return {
      name: this.nameValue,
      directivaId: this.directivaValue
    }
  }
}
