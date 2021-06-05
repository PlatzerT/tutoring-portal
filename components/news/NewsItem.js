import React, { useState } from 'react';
import Image from 'next/image';
import NewsItemModal from './NewsItemModal';

export default function NewsItem({ details }) {
	const { imagePath, title, body } = details;
	const createdAt = new Date(details.createdAt);
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="relative inline-block rounded-lg wrapper h-96">
			<Image
				src={imagePath}
				layout="fill"
				className="round"
				objectFit="cover"
			/>
			<div
				className="absolute inset-0 flex flex-col justify-start p-4 transition-all duration-100 bg-black cursor-pointer rounded-xl hover:bg-opacity-30 bg-opacity-60"
				onClick={(e) => setShowModal(true)}
			>
				<div className="text-white">
					<div>
						{createdAt.toLocaleString('default', { month: 'short' })}{' '}
						{createdAt.getDate()}, {createdAt.getFullYear()} ▪︎{' '}
						{createdAt.getHours()}:{createdAt.getMinutes()}
					</div>
					<h2 className="mt-8 text-3xl font-semibold">{title}</h2>
				</div>
			</div>
			{showModal && (
				<NewsItemModal details={details} onClick={(e) => setShowModal(false)} />
			)}
			<style jsx global>{`
				.round {
					border-radius: 0.75rem /* 12px */;
				}
			`}</style>
		</div>
	);
}
