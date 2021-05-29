import React from 'react';

export default function Button({ label, type, ...props }) {
	return (
		<div className="h-16">
			<button
				{...props}
				className="w-full h-full text-lg font-bold text-white bg-gray-500 rounded-md gradient-button"
			>
				{label}
			</button>
		</div>
	);
}
