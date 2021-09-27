/**
 * // useWindowDimension.ts
 * * This hook returns the viewport/window height and width
 */

import { useEffect, useState } from 'react';
import { throttle } from 'throttle-debounce';

type WindowDimentions = {
	width: number | undefined;
	height: number | undefined;
};

const useWindowDimensions = (): WindowDimentions => {
	const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		const handleResize = throttle(1000 / 3, () => {
			setWindowDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		});

		handleResize();
		window.addEventListener('resize', handleResize);
		return (): void => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return windowDimensions;
};

export default useWindowDimensions;
