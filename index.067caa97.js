function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},a=t.parcelRequire752b;null==a&&((a=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){i[e]=t},t.parcelRequire752b=a),a.register("7nHVT",(function(e,t){var n,i;n="undefined"!=typeof window?window:{},i=function(e,t,n){var i,a;if(function(){var t,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",fastLoadedClass:"ls-is-cached",iframeLoadMode:0,srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in a=e.lazySizesConfig||e.lazysizesConfig||{},n)t in a||(a[t]=n[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:a,noSupport:!0};var r,o,s,l,d,c,u,f,g,m,h,p,y,v,z,b,C,A,w,E,_,N,S,M,L,x,F,T,R,W,O,P,H,B,D,q,I,$,k,U,j,J,Q,V,X,G=t.documentElement,K=e.HTMLPictureElement,Y="addEventListener",Z="getAttribute",ee=e[Y].bind(e),te=e.setTimeout,ne=e.requestAnimationFrame||te,ie=e.requestIdleCallback,ae=/^picture$/i,re=["load","error","lazyincluded","_lazyloaded"],oe={},se=Array.prototype.forEach,le=function(e,t){return oe[t]||(oe[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),oe[t].test(e[Z]("class")||"")&&oe[t]},de=function(e,t){le(e,t)||e.setAttribute("class",(e[Z]("class")||"").trim()+" "+t)},ce=function(e,t){var n;(n=le(e,t))&&e.setAttribute("class",(e[Z]("class")||"").replace(n," "))},ue=function(e,t,n){var i=n?Y:"removeEventListener";n&&ue(e,t),re.forEach((function(n){e[i](n,t)}))},fe=function(e,n,a,r,o){var s=t.createEvent("Event");return a||(a={}),a.instance=i,s.initEvent(n,!r,!o),s.detail=a,e.dispatchEvent(s),s},ge=function(t,n){var i;!K&&(i=e.picturefill||a.pf)?(n&&n.src&&!t[Z]("srcset")&&t.setAttribute("srcset",n.src),i({reevaluate:!0,elements:[t]})):n&&n.src&&(t.src=n.src)},me=function(e,t){return(getComputedStyle(e,null)||{})[t]},he=function(e,t,n){for(n=n||e.offsetWidth;n<a.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},pe=(J=[],Q=j=[],V=function(){var e=Q;for(Q=j.length?J:j,k=!0,U=!1;e.length;)e.shift()();k=!1},X=function(e,n){k&&!n?e.apply(this,arguments):(Q.push(e),U||(U=!0,(t.hidden?te:ne)(V)))},X._lsFlush=V,X),ye=function(e,t){return t?function(){pe(e)}:function(){var t=this,n=arguments;pe((function(){e.apply(t,n)}))}},ve=function(e){var t,i=0,r=a.throttleDelay,o=a.ricTimeout,s=function(){t=!1,i=n.now(),e()},l=ie&&o>49?function(){ie(s,{timeout:o}),o!==a.ricTimeout&&(o=a.ricTimeout)}:ye((function(){te(s)}),!0);return function(e){var a;(e=!0===e)&&(o=33),t||(t=!0,(a=r-(n.now()-i))<0&&(a=0),e||a<9?l():te(l,a))}},ze=function(e){var t,i,a=99,r=function(){t=null,e()},o=function(){var e=n.now()-i;e<a?te(o,a-e):(ie||r)(r)};return function(){i=n.now(),t||(t=te(o,a))}},be=(C=/^img$/i,A=/^iframe$/i,w="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),E=0,_=0,N=0,S=-1,M=function(e){N--,(!e||N<0||!e.target)&&(N=0)},L=function(e){return null==b&&(b="hidden"==me(t.body,"visibility")),b||!("hidden"==me(e.parentNode,"visibility")&&"hidden"==me(e,"visibility"))},x=function(e,n){var i,a=e,r=L(e);for(p-=n,z+=n,y-=n,v+=n;r&&(a=a.offsetParent)&&a!=t.body&&a!=G;)(r=(me(a,"opacity")||1)>0)&&"visible"!=me(a,"overflow")&&(i=a.getBoundingClientRect(),r=v>i.left&&y<i.right&&z>i.top-1&&p<i.bottom+1);return r},T=ve(F=function(){var e,n,r,o,s,l,u,g,C,A,M,F,T=i.elements;if((f=a.loadMode)&&N<8&&(e=T.length)){for(n=0,S++;n<e;n++)if(T[n]&&!T[n]._lazyRace)if(!w||i.prematureUnveil&&i.prematureUnveil(T[n]))D(T[n]);else if((g=T[n][Z]("data-expand"))&&(l=1*g)||(l=_),A||(A=!a.expand||a.expand<1?G.clientHeight>500&&G.clientWidth>500?500:370:a.expand,i._defEx=A,M=A*a.expFactor,F=a.hFac,b=null,_<M&&N<1&&S>2&&f>2&&!t.hidden?(_=M,S=0):_=f>1&&S>1&&N<6?A:E),C!==l&&(m=innerWidth+l*F,h=innerHeight+l,u=-1*l,C=l),r=T[n].getBoundingClientRect(),(z=r.bottom)>=u&&(p=r.top)<=h&&(v=r.right)>=u*F&&(y=r.left)<=m&&(z||v||y||p)&&(a.loadHidden||L(T[n]))&&(c&&N<3&&!g&&(f<3||S<4)||x(T[n],l))){if(D(T[n]),s=!0,N>9)break}else!s&&c&&!o&&N<4&&S<4&&f>2&&(d[0]||a.preloadAfterLoad)&&(d[0]||!g&&(z||v||y||p||"auto"!=T[n][Z](a.sizesAttr)))&&(o=d[0]||T[n]);o&&!s&&D(o)}}),W=ye(R=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(M(e),de(t,a.loadedClass),ce(t,a.loadingClass),ue(t,O),fe(t,"lazyloaded"))}),O=function(e){W({target:e.target})},P=function(e,t){var n=e.getAttribute("data-load-mode")||a.iframeLoadMode;0==n?e.contentWindow.location.replace(t):1==n&&(e.src=t)},H=function(e){var t,n=e[Z](a.srcsetAttr);(t=a.customMedia[e[Z]("data-media")||e[Z]("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},B=ye((function(e,t,n,i,r){var o,s,l,d,c,f;(c=fe(e,"lazybeforeunveil",t)).defaultPrevented||(i&&(n?de(e,a.autosizesClass):e.setAttribute("sizes",i)),s=e[Z](a.srcsetAttr),o=e[Z](a.srcAttr),r&&(d=(l=e.parentNode)&&ae.test(l.nodeName||"")),f=t.firesLoad||"src"in e&&(s||o||d),c={target:e},de(e,a.loadingClass),f&&(clearTimeout(u),u=te(M,2500),ue(e,O,!0)),d&&se.call(l.getElementsByTagName("source"),H),s?e.setAttribute("srcset",s):o&&!d&&(A.test(e.nodeName)?P(e,o):e.src=o),r&&(s||d)&&ge(e,{src:o})),e._lazyRace&&delete e._lazyRace,ce(e,a.lazyClass),pe((function(){var t=e.complete&&e.naturalWidth>1;f&&!t||(t&&de(e,a.fastLoadedClass),R(c),e._lazyCache=!0,te((function(){"_lazyCache"in e&&delete e._lazyCache}),9)),"lazy"==e.loading&&N--}),!0)})),D=function(e){if(!e._lazyRace){var t,n=C.test(e.nodeName),i=n&&(e[Z](a.sizesAttr)||e[Z]("sizes")),r="auto"==i;(!r&&c||!n||!e[Z]("src")&&!e.srcset||e.complete||le(e,a.errorClass)||!le(e,a.lazyClass))&&(t=fe(e,"lazyunveilread").detail,r&&Ce.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,N++,B(e,t,r,i,n))}},q=ze((function(){a.loadMode=3,T()})),$=function(){c||(n.now()-g<999?te($,999):(c=!0,a.loadMode=3,T(),ee("scroll",I,!0)))},{_:function(){g=n.now(),i.elements=t.getElementsByClassName(a.lazyClass),d=t.getElementsByClassName(a.lazyClass+" "+a.preloadClass),ee("scroll",T,!0),ee("resize",T,!0),ee("pageshow",(function(e){if(e.persisted){var n=t.querySelectorAll("."+a.loadingClass);n.length&&n.forEach&&ne((function(){n.forEach((function(e){e.complete&&D(e)}))}))}})),e.MutationObserver?new MutationObserver(T).observe(G,{childList:!0,subtree:!0,attributes:!0}):(G[Y]("DOMNodeInserted",T,!0),G[Y]("DOMAttrModified",T,!0),setInterval(T,999)),ee("hashchange",T,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach((function(e){t[Y](e,T,!0)})),/d$|^c/.test(t.readyState)?$():(ee("load",$),t[Y]("DOMContentLoaded",T),te($,2e4)),i.elements.length?(F(),pe._lsFlush()):T()},checkElems:T,unveil:D,_aLSL:I=function(){3==a.loadMode&&(a.loadMode=2),q()}}),Ce=(o=ye((function(e,t,n,i){var a,r,o;if(e._lazysizesWidth=i,i+="px",e.setAttribute("sizes",i),ae.test(t.nodeName||""))for(r=0,o=(a=t.getElementsByTagName("source")).length;r<o;r++)a[r].setAttribute("sizes",i);n.detail.dataAttr||ge(e,n.detail)})),s=function(e,t,n){var i,a=e.parentNode;a&&(n=he(e,a,n),(i=fe(e,"lazybeforesizes",{width:n,dataAttr:!!t})).defaultPrevented||(n=i.detail.width)&&n!==e._lazysizesWidth&&o(e,a,i,n))},{_:function(){r=t.getElementsByClassName(a.autosizesClass),ee("resize",l)},checkElems:l=ze((function(){var e,t=r.length;if(t)for(e=0;e<t;e++)s(r[e])})),updateElem:s}),Ae=function(){!Ae.i&&t.getElementsByClassName&&(Ae.i=!0,Ce._(),be._())};return te((function(){a.init&&Ae()})),i={cfg:a,autoSizer:Ce,loader:be,init:Ae,uP:ge,aC:de,rC:ce,hC:le,fire:fe,gW:he,rAF:pe}}(n,n.document,Date),n.lazySizes=i,e.exports&&(e.exports=i)})),a.register("9HXUh",(function(e,t){!function(t,n){if(t){var i=function(){n(t.lazySizes),t.removeEventListener("lazyunveilread",i,!0)};n=n.bind(null,t,t.document),e.exports?n(a("7nHVT")):"function"==typeof define&&define.amd?define(["lazysizes"],n):t.lazySizes?i():t.addEventListener("lazyunveilread",i,!0)}}("undefined"!=typeof window?window:0,(function(e,t,n){if(e.addEventListener){var i=/\s+(\d+)(w|h)\s+(\d+)(w|h)/,a=/parent-fit["']*\s*:\s*["']*(contain|cover|width)/,r=/parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/,o=/^picture$/i,s=n.cfg,l={getParent:function(t,n){var i=t,a=t.parentNode;return n&&"prev"!=n||!a||!o.test(a.nodeName||"")||(a=a.parentNode),"self"!=n&&(i="prev"==n?t.previousElementSibling:n&&(a.closest||e.jQuery)&&(a.closest?a.closest(n):jQuery(a).closest(n)[0])||a),i},getFit:function(e){var t,n,i=getComputedStyle(e,null)||{},o=i.content||i.fontFamily,s={fit:e._lazysizesParentFit||e.getAttribute("data-parent-fit")};return!s.fit&&o&&(t=o.match(a))&&(s.fit=t[1]),s.fit?(!(n=e._lazysizesParentContainer||e.getAttribute("data-parent-container"))&&o&&(t=o.match(r))&&(n=t[1]),s.parent=l.getParent(e,n)):s.fit=i.objectFit,s},getImageRatio:function(t){var n,a,r,l,d,c,u,f=t.parentNode,g=f&&o.test(f.nodeName||"")?f.querySelectorAll("source, img"):[t];for(n=0;n<g.length;n++)if(a=(t=g[n]).getAttribute(s.srcsetAttr)||t.getAttribute("srcset")||t.getAttribute("data-pfsrcset")||t.getAttribute("data-risrcset")||"",r=t._lsMedia||t.getAttribute("media"),r=s.customMedia[t.getAttribute("data-media")||r]||r,a&&(!r||(e.matchMedia&&matchMedia(r)||{}).matches)){(l=parseFloat(t.getAttribute("data-aspectratio")))||((d=a.match(i))?"w"==d[2]?(c=d[1],u=d[3]):(c=d[3],u=d[1]):(c=t.getAttribute("width"),u=t.getAttribute("height")),l=c/u);break}return l},calculateSize:function(e,t){var n,i,a,r=this.getFit(e),o=r.fit,s=r.parent;return"width"==o||("contain"==o||"cover"==o)&&(i=this.getImageRatio(e))?(s?t=s.clientWidth:s=e,a=t,"width"==o?a=t:(n=t/s.clientHeight)&&("cover"==o&&n<i||"contain"==o&&n>i)&&(a=t*(i/n)),a):t}};n.parentFit=l,t.addEventListener("lazybeforesizes",(function(e){if(!e.defaultPrevented&&e.detail.instance==n){var t=e.target;e.detail.width=l.calculateSize(t,e.detail.width)}}))}}))})),a.register("fDHq9",(function(t,n){function i(e,t){localStorage.setItem(e,JSON.stringify(t))}function a(e){const t=localStorage.getItem(e);try{return JSON.parse(t)}catch{return t||[]}}e(t.exports,"saveToLS",(()=>i)),e(t.exports,"loadFromLS",(()=>a))}));
//# sourceMappingURL=index.067caa97.js.map
