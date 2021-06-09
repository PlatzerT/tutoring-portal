import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

const root = process.cwd();

export default async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).send('Method not allowed!');
	}

	const { filePath } = req.body;
	const fileBuffer = fs.readFileSync(filePath);
	const ext = filePath.slice(filePath.indexOf('.'));

	res.setHeader('Content-Type', mime.lookup(ext));
	res.send(fileBuffer);
	res.end();
};
