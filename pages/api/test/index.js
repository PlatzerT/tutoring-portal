import fs from 'fs';
import path from 'path';

const root = process.cwd();

export default async (req, res) => {
	const file = fs.readFileSync(path.join(root, 'test', 'test.pdf'));
	const filePath = path.join(root, 'test', 'test.pdf');
	//console.log(files);
	res.status(200).send(file);
	/*fs.readFile(filePath, (err, content) => {
		if (err) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('<h1>No file found</h1>');
		} else {
			res.writeHead(200, { 'Content-Type': 'application/pdf' });
			res.end(content);
		}
	});*/
};
