import Image from 'next/image';
import React, { useState } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';

export default function FileShowcase({ file }) {
	const ext = file.name.slice(file.name.indexOf('.') + 1);
	return (
		<div className="flex flex-col p-6 space-y-3 bg-purple-200 rounded-md shadow-sm border-primary">
			<FileIcon extension={ext} {...defaultStyles[ext]} />

			<div className="px-2 py-1 font-semibold truncate rounded text-dark">
				{file.name}
			</div>
		</div>
	);
}
