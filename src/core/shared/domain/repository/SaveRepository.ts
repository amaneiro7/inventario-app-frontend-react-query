export abstract class SaveRepository<ID, PAYLOAD> {
	abstract save({ payload }: { payload: PAYLOAD }): Promise<{ message: string }>

	abstract update({ id, payload }: { id: ID; payload: PAYLOAD }): Promise<{ message: string }>
}
