import { type Primitives } from "@/core/shared/domain/value-objects/Primitives";
import { type RoleId } from "./RoleId";
import { type RoleName } from "./RoleName";

export interface RoleDTO {
    id: Primitives<RoleId>,
    name: Primitives<RoleName>,
}