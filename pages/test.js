import React, { useState } from 'react';
import Link from 'next/link';
import path from 'path';
import axios from 'axios';
import Image from 'next/image';
const root = process.cwd();

export default function TestPage() {
	const [url, setUrl] = useState('');
	console.log('URL: ', url);
	async function download(e) {
		e.preventDefault();
		fetch('/api/news/download', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ imagePath: 'news/OK/AKG127067.jpg' }),
		})
			.then((res) => {
				return res.blob();
			})
			.then((blob) => {
				let url = URL.createObjectURL(blob);
				setUrl(url);
			});
	}

	async function upload(e) {
		const form = new FormData();
		form.append('title', 'OK');
		form.append('body', 'hshs');
		form.append('file', e.target.files[0]);
		e.preventDefault();
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		axios.post('/api/news/upload', form, config).catch((err) => {
			if (err.response.status === 400) {
				console.log(err.response.data);
			}
		});
	}
	return (
		<div>
			<img id="ok" src={url} height="100" />
			<button onClick={download}>DL</button>
			<input type="file" name="file" accept="image/*" onChange={upload} />
		</div>
	);
}
