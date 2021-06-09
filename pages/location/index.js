import React from 'react';
import Menu from 'components/menu/Menu';
import Image from 'next/image';
import Header from 'components/Header';

export default function LocationPage() {
	return (
		<div className="flex flex-col h-full pb-20">
			<Header title="Nachhilfe | Lageplan" />
			<Menu />
			<h1 className="h1">Lageplan</h1>
			<div className="flex-1">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2670.2450524814035!2d13.983418416240859!3d47.989651169430154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773e5192444cb7d%3A0xf262522ee996b9f2!2sHieberg%205%2C%204643%20Lungendorf!5e0!3m2!1sde!2sat!4v1623242566820!5m2!1sde!2sat"
					className="w-full h-full border-0"
					allowfullscreen=""
					loading="lazy"
				></iframe>
			</div>
			<style jsx>{`
				.custom-max-height {
					max-height: 800px;
				}
			`}</style>
		</div>
	);
}
