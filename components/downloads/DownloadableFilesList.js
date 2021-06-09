import React from 'react';
import DownloadableFilesItem from './DownloadableFilesItem';

export default function DownloadableFilesList({ files }) {
	return (
		<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{files.map((file) => (
				<DownloadableFilesItem key={file.id} details={file} />
			))}
		</div>
	);
}
