precision highp float;

uniform float uTime;
uniform sampler2D uTextures[8];
varying float vRandom;
varying float vTextureIndex;

void main()
{
    int textureIdx = int(mod(vTextureIndex, 8.0));
    vec4 textureColor;
    
    if(textureIdx == 0) textureColor = texture2D(uTextures[0], gl_PointCoord);
    else if(textureIdx == 1) textureColor = texture2D(uTextures[1], gl_PointCoord);
    else if(textureIdx == 2) textureColor = texture2D(uTextures[2], gl_PointCoord);
    else if(textureIdx == 3) textureColor = texture2D(uTextures[3], gl_PointCoord);
    else if(textureIdx == 4) textureColor = texture2D(uTextures[4], gl_PointCoord);
    else if(textureIdx == 5) textureColor = texture2D(uTextures[5], gl_PointCoord);
    else if(textureIdx == 6) textureColor = texture2D(uTextures[6], gl_PointCoord);
    else textureColor = texture2D(uTextures[7], gl_PointCoord);
    
    float strength = (sin(uTime * 3.0 + vRandom * 50.0) + 1.0) / 2.0;
    strength = strength * textureColor.r;
    strength = max(strength, 0.0);
    gl_FragColor = vec4(textureColor.rgb, strength);
}