import React from 'react';
import NewsItem from './NewsItem';

export default function NewsList({ news }) {
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
			{news.map((newsItem) => (
				<NewsItem key={newsItem.title} details={newsItem} />
			))}
		</div>
	);
}
