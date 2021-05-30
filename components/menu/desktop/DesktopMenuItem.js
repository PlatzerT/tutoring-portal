import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function DesktopMenuItem({ label, to, additionalClasses }) {
	return (
		<div>
			<Link href={to}>
				<button
					className={`flex items-center px-4 py-3 rounded-md ${additionalClasses}`}
				>
					<div>{label}</div>
				</button>
			</Link>
		</div>
	);
}
