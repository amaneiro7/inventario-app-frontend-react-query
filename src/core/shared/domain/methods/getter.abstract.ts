import { type GetRepository } from "../repository/GetterRepository.abstract"

export abstract class GetBaseService<ID, T> {
    private readonly repository: GetRepository<ID, T>
    constructor(repository: GetRepository<ID, T>) {
        this.repository = repository
    }

    async execute({ id }: { id: ID }): Promise<T> {
        return await this.repository.getById({ id })
    }
}