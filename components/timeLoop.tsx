import hoistNonReactStatics from 'hoist-non-react-statics';
import React, { PureComponent } from 'react';

const ResetTime = (2 ** 14) - 128;

// NB this is only an utility for the examples
export default (
	C: any,
	{ refreshRate = 60 }: { refreshRate?: number } = {},
): any => {
	class TL extends PureComponent {
		// Static displayName = `timeLoop(${C.displayName || C.name || ""})`;
		state = {
			time: 0,
		};

		_r: any;

		componentDidMount() {
			let startTime: number;
			let lastTime: number;
			const interval = Math.round(1000 / refreshRate);
			lastTime = -interval;

			const loop = (t: number) => {
				this._r = requestAnimationFrame(loop);
				if (!startTime) {
					startTime = t;
				}

				if ((t - lastTime) > interval) {
					lastTime = t;
					this.setState({
						time: (t - startTime) / 1000,
						// Tick: this.state.tick + 1,
					});
				}
			};

			this._r = requestAnimationFrame(loop);
		}

		componentWillUnmount() {
			cancelAnimationFrame(this._r);
		}

		render() {
			return <C {...this.props} {...this.state} />;
		}
	}

	hoistNonReactStatics(TL, C);

	return TL;
};
