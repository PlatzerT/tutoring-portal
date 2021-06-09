import React from 'react';
import ContactForm from 'components/form/ContactForm';
import Menu from 'components/menu/Menu';

import Header from 'components/Header';

export default function ContactPage({ subjects }) {
	return (
		<div className="h-full">
			<Header title="Nachhilfe | Kontakt" />
			<Menu />
			<h1 className="hidden md:flex h1">Kontaktiere mich! 💬</h1>
			<ContactForm subjects={subjects} />
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subjects`);
	const subjects = await res.json();

	return {
		props: {
			subjects,
		},
	};
}
