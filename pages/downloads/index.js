import React from 'react';
import Menu from 'components/menu/Menu';
import DownloadableFilesList from 'components/downloads/DownloadableFilesList';

export default function DownloadsPage({ downloadableFiles }) {
	return (
		<div className="text-dark">
			<Header title="Nachhilfe | Downloads" />
			<Menu />
			<h1 className="mb-10 text-5xl font-bold">Downloads</h1>
			<hr />
			<div className="my-4">
				<DownloadableFilesList files={downloadableFiles} />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const downloadableFiles = await prisma.download.findMany({
		select: {
			id: true,
			fileName: true,
			filePath: true,
			createdAt: true,
		},
	});
	let formattedDownloadableFiles = [];
	if (downloadableFiles) {
		formattedDownloadableFiles = downloadableFiles.map(
			(downloadableFileItem) => {
				const { createdAt, ...rest } = downloadableFileItem;
				const stringifiedDate = createdAt.toString();
				return { createdAt: stringifiedDate, ...rest };
			}
		);
	}

	return {
		props: {
			downloadableFiles: formattedDownloadableFiles,
		},
	};
}
