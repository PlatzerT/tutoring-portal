import Image from 'next/image';
import React, { useState } from 'react';

export default function FileShowcase({ file }) {
	return (
		<div className="relative w-full p-6 mb-4 overflow-hidden rounded-md shadow-sm border-primary break bg-purple-50">
			<div className="px-2 py-1 font-semibold break-words bg-purple-200 rounded text-dark">
				{file.name}
			</div>
			<style jsx>{`
				.break {
					break-inside: avoid;
				}
			`}</style>
		</div>
	);
}
