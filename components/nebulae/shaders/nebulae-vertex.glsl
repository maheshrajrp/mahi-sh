uniform sampler2D uPerlinTexture;


varying vec2 vUV;
varying float uTime;


vec2 rotate2D(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main()
{
    
    vec3 newPosition = position;
    
    // Twist
    float twistPerlin = texture(uPerlinTexture, vec2(0.5, uv.y)).r;
    float angle = twistPerlin;
    newPosition.xz = rotate2D(newPosition.xz, angle);


    newPosition.xz = rotate2D(newPosition.xz, angle * 0.3);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);  
    vUV = uv;
}