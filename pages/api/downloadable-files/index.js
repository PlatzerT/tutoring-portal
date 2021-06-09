import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

const root = process.cwd();

export default async (req, res) => {
	if (req.method !== 'GET') {
		return res.status(405).send('Method not allowed!');
	}

	const downloadableFilesFolder = path.join(root, 'downloadable-files');
	let dirs = fs.readdirSync(downloadableFilesFolder);
	dirs = dirs.map((dir) => {
		return { filePath: path.join(downloadableFilesFolder, dir), fileName: dir };
	});

	res.setHeader('Content-Type', 'text/plain');
	res.send(dirs);
	res.end();
};
