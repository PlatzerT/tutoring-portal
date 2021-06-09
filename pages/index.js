import Head from 'next/head';
import Image from 'next/image';
import prisma from 'lib/prisma';
import Menu from 'components/menu/Menu';
import Link from 'next/link';
import Header from 'components/Header';
import Layout from '../components/Layout';

export default function Home({ subjects }) {
	return (
		<div className="flex flex-col h-full ">
			<Header title="Nachhilfe | Home" />
			<div className="relative z-50">
				<Menu />
			</div>

			<main className="relative z-10 flex flex-col justify-start lg:flex-1 lg:justify-center">
				<div className="space-y-0 sm:space-y-1 md:space-y-15 md:flex md:flex-col lg:flex-row lg:justify-around lg:mb-16">
					{/* Hero section */}
					<div className="flex flex-col items-center justify-center">
						<div className="flex flex-col w-full space-y-5">
							<div className="text-5xl font-bold">
								<span className="text-primary">Noten</span> verbessern.
							</div>
							<div className="flex flex-col space-y-4">
								<div className="font-medium w-96">
									Du hast es satt schlechte Noten zu schreiben, hast aber jetzt
									die Motivation dich zu verbessern ✅
								</div>
								<div className="flex flex-col space-y-1 text-sm">
									<div>Erhalte Nachhilfe in:</div>

									<div className="flex space-x-3">
										{subjects.map((subject) => (
											<div
												key={subject.abbreviation}
												className="px-1 font-semibold text-gray-800 bg-gray-100 border border-gray-800 rounded-sm"
											>
												{subject.abbreviation}
											</div>
										))}
									</div>
								</div>

								<Link href="/contact">
									<a className="self-start px-5 py-3 font-bold tracking-wider text-center text-white uppercase rounded bg-dark hover:bg-primary">
										Kontaktieren
									</a>
								</Link>
							</div>
						</div>
					</div>
					<div className="flex self-center">
						<Image
							alt="Loading..."
							src="/assets/exams_illustration.svg"
							layout="fixed"
							height={400}
							width={400}
						/>
					</div>
				</div>
			</main>
			<div className="hidden sm:flex">
				<Image
					alt="Loading..."
					src="/assets/bg_dark.svg"
					layout="fill"
					objectFit="cover"
				/>
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
