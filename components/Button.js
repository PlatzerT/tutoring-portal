import React from 'react';

export default function Button({
	children,
	type,
	additionalClasses,
	...props
}) {
	return (
		<button
			{...props}
			className={`text-lg font-bold text-white transition-all rounded-md bg-gradient-to-r from-purple-900 to-purple-500 hover:opacity-90 ${additionalClasses}`}
		>
			{children}
		</button>
	);
}
