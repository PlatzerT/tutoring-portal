import React from 'react';
import Image from 'next/image';
import Layout from './Layout';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="text-white bg-dark">
			<div className="container flex flex-col flex-wrap py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
				<div className="flex-shrink-0 w-64 mx-auto mt-10 text-center md:mx-0 md:text-left md:mt-0">
					<a className="flex items-center justify-center font-medium text-white md:justify-start">
						<Image
							alt="Loading..."
							src="/assets/logo_mobile_dark_mode.svg"
							height={30}
							width={30}
						/>
						<span className="ml-3 text-xl">Thomas Platzer</span>
					</a>
					<p className="mt-2 text-sm text-gray-500">
						Erhalte sofort Nachhilfe!
					</p>
					<button className="px-4 py-2 mt-3 border border-transparent rounded-md hover:border-white bg-primary">
						Los geht's
					</button>
				</div>
				<div className="flex flex-wrap flex-grow order-first -mb-10 text-center md:pr-20 md:text-left">
					<div className="w-full px-4 lg:w-1/4 md:w-1/2">
						<h2 className="mb-3 text-sm font-medium tracking-widest uppercase title-font">
							Navigation
						</h2>
						<nav className="mb-10 list-none">
							<li>
								<Link href="/news">
									<a className="text-gray-600 cursor-pointer hover:text-gray-800">
										News
									</a>
								</Link>
							</li>
							<li>
								<Link href="/sitemap">
									<a className="text-gray-600 cursor-pointer hover:text-gray-800">
										Sitemap
									</a>
								</Link>
							</li>
							<li>
								<Link href="/location">
									<a className="text-gray-600 cursor-pointer hover:text-gray-800">
										Lageplan
									</a>
								</Link>
							</li>
							<li>
								<Link href="/imprint">
									<a className="text-gray-600 cursor-pointer hover:text-gray-800">
										Impressum
									</a>
								</Link>
							</li>
							<li>
								<Link href="/downloads">
									<a className="text-gray-600 cursor-pointer hover:text-gray-800">
										Downloads
									</a>
								</Link>
							</li>
							<li>
								<Link href="/contact">
									<a className="text-gray-600 cursor-pointer hover:text-gray-800">
										Kontakt
									</a>
								</Link>
							</li>
						</nav>
					</div>
					<div className="w-full px-4 lg:w-1/4 md:w-1/2">
						<h2 className="mb-3 text-sm font-medium tracking-widest uppercase title-font">
							Kontakt
						</h2>
						<nav className="mb-10 list-none">
							<li>
								<a
									href="mailto:th-platzer@gmx.at"
									className="text-gray-600 underline cursor-pointer hover:text-gray-800"
								>
									th-platzer@gmx.at
								</a>
							</li>
							<li>
								<a
									href="mailto:thomas.platzer@htl-wels.at"
									className="text-gray-600 underline cursor-pointer hover:text-gray-800"
								>
									thomas.platzer@htl-wels.at
								</a>
							</li>
							<li>
								<a className="text-gray-600">0650/4029770</a>
							</li>
						</nav>
					</div>
				</div>
			</div>
			<div className="bg-gray-900">
				<div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
					<p className="text-sm text-center text-gray-500 sm:text-left">
						© 2020 Thomas Platzer
					</p>
				</div>
			</div>
		</footer>
	);
}
