import React from 'react';
import Menu from 'components/menu/Menu';

export default function ImprintPage() {
	return (
		<div className="text-dark">
			<Menu />
			<h1 className="mb-10 text-5xl font-bold md:flex text-dark">Impressum</h1>
			<div className="flex flex-col space-y-6">
				<div>
					<div className="font-bold">TPlatzer</div>
					<div>Firmeninhaber: Thomas Platzer</div>
					<div>Hieberg 5</div>
					<div>4643 Pettenbach</div>
				</div>
				<div>
					<div>Telefon: 0650/4029770</div>
					<div>Fax: 0650/4029770</div>
					<div>E-Mail: th-platzer@gmx.at</div>
				</div>
				<div>
					<div>
						Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
					</div>
					<div>
						Wirtschaftsidentikifationsnummer gemäß §139 c Abgabeordnung:
					</div>
				</div>
			</div>
		</div>
	);
}
