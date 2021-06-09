import React from 'react';
import Menu from 'components/menu/Menu';
import Image from 'next/image';
import Header from 'components/Header';

export default function LocationPage() {
	return (
		<div className="h-full">
			<Header title="Nachhilfe | Lageplan" />
			<Menu />
		</div>
	);
}
