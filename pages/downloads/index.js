import React from 'react';
import Menu from 'components/menu/Menu';
import DownloadableFilesList from 'components/downloads/DownloadableFilesList';
import Header from 'components/Header';

export default function DownloadsPage({ downloadableFiles }) {
	return (
		<div className="text-dark">
			<Header title="Nachhilfe | Downloads" />
			<Menu />
			<h1 className="h1">Downloads</h1>
			<hr />
			<div className="my-4">
				<DownloadableFilesList files={downloadableFiles} />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/downloadable-files`
	);
	const downloadableFiles = await res.json();

	return {
		props: {
			downloadableFiles,
		},
	};
}
