// Ether by nimitz 2014 (twitter: @stormoid)
// https://www.shadertoy.com/view/MsjSW3
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
// Contact the author for other licensing options

#define t iTime
#define PI 3.1415926538

uniform vec3 color;

vec3 hueShift(vec3 color, float hueAdjust){

	const vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
	const vec3  kRGBToI      = vec3 (0.596, -0.275, -0.321);
	const vec3  kRGBToQ      = vec3 (0.212, -0.523, 0.311);

	const vec3  kYIQToR     = vec3 (1.0, 0.956, 0.621);
	const vec3  kYIQToG     = vec3 (1.0, -0.272, -0.647);
	const vec3  kYIQToB     = vec3 (1.0, -1.107, 1.704);

	float   YPrime  = dot (color, kRGBToYPrime);
	float   I       = dot (color, kRGBToI);
	float   Q       = dot (color, kRGBToQ);
	float   hue     = atan (Q, I);
	float   chroma  = sqrt (I * I + Q * Q);

	hue += hueAdjust;

	Q = chroma * sin (hue);
	I = chroma * cos (hue);

	vec3    yIQ   = vec3 (YPrime, I, Q);

	return vec3(dot (yIQ, kYIQToR), dot (yIQ, kYIQToG), dot (yIQ, kYIQToB));

}


mat2 m(float a){ float c=cos(a), s=sin(a);return mat2(c, -s, s, c); }
float map(vec3 p){
	p.xz*= m(t*0.4);p.xy*= m(t*0.3);
	vec3 q = p*2.+t;
	return length(p+vec3(sin(t*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*0.5 - 1.;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord){
	vec2 p = fragCoord.xy/iResolution.xy - vec2(.5, .5);
	vec3 cl = vec3(0.);
	float d = 2.5;
	for (int i=0; i<=5; i++)    {
		vec3 pp = vec3(0, 0, 5.) + normalize(vec3(p, -1.))*d;
		float rz = map(pp);
		float f =  clamp((rz - map(pp+.1))*0.5, -.1, 1.);
		vec3 l = hueShift(color, (sin(iTime*.9)/2.+.5) - (cos(iTime*2.+PI)/2.+.5))
		+ vec3(1., 2.5, 3.)*f;
		cl = cl*l + smoothstep(2.5, .0, rz)*.7*l;
		d += min(rz, 1.);
	}
	fragColor = vec4(cl, 1.);
}
