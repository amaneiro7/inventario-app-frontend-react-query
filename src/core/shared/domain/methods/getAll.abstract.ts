import { type GetAllRepository } from "../value-objects/GetAllRepository.abstract"

export abstract class GetAllBaseService<T> {
    private readonly repository: GetAllRepository<T>
    constructor(repository: GetAllRepository<T>) {
        this.repository = repository
    }

    async execute(): Promise<T[]> {
        return await this.repository.getAll()
    }
}