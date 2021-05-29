import React, { useState } from 'react';

export default function InputField({ label, additionalClasses, ...props }) {
	return (
		<div>
			<div>{label}</div>
			<input
				className={`w-full focus:border-purple-800 transition-all duration-75 hover:border-purple-800 border-2 border-black rounded-r-md rounded-b-md align-top px-2 py-1 ${additionalClasses}`}
				{...props}
			/>
		</div>
	);
}
