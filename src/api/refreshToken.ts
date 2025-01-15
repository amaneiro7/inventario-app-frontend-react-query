import { UserAuthDTO } from "../types/user";
import { fetching } from "./api";

export const refreshToken = async () => await fetching<UserAuthDTO>({ url: 'auth/refresh-token', method: 'GET' })