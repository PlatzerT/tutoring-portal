import multer from 'multer';
import initMiddleware from '../../../lib/initMiddleware';
import fs from 'fs';
import path from 'path';
import prisma from 'lib/prisma';
import mime from 'mime-types';

export const config = {
	api: {
		bodyParser: false,
	},
};

const root = process.cwd();

var upload = multer();
const multerAny = initMiddleware(upload.any());

export default async (req, res) => {
	await multerAny(req, res);

	if (req.method === 'GET') {
		const { filePath } = req.body;
		const p = path.join(root, filePath);
		const fileBuffer = fs.readFileSync(p, { getFileType: true });
		const ext = p.slice(p.indexOf('.'));

		res.setHeader('Content-Type', mime.lookup(ext));
		res.send(fileBuffer);
		res.end();
		return;
	}

	if (req.method === 'POST') {
		const { files } = req;
		let { name, email, subjectID, message } = req.body;
		subjectID = parseInt(subjectID);

		const subject = await prisma.subject.findUnique({
			where: {
				id: subjectID,
			},
		});

		// Format folder name
		let formattedName = name
			.toUpperCase()
			.replace(' ', '_')
			.concat('__', email.replace('@', '_').replace('-', '_'))
			.replace('.', '_');
		console.log(formattedName);

		// Format files in request correctly
		let formattedFiles = [];
		formattedFiles = files.map((file) => {
			const fileName = file.originalname;
			return {
				filePath: `contacts/${formattedName}/${subject.abbreviation}/${fileName}`,
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
						name: file.fileName,
						filePath: file.filePath,
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
						name: file.fileName,
						filePath: file.filePath,
						subject: file.subject,
					})),
				},
			},
		});

		// Create directory in /contacts
		fs.mkdirSync(
			`./contacts/${formattedName}/${subject.abbreviation}`,
			{ recursive: true },
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log('Directory created!');
				}
			}
		);

		// Create file in /contacts/.../...
		try {
			for (let i = 0; i < formattedFiles.length; i++) {
				const buffer = files[i].buffer;

				fs.writeFileSync(
					`./contacts/${formattedName}/${subject.abbreviation}/${formattedFiles[i].fileName}`,
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
