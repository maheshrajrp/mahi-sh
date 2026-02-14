precision highp float;

uniform float uTime;
uniform sampler2D uTexture;
varying float vRandom;


void main()
{
    vec4 textureColor = texture2D(uTexture, gl_PointCoord);
    float strength = (sin(uTime * 3.0 + vRandom * 50.0) + 1.0) / 2.0;
    gl_FragColor = vec4(textureColor.rgb, strength * textureColor.r);
}