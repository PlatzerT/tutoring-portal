import React from 'react';
import Menu from 'components/menu/Menu';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';

export default function SitemapPage() {
	return (
		<div className="h-full">
			<Header title="Nachhilfe | Sitemap" />
			<Menu />
			<h1 className="h1">Sitemap</h1>
			<div className="">
				<div className="flex flex-col space-y-2 max-w-max">
					<Link href="/">
						<a className="px-8 py-3 text-center text-white border-2 border-transparent bg-dark hover:bg-white hover:text-primary hover:border-purple-800">
							Home
						</a>
					</Link>
					<Link href="/news">
						<a className="px-8 py-3 text-center text-white border-2 border-transparent bg-dark hover:bg-white hover:text-primary hover:border-purple-800">
							News
						</a>
					</Link>
					<Link href="/sitemap">
						<a className="px-8 py-3 text-center text-white border-2 border-transparent bg-dark hover:bg-white hover:text-primary hover:border-purple-800">
							Sitemap
						</a>
					</Link>
					<Link href="/location">
						<a className="px-8 py-3 text-center text-white border-2 border-transparent bg-dark hover:bg-white hover:text-primary hover:border-purple-800">
							Lageplan
						</a>
					</Link>
					<Link href="/imprint">
						<a className="px-8 py-3 text-center text-white border-2 border-transparent bg-dark hover:bg-white hover:text-primary hover:border-purple-800">
							Impressum
						</a>
					</Link>
					<Link href="/downloads">
						<a className="px-8 py-3 text-center text-white border-2 border-transparent bg-dark hover:bg-white hover:text-primary hover:border-purple-800">
							Downloads
						</a>
					</Link>
					<Link href="/contact">
						<a className="px-8 py-3 text-center text-white border-2 border-transparent bg-dark hover:bg-white hover:text-primary hover:border-purple-800">
							Kontakt
						</a>
					</Link>
				</div>
			</div>

			<style jsx>{`
				.main-page {
					@apply: px-8;
					@apply: py-3;
				}
			`}</style>
		</div>
	);
}
