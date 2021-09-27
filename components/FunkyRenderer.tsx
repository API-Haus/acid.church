import React from 'react';
import { Shaders, Node } from 'gl-react';
// @ts-ignore
import shader from 'raw-loader!../shaders/funky_overlay.glsl';


const shaders = Shaders.create({
	funky: {
		frag: shader,
	}
})

export class FunkyRenderer extends React.Component<any, any> {
	render() {
		const { overlay, children: background } = this.props;

		return (
			<Node shader={shaders.funky} uniforms={{
				overlay, background
			}}/>
		)
	}
}
