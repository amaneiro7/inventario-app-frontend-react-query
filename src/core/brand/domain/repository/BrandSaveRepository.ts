import { SaveRepository } from "@/core/shared/domain/repository/SaveRepository";
import { type Primitives } from "@/core/shared/domain/value-objects/Primitives";
import { type BrandId } from "../value-object/BrandId";
import { type BrandPrimitives } from "../dto/BrandPrimitives.dto";

export abstract class BrandSaveRepository extends SaveRepository<Primitives<BrandId>, BrandPrimitives> { }