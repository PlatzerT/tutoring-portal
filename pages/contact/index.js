import React from 'react';
import ContactForm from 'components/form/ContactForm';
import Menu from 'components/menu/Menu';
import prisma from 'lib/prisma';

export default function ContactPage({ subjects }) {
	return (
		<div>
			<Menu />
			<div className="mt-12">
				<ContactForm subjects={subjects} />
			</div>
		</div>
	);
}

export async function getStaticProps() {
	const subjects = await prisma.subject.findMany();
	return {
		props: {
			subjects,
		},
	};
}
