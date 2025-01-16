export abstract class LoginUserRepository {
    abstract login(email: string, password: string): Promise<any>
}