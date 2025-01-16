import { fetching } from "./api";
import { type UserAuthDTO } from "../types/user";

export const refreshToken = async () => await fetching<UserAuthDTO>({ url: 'auth/refresh-token', method: 'GET' })