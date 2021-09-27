precision highp float;
varying vec2 uv;

uniform sampler2D overlay;
uniform sampler2D background;

vec3 blendDifference(vec3 base, vec3 blend) {
	return abs(base-blend);
}

vec3 blendDifference(vec3 base, vec3 blend, float opacity) {
	return (blendDifference(base, blend) * opacity + base * (1.0 - opacity));
}

void main() {
	vec4 smp = texture2D(background, uv);
	vec4 ovl = texture2D(overlay, uv);

	vec3 col = blendDifference(smp.xyz, ovl.xyz, ovl.a);

	gl_FragColor = vec4(col.xyz, 1.0);
}
