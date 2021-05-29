import Image from 'next/image';
import React from 'react';

export default function MobileMenu() {
	return (
		<div className="flex justify-between w-full">
			<Image src="/logo_mobile_light_mode.svg" width={32} height={32} />
			<Image src="/menu_mobile_light_mode.svg" width={32} height={32} />
		</div>
	);
}
