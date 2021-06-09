import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';
import prisma from 'lib/prisma';
import mime from 'mime-types';
import { Prisma } from '.prisma/client';

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
	if (!type || !type.startsWith('image')) {
		return res.status(415).send('This file type is not supported!');
	}
	const buffer = file.buffer;
	let { title, body } = req.body;
	const formattedTitle = title.replace(/[^0-9a-zA-Z]/gi, '_');
	const p = `/news-cover-images/${formattedTitle}/${file.originalname}`;

	try {
		await prisma.news.create({
			data: {
				title: title,
				body: body,
				imagePath: p,
			},
		});
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === 'P2002') {
				return res.status(400).json('Title already exists and must be unique!');
			}
		}
	}

	// Create directory in /public/news-cover-images
	fs.mkdirSync(
		`./public/news-cover-images/${formattedTitle}`,
		{ recursive: true },
		(err) => {
			if (err) {
				return res
					.status(400)
					.send('Something went wrong creating a directory!');
			} else {
				console.log('Directory created!');
			}
		}
	);

	// Create file in /public/news-cover-images/...
	try {
		fs.writeFileSync('./public' + p, buffer);
	} catch (err) {
		return res.status(400).send('Something went wrong uploading!');
	}
	res.status(200).send('File uploaded usccessfully!');
};
