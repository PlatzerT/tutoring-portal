import React from 'react';

export default function Layout({ children }) {
	return (
		<div className="flex flex-col h-full mx-8 md:container md:mx-auto">
			{children}
		</div>
	);
}
