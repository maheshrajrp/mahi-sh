precision highp float;

uniform sampler2D uPerlinTexture;
varying vec2 vUV;
uniform float uTime;


void main()
{

    vec2 smokeUv = vUV;

    smokeUv.x *= 0.5;
    smokeUv.y *= 0.5;
    smokeUv.y -= uTime * 0.01;

    float smoke = texture(uPerlinTexture, smokeUv).r;
    smoke = smoothstep(0.3, 0.1, smoke);

    smoke *= smoothstep(0.0, 0.1, vUV.x);
    smoke *= smoothstep(1.0, 0.9, vUV.x);
    smoke *= smoothstep(0.0, 0.1, vUV.y);
    smoke *= smoothstep(1.0, 0.9, vUV.y);
    smoke = max(smoke, 0.0);
    // for now skipping the smoke usage
    gl_FragColor = vec4(0.439, 0.435, 0.427, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}