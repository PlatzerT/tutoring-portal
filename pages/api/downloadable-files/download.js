import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';
import prisma from 'lib/prisma';
import mime from 'mime-types';
import { Prisma } from '.prisma/client';

const root = process.cwd();

export default async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).send('Method not allowed!');
	}

	const { filePath } = req.body;
	console.log(filePath);
	const p = path.join(root, filePath);
	const fileBuffer = fs.readFileSync(p);
	const ext = p.slice(p.indexOf('.'));

	res.setHeader('Content-Type', mime.lookup(ext));
	res.send(fileBuffer);
	res.end();
};
