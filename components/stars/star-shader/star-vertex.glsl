uniform float uTime;

attribute float aRandom;
attribute float aTextureIndex;

varying float vRandom;
varying float vTextureIndex;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += aRandom;

    vRandom = aRandom;
    vTextureIndex = aTextureIndex;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    gl_PointSize = 100.0  * (1.0 / - viewPosition.z);
}