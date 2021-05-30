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
		let { name, email, subjectID, message } = req.body;
		subjectID = parseInt(subjectID);
		const formattedName = name.toLowerCase().replace(' ', '_');
		const blob = req.files[0];
		const randomID = uuidv4();
		const ext = blob.originalname.slice(blob.originalname.indexOf('.'));

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
					create: {
						imagePath: `/${formattedName}/${randomID}${ext}`,
					},
				},
			},
			update: {
				subjects: {
					connect: {
						id: subjectID,
					},
				},
				files: {
					create: {
						imagePath: `/${formattedName}/${randomID}${ext}`,
					},
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
			fs.writeFileSync(
				`./public/${formattedName}/${randomID}${ext}`,
				blob.buffer
			);
		} catch (err) {
			console.log(err);
		}
	}
	res.status(200).send('');
};
