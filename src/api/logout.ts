import { fetching } from "./api";

export const logout = async () => await fetching({ url: 'auth/logout', method: 'POST' })