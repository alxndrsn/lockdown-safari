// Useful resources for compiling feature sets:
//
// * https://browserleaks.com/features
// * https://webkit.org/blog/13966/webkit-features-in-safari-16-4/#new-restrictions-in-lockdown-mode
// * https://webkit.org/blog/14154/webkit-features-in-safari-16-5/#:~:text=Lockdown%20mode
// * https://webkit.org/blog/14445/webkit-features-in-safari-17-0/#:~:text=Lockdown%20mode
// * https://webkit.org/blog/17333/webkit-features-in-safari-26-0/#lockdown-mode

// TODO this list should probably be frozen to match the date of release of the relevant Safari versions.
// For retrospective reconstruction, check commit date for each version of this file.
const experimentalApis = require('./experimental-apis');

const v16 = { // TODO this is a rough estimate
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
};

// TODO Disable support for the <embed> element.
// TODO Support "select web fonts."
// See: https://webkit.org/blog/14445/webkit-features-in-safari-17-0/#:~:text=Lockdown%20mode
const v17 = {
  ...v16,
  undefinedGlobals: {
    ...v16.undefinedGlobals,
    IndexedDB: [ // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
      'IDBCursor',
      'IDBCursorWithValue',
      'IDBDatabase',
      'IDBFactory',
      'IDBIndex',
      'IDBKeyRange',
      'IDBObjectStore',
      'IDBOpenDBRequest',
      'IDBRequest',
      'IDBTransaction',
      'IDBVersionChangeEvent',
    ],
    'File API': [ // https://developer.mozilla.org/en-US/docs/Web/API/File_API
      'Blob',
      'File',
      'FileList',
      'FileReader',
      'FileReaderSync',
    ],
    'Web Speech API': [ // https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
      'SpeechGrammar',
      'Deprecated',
      'SpeechGrammarList',
      'Deprecated',
      'SpeechRecognition',
      'SpeechRecognitionAlternative',
      'SpeechRecognitionErrorEvent',
      'SpeechRecognitionEvent',
      'SpeechRecognitionPhrase',
      'Experimental',
      'SpeechRecognitionResult',
      'SpeechRecognitionResultList',
      'SpeechSynthesis',
      'SpeechSynthesisErrorEvent',
      'SpeechSynthesisEvent',
      'SpeechSynthesisUtterance',
      'SpeechSynthesisVoice',
    ],
    'Web Locks API': [ // https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API
      'Lock',
      'LockManager',
    ],
    'Experimental APIs': ...experimentalApis,
};

// Only change on previous is to allow (most) web fonts.
// Safe Font Parser is not currently simulated, so all fonts are allowed through.
// See: https://webkit.org/blog/17333/webkit-features-in-safari-26-0/#lockdown-mode
const v26 = {
  ...v17,
  allowWebFonts: true,
};

module.exports = {
  17: v17,
  26: v26,
};
