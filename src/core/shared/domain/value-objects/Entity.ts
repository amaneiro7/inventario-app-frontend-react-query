export interface Entity {
    create(): Entity;
    toPrimitives(): Record<string, string>;
}