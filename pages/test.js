import React, { useState } from 'react';
import Link from 'next/link';
import path from 'path';
import axios from 'axios';
import Image from 'next/image';
const root = process.cwd();

export default function TestPage() {
	const [url, setUrl] = useState(null);
	async function download(e) {
		e.preventDefault();
		const res = await fetch('/api/news');
		const info = await res.json();
		console.log(info[0].coverPath);
		setUrl(
			`${process.env.NEXT_PUBLIC_BASE_URL}${require('../news/1/cover.jpg')}`
		);
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
			{url && <img id="ok" src={url} height="100" />}

			<button onClick={download}>DL</button>
			<input type="file" name="file" accept="image/*" onChange={upload} />
		</div>
	);
}
