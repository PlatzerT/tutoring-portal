import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
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

		const subject = await prisma.subject.findUnique({
			where: {
				id: subjectID,
			},
		});

		// Format folder name
		const formattedName = name
			.toUpperCase()
			.replace(' ', '_')
			.concat('__', email.replace('@', '_'));

		// Format files in request correctly
		let formattedFiles = [];
		formattedFiles = files.map((file) => {
			const fileName = file.originalname;
			return {
				imagePath: `/${formattedName}/${subject.abbreviation}/${fileName}`,
				subject: subject.abbreviation,
				fileName: fileName,
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
					create: formattedFiles.map((file) => ({
						imagePath: file.imagePath,
						subject: file.subject,
					})),
				},
			},
			update: {
				subjects: {
					connect: {
						id: subjectID,
					},
				},
				files: {
					create: formattedFiles.map((file) => ({
						imagePath: file.imagePath,
						subject: file.subject,
					})),
				},
			},
		});

		// Create directory in /public
		fs.mkdirSync(
			`./public/${formattedName}/${subject.abbreviation}`,
			{ recursive: true },
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Directory created!');
				}
			}
		);

		// Create file in /public/.../...
		try {
			for (let i = 0; i < formattedFiles.length; i++) {
				const buffer = files[i].buffer;

				fs.writeFileSync(
					`./public/${formattedName}/${subject.abbreviation}/${formattedFiles[i].fileName}`,
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
