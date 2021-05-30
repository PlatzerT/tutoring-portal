import React from 'react';
import DesktopMenu from './desktop/DesktopMenu';
import MobileMenu from './mobile/MobileMenu';

export default function Menu() {
	return (
		<div className="mt-10 mb-20">
			<div className="md:hidden">
				<MobileMenu />
			</div>
			<div className="hidden md:flex">
				<DesktopMenu />
			</div>
		</div>
	);
}
