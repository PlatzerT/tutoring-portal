import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

export default function MobileMenuItem({
	iconPath,
	label,
	to,
	additionalClasses,
}) {
	return (
		<Link href={to}>
			<a
				className={`flex items-center px-4 py-4 space-x-4 rounded-md ${additionalClasses}`}
			>
				{iconPath && (
					<div className="flex">
						<Image alt="Loading..." src={iconPath} height={32} width={32} />
					</div>
				)}

				<div className={`${iconPath ? '' : 'px-12'}`}>{label}</div>
			</a>
		</Link>
	);
}
