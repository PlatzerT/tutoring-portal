import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsItemModal from './NewsItemModal';

export default function NewsItem({ details }) {
	const { imagePath, title } = details;
	const createdAt = new Date(details.createdAt);
	const [showModal, setShowModal] = useState(false);

	function toggleModal(e) {
		setShowModal(true);
	}

	return (
		<div className="relative">
			<img
				src={imagePath}
				alt="Loading..."
				layout="responsive"
				height={600}
				width={900}
			/>
			<div
				className="absolute inset-0 flex flex-col justify-start p-4 transition-all duration-100 bg-black cursor-pointer hover:bg-opacity-30 bg-opacity-60"
				onClick={toggleModal}
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
		</div>
	);
}
