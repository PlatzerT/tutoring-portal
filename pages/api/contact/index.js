/*import formidable from 'formidable';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req, res) => {
	const form = new formidable.IncomingForm();
	form.parse(req, (err, fields, files) => {
		if (err) {
			console.log(err);
			return res.status(400);
		}
		console.log(fields);
		const arr = Object.values(files);
		for (let i = 0; i < arr.length; i++) {
			console.log(arr[i]);
		}
	});
};*/

import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import prisma from 'lib/prisma';

export const config = {
	api: {
		bodyParser: false,
	},
};

var upload = multer();
const multerAny = initMiddleware(upload.any());

export default async (req, res) => {
	await multerAny(req, res);
	const { files } = req;

	if (req.method === 'POST') {
		let { name, email, subjectID, message } = req.body;
		subjectID = parseInt(subjectID);

		// Format folder name
		const formattedName = name
			.toUpperCase()
			.replace(' ', '_')
			.concat('__', email.replace('@', '_'));

		// Format files in request correctly
		let formattedFiles = [];
		formattedFiles = files.map((file) => {
			let randomID = uuidv4();
			const ext = file.originalname.slice(file.originalname.indexOf('.'));
			return {
				imagePath: `/${formattedName}/${randomID}${ext}`,
				randomID,
				ext,
			};
		});

		// Write to database
		const res = await prisma.contact.upsert({
			where: {
				email: email,
			},
			create: {
				name: name,
				email: email,
				subjects: {
					connect: {
						id: subjectID,
					},
				},
				files: {
					create: formattedFiles.map((file) => ({ imagePath: file.imagePath })),
				},
			},
			update: {
				subjects: {
					connect: {
						id: subjectID,
					},
				},
				files: {
					create: formattedFiles.map((file) => ({ imagePath: file.imagePath })),
				},
			},
		});

		// Create directory in /public
		await fs.mkdir(`./public/${formattedName}`, { recursive: true }, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Directory created!');
			}
		});

		// Create file in /public/.../...
		try {
			for (let i = 0; i < formattedFiles.length; i++) {
				const buffer = files[i].buffer;

				fs.writeFileSync(
					`./public/${formattedName}/${formattedFiles[i].randomID}${formattedFiles[i].ext}`,
					buffer
				);
			}
		} catch (err) {
			console.log(err);
		}
	} else {
		return res.status(405).send('Method not allowed!');
	}
	res.status(200).send('');
};
