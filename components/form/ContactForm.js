import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import FileShowcase from './FileShowcase';
import InputField from './InputField';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useRouter } from 'next/router';

function getUploadedStatusStyles(status) {
	switch (status) {
		case 'initial':
			return '';
		case 'success':
			return 'border-green-600 bg-green-600';
	}
}

export default function ContactForm({ subjects }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [errorMsg, setErrorMsg] = useState(null);
	const [uploadStatus, setUploadStatus] = useState('initial');
	const [selectedSubject, setSelectedSubject] = useState(
		subjects[0].abbreviation || null
	);
	const [files, setFiles] = useState([]);
	const [displayedFiles, setDisplayedFiles] = useState([]);
	const router = useRouter();

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
		form.append('subject', selectedSubject);
		for (let i = 0; i < files.length; i++) {
			form.append(files[i].name, files[i]);
		}
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		try {
			const res = await axios.post('/api/contact/upload', form, config);
			setUploadStatus('success');
			setTimeout(() => {
				router.push('/');
			}, 2000);
		} catch (err) {
			if (err.response.status === 413) {
				setErrorMsg(err.response.data);
				setUploadStatus('error');
			}
		}
	}
	return (
		<div className="w-full md:justify-between md:space-x-16 md:flex">
			<form
				name="contactForm"
				encType="multipart/form-data"
				className="flex flex-col self-start w-full space-y-5 md:w-1/2 lg:w-2/5"
				id="contact"
				onSubmit={handleSubmit}
			>
				{errorMsg && (
					<div className="px-2 py-1 text-red-700 bg-red-100">{errorMsg}</div>
				)}
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
						className="px-2 py-1 text-white bg-primary"
						value={selectedSubject}
						onChange={(e) => setSelectedSubject(e.currentTarget.value)}
					>
						{subjects.map((subject) => (
							<option key={subject.abbreviation} value={subject.abbreviation}>
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
				<div className="flex items-center justify-between md:hidden">
					<div
						{...getRootProps()}
						className="p-2 border-2 border-purple-600 cursor-pointer hover:bg-purple-800 hover:text-white text-primary rounded-r-md rounded-b-md"
					>
						<input {...getInputProps()} type="file" />
						<div className="">Dateien hochladen</div>
					</div>
					{files.length > 0 && (
						<div className="p-2 bg-purple-100 rounded-lg">
							<span className="font-bold">{files.length}</span> Datei
							{files.length > 1 && 'en'}
						</div>
					)}
				</div>
				<Button
					type="submit"
					disabled={false}
					additionalClasses={`h-16 border-2 ${getUploadedStatusStyles(
						uploadStatus
					)}`}
				>
					Absenden{' '}
					{uploadStatus === 'success' && (
						<div className="w-6 h-6 ml-3 ease-linear border-2 border-t-2 border-white rounded-full border-opacity-30 loader"></div>
					)}
				</Button>
			</form>
			<div className="flex-1 hidden md:flex md:flex-col">
				<div
					{...getRootProps()}
					className={`flex items-center justify-center transition-all h-full relative duration-75 ease-in bg-purple-50 border-2 border-dashed rounded-md cursor-pointer border-gray-400 hover:bg-purple-100 hover:overscroll-y-auto`}
				>
					<input {...getInputProps()} type="file" />
					{files && files.length > 0 ? (
						<div className="absolute inset-0 grid grid-cols-2 gap-4 p-3 overflow-auto auto-rows-min lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
							{displayedFiles.map((file) => (
								<FileShowcase key={file.name} file={file} />
							))}
						</div>
					) : (
						<div className="flex flex-col items-center p-3 space-y-1 font-bold uppercase bg-purple-300 rounded-lg text-dark">
							<Image
								alt="Loading..."
								src="/assets/file_icon.svg"
								height={24}
								width={25.13}
							/>
							<div>Drop here</div>
						</div>
					)}
				</div>
			</div>
			<style jsx>{`
				.loader {
					border-top-color: #ffffff;
					-webkit-animation: spinner 1.5s linear infinite;
					animation: spinner 1.5s linear infinite;
				}

				@-webkit-keyframes spinner {
					0% {
						-webkit-transform: rotate(0deg);
					}
					100% {
						-webkit-transform: rotate(360deg);
					}
				}

				@keyframes spinner {
					0% {
						transform: rotate(0deg);
					}
					100% {
						transform: rotate(360deg);
					}
				}
			`}</style>
		</div>
	);
}
