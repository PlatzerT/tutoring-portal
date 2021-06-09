import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';

import mime from 'mime-types';

const root = process.cwd();

export default async (req, res) => {
	if (req.method !== 'GET') {
		return res.status(405).send('Method not allowed!');
	}

	const p = path.join(root, 'subjects.txt');
	let content = fs.readFileSync(p).toString().split('\n');
	content = content.map((line) => {
		// MEDT|Medientechnik
		if (line.endsWith('\r')) {
			line = line.substring(0, line.length - 1);
		}
		const arr = line.split('|');

		return { abbreviation: arr[0], fullName: arr[1] };
	});
	res.json(content);
	res.end();
};
