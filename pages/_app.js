import Layout from '../components/Layout';
import Menu from '../components/menu/Menu';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<div className="w-screen h-screen">
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</div>
	);
}

export default MyApp;
