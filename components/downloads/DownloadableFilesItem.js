import React from 'react';

export default function DownloadableFilesItem({ details }) {
	const { fileName, filePath } = details;

	function download(e) {
		e.preventDefault();
		fetch('/api/downloadable-files/download', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ filePath: filePath }),
		})
			.then((res) => {
				return res.blob();
			})
			.then((blob) => {
				let url = URL.createObjectURL(blob);
				var a = document.createElement('a');
				document.body.appendChild(a);
				a.style = 'display: none';
				a.href = url;
				a.download = fileName;
				a.click();
				URL.revokeObjectURL(url);
				a.remove();
			});
	}

	return (
		<div className="flex items-center justify-between px-6 py-8 shadow-md">
			<div className="font-bold">{fileName}</div>
			<button
				className="px-3 py-1 text-white rounded-md bg-primary"
				onClick={download}
			>
				Download
			</button>
		</div>
	);
}
