import React, { useState } from 'react';
import Link from 'next/link';
import path from 'path';
import axios from 'axios';
import Image from 'next/image';
const root = process.cwd();

export default function TestPage() {
	return (
		<div>
			<video
				autoPlay
				loop
				src={require('../public/assets/learning_video.mp4')}
			/>
		</div>
	);
}
