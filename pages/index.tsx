import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Acid } from '../components/acid';
import useWindowDimensions from '../components/useWindowDimension';

const Home: NextPage = () => {
	const { width, height } = useWindowDimensions();

	return (
		<div className={styles.container}>
			<Head>
				<title>acid.church</title>
				<meta name="description" content="Generated by create next app"/>
				<link rel="icon"
				      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💒</text></svg>"/>
			</Head>

			<Acid width={width} height={height} refreshRate={50}/>

			<footer className={styles.footer}>
				Ether by <a target="_blank" rel="noreferrer"
				            href="https://www.shadertoy.com/user/nimitz">nimitz</a> (c) 2014
				<a target="_blank" rel="license"
				   href="http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en_US">
					<img
						alt="Creative Commons License"
						src="http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png"/></a>
			</footer>
		</div>
	)
}

export default Home
