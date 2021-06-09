import React from 'react';
import ContactForm from 'components/form/ContactForm';
import Menu from 'components/menu/Menu';
import prisma from 'lib/prisma';
import Header from 'components/Header';

export default function ContactPage({ subjects }) {
	return (
		<div className="h-full">
			<Header title="Nachhilfe | Kontakt" />
			<Menu />
			<h1 className="hidden mb-10 text-5xl font-bold md:flex text-dark">
				Kontaktiere mich! 💬
			</h1>
			<ContactForm subjects={subjects} />
		</div>
	);
}

export async function getStaticProps() {
	const subjects = await prisma.subject.findMany({
		select: {
			id: true,
			abbreviation: true,
			fullName: true,
			contacts: false,
		},
	});
	return {
		props: {
			subjects,
		},
	};
}
