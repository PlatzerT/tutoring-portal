import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';

export const config = {
	api: {
		bodyParser: false,
	},
};

var upload = multer();
const multerAny = initMiddleware(upload.any());

export default async (req, res) => {
	await multerAny(req, res);

	res.setHeader('Content-type', 'text/plain');

	if (req.method !== 'POST') {
		return res.status(405).send('Method not allowed!');
	}

	const { files } = req;
	let { name, email, subject, message } = req.body;

	// Check if file size is bigger than 100MB
	for (let i = 0; i < files.length; i++) {
		if (files[i].size > 100000000) {
			return res.status(413).send('Dateien müssen kleiner als 100MB sein');
		}
	}

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

	res.status(200).send('Form uploaded!');
};
