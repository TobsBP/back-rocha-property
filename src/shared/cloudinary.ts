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
