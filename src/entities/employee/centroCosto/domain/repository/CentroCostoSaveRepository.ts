import { type CentroCostoPrimitives } from '../dto/CentroCosto.dto'

export abstract class CentroCostoSaveRepository {
	abstract save({ payload }: { payload: CentroCostoPrimitives }): Promise<{ message: string }>
}
