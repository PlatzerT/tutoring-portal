import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import FileShowcase from './FileShowcase';
import InputField from './InputField';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

export default function ContactForm({ subjects }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [selectedSubject, setSelectedSubject] = useState(
		subjects[0].id || null
	);
	const [files, setFiles] = useState([]);
	const [displayedFiles, setDisplayedFiles] = useState([]);

	function onDrop(acceptedFiles) {
		setFiles(acceptedFiles);
	}
	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	useEffect(() => {
		if (files) {
			var arr = [];
			for (let i = 0; i < files.length; i++) {
				arr.push(files[i]);
			}
			setDisplayedFiles(arr);
		}
	}, [files]);

	async function handleSubmit(e) {
		const form = new FormData();
		form.append('name', name);
		form.append('email', email);
		form.append('message', message);
		form.append('subjectID', selectedSubject);
		console.log('files: ', files);
		for (let i = 0; i < files.length; i++) {
			form.append(files[i].name, files[i]);
		}
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const res = await axios.post('/api/contact', form, config);
	}

	function loadFile(e) {
		const target = e.currentTarget;
		setFiles(target.files);
	}
	return (
		<div className="w-full md:items-start md:justify-between md:space-x-32 md:flex">
			<form
				name="contactForm"
				encType="multipart/form-data"
				className="flex flex-col space-y-5 md:w-1/3"
			>
				<InputField
					label="Name"
					name="name"
					type="text"
					additionalClasses="h-12"
					value={name}
					onChange={(e) => setName(e.currentTarget.value)}
					required
				/>
				<InputField
					label="Email"
					name="email"
					type="email"
					additionalClasses="h-12"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
					required
				/>
				<div className="flex items-center justify-between">
					<label htmlFor="subject">Fach</label>
					<select
						id="subject"
						className="px-2 py-1 text-white bg-green-100 bg-primary"
						value={selectedSubject}
						onChange={(e) => setSelectedSubject(e.currentTarget.value)}
					>
						{subjects.map((subject) => (
							<option key={subject.id} value={subject.id}>
								{subject.fullName}
							</option>
						))}
					</select>
				</div>
				<div>
					<div>Message</div>
					<textarea
						name="message"
						className="w-full px-2 py-1 align-top transition-all duration-75 border-2 border-black hover:border-purple-800 rounded-r-md rounded-b-md h-44"
						value={message}
						onChange={(e) => setMessage(e.currentTarget.value)}
						required
					></textarea>
				</div>
				<div className="flex-1">
					<div>Dateien</div>
					<label
						className={`flex ${
							files ? 'bg-purple-100 ' : ''
						} hover:bg-purple-50 cursor-pointer duration-75 items-center justify-center w-full px-2 overflow-auto space-x-2 align-top transition-all ease-in border-2 border-black border-dashed hover:border-solid rounded-r-md rounded-b-md`}
					>
						<input
							type="file"
							name="file"
							className="hidden"
							onChange={loadFile}
							multiple
							required
						/>
						{files ? (
							<div className="items-center justify-center hidden w-5/6 space-x-5 font-semibold sm:flex">
								{displayedFiles.map((file) => {
									if (file.type.startsWith('image')) {
										return (
											<img
												key={file.name}
												src={URL.createObjectURL(file)}
												height="40"
												width="60"
											/>
										);
									} else {
										return '';
									}
								})}

								<div>{files.name}</div>
							</div>
						) : (
							<div className="flex items-center space-x-2">
								<Image src="/file_icon.svg" height={24} width={25.13} />
								<div>Upload</div>
							</div>
						)}
					</label>
				</div>
				<Button label="Absenden" onClick={handleSubmit} />
			</form>
			<div className="flex-1 hidden w-60 md:flex md:flex-col md:space-y-4">
				<h2 className="text-4xl font-semibold">Dateien:</h2>
				<div {...getRootProps()}>
					<input {...getInputProps()} type="file" />
					<div>Drop here</div>
				</div>
				{files && files.length > 0 && (
					<div className="w-full gap-4 fluid-grid">
						{displayedFiles.map((file) => (
							<FileShowcase key={file.name} file={file} />
						))}
					</div>
				)}
			</div>
			<style jsx>{`
				.fluid-grid {
					display: column;
				}
				@media (min-width: 640px) {
					.fluid-grid {
						columns: 1;
					}
				}
				@media (min-width: 768px) {
					.fluid-grid {
						columns: 2;
					}
				}
				@media (min-width: 1024px) {
					.fluid-grid {
						columns: 3;
					}
				}
				@media (min-width: 1280px) {
					.fluid-grid {
						columns: 1;
					}
				}
			`}</style>
		</div>
	);
}
