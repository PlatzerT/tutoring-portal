import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsItemModal from './NewsItemModal';

export default function NewsItem({ details }) {
	const { coverPath, title } = details;
	const updatedAt = new Date(details.updatedAt);
	const [showModal, setShowModal] = useState(false);

	function toggleModal(e) {
		setShowModal(true);
	}

	return (
		<div className="relative">
			<img
				src={coverPath}
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
						{updatedAt.toLocaleString('default', { month: 'short' })}{' '}
						{updatedAt.getDate()}, {updatedAt.getFullYear()} ▪︎{' '}
						{updatedAt.getHours()}:{updatedAt.getMinutes()}
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
