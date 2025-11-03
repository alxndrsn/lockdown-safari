// Useful resources for compiling feature sets:
//
// * https://browserleaks.com/features
// * https://webkit.org/blog/13966/webkit-features-in-safari-16-4/#new-restrictions-in-lockdown-mode
// * https://webkit.org/blog/14154/webkit-features-in-safari-16-5/#:~:text=Lockdown%20mode
// * https://webkit.org/blog/14445/webkit-features-in-safari-17-0/#:~:text=Lockdown%20mode
// * https://webkit.org/blog/17333/webkit-features-in-safari-26-0/#lockdown-mode

module.exports = {
  17: {
    undefinedGlobals: {
      WASM: [
        'WebAssembly',
      ],
      WebGL: [
        'WebGLRenderingContext',
        'WebGL2RenderingContext',
        'WebGLActiveInfo',
        'WebGLBuffer',
        'WebGLContextEvent',
        'WebGLFramebuffer',
        'WebGLProgram',
        'WebGLQuery',
        'WebGLRenderbuffer',
        'WebGLSampler',
        'WebGLShader',
        'WebGLShaderPrecisionFormat',
        'WebGLSync',
        'WebGLTexture',
        'WebGLTransformFeedback',
        'WebGLUniformLocation',
      ],
    },
    webkitFeatures: [
      '-AllowContentSecurityPolicySourceStarToMatchAnyProtocol',
      '-AllowFileAccessFromFileURLs',
      '-AllowUniversalAccessFromFileURLs',
      '+CrossOriginEmbedderPolicy',
      '+CrossOriginOpenerPolicy',
      '-CSSSelectorJITCompiler',
      '+DeveloperExtras',
      '+ForceWebGLUsesLowPower',
      '-JavaScriptCanAccessClipboard',
      '-JavaScriptCanOpenWindowsAutomatically',
      '-LinkPreconnect',
      '-LinkPreload',
      '-WebAudio',
    ],
    webkitFlags: [
      '--enable-developer-extras=true',
      '--enable-javascript-markup=false',
      '--enable-webaudio=false',
      '--enable-webgl=false',
    ],
  },
};
