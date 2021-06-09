import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import DesktopMenuItem from './DesktopMenuItem';

const normalLinkStyles =
	'text-dark hover:bg-purple-100 text-sm font-semibold uppercase';

export default function DesktopMenu() {
	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex cursor-pointer">
				<Link href="/">
					<div className="flex p-1 rounded hover:bg-purple-100">
						<Image
							src="/assets/logo_mobile_light_mode.svg"
							width={32}
							height={32}
							layout="fixed"
						/>
					</div>
				</Link>
			</div>
			<div className="flex items-center justify-between space-x-5">
				<DesktopMenuItem
					label="News"
					to="/news"
					additionalClasses={normalLinkStyles}
				/>
				<DesktopMenuItem
					label="Sitemap"
					to="/sitemap"
					additionalClasses={normalLinkStyles}
				/>
				<DesktopMenuItem
					label="Lageplan"
					to="/location"
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
				<Link href="/contact">
					<a className="flex p-3 rounded-md bg-primary hover:bg-dark">
						<Image src="/assets/pencil-fill.svg" height={20} width={20} />
					</a>
				</Link>
			</div>
		</div>
	);
}
