import { type CentroTrabajoPrimitives } from '../dto/CentroTrabajo.dto'
export abstract class CentroTrabajoSaveRepository {
	abstract save({ payload }: { payload: CentroTrabajoPrimitives }): Promise<{ message: string }>
}
