import React from 'react';
import Image from 'next/image';
import Layout from './Layout';

export default function Footer() {
	return (
		<footer class="bg-dark text-white">
			<div class="container py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
				<div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
					<a class="flex text-white font-medium items-center md:justify-start justify-center">
						<Image
							src="/assets/logo_mobile_dark_mode.svg"
							height={30}
							width={30}
						/>
						<span class="ml-3 text-xl">Thomas Platzer</span>
					</a>
					<p class="mt-2 text-sm text-gray-500">Erhalte sofort Nachhilfe!</p>
					<button className="px-4 py-2 mt-3 border border-transparent rounded-md hover:border-white bg-primary">
						Los geht's
					</button>
				</div>
				<div class="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
					<div class="lg:w-1/4 md:w-1/2 w-full px-4">
						<h2 class="title-font uppercase font-medium tracking-widest text-sm mb-3">
							Navigation
						</h2>
						<nav class="list-none mb-10">
							<li>
								<a class="text-gray-600 cursor-pointer hover:text-gray-800">
									News
								</a>
							</li>
							<li>
								<a class="text-gray-600 cursor-pointer hover:text-gray-800">
									Sitemap
								</a>
							</li>
							<li>
								<a class="text-gray-600 cursor-pointer hover:text-gray-800">
									Impressum
								</a>
							</li>
							<li>
								<a class="text-gray-600 cursor-pointer hover:text-gray-800">
									Downloads
								</a>
							</li>
							<li>
								<a class="text-gray-600 cursor-pointer hover:text-gray-800">
									Kontakt
								</a>
							</li>
						</nav>
					</div>
					<div class="lg:w-1/4 md:w-1/2 w-full px-4">
						<h2 class="title-font uppercase font-medium tracking-widest text-sm mb-3">
							Kontakt
						</h2>
						<nav class="list-none mb-10">
							<li>
								<a
									href="mailto:th-platzer@gmx.at"
									class="text-gray-600 cursor-pointer underline hover:text-gray-800"
								>
									th-platzer@gmx.at
								</a>
							</li>
							<li>
								<a
									href="mailto:thomas.platzer@htl-wels.at"
									class="text-gray-600 cursor-pointer underline hover:text-gray-800"
								>
									thomas.platzer@htl-wels.at
								</a>
							</li>
							<li>
								<a class="text-gray-600 hover:text-gray-800">0650/4029770</a>
							</li>
						</nav>
					</div>
				</div>
			</div>
			<div class="bg-gray-900">
				<div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
					<p class="text-gray-500 text-sm text-center sm:text-left">
						© 2020 Thomas Platzer
					</p>
				</div>
			</div>
		</footer>
	);
}
