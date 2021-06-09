import Image from 'next/image';
import React from 'react';
import Header from 'components/Header';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
	const router = useRouter();
	return (
		<div className="flex items-center justify-center h-full">
			<Header title="Error" />
			<div className="flex flex-col space-y-5 text-center">
				<Image
					src="/assets/404.png"
					height={300}
					width={550}
					alt="Loading..."
				/>
				<div className="text-lg font-bold text-dark">
					Diese Seite existiert nicht
				</div>
				<button
					className="self-center px-6 py-3 font-semibold text-white rounded-md hover:bg-dark bg-primary"
					onClick={(e) => router.push('/')}
				>
					Home
				</button>
			</div>
		</div>
	);
}
