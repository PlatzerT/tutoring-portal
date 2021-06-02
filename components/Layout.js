import React from 'react';

export default function Layout({ children }) {
	return (
		<div className="h-screen mx-8 md:container md:mx-auto">{children}</div>
	);
}
