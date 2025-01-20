export abstract class GetAllRepository<T> {
    abstract getAll(): Promise<T[]>
}