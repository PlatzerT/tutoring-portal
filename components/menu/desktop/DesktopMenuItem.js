import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function DesktopMenuItem({ label, to, additionalClasses }) {
	return (
		<Link href={to}>
			<a className={`px-4 py-3 rounded-md ${additionalClasses}`}>
				<div>{label}</div>
			</a>
		</Link>
	);
}
