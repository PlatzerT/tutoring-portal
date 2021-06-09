import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';

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

	const { files } = req;
	let { name, email, subject, message } = req.body;

	let formattedName = email + '(' + name + ')';

	// Create directory in /contacts
	fs.mkdirSync(
		`./contacts/${formattedName}/${subject}`,
		{ recursive: true },
		(err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Directory created!');
			}
		}
	);

	try {
		fs.writeFileSync(
			`./contacts/${formattedName}/${subject}/_message.txt`,
			message
		);
	} catch (err) {
		return res.status(400).send('Something went wrong uploading!');
	}

	// Create file in /contacts/.../...
	try {
		for (let i = 0; i < files.length; i++) {
			const buffer = files[i].buffer;

			fs.writeFileSync(
				`./contacts/${formattedName}/${subject}/${files[i].originalname}`,
				buffer
			);
		}
	} catch (err) {
		return res.status(400).send('Something went wrong uploading!');
	}
	res.setHeader('Content-type', 'text/plain');
	res.status(200).send('Form uploaded!');
};
