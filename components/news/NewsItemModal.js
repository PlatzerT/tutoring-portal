import Image from 'next/image';
import React, { useEffect } from 'react';
import Button from 'components/Button';

export default function NewsItemModal({ details, onClick }) {
	const { coverPath, title, content } = details;
	const updatedAt = new Date(details.updatedAt);
	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-dark"
			onClick={onClick}
		>
			<div
				className="relative flex flex-col w-10/12 max-w-2xl px-8 py-12 space-y-4 bg-white rounded-md"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="relative">
					<img src={coverPath} />
				</div>
				<div className="flex flex-col space-y-4">
					<div className="flex justify-between">
						<div className="flex-1 text-3xl font-bold text-primary">
							{title}
						</div>
						<div className="text-sm text-gray-500">
							{updatedAt.toLocaleString('default', { month: 'short' })}{' '}
							{updatedAt.getDate()}, {updatedAt.getFullYear()} ▪︎{' '}
							{updatedAt.getHours()}:{updatedAt.getMinutes()}
						</div>
					</div>
					<div className="overflow-y-scroll h-60">{content}</div>
				</div>
				<Button
					type="button"
					disabled={false}
					additionalClasses="h-12"
					onClick={onClick}
				>
					Schließen
				</Button>
			</div>
		</div>
	);
}
