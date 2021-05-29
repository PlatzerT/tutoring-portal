import React from 'react';

export default function Button({ label, type, ...props }) {
	return (
		<div className="h-16">
			<button
				{...props}
				className="w-full h-full text-lg font-bold text-white transition-all rounded-md bg-gradient-to-r from-purple-900 to-purple-500 hover:opacity-90"
			>
				{label}
			</button>
		</div>
	);
}
