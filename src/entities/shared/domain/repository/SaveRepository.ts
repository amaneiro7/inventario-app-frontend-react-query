export interface RepositoryResponse<T> {
	message: string
	data?: T // El campo de datos es opcional
}
export abstract class SaveRepository<ID, PAYLOAD, T = undefined> {
	abstract save({ payload }: { payload: PAYLOAD }): Promise<RepositoryResponse<T>>

	abstract update({ id, payload }: { id: ID; payload: PAYLOAD }): Promise<RepositoryResponse<T>>
}
