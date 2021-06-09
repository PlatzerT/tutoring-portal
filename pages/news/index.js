import React from 'react';
import Menu from 'components/menu/Menu';
import prisma from 'lib/prisma';
import NewsList from 'components/news/NewsList';

export default function NewsPage({ news }) {
	return (
		<div>
			<Header title="Nachhilfe | News" />
			<Menu />
			<div className="mb-10 text-5xl font-bold text-dark">News</div>
			<hr />
			<div className="my-4">
				<NewsList news={news} />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const news = await prisma.news.findMany({
		select: {
			id: true,
			title: true,
			body: true,
			imagePath: true,
			createdAt: true,
		},
	});
	let formattedNews = [];
	if (news) {
		formattedNews = news.map((newsItem) => {
			const { createdAt, ...rest } = newsItem;
			const stringifiedDate = createdAt.toString();
			return { createdAt: stringifiedDate, ...rest };
		});
	}

	return {
		props: {
			news: formattedNews,
		},
	};
}
