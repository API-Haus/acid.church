import React, { useRef } from 'react';
import { ShaderToy } from './ShaderToy';
// @ts-ignore
import shader from 'raw-loader!../shaders/ether.glsl';
import { Surface } from 'gl-react-dom';
import { FunkyRenderer } from './FunkyRenderer';
import Logo from '../public/ACID.png';
import { Bus } from 'gl-react';
import GLImage from 'gl-react-image';

const isServer = () => typeof window === `undefined`;

const uniformRGB = col => col.slice('rgb('.length, -1).split(',').map(parseFloat).map(v => v / 255);

export const Acid = ({ width, height, refreshRate = 60 }) => {
	const imageRef = useRef(null);

	if (isServer() || !width || !height)
		return null;

	const pixelRatio = window.devicePixelRatio;

	return (
		<Surface style={{ backgroundColor: 'black' }} width={width} height={height}
		         pixelRatio={pixelRatio}>
			<Bus ref={imageRef}>
				<GLImage
					source={Logo.src}
					resizeMode="contain"
				/>
			</Bus>
			<FunkyRenderer overlay={() => imageRef.current}>
				<ShaderToy refreshRate={refreshRate} shader={shader} width={width * pixelRatio}
				           height={height * pixelRatio}
				           color={uniformRGB('rgb(102,25,25)')}/>
			</FunkyRenderer>
		</Surface>
	)
}
export const origCol = uniformRGB('rgb(25, 76, 102)')
