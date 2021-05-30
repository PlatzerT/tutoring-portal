import Image from 'next/image';
import React, { useState } from 'react';

export default function FileShowcase({ file, onClick }) {
	const [showDelete, setShowDelete] = useState(false);
	console.log(file);
	return (
		<div
			className="relative p-6 border-2 border-opacity-50 border-dashed rounded-md border-primary bg-purple-50"
			onMouseOver={() => setShowDelete(true)}
			onMouseLeave={() => setShowDelete(false)}
		>
			{showDelete && (
				<div
					className="absolute inset-0 z-10 flex flex-col items-center justify-center space-y-2 bg-black bg-opacity-50 cursor-pointer bb"
					onClick={onClick}
				>
					<div className="px-2 py-1 font-bold text-white uppercase border border-white rounded bg-primary">
						Löschen
					</div>
				</div>
			)}
			{file.type.startsWith('image') && (
				<img src={URL.createObjectURL(file)} className="mb-3" />
			)}
			<div className="px-2 py-1 font-semibold break-words bg-purple-200 rounded text-dark">
				{file.name}
			</div>
		</div>
	);
}
