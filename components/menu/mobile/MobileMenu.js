import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import MobileMenuItem from './MobileMenuItem';

const normalLinkStyles =
	'text-dark hover:bg-gray-100 font-bold uppercase tracking-wider w-full';

export default function MobileMenu() {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex cursor-pointer">
				<Link href="/">
					<Image src="/logo_mobile_light_mode.svg" width={32} height={32} />
				</Link>
			</div>

			<div className="flex p-2 rounded-lg hover:bg-gray-200">
				<Image
					src="/menu_mobile_light_mode.svg "
					width={32}
					height={32}
					className="cursor-pointer"
					onClick={() => setShowMenu(!showMenu)}
				/>
			</div>

			{showMenu && (
				<div className="fixed inset-0 z-20 flex flex-col bg-black bg-opacity-40">
					<div className="flex flex-col items-center justify-center h-full bg-white dark:bg-dark">
						<div className="flex flex-col w-3/4 space-y-6">
							<div
								className="fixed flex p-2 rounded-lg cursor-pointer hover:bg-gray-200 right-8 top-10"
								onClick={() => setShowMenu(!showMenu)}
							>
								<Image src="/close.svg" height={32} width={32} />
							</div>
							<MobileMenuItem
								iconPath="/about.svg"
								to="/about"
								label="Über mich"
								additionalClasses={normalLinkStyles}
							/>
							<MobileMenuItem
								iconPath="/news.svg"
								to="/news"
								label="News"
								additionalClasses={normalLinkStyles}
							/>
							<MobileMenuItem
								iconPath="/imprint.svg"
								to="/imprint"
								label="Impressum"
								additionalClasses={normalLinkStyles}
							/>
							<MobileMenuItem
								iconPath="/downloads.svg"
								to="/imprint"
								label="Downloads"
								additionalClasses={normalLinkStyles}
							/>
							<MobileMenuItem
								to="/contact"
								label="KONTAKTIEREN"
								additionalClasses="bg-primary text-white font-semibold text-lg hover:opacity-90 justify-start"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
