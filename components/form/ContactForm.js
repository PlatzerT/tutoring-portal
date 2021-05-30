import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../Button';
import InputField from './InputField';

export default function ContactForm({ subjects }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [selectedSubject, setSelectedSubject] = useState(subjects[0] || '');
	const [file, setFile] = useState(null);

	async function handleSubmit(e) {
		const form = new FormData();
		form.append('name', name);
		form.append('email', email);
		form.append('message', message);
		form.append('subjectID', selectedSubject);
		form.append('file', file);
		e.preventDefault();
		await fetch('/api/contact', {
			method: 'POST',
			body: form,
		});
	}

	function loadFile(e) {
		const target = e.target;
		setFile(target.files[0]);
	}
	return (
		<div>
			<form name="contactForm" className="flex flex-col space-y-5">
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
						className="w-full px-2 py-1 align-top transition-all duration-75 border-2 border-black focus:border-purple-800 hover:border-purple-800 rounded-r-md rounded-b-md h-44"
						value={message}
						onChange={(e) => setMessage(e.currentTarget.value)}
						required
					></textarea>
				</div>
				<div className="flex-1">
					<div>Files</div>
					<label
						className={`flex ${
							file ? 'bg-purple-100 ' : ''
						} hover:bg-purple-50 cursor-pointer duration-75 h-24 items-center justify-center w-full px-2 overflow-auto space-x-2 align-top transition-all ease-in border-2 border-black border-dashed hover:border-solid rounded-r-md rounded-b-md`}
					>
						<input
							type="file"
							name="file"
							accept="file/png, file/jpeg"
							className="hidden"
							onChange={loadFile}
							required
						/>
						{file ? (
							<div className="flex items-center justify-center w-5/6 space-x-5 font-semibold">
								{file.type.startsWith('image') && (
									<img src={URL.createObjectURL(file)} height="40" width="60" />
								)}

								<div>{file.name}</div>
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
		</div>
	);
}
