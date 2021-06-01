import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function DesktopMenuItem({ label, to, additionalClasses }) {
	const router = useRouter();
	return (
		<Link href={to}>
			<a
				className={`px-4 py-3 rounded-md ${additionalClasses} ${
					router.pathname === to ? 'bg-purple-50' : ''
				}`}
			>
				<div>{label}</div>
			</a>
		</Link>
	);
}
