import { v2 as cloudinary } from 'cloudinary';
import { env } from '@/core/config/env.js';

cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
	file: Buffer | string,
	publicId?: string,
): Promise<string> {
	const result = await cloudinary.uploader.upload(
		typeof file === 'string'
			? file
			: `data:image/webp;base64,${file.toString('base64')}`,
		{
			folder: 'rocha-property',
			...(publicId && { public_id: publicId }),
			resource_type: 'image',
		},
	);

	return result.secure_url;
}

export interface CloudinaryImage {
	publicId: string;
	url: string;
	createdAt: string;
	format: string;
	width: number;
	height: number;
}

export interface ListImagesResult {
	resources: CloudinaryImage[];
	nextCursor?: string;
}

export async function listImages(
	maxResults = 30,
	nextCursor?: string,
): Promise<ListImagesResult> {
	const result = await cloudinary.api.resources({
		type: 'upload',
		prefix: 'rocha-property',
		max_results: maxResults,
		...(nextCursor && { next_cursor: nextCursor }),
	});

	return {
		resources: result.resources.map(
			(r: {
				public_id: string;
				secure_url: string;
				created_at: string;
				format: string;
				width: number;
				height: number;
			}) => ({
				publicId: r.public_id,
				url: r.secure_url,
				createdAt: r.created_at,
				format: r.format,
				width: r.width,
				height: r.height,
			}),
		),
		...(result.next_cursor && { nextCursor: result.next_cursor }),
	};
}
