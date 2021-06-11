import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Header from 'components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	if (router.pathname === '/') {
		return (
			<div className="w-screen">
				<Component {...pageProps} />
				<Footer />
			</div>
		);
	}

	return (
		<div className="h-screen ">
			<Layout>
				<Component {...pageProps} />
			</Layout>
			<Footer />
		</div>
	);
}

export default MyApp;
