import Image from 'next/image';
import React from 'react';

export default function NotFoundPage() {
	return (
		<div className="flex items-center justify-center h-full">
			<div className="flex flex-col space-y-5 text-center">
				<Image src="/assets/404.png" height={300} width={550} />
				<div className="text-lg font-bold text-dark">
					Diese Seite existiert nicht
				</div>
				<button className="self-center px-6 py-3 font-semibold text-white rounded-md hover:bg-dark bg-primary">
					Home
				</button>
			</div>
		</div>
	);
}