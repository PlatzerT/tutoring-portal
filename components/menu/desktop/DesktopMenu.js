import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import DesktopMenuItem from './DesktopMenuItem';

const normalLinkStyles =
	'text-dark hover:bg-gray-100 text-sm font-semibold uppercase';

export default function DesktopMenu() {
	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex cursor-pointer">
				<Link href="/">
					<div className="flex">
						<Image
							src="/logo_mobile_light_mode.svg"
							width={32}
							height={32}
							layout="fixed"
						/>
					</div>
				</Link>
			</div>
			<div className="flex items-center justify-between space-x-5">
				<DesktopMenuItem
					label="Über mich"
					to="/about"
					additionalClasses={normalLinkStyles}
				/>

				<DesktopMenuItem
					label="News"
					to="/news"
					additionalClasses={normalLinkStyles}
				/>
				<DesktopMenuItem
					label="Impressum"
					to="/imprint"
					additionalClasses={normalLinkStyles}
				/>
				<DesktopMenuItem
					label="Downloads"
					to="/downloads"
					additionalClasses={normalLinkStyles}
				/>
				<DesktopMenuItem
					label="Kontaktieren"
					to="/contact"
					additionalClasses="bg-primary text-sm text-white font-bold hover:opacity-90 uppercase"
				/>
			</div>
		</div>
	);
}
