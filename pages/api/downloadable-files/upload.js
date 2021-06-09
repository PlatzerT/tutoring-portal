import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';
import prisma from 'lib/prisma';
import mime from 'mime-types';

export const config = {
	api: {
		bodyParser: false,
	},
};

var upload = multer();
const multerAny = initMiddleware(upload.any());

export default async (req, res) => {
	await multerAny(req, res);

	if (req.method !== 'POST') {
		return res.status(405).send('Method not allowed!');
	}

	const file = req.files[0];
	const fileName = file.originalname;
	const ext = fileName.slice(fileName.indexOf('.'));
	const type = mime.lookup(ext);
	if (
		!type ||
		(!type.startsWith('application/pdf') &&
			!type.startsWith('audio') &&
			!type.startsWith('video'))
	) {
		return res.status(415).send('This file type is not supported!');
	}
	const buffer = file.buffer;
	const p = `/downloadable-files/${fileName}`;

	try {
		await prisma.download.create({
			data: {
				fileName: fileName,
				filePath: p,
			},
		});
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === 'P2002') {
				return res.status(400).json('Each file must have a unique name!');
			}
		}
	}

	// Create file in /downloadable-files/...
	try {
		fs.writeFileSync('.' + p, buffer);
	} catch (err) {
		return res.status(400).send('Something went wrong uploading!');
	}
	res.status(200).send('File uploaded usccessfully!');
};
