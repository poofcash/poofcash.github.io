!function(s){var n={};function a(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return s[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=s,a.c=n,a.d=function(e,t,s){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(s,n,function(e){return t[e]}.bind(null,n));return s},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="./",a(a.s=5)}([function(e,t,s){"use strict";try{self["workbox:core:5.1.4"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.1.4"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:5.1.4"]&&_()}catch(e){}},function(P,e,t){"use strict";t.r(e);t(0);const s=(e,...t)=>{let s=e;return 0<t.length&&(s+=" :: "+JSON.stringify(t)),s};class d extends Error{constructor(e,t){super(s(e,t)),this.name=e,this.details=t}}const p=new Set;const n={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[n.prefix,e,n.suffix].filter(e=>e&&0<e.length).join("-"),o={updateDetails:t=>{var e=e=>{"string"==typeof t[e]&&(n[e]=t[e])};for(const s of Object.keys(n))e(s)},getGoogleAnalyticsName:e=>e||a(n.googleAnalytics),getPrecacheName:e=>e||a(n.precache),getPrefix:()=>n.prefix,getRuntimeName:e=>e||a(n.runtime),getSuffix:()=>n.suffix};const f=e=>{const t=new URL(String(e),location.href);return t.href.replace(new RegExp("^"+location.origin),"")},g={filter:(e,t)=>e.filter(e=>t in e)},m=async({request:e,mode:t,plugins:s=[]})=>{let n=e;for(const a of g.filter(s,"cacheKeyWillBeUsed"))"string"==typeof(n=await a.cacheKeyWillBeUsed.call(a,{mode:t,request:n}))&&(n=new Request(n));return n},w=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const r=await self.caches.open(e);var i=await m({plugins:a,request:t,mode:"read"});let c=await r.match(i,n);for(const o of a)if("cachedResponseWillBeUsed"in o){const h=o.cachedResponseWillBeUsed;c=await h.call(o,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:i})}return c};const h={put:async({cacheName:e,request:t,response:s,event:n,plugins:a=[],matchOptions:r})=>{var i=await m({plugins:a,request:t,mode:"write"});if(!s)throw new d("cache-put-with-no-response",{url:f(i.url)});var c=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,r=!1;for(const i of n)if("cacheWillUpdate"in i){r=!0;const c=i.cacheWillUpdate;if(!(a=await c.call(i,{request:e,response:a,event:s})))break}return(a=r?a:a&&200===a.status?a:void 0)||null})({event:n,plugins:a,response:s,request:i});if(c){const h=await self.caches.open(e);var t=g.filter(a,"cacheDidUpdate"),o=0<t.length?await w({cacheName:e,matchOptions:r,request:i}):null;try{await h.put(i,c)}catch(e){if("QuotaExceededError"===e.name){for(const u of p)await u();await 0}throw e}for(const l of t)await l.cacheDidUpdate.call(l,{cacheName:e,event:n,oldResponse:o,newResponse:c,request:i})}},match:w};let r;function i(e){e.then(()=>{})}class c{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((t,e)=>{let s=!1;setTimeout(()=>{s=!0,e(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>e(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const e=n.result;s?e.close():(e.onversionchange=this._onversionchange.bind(this),t(e))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){const n=await this.getAllMatching(e,{query:t,count:s,includeKeys:!0});return n.map(e=>e.key)}async getAllMatching(i,{index:c,query:o=null,direction:h="next",count:u,includeKeys:l=!1}={}){return this.transaction([i],"readonly",(e,t)=>{const s=e.objectStore(i),n=c?s.index(c):s,a=[],r=n.openCursor(o,h);r.onsuccess=()=>{const e=r.result;e?(a.push(l?e:e.value),u&&a.length>=u?t(a):e.continue()):t(a)}})}async transaction(n,a,r){return await this.open(),new Promise((t,e)=>{const s=this._db.transaction(n,a);s.onabort=()=>e(s.error),s.oncomplete=()=>t(),r(s,e=>t(e))})}async _call(a,r,e,...i){return this.transaction([r],e,(e,t)=>{const s=e.objectStore(r),n=s[a].apply(s,i);n.onsuccess=()=>t(n.result)})}close(){this._db&&(this._db.close(),this._db=null)}}c.prototype.OPEN_TIMEOUT=2e3;for(const[C,O]of Object.entries({readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]}))for(const S of O)S in IDBObjectStore.prototype&&(c.prototype[S]=async function(e,...t){return this._call(S,e,C,...t)});const u={fetch:async({request:t,fetchOptions:s,event:n,plugins:a=[]})=>{if("string"==typeof t&&(t=new Request(t)),n instanceof FetchEvent&&n.preloadResponse){var r=await n.preloadResponse;if(r)return r}r=g.filter(a,"fetchDidFail");const i=0<r.length?t.clone():null;try{for(const o of a)if("requestWillFetch"in o){const h=o.requestWillFetch;var e=t.clone();t=await h.call(o,{request:e,event:n})}}catch(e){throw new d("plugin-error-request-will-fetch",{thrownError:e})}const c=t.clone();try{let e;e="navigate"===t.mode?await fetch(t):await fetch(t,s);for(const u of a)"fetchDidSucceed"in u&&(e=await u.fetchDidSucceed.call(u,{event:n,request:c,response:e}));return e}catch(e){for(const l of r)await l.fetchDidFail.call(l,{error:e,event:n,originalRequest:i.clone(),request:c.clone()});throw e}}};async function l(e,t){const s=e.clone();e={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},t=t?t(e):e,e=function(){if(void 0===r){var e=new Response("");if("body"in e)try{new Response(e.body),r=!0}catch(e){r=!1}r=!1}return r}()?s.body:await s.blob();return new Response(e,t)}t(4);const y="cache-entries",_=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class v{constructor(e){this._cacheName=e,this._db=new c("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result,s=t.createObjectStore(y,{keyPath:"id"});s.createIndex("cacheName","cacheName",{unique:!1}),s.createIndex("timestamp","timestamp",{unique:!1}),(async n=>{await new Promise((e,t)=>{const s=indexedDB.deleteDatabase(n);s.onerror=()=>{t(s.error)},s.onblocked=()=>{t(new Error("Delete blocked"))},s.onsuccess=()=>{e()}})})(this._cacheName)}async setTimestamp(e,t){t={url:e=_(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(y,t)}async getTimestamp(e){return(await this._db.get(y,this._getId(e))).timestamp}async expireEntries(i,c){const e=[];for(const t of await this._db.transaction(y,"readwrite",(e,s)=>{const t=e.objectStore(y),n=t.index("timestamp").openCursor(null,"prev"),a=[];let r=0;n.onsuccess=()=>{const e=n.result;var t;e?((t=e.value).cacheName===this._cacheName&&(i&&t.timestamp<i||c&&r>=c?a.push(e.value):r++),e.continue()):s(a)}}))await this._db.delete(y,t.id),e.push(t.url);return e}_getId(e){return this._cacheName+"|"+_(e)}}class R{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new v(e)}async expireEntries(){if(this._isRunning)this._rerunRequested=!0;else{this._isRunning=!0;var e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,e=await this._timestampModel.expireEntries(e,this._maxEntries);const t=await self.caches.open(this._cacheName);for(const s of e)await t.delete(s);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,i(this.expireEntries()))}}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){return!!this._maxAgeSeconds&&await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}t(1);const x=[],q={get(){return x},add(e){x.push(...e)}};class k{constructor(e){this._cacheName=o.getPrecacheName(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const r of e){"string"==typeof r?t.push(r):r&&void 0===r.revision&&t.push(r.url);var{cacheKey:s,url:n}=function(e){if(!e)throw new d("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e)return{cacheKey:(t=new URL(e,location.href)).href,url:t.href};var{revision:t,url:s}=e;if(!s)throw new d("add-to-cache-list-unexpected-type",{entry:e});if(!t)return{cacheKey:(e=new URL(s,location.href)).href,url:e.href};const n=new URL(s,location.href);return e=new URL(s,location.href),n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:e.href}}(r),a="string"!=typeof r&&r.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==s)throw new d("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:s});if("string"!=typeof r&&r.integrity){if(this._cacheKeysToIntegrities.has(s)&&this._cacheKeysToIntegrities.get(s)!==r.integrity)throw new d("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(s,r.integrity)}this._urlsToCacheKeys.set(n,s),this._urlsToCacheModes.set(n,a),0<t.length&&(s="Workbox is precaching URLs without revision "+`info: ${t.join(", ")}
This is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache",console.warn(s))}}async install({event:a,plugins:r}={}){const e=[],t=[],s=await self.caches.open(this._cacheName),n=await s.keys(),i=new Set(n.map(e=>e.url));for(var[c,o]of this._urlsToCacheKeys)i.has(o)?t.push(c):e.push({cacheKey:o,url:c});var h=e.map(({cacheKey:e,url:t})=>{var s=this._cacheKeysToIntegrities.get(e),n=this._urlsToCacheModes.get(t);return this._addURLToCache({cacheKey:e,cacheMode:n,event:a,integrity:s,plugins:r,url:t})}),h=(await Promise.all(h),e.map(e=>e.url));return{updatedURLs:h,notUpdatedURLs:t}}async activate(){const e=await self.caches.open(this._cacheName);var t=await e.keys();const s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:a,integrity:r}){r=new Request(t,{integrity:r,cache:s,credentials:"same-origin"});let i=await u.fetch({event:n,plugins:a,request:r}),c;for(const o of a||[])"cacheWillUpdate"in o&&(c=o);if(!(c?await c.cacheWillUpdate({event:n,request:r,response:i}):i.status<400))throw new d("bad-precaching-response",{url:t,status:i.status});i.redirected&&(i=await l(i)),await h.put({event:n,plugins:a,response:i,request:e===t?r:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){e=new URL(e,location.href);return this._urlsToCacheKeys.get(e.href)}async matchPrecache(e){e=e instanceof Request?e.url:e,e=this.getCacheKeyForURL(e);if(e){const t=await self.caches.open(this._cacheName);return t.match(e)}}createHandler(s=!0){return async({request:t})=>{try{var e=await this.matchPrecache(t);if(e)return e;throw new d("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(e){if(s)return fetch(t);throw e}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new d("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let b;const U=()=>b=b||new k;function*W(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const r=new URL(e,location.href),i=(r.hash="",yield r.href,function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t));if(yield i.href,s&&i.pathname.endsWith("/")){const c=new URL(i.href);c.pathname+=s,yield c.href}if(n){const o=new URL(i.href);o.pathname+=".html",yield o.href}if(a)for(const h of a({url:r}))yield h.href}const D=({ignoreURLParametersMatching:n=[/^utm_/],directoryIndex:a="index.html",cleanURLs:r=!0,urlManipulation:i}={})=>{const c=o.getPrecacheName();self.addEventListener("fetch",e=>{const t=((e,t)=>{const s=U(),n=s.getURLsToCacheKeys();for(const r of W(e,t)){var a=n.get(r);if(a)return a}})(e.request.url,{cleanURLs:r,directoryIndex:a,ignoreURLParametersMatching:n,urlManipulation:i});var s;t&&(s=self.caches.open(c).then(e=>e.match(t)).then(e=>e||fetch(t)),e.respondWith(s))})};let N=!1;const I=e=>{const t=U();var s=q.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},j=e=>{const t=U();e.waitUntil(t.activate())};t(2);const T=e=>e&&"object"==typeof e?e:{handle:e};class E{constructor(e,t,s="GET"){this.handler=T(t),this.match=e,this.method=s}}E;class H extends E{constructor(s,e,t){super(({url:e})=>{const t=s.exec(e.href);if(t&&(e.origin===location.origin||0===t.index))return t.slice(1)},e,t)}}class F{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{var t=e["request"],t=this.handleRequest({request:t,event:e});t&&e.respondWith(t)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const t=e.data["payload"],s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);e=new Request(...e);return this.handleRequest({request:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:s,event:n}){const a=new URL(s.url,location.href);if(a.protocol.startsWith("http")){var{params:r,route:t}=this.findMatchingRoute({url:a,request:s,event:n});let e=t&&t.handler;if(e=!e&&this._defaultHandler?this._defaultHandler:e){let t;try{t=e.handle({url:a,request:s,event:n,params:r})}catch(e){t=Promise.reject(e)}return t=t instanceof Promise&&this._catchHandler?t.catch(e=>this._catchHandler.handle({url:a,request:s,event:n})):t}}}findMatchingRoute({url:t,request:s,event:n}){for(const r of this._routes.get(s.method)||[]){let e;var a=r.match({url:t,request:s,event:n});if(a)return e=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(e=void 0),{route:r,params:e}}return{}}setDefaultHandler(e){this._defaultHandler=T(e)}setCatchHandler(e){this._catchHandler=T(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new d("unregister-route-but-not-found-with-method",{method:e.method});var t=this._routes.get(e.method).indexOf(e);if(!(-1<t))throw new d("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let L;const B=()=>(L||((L=new F).addFetchListener(),L.addCacheListener()),L);function K(e,t,s){let n;if("string"==typeof e){const r=new URL(e,location.href);n=new E(({url:e})=>e.href===r.href,t,s)}else if(e instanceof RegExp)n=new H(e,t,s);else if("function"==typeof e)n=new E(e,t,s);else{if(!(e instanceof E))throw new d("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}const a=B();a.registerRoute(n),n}t(3);const M={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};self.addEventListener("activate",()=>self.clients.claim());e=[{'revision':'b70658862750edf7578ec4fbe72f89ca','url':'./index.html'},{'revision':null,'url':'./static/css/2.2c8daab7.chunk.css'},{'revision':null,'url':'./static/css/main.fcc2c3c1.chunk.css'},{'revision':null,'url':'./static/js/3.cb27f9df.chunk.js'},{'revision':null,'url':'./static/js/main.cc4edf24.chunk.js'},{'revision':null,'url':'./static/js/runtime-main.9aa0c7d4.js'},{'revision':null,'url':'./static/media/Bold.72b8be67.otf'},{'revision':null,'url':'./static/media/DemiBold.b5cc6a50.otf'},{'revision':null,'url':'./static/media/Medium.a75f14d8.otf'},{'revision':null,'url':'./static/media/Regular.dd33bb0d.otf'}],t=void 0;{const A=U();A.addToCacheList(e),0<e.length&&(self.addEventListener("install",I),self.addEventListener("activate",j))}e=t,N||(D(e),N=!0);const G=new RegExp("/[^/?]+\\.[^/]+$");K(({request:e,url:t})=>"navigate"===e.mode&&(!t.pathname.startsWith("/_")&&!t.pathname.match(G)),function(e){const t=U();return t.createHandlerBoundToURL(e)}("./index.html")),K(({url:e})=>e.origin===self.location.origin&&e.pathname.endsWith(".png"),new class{constructor(e={}){var t;this._cacheName=o.getRuntimeName(e.cacheName),this._plugins=e.plugins||[],e.plugins?(t=e.plugins.some(e=>!!e.cacheWillUpdate),this._plugins=t?e.plugins:[M,...e.plugins]):this._plugins=[M],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));var s=this._getFromNetwork({request:t,event:e});let n=await h.match({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins}),a;if(n){if(e)try{e.waitUntil(s)}catch(a){}}else try{n=await s}catch(e){a=e}if(n)return n;throw new d("no-response",{url:t.url,error:a})}async _getFromNetwork({request:e,event:t}){const s=await u.fetch({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins});e=h.put({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(e)}catch(e){}return s}}({cacheName:"images",plugins:[new class{constructor(e={}){this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;var a=this._isResponseDateFresh(n);const r=this._getCacheExpiration(s);i(r.expireEntries());s=r.updateTimestamp(t.url);if(e)try{e.waitUntil(s)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(e=()=>this.deleteCacheAndMetadata(),p.add(e))}_getCacheExpiration(e){if(e===o.getRuntimeName())throw new d("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new R(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;e=this._getDateHeaderTimestamp(e);return null===e||e>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;e=e.headers.get("date");const t=new Date(e);e=t.getTime();return isNaN(e)?null:e}async deleteCacheAndMetadata(){for(var[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})}]);