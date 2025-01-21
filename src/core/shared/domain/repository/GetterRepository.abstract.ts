export abstract class GetRepository<ID, T> {
	abstract getById({ id }: { id: ID }): Promise<T>
}
