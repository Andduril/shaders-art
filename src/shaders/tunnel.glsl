// low tech tunnel
// 28 steps

/*
    @FabriceNeyret2 -40 chars
    → 611 (from 651)!
    
    Further golfing below shader code
    
*/

#define T        iTime*4. + 5. + 5.*sin(iTime*.3)         //
#define P(z)     vec3( 12.* cos( (z)*vec2(.1,.12) ) , z)  //
#define A(F,H,K) abs(dot( sin(F*p*K), H +p-p )) / K 

uniform vec3 iResolution;
uniform float iTime;
uniform float iTimeDelta;
uniform float iFrameRate;
uniform int iFrame;
uniform float iChannelTime[4];
uniform vec3 iChannelResolution[4];
uniform vec4 iMouse;

varying vec2 vUv;

void mainImage(out vec4 o, in vec2 u) {

    float t, s, i, d, e;
    vec3 c, r = iResolution;

    u = (u - r.xy / 2.) / r.y;            // scaled coords
    // if (abs(u.y) > .375) { o*= i; return;}// cinema bars

    vec3 p = P(T),                       // setup ray origin, direction, and look-at
    Z = normalize(P(T + 4.) - p), X = normalize(vec3(Z.z, 0, -Z)), D = vec3(u, 1) * mat3(-X, cross(X, Z), Z);

    for(; i++ < 28. && d < 3e1; c += 1. / s + 1e1 * vec3(1, 2, 5) / max(e, .6)) p += D * s,                      // march
        X = P(p.z),                      // get path
        t = sin(iTime),                  // store sine of iTime (not T)
        e = length(p - vec3(             // orb (sphere with xyz offset by t)
        X.x + t, X.y + t * 2., 6. + T + t * 2.)) - .01, s = cos(p.z * .6) * 2. + 4.           // tunnel with modulating radius
        - min(length(p.xy - X.x - 6.), length((p - X).xy)) + A(4., .25, .1)             // noise, large scoops
        + A(T + 8., .22, 2.),            // noise, detail texture 
                                         // (remove "T+" if you don't like the texture moving)
        d += s = min(e, .01 + .3 * abs(s));   // accumulate distance

    o.rgb = c * c / 1e6;                     // adjust brightness and saturation
}

// --- Bridge ShaderToy -> WebGL ---
void main() {
    vec2 fragCoord = vUv * iResolution.xy;       // pixel coords
    vec4 col;
    mainImage(col, fragCoord);
    gl_FragColor = col;
}
