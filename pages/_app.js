import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Menu from '../components/menu/Menu';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	const router = useRouter();

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
