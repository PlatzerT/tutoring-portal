import React from 'react';
import Menu from 'components/menu/Menu';

import NewsList from 'components/news/NewsList';
import Header from 'components/Header';

export default function NewsPage({ news }) {
	console.log(news);
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
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`);
	const news = await res.json();
	console.log(news);
	return {
		props: {
			news,
		},
	};
}
