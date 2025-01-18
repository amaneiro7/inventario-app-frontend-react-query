import { Props } from "./ListenersProps"

export interface Listeners {
    update({ type, message }: Props): void
}