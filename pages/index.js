import Image from 'next/image';
import Menu from 'components/menu/Menu';
import Link from 'next/link';
import Header from 'components/Header';
import Layout from '../components/Layout';

export default function Home({ subjects }) {
	return (
		<div className="flex flex-col w-full sm:space-y-20">
			<Layout>
				<Header title="Nachhilfe | Home" />
				<Menu />

				<main className="flex flex-col justify-start lg:flex-1 lg:justify-center">
					<div className="space-y-0 sm:space-y-1 md:space-y-15 md:flex md:flex-col lg:flex-row lg:justify-around lg:mb-40">
						{/* Hero section */}
						<div className="flex flex-col items-center justify-center">
							<div className="flex flex-col w-full space-y-5">
								<div className="font-extrabold text-8xl">
									<span className="">Noten</span> verbessern.
								</div>
								<div className="flex flex-col">
									<div className="text-lg text-gray-600">
										Du hast es satt schlechte Noten zu schreiben, hast aber
										jetzt die Motivation dich zu verbessern.
									</div>
									<div className="flex mt-4 space-x-5 text-sm">
										<div>Nachhilfe:</div>
										<div className="flex space-x-3">
											{subjects.map((subject) => (
												<div
													key={subject.abbreviation}
													className="px-2 text-purple-700 bg-purple-100 rounded-lg"
												>
													{subject.abbreviation}
												</div>
											))}
										</div>
									</div>

									<Link href="/contact">
										<a className="self-start px-8 py-3 mt-10 text-white transition-all rounded-md focus:ring-offset-white focus:ring-offset-2 focus:ring-2 focus:ring-dark bg-dark">
											Kontaktieren
										</a>
									</Link>
								</div>
							</div>
						</div>
						{/* Exam illustration */}
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
			</Layout>

			{/* Video */}
			<div className="flex justify-center mb-12 md:mb-0">
				<video
					className="w-10/12 max-w-5xl shadow-2xl md:w-8/12"
					autoPlay
					loop
					src={require('../public/assets/learning_video.mp4')}
				/>
			</div>

			{/* Transition to footer */}
			<div className="hidden sm:flex">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
					<path
						fill="#212121"
						fill-opacity="1"
						d="M0,96L26.7,117.3C53.3,139,107,181,160,181.3C213.3,181,267,139,320,138.7C373.3,139,427,181,480,176C533.3,171,587,117,640,90.7C693.3,64,747,64,800,74.7C853.3,85,907,107,960,149.3C1013.3,192,1067,256,1120,245.3C1173.3,235,1227,149,1280,117.3C1333.3,85,1387,107,1413,117.3L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
					></path>
				</svg>
			</div>
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
