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

	if (!req.files?.length || req.files.length > 1) {
		return res.status(400);
	}

	if (req.method === 'POST') {
		let { name, email, subject, message } = req.body;

		// Create directory in /public
		const formattedName = name.toLowerCase().replace(' ', '_');
		const blob = req.files[0];
		await fs.mkdir(`./public/${formattedName}`, { recursive: true }, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Directory created!');
			}
		});

		// Create file in /public/.../...
		const randomID = uuidv4();
		const ext = blob.originalname.slice(blob.originalname.indexOf('.'));
		try {
			fs.writeFileSync(
				`./public/${formattedName}/${randomID}${ext}`,
				blob.buffer
			);
		} catch (err) {
			console.log(err);
		}

		// Write to database
		const res = await prisma.contact.create({
			data: {
				name: name,
				email: email,
				subject: {
					connect: {
						abbreviation: subject,
					},
				},
				files: {
					create: {
						imagePath: `/${formattedName}/${randomID}${ext}`,
					},
				},
			},
		});
		console.log(res);
	}
	res.status(200).send('');
};
