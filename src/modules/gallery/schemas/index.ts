import { Type, Static } from "@sinclair/typebox";
import { UuidSchema, PaginationQuerySchema, PaginatedResponse } from "../../../shared/schemas/common.js";

export const GallerySchema = Type.Object({
    id: UuidSchema,
    name: Type.String(),
    createdAt: Type.String({ format: "date-time" }),
    updatedAt: Type.String({ format: "date-time" }),
});

export const CreateGalleryBodySchema = Type.Object({
    name: Type.String(),
});

export const UpdateGalleryBodySchema = Type.Partial(CreateGalleryBodySchema);

export const GalleryParamsSchema = Type.Object({
    id: UuidSchema,
});

export const ListGalleryQuerySchema = PaginationQuerySchema;
export const PaginatedGallerySchema = PaginatedResponse(GallerySchema);

export type GalleryDto = Static<typeof GallerySchema>;
export type CreateGalleryBody = Static<typeof CreateGalleryBodySchema>;
export type UpdateGalleryBody = Static<typeof UpdateGalleryBodySchema>;
export type GalleryParams = Static<typeof GalleryParamsSchema>;
export type ListGalleryQuery = Static<typeof ListGalleryQuerySchema>;
