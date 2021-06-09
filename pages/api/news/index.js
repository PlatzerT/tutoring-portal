import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';

import mime from 'mime-types';

const root = process.cwd();

function getDate(contentPath, titlePath, coverPath) {
	let dates = [];
	dates.push(fs.statSync(contentPath).mtime);
	dates.push(fs.statSync(titlePath).mtime);
	dates.push(fs.statSync(coverPath).mtime);
	console.log(dates);

	return new Date(Math.max.apply(null, dates));
}

export default async (req, res) => {
	if (req.method !== 'GET') {
		return res.status(405).send('Method not allowed!');
	}

	const newsFolder = path.join(root, 'news');
	const dir = fs.readdirSync(newsFolder);
	let allNews = [];
	for (let i = 0; i < dir.length; i++) {
		const contentPath = path.join(newsFolder, dir[i], 'content.txt');
		const titlePath = path.join(newsFolder, dir[i], 'title.txt');
		const coverPath = path.join(newsFolder, dir[i], 'coverPath.txt');
		console.log(coverPath);
		allNews.push({ contentPath, coverPath, titlePath });
	}
	allNews = allNews.map((news) => {
		const lastModified = getDate(
			news.contentPath,
			news.titlePath,
			news.coverPath
		);
		const content = fs.readFileSync(news.contentPath).toString();
		const title = fs.readFileSync(news.titlePath).toString();
		const coverPath = fs.readFileSync(news.coverPath).toString();
		return {
			content,
			coverPath,
			title,
			updatedAt: lastModified,
		};
	});
	res.send(allNews);
	res.end();
};
