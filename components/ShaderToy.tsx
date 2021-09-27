import React from 'react';
import { Node, Shaders } from 'gl-react';

const compileShader = shader => Shaders.create({
	__shader: {
		frag: `
precision highp float;
varying vec2 uv;

//uniform vec4 iMouse;
uniform vec2 iResolution;
uniform float iTime;
//uniform float iTimeDelta;
//uniform float iFrame;

${shader}

void main() {
\tmainImage(gl_FragColor, gl_FragCoord.xy);
}`,
	}
}).__shader;

type ShaderProps = {
	width: number;
	height: number;
	shader: string;
	refreshRate?: number;
} & Record<string, any>;

export class ShaderToy extends React.Component<ShaderProps, any> {
	static state = {
		iResolution: [0, 0],
		// iMouse: [0, 0, 0, 0],
		iTime: 0,
		// iFrame: 0,
		// iTimeDelta: 0,
		compiledShader: '',
	};
	private animationID: number;

	constructor(props) {
		super(props);

		const { shader } = props;

		this.state = {
			...ShaderToy.state,
			compiledShader: compileShader(shader),
		};
	}

	render() {
		const { compiledShader, ...uniforms } = this.state;
		const { width, height, shader, refreshRate, ...moreUniforms } = this.props;

		return (
			<Node shader={compiledShader} uniforms={{
				...uniforms,
				iResolution: [width, height],
				...moreUniforms,
			}}/>
		)
	}

	componentDidMount() {
		const { refreshRate = 30 } = this.props;

		let last = Date.now();
		const init = Date.now();
		const interval = Math.round(1000 / refreshRate);

		const update = () => {
			const now = Date.now();

			if ((now - last) > interval) {
				this.setState({
					iTime: (now - init) / 1000,
					// iTimeDelta: delta,
				});

				last = now;
			}

			this.animationID = requestAnimationFrame(update);
		};

		update();
	}

	componentWillUnmount() {
		cancelAnimationFrame(this.animationID);
	}
}

/*
vec3	iResolution	image / buffer	The viewport resolution (z is pixel aspect ratio, usually 1.0)
float	iTime	image / sound / buffer	Current time in seconds
float	iTimeDelta	image / buffer	Time it takes to render a frame, in seconds
int	iFrame	image / buffer	Current frame
float	iFrameRate	image / buffer	Number of frames rendered per second
float	iChannelTime[4]	image / buffer	Time for channel (if video or sound), in seconds
vec3	iChannelResolution[4]	image / buffer / sound	Input texture resolution for each channel
vec4	iMouse	image / buffer	xy = current pixel coords (if LMB is down). zw = click pixel
sampler2D	iChannel{i}	image / buffer / sound	Sampler for input textures i
vec4	iDate	image / buffer / sound	Year, month, day, time in seconds in .xyzw
float	iSampleRate	image / buffer / sound	The sound sample rate (typically 44100)
 */
