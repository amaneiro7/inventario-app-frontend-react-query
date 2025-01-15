import { fetching } from "./api";

export const changePassword = async ({ password, newPassword, reTypePassword }: { password: string, newPassword: string, reTypePassword: string }) => await fetching({ url: 'users/change-password', method: 'PATCH', data: { password, newPassword, reTypePassword } })


