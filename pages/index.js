import Head from 'next/head';
import Image from 'next/image';
import prisma from 'lib/prisma';

export default function Home({ files }) {
	return (
		<div>
			{files.map((file) => (
				<Image src={file.imagePath} height={75} width={75} />
			))}
		</div>
	);
}

export async function getStaticProps() {
	const files = await prisma.file.findMany();
	return {
		props: {
			files,
		},
	};
}
