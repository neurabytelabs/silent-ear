var r_=Object.defineProperty;var s_=(s,e,t)=>e in s?r_(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var we=(s,e,t)=>s_(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();var Hu={exports:{}},jo={},Vu={exports:{}},gt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rm;function o_(){if(rm)return gt;rm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),u=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),f=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.iterator;function x(F){return F===null||typeof F!="object"?null:(F=v&&F[v]||F["@@iterator"],typeof F=="function"?F:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},M=Object.assign,w={};function y(F,se,Ne){this.props=F,this.context=se,this.refs=w,this.updater=Ne||S}y.prototype.isReactComponent={},y.prototype.setState=function(F,se){if(typeof F!="object"&&typeof F!="function"&&F!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,F,se,"setState")},y.prototype.forceUpdate=function(F){this.updater.enqueueForceUpdate(this,F,"forceUpdate")};function _(){}_.prototype=y.prototype;function I(F,se,Ne){this.props=F,this.context=se,this.refs=w,this.updater=Ne||S}var L=I.prototype=new _;L.constructor=I,M(L,y.prototype),L.isPureReactComponent=!0;var C=Array.isArray,W=Object.prototype.hasOwnProperty,O={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function k(F,se,Ne){var Q,he={},Se=null,ve=null;if(se!=null)for(Q in se.ref!==void 0&&(ve=se.ref),se.key!==void 0&&(Se=""+se.key),se)W.call(se,Q)&&!U.hasOwnProperty(Q)&&(he[Q]=se[Q]);var Re=arguments.length-2;if(Re===1)he.children=Ne;else if(1<Re){for(var Ue=Array(Re),Ke=0;Ke<Re;Ke++)Ue[Ke]=arguments[Ke+2];he.children=Ue}if(F&&F.defaultProps)for(Q in Re=F.defaultProps,Re)he[Q]===void 0&&(he[Q]=Re[Q]);return{$$typeof:s,type:F,key:Se,ref:ve,props:he,_owner:O.current}}function P(F,se){return{$$typeof:s,type:F.type,key:se,ref:F.ref,props:F.props,_owner:F._owner}}function R(F){return typeof F=="object"&&F!==null&&F.$$typeof===s}function H(F){var se={"=":"=0",":":"=2"};return"$"+F.replace(/[=:]/g,function(Ne){return se[Ne]})}var re=/\/+/g;function K(F,se){return typeof F=="object"&&F!==null&&F.key!=null?H(""+F.key):se.toString(36)}function le(F,se,Ne,Q,he){var Se=typeof F;(Se==="undefined"||Se==="boolean")&&(F=null);var ve=!1;if(F===null)ve=!0;else switch(Se){case"string":case"number":ve=!0;break;case"object":switch(F.$$typeof){case s:case e:ve=!0}}if(ve)return ve=F,he=he(ve),F=Q===""?"."+K(ve,0):Q,C(he)?(Ne="",F!=null&&(Ne=F.replace(re,"$&/")+"/"),le(he,se,Ne,"",function(Ke){return Ke})):he!=null&&(R(he)&&(he=P(he,Ne+(!he.key||ve&&ve.key===he.key?"":(""+he.key).replace(re,"$&/")+"/")+F)),se.push(he)),1;if(ve=0,Q=Q===""?".":Q+":",C(F))for(var Re=0;Re<F.length;Re++){Se=F[Re];var Ue=Q+K(Se,Re);ve+=le(Se,se,Ne,Ue,he)}else if(Ue=x(F),typeof Ue=="function")for(F=Ue.call(F),Re=0;!(Se=F.next()).done;)Se=Se.value,Ue=Q+K(Se,Re++),ve+=le(Se,se,Ne,Ue,he);else if(Se==="object")throw se=String(F),Error("Objects are not valid as a React child (found: "+(se==="[object Object]"?"object with keys {"+Object.keys(F).join(", ")+"}":se)+"). If you meant to render a collection of children, use an array instead.");return ve}function de(F,se,Ne){if(F==null)return F;var Q=[],he=0;return le(F,Q,"","",function(Se){return se.call(Ne,Se,he++)}),Q}function oe(F){if(F._status===-1){var se=F._result;se=se(),se.then(function(Ne){(F._status===0||F._status===-1)&&(F._status=1,F._result=Ne)},function(Ne){(F._status===0||F._status===-1)&&(F._status=2,F._result=Ne)}),F._status===-1&&(F._status=0,F._result=se)}if(F._status===1)return F._result.default;throw F._result}var ue={current:null},z={transition:null},ce={ReactCurrentDispatcher:ue,ReactCurrentBatchConfig:z,ReactCurrentOwner:O};function ee(){throw Error("act(...) is not supported in production builds of React.")}return gt.Children={map:de,forEach:function(F,se,Ne){de(F,function(){se.apply(this,arguments)},Ne)},count:function(F){var se=0;return de(F,function(){se++}),se},toArray:function(F){return de(F,function(se){return se})||[]},only:function(F){if(!R(F))throw Error("React.Children.only expected to receive a single React element child.");return F}},gt.Component=y,gt.Fragment=t,gt.Profiler=a,gt.PureComponent=I,gt.StrictMode=r,gt.Suspense=f,gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ce,gt.act=ee,gt.cloneElement=function(F,se,Ne){if(F==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+F+".");var Q=M({},F.props),he=F.key,Se=F.ref,ve=F._owner;if(se!=null){if(se.ref!==void 0&&(Se=se.ref,ve=O.current),se.key!==void 0&&(he=""+se.key),F.type&&F.type.defaultProps)var Re=F.type.defaultProps;for(Ue in se)W.call(se,Ue)&&!U.hasOwnProperty(Ue)&&(Q[Ue]=se[Ue]===void 0&&Re!==void 0?Re[Ue]:se[Ue])}var Ue=arguments.length-2;if(Ue===1)Q.children=Ne;else if(1<Ue){Re=Array(Ue);for(var Ke=0;Ke<Ue;Ke++)Re[Ke]=arguments[Ke+2];Q.children=Re}return{$$typeof:s,type:F.type,key:he,ref:Se,props:Q,_owner:ve}},gt.createContext=function(F){return F={$$typeof:u,_currentValue:F,_currentValue2:F,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},F.Provider={$$typeof:l,_context:F},F.Consumer=F},gt.createElement=k,gt.createFactory=function(F){var se=k.bind(null,F);return se.type=F,se},gt.createRef=function(){return{current:null}},gt.forwardRef=function(F){return{$$typeof:d,render:F}},gt.isValidElement=R,gt.lazy=function(F){return{$$typeof:g,_payload:{_status:-1,_result:F},_init:oe}},gt.memo=function(F,se){return{$$typeof:p,type:F,compare:se===void 0?null:se}},gt.startTransition=function(F){var se=z.transition;z.transition={};try{F()}finally{z.transition=se}},gt.unstable_act=ee,gt.useCallback=function(F,se){return ue.current.useCallback(F,se)},gt.useContext=function(F){return ue.current.useContext(F)},gt.useDebugValue=function(){},gt.useDeferredValue=function(F){return ue.current.useDeferredValue(F)},gt.useEffect=function(F,se){return ue.current.useEffect(F,se)},gt.useId=function(){return ue.current.useId()},gt.useImperativeHandle=function(F,se,Ne){return ue.current.useImperativeHandle(F,se,Ne)},gt.useInsertionEffect=function(F,se){return ue.current.useInsertionEffect(F,se)},gt.useLayoutEffect=function(F,se){return ue.current.useLayoutEffect(F,se)},gt.useMemo=function(F,se){return ue.current.useMemo(F,se)},gt.useReducer=function(F,se,Ne){return ue.current.useReducer(F,se,Ne)},gt.useRef=function(F){return ue.current.useRef(F)},gt.useState=function(F){return ue.current.useState(F)},gt.useSyncExternalStore=function(F,se,Ne){return ue.current.useSyncExternalStore(F,se,Ne)},gt.useTransition=function(){return ue.current.useTransition()},gt.version="18.3.1",gt}var sm;function mh(){return sm||(sm=1,Vu.exports=o_()),Vu.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var om;function a_(){if(om)return jo;om=1;var s=mh(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function u(d,f,p){var g,v={},x=null,S=null;p!==void 0&&(x=""+p),f.key!==void 0&&(x=""+f.key),f.ref!==void 0&&(S=f.ref);for(g in f)r.call(f,g)&&!l.hasOwnProperty(g)&&(v[g]=f[g]);if(d&&d.defaultProps)for(g in f=d.defaultProps,f)v[g]===void 0&&(v[g]=f[g]);return{$$typeof:e,type:d,key:x,ref:S,props:v,_owner:a.current}}return jo.Fragment=t,jo.jsx=u,jo.jsxs=u,jo}var am;function l_(){return am||(am=1,Hu.exports=a_()),Hu.exports}var b=l_(),ft=mh(),ml={},Gu={exports:{}},Fn={},Wu={exports:{}},ju={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lm;function c_(){return lm||(lm=1,(function(s){function e(z,ce){var ee=z.length;z.push(ce);e:for(;0<ee;){var F=ee-1>>>1,se=z[F];if(0<a(se,ce))z[F]=ce,z[ee]=se,ee=F;else break e}}function t(z){return z.length===0?null:z[0]}function r(z){if(z.length===0)return null;var ce=z[0],ee=z.pop();if(ee!==ce){z[0]=ee;e:for(var F=0,se=z.length,Ne=se>>>1;F<Ne;){var Q=2*(F+1)-1,he=z[Q],Se=Q+1,ve=z[Se];if(0>a(he,ee))Se<se&&0>a(ve,he)?(z[F]=ve,z[Se]=ee,F=Se):(z[F]=he,z[Q]=ee,F=Q);else if(Se<se&&0>a(ve,ee))z[F]=ve,z[Se]=ee,F=Se;else break e}}return ce}function a(z,ce){var ee=z.sortIndex-ce.sortIndex;return ee!==0?ee:z.id-ce.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var u=Date,d=u.now();s.unstable_now=function(){return u.now()-d}}var f=[],p=[],g=1,v=null,x=3,S=!1,M=!1,w=!1,y=typeof setTimeout=="function"?setTimeout:null,_=typeof clearTimeout=="function"?clearTimeout:null,I=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function L(z){for(var ce=t(p);ce!==null;){if(ce.callback===null)r(p);else if(ce.startTime<=z)r(p),ce.sortIndex=ce.expirationTime,e(f,ce);else break;ce=t(p)}}function C(z){if(w=!1,L(z),!M)if(t(f)!==null)M=!0,oe(W);else{var ce=t(p);ce!==null&&ue(C,ce.startTime-z)}}function W(z,ce){M=!1,w&&(w=!1,_(k),k=-1),S=!0;var ee=x;try{for(L(ce),v=t(f);v!==null&&(!(v.expirationTime>ce)||z&&!H());){var F=v.callback;if(typeof F=="function"){v.callback=null,x=v.priorityLevel;var se=F(v.expirationTime<=ce);ce=s.unstable_now(),typeof se=="function"?v.callback=se:v===t(f)&&r(f),L(ce)}else r(f);v=t(f)}if(v!==null)var Ne=!0;else{var Q=t(p);Q!==null&&ue(C,Q.startTime-ce),Ne=!1}return Ne}finally{v=null,x=ee,S=!1}}var O=!1,U=null,k=-1,P=5,R=-1;function H(){return!(s.unstable_now()-R<P)}function re(){if(U!==null){var z=s.unstable_now();R=z;var ce=!0;try{ce=U(!0,z)}finally{ce?K():(O=!1,U=null)}}else O=!1}var K;if(typeof I=="function")K=function(){I(re)};else if(typeof MessageChannel<"u"){var le=new MessageChannel,de=le.port2;le.port1.onmessage=re,K=function(){de.postMessage(null)}}else K=function(){y(re,0)};function oe(z){U=z,O||(O=!0,K())}function ue(z,ce){k=y(function(){z(s.unstable_now())},ce)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(z){z.callback=null},s.unstable_continueExecution=function(){M||S||(M=!0,oe(W))},s.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<z?Math.floor(1e3/z):5},s.unstable_getCurrentPriorityLevel=function(){return x},s.unstable_getFirstCallbackNode=function(){return t(f)},s.unstable_next=function(z){switch(x){case 1:case 2:case 3:var ce=3;break;default:ce=x}var ee=x;x=ce;try{return z()}finally{x=ee}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(z,ce){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var ee=x;x=z;try{return ce()}finally{x=ee}},s.unstable_scheduleCallback=function(z,ce,ee){var F=s.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?F+ee:F):ee=F,z){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=ee+se,z={id:g++,callback:ce,priorityLevel:z,startTime:ee,expirationTime:se,sortIndex:-1},ee>F?(z.sortIndex=ee,e(p,z),t(f)===null&&z===t(p)&&(w?(_(k),k=-1):w=!0,ue(C,ee-F))):(z.sortIndex=se,e(f,z),M||S||(M=!0,oe(W))),z},s.unstable_shouldYield=H,s.unstable_wrapCallback=function(z){var ce=x;return function(){var ee=x;x=ce;try{return z.apply(this,arguments)}finally{x=ee}}}})(ju)),ju}var cm;function u_(){return cm||(cm=1,Wu.exports=c_()),Wu.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var um;function d_(){if(um)return Fn;um=1;var s=mh(),e=u_();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(n,i){u(n,i),u(n+"Capture",i)}function u(n,i){for(a[n]=i,n=0;n<i.length;n++)r.add(i[n])}var d=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),f=Object.prototype.hasOwnProperty,p=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},v={};function x(n){return f.call(v,n)?!0:f.call(g,n)?!1:p.test(n)?v[n]=!0:(g[n]=!0,!1)}function S(n,i,o,c){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return c?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function M(n,i,o,c){if(i===null||typeof i>"u"||S(n,i,o,c))return!0;if(c)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function w(n,i,o,c,h,m,E){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=c,this.attributeNamespace=h,this.mustUseProperty=o,this.propertyName=n,this.type=i,this.sanitizeURL=m,this.removeEmptyString=E}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){y[n]=new w(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];y[i]=new w(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){y[n]=new w(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){y[n]=new w(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){y[n]=new w(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){y[n]=new w(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){y[n]=new w(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){y[n]=new w(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){y[n]=new w(n,5,!1,n.toLowerCase(),null,!1,!1)});var _=/[\-:]([a-z])/g;function I(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(_,I);y[i]=new w(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(_,I);y[i]=new w(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(_,I);y[i]=new w(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){y[n]=new w(n,1,!1,n.toLowerCase(),null,!1,!1)}),y.xlinkHref=new w("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){y[n]=new w(n,1,!1,n.toLowerCase(),null,!0,!0)});function L(n,i,o,c){var h=y.hasOwnProperty(i)?y[i]:null;(h!==null?h.type!==0:c||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(M(i,o,h,c)&&(o=null),c||h===null?x(i)&&(o===null?n.removeAttribute(i):n.setAttribute(i,""+o)):h.mustUseProperty?n[h.propertyName]=o===null?h.type===3?!1:"":o:(i=h.attributeName,c=h.attributeNamespace,o===null?n.removeAttribute(i):(h=h.type,o=h===3||h===4&&o===!0?"":""+o,c?n.setAttributeNS(c,i,o):n.setAttribute(i,o))))}var C=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,W=Symbol.for("react.element"),O=Symbol.for("react.portal"),U=Symbol.for("react.fragment"),k=Symbol.for("react.strict_mode"),P=Symbol.for("react.profiler"),R=Symbol.for("react.provider"),H=Symbol.for("react.context"),re=Symbol.for("react.forward_ref"),K=Symbol.for("react.suspense"),le=Symbol.for("react.suspense_list"),de=Symbol.for("react.memo"),oe=Symbol.for("react.lazy"),ue=Symbol.for("react.offscreen"),z=Symbol.iterator;function ce(n){return n===null||typeof n!="object"?null:(n=z&&n[z]||n["@@iterator"],typeof n=="function"?n:null)}var ee=Object.assign,F;function se(n){if(F===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);F=i&&i[1]||""}return`
`+F+n}var Ne=!1;function Q(n,i){if(!n||Ne)return"";Ne=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(te){var c=te}Reflect.construct(n,[],i)}else{try{i.call()}catch(te){c=te}n.call(i.prototype)}else{try{throw Error()}catch(te){c=te}n()}}catch(te){if(te&&c&&typeof te.stack=="string"){for(var h=te.stack.split(`
`),m=c.stack.split(`
`),E=h.length-1,N=m.length-1;1<=E&&0<=N&&h[E]!==m[N];)N--;for(;1<=E&&0<=N;E--,N--)if(h[E]!==m[N]){if(E!==1||N!==1)do if(E--,N--,0>N||h[E]!==m[N]){var B=`
`+h[E].replace(" at new "," at ");return n.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",n.displayName)),B}while(1<=E&&0<=N);break}}}finally{Ne=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?se(n):""}function he(n){switch(n.tag){case 5:return se(n.type);case 16:return se("Lazy");case 13:return se("Suspense");case 19:return se("SuspenseList");case 0:case 2:case 15:return n=Q(n.type,!1),n;case 11:return n=Q(n.type.render,!1),n;case 1:return n=Q(n.type,!0),n;default:return""}}function Se(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case U:return"Fragment";case O:return"Portal";case P:return"Profiler";case k:return"StrictMode";case K:return"Suspense";case le:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case H:return(n.displayName||"Context")+".Consumer";case R:return(n._context.displayName||"Context")+".Provider";case re:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case de:return i=n.displayName||null,i!==null?i:Se(n.type)||"Memo";case oe:i=n._payload,n=n._init;try{return Se(n(i))}catch{}}return null}function ve(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Se(i);case 8:return i===k?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function Re(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ue(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function Ke(n){var i=Ue(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),c=""+n[i];if(!n.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var h=o.get,m=o.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return h.call(this)},set:function(E){c=""+E,m.call(this,E)}}),Object.defineProperty(n,i,{enumerable:o.enumerable}),{getValue:function(){return c},setValue:function(E){c=""+E},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function St(n){n._valueTracker||(n._valueTracker=Ke(n))}function pt(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var o=i.getValue(),c="";return n&&(c=Ue(n)?n.checked?"true":"false":n.value),n=c,n!==o?(i.setValue(n),!0):!1}function Dt(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function q(n,i){var o=i.checked;return ee({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function st(n,i){var o=i.defaultValue==null?"":i.defaultValue,c=i.checked!=null?i.checked:i.defaultChecked;o=Re(i.value!=null?i.value:o),n._wrapperState={initialChecked:c,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function $e(n,i){i=i.checked,i!=null&&L(n,"checked",i,!1)}function lt(n,i){$e(n,i);var o=Re(i.value),c=i.type;if(o!=null)c==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(c==="submit"||c==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?Pt(n,i.type,o):i.hasOwnProperty("defaultValue")&&Pt(n,i.type,Re(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Ze(n,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var c=i.type;if(!(c!=="submit"&&c!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,o||i===n.value||(n.value=i),n.defaultValue=i}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function Pt(n,i,o){(i!=="number"||Dt(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var Ye=Array.isArray;function D(n,i,o,c){if(n=n.options,i){i={};for(var h=0;h<o.length;h++)i["$"+o[h]]=!0;for(o=0;o<n.length;o++)h=i.hasOwnProperty("$"+n[o].value),n[o].selected!==h&&(n[o].selected=h),h&&c&&(n[o].defaultSelected=!0)}else{for(o=""+Re(o),i=null,h=0;h<n.length;h++){if(n[h].value===o){n[h].selected=!0,c&&(n[h].defaultSelected=!0);return}i!==null||n[h].disabled||(i=n[h])}i!==null&&(i.selected=!0)}}function T(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return ee({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function J(n,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(t(92));if(Ye(o)){if(1<o.length)throw Error(t(93));o=o[0]}i=o}i==null&&(i=""),o=i}n._wrapperState={initialValue:Re(o)}}function me(n,i){var o=Re(i.value),c=Re(i.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),i.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),c!=null&&(n.defaultValue=""+c)}function _e(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function fe(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ge(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?fe(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Ce,Fe=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,c,h){MSApp.execUnsafeLocalFunction(function(){return n(i,o,c,h)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Ce=Ce||document.createElement("div"),Ce.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Ce.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function ht(n,i){if(i){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=i;return}}n.textContent=i}var Me={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ke=["Webkit","ms","Moz","O"];Object.keys(Me).forEach(function(n){ke.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Me[i]=Me[n]})});function et(n,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Me.hasOwnProperty(n)&&Me[n]?(""+i).trim():i+"px"}function tt(n,i){n=n.style;for(var o in i)if(i.hasOwnProperty(o)){var c=o.indexOf("--")===0,h=et(o,i[o],c);o==="float"&&(o="cssFloat"),c?n.setProperty(o,h):n[o]=h}}var Be=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function mt(n,i){if(i){if(Be[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function ot(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var bt=null;function G(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var be=null,ae=null,pe=null;function De(n){if(n=Po(n)){if(typeof be!="function")throw Error(t(280));var i=n.stateNode;i&&(i=Pa(i),be(n.stateNode,n.type,i))}}function Le(n){ae?pe?pe.push(n):pe=[n]:ae=n}function at(){if(ae){var n=ae,i=pe;if(pe=ae=null,De(n),i)for(n=0;n<i.length;n++)De(i[n])}}function Ft(n,i){return n(i)}function Zt(){}var Et=!1;function bn(n,i,o){if(Et)return n(i,o);Et=!0;try{return Ft(n,i,o)}finally{Et=!1,(ae!==null||pe!==null)&&(Zt(),at())}}function Sn(n,i){var o=n.stateNode;if(o===null)return null;var c=Pa(o);if(c===null)return null;o=c[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(c=!c.disabled)||(n=n.type,c=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!c;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,i,typeof o));return o}var ss=!1;if(d)try{var Ki={};Object.defineProperty(Ki,"passive",{get:function(){ss=!0}}),window.addEventListener("test",Ki,Ki),window.removeEventListener("test",Ki,Ki)}catch{ss=!1}function bi(n,i,o,c,h,m,E,N,B){var te=Array.prototype.slice.call(arguments,3);try{i.apply(o,te)}catch(xe){this.onError(xe)}}var Pi=!1,Cr=null,br=!1,Zi=null,ua={onError:function(n){Pi=!0,Cr=n}};function os(n,i,o,c,h,m,E,N,B){Pi=!1,Cr=null,bi.apply(ua,arguments)}function da(n,i,o,c,h,m,E,N,B){if(os.apply(this,arguments),Pi){if(Pi){var te=Cr;Pi=!1,Cr=null}else throw Error(t(198));br||(br=!0,Zi=te)}}function _i(n){var i=n,o=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(o=i.return),n=i.return;while(n)}return i.tag===3?o:null}function ha(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function fa(n){if(_i(n)!==n)throw Error(t(188))}function cc(n){var i=n.alternate;if(!i){if(i=_i(n),i===null)throw Error(t(188));return i!==n?null:n}for(var o=n,c=i;;){var h=o.return;if(h===null)break;var m=h.alternate;if(m===null){if(c=h.return,c!==null){o=c;continue}break}if(h.child===m.child){for(m=h.child;m;){if(m===o)return fa(h),n;if(m===c)return fa(h),i;m=m.sibling}throw Error(t(188))}if(o.return!==c.return)o=h,c=m;else{for(var E=!1,N=h.child;N;){if(N===o){E=!0,o=h,c=m;break}if(N===c){E=!0,c=h,o=m;break}N=N.sibling}if(!E){for(N=m.child;N;){if(N===o){E=!0,o=m,c=h;break}if(N===c){E=!0,c=m,o=h;break}N=N.sibling}if(!E)throw Error(t(189))}}if(o.alternate!==c)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:i}function A(n){return n=cc(n),n!==null?X(n):null}function X(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=X(n);if(i!==null)return i;n=n.sibling}return null}var ne=e.unstable_scheduleCallback,ie=e.unstable_cancelCallback,Y=e.unstable_shouldYield,Ae=e.unstable_requestPaint,Ee=e.unstable_now,We=e.unstable_getCurrentPriorityLevel,He=e.unstable_ImmediatePriority,nt=e.unstable_UserBlockingPriority,rt=e.unstable_NormalPriority,je=e.unstable_LowPriority,yt=e.unstable_IdlePriority,Ct=null,_t=null;function fn(n){if(_t&&typeof _t.onCommitFiberRoot=="function")try{_t.onCommitFiberRoot(Ct,n,void 0,(n.current.flags&128)===128)}catch{}}var ct=Math.clz32?Math.clz32:At,qe=Math.log,ri=Math.LN2;function At(n){return n>>>=0,n===0?32:31-(qe(n)/ri|0)|0}var pn=64,si=4194304;function Qt(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function xi(n,i){var o=n.pendingLanes;if(o===0)return 0;var c=0,h=n.suspendedLanes,m=n.pingedLanes,E=o&268435455;if(E!==0){var N=E&~h;N!==0?c=Qt(N):(m&=E,m!==0&&(c=Qt(m)))}else E=o&~h,E!==0?c=Qt(E):m!==0&&(c=Qt(m));if(c===0)return 0;if(i!==0&&i!==c&&(i&h)===0&&(h=c&-c,m=i&-i,h>=m||h===16&&(m&4194240)!==0))return i;if((c&4)!==0&&(c|=o&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=c;0<i;)o=31-ct(i),h=1<<o,c|=n[o],i&=~h;return c}function Nt(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Yn(n,i){for(var o=n.suspendedLanes,c=n.pingedLanes,h=n.expirationTimes,m=n.pendingLanes;0<m;){var E=31-ct(m),N=1<<E,B=h[E];B===-1?((N&o)===0||(N&c)!==0)&&(h[E]=Nt(N,i)):B<=i&&(n.expiredLanes|=N),m&=~N}}function Li(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Mn(){var n=pn;return pn<<=1,(pn&4194240)===0&&(pn=64),n}function $n(n){for(var i=[],o=0;31>o;o++)i.push(n);return i}function Pn(n,i,o){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-ct(i),n[i]=o}function pa(n,i){var o=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var c=n.eventTimes;for(n=n.expirationTimes;0<o;){var h=31-ct(o),m=1<<h;i[h]=0,c[h]=-1,n[h]=-1,o&=~m}}function uc(n,i){var o=n.entangledLanes|=i;for(n=n.entanglements;o;){var c=31-ct(o),h=1<<c;h&i|n[c]&i&&(n[c]|=i),o&=~h}}var Lt=0;function Uh(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var Fh,dc,Oh,kh,Bh,hc=!1,ma=[],Qi=null,Ji=null,er=null,po=new Map,mo=new Map,tr=[],A0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function zh(n,i){switch(n){case"focusin":case"focusout":Qi=null;break;case"dragenter":case"dragleave":Ji=null;break;case"mouseover":case"mouseout":er=null;break;case"pointerover":case"pointerout":po.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":mo.delete(i.pointerId)}}function go(n,i,o,c,h,m){return n===null||n.nativeEvent!==m?(n={blockedOn:i,domEventName:o,eventSystemFlags:c,nativeEvent:m,targetContainers:[h]},i!==null&&(i=Po(i),i!==null&&dc(i)),n):(n.eventSystemFlags|=c,i=n.targetContainers,h!==null&&i.indexOf(h)===-1&&i.push(h),n)}function R0(n,i,o,c,h){switch(i){case"focusin":return Qi=go(Qi,n,i,o,c,h),!0;case"dragenter":return Ji=go(Ji,n,i,o,c,h),!0;case"mouseover":return er=go(er,n,i,o,c,h),!0;case"pointerover":var m=h.pointerId;return po.set(m,go(po.get(m)||null,n,i,o,c,h)),!0;case"gotpointercapture":return m=h.pointerId,mo.set(m,go(mo.get(m)||null,n,i,o,c,h)),!0}return!1}function Hh(n){var i=Pr(n.target);if(i!==null){var o=_i(i);if(o!==null){if(i=o.tag,i===13){if(i=ha(o),i!==null){n.blockedOn=i,Bh(n.priority,function(){Oh(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function ga(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var o=pc(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var c=new o.constructor(o.type,o);bt=c,o.target.dispatchEvent(c),bt=null}else return i=Po(o),i!==null&&dc(i),n.blockedOn=o,!1;i.shift()}return!0}function Vh(n,i,o){ga(n)&&o.delete(i)}function C0(){hc=!1,Qi!==null&&ga(Qi)&&(Qi=null),Ji!==null&&ga(Ji)&&(Ji=null),er!==null&&ga(er)&&(er=null),po.forEach(Vh),mo.forEach(Vh)}function vo(n,i){n.blockedOn===i&&(n.blockedOn=null,hc||(hc=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,C0)))}function _o(n){function i(h){return vo(h,n)}if(0<ma.length){vo(ma[0],n);for(var o=1;o<ma.length;o++){var c=ma[o];c.blockedOn===n&&(c.blockedOn=null)}}for(Qi!==null&&vo(Qi,n),Ji!==null&&vo(Ji,n),er!==null&&vo(er,n),po.forEach(i),mo.forEach(i),o=0;o<tr.length;o++)c=tr[o],c.blockedOn===n&&(c.blockedOn=null);for(;0<tr.length&&(o=tr[0],o.blockedOn===null);)Hh(o),o.blockedOn===null&&tr.shift()}var as=C.ReactCurrentBatchConfig,va=!0;function b0(n,i,o,c){var h=Lt,m=as.transition;as.transition=null;try{Lt=1,fc(n,i,o,c)}finally{Lt=h,as.transition=m}}function P0(n,i,o,c){var h=Lt,m=as.transition;as.transition=null;try{Lt=4,fc(n,i,o,c)}finally{Lt=h,as.transition=m}}function fc(n,i,o,c){if(va){var h=pc(n,i,o,c);if(h===null)Lc(n,i,c,_a,o),zh(n,c);else if(R0(h,n,i,o,c))c.stopPropagation();else if(zh(n,c),i&4&&-1<A0.indexOf(n)){for(;h!==null;){var m=Po(h);if(m!==null&&Fh(m),m=pc(n,i,o,c),m===null&&Lc(n,i,c,_a,o),m===h)break;h=m}h!==null&&c.stopPropagation()}else Lc(n,i,c,null,o)}}var _a=null;function pc(n,i,o,c){if(_a=null,n=G(c),n=Pr(n),n!==null)if(i=_i(n),i===null)n=null;else if(o=i.tag,o===13){if(n=ha(i),n!==null)return n;n=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return _a=n,null}function Gh(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(We()){case He:return 1;case nt:return 4;case rt:case je:return 16;case yt:return 536870912;default:return 16}default:return 16}}var nr=null,mc=null,xa=null;function Wh(){if(xa)return xa;var n,i=mc,o=i.length,c,h="value"in nr?nr.value:nr.textContent,m=h.length;for(n=0;n<o&&i[n]===h[n];n++);var E=o-n;for(c=1;c<=E&&i[o-c]===h[m-c];c++);return xa=h.slice(n,1<c?1-c:void 0)}function ya(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Sa(){return!0}function jh(){return!1}function Bn(n){function i(o,c,h,m,E){this._reactName=o,this._targetInst=h,this.type=c,this.nativeEvent=m,this.target=E,this.currentTarget=null;for(var N in n)n.hasOwnProperty(N)&&(o=n[N],this[N]=o?o(m):m[N]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Sa:jh,this.isPropagationStopped=jh,this}return ee(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Sa)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Sa)},persist:function(){},isPersistent:Sa}),i}var ls={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},gc=Bn(ls),xo=ee({},ls,{view:0,detail:0}),L0=Bn(xo),vc,_c,yo,Ma=ee({},xo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:yc,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==yo&&(yo&&n.type==="mousemove"?(vc=n.screenX-yo.screenX,_c=n.screenY-yo.screenY):_c=vc=0,yo=n),vc)},movementY:function(n){return"movementY"in n?n.movementY:_c}}),Xh=Bn(Ma),D0=ee({},Ma,{dataTransfer:0}),I0=Bn(D0),N0=ee({},xo,{relatedTarget:0}),xc=Bn(N0),U0=ee({},ls,{animationName:0,elapsedTime:0,pseudoElement:0}),F0=Bn(U0),O0=ee({},ls,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),k0=Bn(O0),B0=ee({},ls,{data:0}),qh=Bn(B0),z0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},H0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},V0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function G0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=V0[n])?!!i[n]:!1}function yc(){return G0}var W0=ee({},xo,{key:function(n){if(n.key){var i=z0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=ya(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?H0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:yc,charCode:function(n){return n.type==="keypress"?ya(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?ya(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),j0=Bn(W0),X0=ee({},Ma,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Yh=Bn(X0),q0=ee({},xo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:yc}),Y0=Bn(q0),$0=ee({},ls,{propertyName:0,elapsedTime:0,pseudoElement:0}),K0=Bn($0),Z0=ee({},Ma,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),Q0=Bn(Z0),J0=[9,13,27,32],Sc=d&&"CompositionEvent"in window,So=null;d&&"documentMode"in document&&(So=document.documentMode);var ev=d&&"TextEvent"in window&&!So,$h=d&&(!Sc||So&&8<So&&11>=So),Kh=" ",Zh=!1;function Qh(n,i){switch(n){case"keyup":return J0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Jh(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var cs=!1;function tv(n,i){switch(n){case"compositionend":return Jh(i);case"keypress":return i.which!==32?null:(Zh=!0,Kh);case"textInput":return n=i.data,n===Kh&&Zh?null:n;default:return null}}function nv(n,i){if(cs)return n==="compositionend"||!Sc&&Qh(n,i)?(n=Wh(),xa=mc=nr=null,cs=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return $h&&i.locale!=="ko"?null:i.data;default:return null}}var iv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ef(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!iv[n.type]:i==="textarea"}function tf(n,i,o,c){Le(c),i=Ra(i,"onChange"),0<i.length&&(o=new gc("onChange","change",null,o,c),n.push({event:o,listeners:i}))}var Mo=null,Eo=null;function rv(n){yf(n,0)}function Ea(n){var i=ps(n);if(pt(i))return n}function sv(n,i){if(n==="change")return i}var nf=!1;if(d){var Mc;if(d){var Ec="oninput"in document;if(!Ec){var rf=document.createElement("div");rf.setAttribute("oninput","return;"),Ec=typeof rf.oninput=="function"}Mc=Ec}else Mc=!1;nf=Mc&&(!document.documentMode||9<document.documentMode)}function sf(){Mo&&(Mo.detachEvent("onpropertychange",of),Eo=Mo=null)}function of(n){if(n.propertyName==="value"&&Ea(Eo)){var i=[];tf(i,Eo,n,G(n)),bn(rv,i)}}function ov(n,i,o){n==="focusin"?(sf(),Mo=i,Eo=o,Mo.attachEvent("onpropertychange",of)):n==="focusout"&&sf()}function av(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Ea(Eo)}function lv(n,i){if(n==="click")return Ea(i)}function cv(n,i){if(n==="input"||n==="change")return Ea(i)}function uv(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var oi=typeof Object.is=="function"?Object.is:uv;function wo(n,i){if(oi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var o=Object.keys(n),c=Object.keys(i);if(o.length!==c.length)return!1;for(c=0;c<o.length;c++){var h=o[c];if(!f.call(i,h)||!oi(n[h],i[h]))return!1}return!0}function af(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function lf(n,i){var o=af(n);n=0;for(var c;o;){if(o.nodeType===3){if(c=n+o.textContent.length,n<=i&&c>=i)return{node:o,offset:i-n};n=c}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=af(o)}}function cf(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?cf(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function uf(){for(var n=window,i=Dt();i instanceof n.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)n=i.contentWindow;else break;i=Dt(n.document)}return i}function wc(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function dv(n){var i=uf(),o=n.focusedElem,c=n.selectionRange;if(i!==o&&o&&o.ownerDocument&&cf(o.ownerDocument.documentElement,o)){if(c!==null&&wc(o)){if(i=c.start,n=c.end,n===void 0&&(n=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(n,o.value.length);else if(n=(i=o.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var h=o.textContent.length,m=Math.min(c.start,h);c=c.end===void 0?m:Math.min(c.end,h),!n.extend&&m>c&&(h=c,c=m,m=h),h=lf(o,m);var E=lf(o,c);h&&E&&(n.rangeCount!==1||n.anchorNode!==h.node||n.anchorOffset!==h.offset||n.focusNode!==E.node||n.focusOffset!==E.offset)&&(i=i.createRange(),i.setStart(h.node,h.offset),n.removeAllRanges(),m>c?(n.addRange(i),n.extend(E.node,E.offset)):(i.setEnd(E.node,E.offset),n.addRange(i)))}}for(i=[],n=o;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)n=i[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var hv=d&&"documentMode"in document&&11>=document.documentMode,us=null,Tc=null,To=null,Ac=!1;function df(n,i,o){var c=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;Ac||us==null||us!==Dt(c)||(c=us,"selectionStart"in c&&wc(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset}),To&&wo(To,c)||(To=c,c=Ra(Tc,"onSelect"),0<c.length&&(i=new gc("onSelect","select",null,i,o),n.push({event:i,listeners:c}),i.target=us)))}function wa(n,i){var o={};return o[n.toLowerCase()]=i.toLowerCase(),o["Webkit"+n]="webkit"+i,o["Moz"+n]="moz"+i,o}var ds={animationend:wa("Animation","AnimationEnd"),animationiteration:wa("Animation","AnimationIteration"),animationstart:wa("Animation","AnimationStart"),transitionend:wa("Transition","TransitionEnd")},Rc={},hf={};d&&(hf=document.createElement("div").style,"AnimationEvent"in window||(delete ds.animationend.animation,delete ds.animationiteration.animation,delete ds.animationstart.animation),"TransitionEvent"in window||delete ds.transitionend.transition);function Ta(n){if(Rc[n])return Rc[n];if(!ds[n])return n;var i=ds[n],o;for(o in i)if(i.hasOwnProperty(o)&&o in hf)return Rc[n]=i[o];return n}var ff=Ta("animationend"),pf=Ta("animationiteration"),mf=Ta("animationstart"),gf=Ta("transitionend"),vf=new Map,_f="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function ir(n,i){vf.set(n,i),l(i,[n])}for(var Cc=0;Cc<_f.length;Cc++){var bc=_f[Cc],fv=bc.toLowerCase(),pv=bc[0].toUpperCase()+bc.slice(1);ir(fv,"on"+pv)}ir(ff,"onAnimationEnd"),ir(pf,"onAnimationIteration"),ir(mf,"onAnimationStart"),ir("dblclick","onDoubleClick"),ir("focusin","onFocus"),ir("focusout","onBlur"),ir(gf,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ao="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mv=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ao));function xf(n,i,o){var c=n.type||"unknown-event";n.currentTarget=o,da(c,i,void 0,n),n.currentTarget=null}function yf(n,i){i=(i&4)!==0;for(var o=0;o<n.length;o++){var c=n[o],h=c.event;c=c.listeners;e:{var m=void 0;if(i)for(var E=c.length-1;0<=E;E--){var N=c[E],B=N.instance,te=N.currentTarget;if(N=N.listener,B!==m&&h.isPropagationStopped())break e;xf(h,N,te),m=B}else for(E=0;E<c.length;E++){if(N=c[E],B=N.instance,te=N.currentTarget,N=N.listener,B!==m&&h.isPropagationStopped())break e;xf(h,N,te),m=B}}}if(br)throw n=Zi,br=!1,Zi=null,n}function Ot(n,i){var o=i[Oc];o===void 0&&(o=i[Oc]=new Set);var c=n+"__bubble";o.has(c)||(Sf(i,n,2,!1),o.add(c))}function Pc(n,i,o){var c=0;i&&(c|=4),Sf(o,n,c,i)}var Aa="_reactListening"+Math.random().toString(36).slice(2);function Ro(n){if(!n[Aa]){n[Aa]=!0,r.forEach(function(o){o!=="selectionchange"&&(mv.has(o)||Pc(o,!1,n),Pc(o,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Aa]||(i[Aa]=!0,Pc("selectionchange",!1,i))}}function Sf(n,i,o,c){switch(Gh(i)){case 1:var h=b0;break;case 4:h=P0;break;default:h=fc}o=h.bind(null,i,o,n),h=void 0,!ss||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(h=!0),c?h!==void 0?n.addEventListener(i,o,{capture:!0,passive:h}):n.addEventListener(i,o,!0):h!==void 0?n.addEventListener(i,o,{passive:h}):n.addEventListener(i,o,!1)}function Lc(n,i,o,c,h){var m=c;if((i&1)===0&&(i&2)===0&&c!==null)e:for(;;){if(c===null)return;var E=c.tag;if(E===3||E===4){var N=c.stateNode.containerInfo;if(N===h||N.nodeType===8&&N.parentNode===h)break;if(E===4)for(E=c.return;E!==null;){var B=E.tag;if((B===3||B===4)&&(B=E.stateNode.containerInfo,B===h||B.nodeType===8&&B.parentNode===h))return;E=E.return}for(;N!==null;){if(E=Pr(N),E===null)return;if(B=E.tag,B===5||B===6){c=m=E;continue e}N=N.parentNode}}c=c.return}bn(function(){var te=m,xe=G(o),ye=[];e:{var ge=vf.get(n);if(ge!==void 0){var Ie=gc,ze=n;switch(n){case"keypress":if(ya(o)===0)break e;case"keydown":case"keyup":Ie=j0;break;case"focusin":ze="focus",Ie=xc;break;case"focusout":ze="blur",Ie=xc;break;case"beforeblur":case"afterblur":Ie=xc;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Ie=Xh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Ie=I0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Ie=Y0;break;case ff:case pf:case mf:Ie=F0;break;case gf:Ie=K0;break;case"scroll":Ie=L0;break;case"wheel":Ie=Q0;break;case"copy":case"cut":case"paste":Ie=k0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Ie=Yh}var Ve=(i&4)!==0,qt=!Ve&&n==="scroll",$=Ve?ge!==null?ge+"Capture":null:ge;Ve=[];for(var V=te,Z;V!==null;){Z=V;var Te=Z.stateNode;if(Z.tag===5&&Te!==null&&(Z=Te,$!==null&&(Te=Sn(V,$),Te!=null&&Ve.push(Co(V,Te,Z)))),qt)break;V=V.return}0<Ve.length&&(ge=new Ie(ge,ze,null,o,xe),ye.push({event:ge,listeners:Ve}))}}if((i&7)===0){e:{if(ge=n==="mouseover"||n==="pointerover",Ie=n==="mouseout"||n==="pointerout",ge&&o!==bt&&(ze=o.relatedTarget||o.fromElement)&&(Pr(ze)||ze[Di]))break e;if((Ie||ge)&&(ge=xe.window===xe?xe:(ge=xe.ownerDocument)?ge.defaultView||ge.parentWindow:window,Ie?(ze=o.relatedTarget||o.toElement,Ie=te,ze=ze?Pr(ze):null,ze!==null&&(qt=_i(ze),ze!==qt||ze.tag!==5&&ze.tag!==6)&&(ze=null)):(Ie=null,ze=te),Ie!==ze)){if(Ve=Xh,Te="onMouseLeave",$="onMouseEnter",V="mouse",(n==="pointerout"||n==="pointerover")&&(Ve=Yh,Te="onPointerLeave",$="onPointerEnter",V="pointer"),qt=Ie==null?ge:ps(Ie),Z=ze==null?ge:ps(ze),ge=new Ve(Te,V+"leave",Ie,o,xe),ge.target=qt,ge.relatedTarget=Z,Te=null,Pr(xe)===te&&(Ve=new Ve($,V+"enter",ze,o,xe),Ve.target=Z,Ve.relatedTarget=qt,Te=Ve),qt=Te,Ie&&ze)t:{for(Ve=Ie,$=ze,V=0,Z=Ve;Z;Z=hs(Z))V++;for(Z=0,Te=$;Te;Te=hs(Te))Z++;for(;0<V-Z;)Ve=hs(Ve),V--;for(;0<Z-V;)$=hs($),Z--;for(;V--;){if(Ve===$||$!==null&&Ve===$.alternate)break t;Ve=hs(Ve),$=hs($)}Ve=null}else Ve=null;Ie!==null&&Mf(ye,ge,Ie,Ve,!1),ze!==null&&qt!==null&&Mf(ye,qt,ze,Ve,!0)}}e:{if(ge=te?ps(te):window,Ie=ge.nodeName&&ge.nodeName.toLowerCase(),Ie==="select"||Ie==="input"&&ge.type==="file")var Xe=sv;else if(ef(ge))if(nf)Xe=cv;else{Xe=av;var Qe=ov}else(Ie=ge.nodeName)&&Ie.toLowerCase()==="input"&&(ge.type==="checkbox"||ge.type==="radio")&&(Xe=lv);if(Xe&&(Xe=Xe(n,te))){tf(ye,Xe,o,xe);break e}Qe&&Qe(n,ge,te),n==="focusout"&&(Qe=ge._wrapperState)&&Qe.controlled&&ge.type==="number"&&Pt(ge,"number",ge.value)}switch(Qe=te?ps(te):window,n){case"focusin":(ef(Qe)||Qe.contentEditable==="true")&&(us=Qe,Tc=te,To=null);break;case"focusout":To=Tc=us=null;break;case"mousedown":Ac=!0;break;case"contextmenu":case"mouseup":case"dragend":Ac=!1,df(ye,o,xe);break;case"selectionchange":if(hv)break;case"keydown":case"keyup":df(ye,o,xe)}var Je;if(Sc)e:{switch(n){case"compositionstart":var it="onCompositionStart";break e;case"compositionend":it="onCompositionEnd";break e;case"compositionupdate":it="onCompositionUpdate";break e}it=void 0}else cs?Qh(n,o)&&(it="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(it="onCompositionStart");it&&($h&&o.locale!=="ko"&&(cs||it!=="onCompositionStart"?it==="onCompositionEnd"&&cs&&(Je=Wh()):(nr=xe,mc="value"in nr?nr.value:nr.textContent,cs=!0)),Qe=Ra(te,it),0<Qe.length&&(it=new qh(it,n,null,o,xe),ye.push({event:it,listeners:Qe}),Je?it.data=Je:(Je=Jh(o),Je!==null&&(it.data=Je)))),(Je=ev?tv(n,o):nv(n,o))&&(te=Ra(te,"onBeforeInput"),0<te.length&&(xe=new qh("onBeforeInput","beforeinput",null,o,xe),ye.push({event:xe,listeners:te}),xe.data=Je))}yf(ye,i)})}function Co(n,i,o){return{instance:n,listener:i,currentTarget:o}}function Ra(n,i){for(var o=i+"Capture",c=[];n!==null;){var h=n,m=h.stateNode;h.tag===5&&m!==null&&(h=m,m=Sn(n,o),m!=null&&c.unshift(Co(n,m,h)),m=Sn(n,i),m!=null&&c.push(Co(n,m,h))),n=n.return}return c}function hs(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function Mf(n,i,o,c,h){for(var m=i._reactName,E=[];o!==null&&o!==c;){var N=o,B=N.alternate,te=N.stateNode;if(B!==null&&B===c)break;N.tag===5&&te!==null&&(N=te,h?(B=Sn(o,m),B!=null&&E.unshift(Co(o,B,N))):h||(B=Sn(o,m),B!=null&&E.push(Co(o,B,N)))),o=o.return}E.length!==0&&n.push({event:i,listeners:E})}var gv=/\r\n?/g,vv=/\u0000|\uFFFD/g;function Ef(n){return(typeof n=="string"?n:""+n).replace(gv,`
`).replace(vv,"")}function Ca(n,i,o){if(i=Ef(i),Ef(n)!==i&&o)throw Error(t(425))}function ba(){}var Dc=null,Ic=null;function Nc(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var Uc=typeof setTimeout=="function"?setTimeout:void 0,_v=typeof clearTimeout=="function"?clearTimeout:void 0,wf=typeof Promise=="function"?Promise:void 0,xv=typeof queueMicrotask=="function"?queueMicrotask:typeof wf<"u"?function(n){return wf.resolve(null).then(n).catch(yv)}:Uc;function yv(n){setTimeout(function(){throw n})}function Fc(n,i){var o=i,c=0;do{var h=o.nextSibling;if(n.removeChild(o),h&&h.nodeType===8)if(o=h.data,o==="/$"){if(c===0){n.removeChild(h),_o(i);return}c--}else o!=="$"&&o!=="$?"&&o!=="$!"||c++;o=h}while(o);_o(i)}function rr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function Tf(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return n;i--}else o==="/$"&&i++}n=n.previousSibling}return null}var fs=Math.random().toString(36).slice(2),yi="__reactFiber$"+fs,bo="__reactProps$"+fs,Di="__reactContainer$"+fs,Oc="__reactEvents$"+fs,Sv="__reactListeners$"+fs,Mv="__reactHandles$"+fs;function Pr(n){var i=n[yi];if(i)return i;for(var o=n.parentNode;o;){if(i=o[Di]||o[yi]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(n=Tf(n);n!==null;){if(o=n[yi])return o;n=Tf(n)}return i}n=o,o=n.parentNode}return null}function Po(n){return n=n[yi]||n[Di],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function ps(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function Pa(n){return n[bo]||null}var kc=[],ms=-1;function sr(n){return{current:n}}function kt(n){0>ms||(n.current=kc[ms],kc[ms]=null,ms--)}function Ut(n,i){ms++,kc[ms]=n.current,n.current=i}var or={},mn=sr(or),Ln=sr(!1),Lr=or;function gs(n,i){var o=n.type.contextTypes;if(!o)return or;var c=n.stateNode;if(c&&c.__reactInternalMemoizedUnmaskedChildContext===i)return c.__reactInternalMemoizedMaskedChildContext;var h={},m;for(m in o)h[m]=i[m];return c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=h),h}function Dn(n){return n=n.childContextTypes,n!=null}function La(){kt(Ln),kt(mn)}function Af(n,i,o){if(mn.current!==or)throw Error(t(168));Ut(mn,i),Ut(Ln,o)}function Rf(n,i,o){var c=n.stateNode;if(i=i.childContextTypes,typeof c.getChildContext!="function")return o;c=c.getChildContext();for(var h in c)if(!(h in i))throw Error(t(108,ve(n)||"Unknown",h));return ee({},o,c)}function Da(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||or,Lr=mn.current,Ut(mn,n),Ut(Ln,Ln.current),!0}function Cf(n,i,o){var c=n.stateNode;if(!c)throw Error(t(169));o?(n=Rf(n,i,Lr),c.__reactInternalMemoizedMergedChildContext=n,kt(Ln),kt(mn),Ut(mn,n)):kt(Ln),Ut(Ln,o)}var Ii=null,Ia=!1,Bc=!1;function bf(n){Ii===null?Ii=[n]:Ii.push(n)}function Ev(n){Ia=!0,bf(n)}function ar(){if(!Bc&&Ii!==null){Bc=!0;var n=0,i=Lt;try{var o=Ii;for(Lt=1;n<o.length;n++){var c=o[n];do c=c(!0);while(c!==null)}Ii=null,Ia=!1}catch(h){throw Ii!==null&&(Ii=Ii.slice(n+1)),ne(He,ar),h}finally{Lt=i,Bc=!1}}return null}var vs=[],_s=0,Na=null,Ua=0,Kn=[],Zn=0,Dr=null,Ni=1,Ui="";function Ir(n,i){vs[_s++]=Ua,vs[_s++]=Na,Na=n,Ua=i}function Pf(n,i,o){Kn[Zn++]=Ni,Kn[Zn++]=Ui,Kn[Zn++]=Dr,Dr=n;var c=Ni;n=Ui;var h=32-ct(c)-1;c&=~(1<<h),o+=1;var m=32-ct(i)+h;if(30<m){var E=h-h%5;m=(c&(1<<E)-1).toString(32),c>>=E,h-=E,Ni=1<<32-ct(i)+h|o<<h|c,Ui=m+n}else Ni=1<<m|o<<h|c,Ui=n}function zc(n){n.return!==null&&(Ir(n,1),Pf(n,1,0))}function Hc(n){for(;n===Na;)Na=vs[--_s],vs[_s]=null,Ua=vs[--_s],vs[_s]=null;for(;n===Dr;)Dr=Kn[--Zn],Kn[Zn]=null,Ui=Kn[--Zn],Kn[Zn]=null,Ni=Kn[--Zn],Kn[Zn]=null}var zn=null,Hn=null,Ht=!1,ai=null;function Lf(n,i){var o=ti(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=n,i=n.deletions,i===null?(n.deletions=[o],n.flags|=16):i.push(o)}function Df(n,i){switch(n.tag){case 5:var o=n.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,zn=n,Hn=rr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,zn=n,Hn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=Dr!==null?{id:Ni,overflow:Ui}:null,n.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=ti(18,null,null,0),o.stateNode=i,o.return=n,n.child=o,zn=n,Hn=null,!0):!1;default:return!1}}function Vc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function Gc(n){if(Ht){var i=Hn;if(i){var o=i;if(!Df(n,i)){if(Vc(n))throw Error(t(418));i=rr(o.nextSibling);var c=zn;i&&Df(n,i)?Lf(c,o):(n.flags=n.flags&-4097|2,Ht=!1,zn=n)}}else{if(Vc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Ht=!1,zn=n}}}function If(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;zn=n}function Fa(n){if(n!==zn)return!1;if(!Ht)return If(n),Ht=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Nc(n.type,n.memoizedProps)),i&&(i=Hn)){if(Vc(n))throw Nf(),Error(t(418));for(;i;)Lf(n,i),i=rr(i.nextSibling)}if(If(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(i===0){Hn=rr(n.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}n=n.nextSibling}Hn=null}}else Hn=zn?rr(n.stateNode.nextSibling):null;return!0}function Nf(){for(var n=Hn;n;)n=rr(n.nextSibling)}function xs(){Hn=zn=null,Ht=!1}function Wc(n){ai===null?ai=[n]:ai.push(n)}var wv=C.ReactCurrentBatchConfig;function Lo(n,i,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var c=o.stateNode}if(!c)throw Error(t(147,n));var h=c,m=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(E){var N=h.refs;E===null?delete N[m]:N[m]=E},i._stringRef=m,i)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function Oa(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function Uf(n){var i=n._init;return i(n._payload)}function Ff(n){function i($,V){if(n){var Z=$.deletions;Z===null?($.deletions=[V],$.flags|=16):Z.push(V)}}function o($,V){if(!n)return null;for(;V!==null;)i($,V),V=V.sibling;return null}function c($,V){for($=new Map;V!==null;)V.key!==null?$.set(V.key,V):$.set(V.index,V),V=V.sibling;return $}function h($,V){return $=mr($,V),$.index=0,$.sibling=null,$}function m($,V,Z){return $.index=Z,n?(Z=$.alternate,Z!==null?(Z=Z.index,Z<V?($.flags|=2,V):Z):($.flags|=2,V)):($.flags|=1048576,V)}function E($){return n&&$.alternate===null&&($.flags|=2),$}function N($,V,Z,Te){return V===null||V.tag!==6?(V=Uu(Z,$.mode,Te),V.return=$,V):(V=h(V,Z),V.return=$,V)}function B($,V,Z,Te){var Xe=Z.type;return Xe===U?xe($,V,Z.props.children,Te,Z.key):V!==null&&(V.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===oe&&Uf(Xe)===V.type)?(Te=h(V,Z.props),Te.ref=Lo($,V,Z),Te.return=$,Te):(Te=al(Z.type,Z.key,Z.props,null,$.mode,Te),Te.ref=Lo($,V,Z),Te.return=$,Te)}function te($,V,Z,Te){return V===null||V.tag!==4||V.stateNode.containerInfo!==Z.containerInfo||V.stateNode.implementation!==Z.implementation?(V=Fu(Z,$.mode,Te),V.return=$,V):(V=h(V,Z.children||[]),V.return=$,V)}function xe($,V,Z,Te,Xe){return V===null||V.tag!==7?(V=Hr(Z,$.mode,Te,Xe),V.return=$,V):(V=h(V,Z),V.return=$,V)}function ye($,V,Z){if(typeof V=="string"&&V!==""||typeof V=="number")return V=Uu(""+V,$.mode,Z),V.return=$,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case W:return Z=al(V.type,V.key,V.props,null,$.mode,Z),Z.ref=Lo($,null,V),Z.return=$,Z;case O:return V=Fu(V,$.mode,Z),V.return=$,V;case oe:var Te=V._init;return ye($,Te(V._payload),Z)}if(Ye(V)||ce(V))return V=Hr(V,$.mode,Z,null),V.return=$,V;Oa($,V)}return null}function ge($,V,Z,Te){var Xe=V!==null?V.key:null;if(typeof Z=="string"&&Z!==""||typeof Z=="number")return Xe!==null?null:N($,V,""+Z,Te);if(typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case W:return Z.key===Xe?B($,V,Z,Te):null;case O:return Z.key===Xe?te($,V,Z,Te):null;case oe:return Xe=Z._init,ge($,V,Xe(Z._payload),Te)}if(Ye(Z)||ce(Z))return Xe!==null?null:xe($,V,Z,Te,null);Oa($,Z)}return null}function Ie($,V,Z,Te,Xe){if(typeof Te=="string"&&Te!==""||typeof Te=="number")return $=$.get(Z)||null,N(V,$,""+Te,Xe);if(typeof Te=="object"&&Te!==null){switch(Te.$$typeof){case W:return $=$.get(Te.key===null?Z:Te.key)||null,B(V,$,Te,Xe);case O:return $=$.get(Te.key===null?Z:Te.key)||null,te(V,$,Te,Xe);case oe:var Qe=Te._init;return Ie($,V,Z,Qe(Te._payload),Xe)}if(Ye(Te)||ce(Te))return $=$.get(Z)||null,xe(V,$,Te,Xe,null);Oa(V,Te)}return null}function ze($,V,Z,Te){for(var Xe=null,Qe=null,Je=V,it=V=0,ln=null;Je!==null&&it<Z.length;it++){Je.index>it?(ln=Je,Je=null):ln=Je.sibling;var Rt=ge($,Je,Z[it],Te);if(Rt===null){Je===null&&(Je=ln);break}n&&Je&&Rt.alternate===null&&i($,Je),V=m(Rt,V,it),Qe===null?Xe=Rt:Qe.sibling=Rt,Qe=Rt,Je=ln}if(it===Z.length)return o($,Je),Ht&&Ir($,it),Xe;if(Je===null){for(;it<Z.length;it++)Je=ye($,Z[it],Te),Je!==null&&(V=m(Je,V,it),Qe===null?Xe=Je:Qe.sibling=Je,Qe=Je);return Ht&&Ir($,it),Xe}for(Je=c($,Je);it<Z.length;it++)ln=Ie(Je,$,it,Z[it],Te),ln!==null&&(n&&ln.alternate!==null&&Je.delete(ln.key===null?it:ln.key),V=m(ln,V,it),Qe===null?Xe=ln:Qe.sibling=ln,Qe=ln);return n&&Je.forEach(function(gr){return i($,gr)}),Ht&&Ir($,it),Xe}function Ve($,V,Z,Te){var Xe=ce(Z);if(typeof Xe!="function")throw Error(t(150));if(Z=Xe.call(Z),Z==null)throw Error(t(151));for(var Qe=Xe=null,Je=V,it=V=0,ln=null,Rt=Z.next();Je!==null&&!Rt.done;it++,Rt=Z.next()){Je.index>it?(ln=Je,Je=null):ln=Je.sibling;var gr=ge($,Je,Rt.value,Te);if(gr===null){Je===null&&(Je=ln);break}n&&Je&&gr.alternate===null&&i($,Je),V=m(gr,V,it),Qe===null?Xe=gr:Qe.sibling=gr,Qe=gr,Je=ln}if(Rt.done)return o($,Je),Ht&&Ir($,it),Xe;if(Je===null){for(;!Rt.done;it++,Rt=Z.next())Rt=ye($,Rt.value,Te),Rt!==null&&(V=m(Rt,V,it),Qe===null?Xe=Rt:Qe.sibling=Rt,Qe=Rt);return Ht&&Ir($,it),Xe}for(Je=c($,Je);!Rt.done;it++,Rt=Z.next())Rt=Ie(Je,$,it,Rt.value,Te),Rt!==null&&(n&&Rt.alternate!==null&&Je.delete(Rt.key===null?it:Rt.key),V=m(Rt,V,it),Qe===null?Xe=Rt:Qe.sibling=Rt,Qe=Rt);return n&&Je.forEach(function(i_){return i($,i_)}),Ht&&Ir($,it),Xe}function qt($,V,Z,Te){if(typeof Z=="object"&&Z!==null&&Z.type===U&&Z.key===null&&(Z=Z.props.children),typeof Z=="object"&&Z!==null){switch(Z.$$typeof){case W:e:{for(var Xe=Z.key,Qe=V;Qe!==null;){if(Qe.key===Xe){if(Xe=Z.type,Xe===U){if(Qe.tag===7){o($,Qe.sibling),V=h(Qe,Z.props.children),V.return=$,$=V;break e}}else if(Qe.elementType===Xe||typeof Xe=="object"&&Xe!==null&&Xe.$$typeof===oe&&Uf(Xe)===Qe.type){o($,Qe.sibling),V=h(Qe,Z.props),V.ref=Lo($,Qe,Z),V.return=$,$=V;break e}o($,Qe);break}else i($,Qe);Qe=Qe.sibling}Z.type===U?(V=Hr(Z.props.children,$.mode,Te,Z.key),V.return=$,$=V):(Te=al(Z.type,Z.key,Z.props,null,$.mode,Te),Te.ref=Lo($,V,Z),Te.return=$,$=Te)}return E($);case O:e:{for(Qe=Z.key;V!==null;){if(V.key===Qe)if(V.tag===4&&V.stateNode.containerInfo===Z.containerInfo&&V.stateNode.implementation===Z.implementation){o($,V.sibling),V=h(V,Z.children||[]),V.return=$,$=V;break e}else{o($,V);break}else i($,V);V=V.sibling}V=Fu(Z,$.mode,Te),V.return=$,$=V}return E($);case oe:return Qe=Z._init,qt($,V,Qe(Z._payload),Te)}if(Ye(Z))return ze($,V,Z,Te);if(ce(Z))return Ve($,V,Z,Te);Oa($,Z)}return typeof Z=="string"&&Z!==""||typeof Z=="number"?(Z=""+Z,V!==null&&V.tag===6?(o($,V.sibling),V=h(V,Z),V.return=$,$=V):(o($,V),V=Uu(Z,$.mode,Te),V.return=$,$=V),E($)):o($,V)}return qt}var ys=Ff(!0),Of=Ff(!1),ka=sr(null),Ba=null,Ss=null,jc=null;function Xc(){jc=Ss=Ba=null}function qc(n){var i=ka.current;kt(ka),n._currentValue=i}function Yc(n,i,o){for(;n!==null;){var c=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,c!==null&&(c.childLanes|=i)):c!==null&&(c.childLanes&i)!==i&&(c.childLanes|=i),n===o)break;n=n.return}}function Ms(n,i){Ba=n,jc=Ss=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(In=!0),n.firstContext=null)}function Qn(n){var i=n._currentValue;if(jc!==n)if(n={context:n,memoizedValue:i,next:null},Ss===null){if(Ba===null)throw Error(t(308));Ss=n,Ba.dependencies={lanes:0,firstContext:n}}else Ss=Ss.next=n;return i}var Nr=null;function $c(n){Nr===null?Nr=[n]:Nr.push(n)}function kf(n,i,o,c){var h=i.interleaved;return h===null?(o.next=o,$c(i)):(o.next=h.next,h.next=o),i.interleaved=o,Fi(n,c)}function Fi(n,i){n.lanes|=i;var o=n.alternate;for(o!==null&&(o.lanes|=i),o=n,n=n.return;n!==null;)n.childLanes|=i,o=n.alternate,o!==null&&(o.childLanes|=i),o=n,n=n.return;return o.tag===3?o.stateNode:null}var lr=!1;function Kc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Bf(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function Oi(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function cr(n,i,o){var c=n.updateQueue;if(c===null)return null;if(c=c.shared,(wt&2)!==0){var h=c.pending;return h===null?i.next=i:(i.next=h.next,h.next=i),c.pending=i,Fi(n,o)}return h=c.interleaved,h===null?(i.next=i,$c(c)):(i.next=h.next,h.next=i),c.interleaved=i,Fi(n,o)}function za(n,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var c=i.lanes;c&=n.pendingLanes,o|=c,i.lanes=o,uc(n,o)}}function zf(n,i){var o=n.updateQueue,c=n.alternate;if(c!==null&&(c=c.updateQueue,o===c)){var h=null,m=null;if(o=o.firstBaseUpdate,o!==null){do{var E={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};m===null?h=m=E:m=m.next=E,o=o.next}while(o!==null);m===null?h=m=i:m=m.next=i}else h=m=i;o={baseState:c.baseState,firstBaseUpdate:h,lastBaseUpdate:m,shared:c.shared,effects:c.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=i:n.next=i,o.lastBaseUpdate=i}function Ha(n,i,o,c){var h=n.updateQueue;lr=!1;var m=h.firstBaseUpdate,E=h.lastBaseUpdate,N=h.shared.pending;if(N!==null){h.shared.pending=null;var B=N,te=B.next;B.next=null,E===null?m=te:E.next=te,E=B;var xe=n.alternate;xe!==null&&(xe=xe.updateQueue,N=xe.lastBaseUpdate,N!==E&&(N===null?xe.firstBaseUpdate=te:N.next=te,xe.lastBaseUpdate=B))}if(m!==null){var ye=h.baseState;E=0,xe=te=B=null,N=m;do{var ge=N.lane,Ie=N.eventTime;if((c&ge)===ge){xe!==null&&(xe=xe.next={eventTime:Ie,lane:0,tag:N.tag,payload:N.payload,callback:N.callback,next:null});e:{var ze=n,Ve=N;switch(ge=i,Ie=o,Ve.tag){case 1:if(ze=Ve.payload,typeof ze=="function"){ye=ze.call(Ie,ye,ge);break e}ye=ze;break e;case 3:ze.flags=ze.flags&-65537|128;case 0:if(ze=Ve.payload,ge=typeof ze=="function"?ze.call(Ie,ye,ge):ze,ge==null)break e;ye=ee({},ye,ge);break e;case 2:lr=!0}}N.callback!==null&&N.lane!==0&&(n.flags|=64,ge=h.effects,ge===null?h.effects=[N]:ge.push(N))}else Ie={eventTime:Ie,lane:ge,tag:N.tag,payload:N.payload,callback:N.callback,next:null},xe===null?(te=xe=Ie,B=ye):xe=xe.next=Ie,E|=ge;if(N=N.next,N===null){if(N=h.shared.pending,N===null)break;ge=N,N=ge.next,ge.next=null,h.lastBaseUpdate=ge,h.shared.pending=null}}while(!0);if(xe===null&&(B=ye),h.baseState=B,h.firstBaseUpdate=te,h.lastBaseUpdate=xe,i=h.shared.interleaved,i!==null){h=i;do E|=h.lane,h=h.next;while(h!==i)}else m===null&&(h.shared.lanes=0);Or|=E,n.lanes=E,n.memoizedState=ye}}function Hf(n,i,o){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var c=n[i],h=c.callback;if(h!==null){if(c.callback=null,c=o,typeof h!="function")throw Error(t(191,h));h.call(c)}}}var Do={},Si=sr(Do),Io=sr(Do),No=sr(Do);function Ur(n){if(n===Do)throw Error(t(174));return n}function Zc(n,i){switch(Ut(No,i),Ut(Io,n),Ut(Si,Do),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:Ge(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=Ge(i,n)}kt(Si),Ut(Si,i)}function Es(){kt(Si),kt(Io),kt(No)}function Vf(n){Ur(No.current);var i=Ur(Si.current),o=Ge(i,n.type);i!==o&&(Ut(Io,n),Ut(Si,o))}function Qc(n){Io.current===n&&(kt(Si),kt(Io))}var Gt=sr(0);function Va(n){for(var i=n;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var Jc=[];function eu(){for(var n=0;n<Jc.length;n++)Jc[n]._workInProgressVersionPrimary=null;Jc.length=0}var Ga=C.ReactCurrentDispatcher,tu=C.ReactCurrentBatchConfig,Fr=0,Wt=null,Jt=null,on=null,Wa=!1,Uo=!1,Fo=0,Tv=0;function gn(){throw Error(t(321))}function nu(n,i){if(i===null)return!1;for(var o=0;o<i.length&&o<n.length;o++)if(!oi(n[o],i[o]))return!1;return!0}function iu(n,i,o,c,h,m){if(Fr=m,Wt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Ga.current=n===null||n.memoizedState===null?bv:Pv,n=o(c,h),Uo){m=0;do{if(Uo=!1,Fo=0,25<=m)throw Error(t(301));m+=1,on=Jt=null,i.updateQueue=null,Ga.current=Lv,n=o(c,h)}while(Uo)}if(Ga.current=qa,i=Jt!==null&&Jt.next!==null,Fr=0,on=Jt=Wt=null,Wa=!1,i)throw Error(t(300));return n}function ru(){var n=Fo!==0;return Fo=0,n}function Mi(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return on===null?Wt.memoizedState=on=n:on=on.next=n,on}function Jn(){if(Jt===null){var n=Wt.alternate;n=n!==null?n.memoizedState:null}else n=Jt.next;var i=on===null?Wt.memoizedState:on.next;if(i!==null)on=i,Jt=n;else{if(n===null)throw Error(t(310));Jt=n,n={memoizedState:Jt.memoizedState,baseState:Jt.baseState,baseQueue:Jt.baseQueue,queue:Jt.queue,next:null},on===null?Wt.memoizedState=on=n:on=on.next=n}return on}function Oo(n,i){return typeof i=="function"?i(n):i}function su(n){var i=Jn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=Jt,h=c.baseQueue,m=o.pending;if(m!==null){if(h!==null){var E=h.next;h.next=m.next,m.next=E}c.baseQueue=h=m,o.pending=null}if(h!==null){m=h.next,c=c.baseState;var N=E=null,B=null,te=m;do{var xe=te.lane;if((Fr&xe)===xe)B!==null&&(B=B.next={lane:0,action:te.action,hasEagerState:te.hasEagerState,eagerState:te.eagerState,next:null}),c=te.hasEagerState?te.eagerState:n(c,te.action);else{var ye={lane:xe,action:te.action,hasEagerState:te.hasEagerState,eagerState:te.eagerState,next:null};B===null?(N=B=ye,E=c):B=B.next=ye,Wt.lanes|=xe,Or|=xe}te=te.next}while(te!==null&&te!==m);B===null?E=c:B.next=N,oi(c,i.memoizedState)||(In=!0),i.memoizedState=c,i.baseState=E,i.baseQueue=B,o.lastRenderedState=c}if(n=o.interleaved,n!==null){h=n;do m=h.lane,Wt.lanes|=m,Or|=m,h=h.next;while(h!==n)}else h===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function ou(n){var i=Jn(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var c=o.dispatch,h=o.pending,m=i.memoizedState;if(h!==null){o.pending=null;var E=h=h.next;do m=n(m,E.action),E=E.next;while(E!==h);oi(m,i.memoizedState)||(In=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),o.lastRenderedState=m}return[m,c]}function Gf(){}function Wf(n,i){var o=Wt,c=Jn(),h=i(),m=!oi(c.memoizedState,h);if(m&&(c.memoizedState=h,In=!0),c=c.queue,au(qf.bind(null,o,c,n),[n]),c.getSnapshot!==i||m||on!==null&&on.memoizedState.tag&1){if(o.flags|=2048,ko(9,Xf.bind(null,o,c,h,i),void 0,null),an===null)throw Error(t(349));(Fr&30)!==0||jf(o,i,h)}return h}function jf(n,i,o){n.flags|=16384,n={getSnapshot:i,value:o},i=Wt.updateQueue,i===null?(i={lastEffect:null,stores:null},Wt.updateQueue=i,i.stores=[n]):(o=i.stores,o===null?i.stores=[n]:o.push(n))}function Xf(n,i,o,c){i.value=o,i.getSnapshot=c,Yf(i)&&$f(n)}function qf(n,i,o){return o(function(){Yf(i)&&$f(n)})}function Yf(n){var i=n.getSnapshot;n=n.value;try{var o=i();return!oi(n,o)}catch{return!0}}function $f(n){var i=Fi(n,1);i!==null&&di(i,n,1,-1)}function Kf(n){var i=Mi();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Oo,lastRenderedState:n},i.queue=n,n=n.dispatch=Cv.bind(null,Wt,n),[i.memoizedState,n]}function ko(n,i,o,c){return n={tag:n,create:i,destroy:o,deps:c,next:null},i=Wt.updateQueue,i===null?(i={lastEffect:null,stores:null},Wt.updateQueue=i,i.lastEffect=n.next=n):(o=i.lastEffect,o===null?i.lastEffect=n.next=n:(c=o.next,o.next=n,n.next=c,i.lastEffect=n)),n}function Zf(){return Jn().memoizedState}function ja(n,i,o,c){var h=Mi();Wt.flags|=n,h.memoizedState=ko(1|i,o,void 0,c===void 0?null:c)}function Xa(n,i,o,c){var h=Jn();c=c===void 0?null:c;var m=void 0;if(Jt!==null){var E=Jt.memoizedState;if(m=E.destroy,c!==null&&nu(c,E.deps)){h.memoizedState=ko(i,o,m,c);return}}Wt.flags|=n,h.memoizedState=ko(1|i,o,m,c)}function Qf(n,i){return ja(8390656,8,n,i)}function au(n,i){return Xa(2048,8,n,i)}function Jf(n,i){return Xa(4,2,n,i)}function ep(n,i){return Xa(4,4,n,i)}function tp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function np(n,i,o){return o=o!=null?o.concat([n]):null,Xa(4,4,tp.bind(null,i,n),o)}function lu(){}function ip(n,i){var o=Jn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&nu(i,c[1])?c[0]:(o.memoizedState=[n,i],n)}function rp(n,i){var o=Jn();i=i===void 0?null:i;var c=o.memoizedState;return c!==null&&i!==null&&nu(i,c[1])?c[0]:(n=n(),o.memoizedState=[n,i],n)}function sp(n,i,o){return(Fr&21)===0?(n.baseState&&(n.baseState=!1,In=!0),n.memoizedState=o):(oi(o,i)||(o=Mn(),Wt.lanes|=o,Or|=o,n.baseState=!0),i)}function Av(n,i){var o=Lt;Lt=o!==0&&4>o?o:4,n(!0);var c=tu.transition;tu.transition={};try{n(!1),i()}finally{Lt=o,tu.transition=c}}function op(){return Jn().memoizedState}function Rv(n,i,o){var c=fr(n);if(o={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null},ap(n))lp(i,o);else if(o=kf(n,i,o,c),o!==null){var h=wn();di(o,n,c,h),cp(o,i,c)}}function Cv(n,i,o){var c=fr(n),h={lane:c,action:o,hasEagerState:!1,eagerState:null,next:null};if(ap(n))lp(i,h);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var E=i.lastRenderedState,N=m(E,o);if(h.hasEagerState=!0,h.eagerState=N,oi(N,E)){var B=i.interleaved;B===null?(h.next=h,$c(i)):(h.next=B.next,B.next=h),i.interleaved=h;return}}catch{}finally{}o=kf(n,i,h,c),o!==null&&(h=wn(),di(o,n,c,h),cp(o,i,c))}}function ap(n){var i=n.alternate;return n===Wt||i!==null&&i===Wt}function lp(n,i){Uo=Wa=!0;var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}function cp(n,i,o){if((o&4194240)!==0){var c=i.lanes;c&=n.pendingLanes,o|=c,i.lanes=o,uc(n,o)}}var qa={readContext:Qn,useCallback:gn,useContext:gn,useEffect:gn,useImperativeHandle:gn,useInsertionEffect:gn,useLayoutEffect:gn,useMemo:gn,useReducer:gn,useRef:gn,useState:gn,useDebugValue:gn,useDeferredValue:gn,useTransition:gn,useMutableSource:gn,useSyncExternalStore:gn,useId:gn,unstable_isNewReconciler:!1},bv={readContext:Qn,useCallback:function(n,i){return Mi().memoizedState=[n,i===void 0?null:i],n},useContext:Qn,useEffect:Qf,useImperativeHandle:function(n,i,o){return o=o!=null?o.concat([n]):null,ja(4194308,4,tp.bind(null,i,n),o)},useLayoutEffect:function(n,i){return ja(4194308,4,n,i)},useInsertionEffect:function(n,i){return ja(4,2,n,i)},useMemo:function(n,i){var o=Mi();return i=i===void 0?null:i,n=n(),o.memoizedState=[n,i],n},useReducer:function(n,i,o){var c=Mi();return i=o!==void 0?o(i):i,c.memoizedState=c.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},c.queue=n,n=n.dispatch=Rv.bind(null,Wt,n),[c.memoizedState,n]},useRef:function(n){var i=Mi();return n={current:n},i.memoizedState=n},useState:Kf,useDebugValue:lu,useDeferredValue:function(n){return Mi().memoizedState=n},useTransition:function(){var n=Kf(!1),i=n[0];return n=Av.bind(null,n[1]),Mi().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,o){var c=Wt,h=Mi();if(Ht){if(o===void 0)throw Error(t(407));o=o()}else{if(o=i(),an===null)throw Error(t(349));(Fr&30)!==0||jf(c,i,o)}h.memoizedState=o;var m={value:o,getSnapshot:i};return h.queue=m,Qf(qf.bind(null,c,m,n),[n]),c.flags|=2048,ko(9,Xf.bind(null,c,m,o,i),void 0,null),o},useId:function(){var n=Mi(),i=an.identifierPrefix;if(Ht){var o=Ui,c=Ni;o=(c&~(1<<32-ct(c)-1)).toString(32)+o,i=":"+i+"R"+o,o=Fo++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=Tv++,i=":"+i+"r"+o.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},Pv={readContext:Qn,useCallback:ip,useContext:Qn,useEffect:au,useImperativeHandle:np,useInsertionEffect:Jf,useLayoutEffect:ep,useMemo:rp,useReducer:su,useRef:Zf,useState:function(){return su(Oo)},useDebugValue:lu,useDeferredValue:function(n){var i=Jn();return sp(i,Jt.memoizedState,n)},useTransition:function(){var n=su(Oo)[0],i=Jn().memoizedState;return[n,i]},useMutableSource:Gf,useSyncExternalStore:Wf,useId:op,unstable_isNewReconciler:!1},Lv={readContext:Qn,useCallback:ip,useContext:Qn,useEffect:au,useImperativeHandle:np,useInsertionEffect:Jf,useLayoutEffect:ep,useMemo:rp,useReducer:ou,useRef:Zf,useState:function(){return ou(Oo)},useDebugValue:lu,useDeferredValue:function(n){var i=Jn();return Jt===null?i.memoizedState=n:sp(i,Jt.memoizedState,n)},useTransition:function(){var n=ou(Oo)[0],i=Jn().memoizedState;return[n,i]},useMutableSource:Gf,useSyncExternalStore:Wf,useId:op,unstable_isNewReconciler:!1};function li(n,i){if(n&&n.defaultProps){i=ee({},i),n=n.defaultProps;for(var o in n)i[o]===void 0&&(i[o]=n[o]);return i}return i}function cu(n,i,o,c){i=n.memoizedState,o=o(c,i),o=o==null?i:ee({},i,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var Ya={isMounted:function(n){return(n=n._reactInternals)?_i(n)===n:!1},enqueueSetState:function(n,i,o){n=n._reactInternals;var c=wn(),h=fr(n),m=Oi(c,h);m.payload=i,o!=null&&(m.callback=o),i=cr(n,m,h),i!==null&&(di(i,n,h,c),za(i,n,h))},enqueueReplaceState:function(n,i,o){n=n._reactInternals;var c=wn(),h=fr(n),m=Oi(c,h);m.tag=1,m.payload=i,o!=null&&(m.callback=o),i=cr(n,m,h),i!==null&&(di(i,n,h,c),za(i,n,h))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var o=wn(),c=fr(n),h=Oi(o,c);h.tag=2,i!=null&&(h.callback=i),i=cr(n,h,c),i!==null&&(di(i,n,c,o),za(i,n,c))}};function up(n,i,o,c,h,m,E){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(c,m,E):i.prototype&&i.prototype.isPureReactComponent?!wo(o,c)||!wo(h,m):!0}function dp(n,i,o){var c=!1,h=or,m=i.contextType;return typeof m=="object"&&m!==null?m=Qn(m):(h=Dn(i)?Lr:mn.current,c=i.contextTypes,m=(c=c!=null)?gs(n,h):or),i=new i(o,m),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=Ya,n.stateNode=i,i._reactInternals=n,c&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=h,n.__reactInternalMemoizedMaskedChildContext=m),i}function hp(n,i,o,c){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,c),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,c),i.state!==n&&Ya.enqueueReplaceState(i,i.state,null)}function uu(n,i,o,c){var h=n.stateNode;h.props=o,h.state=n.memoizedState,h.refs={},Kc(n);var m=i.contextType;typeof m=="object"&&m!==null?h.context=Qn(m):(m=Dn(i)?Lr:mn.current,h.context=gs(n,m)),h.state=n.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(cu(n,i,m,o),h.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(i=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),i!==h.state&&Ya.enqueueReplaceState(h,h.state,null),Ha(n,o,h,c),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308)}function ws(n,i){try{var o="",c=i;do o+=he(c),c=c.return;while(c);var h=o}catch(m){h=`
Error generating stack: `+m.message+`
`+m.stack}return{value:n,source:i,stack:h,digest:null}}function du(n,i,o){return{value:n,source:null,stack:o??null,digest:i??null}}function hu(n,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var Dv=typeof WeakMap=="function"?WeakMap:Map;function fp(n,i,o){o=Oi(-1,o),o.tag=3,o.payload={element:null};var c=i.value;return o.callback=function(){tl||(tl=!0,Ru=c),hu(n,i)},o}function pp(n,i,o){o=Oi(-1,o),o.tag=3;var c=n.type.getDerivedStateFromError;if(typeof c=="function"){var h=i.value;o.payload=function(){return c(h)},o.callback=function(){hu(n,i)}}var m=n.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(o.callback=function(){hu(n,i),typeof c!="function"&&(dr===null?dr=new Set([this]):dr.add(this));var E=i.stack;this.componentDidCatch(i.value,{componentStack:E!==null?E:""})}),o}function mp(n,i,o){var c=n.pingCache;if(c===null){c=n.pingCache=new Dv;var h=new Set;c.set(i,h)}else h=c.get(i),h===void 0&&(h=new Set,c.set(i,h));h.has(o)||(h.add(o),n=Xv.bind(null,n,i,o),i.then(n,n))}function gp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function vp(n,i,o,c,h){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=Oi(-1,1),i.tag=2,cr(o,i,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=h,n)}var Iv=C.ReactCurrentOwner,In=!1;function En(n,i,o,c){i.child=n===null?Of(i,null,o,c):ys(i,n.child,o,c)}function _p(n,i,o,c,h){o=o.render;var m=i.ref;return Ms(i,h),c=iu(n,i,o,c,m,h),o=ru(),n!==null&&!In?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,ki(n,i,h)):(Ht&&o&&zc(i),i.flags|=1,En(n,i,c,h),i.child)}function xp(n,i,o,c,h){if(n===null){var m=o.type;return typeof m=="function"&&!Nu(m)&&m.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=m,yp(n,i,m,c,h)):(n=al(o.type,null,c,i,i.mode,h),n.ref=i.ref,n.return=i,i.child=n)}if(m=n.child,(n.lanes&h)===0){var E=m.memoizedProps;if(o=o.compare,o=o!==null?o:wo,o(E,c)&&n.ref===i.ref)return ki(n,i,h)}return i.flags|=1,n=mr(m,c),n.ref=i.ref,n.return=i,i.child=n}function yp(n,i,o,c,h){if(n!==null){var m=n.memoizedProps;if(wo(m,c)&&n.ref===i.ref)if(In=!1,i.pendingProps=c=m,(n.lanes&h)!==0)(n.flags&131072)!==0&&(In=!0);else return i.lanes=n.lanes,ki(n,i,h)}return fu(n,i,o,c,h)}function Sp(n,i,o){var c=i.pendingProps,h=c.children,m=n!==null?n.memoizedState:null;if(c.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ut(As,Vn),Vn|=o;else{if((o&1073741824)===0)return n=m!==null?m.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Ut(As,Vn),Vn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},c=m!==null?m.baseLanes:o,Ut(As,Vn),Vn|=c}else m!==null?(c=m.baseLanes|o,i.memoizedState=null):c=o,Ut(As,Vn),Vn|=c;return En(n,i,h,o),i.child}function Mp(n,i){var o=i.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function fu(n,i,o,c,h){var m=Dn(o)?Lr:mn.current;return m=gs(i,m),Ms(i,h),o=iu(n,i,o,c,m,h),c=ru(),n!==null&&!In?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,ki(n,i,h)):(Ht&&c&&zc(i),i.flags|=1,En(n,i,o,h),i.child)}function Ep(n,i,o,c,h){if(Dn(o)){var m=!0;Da(i)}else m=!1;if(Ms(i,h),i.stateNode===null)Ka(n,i),dp(i,o,c),uu(i,o,c,h),c=!0;else if(n===null){var E=i.stateNode,N=i.memoizedProps;E.props=N;var B=E.context,te=o.contextType;typeof te=="object"&&te!==null?te=Qn(te):(te=Dn(o)?Lr:mn.current,te=gs(i,te));var xe=o.getDerivedStateFromProps,ye=typeof xe=="function"||typeof E.getSnapshotBeforeUpdate=="function";ye||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(N!==c||B!==te)&&hp(i,E,c,te),lr=!1;var ge=i.memoizedState;E.state=ge,Ha(i,c,E,h),B=i.memoizedState,N!==c||ge!==B||Ln.current||lr?(typeof xe=="function"&&(cu(i,o,xe,c),B=i.memoizedState),(N=lr||up(i,o,N,c,ge,B,te))?(ye||typeof E.UNSAFE_componentWillMount!="function"&&typeof E.componentWillMount!="function"||(typeof E.componentWillMount=="function"&&E.componentWillMount(),typeof E.UNSAFE_componentWillMount=="function"&&E.UNSAFE_componentWillMount()),typeof E.componentDidMount=="function"&&(i.flags|=4194308)):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=c,i.memoizedState=B),E.props=c,E.state=B,E.context=te,c=N):(typeof E.componentDidMount=="function"&&(i.flags|=4194308),c=!1)}else{E=i.stateNode,Bf(n,i),N=i.memoizedProps,te=i.type===i.elementType?N:li(i.type,N),E.props=te,ye=i.pendingProps,ge=E.context,B=o.contextType,typeof B=="object"&&B!==null?B=Qn(B):(B=Dn(o)?Lr:mn.current,B=gs(i,B));var Ie=o.getDerivedStateFromProps;(xe=typeof Ie=="function"||typeof E.getSnapshotBeforeUpdate=="function")||typeof E.UNSAFE_componentWillReceiveProps!="function"&&typeof E.componentWillReceiveProps!="function"||(N!==ye||ge!==B)&&hp(i,E,c,B),lr=!1,ge=i.memoizedState,E.state=ge,Ha(i,c,E,h);var ze=i.memoizedState;N!==ye||ge!==ze||Ln.current||lr?(typeof Ie=="function"&&(cu(i,o,Ie,c),ze=i.memoizedState),(te=lr||up(i,o,te,c,ge,ze,B)||!1)?(xe||typeof E.UNSAFE_componentWillUpdate!="function"&&typeof E.componentWillUpdate!="function"||(typeof E.componentWillUpdate=="function"&&E.componentWillUpdate(c,ze,B),typeof E.UNSAFE_componentWillUpdate=="function"&&E.UNSAFE_componentWillUpdate(c,ze,B)),typeof E.componentDidUpdate=="function"&&(i.flags|=4),typeof E.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof E.componentDidUpdate!="function"||N===n.memoizedProps&&ge===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||N===n.memoizedProps&&ge===n.memoizedState||(i.flags|=1024),i.memoizedProps=c,i.memoizedState=ze),E.props=c,E.state=ze,E.context=B,c=te):(typeof E.componentDidUpdate!="function"||N===n.memoizedProps&&ge===n.memoizedState||(i.flags|=4),typeof E.getSnapshotBeforeUpdate!="function"||N===n.memoizedProps&&ge===n.memoizedState||(i.flags|=1024),c=!1)}return pu(n,i,o,c,m,h)}function pu(n,i,o,c,h,m){Mp(n,i);var E=(i.flags&128)!==0;if(!c&&!E)return h&&Cf(i,o,!1),ki(n,i,m);c=i.stateNode,Iv.current=i;var N=E&&typeof o.getDerivedStateFromError!="function"?null:c.render();return i.flags|=1,n!==null&&E?(i.child=ys(i,n.child,null,m),i.child=ys(i,null,N,m)):En(n,i,N,m),i.memoizedState=c.state,h&&Cf(i,o,!0),i.child}function wp(n){var i=n.stateNode;i.pendingContext?Af(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Af(n,i.context,!1),Zc(n,i.containerInfo)}function Tp(n,i,o,c,h){return xs(),Wc(h),i.flags|=256,En(n,i,o,c),i.child}var mu={dehydrated:null,treeContext:null,retryLane:0};function gu(n){return{baseLanes:n,cachePool:null,transitions:null}}function Ap(n,i,o){var c=i.pendingProps,h=Gt.current,m=!1,E=(i.flags&128)!==0,N;if((N=E)||(N=n!==null&&n.memoizedState===null?!1:(h&2)!==0),N?(m=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(h|=1),Ut(Gt,h&1),n===null)return Gc(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(E=c.children,n=c.fallback,m?(c=i.mode,m=i.child,E={mode:"hidden",children:E},(c&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=E):m=ll(E,c,0,null),n=Hr(n,c,o,null),m.return=i,n.return=i,m.sibling=n,i.child=m,i.child.memoizedState=gu(o),i.memoizedState=mu,n):vu(i,E));if(h=n.memoizedState,h!==null&&(N=h.dehydrated,N!==null))return Nv(n,i,E,c,N,h,o);if(m){m=c.fallback,E=i.mode,h=n.child,N=h.sibling;var B={mode:"hidden",children:c.children};return(E&1)===0&&i.child!==h?(c=i.child,c.childLanes=0,c.pendingProps=B,i.deletions=null):(c=mr(h,B),c.subtreeFlags=h.subtreeFlags&14680064),N!==null?m=mr(N,m):(m=Hr(m,E,o,null),m.flags|=2),m.return=i,c.return=i,c.sibling=m,i.child=c,c=m,m=i.child,E=n.child.memoizedState,E=E===null?gu(o):{baseLanes:E.baseLanes|o,cachePool:null,transitions:E.transitions},m.memoizedState=E,m.childLanes=n.childLanes&~o,i.memoizedState=mu,c}return m=n.child,n=m.sibling,c=mr(m,{mode:"visible",children:c.children}),(i.mode&1)===0&&(c.lanes=o),c.return=i,c.sibling=null,n!==null&&(o=i.deletions,o===null?(i.deletions=[n],i.flags|=16):o.push(n)),i.child=c,i.memoizedState=null,c}function vu(n,i){return i=ll({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function $a(n,i,o,c){return c!==null&&Wc(c),ys(i,n.child,null,o),n=vu(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function Nv(n,i,o,c,h,m,E){if(o)return i.flags&256?(i.flags&=-257,c=du(Error(t(422))),$a(n,i,E,c)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(m=c.fallback,h=i.mode,c=ll({mode:"visible",children:c.children},h,0,null),m=Hr(m,h,E,null),m.flags|=2,c.return=i,m.return=i,c.sibling=m,i.child=c,(i.mode&1)!==0&&ys(i,n.child,null,E),i.child.memoizedState=gu(E),i.memoizedState=mu,m);if((i.mode&1)===0)return $a(n,i,E,null);if(h.data==="$!"){if(c=h.nextSibling&&h.nextSibling.dataset,c)var N=c.dgst;return c=N,m=Error(t(419)),c=du(m,c,void 0),$a(n,i,E,c)}if(N=(E&n.childLanes)!==0,In||N){if(c=an,c!==null){switch(E&-E){case 4:h=2;break;case 16:h=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:h=32;break;case 536870912:h=268435456;break;default:h=0}h=(h&(c.suspendedLanes|E))!==0?0:h,h!==0&&h!==m.retryLane&&(m.retryLane=h,Fi(n,h),di(c,n,h,-1))}return Iu(),c=du(Error(t(421))),$a(n,i,E,c)}return h.data==="$?"?(i.flags|=128,i.child=n.child,i=qv.bind(null,n),h._reactRetry=i,null):(n=m.treeContext,Hn=rr(h.nextSibling),zn=i,Ht=!0,ai=null,n!==null&&(Kn[Zn++]=Ni,Kn[Zn++]=Ui,Kn[Zn++]=Dr,Ni=n.id,Ui=n.overflow,Dr=i),i=vu(i,c.children),i.flags|=4096,i)}function Rp(n,i,o){n.lanes|=i;var c=n.alternate;c!==null&&(c.lanes|=i),Yc(n.return,i,o)}function _u(n,i,o,c,h){var m=n.memoizedState;m===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:c,tail:o,tailMode:h}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=c,m.tail=o,m.tailMode=h)}function Cp(n,i,o){var c=i.pendingProps,h=c.revealOrder,m=c.tail;if(En(n,i,c.children,o),c=Gt.current,(c&2)!==0)c=c&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&Rp(n,o,i);else if(n.tag===19)Rp(n,o,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}c&=1}if(Ut(Gt,c),(i.mode&1)===0)i.memoizedState=null;else switch(h){case"forwards":for(o=i.child,h=null;o!==null;)n=o.alternate,n!==null&&Va(n)===null&&(h=o),o=o.sibling;o=h,o===null?(h=i.child,i.child=null):(h=o.sibling,o.sibling=null),_u(i,!1,h,o,m);break;case"backwards":for(o=null,h=i.child,i.child=null;h!==null;){if(n=h.alternate,n!==null&&Va(n)===null){i.child=h;break}n=h.sibling,h.sibling=o,o=h,h=n}_u(i,!0,o,null,m);break;case"together":_u(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function Ka(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function ki(n,i,o){if(n!==null&&(i.dependencies=n.dependencies),Or|=i.lanes,(o&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,o=mr(n,n.pendingProps),i.child=o,o.return=i;n.sibling!==null;)n=n.sibling,o=o.sibling=mr(n,n.pendingProps),o.return=i;o.sibling=null}return i.child}function Uv(n,i,o){switch(i.tag){case 3:wp(i),xs();break;case 5:Vf(i);break;case 1:Dn(i.type)&&Da(i);break;case 4:Zc(i,i.stateNode.containerInfo);break;case 10:var c=i.type._context,h=i.memoizedProps.value;Ut(ka,c._currentValue),c._currentValue=h;break;case 13:if(c=i.memoizedState,c!==null)return c.dehydrated!==null?(Ut(Gt,Gt.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Ap(n,i,o):(Ut(Gt,Gt.current&1),n=ki(n,i,o),n!==null?n.sibling:null);Ut(Gt,Gt.current&1);break;case 19:if(c=(o&i.childLanes)!==0,(n.flags&128)!==0){if(c)return Cp(n,i,o);i.flags|=128}if(h=i.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),Ut(Gt,Gt.current),c)break;return null;case 22:case 23:return i.lanes=0,Sp(n,i,o)}return ki(n,i,o)}var bp,xu,Pp,Lp;bp=function(n,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},xu=function(){},Pp=function(n,i,o,c){var h=n.memoizedProps;if(h!==c){n=i.stateNode,Ur(Si.current);var m=null;switch(o){case"input":h=q(n,h),c=q(n,c),m=[];break;case"select":h=ee({},h,{value:void 0}),c=ee({},c,{value:void 0}),m=[];break;case"textarea":h=T(n,h),c=T(n,c),m=[];break;default:typeof h.onClick!="function"&&typeof c.onClick=="function"&&(n.onclick=ba)}mt(o,c);var E;o=null;for(te in h)if(!c.hasOwnProperty(te)&&h.hasOwnProperty(te)&&h[te]!=null)if(te==="style"){var N=h[te];for(E in N)N.hasOwnProperty(E)&&(o||(o={}),o[E]="")}else te!=="dangerouslySetInnerHTML"&&te!=="children"&&te!=="suppressContentEditableWarning"&&te!=="suppressHydrationWarning"&&te!=="autoFocus"&&(a.hasOwnProperty(te)?m||(m=[]):(m=m||[]).push(te,null));for(te in c){var B=c[te];if(N=h?.[te],c.hasOwnProperty(te)&&B!==N&&(B!=null||N!=null))if(te==="style")if(N){for(E in N)!N.hasOwnProperty(E)||B&&B.hasOwnProperty(E)||(o||(o={}),o[E]="");for(E in B)B.hasOwnProperty(E)&&N[E]!==B[E]&&(o||(o={}),o[E]=B[E])}else o||(m||(m=[]),m.push(te,o)),o=B;else te==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,N=N?N.__html:void 0,B!=null&&N!==B&&(m=m||[]).push(te,B)):te==="children"?typeof B!="string"&&typeof B!="number"||(m=m||[]).push(te,""+B):te!=="suppressContentEditableWarning"&&te!=="suppressHydrationWarning"&&(a.hasOwnProperty(te)?(B!=null&&te==="onScroll"&&Ot("scroll",n),m||N===B||(m=[])):(m=m||[]).push(te,B))}o&&(m=m||[]).push("style",o);var te=m;(i.updateQueue=te)&&(i.flags|=4)}},Lp=function(n,i,o,c){o!==c&&(i.flags|=4)};function Bo(n,i){if(!Ht)switch(n.tailMode){case"hidden":i=n.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var c=null;o!==null;)o.alternate!==null&&(c=o),o=o.sibling;c===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:c.sibling=null}}function vn(n){var i=n.alternate!==null&&n.alternate.child===n.child,o=0,c=0;if(i)for(var h=n.child;h!==null;)o|=h.lanes|h.childLanes,c|=h.subtreeFlags&14680064,c|=h.flags&14680064,h.return=n,h=h.sibling;else for(h=n.child;h!==null;)o|=h.lanes|h.childLanes,c|=h.subtreeFlags,c|=h.flags,h.return=n,h=h.sibling;return n.subtreeFlags|=c,n.childLanes=o,i}function Fv(n,i,o){var c=i.pendingProps;switch(Hc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return vn(i),null;case 1:return Dn(i.type)&&La(),vn(i),null;case 3:return c=i.stateNode,Es(),kt(Ln),kt(mn),eu(),c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null),(n===null||n.child===null)&&(Fa(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,ai!==null&&(Pu(ai),ai=null))),xu(n,i),vn(i),null;case 5:Qc(i);var h=Ur(No.current);if(o=i.type,n!==null&&i.stateNode!=null)Pp(n,i,o,c,h),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!c){if(i.stateNode===null)throw Error(t(166));return vn(i),null}if(n=Ur(Si.current),Fa(i)){c=i.stateNode,o=i.type;var m=i.memoizedProps;switch(c[yi]=i,c[bo]=m,n=(i.mode&1)!==0,o){case"dialog":Ot("cancel",c),Ot("close",c);break;case"iframe":case"object":case"embed":Ot("load",c);break;case"video":case"audio":for(h=0;h<Ao.length;h++)Ot(Ao[h],c);break;case"source":Ot("error",c);break;case"img":case"image":case"link":Ot("error",c),Ot("load",c);break;case"details":Ot("toggle",c);break;case"input":st(c,m),Ot("invalid",c);break;case"select":c._wrapperState={wasMultiple:!!m.multiple},Ot("invalid",c);break;case"textarea":J(c,m),Ot("invalid",c)}mt(o,m),h=null;for(var E in m)if(m.hasOwnProperty(E)){var N=m[E];E==="children"?typeof N=="string"?c.textContent!==N&&(m.suppressHydrationWarning!==!0&&Ca(c.textContent,N,n),h=["children",N]):typeof N=="number"&&c.textContent!==""+N&&(m.suppressHydrationWarning!==!0&&Ca(c.textContent,N,n),h=["children",""+N]):a.hasOwnProperty(E)&&N!=null&&E==="onScroll"&&Ot("scroll",c)}switch(o){case"input":St(c),Ze(c,m,!0);break;case"textarea":St(c),_e(c);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(c.onclick=ba)}c=h,i.updateQueue=c,c!==null&&(i.flags|=4)}else{E=h.nodeType===9?h:h.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=fe(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=E.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof c.is=="string"?n=E.createElement(o,{is:c.is}):(n=E.createElement(o),o==="select"&&(E=n,c.multiple?E.multiple=!0:c.size&&(E.size=c.size))):n=E.createElementNS(n,o),n[yi]=i,n[bo]=c,bp(n,i,!1,!1),i.stateNode=n;e:{switch(E=ot(o,c),o){case"dialog":Ot("cancel",n),Ot("close",n),h=c;break;case"iframe":case"object":case"embed":Ot("load",n),h=c;break;case"video":case"audio":for(h=0;h<Ao.length;h++)Ot(Ao[h],n);h=c;break;case"source":Ot("error",n),h=c;break;case"img":case"image":case"link":Ot("error",n),Ot("load",n),h=c;break;case"details":Ot("toggle",n),h=c;break;case"input":st(n,c),h=q(n,c),Ot("invalid",n);break;case"option":h=c;break;case"select":n._wrapperState={wasMultiple:!!c.multiple},h=ee({},c,{value:void 0}),Ot("invalid",n);break;case"textarea":J(n,c),h=T(n,c),Ot("invalid",n);break;default:h=c}mt(o,h),N=h;for(m in N)if(N.hasOwnProperty(m)){var B=N[m];m==="style"?tt(n,B):m==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,B!=null&&Fe(n,B)):m==="children"?typeof B=="string"?(o!=="textarea"||B!=="")&&ht(n,B):typeof B=="number"&&ht(n,""+B):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(a.hasOwnProperty(m)?B!=null&&m==="onScroll"&&Ot("scroll",n):B!=null&&L(n,m,B,E))}switch(o){case"input":St(n),Ze(n,c,!1);break;case"textarea":St(n),_e(n);break;case"option":c.value!=null&&n.setAttribute("value",""+Re(c.value));break;case"select":n.multiple=!!c.multiple,m=c.value,m!=null?D(n,!!c.multiple,m,!1):c.defaultValue!=null&&D(n,!!c.multiple,c.defaultValue,!0);break;default:typeof h.onClick=="function"&&(n.onclick=ba)}switch(o){case"button":case"input":case"select":case"textarea":c=!!c.autoFocus;break e;case"img":c=!0;break e;default:c=!1}}c&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return vn(i),null;case 6:if(n&&i.stateNode!=null)Lp(n,i,n.memoizedProps,c);else{if(typeof c!="string"&&i.stateNode===null)throw Error(t(166));if(o=Ur(No.current),Ur(Si.current),Fa(i)){if(c=i.stateNode,o=i.memoizedProps,c[yi]=i,(m=c.nodeValue!==o)&&(n=zn,n!==null))switch(n.tag){case 3:Ca(c.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Ca(c.nodeValue,o,(n.mode&1)!==0)}m&&(i.flags|=4)}else c=(o.nodeType===9?o:o.ownerDocument).createTextNode(c),c[yi]=i,i.stateNode=c}return vn(i),null;case 13:if(kt(Gt),c=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Ht&&Hn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)Nf(),xs(),i.flags|=98560,m=!1;else if(m=Fa(i),c!==null&&c.dehydrated!==null){if(n===null){if(!m)throw Error(t(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(t(317));m[yi]=i}else xs(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;vn(i),m=!1}else ai!==null&&(Pu(ai),ai=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(c=c!==null,c!==(n!==null&&n.memoizedState!==null)&&c&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||(Gt.current&1)!==0?en===0&&(en=3):Iu())),i.updateQueue!==null&&(i.flags|=4),vn(i),null);case 4:return Es(),xu(n,i),n===null&&Ro(i.stateNode.containerInfo),vn(i),null;case 10:return qc(i.type._context),vn(i),null;case 17:return Dn(i.type)&&La(),vn(i),null;case 19:if(kt(Gt),m=i.memoizedState,m===null)return vn(i),null;if(c=(i.flags&128)!==0,E=m.rendering,E===null)if(c)Bo(m,!1);else{if(en!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(E=Va(n),E!==null){for(i.flags|=128,Bo(m,!1),c=E.updateQueue,c!==null&&(i.updateQueue=c,i.flags|=4),i.subtreeFlags=0,c=o,o=i.child;o!==null;)m=o,n=c,m.flags&=14680066,E=m.alternate,E===null?(m.childLanes=0,m.lanes=n,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=E.childLanes,m.lanes=E.lanes,m.child=E.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=E.memoizedProps,m.memoizedState=E.memoizedState,m.updateQueue=E.updateQueue,m.type=E.type,n=E.dependencies,m.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return Ut(Gt,Gt.current&1|2),i.child}n=n.sibling}m.tail!==null&&Ee()>Rs&&(i.flags|=128,c=!0,Bo(m,!1),i.lanes=4194304)}else{if(!c)if(n=Va(E),n!==null){if(i.flags|=128,c=!0,o=n.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),Bo(m,!0),m.tail===null&&m.tailMode==="hidden"&&!E.alternate&&!Ht)return vn(i),null}else 2*Ee()-m.renderingStartTime>Rs&&o!==1073741824&&(i.flags|=128,c=!0,Bo(m,!1),i.lanes=4194304);m.isBackwards?(E.sibling=i.child,i.child=E):(o=m.last,o!==null?o.sibling=E:i.child=E,m.last=E)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=Ee(),i.sibling=null,o=Gt.current,Ut(Gt,c?o&1|2:o&1),i):(vn(i),null);case 22:case 23:return Du(),c=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==c&&(i.flags|=8192),c&&(i.mode&1)!==0?(Vn&1073741824)!==0&&(vn(i),i.subtreeFlags&6&&(i.flags|=8192)):vn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function Ov(n,i){switch(Hc(i),i.tag){case 1:return Dn(i.type)&&La(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Es(),kt(Ln),kt(mn),eu(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return Qc(i),null;case 13:if(kt(Gt),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));xs()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return kt(Gt),null;case 4:return Es(),null;case 10:return qc(i.type._context),null;case 22:case 23:return Du(),null;case 24:return null;default:return null}}var Za=!1,_n=!1,kv=typeof WeakSet=="function"?WeakSet:Set,Oe=null;function Ts(n,i){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(c){jt(n,i,c)}else o.current=null}function yu(n,i,o){try{o()}catch(c){jt(n,i,c)}}var Dp=!1;function Bv(n,i){if(Dc=va,n=uf(),wc(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var c=o.getSelection&&o.getSelection();if(c&&c.rangeCount!==0){o=c.anchorNode;var h=c.anchorOffset,m=c.focusNode;c=c.focusOffset;try{o.nodeType,m.nodeType}catch{o=null;break e}var E=0,N=-1,B=-1,te=0,xe=0,ye=n,ge=null;t:for(;;){for(var Ie;ye!==o||h!==0&&ye.nodeType!==3||(N=E+h),ye!==m||c!==0&&ye.nodeType!==3||(B=E+c),ye.nodeType===3&&(E+=ye.nodeValue.length),(Ie=ye.firstChild)!==null;)ge=ye,ye=Ie;for(;;){if(ye===n)break t;if(ge===o&&++te===h&&(N=E),ge===m&&++xe===c&&(B=E),(Ie=ye.nextSibling)!==null)break;ye=ge,ge=ye.parentNode}ye=Ie}o=N===-1||B===-1?null:{start:N,end:B}}else o=null}o=o||{start:0,end:0}}else o=null;for(Ic={focusedElem:n,selectionRange:o},va=!1,Oe=i;Oe!==null;)if(i=Oe,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Oe=n;else for(;Oe!==null;){i=Oe;try{var ze=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(ze!==null){var Ve=ze.memoizedProps,qt=ze.memoizedState,$=i.stateNode,V=$.getSnapshotBeforeUpdate(i.elementType===i.type?Ve:li(i.type,Ve),qt);$.__reactInternalSnapshotBeforeUpdate=V}break;case 3:var Z=i.stateNode.containerInfo;Z.nodeType===1?Z.textContent="":Z.nodeType===9&&Z.documentElement&&Z.removeChild(Z.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Te){jt(i,i.return,Te)}if(n=i.sibling,n!==null){n.return=i.return,Oe=n;break}Oe=i.return}return ze=Dp,Dp=!1,ze}function zo(n,i,o){var c=i.updateQueue;if(c=c!==null?c.lastEffect:null,c!==null){var h=c=c.next;do{if((h.tag&n)===n){var m=h.destroy;h.destroy=void 0,m!==void 0&&yu(i,o,m)}h=h.next}while(h!==c)}}function Qa(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&n)===n){var c=o.create;o.destroy=c()}o=o.next}while(o!==i)}}function Su(n){var i=n.ref;if(i!==null){var o=n.stateNode;switch(n.tag){case 5:n=o;break;default:n=o}typeof i=="function"?i(n):i.current=n}}function Ip(n){var i=n.alternate;i!==null&&(n.alternate=null,Ip(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[yi],delete i[bo],delete i[Oc],delete i[Sv],delete i[Mv])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function Np(n){return n.tag===5||n.tag===3||n.tag===4}function Up(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||Np(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Mu(n,i,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(n,i):o.insertBefore(n,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(n,o)):(i=o,i.appendChild(n)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=ba));else if(c!==4&&(n=n.child,n!==null))for(Mu(n,i,o),n=n.sibling;n!==null;)Mu(n,i,o),n=n.sibling}function Eu(n,i,o){var c=n.tag;if(c===5||c===6)n=n.stateNode,i?o.insertBefore(n,i):o.appendChild(n);else if(c!==4&&(n=n.child,n!==null))for(Eu(n,i,o),n=n.sibling;n!==null;)Eu(n,i,o),n=n.sibling}var un=null,ci=!1;function ur(n,i,o){for(o=o.child;o!==null;)Fp(n,i,o),o=o.sibling}function Fp(n,i,o){if(_t&&typeof _t.onCommitFiberUnmount=="function")try{_t.onCommitFiberUnmount(Ct,o)}catch{}switch(o.tag){case 5:_n||Ts(o,i);case 6:var c=un,h=ci;un=null,ur(n,i,o),un=c,ci=h,un!==null&&(ci?(n=un,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):un.removeChild(o.stateNode));break;case 18:un!==null&&(ci?(n=un,o=o.stateNode,n.nodeType===8?Fc(n.parentNode,o):n.nodeType===1&&Fc(n,o),_o(n)):Fc(un,o.stateNode));break;case 4:c=un,h=ci,un=o.stateNode.containerInfo,ci=!0,ur(n,i,o),un=c,ci=h;break;case 0:case 11:case 14:case 15:if(!_n&&(c=o.updateQueue,c!==null&&(c=c.lastEffect,c!==null))){h=c=c.next;do{var m=h,E=m.destroy;m=m.tag,E!==void 0&&((m&2)!==0||(m&4)!==0)&&yu(o,i,E),h=h.next}while(h!==c)}ur(n,i,o);break;case 1:if(!_n&&(Ts(o,i),c=o.stateNode,typeof c.componentWillUnmount=="function"))try{c.props=o.memoizedProps,c.state=o.memoizedState,c.componentWillUnmount()}catch(N){jt(o,i,N)}ur(n,i,o);break;case 21:ur(n,i,o);break;case 22:o.mode&1?(_n=(c=_n)||o.memoizedState!==null,ur(n,i,o),_n=c):ur(n,i,o);break;default:ur(n,i,o)}}function Op(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new kv),i.forEach(function(c){var h=Yv.bind(null,n,c);o.has(c)||(o.add(c),c.then(h,h))})}}function ui(n,i){var o=i.deletions;if(o!==null)for(var c=0;c<o.length;c++){var h=o[c];try{var m=n,E=i,N=E;e:for(;N!==null;){switch(N.tag){case 5:un=N.stateNode,ci=!1;break e;case 3:un=N.stateNode.containerInfo,ci=!0;break e;case 4:un=N.stateNode.containerInfo,ci=!0;break e}N=N.return}if(un===null)throw Error(t(160));Fp(m,E,h),un=null,ci=!1;var B=h.alternate;B!==null&&(B.return=null),h.return=null}catch(te){jt(h,i,te)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)kp(i,n),i=i.sibling}function kp(n,i){var o=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(ui(i,n),Ei(n),c&4){try{zo(3,n,n.return),Qa(3,n)}catch(Ve){jt(n,n.return,Ve)}try{zo(5,n,n.return)}catch(Ve){jt(n,n.return,Ve)}}break;case 1:ui(i,n),Ei(n),c&512&&o!==null&&Ts(o,o.return);break;case 5:if(ui(i,n),Ei(n),c&512&&o!==null&&Ts(o,o.return),n.flags&32){var h=n.stateNode;try{ht(h,"")}catch(Ve){jt(n,n.return,Ve)}}if(c&4&&(h=n.stateNode,h!=null)){var m=n.memoizedProps,E=o!==null?o.memoizedProps:m,N=n.type,B=n.updateQueue;if(n.updateQueue=null,B!==null)try{N==="input"&&m.type==="radio"&&m.name!=null&&$e(h,m),ot(N,E);var te=ot(N,m);for(E=0;E<B.length;E+=2){var xe=B[E],ye=B[E+1];xe==="style"?tt(h,ye):xe==="dangerouslySetInnerHTML"?Fe(h,ye):xe==="children"?ht(h,ye):L(h,xe,ye,te)}switch(N){case"input":lt(h,m);break;case"textarea":me(h,m);break;case"select":var ge=h._wrapperState.wasMultiple;h._wrapperState.wasMultiple=!!m.multiple;var Ie=m.value;Ie!=null?D(h,!!m.multiple,Ie,!1):ge!==!!m.multiple&&(m.defaultValue!=null?D(h,!!m.multiple,m.defaultValue,!0):D(h,!!m.multiple,m.multiple?[]:"",!1))}h[bo]=m}catch(Ve){jt(n,n.return,Ve)}}break;case 6:if(ui(i,n),Ei(n),c&4){if(n.stateNode===null)throw Error(t(162));h=n.stateNode,m=n.memoizedProps;try{h.nodeValue=m}catch(Ve){jt(n,n.return,Ve)}}break;case 3:if(ui(i,n),Ei(n),c&4&&o!==null&&o.memoizedState.isDehydrated)try{_o(i.containerInfo)}catch(Ve){jt(n,n.return,Ve)}break;case 4:ui(i,n),Ei(n);break;case 13:ui(i,n),Ei(n),h=n.child,h.flags&8192&&(m=h.memoizedState!==null,h.stateNode.isHidden=m,!m||h.alternate!==null&&h.alternate.memoizedState!==null||(Au=Ee())),c&4&&Op(n);break;case 22:if(xe=o!==null&&o.memoizedState!==null,n.mode&1?(_n=(te=_n)||xe,ui(i,n),_n=te):ui(i,n),Ei(n),c&8192){if(te=n.memoizedState!==null,(n.stateNode.isHidden=te)&&!xe&&(n.mode&1)!==0)for(Oe=n,xe=n.child;xe!==null;){for(ye=Oe=xe;Oe!==null;){switch(ge=Oe,Ie=ge.child,ge.tag){case 0:case 11:case 14:case 15:zo(4,ge,ge.return);break;case 1:Ts(ge,ge.return);var ze=ge.stateNode;if(typeof ze.componentWillUnmount=="function"){c=ge,o=ge.return;try{i=c,ze.props=i.memoizedProps,ze.state=i.memoizedState,ze.componentWillUnmount()}catch(Ve){jt(c,o,Ve)}}break;case 5:Ts(ge,ge.return);break;case 22:if(ge.memoizedState!==null){Hp(ye);continue}}Ie!==null?(Ie.return=ge,Oe=Ie):Hp(ye)}xe=xe.sibling}e:for(xe=null,ye=n;;){if(ye.tag===5){if(xe===null){xe=ye;try{h=ye.stateNode,te?(m=h.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(N=ye.stateNode,B=ye.memoizedProps.style,E=B!=null&&B.hasOwnProperty("display")?B.display:null,N.style.display=et("display",E))}catch(Ve){jt(n,n.return,Ve)}}}else if(ye.tag===6){if(xe===null)try{ye.stateNode.nodeValue=te?"":ye.memoizedProps}catch(Ve){jt(n,n.return,Ve)}}else if((ye.tag!==22&&ye.tag!==23||ye.memoizedState===null||ye===n)&&ye.child!==null){ye.child.return=ye,ye=ye.child;continue}if(ye===n)break e;for(;ye.sibling===null;){if(ye.return===null||ye.return===n)break e;xe===ye&&(xe=null),ye=ye.return}xe===ye&&(xe=null),ye.sibling.return=ye.return,ye=ye.sibling}}break;case 19:ui(i,n),Ei(n),c&4&&Op(n);break;case 21:break;default:ui(i,n),Ei(n)}}function Ei(n){var i=n.flags;if(i&2){try{e:{for(var o=n.return;o!==null;){if(Np(o)){var c=o;break e}o=o.return}throw Error(t(160))}switch(c.tag){case 5:var h=c.stateNode;c.flags&32&&(ht(h,""),c.flags&=-33);var m=Up(n);Eu(n,m,h);break;case 3:case 4:var E=c.stateNode.containerInfo,N=Up(n);Mu(n,N,E);break;default:throw Error(t(161))}}catch(B){jt(n,n.return,B)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function zv(n,i,o){Oe=n,Bp(n)}function Bp(n,i,o){for(var c=(n.mode&1)!==0;Oe!==null;){var h=Oe,m=h.child;if(h.tag===22&&c){var E=h.memoizedState!==null||Za;if(!E){var N=h.alternate,B=N!==null&&N.memoizedState!==null||_n;N=Za;var te=_n;if(Za=E,(_n=B)&&!te)for(Oe=h;Oe!==null;)E=Oe,B=E.child,E.tag===22&&E.memoizedState!==null?Vp(h):B!==null?(B.return=E,Oe=B):Vp(h);for(;m!==null;)Oe=m,Bp(m),m=m.sibling;Oe=h,Za=N,_n=te}zp(n)}else(h.subtreeFlags&8772)!==0&&m!==null?(m.return=h,Oe=m):zp(n)}}function zp(n){for(;Oe!==null;){var i=Oe;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:_n||Qa(5,i);break;case 1:var c=i.stateNode;if(i.flags&4&&!_n)if(o===null)c.componentDidMount();else{var h=i.elementType===i.type?o.memoizedProps:li(i.type,o.memoizedProps);c.componentDidUpdate(h,o.memoizedState,c.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&Hf(i,m,c);break;case 3:var E=i.updateQueue;if(E!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}Hf(i,E,o)}break;case 5:var N=i.stateNode;if(o===null&&i.flags&4){o=N;var B=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":B.autoFocus&&o.focus();break;case"img":B.src&&(o.src=B.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var te=i.alternate;if(te!==null){var xe=te.memoizedState;if(xe!==null){var ye=xe.dehydrated;ye!==null&&_o(ye)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}_n||i.flags&512&&Su(i)}catch(ge){jt(i,i.return,ge)}}if(i===n){Oe=null;break}if(o=i.sibling,o!==null){o.return=i.return,Oe=o;break}Oe=i.return}}function Hp(n){for(;Oe!==null;){var i=Oe;if(i===n){Oe=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Oe=o;break}Oe=i.return}}function Vp(n){for(;Oe!==null;){var i=Oe;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{Qa(4,i)}catch(B){jt(i,o,B)}break;case 1:var c=i.stateNode;if(typeof c.componentDidMount=="function"){var h=i.return;try{c.componentDidMount()}catch(B){jt(i,h,B)}}var m=i.return;try{Su(i)}catch(B){jt(i,m,B)}break;case 5:var E=i.return;try{Su(i)}catch(B){jt(i,E,B)}}}catch(B){jt(i,i.return,B)}if(i===n){Oe=null;break}var N=i.sibling;if(N!==null){N.return=i.return,Oe=N;break}Oe=i.return}}var Hv=Math.ceil,Ja=C.ReactCurrentDispatcher,wu=C.ReactCurrentOwner,ei=C.ReactCurrentBatchConfig,wt=0,an=null,Yt=null,dn=0,Vn=0,As=sr(0),en=0,Ho=null,Or=0,el=0,Tu=0,Vo=null,Nn=null,Au=0,Rs=1/0,Bi=null,tl=!1,Ru=null,dr=null,nl=!1,hr=null,il=0,Go=0,Cu=null,rl=-1,sl=0;function wn(){return(wt&6)!==0?Ee():rl!==-1?rl:rl=Ee()}function fr(n){return(n.mode&1)===0?1:(wt&2)!==0&&dn!==0?dn&-dn:wv.transition!==null?(sl===0&&(sl=Mn()),sl):(n=Lt,n!==0||(n=window.event,n=n===void 0?16:Gh(n.type)),n)}function di(n,i,o,c){if(50<Go)throw Go=0,Cu=null,Error(t(185));Pn(n,o,c),((wt&2)===0||n!==an)&&(n===an&&((wt&2)===0&&(el|=o),en===4&&pr(n,dn)),Un(n,c),o===1&&wt===0&&(i.mode&1)===0&&(Rs=Ee()+500,Ia&&ar()))}function Un(n,i){var o=n.callbackNode;Yn(n,i);var c=xi(n,n===an?dn:0);if(c===0)o!==null&&ie(o),n.callbackNode=null,n.callbackPriority=0;else if(i=c&-c,n.callbackPriority!==i){if(o!=null&&ie(o),i===1)n.tag===0?Ev(Wp.bind(null,n)):bf(Wp.bind(null,n)),xv(function(){(wt&6)===0&&ar()}),o=null;else{switch(Uh(c)){case 1:o=He;break;case 4:o=nt;break;case 16:o=rt;break;case 536870912:o=yt;break;default:o=rt}o=Qp(o,Gp.bind(null,n))}n.callbackPriority=i,n.callbackNode=o}}function Gp(n,i){if(rl=-1,sl=0,(wt&6)!==0)throw Error(t(327));var o=n.callbackNode;if(Cs()&&n.callbackNode!==o)return null;var c=xi(n,n===an?dn:0);if(c===0)return null;if((c&30)!==0||(c&n.expiredLanes)!==0||i)i=ol(n,c);else{i=c;var h=wt;wt|=2;var m=Xp();(an!==n||dn!==i)&&(Bi=null,Rs=Ee()+500,Br(n,i));do try{Wv();break}catch(N){jp(n,N)}while(!0);Xc(),Ja.current=m,wt=h,Yt!==null?i=0:(an=null,dn=0,i=en)}if(i!==0){if(i===2&&(h=Li(n),h!==0&&(c=h,i=bu(n,h))),i===1)throw o=Ho,Br(n,0),pr(n,c),Un(n,Ee()),o;if(i===6)pr(n,c);else{if(h=n.current.alternate,(c&30)===0&&!Vv(h)&&(i=ol(n,c),i===2&&(m=Li(n),m!==0&&(c=m,i=bu(n,m))),i===1))throw o=Ho,Br(n,0),pr(n,c),Un(n,Ee()),o;switch(n.finishedWork=h,n.finishedLanes=c,i){case 0:case 1:throw Error(t(345));case 2:zr(n,Nn,Bi);break;case 3:if(pr(n,c),(c&130023424)===c&&(i=Au+500-Ee(),10<i)){if(xi(n,0)!==0)break;if(h=n.suspendedLanes,(h&c)!==c){wn(),n.pingedLanes|=n.suspendedLanes&h;break}n.timeoutHandle=Uc(zr.bind(null,n,Nn,Bi),i);break}zr(n,Nn,Bi);break;case 4:if(pr(n,c),(c&4194240)===c)break;for(i=n.eventTimes,h=-1;0<c;){var E=31-ct(c);m=1<<E,E=i[E],E>h&&(h=E),c&=~m}if(c=h,c=Ee()-c,c=(120>c?120:480>c?480:1080>c?1080:1920>c?1920:3e3>c?3e3:4320>c?4320:1960*Hv(c/1960))-c,10<c){n.timeoutHandle=Uc(zr.bind(null,n,Nn,Bi),c);break}zr(n,Nn,Bi);break;case 5:zr(n,Nn,Bi);break;default:throw Error(t(329))}}}return Un(n,Ee()),n.callbackNode===o?Gp.bind(null,n):null}function bu(n,i){var o=Vo;return n.current.memoizedState.isDehydrated&&(Br(n,i).flags|=256),n=ol(n,i),n!==2&&(i=Nn,Nn=o,i!==null&&Pu(i)),n}function Pu(n){Nn===null?Nn=n:Nn.push.apply(Nn,n)}function Vv(n){for(var i=n;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var c=0;c<o.length;c++){var h=o[c],m=h.getSnapshot;h=h.value;try{if(!oi(m(),h))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function pr(n,i){for(i&=~Tu,i&=~el,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var o=31-ct(i),c=1<<o;n[o]=-1,i&=~c}}function Wp(n){if((wt&6)!==0)throw Error(t(327));Cs();var i=xi(n,0);if((i&1)===0)return Un(n,Ee()),null;var o=ol(n,i);if(n.tag!==0&&o===2){var c=Li(n);c!==0&&(i=c,o=bu(n,c))}if(o===1)throw o=Ho,Br(n,0),pr(n,i),Un(n,Ee()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,zr(n,Nn,Bi),Un(n,Ee()),null}function Lu(n,i){var o=wt;wt|=1;try{return n(i)}finally{wt=o,wt===0&&(Rs=Ee()+500,Ia&&ar())}}function kr(n){hr!==null&&hr.tag===0&&(wt&6)===0&&Cs();var i=wt;wt|=1;var o=ei.transition,c=Lt;try{if(ei.transition=null,Lt=1,n)return n()}finally{Lt=c,ei.transition=o,wt=i,(wt&6)===0&&ar()}}function Du(){Vn=As.current,kt(As)}function Br(n,i){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,_v(o)),Yt!==null)for(o=Yt.return;o!==null;){var c=o;switch(Hc(c),c.tag){case 1:c=c.type.childContextTypes,c!=null&&La();break;case 3:Es(),kt(Ln),kt(mn),eu();break;case 5:Qc(c);break;case 4:Es();break;case 13:kt(Gt);break;case 19:kt(Gt);break;case 10:qc(c.type._context);break;case 22:case 23:Du()}o=o.return}if(an=n,Yt=n=mr(n.current,null),dn=Vn=i,en=0,Ho=null,Tu=el=Or=0,Nn=Vo=null,Nr!==null){for(i=0;i<Nr.length;i++)if(o=Nr[i],c=o.interleaved,c!==null){o.interleaved=null;var h=c.next,m=o.pending;if(m!==null){var E=m.next;m.next=h,c.next=E}o.pending=c}Nr=null}return n}function jp(n,i){do{var o=Yt;try{if(Xc(),Ga.current=qa,Wa){for(var c=Wt.memoizedState;c!==null;){var h=c.queue;h!==null&&(h.pending=null),c=c.next}Wa=!1}if(Fr=0,on=Jt=Wt=null,Uo=!1,Fo=0,wu.current=null,o===null||o.return===null){en=1,Ho=i,Yt=null;break}e:{var m=n,E=o.return,N=o,B=i;if(i=dn,N.flags|=32768,B!==null&&typeof B=="object"&&typeof B.then=="function"){var te=B,xe=N,ye=xe.tag;if((xe.mode&1)===0&&(ye===0||ye===11||ye===15)){var ge=xe.alternate;ge?(xe.updateQueue=ge.updateQueue,xe.memoizedState=ge.memoizedState,xe.lanes=ge.lanes):(xe.updateQueue=null,xe.memoizedState=null)}var Ie=gp(E);if(Ie!==null){Ie.flags&=-257,vp(Ie,E,N,m,i),Ie.mode&1&&mp(m,te,i),i=Ie,B=te;var ze=i.updateQueue;if(ze===null){var Ve=new Set;Ve.add(B),i.updateQueue=Ve}else ze.add(B);break e}else{if((i&1)===0){mp(m,te,i),Iu();break e}B=Error(t(426))}}else if(Ht&&N.mode&1){var qt=gp(E);if(qt!==null){(qt.flags&65536)===0&&(qt.flags|=256),vp(qt,E,N,m,i),Wc(ws(B,N));break e}}m=B=ws(B,N),en!==4&&(en=2),Vo===null?Vo=[m]:Vo.push(m),m=E;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var $=fp(m,B,i);zf(m,$);break e;case 1:N=B;var V=m.type,Z=m.stateNode;if((m.flags&128)===0&&(typeof V.getDerivedStateFromError=="function"||Z!==null&&typeof Z.componentDidCatch=="function"&&(dr===null||!dr.has(Z)))){m.flags|=65536,i&=-i,m.lanes|=i;var Te=pp(m,N,i);zf(m,Te);break e}}m=m.return}while(m!==null)}Yp(o)}catch(Xe){i=Xe,Yt===o&&o!==null&&(Yt=o=o.return);continue}break}while(!0)}function Xp(){var n=Ja.current;return Ja.current=qa,n===null?qa:n}function Iu(){(en===0||en===3||en===2)&&(en=4),an===null||(Or&268435455)===0&&(el&268435455)===0||pr(an,dn)}function ol(n,i){var o=wt;wt|=2;var c=Xp();(an!==n||dn!==i)&&(Bi=null,Br(n,i));do try{Gv();break}catch(h){jp(n,h)}while(!0);if(Xc(),wt=o,Ja.current=c,Yt!==null)throw Error(t(261));return an=null,dn=0,en}function Gv(){for(;Yt!==null;)qp(Yt)}function Wv(){for(;Yt!==null&&!Y();)qp(Yt)}function qp(n){var i=Zp(n.alternate,n,Vn);n.memoizedProps=n.pendingProps,i===null?Yp(n):Yt=i,wu.current=null}function Yp(n){var i=n;do{var o=i.alternate;if(n=i.return,(i.flags&32768)===0){if(o=Fv(o,i,Vn),o!==null){Yt=o;return}}else{if(o=Ov(o,i),o!==null){o.flags&=32767,Yt=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{en=6,Yt=null;return}}if(i=i.sibling,i!==null){Yt=i;return}Yt=i=n}while(i!==null);en===0&&(en=5)}function zr(n,i,o){var c=Lt,h=ei.transition;try{ei.transition=null,Lt=1,jv(n,i,o,c)}finally{ei.transition=h,Lt=c}return null}function jv(n,i,o,c){do Cs();while(hr!==null);if((wt&6)!==0)throw Error(t(327));o=n.finishedWork;var h=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var m=o.lanes|o.childLanes;if(pa(n,m),n===an&&(Yt=an=null,dn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||nl||(nl=!0,Qp(rt,function(){return Cs(),null})),m=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||m){m=ei.transition,ei.transition=null;var E=Lt;Lt=1;var N=wt;wt|=4,wu.current=null,Bv(n,o),kp(o,n),dv(Ic),va=!!Dc,Ic=Dc=null,n.current=o,zv(o),Ae(),wt=N,Lt=E,ei.transition=m}else n.current=o;if(nl&&(nl=!1,hr=n,il=h),m=n.pendingLanes,m===0&&(dr=null),fn(o.stateNode),Un(n,Ee()),i!==null)for(c=n.onRecoverableError,o=0;o<i.length;o++)h=i[o],c(h.value,{componentStack:h.stack,digest:h.digest});if(tl)throw tl=!1,n=Ru,Ru=null,n;return(il&1)!==0&&n.tag!==0&&Cs(),m=n.pendingLanes,(m&1)!==0?n===Cu?Go++:(Go=0,Cu=n):Go=0,ar(),null}function Cs(){if(hr!==null){var n=Uh(il),i=ei.transition,o=Lt;try{if(ei.transition=null,Lt=16>n?16:n,hr===null)var c=!1;else{if(n=hr,hr=null,il=0,(wt&6)!==0)throw Error(t(331));var h=wt;for(wt|=4,Oe=n.current;Oe!==null;){var m=Oe,E=m.child;if((Oe.flags&16)!==0){var N=m.deletions;if(N!==null){for(var B=0;B<N.length;B++){var te=N[B];for(Oe=te;Oe!==null;){var xe=Oe;switch(xe.tag){case 0:case 11:case 15:zo(8,xe,m)}var ye=xe.child;if(ye!==null)ye.return=xe,Oe=ye;else for(;Oe!==null;){xe=Oe;var ge=xe.sibling,Ie=xe.return;if(Ip(xe),xe===te){Oe=null;break}if(ge!==null){ge.return=Ie,Oe=ge;break}Oe=Ie}}}var ze=m.alternate;if(ze!==null){var Ve=ze.child;if(Ve!==null){ze.child=null;do{var qt=Ve.sibling;Ve.sibling=null,Ve=qt}while(Ve!==null)}}Oe=m}}if((m.subtreeFlags&2064)!==0&&E!==null)E.return=m,Oe=E;else e:for(;Oe!==null;){if(m=Oe,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:zo(9,m,m.return)}var $=m.sibling;if($!==null){$.return=m.return,Oe=$;break e}Oe=m.return}}var V=n.current;for(Oe=V;Oe!==null;){E=Oe;var Z=E.child;if((E.subtreeFlags&2064)!==0&&Z!==null)Z.return=E,Oe=Z;else e:for(E=V;Oe!==null;){if(N=Oe,(N.flags&2048)!==0)try{switch(N.tag){case 0:case 11:case 15:Qa(9,N)}}catch(Xe){jt(N,N.return,Xe)}if(N===E){Oe=null;break e}var Te=N.sibling;if(Te!==null){Te.return=N.return,Oe=Te;break e}Oe=N.return}}if(wt=h,ar(),_t&&typeof _t.onPostCommitFiberRoot=="function")try{_t.onPostCommitFiberRoot(Ct,n)}catch{}c=!0}return c}finally{Lt=o,ei.transition=i}}return!1}function $p(n,i,o){i=ws(o,i),i=fp(n,i,1),n=cr(n,i,1),i=wn(),n!==null&&(Pn(n,1,i),Un(n,i))}function jt(n,i,o){if(n.tag===3)$p(n,n,o);else for(;i!==null;){if(i.tag===3){$p(i,n,o);break}else if(i.tag===1){var c=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof c.componentDidCatch=="function"&&(dr===null||!dr.has(c))){n=ws(o,n),n=pp(i,n,1),i=cr(i,n,1),n=wn(),i!==null&&(Pn(i,1,n),Un(i,n));break}}i=i.return}}function Xv(n,i,o){var c=n.pingCache;c!==null&&c.delete(i),i=wn(),n.pingedLanes|=n.suspendedLanes&o,an===n&&(dn&o)===o&&(en===4||en===3&&(dn&130023424)===dn&&500>Ee()-Au?Br(n,0):Tu|=o),Un(n,i)}function Kp(n,i){i===0&&((n.mode&1)===0?i=1:(i=si,si<<=1,(si&130023424)===0&&(si=4194304)));var o=wn();n=Fi(n,i),n!==null&&(Pn(n,i,o),Un(n,o))}function qv(n){var i=n.memoizedState,o=0;i!==null&&(o=i.retryLane),Kp(n,o)}function Yv(n,i){var o=0;switch(n.tag){case 13:var c=n.stateNode,h=n.memoizedState;h!==null&&(o=h.retryLane);break;case 19:c=n.stateNode;break;default:throw Error(t(314))}c!==null&&c.delete(i),Kp(n,o)}var Zp;Zp=function(n,i,o){if(n!==null)if(n.memoizedProps!==i.pendingProps||Ln.current)In=!0;else{if((n.lanes&o)===0&&(i.flags&128)===0)return In=!1,Uv(n,i,o);In=(n.flags&131072)!==0}else In=!1,Ht&&(i.flags&1048576)!==0&&Pf(i,Ua,i.index);switch(i.lanes=0,i.tag){case 2:var c=i.type;Ka(n,i),n=i.pendingProps;var h=gs(i,mn.current);Ms(i,o),h=iu(null,i,c,n,h,o);var m=ru();return i.flags|=1,typeof h=="object"&&h!==null&&typeof h.render=="function"&&h.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,Dn(c)?(m=!0,Da(i)):m=!1,i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,Kc(i),h.updater=Ya,i.stateNode=h,h._reactInternals=i,uu(i,c,n,o),i=pu(null,i,c,!0,m,o)):(i.tag=0,Ht&&m&&zc(i),En(null,i,h,o),i=i.child),i;case 16:c=i.elementType;e:{switch(Ka(n,i),n=i.pendingProps,h=c._init,c=h(c._payload),i.type=c,h=i.tag=Kv(c),n=li(c,n),h){case 0:i=fu(null,i,c,n,o);break e;case 1:i=Ep(null,i,c,n,o);break e;case 11:i=_p(null,i,c,n,o);break e;case 14:i=xp(null,i,c,li(c.type,n),o);break e}throw Error(t(306,c,""))}return i;case 0:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),fu(n,i,c,h,o);case 1:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),Ep(n,i,c,h,o);case 3:e:{if(wp(i),n===null)throw Error(t(387));c=i.pendingProps,m=i.memoizedState,h=m.element,Bf(n,i),Ha(i,c,null,o);var E=i.memoizedState;if(c=E.element,m.isDehydrated)if(m={element:c,isDehydrated:!1,cache:E.cache,pendingSuspenseBoundaries:E.pendingSuspenseBoundaries,transitions:E.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){h=ws(Error(t(423)),i),i=Tp(n,i,c,o,h);break e}else if(c!==h){h=ws(Error(t(424)),i),i=Tp(n,i,c,o,h);break e}else for(Hn=rr(i.stateNode.containerInfo.firstChild),zn=i,Ht=!0,ai=null,o=Of(i,null,c,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(xs(),c===h){i=ki(n,i,o);break e}En(n,i,c,o)}i=i.child}return i;case 5:return Vf(i),n===null&&Gc(i),c=i.type,h=i.pendingProps,m=n!==null?n.memoizedProps:null,E=h.children,Nc(c,h)?E=null:m!==null&&Nc(c,m)&&(i.flags|=32),Mp(n,i),En(n,i,E,o),i.child;case 6:return n===null&&Gc(i),null;case 13:return Ap(n,i,o);case 4:return Zc(i,i.stateNode.containerInfo),c=i.pendingProps,n===null?i.child=ys(i,null,c,o):En(n,i,c,o),i.child;case 11:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),_p(n,i,c,h,o);case 7:return En(n,i,i.pendingProps,o),i.child;case 8:return En(n,i,i.pendingProps.children,o),i.child;case 12:return En(n,i,i.pendingProps.children,o),i.child;case 10:e:{if(c=i.type._context,h=i.pendingProps,m=i.memoizedProps,E=h.value,Ut(ka,c._currentValue),c._currentValue=E,m!==null)if(oi(m.value,E)){if(m.children===h.children&&!Ln.current){i=ki(n,i,o);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var N=m.dependencies;if(N!==null){E=m.child;for(var B=N.firstContext;B!==null;){if(B.context===c){if(m.tag===1){B=Oi(-1,o&-o),B.tag=2;var te=m.updateQueue;if(te!==null){te=te.shared;var xe=te.pending;xe===null?B.next=B:(B.next=xe.next,xe.next=B),te.pending=B}}m.lanes|=o,B=m.alternate,B!==null&&(B.lanes|=o),Yc(m.return,o,i),N.lanes|=o;break}B=B.next}}else if(m.tag===10)E=m.type===i.type?null:m.child;else if(m.tag===18){if(E=m.return,E===null)throw Error(t(341));E.lanes|=o,N=E.alternate,N!==null&&(N.lanes|=o),Yc(E,o,i),E=m.sibling}else E=m.child;if(E!==null)E.return=m;else for(E=m;E!==null;){if(E===i){E=null;break}if(m=E.sibling,m!==null){m.return=E.return,E=m;break}E=E.return}m=E}En(n,i,h.children,o),i=i.child}return i;case 9:return h=i.type,c=i.pendingProps.children,Ms(i,o),h=Qn(h),c=c(h),i.flags|=1,En(n,i,c,o),i.child;case 14:return c=i.type,h=li(c,i.pendingProps),h=li(c.type,h),xp(n,i,c,h,o);case 15:return yp(n,i,i.type,i.pendingProps,o);case 17:return c=i.type,h=i.pendingProps,h=i.elementType===c?h:li(c,h),Ka(n,i),i.tag=1,Dn(c)?(n=!0,Da(i)):n=!1,Ms(i,o),dp(i,c,h),uu(i,c,h,o),pu(null,i,c,!0,n,o);case 19:return Cp(n,i,o);case 22:return Sp(n,i,o)}throw Error(t(156,i.tag))};function Qp(n,i){return ne(n,i)}function $v(n,i,o,c){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=c,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(n,i,o,c){return new $v(n,i,o,c)}function Nu(n){return n=n.prototype,!(!n||!n.isReactComponent)}function Kv(n){if(typeof n=="function")return Nu(n)?1:0;if(n!=null){if(n=n.$$typeof,n===re)return 11;if(n===de)return 14}return 2}function mr(n,i){var o=n.alternate;return o===null?(o=ti(n.tag,i,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=i,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,i=n.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function al(n,i,o,c,h,m){var E=2;if(c=n,typeof n=="function")Nu(n)&&(E=1);else if(typeof n=="string")E=5;else e:switch(n){case U:return Hr(o.children,h,m,i);case k:E=8,h|=8;break;case P:return n=ti(12,o,i,h|2),n.elementType=P,n.lanes=m,n;case K:return n=ti(13,o,i,h),n.elementType=K,n.lanes=m,n;case le:return n=ti(19,o,i,h),n.elementType=le,n.lanes=m,n;case ue:return ll(o,h,m,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case R:E=10;break e;case H:E=9;break e;case re:E=11;break e;case de:E=14;break e;case oe:E=16,c=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=ti(E,o,i,h),i.elementType=n,i.type=c,i.lanes=m,i}function Hr(n,i,o,c){return n=ti(7,n,c,i),n.lanes=o,n}function ll(n,i,o,c){return n=ti(22,n,c,i),n.elementType=ue,n.lanes=o,n.stateNode={isHidden:!1},n}function Uu(n,i,o){return n=ti(6,n,null,i),n.lanes=o,n}function Fu(n,i,o){return i=ti(4,n.children!==null?n.children:[],n.key,i),i.lanes=o,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Zv(n,i,o,c,h){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=$n(0),this.expirationTimes=$n(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=$n(0),this.identifierPrefix=c,this.onRecoverableError=h,this.mutableSourceEagerHydrationData=null}function Ou(n,i,o,c,h,m,E,N,B){return n=new Zv(n,i,o,N,B),i===1?(i=1,m===!0&&(i|=8)):i=0,m=ti(3,null,null,i),n.current=m,m.stateNode=n,m.memoizedState={element:c,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},Kc(m),n}function Qv(n,i,o){var c=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:O,key:c==null?null:""+c,children:n,containerInfo:i,implementation:o}}function Jp(n){if(!n)return or;n=n._reactInternals;e:{if(_i(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(Dn(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(Dn(o))return Rf(n,o,i)}return i}function em(n,i,o,c,h,m,E,N,B){return n=Ou(o,c,!0,n,h,m,E,N,B),n.context=Jp(null),o=n.current,c=wn(),h=fr(o),m=Oi(c,h),m.callback=i??null,cr(o,m,h),n.current.lanes=h,Pn(n,h,c),Un(n,c),n}function cl(n,i,o,c){var h=i.current,m=wn(),E=fr(h);return o=Jp(o),i.context===null?i.context=o:i.pendingContext=o,i=Oi(m,E),i.payload={element:n},c=c===void 0?null:c,c!==null&&(i.callback=c),n=cr(h,i,E),n!==null&&(di(n,h,E,m),za(n,h,E)),E}function ul(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function tm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<i?o:i}}function ku(n,i){tm(n,i),(n=n.alternate)&&tm(n,i)}function Jv(){return null}var nm=typeof reportError=="function"?reportError:function(n){console.error(n)};function Bu(n){this._internalRoot=n}dl.prototype.render=Bu.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));cl(n,i,null,null)},dl.prototype.unmount=Bu.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;kr(function(){cl(null,n,null,null)}),i[Di]=null}};function dl(n){this._internalRoot=n}dl.prototype.unstable_scheduleHydration=function(n){if(n){var i=kh();n={blockedOn:null,target:n,priority:i};for(var o=0;o<tr.length&&i!==0&&i<tr[o].priority;o++);tr.splice(o,0,n),o===0&&Hh(n)}};function zu(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function hl(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function im(){}function e_(n,i,o,c,h){if(h){if(typeof c=="function"){var m=c;c=function(){var te=ul(E);m.call(te)}}var E=em(i,c,n,0,null,!1,!1,"",im);return n._reactRootContainer=E,n[Di]=E.current,Ro(n.nodeType===8?n.parentNode:n),kr(),E}for(;h=n.lastChild;)n.removeChild(h);if(typeof c=="function"){var N=c;c=function(){var te=ul(B);N.call(te)}}var B=Ou(n,0,!1,null,null,!1,!1,"",im);return n._reactRootContainer=B,n[Di]=B.current,Ro(n.nodeType===8?n.parentNode:n),kr(function(){cl(i,B,o,c)}),B}function fl(n,i,o,c,h){var m=o._reactRootContainer;if(m){var E=m;if(typeof h=="function"){var N=h;h=function(){var B=ul(E);N.call(B)}}cl(i,E,n,h)}else E=e_(o,i,n,h,c);return ul(E)}Fh=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var o=Qt(i.pendingLanes);o!==0&&(uc(i,o|1),Un(i,Ee()),(wt&6)===0&&(Rs=Ee()+500,ar()))}break;case 13:kr(function(){var c=Fi(n,1);if(c!==null){var h=wn();di(c,n,1,h)}}),ku(n,1)}},dc=function(n){if(n.tag===13){var i=Fi(n,134217728);if(i!==null){var o=wn();di(i,n,134217728,o)}ku(n,134217728)}},Oh=function(n){if(n.tag===13){var i=fr(n),o=Fi(n,i);if(o!==null){var c=wn();di(o,n,i,c)}ku(n,i)}},kh=function(){return Lt},Bh=function(n,i){var o=Lt;try{return Lt=n,i()}finally{Lt=o}},be=function(n,i,o){switch(i){case"input":if(lt(n,o),i=o.name,o.type==="radio"&&i!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var c=o[i];if(c!==n&&c.form===n.form){var h=Pa(c);if(!h)throw Error(t(90));pt(c),lt(c,h)}}}break;case"textarea":me(n,o);break;case"select":i=o.value,i!=null&&D(n,!!o.multiple,i,!1)}},Ft=Lu,Zt=kr;var t_={usingClientEntryPoint:!1,Events:[Po,ps,Pa,Le,at,Lu]},Wo={findFiberByHostInstance:Pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},n_={bundleType:Wo.bundleType,version:Wo.version,rendererPackageName:Wo.rendererPackageName,rendererConfig:Wo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:C.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=A(n),n===null?null:n.stateNode},findFiberByHostInstance:Wo.findFiberByHostInstance||Jv,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pl.isDisabled&&pl.supportsFiber)try{Ct=pl.inject(n_),_t=pl}catch{}}return Fn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=t_,Fn.createPortal=function(n,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!zu(i))throw Error(t(200));return Qv(n,i,null,o)},Fn.createRoot=function(n,i){if(!zu(n))throw Error(t(299));var o=!1,c="",h=nm;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(c=i.identifierPrefix),i.onRecoverableError!==void 0&&(h=i.onRecoverableError)),i=Ou(n,1,!1,null,null,o,!1,c,h),n[Di]=i.current,Ro(n.nodeType===8?n.parentNode:n),new Bu(i)},Fn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=A(i),n=n===null?null:n.stateNode,n},Fn.flushSync=function(n){return kr(n)},Fn.hydrate=function(n,i,o){if(!hl(i))throw Error(t(200));return fl(null,n,i,!0,o)},Fn.hydrateRoot=function(n,i,o){if(!zu(n))throw Error(t(405));var c=o!=null&&o.hydratedSources||null,h=!1,m="",E=nm;if(o!=null&&(o.unstable_strictMode===!0&&(h=!0),o.identifierPrefix!==void 0&&(m=o.identifierPrefix),o.onRecoverableError!==void 0&&(E=o.onRecoverableError)),i=em(i,null,n,1,o??null,h,!1,m,E),n[Di]=i.current,Ro(n),c)for(n=0;n<c.length;n++)o=c[n],h=o._getVersion,h=h(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,h]:i.mutableSourceEagerHydrationData.push(o,h);return new dl(i)},Fn.render=function(n,i,o){if(!hl(i))throw Error(t(200));return fl(null,n,i,!1,o)},Fn.unmountComponentAtNode=function(n){if(!hl(n))throw Error(t(40));return n._reactRootContainer?(kr(function(){fl(null,null,n,!1,function(){n._reactRootContainer=null,n[Di]=null})}),!0):!1},Fn.unstable_batchedUpdates=Lu,Fn.unstable_renderSubtreeIntoContainer=function(n,i,o,c){if(!hl(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return fl(n,i,o,!1,c)},Fn.version="18.3.1-next-f1338f8080-20240426",Fn}var dm;function h_(){if(dm)return Gu.exports;dm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),Gu.exports=d_(),Gu.exports}var hm;function f_(){if(hm)return ml;hm=1;var s=h_();return ml.createRoot=s.createRoot,ml.hydrateRoot=s.hydrateRoot,ml}var p_=f_();function Xu(s){return s===null?"—":s.toFixed(5)}function m_({snapshot:s,selectedChannel:e,onSelectChannel:t}){return b.jsxs("section",{className:"channel-card","aria-labelledby":"channel-heading",children:[b.jsxs("div",{className:"channel-heading-row",children:[b.jsxs("div",{children:[b.jsx("p",{className:"section-kicker",children:"Eight exact inputs"}),b.jsx("h2",{id:"channel-heading",children:"RMS channels"})]}),b.jsx("p",{className:"baseline-state",children:s.baseline.ready?"Fixed after baseline readiness":s.currentReadingAvailable?`Learning reference ${s.baseline.samplesSeen}/${s.baseline.samplesRequired}`:"Reference not started"})]}),b.jsx("div",{className:"table-scroll",tabIndex:0,"aria-label":"Scrollable RMS channel data",children:b.jsxs("table",{children:[b.jsx("caption",{children:"Current per-window RMS values and fixed-reference comparison in demo units"}),b.jsx("thead",{children:b.jsxs("tr",{children:[b.jsx("th",{scope:"col",children:"Channel"}),b.jsx("th",{scope:"col",children:"RMS"}),b.jsx("th",{scope:"col",children:"Mean"}),b.jsx("th",{scope:"col",children:"σ"}),b.jsx("th",{scope:"col",children:"Upper threshold"}),b.jsx("th",{scope:"col",children:"State"})]})}),b.jsx("tbody",{children:s.channels.map(r=>b.jsxs("tr",{className:e===r.channel?"is-selected":void 0,children:[b.jsx("th",{scope:"row",children:b.jsx("button",{type:"button","aria-pressed":e===r.channel,onClick:()=>t(r.channel),children:r.label})}),b.jsx("td",{children:s.currentReadingAvailable?r.rms.toFixed(5):"—"}),b.jsx("td",{children:Xu(r.mean)}),b.jsx("td",{children:Xu(r.standardDeviation)}),b.jsx("td",{children:Xu(r.upperThreshold)}),b.jsx("td",{children:s.currentReadingAvailable?r.upperThresholdExceeded?"Above":s.baseline.ready?"At or below":"Not ready":"Not started"})]},r.channel))})]})})]})}const Ng=[{id:"full-assembly",label:"Overview"},{id:"inspect-station",label:"Inspect station"},{id:"exploded-signal",label:"Exploded signal"}],g_=["B1","B2","B3","B4"],v_=["X","Y"];function gl(s,e="demo units"){return s===null?"Not ready":`${s.toFixed(5)} ${e}`}function fm(s){return Ng.find(e=>e.id===s)?.label??"Overview"}function __(){return typeof window>"u"||typeof window.matchMedia!="function"||!window.matchMedia("(max-width: 820px)").matches}function x_({mode:s,station:e,axis:t,playing:r,reducedMotion:a=!1,measurement:l,exceededChannels:u=[],onModeChange:d,onStationChange:f,onAxisChange:p,onResetCamera:g,onTogglePlayback:v}){const x=`${e}:${t}:${s}:${l.comparisonLabel}`,S=ft.useRef(x),[M,w]=ft.useState(""),[y,_]=ft.useState(__),I=a||s==="exploded-signal";return ft.useEffect(()=>{S.current!==x&&(S.current=x,w(`Bearing ${e.slice(1)}, ${t} direction selected. ${fm(s)}. ${l.comparisonLabel}.`))},[x,t,l.comparisonLabel,s,e]),ft.useEffect(()=>{if(typeof window.matchMedia!="function")return;const L=window.matchMedia("(max-width: 820px)"),C=()=>_(!L.matches);return L.addEventListener?.("change",C),()=>L.removeEventListener?.("change",C)},[]),b.jsxs("section",{className:"machine-controls","aria-labelledby":"machine-controls-title",children:[b.jsxs("div",{className:"machine-control-summary",children:[b.jsxs("div",{children:[b.jsx("p",{className:"section-kicker",id:"machine-controls-title",children:"Machine inspection"}),b.jsxs("p",{className:"machine-breadcrumb","aria-label":"Selected machine path",children:["Test cell ",b.jsx("span",{"aria-hidden":"true",children:"/"})," Bearing ",e.slice(1)," ",b.jsx("span",{"aria-hidden":"true",children:"/"})," ",t," direction"]})]}),b.jsxs("div",{className:`machine-state state-${l.comparisonGlyph}`,children:[b.jsx("span",{className:"machine-state-glyph","aria-hidden":"true"}),b.jsx("span",{children:l.comparisonLabel})]})]}),b.jsxs("details",{className:"machine-control-disclosure",open:y,onToggle:L=>_(L.currentTarget.open),children:[b.jsxs("summary",{children:[b.jsx("span",{children:"Inspect machine controls"}),b.jsxs("span",{className:"disclosure-current",children:[fm(s)," · ",e,"/",t]})]}),b.jsxs("div",{className:"machine-control-body",children:[b.jsxs("div",{className:"control-group control-group-modes",role:"group","aria-label":"Model view",children:[b.jsx("span",{className:"control-group-label",children:"Model view"}),b.jsx("div",{className:"segmented-control",children:Ng.map(L=>b.jsx("button",{type:"button","aria-pressed":s===L.id,onClick:()=>d(L.id),children:L.label},L.id))})]}),b.jsxs("div",{className:"control-group control-group-stations",role:"group","aria-label":"Bearing station",children:[b.jsx("span",{className:"control-group-label",children:"Bearing station"}),b.jsx("div",{className:"station-control-grid",children:g_.map(L=>b.jsxs("button",{id:`station-control-${L}`,type:"button","aria-pressed":e===L,onClick:()=>f(L),children:[b.jsx("span",{children:L}),b.jsxs("small",{children:["Bearing ",L.slice(1)]})]},L))})]}),b.jsxs("div",{className:"control-group control-group-axis",role:"group","aria-label":"Measurement direction",children:[b.jsx("span",{className:"control-group-label",children:"Measurement direction"}),b.jsx("div",{className:"axis-control",children:v_.map(L=>b.jsxs("button",{type:"button","aria-pressed":t===L,onClick:()=>p(L),children:[b.jsx("span",{"aria-hidden":"true",className:`axis-mark axis-${L.toLowerCase()}`}),L," direction"]},L))})]}),b.jsxs("div",{className:"control-group control-group-actions",role:"group","aria-label":"Camera and playback",children:[b.jsx("span",{className:"control-group-label",children:"Camera and playback"}),b.jsxs("div",{className:"machine-action-row",children:[b.jsx("button",{type:"button",onClick:g,children:"Reset camera"}),b.jsx("button",{type:"button",onClick:v,disabled:I,children:a?"Machine playback paused":s==="exploded-signal"?"Overview required to play":r?"Pause":"Play"})]})]})]})]}),b.jsxs("article",{className:`measurement-bridge state-${l.comparisonGlyph}`,"aria-labelledby":"measurement-bridge-title",children:[b.jsxs("div",{className:"measurement-bridge-heading",children:[b.jsxs("div",{children:[b.jsx("p",{className:"section-kicker",children:"Selected measurement"}),b.jsx("h3",{id:"measurement-bridge-title",children:l.channelLabel})]}),b.jsx("span",{className:"channel-id",children:l.channelId})]}),b.jsxs("dl",{children:[b.jsxs("div",{children:[b.jsx("dt",{children:"Current RMS"}),b.jsx("dd",{children:gl(l.currentRms,l.units)})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Fixed mean"}),b.jsx("dd",{children:gl(l.fixedMean,l.units)})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"σ"}),b.jsx("dd",{children:gl(l.standardDeviation,l.units)})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Upper rule"}),b.jsx("dd",{children:gl(l.upperThreshold,l.units)})]})]}),b.jsxs("p",{className:"measurement-comparison",children:[b.jsx("span",{className:"comparison-mark","aria-hidden":"true"}),l.comparisonLabel]}),u.length>0&&b.jsxs("p",{className:"global-exceeded-note",children:["Above upper demo threshold: ",b.jsx("strong",{children:u.join(", ")})]})]}),b.jsx("p",{className:"motion-boundary",children:"Explanatory visualization — motion visually amplified; not reconstructed from sensor data."}),b.jsx("p",{className:"sr-only","aria-live":"polite","aria-atomic":"true",children:M})]})}const y_={"not-started":"Controlled demo ready","learning-demo-baseline":"Learning demo baseline","comparing-rms":"Comparing RMS values","within-demo-reference":"Within demo reference","approaching-demo-threshold":"Approaching demo threshold","demo-threshold-exceeded":"Demo threshold exceeded","scenario-complete":"Scenario complete — inspect or replay"};function S_({snapshot:s}){const e=s.thresholdExceededChannels.map(t=>s.channels[t]?.label).filter(Boolean);return b.jsxs("article",{className:`result-card state-${s.stage}`,"aria-labelledby":"result-title",children:[b.jsxs("div",{className:"result-heading",children:[b.jsx("p",{className:"section-kicker",children:"Current comparison"}),b.jsx("span",{className:"state-symbol","aria-hidden":"true"})]}),b.jsx("h2",{id:"result-title",className:"result-title","aria-live":"polite",children:y_[s.stage]}),b.jsx("p",{className:"result-explanation",children:s.explanation}),b.jsxs("div",{className:"score-block",children:[b.jsx("p",{className:"score-label",children:"Demo deviation score"}),s.demoDeviationScore===null?b.jsx("p",{className:"score-unavailable","data-testid":"score-unavailable",children:s.stage==="comparing-rms"?"Score unavailable — comparison in progress":"Score unavailable — learning demo baseline"}):b.jsxs("p",{className:"score-value","data-testid":"score-value",children:[b.jsx("span",{children:s.demoDeviationScore.toFixed(1)}),b.jsx("small",{children:"out of 100"})]}),b.jsx("p",{className:"score-caveat",children:"A heuristic indicator derived from statistical deviation; not physical health, fault probability, or remaining useful life."})]}),e.length>0&&b.jsxs("p",{className:"exceeded-list",children:["Above upper demo threshold: ",b.jsx("strong",{children:e.join(", ")})]})]})}function M_({scenarios:s,selected:e,onSelect:t,headingRef:r}){const a=(l,u)=>{let d=u;if(l.key==="ArrowRight"||l.key==="ArrowDown")d=(u+1)%s.length;else if(l.key==="ArrowLeft"||l.key==="ArrowUp")d=(u-1+s.length)%s.length;else if(l.key==="Home")d=0;else if(l.key==="End")d=s.length-1;else return;l.preventDefault(),t(s[d].id),document.getElementById(`scenario-${s[d].id}`)?.focus()};return b.jsxs("section",{className:"scenario-card","aria-labelledby":"scenario-heading",children:[b.jsx("p",{className:"act-label",children:"Act III · Scenario lab"}),b.jsx("h2",{id:"scenario-heading",ref:r,tabIndex:-1,children:"Compare controlled scenarios"}),b.jsx("p",{children:"Each choice replays fixed local values. Scenario changes reset to a scoreless, not-started state."}),b.jsx("div",{className:"scenario-tabs",role:"tablist","aria-label":"Controlled RMS scenarios",children:s.map((l,u)=>{const d=e===l.id;return b.jsxs("button",{id:`scenario-${l.id}`,type:"button",role:"tab","aria-selected":d,tabIndex:d?0:-1,onClick:()=>t(l.id),onKeyDown:f=>a(f,u),children:[b.jsxs("span",{className:"scenario-index",children:["0",u+1]}),b.jsxs("span",{children:[b.jsx("strong",{children:l.title}),b.jsx("small",{children:l.description})]})]},l.id)})})]})}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gh="170",E_=0,pm=1,w_=2,Ug=1,Fg=2,ji=3,Ar=0,On=1,Xi=2,wr=0,Xs=1,mm=2,gm=3,vm=4,T_=5,Kr=100,A_=101,R_=102,C_=103,b_=104,P_=200,L_=201,D_=202,I_=203,Td=204,Ad=205,N_=206,U_=207,F_=208,O_=209,k_=210,B_=211,z_=212,H_=213,V_=214,Rd=0,Cd=1,bd=2,eo=3,Pd=4,Ld=5,Dd=6,Id=7,Og=0,G_=1,W_=2,Tr=0,j_=1,X_=2,q_=3,kg=4,Y_=5,$_=6,K_=7,Bg=300,to=301,no=302,Nd=303,Ud=304,oc=306,Fd=1e3,Qr=1001,Od=1002,qn=1003,Z_=1004,vl=1005,Ai=1006,qu=1007,Jr=1008,$i=1009,zg=1010,Hg=1011,sa=1012,vh=1013,ts=1014,Ri=1015,la=1016,_h=1017,xh=1018,io=1020,Vg=35902,Gg=1021,Wg=1022,mi=1023,jg=1024,Xg=1025,qs=1026,ro=1027,yh=1028,Sh=1029,qg=1030,Mh=1031,Eh=1033,ql=33776,Yl=33777,$l=33778,Kl=33779,kd=35840,Bd=35841,zd=35842,Hd=35843,Vd=36196,Gd=37492,Wd=37496,jd=37808,Xd=37809,qd=37810,Yd=37811,$d=37812,Kd=37813,Zd=37814,Qd=37815,Jd=37816,eh=37817,th=37818,nh=37819,ih=37820,rh=37821,Zl=36492,sh=36494,oh=36495,Yg=36283,ah=36284,lh=36285,ch=36286,Q_=3200,J_=3201,$g=0,ex=1,Er="",jn="srgb",ao="srgb-linear",ac="linear",It="srgb",bs=7680,_m=519,tx=512,nx=513,ix=514,Kg=515,rx=516,sx=517,ox=518,ax=519,xm=35044,_l=35048,ym="300 es",qi=2e3,Jl=2001;class lo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const a=this._listeners[e];if(a!==void 0){const l=a.indexOf(t);l!==-1&&a.splice(l,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,u=a.length;l<u;l++)a[l].call(this,e);e.target=null}}}const xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Sm=1234567;const Ys=Math.PI/180,so=180/Math.PI;function co(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(xn[s&255]+xn[s>>8&255]+xn[s>>16&255]+xn[s>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[r&255]+xn[r>>8&255]+xn[r>>16&255]+xn[r>>24&255]).toLowerCase()}function Rn(s,e,t){return Math.max(e,Math.min(t,s))}function wh(s,e){return(s%e+e)%e}function lx(s,e,t,r,a){return r+(s-e)*(a-r)/(t-e)}function cx(s,e,t){return s!==e?(t-s)/(e-s):0}function na(s,e,t){return(1-t)*s+t*e}function ux(s,e,t,r){return na(s,e,1-Math.exp(-t*r))}function dx(s,e=1){return e-Math.abs(wh(s,e*2)-e)}function hx(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function fx(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function px(s,e){return s+Math.floor(Math.random()*(e-s+1))}function mx(s,e){return s+Math.random()*(e-s)}function gx(s){return s*(.5-Math.random())}function vx(s){s!==void 0&&(Sm=s);let e=Sm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function _x(s){return s*Ys}function xx(s){return s*so}function yx(s){return(s&s-1)===0&&s!==0}function Sx(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Mx(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ex(s,e,t,r,a){const l=Math.cos,u=Math.sin,d=l(t/2),f=u(t/2),p=l((e+r)/2),g=u((e+r)/2),v=l((e-r)/2),x=u((e-r)/2),S=l((r-e)/2),M=u((r-e)/2);switch(a){case"XYX":s.set(d*g,f*v,f*x,d*p);break;case"YZY":s.set(f*x,d*g,f*v,d*p);break;case"ZXZ":s.set(f*v,f*x,d*g,d*p);break;case"XZX":s.set(d*g,f*M,f*S,d*p);break;case"YXY":s.set(f*S,d*g,f*M,d*p);break;case"ZYZ":s.set(f*M,f*S,d*g,d*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Ws(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Tn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const ec={DEG2RAD:Ys,RAD2DEG:so,generateUUID:co,clamp:Rn,euclideanModulo:wh,mapLinear:lx,inverseLerp:cx,lerp:na,damp:ux,pingpong:dx,smoothstep:hx,smootherstep:fx,randInt:px,randFloat:mx,randFloatSpread:gx,seededRandom:vx,degToRad:_x,radToDeg:xx,isPowerOfTwo:yx,ceilPowerOfTwo:Sx,floorPowerOfTwo:Mx,setQuaternionFromProperEuler:Ex,normalize:Tn,denormalize:Ws};class Mt{constructor(e=0,t=0){Mt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Rn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),l=this.x-e.x,u=this.y-e.y;return this.x=l*r-u*a+e.x,this.y=l*a+u*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ut{constructor(e,t,r,a,l,u,d,f,p){ut.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,u,d,f,p)}set(e,t,r,a,l,u,d,f,p){const g=this.elements;return g[0]=e,g[1]=a,g[2]=d,g[3]=t,g[4]=l,g[5]=f,g[6]=r,g[7]=u,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,u=r[0],d=r[3],f=r[6],p=r[1],g=r[4],v=r[7],x=r[2],S=r[5],M=r[8],w=a[0],y=a[3],_=a[6],I=a[1],L=a[4],C=a[7],W=a[2],O=a[5],U=a[8];return l[0]=u*w+d*I+f*W,l[3]=u*y+d*L+f*O,l[6]=u*_+d*C+f*U,l[1]=p*w+g*I+v*W,l[4]=p*y+g*L+v*O,l[7]=p*_+g*C+v*U,l[2]=x*w+S*I+M*W,l[5]=x*y+S*L+M*O,l[8]=x*_+S*C+M*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8];return t*u*g-t*d*p-r*l*g+r*d*f+a*l*p-a*u*f}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8],v=g*u-d*p,x=d*f-g*l,S=p*l-u*f,M=t*v+r*x+a*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/M;return e[0]=v*w,e[1]=(a*p-g*r)*w,e[2]=(d*r-a*u)*w,e[3]=x*w,e[4]=(g*t-a*f)*w,e[5]=(a*l-d*t)*w,e[6]=S*w,e[7]=(r*f-p*t)*w,e[8]=(u*t-r*l)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,l,u,d){const f=Math.cos(l),p=Math.sin(l);return this.set(r*f,r*p,-r*(f*u+p*d)+u+e,-a*p,a*f,-a*(-p*u+f*d)+d+t,0,0,1),this}scale(e,t){return this.premultiply(Yu.makeScale(e,t)),this}rotate(e){return this.premultiply(Yu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Yu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Yu=new ut;function Zg(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function tc(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function wx(){const s=tc("canvas");return s.style.display="block",s}const Mm={};function Jo(s){s in Mm||(Mm[s]=!0,console.warn(s))}function Tx(s,e,t){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}function Ax(s){const e=s.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Rx(s){const e=s.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Tt={enabled:!0,workingColorSpace:ao,spaces:{},convert:function(s,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===It&&(s.r=Yi(s.r),s.g=Yi(s.g),s.b=Yi(s.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(s.applyMatrix3(this.spaces[e].toXYZ),s.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===It&&(s.r=$s(s.r),s.g=$s(s.g),s.b=$s(s.b))),s},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Er?ac:this.spaces[s].transfer},getLuminanceCoefficients:function(s,e=this.workingColorSpace){return s.fromArray(this.spaces[e].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,e,t){return s.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}};function Yi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function $s(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Em=[.64,.33,.3,.6,.15,.06],wm=[.2126,.7152,.0722],Tm=[.3127,.329],Am=new ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rm=new ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Tt.define({[ao]:{primaries:Em,whitePoint:Tm,transfer:ac,toXYZ:Am,fromXYZ:Rm,luminanceCoefficients:wm,workingColorSpaceConfig:{unpackColorSpace:jn},outputColorSpaceConfig:{drawingBufferColorSpace:jn}},[jn]:{primaries:Em,whitePoint:Tm,transfer:It,toXYZ:Am,fromXYZ:Rm,luminanceCoefficients:wm,outputColorSpaceConfig:{drawingBufferColorSpace:jn}}});let Ps;class Cx{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ps===void 0&&(Ps=tc("canvas")),Ps.width=e.width,Ps.height=e.height;const r=Ps.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Ps}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=tc("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let u=0;u<l.length;u++)l[u]=Yi(l[u]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Yi(t[r]/255)*255):t[r]=Yi(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let bx=0;class Qg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:bx++}),this.uuid=co(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let u=0,d=a.length;u<d;u++)a[u].isDataTexture?l.push($u(a[u].image)):l.push($u(a[u]))}else l=$u(a);r.url=l}return t||(e.images[this.uuid]=r),r}}function $u(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Cx.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Px=0;class Cn extends lo{constructor(e=Cn.DEFAULT_IMAGE,t=Cn.DEFAULT_MAPPING,r=Qr,a=Qr,l=Ai,u=Jr,d=mi,f=$i,p=Cn.DEFAULT_ANISOTROPY,g=Er){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Px++}),this.uuid=co(),this.name="",this.source=new Qg(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=u,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Bg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fd:e.x=e.x-Math.floor(e.x);break;case Qr:e.x=e.x<0?0:1;break;case Od:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fd:e.y=e.y-Math.floor(e.y);break;case Qr:e.y=e.y<0?0:1;break;case Od:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Cn.DEFAULT_IMAGE=null;Cn.DEFAULT_MAPPING=Bg;Cn.DEFAULT_ANISOTROPY=1;class Xt{constructor(e=0,t=0,r=0,a=1){Xt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=this.w,u=e.elements;return this.x=u[0]*t+u[4]*r+u[8]*a+u[12]*l,this.y=u[1]*t+u[5]*r+u[9]*a+u[13]*l,this.z=u[2]*t+u[6]*r+u[10]*a+u[14]*l,this.w=u[3]*t+u[7]*r+u[11]*a+u[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,l;const f=e.elements,p=f[0],g=f[4],v=f[8],x=f[1],S=f[5],M=f[9],w=f[2],y=f[6],_=f[10];if(Math.abs(g-x)<.01&&Math.abs(v-w)<.01&&Math.abs(M-y)<.01){if(Math.abs(g+x)<.1&&Math.abs(v+w)<.1&&Math.abs(M+y)<.1&&Math.abs(p+S+_-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const L=(p+1)/2,C=(S+1)/2,W=(_+1)/2,O=(g+x)/4,U=(v+w)/4,k=(M+y)/4;return L>C&&L>W?L<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(L),a=O/r,l=U/r):C>W?C<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(C),r=O/a,l=k/a):W<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(W),r=U/l,a=k/l),this.set(r,a,l,t),this}let I=Math.sqrt((y-M)*(y-M)+(v-w)*(v-w)+(x-g)*(x-g));return Math.abs(I)<.001&&(I=1),this.x=(y-M)/I,this.y=(v-w)/I,this.z=(x-g)/I,this.w=Math.acos((p+S+_-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Lx extends lo{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Xt(0,0,e,t),this.scissorTest=!1,this.viewport=new Xt(0,0,e,t);const a={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ai,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},r);const l=new Cn(a,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);l.flipY=!1,l.generateMipmaps=r.generateMipmaps,l.internalFormat=r.internalFormat,this.textures=[];const u=r.count;for(let d=0;d<u;d++)this.textures[d]=l.clone(),this.textures[d].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,a=e.textures.length;r<a;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Qg(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends Lx{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Jg extends Cn{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=qn,this.minFilter=qn,this.wrapR=Qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Dx extends Cn{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=qn,this.minFilter=qn,this.wrapR=Qr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ci{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,l,u,d){let f=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];const x=l[u+0],S=l[u+1],M=l[u+2],w=l[u+3];if(d===0){e[t+0]=f,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(d===1){e[t+0]=x,e[t+1]=S,e[t+2]=M,e[t+3]=w;return}if(v!==w||f!==x||p!==S||g!==M){let y=1-d;const _=f*x+p*S+g*M+v*w,I=_>=0?1:-1,L=1-_*_;if(L>Number.EPSILON){const W=Math.sqrt(L),O=Math.atan2(W,_*I);y=Math.sin(y*O)/W,d=Math.sin(d*O)/W}const C=d*I;if(f=f*y+x*C,p=p*y+S*C,g=g*y+M*C,v=v*y+w*C,y===1-d){const W=1/Math.sqrt(f*f+p*p+g*g+v*v);f*=W,p*=W,g*=W,v*=W}}e[t]=f,e[t+1]=p,e[t+2]=g,e[t+3]=v}static multiplyQuaternionsFlat(e,t,r,a,l,u){const d=r[a],f=r[a+1],p=r[a+2],g=r[a+3],v=l[u],x=l[u+1],S=l[u+2],M=l[u+3];return e[t]=d*M+g*v+f*S-p*x,e[t+1]=f*M+g*x+p*v-d*S,e[t+2]=p*M+g*S+d*x-f*v,e[t+3]=g*M-d*v-f*x-p*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,l=e._z,u=e._order,d=Math.cos,f=Math.sin,p=d(r/2),g=d(a/2),v=d(l/2),x=f(r/2),S=f(a/2),M=f(l/2);switch(u){case"XYZ":this._x=x*g*v+p*S*M,this._y=p*S*v-x*g*M,this._z=p*g*M+x*S*v,this._w=p*g*v-x*S*M;break;case"YXZ":this._x=x*g*v+p*S*M,this._y=p*S*v-x*g*M,this._z=p*g*M-x*S*v,this._w=p*g*v+x*S*M;break;case"ZXY":this._x=x*g*v-p*S*M,this._y=p*S*v+x*g*M,this._z=p*g*M+x*S*v,this._w=p*g*v-x*S*M;break;case"ZYX":this._x=x*g*v-p*S*M,this._y=p*S*v+x*g*M,this._z=p*g*M-x*S*v,this._w=p*g*v+x*S*M;break;case"YZX":this._x=x*g*v+p*S*M,this._y=p*S*v+x*g*M,this._z=p*g*M-x*S*v,this._w=p*g*v-x*S*M;break;case"XZY":this._x=x*g*v-p*S*M,this._y=p*S*v-x*g*M,this._z=p*g*M+x*S*v,this._w=p*g*v+x*S*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+u)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],l=t[8],u=t[1],d=t[5],f=t[9],p=t[2],g=t[6],v=t[10],x=r+d+v;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(g-f)*S,this._y=(l-p)*S,this._z=(u-a)*S}else if(r>d&&r>v){const S=2*Math.sqrt(1+r-d-v);this._w=(g-f)/S,this._x=.25*S,this._y=(a+u)/S,this._z=(l+p)/S}else if(d>v){const S=2*Math.sqrt(1+d-r-v);this._w=(l-p)/S,this._x=(a+u)/S,this._y=.25*S,this._z=(f+g)/S}else{const S=2*Math.sqrt(1+v-r-d);this._w=(u-a)/S,this._x=(l+p)/S,this._y=(f+g)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Rn(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,l=e._z,u=e._w,d=t._x,f=t._y,p=t._z,g=t._w;return this._x=r*g+u*d+a*p-l*f,this._y=a*g+u*f+l*d-r*p,this._z=l*g+u*p+r*f-a*d,this._w=u*g-r*d-a*f-l*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,a=this._y,l=this._z,u=this._w;let d=u*e._w+r*e._x+a*e._y+l*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=u,this._x=r,this._y=a,this._z=l,this;const f=1-d*d;if(f<=Number.EPSILON){const S=1-t;return this._w=S*u+t*this._w,this._x=S*r+t*this._x,this._y=S*a+t*this._y,this._z=S*l+t*this._z,this.normalize(),this}const p=Math.sqrt(f),g=Math.atan2(p,d),v=Math.sin((1-t)*g)/p,x=Math.sin(t*g)/p;return this._w=u*v+this._w*x,this._x=r*v+this._x*x,this._y=a*v+this._y*x,this._z=l*v+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(e=0,t=0,r=0){j.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*a,this.y=l[1]*t+l[4]*r+l[7]*a,this.z=l[2]*t+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=e.elements,u=1/(l[3]*t+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*a+l[12])*u,this.y=(l[1]*t+l[5]*r+l[9]*a+l[13])*u,this.z=(l[2]*t+l[6]*r+l[10]*a+l[14])*u,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,l=e.x,u=e.y,d=e.z,f=e.w,p=2*(u*a-d*r),g=2*(d*t-l*a),v=2*(l*r-u*t);return this.x=t+f*p+u*v-d*g,this.y=r+f*g+d*p-l*v,this.z=a+f*v+l*g-u*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*a,this.y=l[1]*t+l[5]*r+l[9]*a,this.z=l[2]*t+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,l=e.z,u=t.x,d=t.y,f=t.z;return this.x=a*f-l*d,this.y=l*u-r*f,this.z=r*d-a*u,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Ku.copy(this).projectOnVector(e),this.sub(Ku)}reflect(e){return this.sub(Ku.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(Rn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ku=new j,Cm=new Ci;class rs{constructor(e=new j(1/0,1/0,1/0),t=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let u=0,d=l.count;u<d;u++)e.isMesh===!0?e.getVertexPosition(u,hi):hi.fromBufferAttribute(l,u),hi.applyMatrix4(e.matrixWorld),this.expandByPoint(hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xl.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),xl.copy(r.boundingBox)),xl.applyMatrix4(e.matrixWorld),this.union(xl)}const a=e.children;for(let l=0,u=a.length;l<u;l++)this.expandByObject(a[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hi),hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xo),yl.subVectors(this.max,Xo),Ls.subVectors(e.a,Xo),Ds.subVectors(e.b,Xo),Is.subVectors(e.c,Xo),vr.subVectors(Ds,Ls),_r.subVectors(Is,Ds),Vr.subVectors(Ls,Is);let t=[0,-vr.z,vr.y,0,-_r.z,_r.y,0,-Vr.z,Vr.y,vr.z,0,-vr.x,_r.z,0,-_r.x,Vr.z,0,-Vr.x,-vr.y,vr.x,0,-_r.y,_r.x,0,-Vr.y,Vr.x,0];return!Zu(t,Ls,Ds,Is,yl)||(t=[1,0,0,0,1,0,0,0,1],!Zu(t,Ls,Ds,Is,yl))?!1:(Sl.crossVectors(vr,_r),t=[Sl.x,Sl.y,Sl.z],Zu(t,Ls,Ds,Is,yl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const zi=[new j,new j,new j,new j,new j,new j,new j,new j],hi=new j,xl=new rs,Ls=new j,Ds=new j,Is=new j,vr=new j,_r=new j,Vr=new j,Xo=new j,yl=new j,Sl=new j,Gr=new j;function Zu(s,e,t,r,a){for(let l=0,u=s.length-3;l<=u;l+=3){Gr.fromArray(s,l);const d=a.x*Math.abs(Gr.x)+a.y*Math.abs(Gr.y)+a.z*Math.abs(Gr.z),f=e.dot(Gr),p=t.dot(Gr),g=r.dot(Gr);if(Math.max(-Math.max(f,p,g),Math.min(f,p,g))>d)return!1}return!0}const Ix=new rs,qo=new j,Qu=new j;class uo{constructor(e=new j,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):Ix.setFromPoints(e).getCenter(r);let a=0;for(let l=0,u=e.length;l<u;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qo.subVectors(e,this.center);const t=qo.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(qo,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Qu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qo.copy(e.center).add(Qu)),this.expandByPoint(qo.copy(e.center).sub(Qu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Hi=new j,Ju=new j,Ml=new j,xr=new j,ed=new j,El=new j,td=new j;class Th{constructor(e=new j,t=new j(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Hi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Hi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Hi.copy(this.origin).addScaledVector(this.direction,t),Hi.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){Ju.copy(e).add(t).multiplyScalar(.5),Ml.copy(t).sub(e).normalize(),xr.copy(this.origin).sub(Ju);const l=e.distanceTo(t)*.5,u=-this.direction.dot(Ml),d=xr.dot(this.direction),f=-xr.dot(Ml),p=xr.lengthSq(),g=Math.abs(1-u*u);let v,x,S,M;if(g>0)if(v=u*f-d,x=u*d-f,M=l*g,v>=0)if(x>=-M)if(x<=M){const w=1/g;v*=w,x*=w,S=v*(v+u*x+2*d)+x*(u*v+x+2*f)+p}else x=l,v=Math.max(0,-(u*x+d)),S=-v*v+x*(x+2*f)+p;else x=-l,v=Math.max(0,-(u*x+d)),S=-v*v+x*(x+2*f)+p;else x<=-M?(v=Math.max(0,-(-u*l+d)),x=v>0?-l:Math.min(Math.max(-l,-f),l),S=-v*v+x*(x+2*f)+p):x<=M?(v=0,x=Math.min(Math.max(-l,-f),l),S=x*(x+2*f)+p):(v=Math.max(0,-(u*l+d)),x=v>0?l:Math.min(Math.max(-l,-f),l),S=-v*v+x*(x+2*f)+p);else x=u>0?-l:l,v=Math.max(0,-(u*x+d)),S=-v*v+x*(x+2*f)+p;return r&&r.copy(this.origin).addScaledVector(this.direction,v),a&&a.copy(Ju).addScaledVector(Ml,x),S}intersectSphere(e,t){Hi.subVectors(e.center,this.origin);const r=Hi.dot(this.direction),a=Hi.dot(Hi)-r*r,l=e.radius*e.radius;if(a>l)return null;const u=Math.sqrt(l-a),d=r-u,f=r+u;return f<0?null:d<0?this.at(f,t):this.at(d,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,l,u,d,f;const p=1/this.direction.x,g=1/this.direction.y,v=1/this.direction.z,x=this.origin;return p>=0?(r=(e.min.x-x.x)*p,a=(e.max.x-x.x)*p):(r=(e.max.x-x.x)*p,a=(e.min.x-x.x)*p),g>=0?(l=(e.min.y-x.y)*g,u=(e.max.y-x.y)*g):(l=(e.max.y-x.y)*g,u=(e.min.y-x.y)*g),r>u||l>a||((l>r||isNaN(r))&&(r=l),(u<a||isNaN(a))&&(a=u),v>=0?(d=(e.min.z-x.z)*v,f=(e.max.z-x.z)*v):(d=(e.max.z-x.z)*v,f=(e.min.z-x.z)*v),r>f||d>a)||((d>r||r!==r)&&(r=d),(f<a||a!==a)&&(a=f),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,Hi)!==null}intersectTriangle(e,t,r,a,l){ed.subVectors(t,e),El.subVectors(r,e),td.crossVectors(ed,El);let u=this.direction.dot(td),d;if(u>0){if(a)return null;d=1}else if(u<0)d=-1,u=-u;else return null;xr.subVectors(this.origin,e);const f=d*this.direction.dot(El.crossVectors(xr,El));if(f<0)return null;const p=d*this.direction.dot(ed.cross(xr));if(p<0||f+p>u)return null;const g=-d*xr.dot(td);return g<0?null:this.at(g/u,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,r,a,l,u,d,f,p,g,v,x,S,M,w,y){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,u,d,f,p,g,v,x,S,M,w,y)}set(e,t,r,a,l,u,d,f,p,g,v,x,S,M,w,y){const _=this.elements;return _[0]=e,_[4]=t,_[8]=r,_[12]=a,_[1]=l,_[5]=u,_[9]=d,_[13]=f,_[2]=p,_[6]=g,_[10]=v,_[14]=x,_[3]=S,_[7]=M,_[11]=w,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,a=1/Ns.setFromMatrixColumn(e,0).length(),l=1/Ns.setFromMatrixColumn(e,1).length(),u=1/Ns.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*u,t[9]=r[9]*u,t[10]=r[10]*u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,l=e.z,u=Math.cos(r),d=Math.sin(r),f=Math.cos(a),p=Math.sin(a),g=Math.cos(l),v=Math.sin(l);if(e.order==="XYZ"){const x=u*g,S=u*v,M=d*g,w=d*v;t[0]=f*g,t[4]=-f*v,t[8]=p,t[1]=S+M*p,t[5]=x-w*p,t[9]=-d*f,t[2]=w-x*p,t[6]=M+S*p,t[10]=u*f}else if(e.order==="YXZ"){const x=f*g,S=f*v,M=p*g,w=p*v;t[0]=x+w*d,t[4]=M*d-S,t[8]=u*p,t[1]=u*v,t[5]=u*g,t[9]=-d,t[2]=S*d-M,t[6]=w+x*d,t[10]=u*f}else if(e.order==="ZXY"){const x=f*g,S=f*v,M=p*g,w=p*v;t[0]=x-w*d,t[4]=-u*v,t[8]=M+S*d,t[1]=S+M*d,t[5]=u*g,t[9]=w-x*d,t[2]=-u*p,t[6]=d,t[10]=u*f}else if(e.order==="ZYX"){const x=u*g,S=u*v,M=d*g,w=d*v;t[0]=f*g,t[4]=M*p-S,t[8]=x*p+w,t[1]=f*v,t[5]=w*p+x,t[9]=S*p-M,t[2]=-p,t[6]=d*f,t[10]=u*f}else if(e.order==="YZX"){const x=u*f,S=u*p,M=d*f,w=d*p;t[0]=f*g,t[4]=w-x*v,t[8]=M*v+S,t[1]=v,t[5]=u*g,t[9]=-d*g,t[2]=-p*g,t[6]=S*v+M,t[10]=x-w*v}else if(e.order==="XZY"){const x=u*f,S=u*p,M=d*f,w=d*p;t[0]=f*g,t[4]=-v,t[8]=p*g,t[1]=x*v+w,t[5]=u*g,t[9]=S*v-M,t[2]=M*v-S,t[6]=d*g,t[10]=w*v+x}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Nx,e,Ux)}lookAt(e,t,r){const a=this.elements;return Gn.subVectors(e,t),Gn.lengthSq()===0&&(Gn.z=1),Gn.normalize(),yr.crossVectors(r,Gn),yr.lengthSq()===0&&(Math.abs(r.z)===1?Gn.x+=1e-4:Gn.z+=1e-4,Gn.normalize(),yr.crossVectors(r,Gn)),yr.normalize(),wl.crossVectors(Gn,yr),a[0]=yr.x,a[4]=wl.x,a[8]=Gn.x,a[1]=yr.y,a[5]=wl.y,a[9]=Gn.y,a[2]=yr.z,a[6]=wl.z,a[10]=Gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,u=r[0],d=r[4],f=r[8],p=r[12],g=r[1],v=r[5],x=r[9],S=r[13],M=r[2],w=r[6],y=r[10],_=r[14],I=r[3],L=r[7],C=r[11],W=r[15],O=a[0],U=a[4],k=a[8],P=a[12],R=a[1],H=a[5],re=a[9],K=a[13],le=a[2],de=a[6],oe=a[10],ue=a[14],z=a[3],ce=a[7],ee=a[11],F=a[15];return l[0]=u*O+d*R+f*le+p*z,l[4]=u*U+d*H+f*de+p*ce,l[8]=u*k+d*re+f*oe+p*ee,l[12]=u*P+d*K+f*ue+p*F,l[1]=g*O+v*R+x*le+S*z,l[5]=g*U+v*H+x*de+S*ce,l[9]=g*k+v*re+x*oe+S*ee,l[13]=g*P+v*K+x*ue+S*F,l[2]=M*O+w*R+y*le+_*z,l[6]=M*U+w*H+y*de+_*ce,l[10]=M*k+w*re+y*oe+_*ee,l[14]=M*P+w*K+y*ue+_*F,l[3]=I*O+L*R+C*le+W*z,l[7]=I*U+L*H+C*de+W*ce,l[11]=I*k+L*re+C*oe+W*ee,l[15]=I*P+L*K+C*ue+W*F,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[12],u=e[1],d=e[5],f=e[9],p=e[13],g=e[2],v=e[6],x=e[10],S=e[14],M=e[3],w=e[7],y=e[11],_=e[15];return M*(+l*f*v-a*p*v-l*d*x+r*p*x+a*d*S-r*f*S)+w*(+t*f*S-t*p*x+l*u*x-a*u*S+a*p*g-l*f*g)+y*(+t*p*v-t*d*S-l*u*v+r*u*S+l*d*g-r*p*g)+_*(-a*d*g-t*f*v+t*d*x+a*u*v-r*u*x+r*f*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],u=e[4],d=e[5],f=e[6],p=e[7],g=e[8],v=e[9],x=e[10],S=e[11],M=e[12],w=e[13],y=e[14],_=e[15],I=v*y*p-w*x*p+w*f*S-d*y*S-v*f*_+d*x*_,L=M*x*p-g*y*p-M*f*S+u*y*S+g*f*_-u*x*_,C=g*w*p-M*v*p+M*d*S-u*w*S-g*d*_+u*v*_,W=M*v*f-g*w*f-M*d*x+u*w*x+g*d*y-u*v*y,O=t*I+r*L+a*C+l*W;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/O;return e[0]=I*U,e[1]=(w*x*l-v*y*l-w*a*S+r*y*S+v*a*_-r*x*_)*U,e[2]=(d*y*l-w*f*l+w*a*p-r*y*p-d*a*_+r*f*_)*U,e[3]=(v*f*l-d*x*l-v*a*p+r*x*p+d*a*S-r*f*S)*U,e[4]=L*U,e[5]=(g*y*l-M*x*l+M*a*S-t*y*S-g*a*_+t*x*_)*U,e[6]=(M*f*l-u*y*l-M*a*p+t*y*p+u*a*_-t*f*_)*U,e[7]=(u*x*l-g*f*l+g*a*p-t*x*p-u*a*S+t*f*S)*U,e[8]=C*U,e[9]=(M*v*l-g*w*l-M*r*S+t*w*S+g*r*_-t*v*_)*U,e[10]=(u*w*l-M*d*l+M*r*p-t*w*p-u*r*_+t*d*_)*U,e[11]=(g*d*l-u*v*l-g*r*p+t*v*p+u*r*S-t*d*S)*U,e[12]=W*U,e[13]=(g*w*a-M*v*a+M*r*x-t*w*x-g*r*y+t*v*y)*U,e[14]=(M*d*a-u*w*a-M*r*f+t*w*f+u*r*y-t*d*y)*U,e[15]=(u*v*a-g*d*a+g*r*f-t*v*f-u*r*x+t*d*x)*U,this}scale(e){const t=this.elements,r=e.x,a=e.y,l=e.z;return t[0]*=r,t[4]*=a,t[8]*=l,t[1]*=r,t[5]*=a,t[9]*=l,t[2]*=r,t[6]*=a,t[10]*=l,t[3]*=r,t[7]*=a,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),l=1-r,u=e.x,d=e.y,f=e.z,p=l*u,g=l*d;return this.set(p*u+r,p*d-a*f,p*f+a*d,0,p*d+a*f,g*d+r,g*f-a*u,0,p*f-a*d,g*f+a*u,l*f*f+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,l,u){return this.set(1,r,l,0,e,1,u,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,l=t._x,u=t._y,d=t._z,f=t._w,p=l+l,g=u+u,v=d+d,x=l*p,S=l*g,M=l*v,w=u*g,y=u*v,_=d*v,I=f*p,L=f*g,C=f*v,W=r.x,O=r.y,U=r.z;return a[0]=(1-(w+_))*W,a[1]=(S+C)*W,a[2]=(M-L)*W,a[3]=0,a[4]=(S-C)*O,a[5]=(1-(x+_))*O,a[6]=(y+I)*O,a[7]=0,a[8]=(M+L)*U,a[9]=(y-I)*U,a[10]=(1-(x+w))*U,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;let l=Ns.set(a[0],a[1],a[2]).length();const u=Ns.set(a[4],a[5],a[6]).length(),d=Ns.set(a[8],a[9],a[10]).length();this.determinant()<0&&(l=-l),e.x=a[12],e.y=a[13],e.z=a[14],fi.copy(this);const p=1/l,g=1/u,v=1/d;return fi.elements[0]*=p,fi.elements[1]*=p,fi.elements[2]*=p,fi.elements[4]*=g,fi.elements[5]*=g,fi.elements[6]*=g,fi.elements[8]*=v,fi.elements[9]*=v,fi.elements[10]*=v,t.setFromRotationMatrix(fi),r.x=l,r.y=u,r.z=d,this}makePerspective(e,t,r,a,l,u,d=qi){const f=this.elements,p=2*l/(t-e),g=2*l/(r-a),v=(t+e)/(t-e),x=(r+a)/(r-a);let S,M;if(d===qi)S=-(u+l)/(u-l),M=-2*u*l/(u-l);else if(d===Jl)S=-u/(u-l),M=-u*l/(u-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return f[0]=p,f[4]=0,f[8]=v,f[12]=0,f[1]=0,f[5]=g,f[9]=x,f[13]=0,f[2]=0,f[6]=0,f[10]=S,f[14]=M,f[3]=0,f[7]=0,f[11]=-1,f[15]=0,this}makeOrthographic(e,t,r,a,l,u,d=qi){const f=this.elements,p=1/(t-e),g=1/(r-a),v=1/(u-l),x=(t+e)*p,S=(r+a)*g;let M,w;if(d===qi)M=(u+l)*v,w=-2*v;else if(d===Jl)M=l*v,w=-1*v;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return f[0]=2*p,f[4]=0,f[8]=0,f[12]=-x,f[1]=0,f[5]=2*g,f[9]=0,f[13]=-S,f[2]=0,f[6]=0,f[10]=w,f[14]=-M,f[3]=0,f[7]=0,f[11]=0,f[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Ns=new j,fi=new xt,Nx=new j(0,0,0),Ux=new j(1,1,1),yr=new j,wl=new j,Gn=new j,bm=new xt,Pm=new Ci;class vi{constructor(e=0,t=0,r=0,a=vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,l=a[0],u=a[4],d=a[8],f=a[1],p=a[5],g=a[9],v=a[2],x=a[6],S=a[10];switch(t){case"XYZ":this._y=Math.asin(Rn(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,S),this._z=Math.atan2(-u,l)):(this._x=Math.atan2(x,p),this._z=0);break;case"YXZ":this._x=Math.asin(-Rn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,S),this._z=Math.atan2(f,p)):(this._y=Math.atan2(-v,l),this._z=0);break;case"ZXY":this._x=Math.asin(Rn(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-v,S),this._z=Math.atan2(-u,p)):(this._y=0,this._z=Math.atan2(f,l));break;case"ZYX":this._y=Math.asin(-Rn(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(f,l)):(this._x=0,this._z=Math.atan2(-u,p));break;case"YZX":this._z=Math.asin(Rn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-v,l)):(this._x=0,this._y=Math.atan2(d,S));break;case"XZY":this._z=Math.asin(-Rn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(x,p),this._y=Math.atan2(d,l)):(this._x=Math.atan2(-g,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return bm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bm,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pm.setFromEuler(this),this.setFromQuaternion(Pm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vi.DEFAULT_ORDER="XYZ";class Ah{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Fx=0;const Lm=new j,Us=new Ci,Vi=new xt,Tl=new j,Yo=new j,Ox=new j,kx=new Ci,Dm=new j(1,0,0),Im=new j(0,1,0),Nm=new j(0,0,1),Um={type:"added"},Bx={type:"removed"},Fs={type:"childadded",child:null},nd={type:"childremoved",child:null};class Kt extends lo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Fx++}),this.uuid=co(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Kt.DEFAULT_UP.clone();const e=new j,t=new vi,r=new Ci,a=new j(1,1,1);function l(){r.setFromEuler(t,!1)}function u(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(u),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new xt},normalMatrix:{value:new ut}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ah,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.multiply(Us),this}rotateOnWorldAxis(e,t){return Us.setFromAxisAngle(e,t),this.quaternion.premultiply(Us),this}rotateX(e){return this.rotateOnAxis(Dm,e)}rotateY(e){return this.rotateOnAxis(Im,e)}rotateZ(e){return this.rotateOnAxis(Nm,e)}translateOnAxis(e,t){return Lm.copy(e).applyQuaternion(this.quaternion),this.position.add(Lm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Dm,e)}translateY(e){return this.translateOnAxis(Im,e)}translateZ(e){return this.translateOnAxis(Nm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Tl.copy(e):Tl.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),Yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vi.lookAt(Yo,Tl,this.up):Vi.lookAt(Tl,Yo,this.up),this.quaternion.setFromRotationMatrix(Vi),a&&(Vi.extractRotation(a.matrixWorld),Us.setFromRotationMatrix(Vi),this.quaternion.premultiply(Us.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Um),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Bx),nd.child=e,this.dispatchEvent(nd),nd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Um),Fs.child=e,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const u=this.children[r].getObjectByProperty(e,t);if(u!==void 0)return u}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,e,Ox),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yo,kx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const a=this.children;for(let l=0,u=a.length;l<u;l++)a[l].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function l(d,f){return d[f.uuid]===void 0&&(d[f.uuid]=f.toJSON(e)),f.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const f=d.shapes;if(Array.isArray(f))for(let p=0,g=f.length;p<g;p++){const v=f[p];l(e.shapes,v)}else l(e.shapes,f)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let f=0,p=this.material.length;f<p;f++)d.push(l(e.materials,this.material[f]));a.material=d}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let d=0;d<this.children.length;d++)a.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let d=0;d<this.animations.length;d++){const f=this.animations[d];a.animations.push(l(e.animations,f))}}if(t){const d=u(e.geometries),f=u(e.materials),p=u(e.textures),g=u(e.images),v=u(e.shapes),x=u(e.skeletons),S=u(e.animations),M=u(e.nodes);d.length>0&&(r.geometries=d),f.length>0&&(r.materials=f),p.length>0&&(r.textures=p),g.length>0&&(r.images=g),v.length>0&&(r.shapes=v),x.length>0&&(r.skeletons=x),S.length>0&&(r.animations=S),M.length>0&&(r.nodes=M)}return r.object=a,r;function u(d){const f=[];for(const p in d){const g=d[p];delete g.metadata,f.push(g)}return f}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}Kt.DEFAULT_UP=new j(0,1,0);Kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pi=new j,Gi=new j,id=new j,Wi=new j,Os=new j,ks=new j,Fm=new j,rd=new j,sd=new j,od=new j,ad=new Xt,ld=new Xt,cd=new Xt;class ii{constructor(e=new j,t=new j,r=new j){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),pi.subVectors(e,t),a.cross(pi);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,t,r,a,l){pi.subVectors(a,t),Gi.subVectors(r,t),id.subVectors(e,t);const u=pi.dot(pi),d=pi.dot(Gi),f=pi.dot(id),p=Gi.dot(Gi),g=Gi.dot(id),v=u*p-d*d;if(v===0)return l.set(0,0,0),null;const x=1/v,S=(p*f-d*g)*x,M=(u*g-d*f)*x;return l.set(1-S-M,M,S)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,Wi)===null?!1:Wi.x>=0&&Wi.y>=0&&Wi.x+Wi.y<=1}static getInterpolation(e,t,r,a,l,u,d,f){return this.getBarycoord(e,t,r,a,Wi)===null?(f.x=0,f.y=0,"z"in f&&(f.z=0),"w"in f&&(f.w=0),null):(f.setScalar(0),f.addScaledVector(l,Wi.x),f.addScaledVector(u,Wi.y),f.addScaledVector(d,Wi.z),f)}static getInterpolatedAttribute(e,t,r,a,l,u){return ad.setScalar(0),ld.setScalar(0),cd.setScalar(0),ad.fromBufferAttribute(e,t),ld.fromBufferAttribute(e,r),cd.fromBufferAttribute(e,a),u.setScalar(0),u.addScaledVector(ad,l.x),u.addScaledVector(ld,l.y),u.addScaledVector(cd,l.z),u}static isFrontFacing(e,t,r,a){return pi.subVectors(r,t),Gi.subVectors(e,t),pi.cross(Gi).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return pi.subVectors(this.c,this.b),Gi.subVectors(this.a,this.b),pi.cross(Gi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ii.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ii.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,l){return ii.getInterpolation(e,this.a,this.b,this.c,t,r,a,l)}containsPoint(e){return ii.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ii.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,l=this.c;let u,d;Os.subVectors(a,r),ks.subVectors(l,r),rd.subVectors(e,r);const f=Os.dot(rd),p=ks.dot(rd);if(f<=0&&p<=0)return t.copy(r);sd.subVectors(e,a);const g=Os.dot(sd),v=ks.dot(sd);if(g>=0&&v<=g)return t.copy(a);const x=f*v-g*p;if(x<=0&&f>=0&&g<=0)return u=f/(f-g),t.copy(r).addScaledVector(Os,u);od.subVectors(e,l);const S=Os.dot(od),M=ks.dot(od);if(M>=0&&S<=M)return t.copy(l);const w=S*p-f*M;if(w<=0&&p>=0&&M<=0)return d=p/(p-M),t.copy(r).addScaledVector(ks,d);const y=g*M-S*v;if(y<=0&&v-g>=0&&S-M>=0)return Fm.subVectors(l,a),d=(v-g)/(v-g+(S-M)),t.copy(a).addScaledVector(Fm,d);const _=1/(y+w+x);return u=w*_,d=x*_,t.copy(r).addScaledVector(Os,u).addScaledVector(ks,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const e0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sr={h:0,s:0,l:0},Al={h:0,s:0,l:0};function ud(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class vt{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.toWorkingColorSpace(this,t),this}setRGB(e,t,r,a=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=r,Tt.toWorkingColorSpace(this,a),this}setHSL(e,t,r,a=Tt.workingColorSpace){if(e=wh(e,1),t=Rn(t,0,1),r=Rn(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,u=2*r-l;this.r=ud(u,l,e+1/3),this.g=ud(u,l,e),this.b=ud(u,l,e-1/3)}return Tt.toWorkingColorSpace(this,a),this}setStyle(e,t=jn){function r(l){l!==void 0&&parseFloat(l)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const u=a[1],d=a[2];switch(u){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],u=l.length;if(u===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(u===6)return this.setHex(parseInt(l,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jn){const r=e0[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}copyLinearToSRGB(e){return this.r=$s(e.r),this.g=$s(e.g),this.b=$s(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jn){return Tt.fromWorkingColorSpace(yn.copy(this),e),Math.round(Rn(yn.r*255,0,255))*65536+Math.round(Rn(yn.g*255,0,255))*256+Math.round(Rn(yn.b*255,0,255))}getHexString(e=jn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.fromWorkingColorSpace(yn.copy(this),t);const r=yn.r,a=yn.g,l=yn.b,u=Math.max(r,a,l),d=Math.min(r,a,l);let f,p;const g=(d+u)/2;if(d===u)f=0,p=0;else{const v=u-d;switch(p=g<=.5?v/(u+d):v/(2-u-d),u){case r:f=(a-l)/v+(a<l?6:0);break;case a:f=(l-r)/v+2;break;case l:f=(r-a)/v+4;break}f/=6}return e.h=f,e.s=p,e.l=g,e}getRGB(e,t=Tt.workingColorSpace){return Tt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=jn){Tt.fromWorkingColorSpace(yn.copy(this),e);const t=yn.r,r=yn.g,a=yn.b;return e!==jn?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(Sr),this.setHSL(Sr.h+e,Sr.s+t,Sr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Sr),e.getHSL(Al);const r=na(Sr.h,Al.h,t),a=na(Sr.s,Al.s,t),l=na(Sr.l,Al.l,t);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*a,this.g=l[1]*t+l[4]*r+l[7]*a,this.b=l[2]*t+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const yn=new vt;vt.NAMES=e0;let zx=0;class ho extends lo{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zx++}),this.uuid=co(),this.name="",this.blending=Xs,this.side=Ar,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Td,this.blendDst=Ad,this.blendEquation=Kr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new vt(0,0,0),this.blendAlpha=0,this.depthFunc=eo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_m,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Xs&&(r.blending=this.blending),this.side!==Ar&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Td&&(r.blendSrc=this.blendSrc),this.blendDst!==Ad&&(r.blendDst=this.blendDst),this.blendEquation!==Kr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==eo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_m&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const u=[];for(const d in l){const f=l[d];delete f.metadata,u.push(f)}return u}if(t){const l=a(e.textures),u=a(e.images);l.length>0&&(r.textures=l),u.length>0&&(r.images=u)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class oa extends ho{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=Og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const $t=new j,Rl=new Mt;class gi{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=xm,this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Rl.fromBufferAttribute(this,t),Rl.applyMatrix3(e),this.setXY(t,Rl.x,Rl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix3(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)$t.fromBufferAttribute(this,t),$t.applyMatrix4(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)$t.fromBufferAttribute(this,t),$t.applyNormalMatrix(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)$t.fromBufferAttribute(this,t),$t.transformDirection(e),this.setXYZ(t,$t.x,$t.y,$t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Ws(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Tn(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ws(t,this.array)),t}setX(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ws(t,this.array)),t}setY(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ws(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ws(t,this.array)),t}setW(e,t){return this.normalized&&(t=Tn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),r=Tn(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),r=Tn(r,this.array),a=Tn(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e*=this.itemSize,this.normalized&&(t=Tn(t,this.array),r=Tn(r,this.array),a=Tn(a,this.array),l=Tn(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xm&&(e.usage=this.usage),e}}class t0 extends gi{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class n0 extends gi{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Vt extends gi{constructor(e,t,r){super(new Float32Array(e),t,r)}}let Hx=0;const ni=new xt,dd=new Kt,Bs=new j,Wn=new rs,$o=new rs,cn=new j;class kn extends lo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hx++}),this.uuid=co(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zg(e)?n0:t0)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ut().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ni.makeRotationFromQuaternion(e),this.applyMatrix4(ni),this}rotateX(e){return ni.makeRotationX(e),this.applyMatrix4(ni),this}rotateY(e){return ni.makeRotationY(e),this.applyMatrix4(ni),this}rotateZ(e){return ni.makeRotationZ(e),this.applyMatrix4(ni),this}translate(e,t,r){return ni.makeTranslation(e,t,r),this.applyMatrix4(ni),this}scale(e,t,r){return ni.makeScale(e,t,r),this.applyMatrix4(ni),this}lookAt(e){return dd.lookAt(e),dd.updateMatrix(),this.applyMatrix4(dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const u=e[a];r.push(u.x,u.y,u.z||0)}this.setAttribute("position",new Vt(r,3))}else{for(let r=0,a=t.count;r<a;r++){const l=e[r];t.setXYZ(r,l.x,l.y,l.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];Wn.setFromBufferAttribute(l),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Wn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Wn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Wn.min),this.boundingBox.expandByPoint(Wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new uo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const r=this.boundingSphere.center;if(Wn.setFromBufferAttribute(e),t)for(let l=0,u=t.length;l<u;l++){const d=t[l];$o.setFromBufferAttribute(d),this.morphTargetsRelative?(cn.addVectors(Wn.min,$o.min),Wn.expandByPoint(cn),cn.addVectors(Wn.max,$o.max),Wn.expandByPoint(cn)):(Wn.expandByPoint($o.min),Wn.expandByPoint($o.max))}Wn.getCenter(r);let a=0;for(let l=0,u=e.count;l<u;l++)cn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(cn));if(t)for(let l=0,u=t.length;l<u;l++){const d=t[l],f=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)cn.fromBufferAttribute(d,p),f&&(Bs.fromBufferAttribute(e,p),cn.add(Bs)),a=Math.max(a,r.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,l=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gi(new Float32Array(4*r.count),4));const u=this.getAttribute("tangent"),d=[],f=[];for(let k=0;k<r.count;k++)d[k]=new j,f[k]=new j;const p=new j,g=new j,v=new j,x=new Mt,S=new Mt,M=new Mt,w=new j,y=new j;function _(k,P,R){p.fromBufferAttribute(r,k),g.fromBufferAttribute(r,P),v.fromBufferAttribute(r,R),x.fromBufferAttribute(l,k),S.fromBufferAttribute(l,P),M.fromBufferAttribute(l,R),g.sub(p),v.sub(p),S.sub(x),M.sub(x);const H=1/(S.x*M.y-M.x*S.y);isFinite(H)&&(w.copy(g).multiplyScalar(M.y).addScaledVector(v,-S.y).multiplyScalar(H),y.copy(v).multiplyScalar(S.x).addScaledVector(g,-M.x).multiplyScalar(H),d[k].add(w),d[P].add(w),d[R].add(w),f[k].add(y),f[P].add(y),f[R].add(y))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let k=0,P=I.length;k<P;++k){const R=I[k],H=R.start,re=R.count;for(let K=H,le=H+re;K<le;K+=3)_(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const L=new j,C=new j,W=new j,O=new j;function U(k){W.fromBufferAttribute(a,k),O.copy(W);const P=d[k];L.copy(P),L.sub(W.multiplyScalar(W.dot(P))).normalize(),C.crossVectors(O,P);const H=C.dot(f[k])<0?-1:1;u.setXYZW(k,L.x,L.y,L.z,H)}for(let k=0,P=I.length;k<P;++k){const R=I[k],H=R.start,re=R.count;for(let K=H,le=H+re;K<le;K+=3)U(e.getX(K+0)),U(e.getX(K+1)),U(e.getX(K+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new gi(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let x=0,S=r.count;x<S;x++)r.setXYZ(x,0,0,0);const a=new j,l=new j,u=new j,d=new j,f=new j,p=new j,g=new j,v=new j;if(e)for(let x=0,S=e.count;x<S;x+=3){const M=e.getX(x+0),w=e.getX(x+1),y=e.getX(x+2);a.fromBufferAttribute(t,M),l.fromBufferAttribute(t,w),u.fromBufferAttribute(t,y),g.subVectors(u,l),v.subVectors(a,l),g.cross(v),d.fromBufferAttribute(r,M),f.fromBufferAttribute(r,w),p.fromBufferAttribute(r,y),d.add(g),f.add(g),p.add(g),r.setXYZ(M,d.x,d.y,d.z),r.setXYZ(w,f.x,f.y,f.z),r.setXYZ(y,p.x,p.y,p.z)}else for(let x=0,S=t.count;x<S;x+=3)a.fromBufferAttribute(t,x+0),l.fromBufferAttribute(t,x+1),u.fromBufferAttribute(t,x+2),g.subVectors(u,l),v.subVectors(a,l),g.cross(v),r.setXYZ(x+0,g.x,g.y,g.z),r.setXYZ(x+1,g.x,g.y,g.z),r.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(d,f){const p=d.array,g=d.itemSize,v=d.normalized,x=new p.constructor(f.length*g);let S=0,M=0;for(let w=0,y=f.length;w<y;w++){d.isInterleavedBufferAttribute?S=f[w]*d.data.stride+d.offset:S=f[w]*g;for(let _=0;_<g;_++)x[M++]=p[S++]}return new gi(x,g,v)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new kn,r=this.index.array,a=this.attributes;for(const d in a){const f=a[d],p=e(f,r);t.setAttribute(d,p)}const l=this.morphAttributes;for(const d in l){const f=[],p=l[d];for(let g=0,v=p.length;g<v;g++){const x=p[g],S=e(x,r);f.push(S)}t.morphAttributes[d]=f}t.morphTargetsRelative=this.morphTargetsRelative;const u=this.groups;for(let d=0,f=u.length;d<f;d++){const p=u[d];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const f=this.parameters;for(const p in f)f[p]!==void 0&&(e[p]=f[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const f in r){const p=r[f];e.data.attributes[f]=p.toJSON(e.data)}const a={};let l=!1;for(const f in this.morphAttributes){const p=this.morphAttributes[f],g=[];for(let v=0,x=p.length;v<x;v++){const S=p[v];g.push(S.toJSON(e.data))}g.length>0&&(a[f]=g,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const u=this.groups;u.length>0&&(e.data.groups=JSON.parse(JSON.stringify(u)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const a=e.attributes;for(const p in a){const g=a[p];this.setAttribute(p,g.clone(t))}const l=e.morphAttributes;for(const p in l){const g=[],v=l[p];for(let x=0,S=v.length;x<S;x++)g.push(v[x].clone(t));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const u=e.groups;for(let p=0,g=u.length;p<g;p++){const v=u[p];this.addGroup(v.start,v.count,v.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const f=e.boundingSphere;return f!==null&&(this.boundingSphere=f.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Om=new xt,Wr=new Th,Cl=new uo,km=new j,bl=new j,Pl=new j,Ll=new j,hd=new j,Dl=new j,Bm=new j,Il=new j;class zt extends Kt{constructor(e=new kn,t=new oa){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const d=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,u=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const d=this.morphTargetInfluences;if(l&&d){Dl.set(0,0,0);for(let f=0,p=l.length;f<p;f++){const g=d[f],v=l[f];g!==0&&(hd.fromBufferAttribute(v,e),u?Dl.addScaledVector(hd,g):Dl.addScaledVector(hd.sub(t),g))}t.add(Dl)}return t}raycast(e,t){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Cl.copy(r.boundingSphere),Cl.applyMatrix4(l),Wr.copy(e.ray).recast(e.near),!(Cl.containsPoint(Wr.origin)===!1&&(Wr.intersectSphere(Cl,km)===null||Wr.origin.distanceToSquared(km)>(e.far-e.near)**2))&&(Om.copy(l).invert(),Wr.copy(e.ray).applyMatrix4(Om),!(r.boundingBox!==null&&Wr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,Wr)))}_computeIntersections(e,t,r){let a;const l=this.geometry,u=this.material,d=l.index,f=l.attributes.position,p=l.attributes.uv,g=l.attributes.uv1,v=l.attributes.normal,x=l.groups,S=l.drawRange;if(d!==null)if(Array.isArray(u))for(let M=0,w=x.length;M<w;M++){const y=x[M],_=u[y.materialIndex],I=Math.max(y.start,S.start),L=Math.min(d.count,Math.min(y.start+y.count,S.start+S.count));for(let C=I,W=L;C<W;C+=3){const O=d.getX(C),U=d.getX(C+1),k=d.getX(C+2);a=Nl(this,_,e,r,p,g,v,O,U,k),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const M=Math.max(0,S.start),w=Math.min(d.count,S.start+S.count);for(let y=M,_=w;y<_;y+=3){const I=d.getX(y),L=d.getX(y+1),C=d.getX(y+2);a=Nl(this,u,e,r,p,g,v,I,L,C),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}else if(f!==void 0)if(Array.isArray(u))for(let M=0,w=x.length;M<w;M++){const y=x[M],_=u[y.materialIndex],I=Math.max(y.start,S.start),L=Math.min(f.count,Math.min(y.start+y.count,S.start+S.count));for(let C=I,W=L;C<W;C+=3){const O=C,U=C+1,k=C+2;a=Nl(this,_,e,r,p,g,v,O,U,k),a&&(a.faceIndex=Math.floor(C/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const M=Math.max(0,S.start),w=Math.min(f.count,S.start+S.count);for(let y=M,_=w;y<_;y+=3){const I=y,L=y+1,C=y+2;a=Nl(this,u,e,r,p,g,v,I,L,C),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}}}function Vx(s,e,t,r,a,l,u,d){let f;if(e.side===On?f=r.intersectTriangle(u,l,a,!0,d):f=r.intersectTriangle(a,l,u,e.side===Ar,d),f===null)return null;Il.copy(d),Il.applyMatrix4(s.matrixWorld);const p=t.ray.origin.distanceTo(Il);return p<t.near||p>t.far?null:{distance:p,point:Il.clone(),object:s}}function Nl(s,e,t,r,a,l,u,d,f,p){s.getVertexPosition(d,bl),s.getVertexPosition(f,Pl),s.getVertexPosition(p,Ll);const g=Vx(s,e,t,r,bl,Pl,Ll,Bm);if(g){const v=new j;ii.getBarycoord(Bm,bl,Pl,Ll,v),a&&(g.uv=ii.getInterpolatedAttribute(a,d,f,p,v,new Mt)),l&&(g.uv1=ii.getInterpolatedAttribute(l,d,f,p,v,new Mt)),u&&(g.normal=ii.getInterpolatedAttribute(u,d,f,p,v,new j),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const x={a:d,b:f,c:p,normal:new j,materialIndex:0};ii.getNormal(bl,Pl,Ll,x.normal),g.face=x,g.barycoord=v}return g}class Bt extends kn{constructor(e=1,t=1,r=1,a=1,l=1,u=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:l,depthSegments:u};const d=this;a=Math.floor(a),l=Math.floor(l),u=Math.floor(u);const f=[],p=[],g=[],v=[];let x=0,S=0;M("z","y","x",-1,-1,r,t,e,u,l,0),M("z","y","x",1,-1,r,t,-e,u,l,1),M("x","z","y",1,1,e,r,t,a,u,2),M("x","z","y",1,-1,e,r,-t,a,u,3),M("x","y","z",1,-1,e,t,r,a,l,4),M("x","y","z",-1,-1,e,t,-r,a,l,5),this.setIndex(f),this.setAttribute("position",new Vt(p,3)),this.setAttribute("normal",new Vt(g,3)),this.setAttribute("uv",new Vt(v,2));function M(w,y,_,I,L,C,W,O,U,k,P){const R=C/U,H=W/k,re=C/2,K=W/2,le=O/2,de=U+1,oe=k+1;let ue=0,z=0;const ce=new j;for(let ee=0;ee<oe;ee++){const F=ee*H-K;for(let se=0;se<de;se++){const Ne=se*R-re;ce[w]=Ne*I,ce[y]=F*L,ce[_]=le,p.push(ce.x,ce.y,ce.z),ce[w]=0,ce[y]=0,ce[_]=O>0?1:-1,g.push(ce.x,ce.y,ce.z),v.push(se/U),v.push(1-ee/k),ue+=1}}for(let ee=0;ee<k;ee++)for(let F=0;F<U;F++){const se=x+F+de*ee,Ne=x+F+de*(ee+1),Q=x+(F+1)+de*(ee+1),he=x+(F+1)+de*ee;f.push(se,Ne,he),f.push(Ne,Q,he),z+=6}d.addGroup(S,z,P),S+=z,x+=ue}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function oo(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const a=s[t][r];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone():Array.isArray(a)?e[t][r]=a.slice():e[t][r]=a}}return e}function An(s){const e={};for(let t=0;t<s.length;t++){const r=oo(s[t]);for(const a in r)e[a]=r[a]}return e}function Gx(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function i0(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}const Wx={clone:oo,merge:An};var jx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rr extends ho{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jx,this.fragmentShader=Xx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oo(e.uniforms),this.uniformsGroups=Gx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const u=this.uniforms[a].value;u&&u.isTexture?t.uniforms[a]={type:"t",value:u.toJSON(e).uuid}:u&&u.isColor?t.uniforms[a]={type:"c",value:u.getHex()}:u&&u.isVector2?t.uniforms[a]={type:"v2",value:u.toArray()}:u&&u.isVector3?t.uniforms[a]={type:"v3",value:u.toArray()}:u&&u.isVector4?t.uniforms[a]={type:"v4",value:u.toArray()}:u&&u.isMatrix3?t.uniforms[a]={type:"m3",value:u.toArray()}:u&&u.isMatrix4?t.uniforms[a]={type:"m4",value:u.toArray()}:t.uniforms[a]={value:u}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class r0 extends Kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=qi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mr=new j,zm=new Mt,Hm=new Mt;class Xn extends r0{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=so*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ys*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return so*2*Math.atan(Math.tan(Ys*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Mr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Mr.x,Mr.y).multiplyScalar(-e/Mr.z),Mr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Mr.x,Mr.y).multiplyScalar(-e/Mr.z)}getViewSize(e,t){return this.getViewBounds(e,zm,Hm),t.subVectors(Hm,zm)}setViewOffset(e,t,r,a,l,u){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ys*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,l=-.5*a;const u=this.view;if(this.view!==null&&this.view.enabled){const f=u.fullWidth,p=u.fullHeight;l+=u.offsetX*a/f,t-=u.offsetY*r/p,a*=u.width/f,r*=u.height/p}const d=this.filmOffset;d!==0&&(l+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const zs=-90,Hs=1;class qx extends Kt{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Xn(zs,Hs,e,t);a.layers=this.layers,this.add(a);const l=new Xn(zs,Hs,e,t);l.layers=this.layers,this.add(l);const u=new Xn(zs,Hs,e,t);u.layers=this.layers,this.add(u);const d=new Xn(zs,Hs,e,t);d.layers=this.layers,this.add(d);const f=new Xn(zs,Hs,e,t);f.layers=this.layers,this.add(f);const p=new Xn(zs,Hs,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,l,u,d,f]=t;for(const p of t)this.remove(p);if(e===qi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),u.up.set(0,0,1),u.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),f.up.set(0,1,0),f.lookAt(0,0,-1);else if(e===Jl)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),u.up.set(0,0,-1),u.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),f.up.set(0,-1,0),f.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,u,d,f,p,g]=this.children,v=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const w=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,a),e.render(t,l),e.setRenderTarget(r,1,a),e.render(t,u),e.setRenderTarget(r,2,a),e.render(t,d),e.setRenderTarget(r,3,a),e.render(t,f),e.setRenderTarget(r,4,a),e.render(t,p),r.texture.generateMipmaps=w,e.setRenderTarget(r,5,a),e.render(t,g),e.setRenderTarget(v,x,S),e.xr.enabled=M,r.texture.needsPMREMUpdate=!0}}class s0 extends Cn{constructor(e,t,r,a,l,u,d,f,p,g){e=e!==void 0?e:[],t=t!==void 0?t:to,super(e,t,r,a,l,u,d,f,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Yx extends ns{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new s0(a,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ai}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Bt(5,5,5),l=new Rr({name:"CubemapFromEquirect",uniforms:oo(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:On,blending:wr});l.uniforms.tEquirect.value=t;const u=new zt(a,l),d=t.minFilter;return t.minFilter===Jr&&(t.minFilter=Ai),new qx(1,10,this).update(e,u),t.minFilter=d,u.geometry.dispose(),u.material.dispose(),this}clear(e,t,r,a){const l=e.getRenderTarget();for(let u=0;u<6;u++)e.setRenderTarget(this,u),e.clear(t,r,a);e.setRenderTarget(l)}}const fd=new j,$x=new j,Kx=new ut;class Yr{constructor(e=new j(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=fd.subVectors(r,t).cross($x.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(fd),a=this.normal.dot(r);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const l=-(e.start.dot(this.normal)+this.constant)/a;return l<0||l>1?null:t.copy(e.start).addScaledVector(r,l)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||Kx.getNormalMatrix(e),a=this.coplanarPoint(fd).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jr=new uo,Ul=new j;class Rh{constructor(e=new Yr,t=new Yr,r=new Yr,a=new Yr,l=new Yr,u=new Yr){this.planes=[e,t,r,a,l,u]}set(e,t,r,a,l,u){const d=this.planes;return d[0].copy(e),d[1].copy(t),d[2].copy(r),d[3].copy(a),d[4].copy(l),d[5].copy(u),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=qi){const r=this.planes,a=e.elements,l=a[0],u=a[1],d=a[2],f=a[3],p=a[4],g=a[5],v=a[6],x=a[7],S=a[8],M=a[9],w=a[10],y=a[11],_=a[12],I=a[13],L=a[14],C=a[15];if(r[0].setComponents(f-l,x-p,y-S,C-_).normalize(),r[1].setComponents(f+l,x+p,y+S,C+_).normalize(),r[2].setComponents(f+u,x+g,y+M,C+I).normalize(),r[3].setComponents(f-u,x-g,y-M,C-I).normalize(),r[4].setComponents(f-d,x-v,y-w,C-L).normalize(),t===qi)r[5].setComponents(f+d,x+v,y+w,C+L).normalize();else if(t===Jl)r[5].setComponents(d,v,w,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),jr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),jr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(jr)}intersectsSprite(e){return jr.center.set(0,0,0),jr.radius=.7071067811865476,jr.applyMatrix4(e.matrixWorld),this.intersectsSphere(jr)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(Ul.x=a.normal.x>0?e.max.x:e.min.x,Ul.y=a.normal.y>0?e.max.y:e.min.y,Ul.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Ul)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function o0(){let s=null,e=!1,t=null,r=null;function a(l,u){t(l,u),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function Zx(s){const e=new WeakMap;function t(d,f){const p=d.array,g=d.usage,v=p.byteLength,x=s.createBuffer();s.bindBuffer(f,x),s.bufferData(f,p,g),d.onUploadCallback();let S;if(p instanceof Float32Array)S=s.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(p instanceof Int16Array)S=s.SHORT;else if(p instanceof Uint32Array)S=s.UNSIGNED_INT;else if(p instanceof Int32Array)S=s.INT;else if(p instanceof Int8Array)S=s.BYTE;else if(p instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:x,type:S,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:v}}function r(d,f,p){const g=f.array,v=f.updateRanges;if(s.bindBuffer(p,d),v.length===0)s.bufferSubData(p,0,g);else{v.sort((S,M)=>S.start-M.start);let x=0;for(let S=1;S<v.length;S++){const M=v[x],w=v[S];w.start<=M.start+M.count+1?M.count=Math.max(M.count,w.start+w.count-M.start):(++x,v[x]=w)}v.length=x+1;for(let S=0,M=v.length;S<M;S++){const w=v[S];s.bufferSubData(p,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}f.clearUpdateRanges()}f.onUploadCallback()}function a(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);const f=e.get(d);f&&(s.deleteBuffer(f.buffer),e.delete(d))}function u(d,f){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=e.get(d);(!g||g.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,t(d,f));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(p.buffer,d,f),p.version=d.version}}return{get:a,remove:l,update:u}}class ca extends kn{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const l=e/2,u=t/2,d=Math.floor(r),f=Math.floor(a),p=d+1,g=f+1,v=e/d,x=t/f,S=[],M=[],w=[],y=[];for(let _=0;_<g;_++){const I=_*x-u;for(let L=0;L<p;L++){const C=L*v-l;M.push(C,-I,0),w.push(0,0,1),y.push(L/d),y.push(1-_/f)}}for(let _=0;_<f;_++)for(let I=0;I<d;I++){const L=I+p*_,C=I+p*(_+1),W=I+1+p*(_+1),O=I+1+p*_;S.push(L,C,O),S.push(C,W,O)}this.setIndex(S),this.setAttribute("position",new Vt(M,3)),this.setAttribute("normal",new Vt(w,3)),this.setAttribute("uv",new Vt(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ca(e.width,e.height,e.widthSegments,e.heightSegments)}}var Qx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ey=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ty=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ny=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,iy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ry=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,sy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,oy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ay=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ly=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,cy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,uy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,dy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,py=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,my=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,gy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vy=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,_y=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,yy=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Sy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,My=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ey=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,wy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ty=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ay=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ry=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cy="gl_FragColor = linearToOutputTexel( gl_FragColor );",by=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Py=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ly=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Dy=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Iy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ny=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Uy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Oy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ky=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,By=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,zy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Wy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$y=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ky=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Zy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,eS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,oS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,aS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,uS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fS=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,pS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_S=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,yS=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,SS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,MS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ES=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,TS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,AS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,RS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,CS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,PS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,LS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,DS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,IS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,NS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,US=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,FS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,OS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,BS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,HS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,VS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,GS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,WS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,XS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,YS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$S=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,KS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ZS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,QS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eM=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,nM=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,rM=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sM=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,oM=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,aM=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,lM=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cM=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,uM=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,dM=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hM=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fM=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pM=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mM=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,gM=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vM=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_M=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xM=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yM=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SM=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,MM=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EM=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wM=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TM=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,AM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,RM=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CM=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bM=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,PM=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,dt={alphahash_fragment:Qx,alphahash_pars_fragment:Jx,alphamap_fragment:ey,alphamap_pars_fragment:ty,alphatest_fragment:ny,alphatest_pars_fragment:iy,aomap_fragment:ry,aomap_pars_fragment:sy,batching_pars_vertex:oy,batching_vertex:ay,begin_vertex:ly,beginnormal_vertex:cy,bsdfs:uy,iridescence_fragment:dy,bumpmap_pars_fragment:hy,clipping_planes_fragment:fy,clipping_planes_pars_fragment:py,clipping_planes_pars_vertex:my,clipping_planes_vertex:gy,color_fragment:vy,color_pars_fragment:_y,color_pars_vertex:xy,color_vertex:yy,common:Sy,cube_uv_reflection_fragment:My,defaultnormal_vertex:Ey,displacementmap_pars_vertex:wy,displacementmap_vertex:Ty,emissivemap_fragment:Ay,emissivemap_pars_fragment:Ry,colorspace_fragment:Cy,colorspace_pars_fragment:by,envmap_fragment:Py,envmap_common_pars_fragment:Ly,envmap_pars_fragment:Dy,envmap_pars_vertex:Iy,envmap_physical_pars_fragment:Wy,envmap_vertex:Ny,fog_vertex:Uy,fog_pars_vertex:Fy,fog_fragment:Oy,fog_pars_fragment:ky,gradientmap_pars_fragment:By,lightmap_pars_fragment:zy,lights_lambert_fragment:Hy,lights_lambert_pars_fragment:Vy,lights_pars_begin:Gy,lights_toon_fragment:jy,lights_toon_pars_fragment:Xy,lights_phong_fragment:qy,lights_phong_pars_fragment:Yy,lights_physical_fragment:$y,lights_physical_pars_fragment:Ky,lights_fragment_begin:Zy,lights_fragment_maps:Qy,lights_fragment_end:Jy,logdepthbuf_fragment:eS,logdepthbuf_pars_fragment:tS,logdepthbuf_pars_vertex:nS,logdepthbuf_vertex:iS,map_fragment:rS,map_pars_fragment:sS,map_particle_fragment:oS,map_particle_pars_fragment:aS,metalnessmap_fragment:lS,metalnessmap_pars_fragment:cS,morphinstance_vertex:uS,morphcolor_vertex:dS,morphnormal_vertex:hS,morphtarget_pars_vertex:fS,morphtarget_vertex:pS,normal_fragment_begin:mS,normal_fragment_maps:gS,normal_pars_fragment:vS,normal_pars_vertex:_S,normal_vertex:xS,normalmap_pars_fragment:yS,clearcoat_normal_fragment_begin:SS,clearcoat_normal_fragment_maps:MS,clearcoat_pars_fragment:ES,iridescence_pars_fragment:wS,opaque_fragment:TS,packing:AS,premultiplied_alpha_fragment:RS,project_vertex:CS,dithering_fragment:bS,dithering_pars_fragment:PS,roughnessmap_fragment:LS,roughnessmap_pars_fragment:DS,shadowmap_pars_fragment:IS,shadowmap_pars_vertex:NS,shadowmap_vertex:US,shadowmask_pars_fragment:FS,skinbase_vertex:OS,skinning_pars_vertex:kS,skinning_vertex:BS,skinnormal_vertex:zS,specularmap_fragment:HS,specularmap_pars_fragment:VS,tonemapping_fragment:GS,tonemapping_pars_fragment:WS,transmission_fragment:jS,transmission_pars_fragment:XS,uv_pars_fragment:qS,uv_pars_vertex:YS,uv_vertex:$S,worldpos_vertex:KS,background_vert:ZS,background_frag:QS,backgroundCube_vert:JS,backgroundCube_frag:eM,cube_vert:tM,cube_frag:nM,depth_vert:iM,depth_frag:rM,distanceRGBA_vert:sM,distanceRGBA_frag:oM,equirect_vert:aM,equirect_frag:lM,linedashed_vert:cM,linedashed_frag:uM,meshbasic_vert:dM,meshbasic_frag:hM,meshlambert_vert:fM,meshlambert_frag:pM,meshmatcap_vert:mM,meshmatcap_frag:gM,meshnormal_vert:vM,meshnormal_frag:_M,meshphong_vert:xM,meshphong_frag:yM,meshphysical_vert:SM,meshphysical_frag:MM,meshtoon_vert:EM,meshtoon_frag:wM,points_vert:TM,points_frag:AM,shadow_vert:RM,shadow_frag:CM,sprite_vert:bM,sprite_frag:PM},Pe={common:{diffuse:{value:new vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new vt(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},Ti={basic:{uniforms:An([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:dt.meshbasic_vert,fragmentShader:dt.meshbasic_frag},lambert:{uniforms:An([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new vt(0)}}]),vertexShader:dt.meshlambert_vert,fragmentShader:dt.meshlambert_frag},phong:{uniforms:An([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new vt(0)},specular:{value:new vt(1118481)},shininess:{value:30}}]),vertexShader:dt.meshphong_vert,fragmentShader:dt.meshphong_frag},standard:{uniforms:An([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag},toon:{uniforms:An([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new vt(0)}}]),vertexShader:dt.meshtoon_vert,fragmentShader:dt.meshtoon_frag},matcap:{uniforms:An([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:dt.meshmatcap_vert,fragmentShader:dt.meshmatcap_frag},points:{uniforms:An([Pe.points,Pe.fog]),vertexShader:dt.points_vert,fragmentShader:dt.points_frag},dashed:{uniforms:An([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:dt.linedashed_vert,fragmentShader:dt.linedashed_frag},depth:{uniforms:An([Pe.common,Pe.displacementmap]),vertexShader:dt.depth_vert,fragmentShader:dt.depth_frag},normal:{uniforms:An([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:dt.meshnormal_vert,fragmentShader:dt.meshnormal_frag},sprite:{uniforms:An([Pe.sprite,Pe.fog]),vertexShader:dt.sprite_vert,fragmentShader:dt.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:dt.background_vert,fragmentShader:dt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:dt.backgroundCube_vert,fragmentShader:dt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:dt.cube_vert,fragmentShader:dt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:dt.equirect_vert,fragmentShader:dt.equirect_frag},distanceRGBA:{uniforms:An([Pe.common,Pe.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:dt.distanceRGBA_vert,fragmentShader:dt.distanceRGBA_frag},shadow:{uniforms:An([Pe.lights,Pe.fog,{color:{value:new vt(0)},opacity:{value:1}}]),vertexShader:dt.shadow_vert,fragmentShader:dt.shadow_frag}};Ti.physical={uniforms:An([Ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new vt(0)},specularColor:{value:new vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:dt.meshphysical_vert,fragmentShader:dt.meshphysical_frag};const Fl={r:0,b:0,g:0},Xr=new vi,LM=new xt;function DM(s,e,t,r,a,l,u){const d=new vt(0);let f=l===!0?0:1,p,g,v=null,x=0,S=null;function M(I){let L=I.isScene===!0?I.background:null;return L&&L.isTexture&&(L=(I.backgroundBlurriness>0?t:e).get(L)),L}function w(I){let L=!1;const C=M(I);C===null?_(d,f):C&&C.isColor&&(_(C,1),L=!0);const W=s.xr.getEnvironmentBlendMode();W==="additive"?r.buffers.color.setClear(0,0,0,1,u):W==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,u),(s.autoClear||L)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(I,L){const C=M(L);C&&(C.isCubeTexture||C.mapping===oc)?(g===void 0&&(g=new zt(new Bt(1,1,1),new Rr({name:"BackgroundCubeMaterial",uniforms:oo(Ti.backgroundCube.uniforms),vertexShader:Ti.backgroundCube.vertexShader,fragmentShader:Ti.backgroundCube.fragmentShader,side:On,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(W,O,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(g)),Xr.copy(L.backgroundRotation),Xr.x*=-1,Xr.y*=-1,Xr.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Xr.y*=-1,Xr.z*=-1),g.material.uniforms.envMap.value=C,g.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(LM.makeRotationFromEuler(Xr)),g.material.toneMapped=Tt.getTransfer(C.colorSpace)!==It,(v!==C||x!==C.version||S!==s.toneMapping)&&(g.material.needsUpdate=!0,v=C,x=C.version,S=s.toneMapping),g.layers.enableAll(),I.unshift(g,g.geometry,g.material,0,0,null)):C&&C.isTexture&&(p===void 0&&(p=new zt(new ca(2,2),new Rr({name:"BackgroundMaterial",uniforms:oo(Ti.background.uniforms),vertexShader:Ti.background.vertexShader,fragmentShader:Ti.background.fragmentShader,side:Ar,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(p)),p.material.uniforms.t2D.value=C,p.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,p.material.toneMapped=Tt.getTransfer(C.colorSpace)!==It,C.matrixAutoUpdate===!0&&C.updateMatrix(),p.material.uniforms.uvTransform.value.copy(C.matrix),(v!==C||x!==C.version||S!==s.toneMapping)&&(p.material.needsUpdate=!0,v=C,x=C.version,S=s.toneMapping),p.layers.enableAll(),I.unshift(p,p.geometry,p.material,0,0,null))}function _(I,L){I.getRGB(Fl,i0(s)),r.buffers.color.setClear(Fl.r,Fl.g,Fl.b,L,u)}return{getClearColor:function(){return d},setClearColor:function(I,L=1){d.set(I),f=L,_(d,f)},getClearAlpha:function(){return f},setClearAlpha:function(I){f=I,_(d,f)},render:w,addToRenderList:y}}function IM(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=x(null);let l=a,u=!1;function d(R,H,re,K,le){let de=!1;const oe=v(K,re,H);l!==oe&&(l=oe,p(l.object)),de=S(R,K,re,le),de&&M(R,K,re,le),le!==null&&e.update(le,s.ELEMENT_ARRAY_BUFFER),(de||u)&&(u=!1,C(R,H,re,K),le!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(le).buffer))}function f(){return s.createVertexArray()}function p(R){return s.bindVertexArray(R)}function g(R){return s.deleteVertexArray(R)}function v(R,H,re){const K=re.wireframe===!0;let le=r[R.id];le===void 0&&(le={},r[R.id]=le);let de=le[H.id];de===void 0&&(de={},le[H.id]=de);let oe=de[K];return oe===void 0&&(oe=x(f()),de[K]=oe),oe}function x(R){const H=[],re=[],K=[];for(let le=0;le<t;le++)H[le]=0,re[le]=0,K[le]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:re,attributeDivisors:K,object:R,attributes:{},index:null}}function S(R,H,re,K){const le=l.attributes,de=H.attributes;let oe=0;const ue=re.getAttributes();for(const z in ue)if(ue[z].location>=0){const ee=le[z];let F=de[z];if(F===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(F=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(F=R.instanceColor)),ee===void 0||ee.attribute!==F||F&&ee.data!==F.data)return!0;oe++}return l.attributesNum!==oe||l.index!==K}function M(R,H,re,K){const le={},de=H.attributes;let oe=0;const ue=re.getAttributes();for(const z in ue)if(ue[z].location>=0){let ee=de[z];ee===void 0&&(z==="instanceMatrix"&&R.instanceMatrix&&(ee=R.instanceMatrix),z==="instanceColor"&&R.instanceColor&&(ee=R.instanceColor));const F={};F.attribute=ee,ee&&ee.data&&(F.data=ee.data),le[z]=F,oe++}l.attributes=le,l.attributesNum=oe,l.index=K}function w(){const R=l.newAttributes;for(let H=0,re=R.length;H<re;H++)R[H]=0}function y(R){_(R,0)}function _(R,H){const re=l.newAttributes,K=l.enabledAttributes,le=l.attributeDivisors;re[R]=1,K[R]===0&&(s.enableVertexAttribArray(R),K[R]=1),le[R]!==H&&(s.vertexAttribDivisor(R,H),le[R]=H)}function I(){const R=l.newAttributes,H=l.enabledAttributes;for(let re=0,K=H.length;re<K;re++)H[re]!==R[re]&&(s.disableVertexAttribArray(re),H[re]=0)}function L(R,H,re,K,le,de,oe){oe===!0?s.vertexAttribIPointer(R,H,re,le,de):s.vertexAttribPointer(R,H,re,K,le,de)}function C(R,H,re,K){w();const le=K.attributes,de=re.getAttributes(),oe=H.defaultAttributeValues;for(const ue in de){const z=de[ue];if(z.location>=0){let ce=le[ue];if(ce===void 0&&(ue==="instanceMatrix"&&R.instanceMatrix&&(ce=R.instanceMatrix),ue==="instanceColor"&&R.instanceColor&&(ce=R.instanceColor)),ce!==void 0){const ee=ce.normalized,F=ce.itemSize,se=e.get(ce);if(se===void 0)continue;const Ne=se.buffer,Q=se.type,he=se.bytesPerElement,Se=Q===s.INT||Q===s.UNSIGNED_INT||ce.gpuType===vh;if(ce.isInterleavedBufferAttribute){const ve=ce.data,Re=ve.stride,Ue=ce.offset;if(ve.isInstancedInterleavedBuffer){for(let Ke=0;Ke<z.locationSize;Ke++)_(z.location+Ke,ve.meshPerAttribute);R.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Ke=0;Ke<z.locationSize;Ke++)y(z.location+Ke);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let Ke=0;Ke<z.locationSize;Ke++)L(z.location+Ke,F/z.locationSize,Q,ee,Re*he,(Ue+F/z.locationSize*Ke)*he,Se)}else{if(ce.isInstancedBufferAttribute){for(let ve=0;ve<z.locationSize;ve++)_(z.location+ve,ce.meshPerAttribute);R.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ve=0;ve<z.locationSize;ve++)y(z.location+ve);s.bindBuffer(s.ARRAY_BUFFER,Ne);for(let ve=0;ve<z.locationSize;ve++)L(z.location+ve,F/z.locationSize,Q,ee,F*he,F/z.locationSize*ve*he,Se)}}else if(oe!==void 0){const ee=oe[ue];if(ee!==void 0)switch(ee.length){case 2:s.vertexAttrib2fv(z.location,ee);break;case 3:s.vertexAttrib3fv(z.location,ee);break;case 4:s.vertexAttrib4fv(z.location,ee);break;default:s.vertexAttrib1fv(z.location,ee)}}}}I()}function W(){k();for(const R in r){const H=r[R];for(const re in H){const K=H[re];for(const le in K)g(K[le].object),delete K[le];delete H[re]}delete r[R]}}function O(R){if(r[R.id]===void 0)return;const H=r[R.id];for(const re in H){const K=H[re];for(const le in K)g(K[le].object),delete K[le];delete H[re]}delete r[R.id]}function U(R){for(const H in r){const re=r[H];if(re[R.id]===void 0)continue;const K=re[R.id];for(const le in K)g(K[le].object),delete K[le];delete re[R.id]}}function k(){P(),u=!0,l!==a&&(l=a,p(l.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:d,reset:k,resetDefaultState:P,dispose:W,releaseStatesOfGeometry:O,releaseStatesOfProgram:U,initAttributes:w,enableAttribute:y,disableUnusedAttributes:I}}function NM(s,e,t){let r;function a(p){r=p}function l(p,g){s.drawArrays(r,p,g),t.update(g,r,1)}function u(p,g,v){v!==0&&(s.drawArraysInstanced(r,p,g,v),t.update(g,r,v))}function d(p,g,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,g,0,v);let S=0;for(let M=0;M<v;M++)S+=g[M];t.update(S,r,1)}function f(p,g,v,x){if(v===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let M=0;M<p.length;M++)u(p[M],g[M],x[M]);else{S.multiDrawArraysInstancedWEBGL(r,p,0,g,0,x,0,v);let M=0;for(let w=0;w<v;w++)M+=g[w]*x[w];t.update(M,r,1)}}this.setMode=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=d,this.renderMultiDrawInstances=f}function UM(s,e,t,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function u(U){return!(U!==mi&&r.convert(U)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(U){const k=U===la&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==$i&&r.convert(U)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Ri&&!k)}function f(U){if(U==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=t.precision!==void 0?t.precision:"highp";const g=f(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const v=t.logarithmicDepthBuffer===!0,x=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),M=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),I=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),L=s.getParameter(s.MAX_VARYING_VECTORS),C=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),W=M>0,O=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:f,textureFormatReadable:u,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:v,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:M,maxTextureSize:w,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:I,maxVaryings:L,maxFragmentUniforms:C,vertexTextures:W,maxSamples:O}}function FM(s){const e=this;let t=null,r=0,a=!1,l=!1;const u=new Yr,d=new ut,f={value:null,needsUpdate:!1};this.uniform=f,this.numPlanes=0,this.numIntersection=0,this.init=function(v,x){const S=v.length!==0||x||r!==0||a;return a=x,r=v.length,S},this.beginShadows=function(){l=!0,g(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(v,x){t=g(v,x,0)},this.setState=function(v,x,S){const M=v.clippingPlanes,w=v.clipIntersection,y=v.clipShadows,_=s.get(v);if(!a||M===null||M.length===0||l&&!y)l?g(null):p();else{const I=l?0:r,L=I*4;let C=_.clippingState||null;f.value=C,C=g(M,x,L,S);for(let W=0;W!==L;++W)C[W]=t[W];_.clippingState=C,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=I}};function p(){f.value!==t&&(f.value=t,f.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(v,x,S,M){const w=v!==null?v.length:0;let y=null;if(w!==0){if(y=f.value,M!==!0||y===null){const _=S+w*4,I=x.matrixWorldInverse;d.getNormalMatrix(I),(y===null||y.length<_)&&(y=new Float32Array(_));for(let L=0,C=S;L!==w;++L,C+=4)u.copy(v[L]).applyMatrix4(I,d),u.normal.toArray(y,C),y[C+3]=u.constant}f.value=y,f.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,y}}function OM(s){let e=new WeakMap;function t(u,d){return d===Nd?u.mapping=to:d===Ud&&(u.mapping=no),u}function r(u){if(u&&u.isTexture){const d=u.mapping;if(d===Nd||d===Ud)if(e.has(u)){const f=e.get(u).texture;return t(f,u.mapping)}else{const f=u.image;if(f&&f.height>0){const p=new Yx(f.height);return p.fromEquirectangularTexture(s,u),e.set(u,p),u.addEventListener("dispose",a),t(p.texture,u.mapping)}else return null}}return u}function a(u){const d=u.target;d.removeEventListener("dispose",a);const f=e.get(d);f!==void 0&&(e.delete(d),f.dispose())}function l(){e=new WeakMap}return{get:r,dispose:l}}class a0 extends r0{constructor(e=-1,t=1,r=1,a=-1,l=.1,u=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=l,this.far=u,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,l,u){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=u,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,u=r+e,d=a+t,f=a-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=p*this.view.offsetX,u=l+p*this.view.width,d-=g*this.view.offsetY,f=d-g*this.view.height}this.projectionMatrix.makeOrthographic(l,u,d,f,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const js=4,Vm=[.125,.215,.35,.446,.526,.582],Zr=20,pd=new a0,Gm=new vt;let md=null,gd=0,vd=0,_d=!1;const $r=(1+Math.sqrt(5))/2,Vs=1/$r,Wm=[new j(-$r,Vs,0),new j($r,Vs,0),new j(-Vs,0,$r),new j(Vs,0,$r),new j(0,$r,-Vs),new j(0,$r,Vs),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class jm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,a=100){md=this._renderer.getRenderTarget(),gd=this._renderer.getActiveCubeFace(),vd=this._renderer.getActiveMipmapLevel(),_d=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,r,a,l),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ym(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(md,gd,vd),this._renderer.xr.enabled=_d,e.scissorTest=!1,Ol(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===to||e.mapping===no?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),md=this._renderer.getRenderTarget(),gd=this._renderer.getActiveCubeFace(),vd=this._renderer.getActiveMipmapLevel(),_d=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Ai,minFilter:Ai,generateMipmaps:!1,type:la,format:mi,colorSpace:ao,depthBuffer:!1},a=Xm(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xm(e,t,r);const{_lodMax:l}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=kM(l)),this._blurMaterial=BM(l,e,t)}return a}_compileMaterial(e){const t=new zt(this._lodPlanes[0],e);this._renderer.compile(t,pd)}_sceneToCubeUV(e,t,r,a){const d=new Xn(90,1,t,r),f=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,v=g.autoClear,x=g.toneMapping;g.getClearColor(Gm),g.toneMapping=Tr,g.autoClear=!1;const S=new oa({name:"PMREM.Background",side:On,depthWrite:!1,depthTest:!1}),M=new zt(new Bt,S);let w=!1;const y=e.background;y?y.isColor&&(S.color.copy(y),e.background=null,w=!0):(S.color.copy(Gm),w=!0);for(let _=0;_<6;_++){const I=_%3;I===0?(d.up.set(0,f[_],0),d.lookAt(p[_],0,0)):I===1?(d.up.set(0,0,f[_]),d.lookAt(0,p[_],0)):(d.up.set(0,f[_],0),d.lookAt(0,0,p[_]));const L=this._cubeSize;Ol(a,I*L,_>2?L:0,L,L),g.setRenderTarget(a),w&&g.render(M,d),g.render(e,d)}M.geometry.dispose(),M.material.dispose(),g.toneMapping=x,g.autoClear=v,e.background=y}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===to||e.mapping===no;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ym()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qm());const l=a?this._cubemapMaterial:this._equirectMaterial,u=new zt(this._lodPlanes[0],l),d=l.uniforms;d.envMap.value=e;const f=this._cubeSize;Ol(t,0,0,3*f,2*f),r.setRenderTarget(t),r.render(u,pd)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodPlanes.length;for(let l=1;l<a;l++){const u=Math.sqrt(this._sigmas[l]*this._sigmas[l]-this._sigmas[l-1]*this._sigmas[l-1]),d=Wm[(a-l-1)%Wm.length];this._blur(e,l-1,l,u,d)}t.autoClear=r}_blur(e,t,r,a,l){const u=this._pingPongRenderTarget;this._halfBlur(e,u,t,r,a,"latitudinal",l),this._halfBlur(u,e,r,r,a,"longitudinal",l)}_halfBlur(e,t,r,a,l,u,d){const f=this._renderer,p=this._blurMaterial;u!=="latitudinal"&&u!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,v=new zt(this._lodPlanes[a],p),x=p.uniforms,S=this._sizeLods[r]-1,M=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*Zr-1),w=l/M,y=isFinite(l)?1+Math.floor(g*w):Zr;y>Zr&&console.warn(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${Zr}`);const _=[];let I=0;for(let U=0;U<Zr;++U){const k=U/w,P=Math.exp(-k*k/2);_.push(P),U===0?I+=P:U<y&&(I+=2*P)}for(let U=0;U<_.length;U++)_[U]=_[U]/I;x.envMap.value=e.texture,x.samples.value=y,x.weights.value=_,x.latitudinal.value=u==="latitudinal",d&&(x.poleAxis.value=d);const{_lodMax:L}=this;x.dTheta.value=M,x.mipInt.value=L-r;const C=this._sizeLods[a],W=3*C*(a>L-js?a-L+js:0),O=4*(this._cubeSize-C);Ol(t,W,O,3*C,2*C),f.setRenderTarget(t),f.render(v,pd)}}function kM(s){const e=[],t=[],r=[];let a=s;const l=s-js+1+Vm.length;for(let u=0;u<l;u++){const d=Math.pow(2,a);t.push(d);let f=1/d;u>s-js?f=Vm[u-s+js-1]:u===0&&(f=0),r.push(f);const p=1/(d-2),g=-p,v=1+p,x=[g,g,v,g,v,v,g,g,v,v,g,v],S=6,M=6,w=3,y=2,_=1,I=new Float32Array(w*M*S),L=new Float32Array(y*M*S),C=new Float32Array(_*M*S);for(let O=0;O<S;O++){const U=O%3*2/3-1,k=O>2?0:-1,P=[U,k,0,U+2/3,k,0,U+2/3,k+1,0,U,k,0,U+2/3,k+1,0,U,k+1,0];I.set(P,w*M*O),L.set(x,y*M*O);const R=[O,O,O,O,O,O];C.set(R,_*M*O)}const W=new kn;W.setAttribute("position",new gi(I,w)),W.setAttribute("uv",new gi(L,y)),W.setAttribute("faceIndex",new gi(C,_)),e.push(W),a>js&&a--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Xm(s,e,t){const r=new ns(s,e,t);return r.texture.mapping=oc,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Ol(s,e,t,r,a){s.viewport.set(e,t,r,a),s.scissor.set(e,t,r,a)}function BM(s,e,t){const r=new Float32Array(Zr),a=new j(0,1,0);return new Rr({name:"SphericalGaussianBlur",defines:{n:Zr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function qm(){return new Rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Ym(){return new Rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ch(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wr,depthTest:!1,depthWrite:!1})}function Ch(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zM(s){let e=new WeakMap,t=null;function r(d){if(d&&d.isTexture){const f=d.mapping,p=f===Nd||f===Ud,g=f===to||f===no;if(p||g){let v=e.get(d);const x=v!==void 0?v.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==x)return t===null&&(t=new jm(s)),v=p?t.fromEquirectangular(d,v):t.fromCubemap(d,v),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),v.texture;if(v!==void 0)return v.texture;{const S=d.image;return p&&S&&S.height>0||g&&S&&a(S)?(t===null&&(t=new jm(s)),v=p?t.fromEquirectangular(d):t.fromCubemap(d),v.texture.pmremVersion=d.pmremVersion,e.set(d,v),d.addEventListener("dispose",l),v.texture):null}}}return d}function a(d){let f=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&f++;return f===p}function l(d){const f=d.target;f.removeEventListener("dispose",l);const p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function u(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:u}}function HM(s){const e={};function t(r){if(e[r]!==void 0)return e[r];let a;switch(r){case"WEBGL_depth_texture":a=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=s.getExtension(r)}return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&Jo("THREE.WebGLRenderer: "+r+" extension not supported."),a}}}function VM(s,e,t,r){const a={},l=new WeakMap;function u(v){const x=v.target;x.index!==null&&e.remove(x.index);for(const M in x.attributes)e.remove(x.attributes[M]);for(const M in x.morphAttributes){const w=x.morphAttributes[M];for(let y=0,_=w.length;y<_;y++)e.remove(w[y])}x.removeEventListener("dispose",u),delete a[x.id];const S=l.get(x);S&&(e.remove(S),l.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function d(v,x){return a[x.id]===!0||(x.addEventListener("dispose",u),a[x.id]=!0,t.memory.geometries++),x}function f(v){const x=v.attributes;for(const M in x)e.update(x[M],s.ARRAY_BUFFER);const S=v.morphAttributes;for(const M in S){const w=S[M];for(let y=0,_=w.length;y<_;y++)e.update(w[y],s.ARRAY_BUFFER)}}function p(v){const x=[],S=v.index,M=v.attributes.position;let w=0;if(S!==null){const I=S.array;w=S.version;for(let L=0,C=I.length;L<C;L+=3){const W=I[L+0],O=I[L+1],U=I[L+2];x.push(W,O,O,U,U,W)}}else if(M!==void 0){const I=M.array;w=M.version;for(let L=0,C=I.length/3-1;L<C;L+=3){const W=L+0,O=L+1,U=L+2;x.push(W,O,O,U,U,W)}}else return;const y=new(Zg(x)?n0:t0)(x,1);y.version=w;const _=l.get(v);_&&e.remove(_),l.set(v,y)}function g(v){const x=l.get(v);if(x){const S=v.index;S!==null&&x.version<S.version&&p(v)}else p(v);return l.get(v)}return{get:d,update:f,getWireframeAttribute:g}}function GM(s,e,t){let r;function a(x){r=x}let l,u;function d(x){l=x.type,u=x.bytesPerElement}function f(x,S){s.drawElements(r,S,l,x*u),t.update(S,r,1)}function p(x,S,M){M!==0&&(s.drawElementsInstanced(r,S,l,x*u,M),t.update(S,r,M))}function g(x,S,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,S,0,l,x,0,M);let y=0;for(let _=0;_<M;_++)y+=S[_];t.update(y,r,1)}function v(x,S,M,w){if(M===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let _=0;_<x.length;_++)p(x[_]/u,S[_],w[_]);else{y.multiDrawElementsInstancedWEBGL(r,S,0,l,x,0,w,0,M);let _=0;for(let I=0;I<M;I++)_+=S[I]*w[I];t.update(_,r,1)}}this.setMode=a,this.setIndex=d,this.render=f,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=v}function WM(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,u,d){switch(t.calls++,u){case s.TRIANGLES:t.triangles+=d*(l/3);break;case s.LINES:t.lines+=d*(l/2);break;case s.LINE_STRIP:t.lines+=d*(l-1);break;case s.LINE_LOOP:t.lines+=d*l;break;case s.POINTS:t.points+=d*l;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",u);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function jM(s,e,t){const r=new WeakMap,a=new Xt;function l(u,d,f){const p=u.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,v=g!==void 0?g.length:0;let x=r.get(d);if(x===void 0||x.count!==v){let R=function(){k.dispose(),r.delete(d),d.removeEventListener("dispose",R)};var S=R;x!==void 0&&x.texture.dispose();const M=d.morphAttributes.position!==void 0,w=d.morphAttributes.normal!==void 0,y=d.morphAttributes.color!==void 0,_=d.morphAttributes.position||[],I=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let C=0;M===!0&&(C=1),w===!0&&(C=2),y===!0&&(C=3);let W=d.attributes.position.count*C,O=1;W>e.maxTextureSize&&(O=Math.ceil(W/e.maxTextureSize),W=e.maxTextureSize);const U=new Float32Array(W*O*4*v),k=new Jg(U,W,O,v);k.type=Ri,k.needsUpdate=!0;const P=C*4;for(let H=0;H<v;H++){const re=_[H],K=I[H],le=L[H],de=W*O*4*H;for(let oe=0;oe<re.count;oe++){const ue=oe*P;M===!0&&(a.fromBufferAttribute(re,oe),U[de+ue+0]=a.x,U[de+ue+1]=a.y,U[de+ue+2]=a.z,U[de+ue+3]=0),w===!0&&(a.fromBufferAttribute(K,oe),U[de+ue+4]=a.x,U[de+ue+5]=a.y,U[de+ue+6]=a.z,U[de+ue+7]=0),y===!0&&(a.fromBufferAttribute(le,oe),U[de+ue+8]=a.x,U[de+ue+9]=a.y,U[de+ue+10]=a.z,U[de+ue+11]=le.itemSize===4?a.w:1)}}x={count:v,texture:k,size:new Mt(W,O)},r.set(d,x),d.addEventListener("dispose",R)}if(u.isInstancedMesh===!0&&u.morphTexture!==null)f.getUniforms().setValue(s,"morphTexture",u.morphTexture,t);else{let M=0;for(let y=0;y<p.length;y++)M+=p[y];const w=d.morphTargetsRelative?1:1-M;f.getUniforms().setValue(s,"morphTargetBaseInfluence",w),f.getUniforms().setValue(s,"morphTargetInfluences",p)}f.getUniforms().setValue(s,"morphTargetsTexture",x.texture,t),f.getUniforms().setValue(s,"morphTargetsTextureSize",x.size)}return{update:l}}function XM(s,e,t,r){let a=new WeakMap;function l(f){const p=r.render.frame,g=f.geometry,v=e.get(f,g);if(a.get(v)!==p&&(e.update(v),a.set(v,p)),f.isInstancedMesh&&(f.hasEventListener("dispose",d)===!1&&f.addEventListener("dispose",d),a.get(f)!==p&&(t.update(f.instanceMatrix,s.ARRAY_BUFFER),f.instanceColor!==null&&t.update(f.instanceColor,s.ARRAY_BUFFER),a.set(f,p))),f.isSkinnedMesh){const x=f.skeleton;a.get(x)!==p&&(x.update(),a.set(x,p))}return v}function u(){a=new WeakMap}function d(f){const p=f.target;p.removeEventListener("dispose",d),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:l,dispose:u}}class l0 extends Cn{constructor(e,t,r,a,l,u,d,f,p,g=qs){if(g!==qs&&g!==ro)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&g===qs&&(r=ts),r===void 0&&g===ro&&(r=io),super(null,a,l,u,d,f,g,r,p),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=d!==void 0?d:qn,this.minFilter=f!==void 0?f:qn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const c0=new Cn,$m=new l0(1,1),u0=new Jg,d0=new Dx,h0=new s0,Km=[],Zm=[],Qm=new Float32Array(16),Jm=new Float32Array(9),eg=new Float32Array(4);function fo(s,e,t){const r=s[0];if(r<=0||r>0)return s;const a=e*t;let l=Km[a];if(l===void 0&&(l=new Float32Array(a),Km[a]=l),e!==0){r.toArray(l,0);for(let u=1,d=0;u!==e;++u)d+=t,s[u].toArray(l,d)}return l}function rn(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function sn(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function lc(s,e){let t=Zm[e];t===void 0&&(t=new Int32Array(e),Zm[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function qM(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function YM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2fv(this.addr,e),sn(t,e)}}function $M(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;s.uniform3fv(this.addr,e),sn(t,e)}}function KM(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4fv(this.addr,e),sn(t,e)}}function ZM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(rn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,r))return;eg.set(r),s.uniformMatrix2fv(this.addr,!1,eg),sn(t,r)}}function QM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(rn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,r))return;Jm.set(r),s.uniformMatrix3fv(this.addr,!1,Jm),sn(t,r)}}function JM(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(rn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),sn(t,e)}else{if(rn(t,r))return;Qm.set(r),s.uniformMatrix4fv(this.addr,!1,Qm),sn(t,r)}}function eE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function tE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2iv(this.addr,e),sn(t,e)}}function nE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3iv(this.addr,e),sn(t,e)}}function iE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4iv(this.addr,e),sn(t,e)}}function rE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function sE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2uiv(this.addr,e),sn(t,e)}}function oE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3uiv(this.addr,e),sn(t,e)}}function aE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4uiv(this.addr,e),sn(t,e)}}function lE(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?($m.compareFunction=Kg,l=$m):l=c0,t.setTexture2D(e||l,a)}function cE(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||d0,a)}function uE(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||h0,a)}function dE(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||u0,a)}function hE(s){switch(s){case 5126:return qM;case 35664:return YM;case 35665:return $M;case 35666:return KM;case 35674:return ZM;case 35675:return QM;case 35676:return JM;case 5124:case 35670:return eE;case 35667:case 35671:return tE;case 35668:case 35672:return nE;case 35669:case 35673:return iE;case 5125:return rE;case 36294:return sE;case 36295:return oE;case 36296:return aE;case 35678:case 36198:case 36298:case 36306:case 35682:return lE;case 35679:case 36299:case 36307:return cE;case 35680:case 36300:case 36308:case 36293:return uE;case 36289:case 36303:case 36311:case 36292:return dE}}function fE(s,e){s.uniform1fv(this.addr,e)}function pE(s,e){const t=fo(e,this.size,2);s.uniform2fv(this.addr,t)}function mE(s,e){const t=fo(e,this.size,3);s.uniform3fv(this.addr,t)}function gE(s,e){const t=fo(e,this.size,4);s.uniform4fv(this.addr,t)}function vE(s,e){const t=fo(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function _E(s,e){const t=fo(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function xE(s,e){const t=fo(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function yE(s,e){s.uniform1iv(this.addr,e)}function SE(s,e){s.uniform2iv(this.addr,e)}function ME(s,e){s.uniform3iv(this.addr,e)}function EE(s,e){s.uniform4iv(this.addr,e)}function wE(s,e){s.uniform1uiv(this.addr,e)}function TE(s,e){s.uniform2uiv(this.addr,e)}function AE(s,e){s.uniform3uiv(this.addr,e)}function RE(s,e){s.uniform4uiv(this.addr,e)}function CE(s,e,t){const r=this.cache,a=e.length,l=lc(t,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)t.setTexture2D(e[u]||c0,l[u])}function bE(s,e,t){const r=this.cache,a=e.length,l=lc(t,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)t.setTexture3D(e[u]||d0,l[u])}function PE(s,e,t){const r=this.cache,a=e.length,l=lc(t,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)t.setTextureCube(e[u]||h0,l[u])}function LE(s,e,t){const r=this.cache,a=e.length,l=lc(t,a);rn(r,l)||(s.uniform1iv(this.addr,l),sn(r,l));for(let u=0;u!==a;++u)t.setTexture2DArray(e[u]||u0,l[u])}function DE(s){switch(s){case 5126:return fE;case 35664:return pE;case 35665:return mE;case 35666:return gE;case 35674:return vE;case 35675:return _E;case 35676:return xE;case 5124:case 35670:return yE;case 35667:case 35671:return SE;case 35668:case 35672:return ME;case 35669:case 35673:return EE;case 5125:return wE;case 36294:return TE;case 36295:return AE;case 36296:return RE;case 35678:case 36198:case 36298:case 36306:case 35682:return CE;case 35679:case 36299:case 36307:return bE;case 35680:case 36300:case 36308:case 36293:return PE;case 36289:case 36303:case 36311:case 36292:return LE}}class IE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=hE(t.type)}}class NE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=DE(t.type)}}class UE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let l=0,u=a.length;l!==u;++l){const d=a[l];d.setValue(e,t[d.id],r)}}}const xd=/(\w+)(\])?(\[|\.)?/g;function tg(s,e){s.seq.push(e),s.map[e.id]=e}function FE(s,e,t){const r=s.name,a=r.length;for(xd.lastIndex=0;;){const l=xd.exec(r),u=xd.lastIndex;let d=l[1];const f=l[2]==="]",p=l[3];if(f&&(d=d|0),p===void 0||p==="["&&u+2===a){tg(t,p===void 0?new IE(d,s,e):new NE(d,s,e));break}else{let v=t.map[d];v===void 0&&(v=new UE(d),tg(t,v)),t=v}}}class Ql{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<r;++a){const l=e.getActiveUniform(t,a),u=e.getUniformLocation(t,l.name);FE(l,u,this)}}setValue(e,t,r,a){const l=this.map[t];l!==void 0&&l.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let l=0,u=t.length;l!==u;++l){const d=t[l],f=r[d.id];f.needsUpdate!==!1&&d.setValue(e,f.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,l=e.length;a!==l;++a){const u=e[a];u.id in t&&r.push(u)}return r}}function ng(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const OE=37297;let kE=0;function BE(s,e){const t=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let u=a;u<l;u++){const d=u+1;r.push(`${d===e?">":" "} ${d}: ${t[u]}`)}return r.join(`
`)}const ig=new ut;function zE(s){Tt._getMatrix(ig,Tt.workingColorSpace,s);const e=`mat3( ${ig.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(s)){case ac:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function rg(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),a=s.getShaderInfoLog(e).trim();if(r&&a==="")return"";const l=/ERROR: 0:(\d+)/.exec(a);if(l){const u=parseInt(l[1]);return t.toUpperCase()+`

`+a+`

`+BE(s.getShaderSource(e),u)}else return a}function HE(s,e){const t=zE(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function VE(s,e){let t;switch(e){case j_:t="Linear";break;case X_:t="Reinhard";break;case q_:t="Cineon";break;case kg:t="ACESFilmic";break;case $_:t="AgX";break;case K_:t="Neutral";break;case Y_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const kl=new j;function GE(){Tt.getLuminanceCoefficients(kl);const s=kl.x.toFixed(4),e=kl.y.toFixed(4),t=kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function WE(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ea).join(`
`)}function jE(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function XE(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),u=l.name;let d=1;l.type===s.FLOAT_MAT2&&(d=2),l.type===s.FLOAT_MAT3&&(d=3),l.type===s.FLOAT_MAT4&&(d=4),t[u]={type:l.type,location:s.getAttribLocation(e,u),locationSize:d}}return t}function ea(s){return s!==""}function sg(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function og(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const qE=/^[ \t]*#include +<([\w\d./]+)>/gm;function uh(s){return s.replace(qE,$E)}const YE=new Map;function $E(s,e){let t=dt[e];if(t===void 0){const r=YE.get(e);if(r!==void 0)t=dt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return uh(t)}const KE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ag(s){return s.replace(KE,ZE)}function ZE(s,e,t,r){let a="";for(let l=parseInt(e);l<parseInt(t);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function lg(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function QE(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ug?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Fg?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ji&&(e="SHADOWMAP_TYPE_VSM"),e}function JE(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case to:case no:e="ENVMAP_TYPE_CUBE";break;case oc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function e1(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case no:e="ENVMAP_MODE_REFRACTION";break}return e}function t1(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Og:e="ENVMAP_BLENDING_MULTIPLY";break;case G_:e="ENVMAP_BLENDING_MIX";break;case W_:e="ENVMAP_BLENDING_ADD";break}return e}function n1(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function i1(s,e,t,r){const a=s.getContext(),l=t.defines;let u=t.vertexShader,d=t.fragmentShader;const f=QE(t),p=JE(t),g=e1(t),v=t1(t),x=n1(t),S=WE(t),M=jE(l),w=a.createProgram();let y,_,I=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(ea).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(ea).join(`
`),_.length>0&&(_+=`
`)):(y=[lg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ea).join(`
`),_=[lg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",t.envMap?"#define "+v:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+f:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Tr?"#define TONE_MAPPING":"",t.toneMapping!==Tr?dt.tonemapping_pars_fragment:"",t.toneMapping!==Tr?VE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",dt.colorspace_pars_fragment,HE("linearToOutputTexel",t.outputColorSpace),GE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ea).join(`
`)),u=uh(u),u=sg(u,t),u=og(u,t),d=uh(d),d=sg(d,t),d=og(d,t),u=ag(u),d=ag(d),t.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",t.glslVersion===ym?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ym?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const L=I+y+u,C=I+_+d,W=ng(a,a.VERTEX_SHADER,L),O=ng(a,a.FRAGMENT_SHADER,C);a.attachShader(w,W),a.attachShader(w,O),t.index0AttributeName!==void 0?a.bindAttribLocation(w,0,t.index0AttributeName):t.morphTargets===!0&&a.bindAttribLocation(w,0,"position"),a.linkProgram(w);function U(H){if(s.debug.checkShaderErrors){const re=a.getProgramInfoLog(w).trim(),K=a.getShaderInfoLog(W).trim(),le=a.getShaderInfoLog(O).trim();let de=!0,oe=!0;if(a.getProgramParameter(w,a.LINK_STATUS)===!1)if(de=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,w,W,O);else{const ue=rg(a,W,"vertex"),z=rg(a,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(w,a.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+re+`
`+ue+`
`+z)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(K===""||le==="")&&(oe=!1);oe&&(H.diagnostics={runnable:de,programLog:re,vertexShader:{log:K,prefix:y},fragmentShader:{log:le,prefix:_}})}a.deleteShader(W),a.deleteShader(O),k=new Ql(a,w),P=XE(a,w)}let k;this.getUniforms=function(){return k===void 0&&U(this),k};let P;this.getAttributes=function(){return P===void 0&&U(this),P};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=a.getProgramParameter(w,OE)),R},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kE++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=W,this.fragmentShader=O,this}let r1=0;class s1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,a=this._getShaderStage(t),l=this._getShaderStage(r),u=this._getShaderCacheForMaterial(e);return u.has(a)===!1&&(u.add(a),a.usedTimes++),u.has(l)===!1&&(u.add(l),l.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new o1(e),t.set(e,r)),r}}class o1{constructor(e){this.id=r1++,this.code=e,this.usedTimes=0}}function a1(s,e,t,r,a,l,u){const d=new Ah,f=new s1,p=new Set,g=[],v=a.logarithmicDepthBuffer,x=a.vertexTextures;let S=a.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(P){return p.add(P),P===0?"uv":`uv${P}`}function y(P,R,H,re,K){const le=re.fog,de=K.geometry,oe=P.isMeshStandardMaterial?re.environment:null,ue=(P.isMeshStandardMaterial?t:e).get(P.envMap||oe),z=ue&&ue.mapping===oc?ue.image.height:null,ce=M[P.type];P.precision!==null&&(S=a.getMaxPrecision(P.precision),S!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",S,"instead."));const ee=de.morphAttributes.position||de.morphAttributes.normal||de.morphAttributes.color,F=ee!==void 0?ee.length:0;let se=0;de.morphAttributes.position!==void 0&&(se=1),de.morphAttributes.normal!==void 0&&(se=2),de.morphAttributes.color!==void 0&&(se=3);let Ne,Q,he,Se;if(ce){const Et=Ti[ce];Ne=Et.vertexShader,Q=Et.fragmentShader}else Ne=P.vertexShader,Q=P.fragmentShader,f.update(P),he=f.getVertexShaderID(P),Se=f.getFragmentShaderID(P);const ve=s.getRenderTarget(),Re=s.state.buffers.depth.getReversed(),Ue=K.isInstancedMesh===!0,Ke=K.isBatchedMesh===!0,St=!!P.map,pt=!!P.matcap,Dt=!!ue,q=!!P.aoMap,st=!!P.lightMap,$e=!!P.bumpMap,lt=!!P.normalMap,Ze=!!P.displacementMap,Pt=!!P.emissiveMap,Ye=!!P.metalnessMap,D=!!P.roughnessMap,T=P.anisotropy>0,J=P.clearcoat>0,me=P.dispersion>0,_e=P.iridescence>0,fe=P.sheen>0,Ge=P.transmission>0,Ce=T&&!!P.anisotropyMap,Fe=J&&!!P.clearcoatMap,ht=J&&!!P.clearcoatNormalMap,Me=J&&!!P.clearcoatRoughnessMap,ke=_e&&!!P.iridescenceMap,et=_e&&!!P.iridescenceThicknessMap,tt=fe&&!!P.sheenColorMap,Be=fe&&!!P.sheenRoughnessMap,mt=!!P.specularMap,ot=!!P.specularColorMap,bt=!!P.specularIntensityMap,G=Ge&&!!P.transmissionMap,be=Ge&&!!P.thicknessMap,ae=!!P.gradientMap,pe=!!P.alphaMap,De=P.alphaTest>0,Le=!!P.alphaHash,at=!!P.extensions;let Ft=Tr;P.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(Ft=s.toneMapping);const Zt={shaderID:ce,shaderType:P.type,shaderName:P.name,vertexShader:Ne,fragmentShader:Q,defines:P.defines,customVertexShaderID:he,customFragmentShaderID:Se,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:S,batching:Ke,batchingColor:Ke&&K._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&K.instanceColor!==null,instancingMorph:Ue&&K.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:ve===null?s.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:ao,alphaToCoverage:!!P.alphaToCoverage,map:St,matcap:pt,envMap:Dt,envMapMode:Dt&&ue.mapping,envMapCubeUVHeight:z,aoMap:q,lightMap:st,bumpMap:$e,normalMap:lt,displacementMap:x&&Ze,emissiveMap:Pt,normalMapObjectSpace:lt&&P.normalMapType===ex,normalMapTangentSpace:lt&&P.normalMapType===$g,metalnessMap:Ye,roughnessMap:D,anisotropy:T,anisotropyMap:Ce,clearcoat:J,clearcoatMap:Fe,clearcoatNormalMap:ht,clearcoatRoughnessMap:Me,dispersion:me,iridescence:_e,iridescenceMap:ke,iridescenceThicknessMap:et,sheen:fe,sheenColorMap:tt,sheenRoughnessMap:Be,specularMap:mt,specularColorMap:ot,specularIntensityMap:bt,transmission:Ge,transmissionMap:G,thicknessMap:be,gradientMap:ae,opaque:P.transparent===!1&&P.blending===Xs&&P.alphaToCoverage===!1,alphaMap:pe,alphaTest:De,alphaHash:Le,combine:P.combine,mapUv:St&&w(P.map.channel),aoMapUv:q&&w(P.aoMap.channel),lightMapUv:st&&w(P.lightMap.channel),bumpMapUv:$e&&w(P.bumpMap.channel),normalMapUv:lt&&w(P.normalMap.channel),displacementMapUv:Ze&&w(P.displacementMap.channel),emissiveMapUv:Pt&&w(P.emissiveMap.channel),metalnessMapUv:Ye&&w(P.metalnessMap.channel),roughnessMapUv:D&&w(P.roughnessMap.channel),anisotropyMapUv:Ce&&w(P.anisotropyMap.channel),clearcoatMapUv:Fe&&w(P.clearcoatMap.channel),clearcoatNormalMapUv:ht&&w(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Me&&w(P.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&w(P.iridescenceMap.channel),iridescenceThicknessMapUv:et&&w(P.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&w(P.sheenColorMap.channel),sheenRoughnessMapUv:Be&&w(P.sheenRoughnessMap.channel),specularMapUv:mt&&w(P.specularMap.channel),specularColorMapUv:ot&&w(P.specularColorMap.channel),specularIntensityMapUv:bt&&w(P.specularIntensityMap.channel),transmissionMapUv:G&&w(P.transmissionMap.channel),thicknessMapUv:be&&w(P.thicknessMap.channel),alphaMapUv:pe&&w(P.alphaMap.channel),vertexTangents:!!de.attributes.tangent&&(lt||T),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!de.attributes.color&&de.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!de.attributes.uv&&(St||pe),fog:!!le,useFog:P.fog===!0,fogExp2:!!le&&le.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:v,reverseDepthBuffer:Re,skinning:K.isSkinnedMesh===!0,morphTargets:de.morphAttributes.position!==void 0,morphNormals:de.morphAttributes.normal!==void 0,morphColors:de.morphAttributes.color!==void 0,morphTargetsCount:F,morphTextureStride:se,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ft,decodeVideoTexture:St&&P.map.isVideoTexture===!0&&Tt.getTransfer(P.map.colorSpace)===It,decodeVideoTextureEmissive:Pt&&P.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(P.emissiveMap.colorSpace)===It,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===Xi,flipSided:P.side===On,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:at&&P.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&P.extensions.multiDraw===!0||Ke)&&r.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return Zt.vertexUv1s=p.has(1),Zt.vertexUv2s=p.has(2),Zt.vertexUv3s=p.has(3),p.clear(),Zt}function _(P){const R=[];if(P.shaderID?R.push(P.shaderID):(R.push(P.customVertexShaderID),R.push(P.customFragmentShaderID)),P.defines!==void 0)for(const H in P.defines)R.push(H),R.push(P.defines[H]);return P.isRawShaderMaterial===!1&&(I(R,P),L(R,P),R.push(s.outputColorSpace)),R.push(P.customProgramCacheKey),R.join()}function I(P,R){P.push(R.precision),P.push(R.outputColorSpace),P.push(R.envMapMode),P.push(R.envMapCubeUVHeight),P.push(R.mapUv),P.push(R.alphaMapUv),P.push(R.lightMapUv),P.push(R.aoMapUv),P.push(R.bumpMapUv),P.push(R.normalMapUv),P.push(R.displacementMapUv),P.push(R.emissiveMapUv),P.push(R.metalnessMapUv),P.push(R.roughnessMapUv),P.push(R.anisotropyMapUv),P.push(R.clearcoatMapUv),P.push(R.clearcoatNormalMapUv),P.push(R.clearcoatRoughnessMapUv),P.push(R.iridescenceMapUv),P.push(R.iridescenceThicknessMapUv),P.push(R.sheenColorMapUv),P.push(R.sheenRoughnessMapUv),P.push(R.specularMapUv),P.push(R.specularColorMapUv),P.push(R.specularIntensityMapUv),P.push(R.transmissionMapUv),P.push(R.thicknessMapUv),P.push(R.combine),P.push(R.fogExp2),P.push(R.sizeAttenuation),P.push(R.morphTargetsCount),P.push(R.morphAttributeCount),P.push(R.numDirLights),P.push(R.numPointLights),P.push(R.numSpotLights),P.push(R.numSpotLightMaps),P.push(R.numHemiLights),P.push(R.numRectAreaLights),P.push(R.numDirLightShadows),P.push(R.numPointLightShadows),P.push(R.numSpotLightShadows),P.push(R.numSpotLightShadowsWithMaps),P.push(R.numLightProbes),P.push(R.shadowMapType),P.push(R.toneMapping),P.push(R.numClippingPlanes),P.push(R.numClipIntersection),P.push(R.depthPacking)}function L(P,R){d.disableAll(),R.supportsVertexTextures&&d.enable(0),R.instancing&&d.enable(1),R.instancingColor&&d.enable(2),R.instancingMorph&&d.enable(3),R.matcap&&d.enable(4),R.envMap&&d.enable(5),R.normalMapObjectSpace&&d.enable(6),R.normalMapTangentSpace&&d.enable(7),R.clearcoat&&d.enable(8),R.iridescence&&d.enable(9),R.alphaTest&&d.enable(10),R.vertexColors&&d.enable(11),R.vertexAlphas&&d.enable(12),R.vertexUv1s&&d.enable(13),R.vertexUv2s&&d.enable(14),R.vertexUv3s&&d.enable(15),R.vertexTangents&&d.enable(16),R.anisotropy&&d.enable(17),R.alphaHash&&d.enable(18),R.batching&&d.enable(19),R.dispersion&&d.enable(20),R.batchingColor&&d.enable(21),P.push(d.mask),d.disableAll(),R.fog&&d.enable(0),R.useFog&&d.enable(1),R.flatShading&&d.enable(2),R.logarithmicDepthBuffer&&d.enable(3),R.reverseDepthBuffer&&d.enable(4),R.skinning&&d.enable(5),R.morphTargets&&d.enable(6),R.morphNormals&&d.enable(7),R.morphColors&&d.enable(8),R.premultipliedAlpha&&d.enable(9),R.shadowMapEnabled&&d.enable(10),R.doubleSided&&d.enable(11),R.flipSided&&d.enable(12),R.useDepthPacking&&d.enable(13),R.dithering&&d.enable(14),R.transmission&&d.enable(15),R.sheen&&d.enable(16),R.opaque&&d.enable(17),R.pointsUvs&&d.enable(18),R.decodeVideoTexture&&d.enable(19),R.decodeVideoTextureEmissive&&d.enable(20),R.alphaToCoverage&&d.enable(21),P.push(d.mask)}function C(P){const R=M[P.type];let H;if(R){const re=Ti[R];H=Wx.clone(re.uniforms)}else H=P.uniforms;return H}function W(P,R){let H;for(let re=0,K=g.length;re<K;re++){const le=g[re];if(le.cacheKey===R){H=le,++H.usedTimes;break}}return H===void 0&&(H=new i1(s,R,P,l),g.push(H)),H}function O(P){if(--P.usedTimes===0){const R=g.indexOf(P);g[R]=g[g.length-1],g.pop(),P.destroy()}}function U(P){f.remove(P)}function k(){f.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:C,acquireProgram:W,releaseProgram:O,releaseShaderCache:U,programs:g,dispose:k}}function l1(){let s=new WeakMap;function e(u){return s.has(u)}function t(u){let d=s.get(u);return d===void 0&&(d={},s.set(u,d)),d}function r(u){s.delete(u)}function a(u,d,f){s.get(u)[d]=f}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:a,dispose:l}}function c1(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function cg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ug(){const s=[];let e=0;const t=[],r=[],a=[];function l(){e=0,t.length=0,r.length=0,a.length=0}function u(v,x,S,M,w,y){let _=s[e];return _===void 0?(_={id:v.id,object:v,geometry:x,material:S,groupOrder:M,renderOrder:v.renderOrder,z:w,group:y},s[e]=_):(_.id=v.id,_.object=v,_.geometry=x,_.material=S,_.groupOrder=M,_.renderOrder=v.renderOrder,_.z=w,_.group=y),e++,_}function d(v,x,S,M,w,y){const _=u(v,x,S,M,w,y);S.transmission>0?r.push(_):S.transparent===!0?a.push(_):t.push(_)}function f(v,x,S,M,w,y){const _=u(v,x,S,M,w,y);S.transmission>0?r.unshift(_):S.transparent===!0?a.unshift(_):t.unshift(_)}function p(v,x){t.length>1&&t.sort(v||c1),r.length>1&&r.sort(x||cg),a.length>1&&a.sort(x||cg)}function g(){for(let v=e,x=s.length;v<x;v++){const S=s[v];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:t,transmissive:r,transparent:a,init:l,push:d,unshift:f,finish:g,sort:p}}function u1(){let s=new WeakMap;function e(r,a){const l=s.get(r);let u;return l===void 0?(u=new ug,s.set(r,[u])):a>=l.length?(u=new ug,l.push(u)):u=l[a],u}function t(){s=new WeakMap}return{get:e,dispose:t}}function d1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new j,color:new vt};break;case"SpotLight":t={position:new j,direction:new j,color:new vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new j,color:new vt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new j,skyColor:new vt,groundColor:new vt};break;case"RectAreaLight":t={color:new vt,position:new j,halfWidth:new j,halfHeight:new j};break}return s[e.id]=t,t}}}function h1(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let f1=0;function p1(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function m1(s){const e=new d1,t=h1(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)r.probe.push(new j);const a=new j,l=new xt,u=new xt;function d(p){let g=0,v=0,x=0;for(let P=0;P<9;P++)r.probe[P].set(0,0,0);let S=0,M=0,w=0,y=0,_=0,I=0,L=0,C=0,W=0,O=0,U=0;p.sort(p1);for(let P=0,R=p.length;P<R;P++){const H=p[P],re=H.color,K=H.intensity,le=H.distance,de=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)g+=re.r*K,v+=re.g*K,x+=re.b*K;else if(H.isLightProbe){for(let oe=0;oe<9;oe++)r.probe[oe].addScaledVector(H.sh.coefficients[oe],K);U++}else if(H.isDirectionalLight){const oe=e.get(H);if(oe.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const ue=H.shadow,z=t.get(H);z.shadowIntensity=ue.intensity,z.shadowBias=ue.bias,z.shadowNormalBias=ue.normalBias,z.shadowRadius=ue.radius,z.shadowMapSize=ue.mapSize,r.directionalShadow[S]=z,r.directionalShadowMap[S]=de,r.directionalShadowMatrix[S]=H.shadow.matrix,I++}r.directional[S]=oe,S++}else if(H.isSpotLight){const oe=e.get(H);oe.position.setFromMatrixPosition(H.matrixWorld),oe.color.copy(re).multiplyScalar(K),oe.distance=le,oe.coneCos=Math.cos(H.angle),oe.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),oe.decay=H.decay,r.spot[w]=oe;const ue=H.shadow;if(H.map&&(r.spotLightMap[W]=H.map,W++,ue.updateMatrices(H),H.castShadow&&O++),r.spotLightMatrix[w]=ue.matrix,H.castShadow){const z=t.get(H);z.shadowIntensity=ue.intensity,z.shadowBias=ue.bias,z.shadowNormalBias=ue.normalBias,z.shadowRadius=ue.radius,z.shadowMapSize=ue.mapSize,r.spotShadow[w]=z,r.spotShadowMap[w]=de,C++}w++}else if(H.isRectAreaLight){const oe=e.get(H);oe.color.copy(re).multiplyScalar(K),oe.halfWidth.set(H.width*.5,0,0),oe.halfHeight.set(0,H.height*.5,0),r.rectArea[y]=oe,y++}else if(H.isPointLight){const oe=e.get(H);if(oe.color.copy(H.color).multiplyScalar(H.intensity),oe.distance=H.distance,oe.decay=H.decay,H.castShadow){const ue=H.shadow,z=t.get(H);z.shadowIntensity=ue.intensity,z.shadowBias=ue.bias,z.shadowNormalBias=ue.normalBias,z.shadowRadius=ue.radius,z.shadowMapSize=ue.mapSize,z.shadowCameraNear=ue.camera.near,z.shadowCameraFar=ue.camera.far,r.pointShadow[M]=z,r.pointShadowMap[M]=de,r.pointShadowMatrix[M]=H.shadow.matrix,L++}r.point[M]=oe,M++}else if(H.isHemisphereLight){const oe=e.get(H);oe.skyColor.copy(H.color).multiplyScalar(K),oe.groundColor.copy(H.groundColor).multiplyScalar(K),r.hemi[_]=oe,_++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=Pe.LTC_FLOAT_1,r.rectAreaLTC2=Pe.LTC_FLOAT_2):(r.rectAreaLTC1=Pe.LTC_HALF_1,r.rectAreaLTC2=Pe.LTC_HALF_2)),r.ambient[0]=g,r.ambient[1]=v,r.ambient[2]=x;const k=r.hash;(k.directionalLength!==S||k.pointLength!==M||k.spotLength!==w||k.rectAreaLength!==y||k.hemiLength!==_||k.numDirectionalShadows!==I||k.numPointShadows!==L||k.numSpotShadows!==C||k.numSpotMaps!==W||k.numLightProbes!==U)&&(r.directional.length=S,r.spot.length=w,r.rectArea.length=y,r.point.length=M,r.hemi.length=_,r.directionalShadow.length=I,r.directionalShadowMap.length=I,r.pointShadow.length=L,r.pointShadowMap.length=L,r.spotShadow.length=C,r.spotShadowMap.length=C,r.directionalShadowMatrix.length=I,r.pointShadowMatrix.length=L,r.spotLightMatrix.length=C+W-O,r.spotLightMap.length=W,r.numSpotLightShadowsWithMaps=O,r.numLightProbes=U,k.directionalLength=S,k.pointLength=M,k.spotLength=w,k.rectAreaLength=y,k.hemiLength=_,k.numDirectionalShadows=I,k.numPointShadows=L,k.numSpotShadows=C,k.numSpotMaps=W,k.numLightProbes=U,r.version=f1++)}function f(p,g){let v=0,x=0,S=0,M=0,w=0;const y=g.matrixWorldInverse;for(let _=0,I=p.length;_<I;_++){const L=p[_];if(L.isDirectionalLight){const C=r.directional[v];C.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(y),v++}else if(L.isSpotLight){const C=r.spot[S];C.position.setFromMatrixPosition(L.matrixWorld),C.position.applyMatrix4(y),C.direction.setFromMatrixPosition(L.matrixWorld),a.setFromMatrixPosition(L.target.matrixWorld),C.direction.sub(a),C.direction.transformDirection(y),S++}else if(L.isRectAreaLight){const C=r.rectArea[M];C.position.setFromMatrixPosition(L.matrixWorld),C.position.applyMatrix4(y),u.identity(),l.copy(L.matrixWorld),l.premultiply(y),u.extractRotation(l),C.halfWidth.set(L.width*.5,0,0),C.halfHeight.set(0,L.height*.5,0),C.halfWidth.applyMatrix4(u),C.halfHeight.applyMatrix4(u),M++}else if(L.isPointLight){const C=r.point[x];C.position.setFromMatrixPosition(L.matrixWorld),C.position.applyMatrix4(y),x++}else if(L.isHemisphereLight){const C=r.hemi[w];C.direction.setFromMatrixPosition(L.matrixWorld),C.direction.transformDirection(y),w++}}}return{setup:d,setupView:f,state:r}}function dg(s){const e=new m1(s),t=[],r=[];function a(g){p.camera=g,t.length=0,r.length=0}function l(g){t.push(g)}function u(g){r.push(g)}function d(){e.setup(t)}function f(g){e.setupView(t,g)}const p={lightsArray:t,shadowsArray:r,camera:null,lights:e,transmissionRenderTarget:{}};return{init:a,state:p,setupLights:d,setupLightsView:f,pushLight:l,pushShadow:u}}function g1(s){let e=new WeakMap;function t(a,l=0){const u=e.get(a);let d;return u===void 0?(d=new dg(s),e.set(a,[d])):l>=u.length?(d=new dg(s),u.push(d)):d=u[l],d}function r(){e=new WeakMap}return{get:t,dispose:r}}class v1 extends ho{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Q_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _1 extends ho{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const x1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function S1(s,e,t){let r=new Rh;const a=new Mt,l=new Mt,u=new Xt,d=new v1({depthPacking:J_}),f=new _1,p={},g=t.maxTextureSize,v={[Ar]:On,[On]:Ar,[Xi]:Xi},x=new Rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:x1,fragmentShader:y1}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const M=new kn;M.setAttribute("position",new gi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new zt(M,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ug;let _=this.type;this.render=function(O,U,k){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||O.length===0)return;const P=s.getRenderTarget(),R=s.getActiveCubeFace(),H=s.getActiveMipmapLevel(),re=s.state;re.setBlending(wr),re.buffers.color.setClear(1,1,1,1),re.buffers.depth.setTest(!0),re.setScissorTest(!1);const K=_!==ji&&this.type===ji,le=_===ji&&this.type!==ji;for(let de=0,oe=O.length;de<oe;de++){const ue=O[de],z=ue.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",ue,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;a.copy(z.mapSize);const ce=z.getFrameExtents();if(a.multiply(ce),l.copy(z.mapSize),(a.x>g||a.y>g)&&(a.x>g&&(l.x=Math.floor(g/ce.x),a.x=l.x*ce.x,z.mapSize.x=l.x),a.y>g&&(l.y=Math.floor(g/ce.y),a.y=l.y*ce.y,z.mapSize.y=l.y)),z.map===null||K===!0||le===!0){const F=this.type!==ji?{minFilter:qn,magFilter:qn}:{};z.map!==null&&z.map.dispose(),z.map=new ns(a.x,a.y,F),z.map.texture.name=ue.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();const ee=z.getViewportCount();for(let F=0;F<ee;F++){const se=z.getViewport(F);u.set(l.x*se.x,l.y*se.y,l.x*se.z,l.y*se.w),re.viewport(u),z.updateMatrices(ue,F),r=z.getFrustum(),C(U,k,z.camera,ue,this.type)}z.isPointLightShadow!==!0&&this.type===ji&&I(z,k),z.needsUpdate=!1}_=this.type,y.needsUpdate=!1,s.setRenderTarget(P,R,H)};function I(O,U){const k=e.update(w);x.defines.VSM_SAMPLES!==O.blurSamples&&(x.defines.VSM_SAMPLES=O.blurSamples,S.defines.VSM_SAMPLES=O.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ns(a.x,a.y)),x.uniforms.shadow_pass.value=O.map.texture,x.uniforms.resolution.value=O.mapSize,x.uniforms.radius.value=O.radius,s.setRenderTarget(O.mapPass),s.clear(),s.renderBufferDirect(U,null,k,x,w,null),S.uniforms.shadow_pass.value=O.mapPass.texture,S.uniforms.resolution.value=O.mapSize,S.uniforms.radius.value=O.radius,s.setRenderTarget(O.map),s.clear(),s.renderBufferDirect(U,null,k,S,w,null)}function L(O,U,k,P){let R=null;const H=k.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(H!==void 0)R=H;else if(R=k.isPointLight===!0?f:d,s.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const re=R.uuid,K=U.uuid;let le=p[re];le===void 0&&(le={},p[re]=le);let de=le[K];de===void 0&&(de=R.clone(),le[K]=de,U.addEventListener("dispose",W)),R=de}if(R.visible=U.visible,R.wireframe=U.wireframe,P===ji?R.side=U.shadowSide!==null?U.shadowSide:U.side:R.side=U.shadowSide!==null?U.shadowSide:v[U.side],R.alphaMap=U.alphaMap,R.alphaTest=U.alphaTest,R.map=U.map,R.clipShadows=U.clipShadows,R.clippingPlanes=U.clippingPlanes,R.clipIntersection=U.clipIntersection,R.displacementMap=U.displacementMap,R.displacementScale=U.displacementScale,R.displacementBias=U.displacementBias,R.wireframeLinewidth=U.wireframeLinewidth,R.linewidth=U.linewidth,k.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const re=s.properties.get(R);re.light=k}return R}function C(O,U,k,P,R){if(O.visible===!1)return;if(O.layers.test(U.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===ji)&&(!O.frustumCulled||r.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,O.matrixWorld);const K=e.update(O),le=O.material;if(Array.isArray(le)){const de=K.groups;for(let oe=0,ue=de.length;oe<ue;oe++){const z=de[oe],ce=le[z.materialIndex];if(ce&&ce.visible){const ee=L(O,ce,P,R);O.onBeforeShadow(s,O,U,k,K,ee,z),s.renderBufferDirect(k,null,K,ee,O,z),O.onAfterShadow(s,O,U,k,K,ee,z)}}}else if(le.visible){const de=L(O,le,P,R);O.onBeforeShadow(s,O,U,k,K,de,null),s.renderBufferDirect(k,null,K,de,O,null),O.onAfterShadow(s,O,U,k,K,de,null)}}const re=O.children;for(let K=0,le=re.length;K<le;K++)C(re[K],U,k,P,R)}function W(O){O.target.removeEventListener("dispose",W);for(const k in p){const P=p[k],R=O.target.uuid;R in P&&(P[R].dispose(),delete P[R])}}}const M1={[Rd]:Cd,[bd]:Dd,[Pd]:Id,[eo]:Ld,[Cd]:Rd,[Dd]:bd,[Id]:Pd,[Ld]:eo};function E1(s,e){function t(){let G=!1;const be=new Xt;let ae=null;const pe=new Xt(0,0,0,0);return{setMask:function(De){ae!==De&&!G&&(s.colorMask(De,De,De,De),ae=De)},setLocked:function(De){G=De},setClear:function(De,Le,at,Ft,Zt){Zt===!0&&(De*=Ft,Le*=Ft,at*=Ft),be.set(De,Le,at,Ft),pe.equals(be)===!1&&(s.clearColor(De,Le,at,Ft),pe.copy(be))},reset:function(){G=!1,ae=null,pe.set(-1,0,0,0)}}}function r(){let G=!1,be=!1,ae=null,pe=null,De=null;return{setReversed:function(Le){if(be!==Le){const at=e.get("EXT_clip_control");be?at.clipControlEXT(at.LOWER_LEFT_EXT,at.ZERO_TO_ONE_EXT):at.clipControlEXT(at.LOWER_LEFT_EXT,at.NEGATIVE_ONE_TO_ONE_EXT);const Ft=De;De=null,this.setClear(Ft)}be=Le},getReversed:function(){return be},setTest:function(Le){Le?ve(s.DEPTH_TEST):Re(s.DEPTH_TEST)},setMask:function(Le){ae!==Le&&!G&&(s.depthMask(Le),ae=Le)},setFunc:function(Le){if(be&&(Le=M1[Le]),pe!==Le){switch(Le){case Rd:s.depthFunc(s.NEVER);break;case Cd:s.depthFunc(s.ALWAYS);break;case bd:s.depthFunc(s.LESS);break;case eo:s.depthFunc(s.LEQUAL);break;case Pd:s.depthFunc(s.EQUAL);break;case Ld:s.depthFunc(s.GEQUAL);break;case Dd:s.depthFunc(s.GREATER);break;case Id:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}pe=Le}},setLocked:function(Le){G=Le},setClear:function(Le){De!==Le&&(be&&(Le=1-Le),s.clearDepth(Le),De=Le)},reset:function(){G=!1,ae=null,pe=null,De=null,be=!1}}}function a(){let G=!1,be=null,ae=null,pe=null,De=null,Le=null,at=null,Ft=null,Zt=null;return{setTest:function(Et){G||(Et?ve(s.STENCIL_TEST):Re(s.STENCIL_TEST))},setMask:function(Et){be!==Et&&!G&&(s.stencilMask(Et),be=Et)},setFunc:function(Et,bn,Sn){(ae!==Et||pe!==bn||De!==Sn)&&(s.stencilFunc(Et,bn,Sn),ae=Et,pe=bn,De=Sn)},setOp:function(Et,bn,Sn){(Le!==Et||at!==bn||Ft!==Sn)&&(s.stencilOp(Et,bn,Sn),Le=Et,at=bn,Ft=Sn)},setLocked:function(Et){G=Et},setClear:function(Et){Zt!==Et&&(s.clearStencil(Et),Zt=Et)},reset:function(){G=!1,be=null,ae=null,pe=null,De=null,Le=null,at=null,Ft=null,Zt=null}}}const l=new t,u=new r,d=new a,f=new WeakMap,p=new WeakMap;let g={},v={},x=new WeakMap,S=[],M=null,w=!1,y=null,_=null,I=null,L=null,C=null,W=null,O=null,U=new vt(0,0,0),k=0,P=!1,R=null,H=null,re=null,K=null,le=null;const de=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let oe=!1,ue=0;const z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(ue=parseFloat(/^WebGL (\d)/.exec(z)[1]),oe=ue>=1):z.indexOf("OpenGL ES")!==-1&&(ue=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),oe=ue>=2);let ce=null,ee={};const F=s.getParameter(s.SCISSOR_BOX),se=s.getParameter(s.VIEWPORT),Ne=new Xt().fromArray(F),Q=new Xt().fromArray(se);function he(G,be,ae,pe){const De=new Uint8Array(4),Le=s.createTexture();s.bindTexture(G,Le),s.texParameteri(G,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(G,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let at=0;at<ae;at++)G===s.TEXTURE_3D||G===s.TEXTURE_2D_ARRAY?s.texImage3D(be,0,s.RGBA,1,1,pe,0,s.RGBA,s.UNSIGNED_BYTE,De):s.texImage2D(be+at,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,De);return Le}const Se={};Se[s.TEXTURE_2D]=he(s.TEXTURE_2D,s.TEXTURE_2D,1),Se[s.TEXTURE_CUBE_MAP]=he(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Se[s.TEXTURE_2D_ARRAY]=he(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Se[s.TEXTURE_3D]=he(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),u.setClear(1),d.setClear(0),ve(s.DEPTH_TEST),u.setFunc(eo),$e(!1),lt(pm),ve(s.CULL_FACE),q(wr);function ve(G){g[G]!==!0&&(s.enable(G),g[G]=!0)}function Re(G){g[G]!==!1&&(s.disable(G),g[G]=!1)}function Ue(G,be){return v[G]!==be?(s.bindFramebuffer(G,be),v[G]=be,G===s.DRAW_FRAMEBUFFER&&(v[s.FRAMEBUFFER]=be),G===s.FRAMEBUFFER&&(v[s.DRAW_FRAMEBUFFER]=be),!0):!1}function Ke(G,be){let ae=S,pe=!1;if(G){ae=x.get(be),ae===void 0&&(ae=[],x.set(be,ae));const De=G.textures;if(ae.length!==De.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let Le=0,at=De.length;Le<at;Le++)ae[Le]=s.COLOR_ATTACHMENT0+Le;ae.length=De.length,pe=!0}}else ae[0]!==s.BACK&&(ae[0]=s.BACK,pe=!0);pe&&s.drawBuffers(ae)}function St(G){return M!==G?(s.useProgram(G),M=G,!0):!1}const pt={[Kr]:s.FUNC_ADD,[A_]:s.FUNC_SUBTRACT,[R_]:s.FUNC_REVERSE_SUBTRACT};pt[C_]=s.MIN,pt[b_]=s.MAX;const Dt={[P_]:s.ZERO,[L_]:s.ONE,[D_]:s.SRC_COLOR,[Td]:s.SRC_ALPHA,[k_]:s.SRC_ALPHA_SATURATE,[F_]:s.DST_COLOR,[N_]:s.DST_ALPHA,[I_]:s.ONE_MINUS_SRC_COLOR,[Ad]:s.ONE_MINUS_SRC_ALPHA,[O_]:s.ONE_MINUS_DST_COLOR,[U_]:s.ONE_MINUS_DST_ALPHA,[B_]:s.CONSTANT_COLOR,[z_]:s.ONE_MINUS_CONSTANT_COLOR,[H_]:s.CONSTANT_ALPHA,[V_]:s.ONE_MINUS_CONSTANT_ALPHA};function q(G,be,ae,pe,De,Le,at,Ft,Zt,Et){if(G===wr){w===!0&&(Re(s.BLEND),w=!1);return}if(w===!1&&(ve(s.BLEND),w=!0),G!==T_){if(G!==y||Et!==P){if((_!==Kr||C!==Kr)&&(s.blendEquation(s.FUNC_ADD),_=Kr,C=Kr),Et)switch(G){case Xs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mm:s.blendFunc(s.ONE,s.ONE);break;case gm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case vm:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Xs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case mm:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case gm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case vm:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}I=null,L=null,W=null,O=null,U.set(0,0,0),k=0,y=G,P=Et}return}De=De||be,Le=Le||ae,at=at||pe,(be!==_||De!==C)&&(s.blendEquationSeparate(pt[be],pt[De]),_=be,C=De),(ae!==I||pe!==L||Le!==W||at!==O)&&(s.blendFuncSeparate(Dt[ae],Dt[pe],Dt[Le],Dt[at]),I=ae,L=pe,W=Le,O=at),(Ft.equals(U)===!1||Zt!==k)&&(s.blendColor(Ft.r,Ft.g,Ft.b,Zt),U.copy(Ft),k=Zt),y=G,P=!1}function st(G,be){G.side===Xi?Re(s.CULL_FACE):ve(s.CULL_FACE);let ae=G.side===On;be&&(ae=!ae),$e(ae),G.blending===Xs&&G.transparent===!1?q(wr):q(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),u.setFunc(G.depthFunc),u.setTest(G.depthTest),u.setMask(G.depthWrite),l.setMask(G.colorWrite);const pe=G.stencilWrite;d.setTest(pe),pe&&(d.setMask(G.stencilWriteMask),d.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),d.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Pt(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?ve(s.SAMPLE_ALPHA_TO_COVERAGE):Re(s.SAMPLE_ALPHA_TO_COVERAGE)}function $e(G){R!==G&&(G?s.frontFace(s.CW):s.frontFace(s.CCW),R=G)}function lt(G){G!==E_?(ve(s.CULL_FACE),G!==H&&(G===pm?s.cullFace(s.BACK):G===w_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Re(s.CULL_FACE),H=G}function Ze(G){G!==re&&(oe&&s.lineWidth(G),re=G)}function Pt(G,be,ae){G?(ve(s.POLYGON_OFFSET_FILL),(K!==be||le!==ae)&&(s.polygonOffset(be,ae),K=be,le=ae)):Re(s.POLYGON_OFFSET_FILL)}function Ye(G){G?ve(s.SCISSOR_TEST):Re(s.SCISSOR_TEST)}function D(G){G===void 0&&(G=s.TEXTURE0+de-1),ce!==G&&(s.activeTexture(G),ce=G)}function T(G,be,ae){ae===void 0&&(ce===null?ae=s.TEXTURE0+de-1:ae=ce);let pe=ee[ae];pe===void 0&&(pe={type:void 0,texture:void 0},ee[ae]=pe),(pe.type!==G||pe.texture!==be)&&(ce!==ae&&(s.activeTexture(ae),ce=ae),s.bindTexture(G,be||Se[G]),pe.type=G,pe.texture=be)}function J(){const G=ee[ce];G!==void 0&&G.type!==void 0&&(s.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function me(){try{s.compressedTexImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function _e(){try{s.compressedTexImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function fe(){try{s.texSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ge(){try{s.texSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ce(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Fe(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ht(){try{s.texStorage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Me(){try{s.texStorage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ke(){try{s.texImage2D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function et(){try{s.texImage3D.apply(s,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function tt(G){Ne.equals(G)===!1&&(s.scissor(G.x,G.y,G.z,G.w),Ne.copy(G))}function Be(G){Q.equals(G)===!1&&(s.viewport(G.x,G.y,G.z,G.w),Q.copy(G))}function mt(G,be){let ae=p.get(be);ae===void 0&&(ae=new WeakMap,p.set(be,ae));let pe=ae.get(G);pe===void 0&&(pe=s.getUniformBlockIndex(be,G.name),ae.set(G,pe))}function ot(G,be){const pe=p.get(be).get(G);f.get(be)!==pe&&(s.uniformBlockBinding(be,pe,G.__bindingPointIndex),f.set(be,pe))}function bt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),u.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),g={},ce=null,ee={},v={},x=new WeakMap,S=[],M=null,w=!1,y=null,_=null,I=null,L=null,C=null,W=null,O=null,U=new vt(0,0,0),k=0,P=!1,R=null,H=null,re=null,K=null,le=null,Ne.set(0,0,s.canvas.width,s.canvas.height),Q.set(0,0,s.canvas.width,s.canvas.height),l.reset(),u.reset(),d.reset()}return{buffers:{color:l,depth:u,stencil:d},enable:ve,disable:Re,bindFramebuffer:Ue,drawBuffers:Ke,useProgram:St,setBlending:q,setMaterial:st,setFlipSided:$e,setCullFace:lt,setLineWidth:Ze,setPolygonOffset:Pt,setScissorTest:Ye,activeTexture:D,bindTexture:T,unbindTexture:J,compressedTexImage2D:me,compressedTexImage3D:_e,texImage2D:ke,texImage3D:et,updateUBOMapping:mt,uniformBlockBinding:ot,texStorage2D:ht,texStorage3D:Me,texSubImage2D:fe,texSubImage3D:Ge,compressedTexSubImage2D:Ce,compressedTexSubImage3D:Fe,scissor:tt,viewport:Be,reset:bt}}function hg(s,e,t,r){const a=w1(r);switch(t){case Gg:return s*e;case jg:return s*e;case Xg:return s*e*2;case yh:return s*e/a.components*a.byteLength;case Sh:return s*e/a.components*a.byteLength;case qg:return s*e*2/a.components*a.byteLength;case Mh:return s*e*2/a.components*a.byteLength;case Wg:return s*e*3/a.components*a.byteLength;case mi:return s*e*4/a.components*a.byteLength;case Eh:return s*e*4/a.components*a.byteLength;case ql:case Yl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case $l:case Kl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Bd:case Hd:return Math.max(s,16)*Math.max(e,8)/4;case kd:case zd:return Math.max(s,8)*Math.max(e,8)/2;case Vd:case Gd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Wd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case jd:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Xd:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case qd:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Yd:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case $d:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Kd:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Zd:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Qd:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Jd:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case eh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case th:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case nh:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case ih:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case rh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Zl:case sh:case oh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Yg:case ah:return Math.ceil(s/4)*Math.ceil(e/4)*8;case lh:case ch:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function w1(s){switch(s){case $i:case zg:return{byteLength:1,components:1};case sa:case Hg:case la:return{byteLength:2,components:1};case _h:case xh:return{byteLength:2,components:4};case ts:case vh:case Ri:return{byteLength:4,components:1};case Vg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}function T1(s,e,t,r,a,l,u){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Mt,g=new WeakMap;let v;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(D,T){return S?new OffscreenCanvas(D,T):tc("canvas")}function w(D,T,J){let me=1;const _e=Ye(D);if((_e.width>J||_e.height>J)&&(me=J/Math.max(_e.width,_e.height)),me<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const fe=Math.floor(me*_e.width),Ge=Math.floor(me*_e.height);v===void 0&&(v=M(fe,Ge));const Ce=T?M(fe,Ge):v;return Ce.width=fe,Ce.height=Ge,Ce.getContext("2d").drawImage(D,0,0,fe,Ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_e.width+"x"+_e.height+") to ("+fe+"x"+Ge+")."),Ce}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_e.width+"x"+_e.height+")."),D;return D}function y(D){return D.generateMipmaps}function _(D){s.generateMipmap(D)}function I(D){return D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?s.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function L(D,T,J,me,_e=!1){if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let fe=T;if(T===s.RED&&(J===s.FLOAT&&(fe=s.R32F),J===s.HALF_FLOAT&&(fe=s.R16F),J===s.UNSIGNED_BYTE&&(fe=s.R8)),T===s.RED_INTEGER&&(J===s.UNSIGNED_BYTE&&(fe=s.R8UI),J===s.UNSIGNED_SHORT&&(fe=s.R16UI),J===s.UNSIGNED_INT&&(fe=s.R32UI),J===s.BYTE&&(fe=s.R8I),J===s.SHORT&&(fe=s.R16I),J===s.INT&&(fe=s.R32I)),T===s.RG&&(J===s.FLOAT&&(fe=s.RG32F),J===s.HALF_FLOAT&&(fe=s.RG16F),J===s.UNSIGNED_BYTE&&(fe=s.RG8)),T===s.RG_INTEGER&&(J===s.UNSIGNED_BYTE&&(fe=s.RG8UI),J===s.UNSIGNED_SHORT&&(fe=s.RG16UI),J===s.UNSIGNED_INT&&(fe=s.RG32UI),J===s.BYTE&&(fe=s.RG8I),J===s.SHORT&&(fe=s.RG16I),J===s.INT&&(fe=s.RG32I)),T===s.RGB_INTEGER&&(J===s.UNSIGNED_BYTE&&(fe=s.RGB8UI),J===s.UNSIGNED_SHORT&&(fe=s.RGB16UI),J===s.UNSIGNED_INT&&(fe=s.RGB32UI),J===s.BYTE&&(fe=s.RGB8I),J===s.SHORT&&(fe=s.RGB16I),J===s.INT&&(fe=s.RGB32I)),T===s.RGBA_INTEGER&&(J===s.UNSIGNED_BYTE&&(fe=s.RGBA8UI),J===s.UNSIGNED_SHORT&&(fe=s.RGBA16UI),J===s.UNSIGNED_INT&&(fe=s.RGBA32UI),J===s.BYTE&&(fe=s.RGBA8I),J===s.SHORT&&(fe=s.RGBA16I),J===s.INT&&(fe=s.RGBA32I)),T===s.RGB&&J===s.UNSIGNED_INT_5_9_9_9_REV&&(fe=s.RGB9_E5),T===s.RGBA){const Ge=_e?ac:Tt.getTransfer(me);J===s.FLOAT&&(fe=s.RGBA32F),J===s.HALF_FLOAT&&(fe=s.RGBA16F),J===s.UNSIGNED_BYTE&&(fe=Ge===It?s.SRGB8_ALPHA8:s.RGBA8),J===s.UNSIGNED_SHORT_4_4_4_4&&(fe=s.RGBA4),J===s.UNSIGNED_SHORT_5_5_5_1&&(fe=s.RGB5_A1)}return(fe===s.R16F||fe===s.R32F||fe===s.RG16F||fe===s.RG32F||fe===s.RGBA16F||fe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function C(D,T){let J;return D?T===null||T===ts||T===io?J=s.DEPTH24_STENCIL8:T===Ri?J=s.DEPTH32F_STENCIL8:T===sa&&(J=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===ts||T===io?J=s.DEPTH_COMPONENT24:T===Ri?J=s.DEPTH_COMPONENT32F:T===sa&&(J=s.DEPTH_COMPONENT16),J}function W(D,T){return y(D)===!0||D.isFramebufferTexture&&D.minFilter!==qn&&D.minFilter!==Ai?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function O(D){const T=D.target;T.removeEventListener("dispose",O),k(T),T.isVideoTexture&&g.delete(T)}function U(D){const T=D.target;T.removeEventListener("dispose",U),R(T)}function k(D){const T=r.get(D);if(T.__webglInit===void 0)return;const J=D.source,me=x.get(J);if(me){const _e=me[T.__cacheKey];_e.usedTimes--,_e.usedTimes===0&&P(D),Object.keys(me).length===0&&x.delete(J)}r.remove(D)}function P(D){const T=r.get(D);s.deleteTexture(T.__webglTexture);const J=D.source,me=x.get(J);delete me[T.__cacheKey],u.memory.textures--}function R(D){const T=r.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),r.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let me=0;me<6;me++){if(Array.isArray(T.__webglFramebuffer[me]))for(let _e=0;_e<T.__webglFramebuffer[me].length;_e++)s.deleteFramebuffer(T.__webglFramebuffer[me][_e]);else s.deleteFramebuffer(T.__webglFramebuffer[me]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[me])}else{if(Array.isArray(T.__webglFramebuffer))for(let me=0;me<T.__webglFramebuffer.length;me++)s.deleteFramebuffer(T.__webglFramebuffer[me]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let me=0;me<T.__webglColorRenderbuffer.length;me++)T.__webglColorRenderbuffer[me]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[me]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const J=D.textures;for(let me=0,_e=J.length;me<_e;me++){const fe=r.get(J[me]);fe.__webglTexture&&(s.deleteTexture(fe.__webglTexture),u.memory.textures--),r.remove(J[me])}r.remove(D)}let H=0;function re(){H=0}function K(){const D=H;return D>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+a.maxTextures),H+=1,D}function le(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function de(D,T){const J=r.get(D);if(D.isVideoTexture&&Ze(D),D.isRenderTargetTexture===!1&&D.version>0&&J.__version!==D.version){const me=D.image;if(me===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(me.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(J,D,T);return}}t.bindTexture(s.TEXTURE_2D,J.__webglTexture,s.TEXTURE0+T)}function oe(D,T){const J=r.get(D);if(D.version>0&&J.__version!==D.version){Q(J,D,T);return}t.bindTexture(s.TEXTURE_2D_ARRAY,J.__webglTexture,s.TEXTURE0+T)}function ue(D,T){const J=r.get(D);if(D.version>0&&J.__version!==D.version){Q(J,D,T);return}t.bindTexture(s.TEXTURE_3D,J.__webglTexture,s.TEXTURE0+T)}function z(D,T){const J=r.get(D);if(D.version>0&&J.__version!==D.version){he(J,D,T);return}t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture,s.TEXTURE0+T)}const ce={[Fd]:s.REPEAT,[Qr]:s.CLAMP_TO_EDGE,[Od]:s.MIRRORED_REPEAT},ee={[qn]:s.NEAREST,[Z_]:s.NEAREST_MIPMAP_NEAREST,[vl]:s.NEAREST_MIPMAP_LINEAR,[Ai]:s.LINEAR,[qu]:s.LINEAR_MIPMAP_NEAREST,[Jr]:s.LINEAR_MIPMAP_LINEAR},F={[tx]:s.NEVER,[ax]:s.ALWAYS,[nx]:s.LESS,[Kg]:s.LEQUAL,[ix]:s.EQUAL,[ox]:s.GEQUAL,[rx]:s.GREATER,[sx]:s.NOTEQUAL};function se(D,T){if(T.type===Ri&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Ai||T.magFilter===qu||T.magFilter===vl||T.magFilter===Jr||T.minFilter===Ai||T.minFilter===qu||T.minFilter===vl||T.minFilter===Jr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(D,s.TEXTURE_WRAP_S,ce[T.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,ce[T.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,ce[T.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,ee[T.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,ee[T.minFilter]),T.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,F[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===qn||T.minFilter!==vl&&T.minFilter!==Jr||T.type===Ri&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||r.get(T).__currentAnisotropy){const J=e.get("EXT_texture_filter_anisotropic");s.texParameterf(D,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,a.getMaxAnisotropy())),r.get(T).__currentAnisotropy=T.anisotropy}}}function Ne(D,T){let J=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",O));const me=T.source;let _e=x.get(me);_e===void 0&&(_e={},x.set(me,_e));const fe=le(T);if(fe!==D.__cacheKey){_e[fe]===void 0&&(_e[fe]={texture:s.createTexture(),usedTimes:0},u.memory.textures++,J=!0),_e[fe].usedTimes++;const Ge=_e[D.__cacheKey];Ge!==void 0&&(_e[D.__cacheKey].usedTimes--,Ge.usedTimes===0&&P(T)),D.__cacheKey=fe,D.__webglTexture=_e[fe].texture}return J}function Q(D,T,J){let me=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(me=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(me=s.TEXTURE_3D);const _e=Ne(D,T),fe=T.source;t.bindTexture(me,D.__webglTexture,s.TEXTURE0+J);const Ge=r.get(fe);if(fe.version!==Ge.__version||_e===!0){t.activeTexture(s.TEXTURE0+J);const Ce=Tt.getPrimaries(Tt.workingColorSpace),Fe=T.colorSpace===Er?null:Tt.getPrimaries(T.colorSpace),ht=T.colorSpace===Er||Ce===Fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);let Me=w(T.image,!1,a.maxTextureSize);Me=Pt(T,Me);const ke=l.convert(T.format,T.colorSpace),et=l.convert(T.type);let tt=L(T.internalFormat,ke,et,T.colorSpace,T.isVideoTexture);se(me,T);let Be;const mt=T.mipmaps,ot=T.isVideoTexture!==!0,bt=Ge.__version===void 0||_e===!0,G=fe.dataReady,be=W(T,Me);if(T.isDepthTexture)tt=C(T.format===ro,T.type),bt&&(ot?t.texStorage2D(s.TEXTURE_2D,1,tt,Me.width,Me.height):t.texImage2D(s.TEXTURE_2D,0,tt,Me.width,Me.height,0,ke,et,null));else if(T.isDataTexture)if(mt.length>0){ot&&bt&&t.texStorage2D(s.TEXTURE_2D,be,tt,mt[0].width,mt[0].height);for(let ae=0,pe=mt.length;ae<pe;ae++)Be=mt[ae],ot?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,Be.width,Be.height,ke,et,Be.data):t.texImage2D(s.TEXTURE_2D,ae,tt,Be.width,Be.height,0,ke,et,Be.data);T.generateMipmaps=!1}else ot?(bt&&t.texStorage2D(s.TEXTURE_2D,be,tt,Me.width,Me.height),G&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Me.width,Me.height,ke,et,Me.data)):t.texImage2D(s.TEXTURE_2D,0,tt,Me.width,Me.height,0,ke,et,Me.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ot&&bt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,tt,mt[0].width,mt[0].height,Me.depth);for(let ae=0,pe=mt.length;ae<pe;ae++)if(Be=mt[ae],T.format!==mi)if(ke!==null)if(ot){if(G)if(T.layerUpdates.size>0){const De=hg(Be.width,Be.height,T.format,T.type);for(const Le of T.layerUpdates){const at=Be.data.subarray(Le*De/Be.data.BYTES_PER_ELEMENT,(Le+1)*De/Be.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,Le,Be.width,Be.height,1,ke,at)}T.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Be.width,Be.height,Me.depth,ke,Be.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ae,tt,Be.width,Be.height,Me.depth,0,Be.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?G&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ae,0,0,0,Be.width,Be.height,Me.depth,ke,et,Be.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ae,tt,Be.width,Be.height,Me.depth,0,ke,et,Be.data)}else{ot&&bt&&t.texStorage2D(s.TEXTURE_2D,be,tt,mt[0].width,mt[0].height);for(let ae=0,pe=mt.length;ae<pe;ae++)Be=mt[ae],T.format!==mi?ke!==null?ot?G&&t.compressedTexSubImage2D(s.TEXTURE_2D,ae,0,0,Be.width,Be.height,ke,Be.data):t.compressedTexImage2D(s.TEXTURE_2D,ae,tt,Be.width,Be.height,0,Be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,Be.width,Be.height,ke,et,Be.data):t.texImage2D(s.TEXTURE_2D,ae,tt,Be.width,Be.height,0,ke,et,Be.data)}else if(T.isDataArrayTexture)if(ot){if(bt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,tt,Me.width,Me.height,Me.depth),G)if(T.layerUpdates.size>0){const ae=hg(Me.width,Me.height,T.format,T.type);for(const pe of T.layerUpdates){const De=Me.data.subarray(pe*ae/Me.data.BYTES_PER_ELEMENT,(pe+1)*ae/Me.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,pe,Me.width,Me.height,1,ke,et,De)}T.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Me.width,Me.height,Me.depth,ke,et,Me.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,tt,Me.width,Me.height,Me.depth,0,ke,et,Me.data);else if(T.isData3DTexture)ot?(bt&&t.texStorage3D(s.TEXTURE_3D,be,tt,Me.width,Me.height,Me.depth),G&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Me.width,Me.height,Me.depth,ke,et,Me.data)):t.texImage3D(s.TEXTURE_3D,0,tt,Me.width,Me.height,Me.depth,0,ke,et,Me.data);else if(T.isFramebufferTexture){if(bt)if(ot)t.texStorage2D(s.TEXTURE_2D,be,tt,Me.width,Me.height);else{let ae=Me.width,pe=Me.height;for(let De=0;De<be;De++)t.texImage2D(s.TEXTURE_2D,De,tt,ae,pe,0,ke,et,null),ae>>=1,pe>>=1}}else if(mt.length>0){if(ot&&bt){const ae=Ye(mt[0]);t.texStorage2D(s.TEXTURE_2D,be,tt,ae.width,ae.height)}for(let ae=0,pe=mt.length;ae<pe;ae++)Be=mt[ae],ot?G&&t.texSubImage2D(s.TEXTURE_2D,ae,0,0,ke,et,Be):t.texImage2D(s.TEXTURE_2D,ae,tt,ke,et,Be);T.generateMipmaps=!1}else if(ot){if(bt){const ae=Ye(Me);t.texStorage2D(s.TEXTURE_2D,be,tt,ae.width,ae.height)}G&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ke,et,Me)}else t.texImage2D(s.TEXTURE_2D,0,tt,ke,et,Me);y(T)&&_(me),Ge.__version=fe.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function he(D,T,J){if(T.image.length!==6)return;const me=Ne(D,T),_e=T.source;t.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+J);const fe=r.get(_e);if(_e.version!==fe.__version||me===!0){t.activeTexture(s.TEXTURE0+J);const Ge=Tt.getPrimaries(Tt.workingColorSpace),Ce=T.colorSpace===Er?null:Tt.getPrimaries(T.colorSpace),Fe=T.colorSpace===Er||Ge===Ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);const ht=T.isCompressedTexture||T.image[0].isCompressedTexture,Me=T.image[0]&&T.image[0].isDataTexture,ke=[];for(let pe=0;pe<6;pe++)!ht&&!Me?ke[pe]=w(T.image[pe],!0,a.maxCubemapSize):ke[pe]=Me?T.image[pe].image:T.image[pe],ke[pe]=Pt(T,ke[pe]);const et=ke[0],tt=l.convert(T.format,T.colorSpace),Be=l.convert(T.type),mt=L(T.internalFormat,tt,Be,T.colorSpace),ot=T.isVideoTexture!==!0,bt=fe.__version===void 0||me===!0,G=_e.dataReady;let be=W(T,et);se(s.TEXTURE_CUBE_MAP,T);let ae;if(ht){ot&&bt&&t.texStorage2D(s.TEXTURE_CUBE_MAP,be,mt,et.width,et.height);for(let pe=0;pe<6;pe++){ae=ke[pe].mipmaps;for(let De=0;De<ae.length;De++){const Le=ae[De];T.format!==mi?tt!==null?ot?G&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,0,0,Le.width,Le.height,tt,Le.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,mt,Le.width,Le.height,0,Le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ot?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,0,0,Le.width,Le.height,tt,Be,Le.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De,mt,Le.width,Le.height,0,tt,Be,Le.data)}}}else{if(ae=T.mipmaps,ot&&bt){ae.length>0&&be++;const pe=Ye(ke[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,be,mt,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(Me){ot?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ke[pe].width,ke[pe].height,tt,Be,ke[pe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,mt,ke[pe].width,ke[pe].height,0,tt,Be,ke[pe].data);for(let De=0;De<ae.length;De++){const at=ae[De].image[pe].image;ot?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,0,0,at.width,at.height,tt,Be,at.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,mt,at.width,at.height,0,tt,Be,at.data)}}else{ot?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,tt,Be,ke[pe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,mt,tt,Be,ke[pe]);for(let De=0;De<ae.length;De++){const Le=ae[De];ot?G&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,0,0,tt,Be,Le.image[pe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+pe,De+1,mt,tt,Be,Le.image[pe])}}}y(T)&&_(s.TEXTURE_CUBE_MAP),fe.__version=_e.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function Se(D,T,J,me,_e,fe){const Ge=l.convert(J.format,J.colorSpace),Ce=l.convert(J.type),Fe=L(J.internalFormat,Ge,Ce,J.colorSpace),ht=r.get(T),Me=r.get(J);if(Me.__renderTarget=T,!ht.__hasExternalTextures){const ke=Math.max(1,T.width>>fe),et=Math.max(1,T.height>>fe);_e===s.TEXTURE_3D||_e===s.TEXTURE_2D_ARRAY?t.texImage3D(_e,fe,Fe,ke,et,T.depth,0,Ge,Ce,null):t.texImage2D(_e,fe,Fe,ke,et,0,Ge,Ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,D),lt(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,_e,Me.__webglTexture,0,$e(T)):(_e===s.TEXTURE_2D||_e>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&_e<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,me,_e,Me.__webglTexture,fe),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ve(D,T,J){if(s.bindRenderbuffer(s.RENDERBUFFER,D),T.depthBuffer){const me=T.depthTexture,_e=me&&me.isDepthTexture?me.type:null,fe=C(T.stencilBuffer,_e),Ge=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ce=$e(T);lt(T)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ce,fe,T.width,T.height):J?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ce,fe,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,fe,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ge,s.RENDERBUFFER,D)}else{const me=T.textures;for(let _e=0;_e<me.length;_e++){const fe=me[_e],Ge=l.convert(fe.format,fe.colorSpace),Ce=l.convert(fe.type),Fe=L(fe.internalFormat,Ge,Ce,fe.colorSpace),ht=$e(T);J&&lt(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ht,Fe,T.width,T.height):lt(T)?d.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ht,Fe,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Fe,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Re(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const me=r.get(T.depthTexture);me.__renderTarget=T,(!me.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),de(T.depthTexture,0);const _e=me.__webglTexture,fe=$e(T);if(T.depthTexture.format===qs)lt(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,_e,0,fe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,_e,0);else if(T.depthTexture.format===ro)lt(T)?d.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,_e,0,fe):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,_e,0);else throw new Error("Unknown depthTexture format")}function Ue(D){const T=r.get(D),J=D.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==D.depthTexture){const me=D.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),me){const _e=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,me.removeEventListener("dispose",_e)};me.addEventListener("dispose",_e),T.__depthDisposeCallback=_e}T.__boundDepthTexture=me}if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");Re(T.__webglFramebuffer,D)}else if(J){T.__webglDepthbuffer=[];for(let me=0;me<6;me++)if(t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[me]),T.__webglDepthbuffer[me]===void 0)T.__webglDepthbuffer[me]=s.createRenderbuffer(),ve(T.__webglDepthbuffer[me],D,!1);else{const _e=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,fe=T.__webglDepthbuffer[me];s.bindRenderbuffer(s.RENDERBUFFER,fe),s.framebufferRenderbuffer(s.FRAMEBUFFER,_e,s.RENDERBUFFER,fe)}}else if(t.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=s.createRenderbuffer(),ve(T.__webglDepthbuffer,D,!1);else{const me=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_e=T.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,_e),s.framebufferRenderbuffer(s.FRAMEBUFFER,me,s.RENDERBUFFER,_e)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ke(D,T,J){const me=r.get(D);T!==void 0&&Se(me.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),J!==void 0&&Ue(D)}function St(D){const T=D.texture,J=r.get(D),me=r.get(T);D.addEventListener("dispose",U);const _e=D.textures,fe=D.isWebGLCubeRenderTarget===!0,Ge=_e.length>1;if(Ge||(me.__webglTexture===void 0&&(me.__webglTexture=s.createTexture()),me.__version=T.version,u.memory.textures++),fe){J.__webglFramebuffer=[];for(let Ce=0;Ce<6;Ce++)if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer[Ce]=[];for(let Fe=0;Fe<T.mipmaps.length;Fe++)J.__webglFramebuffer[Ce][Fe]=s.createFramebuffer()}else J.__webglFramebuffer[Ce]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){J.__webglFramebuffer=[];for(let Ce=0;Ce<T.mipmaps.length;Ce++)J.__webglFramebuffer[Ce]=s.createFramebuffer()}else J.__webglFramebuffer=s.createFramebuffer();if(Ge)for(let Ce=0,Fe=_e.length;Ce<Fe;Ce++){const ht=r.get(_e[Ce]);ht.__webglTexture===void 0&&(ht.__webglTexture=s.createTexture(),u.memory.textures++)}if(D.samples>0&&lt(D)===!1){J.__webglMultisampledFramebuffer=s.createFramebuffer(),J.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Ce=0;Ce<_e.length;Ce++){const Fe=_e[Ce];J.__webglColorRenderbuffer[Ce]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,J.__webglColorRenderbuffer[Ce]);const ht=l.convert(Fe.format,Fe.colorSpace),Me=l.convert(Fe.type),ke=L(Fe.internalFormat,ht,Me,Fe.colorSpace,D.isXRRenderTarget===!0),et=$e(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,et,ke,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,J.__webglColorRenderbuffer[Ce])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(J.__webglDepthRenderbuffer=s.createRenderbuffer(),ve(J.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(fe){t.bindTexture(s.TEXTURE_CUBE_MAP,me.__webglTexture),se(s.TEXTURE_CUBE_MAP,T);for(let Ce=0;Ce<6;Ce++)if(T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)Se(J.__webglFramebuffer[Ce][Fe],D,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,Fe);else Se(J.__webglFramebuffer[Ce],D,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Ce,0);y(T)&&_(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ge){for(let Ce=0,Fe=_e.length;Ce<Fe;Ce++){const ht=_e[Ce],Me=r.get(ht);t.bindTexture(s.TEXTURE_2D,Me.__webglTexture),se(s.TEXTURE_2D,ht),Se(J.__webglFramebuffer,D,ht,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,0),y(ht)&&_(s.TEXTURE_2D)}t.unbindTexture()}else{let Ce=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ce=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ce,me.__webglTexture),se(Ce,T),T.mipmaps&&T.mipmaps.length>0)for(let Fe=0;Fe<T.mipmaps.length;Fe++)Se(J.__webglFramebuffer[Fe],D,T,s.COLOR_ATTACHMENT0,Ce,Fe);else Se(J.__webglFramebuffer,D,T,s.COLOR_ATTACHMENT0,Ce,0);y(T)&&_(Ce),t.unbindTexture()}D.depthBuffer&&Ue(D)}function pt(D){const T=D.textures;for(let J=0,me=T.length;J<me;J++){const _e=T[J];if(y(_e)){const fe=I(D),Ge=r.get(_e).__webglTexture;t.bindTexture(fe,Ge),_(fe),t.unbindTexture()}}}const Dt=[],q=[];function st(D){if(D.samples>0){if(lt(D)===!1){const T=D.textures,J=D.width,me=D.height;let _e=s.COLOR_BUFFER_BIT;const fe=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ge=r.get(D),Ce=T.length>1;if(Ce)for(let Fe=0;Fe<T.length;Fe++)t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ge.__webglFramebuffer);for(let Fe=0;Fe<T.length;Fe++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(_e|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(_e|=s.STENCIL_BUFFER_BIT)),Ce){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ge.__webglColorRenderbuffer[Fe]);const ht=r.get(T[Fe]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ht,0)}s.blitFramebuffer(0,0,J,me,0,0,J,me,_e,s.NEAREST),f===!0&&(Dt.length=0,q.length=0,Dt.push(s.COLOR_ATTACHMENT0+Fe),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Dt.push(fe),q.push(fe),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,q)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Dt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ce)for(let Fe=0;Fe<T.length;Fe++){t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.RENDERBUFFER,Ge.__webglColorRenderbuffer[Fe]);const ht=r.get(T[Fe]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ge.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Fe,s.TEXTURE_2D,ht,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ge.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&f){const T=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[T])}}}function $e(D){return Math.min(a.maxSamples,D.samples)}function lt(D){const T=r.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Ze(D){const T=u.render.frame;g.get(D)!==T&&(g.set(D,T),D.update())}function Pt(D,T){const J=D.colorSpace,me=D.format,_e=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||J!==ao&&J!==Er&&(Tt.getTransfer(J)===It?(me!==mi||_e!==$i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),T}function Ye(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(p.width=D.naturalWidth||D.width,p.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(p.width=D.displayWidth,p.height=D.displayHeight):(p.width=D.width,p.height=D.height),p}this.allocateTextureUnit=K,this.resetTextureUnits=re,this.setTexture2D=de,this.setTexture2DArray=oe,this.setTexture3D=ue,this.setTextureCube=z,this.rebindTextures=Ke,this.setupRenderTarget=St,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=lt}function A1(s,e){function t(r,a=Er){let l;const u=Tt.getTransfer(a);if(r===$i)return s.UNSIGNED_BYTE;if(r===_h)return s.UNSIGNED_SHORT_4_4_4_4;if(r===xh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Vg)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===zg)return s.BYTE;if(r===Hg)return s.SHORT;if(r===sa)return s.UNSIGNED_SHORT;if(r===vh)return s.INT;if(r===ts)return s.UNSIGNED_INT;if(r===Ri)return s.FLOAT;if(r===la)return s.HALF_FLOAT;if(r===Gg)return s.ALPHA;if(r===Wg)return s.RGB;if(r===mi)return s.RGBA;if(r===jg)return s.LUMINANCE;if(r===Xg)return s.LUMINANCE_ALPHA;if(r===qs)return s.DEPTH_COMPONENT;if(r===ro)return s.DEPTH_STENCIL;if(r===yh)return s.RED;if(r===Sh)return s.RED_INTEGER;if(r===qg)return s.RG;if(r===Mh)return s.RG_INTEGER;if(r===Eh)return s.RGBA_INTEGER;if(r===ql||r===Yl||r===$l||r===Kl)if(u===It)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===ql)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Yl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===$l)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Kl)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===ql)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Yl)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===$l)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Kl)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===kd||r===Bd||r===zd||r===Hd)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===kd)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Bd)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===zd)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Hd)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Vd||r===Gd||r===Wd)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===Vd||r===Gd)return u===It?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===Wd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===jd||r===Xd||r===qd||r===Yd||r===$d||r===Kd||r===Zd||r===Qd||r===Jd||r===eh||r===th||r===nh||r===ih||r===rh)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===jd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Xd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===qd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Yd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===$d)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Kd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Zd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Qd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Jd)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===eh)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===th)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===nh)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ih)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===rh)return u===It?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Zl||r===sh||r===oh)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Zl)return u===It?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===sh)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===oh)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Yg||r===ah||r===lh||r===ch)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Zl)return l.COMPRESSED_RED_RGTC1_EXT;if(r===ah)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===lh)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ch)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===io?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}class R1 extends Xn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class tn extends Kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const C1={type:"move"};class yd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,l=null,u=null;const d=this._targetRay,f=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){u=!0;for(const w of e.hand.values()){const y=t.getJointPose(w,r),_=this._getHandJoint(p,w);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const g=p.joints["index-finger-tip"],v=p.joints["thumb-tip"],x=g.position.distanceTo(v.position),S=.02,M=.005;p.inputState.pinching&&x>S+M?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&x<=S-M&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else f!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(f.matrix.fromArray(l.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,l.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(l.linearVelocity)):f.hasLinearVelocity=!1,l.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(l.angularVelocity)):f.hasAngularVelocity=!1));d!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(C1)))}return d!==null&&(d.visible=a!==null),f!==null&&(f.visible=l!==null),p!==null&&(p.visible=u!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new tn;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const b1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,P1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class L1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const a=new Cn,l=e.properties.get(a);l.__webglTexture=t.texture,(t.depthNear!=r.depthNear||t.depthFar!=r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=a}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new Rr({vertexShader:b1,fragmentShader:P1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zt(new ca(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class D1 extends lo{constructor(e,t){super();const r=this;let a=null,l=1,u=null,d="local-floor",f=1,p=null,g=null,v=null,x=null,S=null,M=null;const w=new L1,y=t.getContextAttributes();let _=null,I=null;const L=[],C=[],W=new Mt;let O=null;const U=new Xn;U.viewport=new Xt;const k=new Xn;k.viewport=new Xt;const P=[U,k],R=new R1;let H=null,re=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let he=L[Q];return he===void 0&&(he=new yd,L[Q]=he),he.getTargetRaySpace()},this.getControllerGrip=function(Q){let he=L[Q];return he===void 0&&(he=new yd,L[Q]=he),he.getGripSpace()},this.getHand=function(Q){let he=L[Q];return he===void 0&&(he=new yd,L[Q]=he),he.getHandSpace()};function K(Q){const he=C.indexOf(Q.inputSource);if(he===-1)return;const Se=L[he];Se!==void 0&&(Se.update(Q.inputSource,Q.frame,p||u),Se.dispatchEvent({type:Q.type,data:Q.inputSource}))}function le(){a.removeEventListener("select",K),a.removeEventListener("selectstart",K),a.removeEventListener("selectend",K),a.removeEventListener("squeeze",K),a.removeEventListener("squeezestart",K),a.removeEventListener("squeezeend",K),a.removeEventListener("end",le),a.removeEventListener("inputsourceschange",de);for(let Q=0;Q<L.length;Q++){const he=C[Q];he!==null&&(C[Q]=null,L[Q].disconnect(he))}H=null,re=null,w.reset(),e.setRenderTarget(_),S=null,x=null,v=null,a=null,I=null,Ne.stop(),r.isPresenting=!1,e.setPixelRatio(O),e.setSize(W.width,W.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){l=Q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){d=Q,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||u},this.setReferenceSpace=function(Q){p=Q},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return v},this.getFrame=function(){return M},this.getSession=function(){return a},this.setSession=async function(Q){if(a=Q,a!==null){if(_=e.getRenderTarget(),a.addEventListener("select",K),a.addEventListener("selectstart",K),a.addEventListener("selectend",K),a.addEventListener("squeeze",K),a.addEventListener("squeezestart",K),a.addEventListener("squeezeend",K),a.addEventListener("end",le),a.addEventListener("inputsourceschange",de),y.xrCompatible!==!0&&await t.makeXRCompatible(),O=e.getPixelRatio(),e.getSize(W),a.renderState.layers===void 0){const he={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,t,he),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),I=new ns(S.framebufferWidth,S.framebufferHeight,{format:mi,type:$i,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil})}else{let he=null,Se=null,ve=null;y.depth&&(ve=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=y.stencil?ro:qs,Se=y.stencil?io:ts);const Re={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:l};v=new XRWebGLBinding(a,t),x=v.createProjectionLayer(Re),a.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),I=new ns(x.textureWidth,x.textureHeight,{format:mi,type:$i,depthTexture:new l0(x.textureWidth,x.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(f),p=null,u=await a.requestReferenceSpace(d),Ne.setContext(a),Ne.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function de(Q){for(let he=0;he<Q.removed.length;he++){const Se=Q.removed[he],ve=C.indexOf(Se);ve>=0&&(C[ve]=null,L[ve].disconnect(Se))}for(let he=0;he<Q.added.length;he++){const Se=Q.added[he];let ve=C.indexOf(Se);if(ve===-1){for(let Ue=0;Ue<L.length;Ue++)if(Ue>=C.length){C.push(Se),ve=Ue;break}else if(C[Ue]===null){C[Ue]=Se,ve=Ue;break}if(ve===-1)break}const Re=L[ve];Re&&Re.connect(Se)}}const oe=new j,ue=new j;function z(Q,he,Se){oe.setFromMatrixPosition(he.matrixWorld),ue.setFromMatrixPosition(Se.matrixWorld);const ve=oe.distanceTo(ue),Re=he.projectionMatrix.elements,Ue=Se.projectionMatrix.elements,Ke=Re[14]/(Re[10]-1),St=Re[14]/(Re[10]+1),pt=(Re[9]+1)/Re[5],Dt=(Re[9]-1)/Re[5],q=(Re[8]-1)/Re[0],st=(Ue[8]+1)/Ue[0],$e=Ke*q,lt=Ke*st,Ze=ve/(-q+st),Pt=Ze*-q;if(he.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Pt),Q.translateZ(Ze),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Re[10]===-1)Q.projectionMatrix.copy(he.projectionMatrix),Q.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{const Ye=Ke+Ze,D=St+Ze,T=$e-Pt,J=lt+(ve-Pt),me=pt*St/D*Ye,_e=Dt*St/D*Ye;Q.projectionMatrix.makePerspective(T,J,me,_e,Ye,D),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ce(Q,he){he===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(he.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(a===null)return;let he=Q.near,Se=Q.far;w.texture!==null&&(w.depthNear>0&&(he=w.depthNear),w.depthFar>0&&(Se=w.depthFar)),R.near=k.near=U.near=he,R.far=k.far=U.far=Se,(H!==R.near||re!==R.far)&&(a.updateRenderState({depthNear:R.near,depthFar:R.far}),H=R.near,re=R.far),U.layers.mask=Q.layers.mask|2,k.layers.mask=Q.layers.mask|4,R.layers.mask=U.layers.mask|k.layers.mask;const ve=Q.parent,Re=R.cameras;ce(R,ve);for(let Ue=0;Ue<Re.length;Ue++)ce(Re[Ue],ve);Re.length===2?z(R,U,k):R.projectionMatrix.copy(U.projectionMatrix),ee(Q,R,ve)};function ee(Q,he,Se){Se===null?Q.matrix.copy(he.matrixWorld):(Q.matrix.copy(Se.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(he.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(he.projectionMatrix),Q.projectionMatrixInverse.copy(he.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=so*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(x===null&&S===null))return f},this.setFoveation=function(Q){f=Q,x!==null&&(x.fixedFoveation=Q),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=Q)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(R)};let F=null;function se(Q,he){if(g=he.getViewerPose(p||u),M=he,g!==null){const Se=g.views;S!==null&&(e.setRenderTargetFramebuffer(I,S.framebuffer),e.setRenderTarget(I));let ve=!1;Se.length!==R.cameras.length&&(R.cameras.length=0,ve=!0);for(let Ue=0;Ue<Se.length;Ue++){const Ke=Se[Ue];let St=null;if(S!==null)St=S.getViewport(Ke);else{const Dt=v.getViewSubImage(x,Ke);St=Dt.viewport,Ue===0&&(e.setRenderTargetTextures(I,Dt.colorTexture,x.ignoreDepthValues?void 0:Dt.depthStencilTexture),e.setRenderTarget(I))}let pt=P[Ue];pt===void 0&&(pt=new Xn,pt.layers.enable(Ue),pt.viewport=new Xt,P[Ue]=pt),pt.matrix.fromArray(Ke.transform.matrix),pt.matrix.decompose(pt.position,pt.quaternion,pt.scale),pt.projectionMatrix.fromArray(Ke.projectionMatrix),pt.projectionMatrixInverse.copy(pt.projectionMatrix).invert(),pt.viewport.set(St.x,St.y,St.width,St.height),Ue===0&&(R.matrix.copy(pt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),ve===!0&&R.cameras.push(pt)}const Re=a.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const Ue=v.getDepthInformation(Se[0]);Ue&&Ue.isValid&&Ue.texture&&w.init(e,Ue,a.renderState)}}for(let Se=0;Se<L.length;Se++){const ve=C[Se],Re=L[Se];ve!==null&&Re!==void 0&&Re.update(ve,he,p||u)}F&&F(Q,he),he.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:he}),M=null}const Ne=new o0;Ne.setAnimationLoop(se),this.setAnimationLoop=function(Q){F=Q},this.dispose=function(){}}}const qr=new vi,I1=new xt;function N1(s,e){function t(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function r(y,_){_.color.getRGB(y.fogColor.value,i0(s)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function a(y,_,I,L,C){_.isMeshBasicMaterial||_.isMeshLambertMaterial?l(y,_):_.isMeshToonMaterial?(l(y,_),v(y,_)):_.isMeshPhongMaterial?(l(y,_),g(y,_)):_.isMeshStandardMaterial?(l(y,_),x(y,_),_.isMeshPhysicalMaterial&&S(y,_,C)):_.isMeshMatcapMaterial?(l(y,_),M(y,_)):_.isMeshDepthMaterial?l(y,_):_.isMeshDistanceMaterial?(l(y,_),w(y,_)):_.isMeshNormalMaterial?l(y,_):_.isLineBasicMaterial?(u(y,_),_.isLineDashedMaterial&&d(y,_)):_.isPointsMaterial?f(y,_,I,L):_.isSpriteMaterial?p(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function l(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,t(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,t(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,t(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===On&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,t(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===On&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,t(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,t(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,t(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const I=e.get(_),L=I.envMap,C=I.envMapRotation;L&&(y.envMap.value=L,qr.copy(C),qr.x*=-1,qr.y*=-1,qr.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),y.envMapRotation.value.setFromMatrix4(I1.makeRotationFromEuler(qr)),y.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,t(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,t(_.aoMap,y.aoMapTransform))}function u(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,t(_.map,y.mapTransform))}function d(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function f(y,_,I,L){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*I,y.scale.value=L*.5,_.map&&(y.map.value=_.map,t(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,t(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function p(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,t(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,t(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function g(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function v(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function x(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,t(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,t(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function S(y,_,I){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,t(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,t(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,t(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,t(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,t(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===On&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,t(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,t(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=I.texture,y.transmissionSamplerSize.value.set(I.width,I.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,t(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,t(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,t(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,t(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,t(_.specularIntensityMap,y.specularIntensityMapTransform))}function M(y,_){_.matcap&&(y.matcap.value=_.matcap)}function w(y,_){const I=e.get(_).light;y.referencePosition.value.setFromMatrixPosition(I.matrixWorld),y.nearDistance.value=I.shadow.camera.near,y.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function U1(s,e,t,r){let a={},l={},u=[];const d=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function f(I,L){const C=L.program;r.uniformBlockBinding(I,C)}function p(I,L){let C=a[I.id];C===void 0&&(M(I),C=g(I),a[I.id]=C,I.addEventListener("dispose",y));const W=L.program;r.updateUBOMapping(I,W);const O=e.render.frame;l[I.id]!==O&&(x(I),l[I.id]=O)}function g(I){const L=v();I.__bindingPointIndex=L;const C=s.createBuffer(),W=I.__size,O=I.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,W,O),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,L,C),C}function v(){for(let I=0;I<d;I++)if(u.indexOf(I)===-1)return u.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const L=a[I.id],C=I.uniforms,W=I.__cache;s.bindBuffer(s.UNIFORM_BUFFER,L);for(let O=0,U=C.length;O<U;O++){const k=Array.isArray(C[O])?C[O]:[C[O]];for(let P=0,R=k.length;P<R;P++){const H=k[P];if(S(H,O,P,W)===!0){const re=H.__offset,K=Array.isArray(H.value)?H.value:[H.value];let le=0;for(let de=0;de<K.length;de++){const oe=K[de],ue=w(oe);typeof oe=="number"||typeof oe=="boolean"?(H.__data[0]=oe,s.bufferSubData(s.UNIFORM_BUFFER,re+le,H.__data)):oe.isMatrix3?(H.__data[0]=oe.elements[0],H.__data[1]=oe.elements[1],H.__data[2]=oe.elements[2],H.__data[3]=0,H.__data[4]=oe.elements[3],H.__data[5]=oe.elements[4],H.__data[6]=oe.elements[5],H.__data[7]=0,H.__data[8]=oe.elements[6],H.__data[9]=oe.elements[7],H.__data[10]=oe.elements[8],H.__data[11]=0):(oe.toArray(H.__data,le),le+=ue.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,re,H.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(I,L,C,W){const O=I.value,U=L+"_"+C;if(W[U]===void 0)return typeof O=="number"||typeof O=="boolean"?W[U]=O:W[U]=O.clone(),!0;{const k=W[U];if(typeof O=="number"||typeof O=="boolean"){if(k!==O)return W[U]=O,!0}else if(k.equals(O)===!1)return k.copy(O),!0}return!1}function M(I){const L=I.uniforms;let C=0;const W=16;for(let U=0,k=L.length;U<k;U++){const P=Array.isArray(L[U])?L[U]:[L[U]];for(let R=0,H=P.length;R<H;R++){const re=P[R],K=Array.isArray(re.value)?re.value:[re.value];for(let le=0,de=K.length;le<de;le++){const oe=K[le],ue=w(oe),z=C%W,ce=z%ue.boundary,ee=z+ce;C+=ce,ee!==0&&W-ee<ue.storage&&(C+=W-ee),re.__data=new Float32Array(ue.storage/Float32Array.BYTES_PER_ELEMENT),re.__offset=C,C+=ue.storage}}}const O=C%W;return O>0&&(C+=W-O),I.__size=C,I.__cache={},this}function w(I){const L={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(L.boundary=4,L.storage=4):I.isVector2?(L.boundary=8,L.storage=8):I.isVector3||I.isColor?(L.boundary=16,L.storage=12):I.isVector4?(L.boundary=16,L.storage=16):I.isMatrix3?(L.boundary=48,L.storage=48):I.isMatrix4?(L.boundary=64,L.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),L}function y(I){const L=I.target;L.removeEventListener("dispose",y);const C=u.indexOf(L.__bindingPointIndex);u.splice(C,1),s.deleteBuffer(a[L.id]),delete a[L.id],delete l[L.id]}function _(){for(const I in a)s.deleteBuffer(a[I]);u=[],a={},l={}}return{bind:f,update:p,dispose:_}}class F1{constructor(e={}){const{canvas:t=wx(),context:r=null,depth:a=!0,stencil:l=!1,alpha:u=!1,antialias:d=!1,premultipliedAlpha:f=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:v=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=r.getContextAttributes().alpha}else S=u;const M=new Uint32Array(4),w=new Int32Array(4);let y=null,_=null;const I=[],L=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jn,this.toneMapping=Tr,this.toneMappingExposure=1;const C=this;let W=!1,O=0,U=0,k=null,P=-1,R=null;const H=new Xt,re=new Xt;let K=null;const le=new vt(0);let de=0,oe=t.width,ue=t.height,z=1,ce=null,ee=null;const F=new Xt(0,0,oe,ue),se=new Xt(0,0,oe,ue);let Ne=!1;const Q=new Rh;let he=!1,Se=!1;const ve=new xt,Re=new xt,Ue=new j,Ke=new Xt,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Dt(){return k===null?z:1}let q=r;function st(A,X){return t.getContext(A,X)}try{const A={alpha:!0,depth:a,stencil:l,antialias:d,premultipliedAlpha:f,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:v};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${gh}`),t.addEventListener("webglcontextlost",pe,!1),t.addEventListener("webglcontextrestored",De,!1),t.addEventListener("webglcontextcreationerror",Le,!1),q===null){const X="webgl2";if(q=st(X,A),q===null)throw st(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let $e,lt,Ze,Pt,Ye,D,T,J,me,_e,fe,Ge,Ce,Fe,ht,Me,ke,et,tt,Be,mt,ot,bt,G;function be(){$e=new HM(q),$e.init(),ot=new A1(q,$e),lt=new UM(q,$e,e,ot),Ze=new E1(q,$e),lt.reverseDepthBuffer&&x&&Ze.buffers.depth.setReversed(!0),Pt=new WM(q),Ye=new l1,D=new T1(q,$e,Ze,Ye,lt,ot,Pt),T=new OM(C),J=new zM(C),me=new Zx(q),bt=new IM(q,me),_e=new VM(q,me,Pt,bt),fe=new XM(q,_e,me,Pt),tt=new jM(q,lt,D),Me=new FM(Ye),Ge=new a1(C,T,J,$e,lt,bt,Me),Ce=new N1(C,Ye),Fe=new u1,ht=new g1($e),et=new DM(C,T,J,Ze,fe,S,f),ke=new S1(C,fe,lt),G=new U1(q,Pt,lt,Ze),Be=new NM(q,$e,Pt),mt=new GM(q,$e,Pt),Pt.programs=Ge.programs,C.capabilities=lt,C.extensions=$e,C.properties=Ye,C.renderLists=Fe,C.shadowMap=ke,C.state=Ze,C.info=Pt}be();const ae=new D1(C,q);this.xr=ae,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const A=$e.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=$e.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(A){A!==void 0&&(z=A,this.setSize(oe,ue,!1))},this.getSize=function(A){return A.set(oe,ue)},this.setSize=function(A,X,ne=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}oe=A,ue=X,t.width=Math.floor(A*z),t.height=Math.floor(X*z),ne===!0&&(t.style.width=A+"px",t.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(oe*z,ue*z).floor()},this.setDrawingBufferSize=function(A,X,ne){oe=A,ue=X,z=ne,t.width=Math.floor(A*ne),t.height=Math.floor(X*ne),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(H)},this.getViewport=function(A){return A.copy(F)},this.setViewport=function(A,X,ne,ie){A.isVector4?F.set(A.x,A.y,A.z,A.w):F.set(A,X,ne,ie),Ze.viewport(H.copy(F).multiplyScalar(z).round())},this.getScissor=function(A){return A.copy(se)},this.setScissor=function(A,X,ne,ie){A.isVector4?se.set(A.x,A.y,A.z,A.w):se.set(A,X,ne,ie),Ze.scissor(re.copy(se).multiplyScalar(z).round())},this.getScissorTest=function(){return Ne},this.setScissorTest=function(A){Ze.setScissorTest(Ne=A)},this.setOpaqueSort=function(A){ce=A},this.setTransparentSort=function(A){ee=A},this.getClearColor=function(A){return A.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(A=!0,X=!0,ne=!0){let ie=0;if(A){let Y=!1;if(k!==null){const Ae=k.texture.format;Y=Ae===Eh||Ae===Mh||Ae===Sh}if(Y){const Ae=k.texture.type,Ee=Ae===$i||Ae===ts||Ae===sa||Ae===io||Ae===_h||Ae===xh,We=et.getClearColor(),He=et.getClearAlpha(),nt=We.r,rt=We.g,je=We.b;Ee?(M[0]=nt,M[1]=rt,M[2]=je,M[3]=He,q.clearBufferuiv(q.COLOR,0,M)):(w[0]=nt,w[1]=rt,w[2]=je,w[3]=He,q.clearBufferiv(q.COLOR,0,w))}else ie|=q.COLOR_BUFFER_BIT}X&&(ie|=q.DEPTH_BUFFER_BIT),ne&&(ie|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear(ie)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",pe,!1),t.removeEventListener("webglcontextrestored",De,!1),t.removeEventListener("webglcontextcreationerror",Le,!1),Fe.dispose(),ht.dispose(),Ye.dispose(),T.dispose(),J.dispose(),fe.dispose(),bt.dispose(),G.dispose(),Ge.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",ss),ae.removeEventListener("sessionend",Ki),bi.stop()};function pe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),W=!0}function De(){console.log("THREE.WebGLRenderer: Context Restored."),W=!1;const A=Pt.autoReset,X=ke.enabled,ne=ke.autoUpdate,ie=ke.needsUpdate,Y=ke.type;be(),Pt.autoReset=A,ke.enabled=X,ke.autoUpdate=ne,ke.needsUpdate=ie,ke.type=Y}function Le(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function at(A){const X=A.target;X.removeEventListener("dispose",at),Ft(X)}function Ft(A){Zt(A),Ye.remove(A)}function Zt(A){const X=Ye.get(A).programs;X!==void 0&&(X.forEach(function(ne){Ge.releaseProgram(ne)}),A.isShaderMaterial&&Ge.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,ne,ie,Y,Ae){X===null&&(X=St);const Ee=Y.isMesh&&Y.matrixWorld.determinant()<0,We=ha(A,X,ne,ie,Y);Ze.setMaterial(ie,Ee);let He=ne.index,nt=1;if(ie.wireframe===!0){if(He=_e.getWireframeAttribute(ne),He===void 0)return;nt=2}const rt=ne.drawRange,je=ne.attributes.position;let yt=rt.start*nt,Ct=(rt.start+rt.count)*nt;Ae!==null&&(yt=Math.max(yt,Ae.start*nt),Ct=Math.min(Ct,(Ae.start+Ae.count)*nt)),He!==null?(yt=Math.max(yt,0),Ct=Math.min(Ct,He.count)):je!=null&&(yt=Math.max(yt,0),Ct=Math.min(Ct,je.count));const _t=Ct-yt;if(_t<0||_t===1/0)return;bt.setup(Y,ie,We,ne,He);let fn,ct=Be;if(He!==null&&(fn=me.get(He),ct=mt,ct.setIndex(fn)),Y.isMesh)ie.wireframe===!0?(Ze.setLineWidth(ie.wireframeLinewidth*Dt()),ct.setMode(q.LINES)):ct.setMode(q.TRIANGLES);else if(Y.isLine){let qe=ie.linewidth;qe===void 0&&(qe=1),Ze.setLineWidth(qe*Dt()),Y.isLineSegments?ct.setMode(q.LINES):Y.isLineLoop?ct.setMode(q.LINE_LOOP):ct.setMode(q.LINE_STRIP)}else Y.isPoints?ct.setMode(q.POINTS):Y.isSprite&&ct.setMode(q.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)ct.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if($e.get("WEBGL_multi_draw"))ct.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const qe=Y._multiDrawStarts,ri=Y._multiDrawCounts,At=Y._multiDrawCount,pn=He?me.get(He).bytesPerElement:1,si=Ye.get(ie).currentProgram.getUniforms();for(let Qt=0;Qt<At;Qt++)si.setValue(q,"_gl_DrawID",Qt),ct.render(qe[Qt]/pn,ri[Qt])}else if(Y.isInstancedMesh)ct.renderInstances(yt,_t,Y.count);else if(ne.isInstancedBufferGeometry){const qe=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,ri=Math.min(ne.instanceCount,qe);ct.renderInstances(yt,_t,ri)}else ct.render(yt,_t)};function Et(A,X,ne){A.transparent===!0&&A.side===Xi&&A.forceSinglePass===!1?(A.side=On,A.needsUpdate=!0,os(A,X,ne),A.side=Ar,A.needsUpdate=!0,os(A,X,ne),A.side=Xi):os(A,X,ne)}this.compile=function(A,X,ne=null){ne===null&&(ne=A),_=ht.get(ne),_.init(X),L.push(_),ne.traverseVisible(function(Y){Y.isLight&&Y.layers.test(X.layers)&&(_.pushLight(Y),Y.castShadow&&_.pushShadow(Y))}),A!==ne&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(X.layers)&&(_.pushLight(Y),Y.castShadow&&_.pushShadow(Y))}),_.setupLights();const ie=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Ae=Y.material;if(Ae)if(Array.isArray(Ae))for(let Ee=0;Ee<Ae.length;Ee++){const We=Ae[Ee];Et(We,ne,Y),ie.add(We)}else Et(Ae,ne,Y),ie.add(Ae)}),L.pop(),_=null,ie},this.compileAsync=function(A,X,ne=null){const ie=this.compile(A,X,ne);return new Promise(Y=>{function Ae(){if(ie.forEach(function(Ee){Ye.get(Ee).currentProgram.isReady()&&ie.delete(Ee)}),ie.size===0){Y(A);return}setTimeout(Ae,10)}$e.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let bn=null;function Sn(A){bn&&bn(A)}function ss(){bi.stop()}function Ki(){bi.start()}const bi=new o0;bi.setAnimationLoop(Sn),typeof self<"u"&&bi.setContext(self),this.setAnimationLoop=function(A){bn=A,ae.setAnimationLoop(A),A===null?bi.stop():bi.start()},ae.addEventListener("sessionstart",ss),ae.addEventListener("sessionend",Ki),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(X),X=ae.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,X,k),_=ht.get(A,L.length),_.init(X),L.push(_),Re.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Q.setFromProjectionMatrix(Re),Se=this.localClippingEnabled,he=Me.init(this.clippingPlanes,Se),y=Fe.get(A,I.length),y.init(),I.push(y),ae.enabled===!0&&ae.isPresenting===!0){const Ae=C.xr.getDepthSensingMesh();Ae!==null&&Pi(Ae,X,-1/0,C.sortObjects)}Pi(A,X,0,C.sortObjects),y.finish(),C.sortObjects===!0&&y.sort(ce,ee),pt=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,pt&&et.addToRenderList(y,A),this.info.render.frame++,he===!0&&Me.beginShadows();const ne=_.state.shadowsArray;ke.render(ne,A,X),he===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset();const ie=y.opaque,Y=y.transmissive;if(_.setupLights(),X.isArrayCamera){const Ae=X.cameras;if(Y.length>0)for(let Ee=0,We=Ae.length;Ee<We;Ee++){const He=Ae[Ee];br(ie,Y,A,He)}pt&&et.render(A);for(let Ee=0,We=Ae.length;Ee<We;Ee++){const He=Ae[Ee];Cr(y,A,He,He.viewport)}}else Y.length>0&&br(ie,Y,A,X),pt&&et.render(A),Cr(y,A,X);k!==null&&(D.updateMultisampleRenderTarget(k),D.updateRenderTargetMipmap(k)),A.isScene===!0&&A.onAfterRender(C,A,X),bt.resetDefaultState(),P=-1,R=null,L.pop(),L.length>0?(_=L[L.length-1],he===!0&&Me.setGlobalState(C.clippingPlanes,_.state.camera)):_=null,I.pop(),I.length>0?y=I[I.length-1]:y=null};function Pi(A,X,ne,ie){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)ne=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)_.pushLight(A),A.castShadow&&_.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Q.intersectsSprite(A)){ie&&Ke.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Re);const Ee=fe.update(A),We=A.material;We.visible&&y.push(A,Ee,We,ne,Ke.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Q.intersectsObject(A))){const Ee=fe.update(A),We=A.material;if(ie&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ke.copy(A.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Ke.copy(Ee.boundingSphere.center)),Ke.applyMatrix4(A.matrixWorld).applyMatrix4(Re)),Array.isArray(We)){const He=Ee.groups;for(let nt=0,rt=He.length;nt<rt;nt++){const je=He[nt],yt=We[je.materialIndex];yt&&yt.visible&&y.push(A,Ee,yt,ne,Ke.z,je)}}else We.visible&&y.push(A,Ee,We,ne,Ke.z,null)}}const Ae=A.children;for(let Ee=0,We=Ae.length;Ee<We;Ee++)Pi(Ae[Ee],X,ne,ie)}function Cr(A,X,ne,ie){const Y=A.opaque,Ae=A.transmissive,Ee=A.transparent;_.setupLightsView(ne),he===!0&&Me.setGlobalState(C.clippingPlanes,ne),ie&&Ze.viewport(H.copy(ie)),Y.length>0&&Zi(Y,X,ne),Ae.length>0&&Zi(Ae,X,ne),Ee.length>0&&Zi(Ee,X,ne),Ze.buffers.depth.setTest(!0),Ze.buffers.depth.setMask(!0),Ze.buffers.color.setMask(!0),Ze.setPolygonOffset(!1)}function br(A,X,ne,ie){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[ie.id]===void 0&&(_.state.transmissionRenderTarget[ie.id]=new ns(1,1,{generateMipmaps:!0,type:$e.has("EXT_color_buffer_half_float")||$e.has("EXT_color_buffer_float")?la:$i,minFilter:Jr,samples:4,stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Tt.workingColorSpace}));const Ae=_.state.transmissionRenderTarget[ie.id],Ee=ie.viewport||H;Ae.setSize(Ee.z,Ee.w);const We=C.getRenderTarget();C.setRenderTarget(Ae),C.getClearColor(le),de=C.getClearAlpha(),de<1&&C.setClearColor(16777215,.5),C.clear(),pt&&et.render(ne);const He=C.toneMapping;C.toneMapping=Tr;const nt=ie.viewport;if(ie.viewport!==void 0&&(ie.viewport=void 0),_.setupLightsView(ie),he===!0&&Me.setGlobalState(C.clippingPlanes,ie),Zi(A,ne,ie),D.updateMultisampleRenderTarget(Ae),D.updateRenderTargetMipmap(Ae),$e.has("WEBGL_multisampled_render_to_texture")===!1){let rt=!1;for(let je=0,yt=X.length;je<yt;je++){const Ct=X[je],_t=Ct.object,fn=Ct.geometry,ct=Ct.material,qe=Ct.group;if(ct.side===Xi&&_t.layers.test(ie.layers)){const ri=ct.side;ct.side=On,ct.needsUpdate=!0,ua(_t,ne,ie,fn,ct,qe),ct.side=ri,ct.needsUpdate=!0,rt=!0}}rt===!0&&(D.updateMultisampleRenderTarget(Ae),D.updateRenderTargetMipmap(Ae))}C.setRenderTarget(We),C.setClearColor(le,de),nt!==void 0&&(ie.viewport=nt),C.toneMapping=He}function Zi(A,X,ne){const ie=X.isScene===!0?X.overrideMaterial:null;for(let Y=0,Ae=A.length;Y<Ae;Y++){const Ee=A[Y],We=Ee.object,He=Ee.geometry,nt=ie===null?Ee.material:ie,rt=Ee.group;We.layers.test(ne.layers)&&ua(We,X,ne,He,nt,rt)}}function ua(A,X,ne,ie,Y,Ae){A.onBeforeRender(C,X,ne,ie,Y,Ae),A.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(C,X,ne,ie,A,Ae),Y.transparent===!0&&Y.side===Xi&&Y.forceSinglePass===!1?(Y.side=On,Y.needsUpdate=!0,C.renderBufferDirect(ne,X,ie,Y,A,Ae),Y.side=Ar,Y.needsUpdate=!0,C.renderBufferDirect(ne,X,ie,Y,A,Ae),Y.side=Xi):C.renderBufferDirect(ne,X,ie,Y,A,Ae),A.onAfterRender(C,X,ne,ie,Y,Ae)}function os(A,X,ne){X.isScene!==!0&&(X=St);const ie=Ye.get(A),Y=_.state.lights,Ae=_.state.shadowsArray,Ee=Y.state.version,We=Ge.getParameters(A,Y.state,Ae,X,ne),He=Ge.getProgramCacheKey(We);let nt=ie.programs;ie.environment=A.isMeshStandardMaterial?X.environment:null,ie.fog=X.fog,ie.envMap=(A.isMeshStandardMaterial?J:T).get(A.envMap||ie.environment),ie.envMapRotation=ie.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,nt===void 0&&(A.addEventListener("dispose",at),nt=new Map,ie.programs=nt);let rt=nt.get(He);if(rt!==void 0){if(ie.currentProgram===rt&&ie.lightsStateVersion===Ee)return _i(A,We),rt}else We.uniforms=Ge.getUniforms(A),A.onBeforeCompile(We,C),rt=Ge.acquireProgram(We,He),nt.set(He,rt),ie.uniforms=We.uniforms;const je=ie.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(je.clippingPlanes=Me.uniform),_i(A,We),ie.needsLights=cc(A),ie.lightsStateVersion=Ee,ie.needsLights&&(je.ambientLightColor.value=Y.state.ambient,je.lightProbe.value=Y.state.probe,je.directionalLights.value=Y.state.directional,je.directionalLightShadows.value=Y.state.directionalShadow,je.spotLights.value=Y.state.spot,je.spotLightShadows.value=Y.state.spotShadow,je.rectAreaLights.value=Y.state.rectArea,je.ltc_1.value=Y.state.rectAreaLTC1,je.ltc_2.value=Y.state.rectAreaLTC2,je.pointLights.value=Y.state.point,je.pointLightShadows.value=Y.state.pointShadow,je.hemisphereLights.value=Y.state.hemi,je.directionalShadowMap.value=Y.state.directionalShadowMap,je.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,je.spotShadowMap.value=Y.state.spotShadowMap,je.spotLightMatrix.value=Y.state.spotLightMatrix,je.spotLightMap.value=Y.state.spotLightMap,je.pointShadowMap.value=Y.state.pointShadowMap,je.pointShadowMatrix.value=Y.state.pointShadowMatrix),ie.currentProgram=rt,ie.uniformsList=null,rt}function da(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=Ql.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function _i(A,X){const ne=Ye.get(A);ne.outputColorSpace=X.outputColorSpace,ne.batching=X.batching,ne.batchingColor=X.batchingColor,ne.instancing=X.instancing,ne.instancingColor=X.instancingColor,ne.instancingMorph=X.instancingMorph,ne.skinning=X.skinning,ne.morphTargets=X.morphTargets,ne.morphNormals=X.morphNormals,ne.morphColors=X.morphColors,ne.morphTargetsCount=X.morphTargetsCount,ne.numClippingPlanes=X.numClippingPlanes,ne.numIntersection=X.numClipIntersection,ne.vertexAlphas=X.vertexAlphas,ne.vertexTangents=X.vertexTangents,ne.toneMapping=X.toneMapping}function ha(A,X,ne,ie,Y){X.isScene!==!0&&(X=St),D.resetTextureUnits();const Ae=X.fog,Ee=ie.isMeshStandardMaterial?X.environment:null,We=k===null?C.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:ao,He=(ie.isMeshStandardMaterial?J:T).get(ie.envMap||Ee),nt=ie.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,rt=!!ne.attributes.tangent&&(!!ie.normalMap||ie.anisotropy>0),je=!!ne.morphAttributes.position,yt=!!ne.morphAttributes.normal,Ct=!!ne.morphAttributes.color;let _t=Tr;ie.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(_t=C.toneMapping);const fn=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,ct=fn!==void 0?fn.length:0,qe=Ye.get(ie),ri=_.state.lights;if(he===!0&&(Se===!0||A!==R)){const Mn=A===R&&ie.id===P;Me.setState(ie,A,Mn)}let At=!1;ie.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==ri.state.version||qe.outputColorSpace!==We||Y.isBatchedMesh&&qe.batching===!1||!Y.isBatchedMesh&&qe.batching===!0||Y.isBatchedMesh&&qe.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&qe.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&qe.instancing===!1||!Y.isInstancedMesh&&qe.instancing===!0||Y.isSkinnedMesh&&qe.skinning===!1||!Y.isSkinnedMesh&&qe.skinning===!0||Y.isInstancedMesh&&qe.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&qe.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&qe.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&qe.instancingMorph===!1&&Y.morphTexture!==null||qe.envMap!==He||ie.fog===!0&&qe.fog!==Ae||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Me.numPlanes||qe.numIntersection!==Me.numIntersection)||qe.vertexAlphas!==nt||qe.vertexTangents!==rt||qe.morphTargets!==je||qe.morphNormals!==yt||qe.morphColors!==Ct||qe.toneMapping!==_t||qe.morphTargetsCount!==ct)&&(At=!0):(At=!0,qe.__version=ie.version);let pn=qe.currentProgram;At===!0&&(pn=os(ie,X,Y));let si=!1,Qt=!1,xi=!1;const Nt=pn.getUniforms(),Yn=qe.uniforms;if(Ze.useProgram(pn.program)&&(si=!0,Qt=!0,xi=!0),ie.id!==P&&(P=ie.id,Qt=!0),si||R!==A){Ze.buffers.depth.getReversed()?(ve.copy(A.projectionMatrix),Ax(ve),Rx(ve),Nt.setValue(q,"projectionMatrix",ve)):Nt.setValue(q,"projectionMatrix",A.projectionMatrix),Nt.setValue(q,"viewMatrix",A.matrixWorldInverse);const $n=Nt.map.cameraPosition;$n!==void 0&&$n.setValue(q,Ue.setFromMatrixPosition(A.matrixWorld)),lt.logarithmicDepthBuffer&&Nt.setValue(q,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ie.isMeshPhongMaterial||ie.isMeshToonMaterial||ie.isMeshLambertMaterial||ie.isMeshBasicMaterial||ie.isMeshStandardMaterial||ie.isShaderMaterial)&&Nt.setValue(q,"isOrthographic",A.isOrthographicCamera===!0),R!==A&&(R=A,Qt=!0,xi=!0)}if(Y.isSkinnedMesh){Nt.setOptional(q,Y,"bindMatrix"),Nt.setOptional(q,Y,"bindMatrixInverse");const Mn=Y.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),Nt.setValue(q,"boneTexture",Mn.boneTexture,D))}Y.isBatchedMesh&&(Nt.setOptional(q,Y,"batchingTexture"),Nt.setValue(q,"batchingTexture",Y._matricesTexture,D),Nt.setOptional(q,Y,"batchingIdTexture"),Nt.setValue(q,"batchingIdTexture",Y._indirectTexture,D),Nt.setOptional(q,Y,"batchingColorTexture"),Y._colorsTexture!==null&&Nt.setValue(q,"batchingColorTexture",Y._colorsTexture,D));const Li=ne.morphAttributes;if((Li.position!==void 0||Li.normal!==void 0||Li.color!==void 0)&&tt.update(Y,ne,pn),(Qt||qe.receiveShadow!==Y.receiveShadow)&&(qe.receiveShadow=Y.receiveShadow,Nt.setValue(q,"receiveShadow",Y.receiveShadow)),ie.isMeshGouraudMaterial&&ie.envMap!==null&&(Yn.envMap.value=He,Yn.flipEnvMap.value=He.isCubeTexture&&He.isRenderTargetTexture===!1?-1:1),ie.isMeshStandardMaterial&&ie.envMap===null&&X.environment!==null&&(Yn.envMapIntensity.value=X.environmentIntensity),Qt&&(Nt.setValue(q,"toneMappingExposure",C.toneMappingExposure),qe.needsLights&&fa(Yn,xi),Ae&&ie.fog===!0&&Ce.refreshFogUniforms(Yn,Ae),Ce.refreshMaterialUniforms(Yn,ie,z,ue,_.state.transmissionRenderTarget[A.id]),Ql.upload(q,da(qe),Yn,D)),ie.isShaderMaterial&&ie.uniformsNeedUpdate===!0&&(Ql.upload(q,da(qe),Yn,D),ie.uniformsNeedUpdate=!1),ie.isSpriteMaterial&&Nt.setValue(q,"center",Y.center),Nt.setValue(q,"modelViewMatrix",Y.modelViewMatrix),Nt.setValue(q,"normalMatrix",Y.normalMatrix),Nt.setValue(q,"modelMatrix",Y.matrixWorld),ie.isShaderMaterial||ie.isRawShaderMaterial){const Mn=ie.uniformsGroups;for(let $n=0,Pn=Mn.length;$n<Pn;$n++){const pa=Mn[$n];G.update(pa,pn),G.bind(pa,pn)}}return pn}function fa(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function cc(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return O},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(A,X,ne){Ye.get(A.texture).__webglTexture=X,Ye.get(A.depthTexture).__webglTexture=ne;const ie=Ye.get(A);ie.__hasExternalTextures=!0,ie.__autoAllocateDepthBuffer=ne===void 0,ie.__autoAllocateDepthBuffer||$e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ie.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){const ne=Ye.get(A);ne.__webglFramebuffer=X,ne.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,ne=0){k=A,O=X,U=ne;let ie=!0,Y=null,Ae=!1,Ee=!1;if(A){const He=Ye.get(A);if(He.__useDefaultFramebuffer!==void 0)Ze.bindFramebuffer(q.FRAMEBUFFER,null),ie=!1;else if(He.__webglFramebuffer===void 0)D.setupRenderTarget(A);else if(He.__hasExternalTextures)D.rebindTextures(A,Ye.get(A.texture).__webglTexture,Ye.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const je=A.depthTexture;if(He.__boundDepthTexture!==je){if(je!==null&&Ye.has(je)&&(A.width!==je.image.width||A.height!==je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(A)}}const nt=A.texture;(nt.isData3DTexture||nt.isDataArrayTexture||nt.isCompressedArrayTexture)&&(Ee=!0);const rt=Ye.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(rt[X])?Y=rt[X][ne]:Y=rt[X],Ae=!0):A.samples>0&&D.useMultisampledRTT(A)===!1?Y=Ye.get(A).__webglMultisampledFramebuffer:Array.isArray(rt)?Y=rt[ne]:Y=rt,H.copy(A.viewport),re.copy(A.scissor),K=A.scissorTest}else H.copy(F).multiplyScalar(z).floor(),re.copy(se).multiplyScalar(z).floor(),K=Ne;if(Ze.bindFramebuffer(q.FRAMEBUFFER,Y)&&ie&&Ze.drawBuffers(A,Y),Ze.viewport(H),Ze.scissor(re),Ze.setScissorTest(K),Ae){const He=Ye.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+X,He.__webglTexture,ne)}else if(Ee){const He=Ye.get(A.texture),nt=X||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,He.__webglTexture,ne||0,nt)}P=-1},this.readRenderTargetPixels=function(A,X,ne,ie,Y,Ae,Ee){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=Ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(We=We[Ee]),We){Ze.bindFramebuffer(q.FRAMEBUFFER,We);try{const He=A.texture,nt=He.format,rt=He.type;if(!lt.textureFormatReadable(nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!lt.textureTypeReadable(rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-ie&&ne>=0&&ne<=A.height-Y&&q.readPixels(X,ne,ie,Y,ot.convert(nt),ot.convert(rt),Ae)}finally{const He=k!==null?Ye.get(k).__webglFramebuffer:null;Ze.bindFramebuffer(q.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(A,X,ne,ie,Y,Ae,Ee){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=Ye.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ee!==void 0&&(We=We[Ee]),We){const He=A.texture,nt=He.format,rt=He.type;if(!lt.textureFormatReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!lt.textureTypeReadable(rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-ie&&ne>=0&&ne<=A.height-Y){Ze.bindFramebuffer(q.FRAMEBUFFER,We);const je=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,je),q.bufferData(q.PIXEL_PACK_BUFFER,Ae.byteLength,q.STREAM_READ),q.readPixels(X,ne,ie,Y,ot.convert(nt),ot.convert(rt),0);const yt=k!==null?Ye.get(k).__webglFramebuffer:null;Ze.bindFramebuffer(q.FRAMEBUFFER,yt);const Ct=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await Tx(q,Ct,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,je),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Ae),q.deleteBuffer(je),q.deleteSync(Ct),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,ne=0){A.isTexture!==!0&&(Jo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);const ie=Math.pow(2,-ne),Y=Math.floor(A.image.width*ie),Ae=Math.floor(A.image.height*ie),Ee=X!==null?X.x:0,We=X!==null?X.y:0;D.setTexture2D(A,0),q.copyTexSubImage2D(q.TEXTURE_2D,ne,0,0,Ee,We,Y,Ae),Ze.unbindTexture()},this.copyTextureToTexture=function(A,X,ne=null,ie=null,Y=0){A.isTexture!==!0&&(Jo("WebGLRenderer: copyTextureToTexture function signature has changed."),ie=arguments[0]||null,A=arguments[1],X=arguments[2],Y=arguments[3]||0,ne=null);let Ae,Ee,We,He,nt,rt,je,yt,Ct;const _t=A.isCompressedTexture?A.mipmaps[Y]:A.image;ne!==null?(Ae=ne.max.x-ne.min.x,Ee=ne.max.y-ne.min.y,We=ne.isBox3?ne.max.z-ne.min.z:1,He=ne.min.x,nt=ne.min.y,rt=ne.isBox3?ne.min.z:0):(Ae=_t.width,Ee=_t.height,We=_t.depth||1,He=0,nt=0,rt=0),ie!==null?(je=ie.x,yt=ie.y,Ct=ie.z):(je=0,yt=0,Ct=0);const fn=ot.convert(X.format),ct=ot.convert(X.type);let qe;X.isData3DTexture?(D.setTexture3D(X,0),qe=q.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(D.setTexture2DArray(X,0),qe=q.TEXTURE_2D_ARRAY):(D.setTexture2D(X,0),qe=q.TEXTURE_2D),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,X.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,X.unpackAlignment);const ri=q.getParameter(q.UNPACK_ROW_LENGTH),At=q.getParameter(q.UNPACK_IMAGE_HEIGHT),pn=q.getParameter(q.UNPACK_SKIP_PIXELS),si=q.getParameter(q.UNPACK_SKIP_ROWS),Qt=q.getParameter(q.UNPACK_SKIP_IMAGES);q.pixelStorei(q.UNPACK_ROW_LENGTH,_t.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,_t.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,He),q.pixelStorei(q.UNPACK_SKIP_ROWS,nt),q.pixelStorei(q.UNPACK_SKIP_IMAGES,rt);const xi=A.isDataArrayTexture||A.isData3DTexture,Nt=X.isDataArrayTexture||X.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){const Yn=Ye.get(A),Li=Ye.get(X),Mn=Ye.get(Yn.__renderTarget),$n=Ye.get(Li.__renderTarget);Ze.bindFramebuffer(q.READ_FRAMEBUFFER,Mn.__webglFramebuffer),Ze.bindFramebuffer(q.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let Pn=0;Pn<We;Pn++)xi&&q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ye.get(A).__webglTexture,Y,rt+Pn),A.isDepthTexture?(Nt&&q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,Ye.get(X).__webglTexture,Y,Ct+Pn),q.blitFramebuffer(He,nt,Ae,Ee,je,yt,Ae,Ee,q.DEPTH_BUFFER_BIT,q.NEAREST)):Nt?q.copyTexSubImage3D(qe,Y,je,yt,Ct+Pn,He,nt,Ae,Ee):q.copyTexSubImage2D(qe,Y,je,yt,Ct+Pn,He,nt,Ae,Ee);Ze.bindFramebuffer(q.READ_FRAMEBUFFER,null),Ze.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Nt?A.isDataTexture||A.isData3DTexture?q.texSubImage3D(qe,Y,je,yt,Ct,Ae,Ee,We,fn,ct,_t.data):X.isCompressedArrayTexture?q.compressedTexSubImage3D(qe,Y,je,yt,Ct,Ae,Ee,We,fn,_t.data):q.texSubImage3D(qe,Y,je,yt,Ct,Ae,Ee,We,fn,ct,_t):A.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,Y,je,yt,Ae,Ee,fn,ct,_t.data):A.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,Y,je,yt,_t.width,_t.height,fn,_t.data):q.texSubImage2D(q.TEXTURE_2D,Y,je,yt,Ae,Ee,fn,ct,_t);q.pixelStorei(q.UNPACK_ROW_LENGTH,ri),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,At),q.pixelStorei(q.UNPACK_SKIP_PIXELS,pn),q.pixelStorei(q.UNPACK_SKIP_ROWS,si),q.pixelStorei(q.UNPACK_SKIP_IMAGES,Qt),Y===0&&X.generateMipmaps&&q.generateMipmap(qe),Ze.unbindTexture()},this.copyTextureToTexture3D=function(A,X,ne=null,ie=null,Y=0){return A.isTexture!==!0&&(Jo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ne=arguments[0]||null,ie=arguments[1]||null,A=arguments[2],X=arguments[3],Y=arguments[4]||0),Jo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,ne,ie,Y)},this.initRenderTarget=function(A){Ye.get(A).__webglFramebuffer===void 0&&D.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?D.setTextureCube(A,0):A.isData3DTexture?D.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?D.setTexture2DArray(A,0):D.setTexture2D(A,0),Ze.unbindTexture()},this.resetState=function(){O=0,U=0,k=null,Ze.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}}class O1 extends Kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class k1 extends Cn{constructor(e=null,t=1,r=1,a,l,u,d,f,p=qn,g=qn,v,x){super(null,u,d,f,p,g,a,l,v,x),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fg extends gi{constructor(e,t,r,a=1){super(e,t,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Gs=new xt,pg=new xt,Bl=[],mg=new rs,B1=new xt,Ko=new zt,Zo=new uo;class hn extends zt{constructor(e,t,r){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new fg(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<r;a++)this.setMatrixAt(a,B1)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new rs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Gs),mg.copy(e.boundingBox).applyMatrix4(Gs),this.boundingBox.union(mg)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new uo),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Gs),Zo.copy(e.boundingSphere).applyMatrix4(Gs),this.boundingSphere.union(Zo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const r=t.morphTargetInfluences,a=this.morphTexture.source.data.data,l=r.length+1,u=e*l+1;for(let d=0;d<r.length;d++)r[d]=a[u+d]}raycast(e,t){const r=this.matrixWorld,a=this.count;if(Ko.geometry=this.geometry,Ko.material=this.material,Ko.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zo.copy(this.boundingSphere),Zo.applyMatrix4(r),e.ray.intersectsSphere(Zo)!==!1))for(let l=0;l<a;l++){this.getMatrixAt(l,Gs),pg.multiplyMatrices(r,Gs),Ko.matrixWorld=pg,Ko.raycast(e,Bl);for(let u=0,d=Bl.length;u<d;u++){const f=Bl[u];f.instanceId=l,f.object=this,t.push(f)}Bl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new fg(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const r=t.morphTargetInfluences,a=r.length+1;this.morphTexture===null&&(this.morphTexture=new k1(new Float32Array(a*this.count),a,this.count,yh,Ri));const l=this.morphTexture.source.data.data;let u=0;for(let p=0;p<r.length;p++)u+=r[p];const d=this.geometry.morphTargetsRelative?1:1-u,f=a*e;l[f]=d,l.set(r,f+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class bh extends ho{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new vt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const nc=new j,ic=new j,gg=new xt,Qo=new Th,zl=new uo,Sd=new j,vg=new j;class z1 extends Kt{constructor(e=new kn,t=new bh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let a=1,l=t.count;a<l;a++)nc.fromBufferAttribute(t,a-1),ic.fromBufferAttribute(t,a),r[a]=r[a-1],r[a]+=nc.distanceTo(ic);e.setAttribute("lineDistance",new Vt(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,l=e.params.Line.threshold,u=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),zl.copy(r.boundingSphere),zl.applyMatrix4(a),zl.radius+=l,e.ray.intersectsSphere(zl)===!1)return;gg.copy(a).invert(),Qo.copy(e.ray).applyMatrix4(gg);const d=l/((this.scale.x+this.scale.y+this.scale.z)/3),f=d*d,p=this.isLineSegments?2:1,g=r.index,x=r.attributes.position;if(g!==null){const S=Math.max(0,u.start),M=Math.min(g.count,u.start+u.count);for(let w=S,y=M-1;w<y;w+=p){const _=g.getX(w),I=g.getX(w+1),L=Hl(this,e,Qo,f,_,I);L&&t.push(L)}if(this.isLineLoop){const w=g.getX(M-1),y=g.getX(S),_=Hl(this,e,Qo,f,w,y);_&&t.push(_)}}else{const S=Math.max(0,u.start),M=Math.min(x.count,u.start+u.count);for(let w=S,y=M-1;w<y;w+=p){const _=Hl(this,e,Qo,f,w,w+1);_&&t.push(_)}if(this.isLineLoop){const w=Hl(this,e,Qo,f,M-1,S);w&&t.push(w)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,u=a.length;l<u;l++){const d=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=l}}}}}function Hl(s,e,t,r,a,l){const u=s.geometry.attributes.position;if(nc.fromBufferAttribute(u,a),ic.fromBufferAttribute(u,l),t.distanceSqToSegment(nc,ic,Sd,vg)>r)return;Sd.applyMatrix4(s.matrixWorld);const f=e.ray.origin.distanceTo(Sd);if(!(f<e.near||f>e.far))return{distance:f,point:vg.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const _g=new j,xg=new j;class f0 extends z1{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let a=0,l=t.count;a<l;a+=2)_g.fromBufferAttribute(t,a),xg.fromBufferAttribute(t,a+1),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+_g.distanceTo(xg);e.setAttribute("lineDistance",new Vt(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ph extends kn{constructor(e=1,t=32,r=0,a=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:r,thetaLength:a},t=Math.max(3,t);const l=[],u=[],d=[],f=[],p=new j,g=new Mt;u.push(0,0,0),d.push(0,0,1),f.push(.5,.5);for(let v=0,x=3;v<=t;v++,x+=3){const S=r+v/t*a;p.x=e*Math.cos(S),p.y=e*Math.sin(S),u.push(p.x,p.y,p.z),d.push(0,0,1),g.x=(u[x]/e+1)/2,g.y=(u[x+1]/e+1)/2,f.push(g.x,g.y)}for(let v=1;v<=t;v++)l.push(v,v+1,0);this.setIndex(l),this.setAttribute("position",new Vt(u,3)),this.setAttribute("normal",new Vt(d,3)),this.setAttribute("uv",new Vt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ph(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ks extends kn{constructor(e=1,t=1,r=1,a=32,l=1,u=!1,d=0,f=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:a,heightSegments:l,openEnded:u,thetaStart:d,thetaLength:f};const p=this;a=Math.floor(a),l=Math.floor(l);const g=[],v=[],x=[],S=[];let M=0;const w=[],y=r/2;let _=0;I(),u===!1&&(e>0&&L(!0),t>0&&L(!1)),this.setIndex(g),this.setAttribute("position",new Vt(v,3)),this.setAttribute("normal",new Vt(x,3)),this.setAttribute("uv",new Vt(S,2));function I(){const C=new j,W=new j;let O=0;const U=(t-e)/r;for(let k=0;k<=l;k++){const P=[],R=k/l,H=R*(t-e)+e;for(let re=0;re<=a;re++){const K=re/a,le=K*f+d,de=Math.sin(le),oe=Math.cos(le);W.x=H*de,W.y=-R*r+y,W.z=H*oe,v.push(W.x,W.y,W.z),C.set(de,U,oe).normalize(),x.push(C.x,C.y,C.z),S.push(K,1-R),P.push(M++)}w.push(P)}for(let k=0;k<a;k++)for(let P=0;P<l;P++){const R=w[P][k],H=w[P+1][k],re=w[P+1][k+1],K=w[P][k+1];(e>0||P!==0)&&(g.push(R,H,K),O+=3),(t>0||P!==l-1)&&(g.push(H,re,K),O+=3)}p.addGroup(_,O,0),_+=O}function L(C){const W=M,O=new Mt,U=new j;let k=0;const P=C===!0?e:t,R=C===!0?1:-1;for(let re=1;re<=a;re++)v.push(0,y*R,0),x.push(0,R,0),S.push(.5,.5),M++;const H=M;for(let re=0;re<=a;re++){const le=re/a*f+d,de=Math.cos(le),oe=Math.sin(le);U.x=P*oe,U.y=y*R,U.z=P*de,v.push(U.x,U.y,U.z),x.push(0,R,0),O.x=de*.5+.5,O.y=oe*.5*R+.5,S.push(O.x,O.y),M++}for(let re=0;re<a;re++){const K=W+re,le=H+re;C===!0?g.push(le,le+1,K):g.push(le+1,le,K),k+=3}p.addGroup(_,k,C===!0?1:2),_+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ks(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}const Vl=new j,Gl=new j,Md=new j,Wl=new ii;class H1 extends kn{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const a=Math.pow(10,4),l=Math.cos(Ys*t),u=e.getIndex(),d=e.getAttribute("position"),f=u?u.count:d.count,p=[0,0,0],g=["a","b","c"],v=new Array(3),x={},S=[];for(let M=0;M<f;M+=3){u?(p[0]=u.getX(M),p[1]=u.getX(M+1),p[2]=u.getX(M+2)):(p[0]=M,p[1]=M+1,p[2]=M+2);const{a:w,b:y,c:_}=Wl;if(w.fromBufferAttribute(d,p[0]),y.fromBufferAttribute(d,p[1]),_.fromBufferAttribute(d,p[2]),Wl.getNormal(Md),v[0]=`${Math.round(w.x*a)},${Math.round(w.y*a)},${Math.round(w.z*a)}`,v[1]=`${Math.round(y.x*a)},${Math.round(y.y*a)},${Math.round(y.z*a)}`,v[2]=`${Math.round(_.x*a)},${Math.round(_.y*a)},${Math.round(_.z*a)}`,!(v[0]===v[1]||v[1]===v[2]||v[2]===v[0]))for(let I=0;I<3;I++){const L=(I+1)%3,C=v[I],W=v[L],O=Wl[g[I]],U=Wl[g[L]],k=`${C}_${W}`,P=`${W}_${C}`;P in x&&x[P]?(Md.dot(x[P].normal)<=l&&(S.push(O.x,O.y,O.z),S.push(U.x,U.y,U.z)),x[P]=null):k in x||(x[k]={index0:p[I],index1:p[L],normal:Md.clone()})}}for(const M in x)if(x[M]){const{index0:w,index1:y}=x[M];Vl.fromBufferAttribute(d,w),Gl.fromBufferAttribute(d,y),S.push(Vl.x,Vl.y,Vl.z),S.push(Gl.x,Gl.y,Gl.z)}this.setAttribute("position",new Vt(S,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Lh extends kn{constructor(e=1,t=32,r=16,a=0,l=Math.PI*2,u=0,d=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:a,phiLength:l,thetaStart:u,thetaLength:d},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const f=Math.min(u+d,Math.PI);let p=0;const g=[],v=new j,x=new j,S=[],M=[],w=[],y=[];for(let _=0;_<=r;_++){const I=[],L=_/r;let C=0;_===0&&u===0?C=.5/t:_===r&&f===Math.PI&&(C=-.5/t);for(let W=0;W<=t;W++){const O=W/t;v.x=-e*Math.cos(a+O*l)*Math.sin(u+L*d),v.y=e*Math.cos(u+L*d),v.z=e*Math.sin(a+O*l)*Math.sin(u+L*d),M.push(v.x,v.y,v.z),x.copy(v).normalize(),w.push(x.x,x.y,x.z),y.push(O+C,1-L),I.push(p++)}g.push(I)}for(let _=0;_<r;_++)for(let I=0;I<t;I++){const L=g[_][I+1],C=g[_][I],W=g[_+1][I],O=g[_+1][I+1];(_!==0||u>0)&&S.push(L,C,O),(_!==r-1||f<Math.PI)&&S.push(C,W,O)}this.setIndex(S),this.setAttribute("position",new Vt(M,3)),this.setAttribute("normal",new Vt(w,3)),this.setAttribute("uv",new Vt(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lh(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zs extends kn{constructor(e=1,t=.4,r=12,a=48,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:r,tubularSegments:a,arc:l},r=Math.floor(r),a=Math.floor(a);const u=[],d=[],f=[],p=[],g=new j,v=new j,x=new j;for(let S=0;S<=r;S++)for(let M=0;M<=a;M++){const w=M/a*l,y=S/r*Math.PI*2;v.x=(e+t*Math.cos(y))*Math.cos(w),v.y=(e+t*Math.cos(y))*Math.sin(w),v.z=t*Math.sin(y),d.push(v.x,v.y,v.z),g.x=e*Math.cos(w),g.y=e*Math.sin(w),x.subVectors(v,g).normalize(),f.push(x.x,x.y,x.z),p.push(M/a),p.push(S/r)}for(let S=1;S<=r;S++)for(let M=1;M<=a;M++){const w=(a+1)*S+M-1,y=(a+1)*(S-1)+M-1,_=(a+1)*(S-1)+M,I=(a+1)*S+M;u.push(w,y,I),u.push(y,_,I)}this.setIndex(u),this.setAttribute("position",new Vt(d,3)),this.setAttribute("normal",new Vt(f,3)),this.setAttribute("uv",new Vt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zs(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class p0 extends ho{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=$g,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Dh extends Kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new vt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class V1 extends Dh{constructor(e,t,r){super(e,r),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new vt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ed=new xt,yg=new j,Sg=new j;class m0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Mt(512,512),this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rh,this._frameExtents=new Mt(1,1),this._viewportCount=1,this._viewports=[new Xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;yg.setFromMatrixPosition(e.matrixWorld),t.position.copy(yg),Sg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Sg),t.updateMatrixWorld(),Ed.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ed),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Ed)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class G1 extends m0{constructor(){super(new Xn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,r=so*2*e.angle*this.focus,a=this.mapSize.width/this.mapSize.height,l=e.distance||t.far;(r!==t.fov||a!==t.aspect||l!==t.far)&&(t.fov=r,t.aspect=a,t.far=l,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class W1 extends Dh{constructor(e,t,r=0,a=Math.PI/3,l=0,u=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.distance=r,this.angle=a,this.penumbra=l,this.decay=u,this.map=null,this.shadow=new G1}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class j1 extends m0{constructor(){super(new a0(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mg extends Dh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.shadow=new j1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Eg=new xt;class X1{constructor(e,t,r=0,a=1/0){this.ray=new Th(e,t),this.near=r,this.far=a,this.camera=null,this.layers=new Ah,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Eg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Eg),this}intersectObject(e,t=!0,r=[]){return dh(e,this,r,t),r.sort(wg),r}intersectObjects(e,t=!0,r=[]){for(let a=0,l=e.length;a<l;a++)dh(e[a],this,r,t);return r.sort(wg),r}}function wg(s,e){return s.distance-e.distance}function dh(s,e,t,r){let a=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(a=!1),a===!0&&r===!0){const l=s.children;for(let u=0,d=l.length;u<d;u++)dh(l[u],e,t,!0)}}class q1 extends f0{constructor(e=10,t=10,r=4473924,a=8947848){r=new vt(r),a=new vt(a);const l=t/2,u=e/t,d=e/2,f=[],p=[];for(let x=0,S=0,M=-d;x<=t;x++,M+=u){f.push(-d,0,M,d,0,M),f.push(M,0,-d,M,0,d);const w=x===l?r:a;w.toArray(p,S),S+=3,w.toArray(p,S),S+=3,w.toArray(p,S),S+=3,w.toArray(p,S),S+=3}const g=new kn;g.setAttribute("position",new Vt(f,3)),g.setAttribute("color",new Vt(p,3));const v=new bh({vertexColors:!0,toneMapped:!1});super(g,v),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gh);const Y1="silent-ear-explainer@1.0.0",rc=["B1_X","B1_Y","B2_X","B2_Y","B3_X","B3_Y","B4_X","B4_Y"],sc=[.112,.121,.108,.116,.104,.119,.111,.107],$1=[.006,.005,.0048,.0055,.0042,.0052,.0046,.0044],hh=[-1.25,-.45,.2,1.15,.65,-.3];function K1(s){return sc.map((e,t)=>Number((e+$1[t]*(s[t]??0)).toFixed(6)))}function Z1(s){return hh.map((e,t)=>({stepId:`${s}:t+${String(t).padStart(2,"0")}`,elapsedMs:t*1e3,baselineMember:!0,checkpoint:"baseline",rms:Object.freeze(K1(sc.map((r,a)=>e*(a%2===0?1:-.82)+(a-3.5)*.025)))}))}function Q1(s){const e=sc.map((r,a)=>s.reduce((l,u)=>l+u.rms[a],0)/s.length),t=sc.map((r,a)=>Math.sqrt(s.reduce((l,u)=>{const d=u.rms[a]-e[a];return l+d*d},0)/s.length));return{mean:e,standardDeviation:t}}function Ih(s,e,t,r){const a=Z1(s),l=Q1(a);let u=!1;const d=[...a,...r.map((f,p)=>{const g=f[0]??0,v=p===0?"comparing":g===3?"at-threshold":g>3?"exceeded":u?"returned":g>=2.4?"approach":"within";g>3&&(u=!0);const x=l.mean.map((M,w)=>M+l.standardDeviation[w]*(f[w]??0)),S=hh.length+p;return Object.freeze({stepId:`${s}:t+${String(S).padStart(2,"0")}`,elapsedMs:S*1e3,baselineMember:!1,checkpoint:v,rms:Object.freeze(x)})})];return Object.freeze({contract:Y1,id:s,title:e,description:t,channelIds:rc,units:"demo units",baselineSampleCount:hh.length,defaultThresholdSigma:3,frames:Object.freeze(d)})}const J1=Ih("within-reference-v1","Within demo reference","Ordinary controlled RMS variation remains below the selected upper threshold.",[[.15,-.2,.05,.1,-.1,.2,0,-.15],[.55,-.45,.3,.2,-.35,.4,.25,-.2],[.85,.25,-.35,.65,.15,-.4,.5,.1],[1.05,.4,.2,.75,-.2,.55,.3,-.15],[.65,-.25,.45,.35,.1,-.3,.6,.25],[.3,.1,-.2,.5,.35,.2,-.1,.4],[.45,.3,.15,.25,-.1,.5,.35,.2],[.2,-.1,.35,.45,.2,.3,.1,.25]]),ew=Ih("controlled-deviation-v1","Controlled synthetic RMS deviation","Selected synthetic RMS channels rise through the fixed statistical reference.",[[.1,0,.15,-.1,.05,.1,-.1,0],[.65,.1,.3,.05,.2,.15,0,-.1],[1.25,.25,.6,.15,.35,.2,.1,0],[2.05,.35,1,.3,.45,.25,.15,.1],[2.65,.45,1.35,.4,.55,.35,.2,.15],[3,.5,1.65,.5,.65,.4,.25,.2],[4.2,.6,2.1,.55,.8,.5,.35,.25],[5.4,.65,2.55,.65,.9,.55,.4,.3],[6.8,.75,3.2,.7,1,.6,.45,.35],[8.1,.8,3.8,.75,1.1,.7,.5,.4],[2,.45,1.1,.35,.5,.3,.2,.1],[.8,.25,.45,.2,.25,.15,.1,.05]]),tw=Ih("noisy-pressure-v1","Noisy environment / false-positive pressure","Controlled background variation tests sensitivity without claiming production-grade noise rejection.",[[.2,-.3,.4,-.2,.15,-.1,.25,-.15],[1.35,-1.05,.8,-.9,1.1,-.7,.65,-.5],[-1.55,1.4,-1.15,1.2,-.85,.95,-1.05,.75],[2.1,-1.7,1.35,-1.1,1.65,-1.25,1.4,-.8],[-2.25,1.9,-1.7,1.45,-1.5,1.35,-1.25,1.1],[2.5,-2.15,1.8,-1.65,2,-1.45,1.75,-1.25],[2.75,-2.25,2.1,-1.8,2.2,-1.6,1.9,-1.4],[2.8,-1.9,2.3,-1.5,2.45,-1.35,2.1,-1.1],[2.9,-1.4,2.55,-1.2,2.7,-1,2.25,-.9],[2.75,-1.1,2.8,-.9,2.9,-.75,2.4,-.6]]),ia=Object.freeze({"within-reference-v1":J1,"controlled-deviation-v1":ew,"noisy-pressure-v1":tw}),g0=["within-reference-v1","controlled-deviation-v1","noisy-pressure-v1"],Qs=-1.65,wi=.42,Nh=7.1,ra=2*Nh+2*Math.PI*wi,fh=Math.abs(Qs)*wi,nn=Object.freeze({driveCenter:Object.freeze({x:-3.55,y:.8,z:0}),idlerCenter:Object.freeze({x:3.55,y:.8,z:0}),drumRadiusMeters:wi,drumCenterDistanceMeters:Nh,beltTopY:1.22,beltReturnY:.38,beltWidthMeters:1.58,stationNearZ:-1.18,stationFarZ:1.18,driveOmegaRadiansPerSecond:Qs,idlerOmegaRadiansPerSecond:Qs,motorRatio:6,motorOmegaRadiansPerSecond:Qs*6,beltSpeedMetersPerSecond:fh,beltLoopLengthMeters:ra,carrierPhases:Object.freeze([.06,.31,.56,.81])}),nw=["carrier-01","carrier-02","carrier-03","carrier-04"];function v0(s,e){return(s%e+e)%e}function iw(s){return Number.isFinite(s)?Math.max(0,s):0}function _0(s){const e=v0(Number.isFinite(s)?s:0,ra),t=Nh,r=Math.PI*wi;if(e<t)return{distanceMeters:e,segment:"top-run",position:{x:nn.driveCenter.x+e,y:nn.beltTopY,z:0},tangent:{x:1,y:0,z:0},rotationZRadians:0};if(e<t+r){const d=e-t,f=Math.PI/2-d/wi,p={x:Math.sin(f),y:-Math.cos(f),z:0};return{distanceMeters:e,segment:"idler-wrap",position:{x:nn.idlerCenter.x+wi*Math.cos(f),y:nn.idlerCenter.y+wi*Math.sin(f),z:0},tangent:p,rotationZRadians:Math.atan2(p.y,p.x)}}if(e<2*t+r){const d=e-t-r;return{distanceMeters:e,segment:"return-run",position:{x:nn.idlerCenter.x-d,y:nn.beltReturnY,z:0},tangent:{x:-1,y:0,z:0},rotationZRadians:Math.PI}}const a=e-2*t-r,l=-Math.PI/2-a/wi,u={x:Math.sin(l),y:-Math.cos(l),z:0};return{distanceMeters:e,segment:"drive-wrap",position:{x:nn.driveCenter.x+wi*Math.cos(l),y:nn.driveCenter.y+wi*Math.sin(l),z:0},tangent:u,rotationZRadians:Math.atan2(u.y,u.x)}}function x0(s){const e=iw(s),t=fh*e,r=v0(t,ra),a=Qs*e,l=nn.carrierPhases.map((u,d)=>({id:nw[d],phase01:u,..._0(r+u*ra)}));return{timeSeconds:e,distanceMeters:t,beltPhaseMeters:r,beltLoopLengthMeters:ra,beltSpeedMetersPerSecond:fh,driveAngleRadians:a,idlerAngleRadians:a,outputShaftAngleRadians:a,couplingAngleRadians:a,motorAngleRadians:a*nn.motorRatio,carriers:l}}const rw=Math.abs(Qs)/(Math.PI*2),Js=["B1","B2","B3","B4"],y0=["X","Y"];function S0(s,e,t){return Math.min(t,Math.max(e,s))}function M0(s){if(!Number.isInteger(s)||s<0||s>7)throw new RangeError("RMS channel index must be an integer from 0 through 7.")}function aa(s,e){const t=Js.indexOf(s),r=y0.indexOf(e);if(t<0||r<0)throw new RangeError("Station and axis must use the canonical B1–B4 and X/Y values.");return t*2+r}function is(s){M0(s);const e=Js[Math.floor(s/2)],t=y0[s%2];return{stationId:e,axisId:t,channelIndex:s,channelId:rc[s]}}function sw(s){return[aa(s,"X"),aa(s,"Y")]}function E0(s,e,t){return!e||s.signedZScore===null||s.upperThreshold===null?"unavailable":s.upperThresholdExceeded?"exceeded":s.rms===s.upperThreshold?"equal":s.signedZScore>=t*.8?"approaching":"within"}function ow(s,e){return s.signedZScore===null?0:S0(Math.max(0,s.signedZScore)/Math.max(e,1e-6),0,1)}function aw(s,e,t){return!t||s==="unavailable"?0:s==="exceeded"?1:s==="equal"?.82:s==="approaching"?.62+e*.18:.12+e*.28}function Tg(s,e,t){const r=s.channels[e],a=is(e),l=E0(r,s.baseline.ready,s.thresholdSigma),u=s.baseline.ready?ow(r,s.thresholdSigma):0,d=e===t;return Object.freeze({channelIndex:e,channelId:a.channelId,axisId:a.axisId,selected:d,response01:u,pulse01:aw(l,u,d),exceeded:l==="exceeded",comparisonGlyph:l})}function lw(s,e,t,r){const[a,l]=sw(e),u=Tg(s,a,r),d=Tg(s,l,r),f=e===t;return Object.freeze({id:e,selected:f,selectedAxis:f?is(r).axisId:null,anyAxisExceeded:u.exceeded||d.exceeded,x:u,y:d})}function cw(s){return s.currentReadingAvailable?s.scrubber.elapsedMs/1e3:0}function uw(s){return Object.freeze({scenarioId:s,progress:0,hasStarted:!1,complete:!1,thresholdSigma:ia[s].defaultThresholdSigma,playing:!1,selectedStation:"B1",selectedAxis:"X",selectedChannel:0,modelMode:"full-assembly",operatingTimeSeconds:0})}function Ag(s,e){const t=is(aa(e.selectedStation,e.selectedAxis)),r=e.operatingTimeSeconds===void 0?cw(s):Math.max(0,Number.isFinite(e.operatingTimeSeconds)?e.operatingTimeSeconds:0),a=x0(r),l=Js.map(d=>lw(s,d,e.selectedStation,t.channelIndex)),u=Object.freeze(s.thresholdExceededChannels.map(d=>(M0(d),d)));return Object.freeze({fixtureKey:`${s.fixtureContract}:${s.scenarioId}:${s.scrubber.frameIndex}`,fixtureContract:s.fixtureContract,scenarioId:s.scenarioId,frameIndex:s.scrubber.frameIndex,stage:s.stage,source:"CONTROLLED DEMO",operating:Object.freeze({...a,playing:e.modelMode==="exploded-signal"?!1:e.playing,reducedMotion:e.reducedMotion,driveOmegaRadiansPerSecond:nn.driveOmegaRadiansPerSecond,idlerOmegaRadiansPerSecond:nn.idlerOmegaRadiansPerSecond,motorOmegaRadiansPerSecond:nn.motorOmegaRadiansPerSecond}),selection:Object.freeze(t),baseline:Object.freeze({ready:s.baseline.ready,progress01:S0(s.baseline.samplesSeen/Math.max(1,s.baseline.samplesRequired),0,1)}),viewMode:e.modelMode,stations:Object.freeze(l),exceededChannelIndices:u,disclosure:"EXPLANATORY_AMPLIFIED_MOTION_NOT_RECONSTRUCTED"})}const dw=(s,e)=>{s.color.copy(e.color),s.emissive.copy(e.emissive),s.emissiveIntensity=e.emissiveIntensity};class hw{constructor(e){we(this,"id");we(this,"root",new tn);we(this,"capRoot",new tn);we(this,"explodedRoot",new tn);we(this,"rotatingRoot",new tn);we(this,"sensorRoot",new tn);we(this,"pickProxy");we(this,"side");we(this,"lowTier");we(this,"bracket",new f0);we(this,"xAxis",new zt);we(this,"yAxis",new zt);we(this,"sensorResponseRoot",new tn);we(this,"housingMaterial");we(this,"sensorMaterial");we(this,"baseCapPose");we(this,"baseExplodedPose");we(this,"baseSensorPose");we(this,"selected",!1);we(this,"selectedAxis","X");we(this,"selectedResponse",0);we(this,"selectedPulse",0);this.id=e.id,this.side=e.side,this.lowTier=e.profile.tier==="low",this.root.name=`station-${e.id}`,this.root.position.copy(e.position),this.root.userData={semanticId:`station-${e.id}`,stationId:e.id,channelIndices:[e.stationIndex*2,e.stationIndex*2+1]},this.housingMaterial=e.registry.material(e.materials.frame.clone()),this.sensorMaterial=e.registry.material(e.materials.sensor.clone());const t=new zt(e.registry.geometry(new Bt(.72,.24,.54)),this.housingMaterial);t.name=`station-${e.id}-saddle`,t.position.y=-.31,t.castShadow=!1,t.receiveShadow=e.profile.shadows,this.root.add(t);const r=new zt(e.registry.geometry(new Zs(.29,.105,Math.max(8,Math.floor(e.profile.rollerSegments*.75)),e.profile.radialSegments)),this.housingMaterial);r.name=`station-${e.id}-housing-ring`,r.castShadow=!1,this.root.add(r),this.capRoot.name=`station-${e.id}-inspection-cap`;const a=new zt(e.registry.geometry(new Bt(.64,.2,.4)),this.housingMaterial);a.position.y=.3,a.castShadow=!1,this.capRoot.add(a),this.root.add(this.capRoot),this.explodedRoot.name=`station-${e.id}-exploded-parts`;const l=new zt(e.registry.geometry(new Zs(.215,.034,8,e.profile.radialSegments)),e.materials.steel);l.position.z=this.side*.02,this.explodedRoot.add(l),this.rotatingRoot.name=`station-${e.id}-rotating`;const u=new zt(e.registry.geometry(new Zs(.105,.025,8,e.profile.radialSegments)),e.materials.darkSteel);this.rotatingRoot.add(u);const d=e.profile.tier==="low"?8:10,f=e.registry.geometry(new Lh(.032,e.profile.rollerSegments,Math.max(6,e.profile.rollerSegments-2))),p=new hn(f,e.materials.steel,d);p.name=`station-${e.id}-rollers`;const g=new xt;for(let _=0;_<d;_+=1){const I=_/d*Math.PI*2;g.makeTranslation(Math.cos(I)*.16,Math.sin(I)*.16,0),p.setMatrixAt(_,g)}p.instanceMatrix.needsUpdate=!0,this.rotatingRoot.add(p),this.explodedRoot.add(this.rotatingRoot),this.root.add(this.explodedRoot),this.sensorRoot.name=`sensor-${e.id}`,this.sensorRoot.position.set(0,.58,this.side*.16),this.sensorResponseRoot.name=`sensor-${e.id}-response`;const v=new zt(e.registry.geometry(new Bt(.2,.17,.16)),this.sensorMaterial);if(v.name=`sensor-${e.id}-body`,v.castShadow=!1,this.sensorResponseRoot.add(v),!this.lowTier){const _=new zt(e.registry.geometry(new Ks(.055,.055,.04,Math.max(12,Math.floor(e.profile.radialSegments/2)))),e.materials.steel);_.rotation.x=Math.PI/2,_.position.z=this.side*.1,this.sensorResponseRoot.add(_)}this.sensorRoot.add(this.sensorResponseRoot),this.root.add(this.sensorRoot);const x=e.registry.geometry(new H1(new Bt(.86,1.12,.72))),S=e.registry.material(new bh({color:16249055,transparent:!0,opacity:.92}));this.bracket.geometry=x,this.bracket.material=S,this.bracket.name=`selection-bracket-${e.id}`,this.bracket.position.y=.1,this.bracket.visible=!1,this.root.add(this.bracket);const M=e.registry.material(new oa({color:16116437})),w=e.registry.geometry(new Bt(.74,.035,.035)),y=e.registry.geometry(new Bt(.035,.74,.035));this.xAxis.geometry=w,this.xAxis.material=M,this.xAxis.position.set(.3,.5,this.side*.32),this.yAxis.geometry=y,this.yAxis.material=M,this.yAxis.position.set(.42,.28,this.side*.32),this.root.add(this.xAxis,this.yAxis),this.pickProxy=new zt(e.registry.geometry(new Bt(.94,1.2,.9)),e.materials.pick),this.pickProxy.name=`pick-station-${e.id}`,this.pickProxy.position.y=.08,this.pickProxy.userData={pickId:e.id,stationId:e.id},this.pickProxy.renderOrder=-1,this.pickProxy.layers.set(2),this.root.add(this.pickProxy),this.baseCapPose=this.capturePose(this.capRoot),this.baseExplodedPose=this.capturePose(this.explodedRoot),this.baseSensorPose=this.capturePose(this.sensorRoot),this.setVisualState(!1,"X",{response01:0,pulse01:0,approaching:!1,equal:!1,exceeded:!1},!1)}capturePose(e){return{position:e.position.clone(),quaternion:e.quaternion.clone(),scale:e.scale.clone()}}getBasePose(e){const t=e==="cap"?this.baseCapPose:e==="exploded"?this.baseExplodedPose:this.baseSensorPose;return{position:t.position.clone(),quaternion:t.quaternion.clone(),scale:t.scale.clone()}}setVisualState(e,t,r,a){this.selected=e,this.selectedAxis=t,this.selectedResponse=e?r.response01:0,this.selectedPulse=e?r.pulse01:0;const l=r.exceeded?this.sensorMaterial:r.approaching||r.equal?this.sensorMaterial:this.sensorMaterial,u=r.exceeded?10566450:r.approaching||r.equal?11692820:e?1342835:12154913;if(l.color.setHex(u),l.emissive.setHex(r.exceeded?5641230:e?474425:6105606),l.emissiveIntensity=e?.14+this.selectedPulse*.32:a?.2:.1,e){const f=r.exceeded?this.sensorMaterial:r.approaching||r.equal?this.sensorMaterial:this.sensorMaterial;dw(this.housingMaterial,f),this.housingMaterial.roughness=.43}else this.housingMaterial.color.setHex(2436398),this.housingMaterial.emissive.setHex(0),this.housingMaterial.emissiveIntensity=0,this.housingMaterial.roughness=.52;this.bracket.visible=e||a,this.bracket.material.color.setHex(r.exceeded||!e&&a?10566450:r.approaching||r.equal?11692820:16249055),this.bracket.scale.setScalar(e?1:.92),this.xAxis.visible=e,this.yAxis.visible=e,this.explodedRoot.visible=e,this.lowTier&&(this.capRoot.visible=e),this.xAxis.scale.set(t==="X"?1.25:.68,1,1),this.yAxis.scale.set(1,t==="Y"?1.25:.68,1)}updateKinematics(e,t,r){if(this.rotatingRoot.rotation.z=e,this.sensorResponseRoot.position.set(0,0,0),this.selected&&!r){const a=.0015+this.selectedResponse*.0105,l=Math.sin(t*Math.PI*12+this.id.charCodeAt(1))*a;this.selectedAxis==="X"?this.sensorResponseRoot.position.x=l:this.sensorResponseRoot.position.y=l}}getRestorationError(){const e=[this.capRoot.position.distanceTo(this.baseCapPose.position),this.explodedRoot.position.distanceTo(this.baseExplodedPose.position),this.sensorRoot.position.distanceTo(this.baseSensorPose.position),1-Math.abs(this.capRoot.quaternion.dot(this.baseCapPose.quaternion)),1-Math.abs(this.explodedRoot.quaternion.dot(this.baseExplodedPose.quaternion)),1-Math.abs(this.sensorRoot.quaternion.dot(this.baseSensorPose.quaternion))];return Math.max(...e.map(Math.abs))}}function Rg(s,e){return(s%e+e)%e}function fw(s,e,t=nn.driveCenter.x,r=nn.idlerCenter.x){const l=t-.42,u=r-t+.42*2;return l+Rg(s+Rg(e,1)*u,u)}function pw(s){return{fixtureKey:s.fixtureKey,frameIndex:s.frameIndex,operating:{elapsedMs:s.operating.timeSeconds*1e3,beltSpeedMetersPerSecond:s.operating.beltSpeedMetersPerSecond},selection:{stationId:s.selection.stationId,axis:s.selection.axisId,channelIndex:s.selection.channelIndex},baselineReady:s.baseline.ready,stations:s.stations.map(e=>{const t=r=>{const a=e[r];return{response01:a.response01,pulse01:a.pulse01,approaching:a.comparisonGlyph==="approaching",equal:a.comparisonGlyph==="equal",exceeded:a.exceeded}};return{id:e.id,x:t("x"),y:t("y")}})}}const Cg=[new j(-3.55,.8,-1.18),new j(-3.55,.8,1.18),new j(3.55,.8,-1.18),new j(3.55,.8,1.18)];class mw{constructor(e){we(this,"root",new tn);we(this,"frameRoot",new tn);we(this,"driveModule",new tn);we(this,"beltExplodeRoot",new tn);we(this,"stations");we(this,"pickTargets");we(this,"instanceCount");we(this,"profile");we(this,"materials");we(this,"registry");we(this,"driveDrumRoot",new tn);we(this,"tailDrumRoot",new tn);we(this,"motorRotorRoot",new tn);we(this,"couplingRoot",new tn);we(this,"idlerInstances");we(this,"treadInstances");we(this,"carrierInstances");we(this,"workpieceInstances");we(this,"stationFlagPlates");we(this,"stationFlagMaterial");we(this,"currentSelection",{station:"B1",axis:"X"});this.profile=e.profile,this.materials=e.materials,this.registry=e.registry,this.root.name="conveyor-line",this.frameRoot.name="frame-system",this.driveModule.name="drive-train",this.beltExplodeRoot.name="belt-system",this.root.add(this.frameRoot,this.driveModule,this.beltExplodeRoot),this.buildFrame(),this.buildDriveTrain();const t=this.buildBeltAndMovingSystems();this.idlerInstances=t.idlers,this.treadInstances=t.treads,this.carrierInstances=t.carriers,this.workpieceInstances=t.workpieces;const r=new Map;Js.forEach((l,u)=>{const d=new hw({id:l,stationIndex:u,position:Cg[u].clone(),side:u%2===0?-1:1,profile:this.profile,materials:this.materials,registry:this.registry});r.set(l,d),this.root.add(d.root)}),this.stations=r,this.pickTargets=Js.map(l=>r.get(l).pickProxy);const a=this.buildStationFlags();this.stationFlagPlates=a.plates,this.stationFlagMaterial=a.material,this.instanceCount=this.profile.treadCount+this.profile.carrierCount*2+this.idlerInstances.count+28+Js.reduce(l=>l+(this.profile.tier==="low"?8:10),0)}box(e,t,r,a,l,u=!1){const d=new zt(this.registry.geometry(new Bt(...t)),r);return d.name=e,d.position.set(...a),d.castShadow=u&&this.profile.shadows,d.receiveShadow=this.profile.shadows,l.add(d),d}cylinder(e,t,r,a,l,u,d=this.profile.radialSegments){const f=new zt(this.registry.geometry(new Ks(t,t,r,d)),a);return f.name=e,f.position.set(...l),f.rotation.x=Math.PI/2,f.castShadow=this.profile.shadows,f.receiveShadow=this.profile.shadows,u.add(f),f}buildFrame(){const e=this.registry.geometry(new Bt(8.2,.18,.2)),t=new hn(e,this.materials.frame,2);t.name="frame-side-rails";const r=new xt;t.setMatrixAt(0,r.makeTranslation(0,.53,-1.08)),t.setMatrixAt(1,r.makeTranslation(0,.53,1.08)),t.castShadow=this.profile.shadows,t.receiveShadow=this.profile.shadows,t.instanceMatrix.needsUpdate=!0,this.frameRoot.add(t);const a=this.registry.geometry(new Bt(.16,.16,2.28)),l=new hn(a,this.materials.frame,6);l.name="frame-cross-members";const u=new xt;for(let w=0;w<6;w+=1)u.makeTranslation(-3.55+w*1.42,.52,0),l.setMatrixAt(w,u);l.castShadow=this.profile.shadows,l.receiveShadow=this.profile.shadows,l.instanceMatrix.needsUpdate=!0,this.frameRoot.add(l);const d=this.registry.geometry(new Bt(.2,.65,.2)),f=new hn(d,this.materials.frame,8);f.name="frame-legs";let p=0;for(const w of[-3.25,-1.1,1.1,3.25])for(const y of[-1.08,1.08])u.makeTranslation(w,.2,y),f.setMatrixAt(p,u),p+=1;f.castShadow=this.profile.shadows,f.receiveShadow=this.profile.shadows,f.instanceMatrix.needsUpdate=!0,this.frameRoot.add(f);const g=this.registry.geometry(new Bt(.42,.07,.42)),v=new hn(g,this.materials.darkSteel,8);v.name="frame-feet",p=0;for(const w of[-3.25,-1.1,1.1,3.25])for(const y of[-1.08,1.08])u.makeTranslation(w,-.15,y),v.setMatrixAt(p,u),p+=1;v.receiveShadow=this.profile.shadows,v.instanceMatrix.needsUpdate=!0,this.frameRoot.add(v),this.box("guard-coupling",[.9,.55,.08],this.materials.guard,[-3.55,1.05,-1.78],this.frameRoot,!0);const x=this.registry.geometry(new Bt(7.45,.18,.08)),S=new hn(x,this.materials.guard,2);S.name="guard-belt-edges";const M=new xt;S.setMatrixAt(0,M.makeTranslation(0,1.32,-.9)),S.setMatrixAt(1,M.makeTranslation(0,1.32,.9)),S.instanceMatrix.needsUpdate=!0,this.frameRoot.add(S)}buildDriveTrain(){const e=this.cylinder("drive-motor-body",.43,.88,this.materials.frame,[-3.55,.79,-2.62],this.driveModule);e.rotation.x=Math.PI/2,this.profile.tier!=="low"&&this.cylinder("drive-motor-endcap",.36,.12,this.materials.darkSteel,[-3.55,.79,-3.08],this.driveModule);const t=this.registry.geometry(new Bt(.055,.055,.82)),r=new hn(t,this.materials.darkSteel,8);r.name="drive-motor-fins";const a=new xt,l=new Ci;for(let u=0;u<8;u+=1){const d=u/8*Math.PI*2;l.setFromAxisAngle(new j(0,0,1),d),a.compose(new j(-3.55+Math.cos(d)*.43,.79+Math.sin(d)*.43,-2.62),l,new j(1,1,1)),r.setMatrixAt(u,a)}r.instanceMatrix.needsUpdate=!0,this.driveModule.add(r),this.motorRotorRoot.name="drive-motor-rotor",this.profile.tier!=="low"&&this.cylinder("drive-motor-shaft",.08,.34,this.materials.steel,[0,0,0],this.motorRotorRoot,20),this.motorRotorRoot.position.set(-3.55,.79,-2.02),this.driveModule.add(this.motorRotorRoot),this.cylinder("drive-reducer",.48,.38,this.materials.guard,[-3.55,.79,-1.78],this.driveModule),this.couplingRoot.name="drive-coupling",this.cylinder("drive-coupling-hub-a",.17,.18,this.materials.steel,[0,0,-.1],this.couplingRoot,24),this.profile.tier!=="low"&&this.cylinder("drive-coupling-hub-b",.17,.18,this.materials.steel,[0,0,.1],this.couplingRoot,24),this.couplingRoot.position.set(-3.55,.8,-1.45),this.driveModule.add(this.couplingRoot)}buildBeltAndMovingSystems(){this.box("belt-top-run",[7.1,.055,1.58],this.materials.rubber,[0,1.22,0],this.beltExplodeRoot,!1),this.box("belt-return-run",[7.1,.055,1.58],this.materials.rubber,[0,.38,0],this.beltExplodeRoot,!1);for(const[x,S,M]of[["drum-head",-3.55,this.driveDrumRoot],["drum-tail",3.55,this.tailDrumRoot]])M.name=x,this.profile.tier!=="low"&&this.cylinder(`${x}-steel`,.365,1.7,this.materials.steel,[0,0,0],M),this.cylinder(`${x}-rubber-collar`,.423,1.52,this.materials.rubber,[0,0,0],M),this.cylinder(`${x}-shaft`,.105,2.78,this.materials.darkSteel,[0,0,0],M,28),M.position.set(S,.8,0),this.beltExplodeRoot.add(M);if(this.profile.tier!=="low"){const x=this.registry.geometry(new Zs(.42,.028,8,this.profile.radialSegments));for(const S of[-3.55,3.55])for(const M of[-.77,.77]){const w=new zt(x,this.materials.rubber);w.position.set(S,.8,M),this.beltExplodeRoot.add(w)}}const e=this.registry.geometry(new Ks(.09,.09,1.62,Math.max(16,Math.floor(this.profile.radialSegments/2)))),t=new hn(e,this.materials.darkSteel,7);t.name="support-idlers",t.instanceMatrix.setUsage(_l),this.beltExplodeRoot.add(t);const r=this.registry.geometry(new Bt(.16,.032,1.5)),a=new hn(r,this.materials.guard,this.profile.treadCount);a.name="belt-travel-marks",a.instanceMatrix.setUsage(_l),a.frustumCulled=!1,this.beltExplodeRoot.add(a);const l=this.registry.geometry(new Bt(.68,.1,.62)),u=new hn(l,this.materials.carrier,this.profile.carrierCount);u.name="carrier-pallets",u.instanceMatrix.setUsage(_l),u.castShadow=!1,u.frustumCulled=!1,this.beltExplodeRoot.add(u);const d=this.registry.geometry(new Ks(.19,.24,.24,Math.max(16,Math.floor(this.profile.radialSegments/2)))),f=new hn(d,this.materials.workpiece,this.profile.carrierCount);f.name="carrier-workpieces",f.instanceMatrix.setUsage(_l),f.castShadow=!1,f.frustumCulled=!1,this.beltExplodeRoot.add(f);const p=this.registry.geometry(new Bt(.42,.32,1.82)),g=new hn(p,this.materials.guard,2);g.name="carrier-end-cowls";const v=new xt;return g.setMatrixAt(0,v.makeTranslation(-3.69,1.35,0)),g.setMatrixAt(1,v.makeTranslation(3.69,1.35,0)),g.castShadow=this.profile.shadows,g.instanceMatrix.needsUpdate=!0,this.frameRoot.add(g),{idlers:t,treads:a,carriers:u,workpieces:f}}buildStationFlags(){const e=new xt,t=this.registry.geometry(new Bt(.055,.72,.055)),r=new hn(t,this.materials.darkSteel,4);r.name="station-sensor-flag-poles";const a=this.registry.geometry(new Bt(.46,.32,.09)),l=this.registry.material(this.materials.steel.clone());l.color.setHex(16777215),l.metalness=.52,l.roughness=.42;const u=new hn(a,l,4);u.name="station-physical-flags";const d=this.registry.geometry(new Bt(.055,.17,.055)),f=new hn(d,this.materials.darkSteel,20);f.name="station-count-bars";let p=0;return Cg.forEach((g,v)=>{const x=v%2===0?-1:1,S=g.z+x*.34;r.setMatrixAt(v,e.makeTranslation(g.x,1.54,S)),u.setMatrixAt(v,e.makeTranslation(g.x,1.88,S)),u.setColorAt(v,new vt(12365456));const M=v+1;for(let w=0;w<M;w+=1){const y=(w-(M-1)/2)*.09;for(const _ of[-1,1])f.setMatrixAt(p,e.makeTranslation(g.x+y,1.88,S+_*.052)),p+=1}}),r.instanceMatrix.needsUpdate=!0,u.instanceMatrix.needsUpdate=!0,u.instanceColor&&(u.instanceColor.needsUpdate=!0),f.instanceMatrix.needsUpdate=!0,this.root.add(r,u,f),{plates:u,material:l}}setModelState(e){this.currentSelection={station:e.selection.stationId,axis:e.selection.axis},e.stations.forEach((t,r)=>{const a=this.stations.get(t.id);if(!a)return;const l=t.id===e.selection.stationId,u=e.selection.axis==="X"?t.x:t.y;a.setVisualState(l,e.selection.axis,l?u:t.x,t.x.exceeded||t.y.exceeded);const d=t.x.exceeded||t.y.exceeded,f=t.x.approaching||t.y.approaching||t.x.equal||t.y.equal;this.stationFlagPlates.setColorAt(r,new vt(d?10566450:f?11692820:l?1342835:12365456))}),this.stationFlagPlates.instanceColor&&(this.stationFlagPlates.instanceColor.needsUpdate=!0),this.stationFlagMaterial.needsUpdate=!1}updateKinematics(e,t){const r=x0(e/1e3);this.driveDrumRoot.rotation.z=r.driveAngleRadians,this.tailDrumRoot.rotation.z=r.idlerAngleRadians,this.motorRotorRoot.rotation.z=r.motorAngleRadians,this.couplingRoot.rotation.z=r.couplingAngleRadians;const a=new xt,l=new Ci,u=new j(1,1,1),d=r.beltLoopLengthMeters;for(let g=0;g<this.profile.treadCount;g+=1){const v=_0(r.distanceMeters+g/this.profile.treadCount*d);l.setFromAxisAngle(new j(0,0,1),v.rotationZRadians),a.compose(new j(v.position.x,v.position.y,v.position.z),l,u),this.treadInstances.setMatrixAt(g,a)}this.treadInstances.instanceMatrix.needsUpdate=!0,[-2.55,-1.7,-.85,0,.85,1.7,2.55].forEach((g,v)=>{l.setFromEuler(new vi(Math.PI/2,0,-r.distanceMeters/.09)),a.compose(new j(g,1.08,0),l,u),this.idlerInstances.setMatrixAt(v,a)}),this.idlerInstances.instanceMatrix.needsUpdate=!0;for(let g=0;g<this.profile.carrierCount;g+=1){const v=fw(r.distanceMeters,g/this.profile.carrierCount,nn.driveCenter.x,nn.idlerCenter.x),x=v<nn.driveCenter.x||v>nn.idlerCenter.x?new j(0,0,0):u;a.compose(new j(v,1.31,0),new Ci,x),this.carrierInstances.setMatrixAt(g,a),a.compose(new j(v,1.5,0),new Ci,x),this.workpieceInstances.setMatrixAt(g,a)}this.carrierInstances.instanceMatrix.needsUpdate=!0,this.workpieceInstances.instanceMatrix.needsUpdate=!0;const p=e/1e3;for(const[g,v]of this.stations){const x=g==="B1"||g==="B2"?r.driveAngleRadians:r.idlerAngleRadians;v.updateKinematics(x,p,t)}}get selectedStation(){return this.stations.get(this.currentSelection.station)}}const wd=s=>({position:s.position.clone(),quaternion:s.quaternion.clone(),scale:s.scale.clone()}),jl=s=>({position:s.position.clone(),quaternion:s.quaternion.clone(),scale:s.scale.clone()});class gw{constructor(e){we(this,"line");we(this,"baseDrive");we(this,"baseBelt");we(this,"transition");we(this,"mode","full-assembly");we(this,"stationId","B1");this.line=e,this.baseDrive=wd(e.driveModule),this.baseBelt=wd(e.beltExplodeRoot)}targets(e,t){const r=new Map;r.set(this.line.driveModule,jl(this.baseDrive)),r.set(this.line.beltExplodeRoot,jl(this.baseBelt));for(const[a,l]of this.line.stations)if(r.set(l.capRoot,l.getBasePose("cap")),r.set(l.explodedRoot,l.getBasePose("exploded")),r.set(l.sensorRoot,l.getBasePose("sensor")),a===t){if(e==="inspect-station"){const u=l.getBasePose("cap");u.position.y+=.16,r.set(l.capRoot,u);const d=l.getBasePose("sensor");d.position.y+=.24,d.position.z+=a==="B1"||a==="B3"?-.12:.12,r.set(l.sensorRoot,d)}if(e==="exploded-signal"){const u=l.getBasePose("cap");u.position.y+=.1,r.set(l.capRoot,u);const d=l.getBasePose("exploded");d.position.z+=a==="B1"||a==="B3"?-.48:.48,r.set(l.explodedRoot,d);const f=l.getBasePose("sensor");f.position.y+=.62,f.position.z+=a==="B1"||a==="B3"?-.18:.18,r.set(l.sensorRoot,f)}}if(e==="exploded-signal"){const a=jl(this.baseDrive);a.position.add(new j(-.2,0,-.38)),r.set(this.line.driveModule,a);const l=jl(this.baseBelt);l.position.y+=.34,r.set(this.line.beltExplodeRoot,l)}return r}setMode(e,t,r,a=performance.now()){this.mode=e,this.stationId=t;const u=[...this.targets(e,t)].map(([d,f])=>({object:d,from:wd(d),to:f}));if(r){for(const d of u)this.applyPose(d.object,d.to);this.transition=void 0;return}this.transition={startedAt:a,durationMs:650,entries:u}}applyPose(e,t){e.position.copy(t.position),e.quaternion.copy(t.quaternion),e.scale.copy(t.scale)}update(e){if(!this.transition)return!1;const t=ec.clamp((e-this.transition.startedAt)/this.transition.durationMs,0,1),r=ec.smoothstep(t,0,1);for(const a of this.transition.entries)a.object.position.lerpVectors(a.from.position,a.to.position,r),a.object.quaternion.slerpQuaternions(a.from.quaternion,a.to.quaternion,r),a.object.scale.lerpVectors(a.from.scale,a.to.scale,r);if(t>=1){for(const a of this.transition.entries)this.applyPose(a.object,a.to);return this.transition=void 0,!1}return!0}settle(){const e=this.targets(this.mode,this.stationId);for(const[t,r]of e)this.applyPose(t,r);this.transition=void 0}restoreFullAssembly(){this.mode="full-assembly",this.setMode("full-assembly",this.stationId,!0)}get isAnimating(){return this.transition!==void 0}getRestorationError(){const e=[this.line.driveModule.position.distanceTo(this.baseDrive.position),this.line.beltExplodeRoot.position.distanceTo(this.baseBelt.position),...[...this.line.stations.values()].map(t=>t.getRestorationError())];return Math.max(...e.map(Math.abs))}}const Xl={low:{tier:"low",dprCap:1,radialSegments:24,rollerSegments:8,treadCount:24,carrierCount:3,fastenerDetail:!1,shadows:!1,shadowMapSize:0,antialias:!1},balanced:{tier:"balanced",dprCap:1.5,radialSegments:36,rollerSegments:12,treadCount:36,carrierCount:4,fastenerDetail:!1,shadows:!0,shadowMapSize:1024,antialias:!0},high:{tier:"high",dprCap:2,radialSegments:52,rollerSegments:16,treadCount:52,carrierCount:5,fastenerDetail:!0,shadows:!0,shadowMapSize:1024,antialias:!0}};function vw(s){if(s.preference&&s.preference!=="auto")return Xl[s.preference];const e=s.hardwareConcurrency??4;return s.width<520||e<=4||s.devicePixelRatio>2.5?Xl.low:s.width<1100||e<=8?Xl.balanced:Xl.high}class _w{constructor(){we(this,"geometries",new Set);we(this,"materials",new Set);we(this,"textures",new Set)}geometry(e){return this.geometries.add(e),e}material(e){return this.materials.add(e),e}texture(e){return this.textures.add(e),e}dispose(){for(const e of this.geometries)e.dispose();for(const e of this.materials)e.dispose();for(const e of this.textures)e.dispose();this.geometries.clear(),this.materials.clear(),this.textures.clear()}}function xw(s){const e=(t,r,a,l={})=>s.material(new p0({color:t,metalness:r,roughness:a,...l}));return{frame:e(2436398,.46,.52),guard:e(4936272,.3,.58),steel:e(9214106,.88,.3),darkSteel:e(3160635,.72,.4),rubber:e(1514267,.02,.86),carrier:e(5858149,.55,.48),workpiece:e(9406328,.2,.64),sensor:e(12154913,.27,.43,{emissive:6105606,emissiveIntensity:.16}),selected:e(1342835,.36,.37,{emissive:474425,emissiveIntensity:.2}),approach:e(11692820,.28,.42,{emissive:5844997,emissiveIntensity:.2}),exceeded:e(10566450,.3,.39,{emissive:5641230,emissiveIntensity:.27}),contact:s.material(new oa({color:2435625,transparent:!0,opacity:.12,depthWrite:!1})),pick:s.material(new oa({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}))}}const bg=s=>s==="B1"||s==="B2"||s==="B3"||s==="B4";class yw{constructor(e,t){we(this,"renderer");we(this,"canvas");we(this,"container");we(this,"scene",new O1);we(this,"camera",new Xn(34,1,.1,80));we(this,"root",new tn);we(this,"registry",new _w);we(this,"line");we(this,"inspection");we(this,"profile");we(this,"resizeObserver");we(this,"raycaster",new X1);we(this,"pointer",new Mt);we(this,"onContextLost");we(this,"snapshot");we(this,"modelFrame");we(this,"modelMode");we(this,"selectedStation");we(this,"selectedAxis");we(this,"onStationSelect");we(this,"reducedMotion");we(this,"playingRequested",!1);we(this,"documentVisible",!0);we(this,"disposed",!1);we(this,"animationFrame",null);we(this,"lastAnimationNow",0);we(this,"kinematicElapsedMs",0);we(this,"cameraTween");we(this,"pointerDown");we(this,"diagnosticsDirty",!0);we(this,"lastPublishedAnimationSignature","__unpublished__");we(this,"animate",e=>{if(this.animationFrame=null,this.disposed||!this.documentVisible)return;const t=this.lastAnimationNow===0?0:Math.min(50,Math.max(0,e-this.lastAnimationNow));if(this.lastAnimationNow=e,this.playingRequested&&!this.reducedMotion&&this.modelMode!=="exploded-signal"&&(this.kinematicElapsedMs+=t),this.line.updateKinematics(this.kinematicElapsedMs,this.reducedMotion),this.inspection.update(e),this.cameraTween){const r=ec.clamp((e-this.cameraTween.startedAt)/this.cameraTween.durationMs,0,1),a=ec.smoothstep(r,0,1);this.camera.position.lerpVectors(this.cameraTween.fromPosition,this.cameraTween.toPosition,a),this.camera.quaternion.slerpQuaternions(this.cameraTween.fromQuaternion,this.cameraTween.toQuaternion,a),r>=1&&(this.camera.position.copy(this.cameraTween.toPosition),this.camera.quaternion.copy(this.cameraTween.toQuaternion),this.cameraTween=void 0)}this.render(),this.shouldAnimate()?this.animationFrame=requestAnimationFrame(this.animate):this.lastAnimationNow=0});we(this,"handlePointerDown",e=>{e.button===0&&(this.pointerDown={x:e.clientX,y:e.clientY})});we(this,"handlePointerMove",e=>{e.pointerType!=="touch"&&(this.canvas.style.cursor=this.pickStation(e)?"pointer":"default")});we(this,"handlePointerUp",e=>{if(e.button!==0||!this.pointerDown)return;const t=Math.hypot(e.clientX-this.pointerDown.x,e.clientY-this.pointerDown.y);if(this.pointerDown=void 0,t>8)return;const r=this.pickStation(e);r&&(this.setSelectedStation(r,!0),this.onStationSelect?.(r))});we(this,"handlePointerLeave",()=>{this.pointerDown=void 0,this.canvas.style.cursor="default"});we(this,"handleVisibilityChange",()=>{this.documentVisible=document.visibilityState!=="hidden",this.documentVisible?this.shouldAnimate()&&this.startLoop():this.stopLoop()});we(this,"handleContextLost",e=>{e.preventDefault(),this.stopLoop(),this.onContextLost?.()});this.container=e,this.snapshot=t.snapshot;const r=is(t.snapshot.selectedChannel);this.selectedStation=t.selectedStation??r.stationId,this.selectedAxis=t.selectedAxis??r.axisId,this.modelMode=t.modelMode??"full-assembly",this.reducedMotion=t.reducedMotion??!1,this.onStationSelect=t.onStationSelect,this.onContextLost=t.onContextLost,this.raycaster.layers.set(2),this.profile=vw({width:Math.max(e.clientWidth,window.innerWidth),devicePixelRatio:window.devicePixelRatio||1,hardwareConcurrency:navigator.hardwareConcurrency,preference:t.quality==="low"||t.quality==="balanced"||t.quality==="high"||t.quality==="auto"?t.quality:"auto"}),this.renderer=new F1({alpha:!1,antialias:this.profile.antialias,powerPreference:this.profile.tier==="low"?"low-power":"high-performance"}),this.canvas=this.renderer.domElement,this.canvas.setAttribute("aria-hidden","true"),this.canvas.tabIndex=-1,this.canvas.dataset.silentEarScene="conveyor-test-cell",this.canvas.addEventListener("webglcontextlost",this.handleContextLost),this.canvas.addEventListener("pointerdown",this.handlePointerDown),this.canvas.addEventListener("pointermove",this.handlePointerMove),this.canvas.addEventListener("pointerup",this.handlePointerUp),this.canvas.addEventListener("pointerleave",this.handlePointerLeave),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.profile.dprCap)),this.renderer.outputColorSpace=jn,this.renderer.toneMapping=kg,this.renderer.toneMappingExposure=1.02,this.renderer.shadowMap.enabled=this.profile.shadows,this.renderer.shadowMap.type=Fg,e.replaceChildren(this.canvas),this.scene.background=new vt(14604748),this.root.name="se-cell",this.scene.add(this.root);const a=xw(this.registry);this.line=new mw({profile:this.profile,materials:a,registry:this.registry}),this.root.add(this.line.root),this.inspection=new gw(this.line),this.buildStudio(a.contact),this.addLighting(),this.modelFrame=Ag(this.snapshot,{playing:!1,reducedMotion:this.reducedMotion,modelMode:this.modelMode,selectedStation:this.selectedStation,selectedAxis:this.selectedAxis}),this.applyModelFrame(this.modelFrame),this.inspection.setMode(this.modelMode,this.selectedStation,!0);const l=this.cameraPose();this.camera.position.copy(l.position),this.camera.lookAt(l.target),this.resize(),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e)),document.addEventListener("visibilitychange",this.handleVisibilityChange),this.render()}buildStudio(e){const t=new zt(this.registry.geometry(new ca(24,16)),this.registry.material(new p0({color:14012612,metalness:0,roughness:.94})));if(t.name="env-floor",t.rotation.x=-Math.PI/2,t.position.y=-.19,t.receiveShadow=this.profile.shadows,this.root.add(t),this.profile.tier!=="low"){const r=new q1(18,18,9409677,12171438);r.name="env-grid",r.position.y=-.185;const a=Array.isArray(r.material)?r.material:[r.material];this.registry.geometry(r.geometry);for(const l of a)l.transparent=!0,l.opacity=.16,this.registry.material(l);this.root.add(r)}if(!this.profile.shadows){const r=this.registry.geometry(new Ph(1,32)),a=[[-3.55,-2.35,1.2,.7],[-3.55,0,1.15,1.2],[3.55,0,1.15,1.2],[0,0,3.5,1.2]],l=new hn(r,e,a.length);l.name="env-contact-shadows";const u=new xt,d=new Ci().setFromAxisAngle(new j(1,0,0),-Math.PI/2);a.forEach(([f,p,g,v],x)=>{u.compose(new j(f,-.175,p),d,new j(g,v,1)),l.setMatrixAt(x,u)}),l.instanceMatrix.needsUpdate=!0,this.root.add(l)}}addLighting(){this.scene.add(new V1(16052194,4739412,1.65));const e=new Mg(16774882,3.8);e.name="light-key",e.position.set(-5.5,8.5,-6.5),e.castShadow=this.profile.shadows,this.profile.shadows&&(e.shadow.mapSize.set(this.profile.shadowMapSize,this.profile.shadowMapSize),e.shadow.camera.left=-7,e.shadow.camera.right=7,e.shadow.camera.top=6,e.shadow.camera.bottom=-3,e.shadow.camera.near=1,e.shadow.camera.far=22,e.shadow.bias=-25e-5,e.shadow.normalBias=.018),this.scene.add(e);const t=new Mg(13031896,1.25);t.name="light-fill",t.position.set(7,4,-2),this.scene.add(t);const r=new W1(14260818,18,18,Math.PI/5,.7,1.3);r.name="light-rim",r.position.set(-5,5,5),r.target.position.set(-2.5,.8,0),this.scene.add(r,r.target)}createFrame(){return Ag(this.snapshot,{playing:this.playingRequested,reducedMotion:this.reducedMotion,modelMode:this.modelMode,selectedStation:this.selectedStation,selectedAxis:this.selectedAxis})}applyModelFrame(e){this.modelFrame=e,this.canvas.dataset.modelMode=e.viewMode,this.canvas.dataset.selectedStation=e.selection.stationId,this.canvas.dataset.selectedAxis=e.selection.axisId,this.canvas.dataset.selectedChannel=String(e.selection.channelIndex),this.canvas.dataset.fixtureFrame=String(e.frameIndex);const t=pw(e);this.kinematicElapsedMs=t.operating.elapsedMs,this.line.setModelState(t),this.line.updateKinematics(this.kinematicElapsedMs,this.reducedMotion),this.diagnosticsDirty=!0}setSnapshot(e){this.snapshot=e,this.applyModelFrame(this.createFrame()),this.invalidate()}setSceneFrame(e){this.selectedStation=e.selection.stationId,this.selectedAxis=e.selection.axisId,this.modelMode=e.viewMode,this.playingRequested=e.operating.playing,this.reducedMotion=e.operating.reducedMotion,this.applyModelFrame(e),this.inspection.setMode(this.modelMode,this.selectedStation,this.reducedMotion),this.moveCameraToAuthoredPose(),this.invalidate()}setSelectedChannel(e){const t=is(e),r=this.selectedStation!==t.stationId;this.selectedStation=t.stationId,this.selectedAxis=t.axisId,this.applyModelFrame(this.createFrame()),r&&this.modelMode!=="full-assembly"&&(this.inspection.setMode(this.modelMode,this.selectedStation,this.reducedMotion),this.moveCameraToAuthoredPose()),this.invalidate()}setSelectedStation(e,t=!1){if(!bg(e))throw new RangeError("Station must be B1, B2, B3 or B4.");const r=this.selectedStation!==e;this.selectedStation=e,t&&(this.modelMode="inspect-station"),this.applyModelFrame(this.createFrame()),(r||t)&&(this.inspection.setMode(this.modelMode,this.selectedStation,this.reducedMotion),this.moveCameraToAuthoredPose()),this.invalidate()}setSelectedAxis(e){this.selectedAxis=e,this.applyModelFrame(this.createFrame()),this.invalidate()}setModelMode(e){this.modelMode!==e&&(this.modelMode=e,this.applyModelFrame(this.createFrame()),this.inspection.setMode(e,this.selectedStation,this.reducedMotion),this.moveCameraToAuthoredPose(),this.invalidate())}setCameraMode(e){e==="overview"?this.setModelMode("full-assembly"):this.setModelMode("inspect-station")}setStationSelectHandler(e){this.onStationSelect=e}resetCamera(){this.moveCameraToAuthoredPose(),this.invalidate()}setPlaying(e){this.playingRequested=e,this.modelFrame=this.createFrame(),this.diagnosticsDirty=!0,this.shouldAnimate()?this.startLoop():(this.stopLoop(),this.render())}setReducedMotion(e){if(this.reducedMotion=e,this.diagnosticsDirty=!0,this.applyModelFrame(this.createFrame()),e){this.cameraTween=void 0,this.inspection.settle();const t=this.cameraPose();this.camera.position.copy(t.position),this.camera.lookAt(t.target),this.stopLoop(),this.render()}else this.shouldAnimate()&&this.startLoop()}cameraPose(){const t=this.container.clientWidth<520;if(this.modelMode==="full-assembly")return t?{position:new j(7.1,4.2,-10.6),target:new j(0,.82,0)}:{position:new j(8.6,5.4,-11.8),target:new j(0,.82,0)};const r=this.selectedStation==="B2"||this.selectedStation==="B4",a=this.selectedStation==="B1"||this.selectedStation==="B2",l=a?-3.55:3.55,u=r?1.18:-1.18,d=this.modelMode==="exploded-signal",f=a?d?6.2:5.2:d?-6.2:-5.2,p=(r?1:-1)*(d?10.8:9.4);return{position:new j(f,t?4.2:d?4.9:4.45,p),target:new j(l*(t?.78:.85),.92,u*(t?.68:.75))}}moveCameraToAuthoredPose(){const e=this.cameraPose(),t=this.camera.clone();if(t.position.copy(e.position),t.lookAt(e.target),this.reducedMotion){this.camera.position.copy(e.position),this.camera.quaternion.copy(t.quaternion),this.cameraTween=void 0;return}this.cameraTween={startedAt:performance.now(),durationMs:650,fromPosition:this.camera.position.clone(),fromQuaternion:this.camera.quaternion.clone(),toPosition:e.position.clone(),toQuaternion:t.quaternion.clone()},this.startLoop()}animationReasons(){const e=[];return this.playingRequested&&!this.reducedMotion&&this.modelMode!=="exploded-signal"&&e.push("playback"),this.cameraTween&&e.push("camera-tween"),this.inspection.isAnimating&&e.push("model-transition"),e}shouldAnimate(){return this.documentVisible&&this.animationReasons().length>0}invalidate(){this.shouldAnimate()?this.startLoop():this.render()}startLoop(){this.animationFrame!==null||this.disposed||!this.documentVisible||(this.lastAnimationNow=performance.now(),this.animationFrame=requestAnimationFrame(this.animate))}stopLoop(){this.animationFrame!==null&&cancelAnimationFrame(this.animationFrame),this.animationFrame=null,this.lastAnimationNow=0}pickStation(e){const t=this.canvas.getBoundingClientRect();if(t.width<=0||t.height<=0)return null;this.pointer.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);const a=this.raycaster.intersectObjects([...this.line.pickTargets],!1)[0]?.object.userData.stationId;return typeof a=="string"&&bg(a)?a:null}resize(){if(this.disposed)return;const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight||Math.min(620,e*.72));if(this.camera.fov=e<520?38:34,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),!this.cameraTween){const r=this.cameraPose();this.camera.position.copy(r.position),this.camera.lookAt(r.target)}this.renderer.setSize(e,t,!1),this.diagnosticsDirty=!0,this.render()}render(){if(this.disposed)return;this.renderer.render(this.scene,this.camera);const e=this.animationReasons().join("|");(this.diagnosticsDirty||e!==this.lastPublishedAnimationSignature)&&(this.publishDiagnostics(),this.diagnosticsDirty=!1,this.lastPublishedAnimationSignature=e)}publishDiagnostics(){const e=this.getMetrics(),t={tier:e.qualityTier,dpr:e.devicePixelRatio,drawCalls:e.drawCalls,triangles:e.triangles,points:e.points,lines:e.lines,geometries:e.geometries,textures:e.textures,programs:e.programs,sceneObjects:e.sceneObjects,instancedMeshes:e.instancedMeshes,instances:e.instances,cssWidth:e.cssWidth,cssHeight:e.cssHeight,bufferWidth:e.bufferWidth,bufferHeight:e.bufferHeight,shadowEnabled:e.shadowEnabled,activeAnimationReasons:e.activeAnimationReasons,restorationError:e.restorationError},r=JSON.stringify(t);this.container.dataset.rendererMetrics=r,this.canvas.dataset.rendererMetrics=r}getMetrics(){const e=this.renderer.info,t=new Mt;this.renderer.getDrawingBufferSize(t);let r=0,a=0,l=0;return this.scene.traverse(u=>{r+=1,u instanceof hn&&(a+=1,l+=u.count)}),{qualityTier:this.profile.tier,devicePixelRatio:this.renderer.getPixelRatio(),drawCalls:e.render.calls,triangles:e.render.triangles,points:e.render.points,lines:e.render.lines,geometries:e.memory.geometries,textures:e.memory.textures,programs:e.programs?.length??0,sceneObjects:r,instancedMeshes:a,instances:l,cssWidth:Math.max(1,this.container.clientWidth),cssHeight:Math.max(1,this.container.clientHeight),bufferWidth:t.x,bufferHeight:t.y,shadowEnabled:this.renderer.shadowMap.enabled,activeAnimationReasons:this.animationReasons(),restorationError:this.inspection.getRestorationError()}}dispose(){this.disposed||(this.disposed=!0,this.stopLoop(),this.cameraTween=void 0,this.resizeObserver?.disconnect(),document.removeEventListener("visibilitychange",this.handleVisibilityChange),this.canvas.removeEventListener("webglcontextlost",this.handleContextLost),this.canvas.removeEventListener("pointerdown",this.handlePointerDown),this.canvas.removeEventListener("pointermove",this.handlePointerMove),this.canvas.removeEventListener("pointerup",this.handlePointerUp),this.canvas.removeEventListener("pointerleave",this.handlePointerLeave),this.onStationSelect=void 0,this.registry.dispose(),this.renderer.renderLists.dispose(),this.renderer.dispose(),this.renderer.forceContextLoss(),this.canvas.parentElement===this.container&&this.container.removeChild(this.canvas))}}const Pg=[{id:"B1",channels:"B1_X · B1_Y",className:"station-b1"},{id:"B2",channels:"B2_X · B2_Y",className:"station-b2"},{id:"B3",channels:"B3_X · B3_Y",className:"station-b3"},{id:"B4",channels:"B4_X · B4_Y",className:"station-b4"}];function Sw({mode:s,station:e,axis:t,onStationSelect:r}){return b.jsxs("div",{className:"conveyor-schematic","data-mode":s,"data-selected-station":e,children:[b.jsxs("div",{className:"schematic-heading",children:[b.jsxs("div",{children:[b.jsx("p",{className:"section-kicker",children:"Complete two-dimensional machine view"}),b.jsx("h3",{children:"Conveyor test cell"})]}),b.jsxs("span",{className:"schematic-selection",children:[e," · ",t]})]}),b.jsxs("div",{className:"schematic-stage",children:[b.jsxs("svg",{viewBox:"0 0 800 360",role:"img","aria-labelledby":"schematic-title schematic-desc",children:[b.jsx("title",{id:"schematic-title",children:"Full conveyor test cell schematic"}),b.jsx("desc",{id:"schematic-desc",children:"Motor and coupling drive a two-drum conveyor with four bearing stations, four sensor nodes and retained carriers."}),b.jsxs("g",{className:"schematic-floor",children:[b.jsx("path",{d:"M58 304H744"}),b.jsx("path",{d:"M118 304L152 332M270 304L294 332M526 304L502 332M686 304L652 332"})]}),b.jsxs("g",{className:"schematic-frame",children:[b.jsx("path",{d:"M198 246H666M224 262H640"}),b.jsx("path",{d:"M236 262V304M374 262V304M516 262V304M628 262V304"})]}),b.jsxs("g",{className:"schematic-drive",children:[b.jsx("rect",{x:"62",y:"190",width:"92",height:"76",rx:"14"}),b.jsx("path",{d:"M78 204V252M92 204V252M106 204V252M120 204V252"}),b.jsx("rect",{x:"150",y:"211",width:"42",height:"34",rx:"8"}),b.jsx("path",{d:"M192 228H220"}),b.jsx("text",{x:"72",y:"184",children:"MOTOR"}),b.jsx("text",{x:"148",y:"264",children:"COUPLING"})]}),b.jsxs("g",{className:"schematic-belt",children:[b.jsx("path",{d:"M230 125H632A85 85 0 0 1 632 295H230A85 85 0 0 1 230 125Z"}),b.jsx("path",{className:"belt-inner",d:"M230 145H632A65 65 0 0 1 632 275H230A65 65 0 0 1 230 145Z"}),b.jsx("circle",{cx:"230",cy:"210",r:"64"}),b.jsx("circle",{cx:"632",cy:"210",r:"64"}),b.jsx("path",{className:"belt-direction",d:"M330 134H470M450 120L470 134L450 148"})]}),b.jsxs("g",{className:"schematic-carriers",children:[b.jsx("rect",{x:"286",y:"100",width:"66",height:"32",rx:"7"}),b.jsx("rect",{x:"406",y:"100",width:"66",height:"32",rx:"7"}),b.jsx("rect",{x:"526",y:"100",width:"66",height:"32",rx:"7"}),b.jsx("rect",{x:"360",y:"278",width:"66",height:"26",rx:"7"})]}),b.jsxs("g",{className:"schematic-sensors",children:[b.jsx("path",{d:"M216 166V112M244 166V86M618 166V112M646 166V86"}),b.jsx("rect",{x:"207",y:"96",width:"18",height:"18",rx:"4"}),b.jsx("rect",{x:"235",y:"70",width:"18",height:"18",rx:"4"}),b.jsx("rect",{x:"609",y:"96",width:"18",height:"18",rx:"4"}),b.jsx("rect",{x:"637",y:"70",width:"18",height:"18",rx:"4"})]}),b.jsx("g",{className:"schematic-explode-guides",children:b.jsx("path",{d:"M110 174V142M422 116V72M646 72V44"})})]}),b.jsx("div",{className:"schematic-station-layer","aria-label":"Conveyor bearing stations",children:Pg.map(a=>b.jsxs("button",{type:"button",className:`${a.className}${a.id===e?" is-selected":""}`,"aria-pressed":a.id===e,"aria-label":`Bearing ${a.id.slice(1)}; channels ${a.channels}`,onClick:()=>r?.(a.id),children:[b.jsx("strong",{children:a.id}),b.jsx("small",{children:"X · Y"})]},a.id))})]}),b.jsx("ul",{className:"schematic-channel-map","aria-label":"Bearing station to RMS channel mapping",children:Pg.map(a=>b.jsxs("li",{className:a.id===e?"is-selected":void 0,children:[b.jsxs("span",{children:["Bearing ",a.id.slice(1)]}),b.jsx("strong",{children:a.channels})]},a.id))}),b.jsxs("ol",{className:"schematic-signal-key","aria-label":"Controlled RMS comparison path",children:[b.jsxs("li",{children:[b.jsx("span",{children:"01"}),"Controlled RMS fixture"]}),b.jsxs("li",{children:[b.jsx("span",{children:"02"}),"Eight per-window RMS values"]}),b.jsxs("li",{children:[b.jsx("span",{children:"03"}),"Fixed reference mean and σ"]}),b.jsxs("li",{children:[b.jsx("span",{children:"04"}),"Upper mean + kσ comparison"]}),b.jsxs("li",{children:[b.jsx("span",{children:"05"}),"Demo threshold state"]})]}),b.jsx("p",{className:"schematic-mode-note",children:s==="full-assembly"?"Full assembly keeps the drive, belt, stations and sensors in their working spatial relationship.":s==="inspect-station"?`Inspecting Bearing ${e.slice(1)} with the ${t} measurement direction selected.`:`Exploded signal view separates four explanatory layers around Bearing ${e.slice(1)}; it is not a service instruction.`})]})}function Lg(s,e,t){const r=s.getMetrics(),a={tier:r.qualityTier,dpr:r.devicePixelRatio,drawCalls:r.drawCalls,triangles:r.triangles,points:r.points,lines:r.lines,geometries:r.geometries,textures:r.textures,programs:r.programs,sceneObjects:r.sceneObjects,instancedMeshes:r.instancedMeshes,instances:r.instances,cssWidth:r.cssWidth,cssHeight:r.cssHeight,bufferWidth:r.bufferWidth,bufferHeight:r.bufferHeight,shadowEnabled:r.shadowEnabled,activeAnimationReasons:r.activeAnimationReasons,restorationError:r.restorationError};e&&(e.dataset.rendererMetrics=JSON.stringify(a)),t(a)}function Dg(s){return s.stage==="learning-demo-baseline"||s.stage==="comparing-rms"?"signal-path":s.stage==="approaching-demo-threshold"||s.stage==="demo-threshold-exceeded"?"threshold":"overview"}function Mw({snapshot:s,selectedChannel:e,playing:t,reducedMotion:r,forceFallback:a,modelMode:l,selectedStation:u,selectedAxis:d,cameraResetKey:f=0,onStationSelect:p,onFallback:g,onMetrics:v}){const x=ft.useRef(null),S=ft.useRef(null),M=ft.useRef(p),w=ft.useRef(f),[y,_]=ft.useState(!1),I=u??["B1","B2","B3","B4"][Math.floor(e/2)]??"B1",L=d??(e%2===0?"X":"Y"),C=l??"full-assembly";return M.current=p,ft.useEffect(()=>{if(!(a||!x.current)){try{const W={snapshot:s,reducedMotion:r,quality:"auto",onContextLost:g,onStationSelect:k=>M.current?.(k)},O=new yw(x.current,W);S.current=O,O.setSelectedChannel(e),O.setPlaying(t);const U=O;U.setSelectedStation?.(I),U.setSelectedAxis?.(L),l?U.setModelMode?.(l):O.setCameraMode(Dg(s)),O.render(),Lg(O,x.current,v)}catch{_(!0),g(),v(null)}return()=>{S.current?.dispose(),S.current=null}}},[a]),ft.useEffect(()=>{const W=S.current;if(!W)return;W.setSnapshot(s),W.setSelectedChannel(e),W.setPlaying(t),W.setReducedMotion(r);const O=W;O.setSelectedStation?.(I),O.setSelectedAxis?.(L),l?O.setModelMode?.(l):W.setCameraMode(Dg(s)),W.render(),Lg(W,x.current,v)},[L,l,v,t,r,e,s,I]),ft.useEffect(()=>{w.current!==f&&(w.current=f,S.current?.resetCamera?.())},[f]),a||y?b.jsxs("div",{className:"fallback-panel","data-testid":"webgl-fallback",children:[b.jsx("p",{className:"fallback-title",children:"3D view unavailable — the complete controlled demo remains available below."}),b.jsx("p",{className:"fallback-support",children:"The schematic preserves the same conveyor stations and RMS-channel selection."}),b.jsx(Sw,{mode:C,station:I,axis:L,onStationSelect:p})]}):b.jsx("div",{ref:x,className:"scene-host","data-testid":"scene-host","aria-label":`Explanatory conveyor test cell in ${C.replaceAll("-"," ")} mode; Bearing ${I.slice(1)}, ${L} direction selected`,role:"img"})}function Ew(){const s=[["Input window","A file-backed source supplies raw sample windows; this controlled fixture supplies versioned RMS records."],["RMS summary","Silent-Ear represents each window as eight RMS-channel values."],["Fixed demo reference","The first N demo readings establish per-channel mean and standard deviation; that reference is fixed after readiness."],["Upper comparison","Each current value is checked against its mean plus the selected sigma multiplier."],["Inspectable result","The threshold state and heuristic demo deviation score are exposed for inspection."]];return b.jsx("ol",{className:"signal-chain",children:s.map(([e,t],r)=>b.jsxs("li",{children:[b.jsxs("span",{"aria-hidden":"true",children:["0",r+1]}),b.jsx("h3",{children:e}),b.jsx("p",{children:t})]},e))})}function ww(s,e,t){const r=s.map(d=>d.rms[e]),a=Math.min(...r),l=Math.max(...r),u=Math.max(l-a,1e-6);return r.map((d,f)=>{const p=t===1?0:f/(t-1)*100,g=88-(d-a)/u*72;return`${p.toFixed(2)},${g.toFixed(2)}`}).join(" ")}function Tw({frames:s,visibleFrames:e,frameIndex:t,selectedChannel:r,channelLabel:a,upperThreshold:l,onFrameChange:u}){const d=s.length-1,f=p=>{if(p.key==="PageUp"||p.key==="PageDown"){p.preventDefault();const g=p.key==="PageUp"?1:-1;u(Math.min(d,Math.max(0,t+g*5)))}};return b.jsxs("section",{className:"timeline-card","aria-labelledby":"timeline-title",children:[b.jsxs("div",{className:"timeline-heading",children:[b.jsxs("div",{children:[b.jsx("p",{className:"section-kicker",children:"Deterministic history"}),b.jsx("h2",{id:"timeline-title",children:"RMS timeline · per-window values"})]}),b.jsxs("p",{className:"step-count","aria-live":"polite",children:["Step ",t+1," of ",s.length]})]}),e.length===0?b.jsx("div",{className:"timeline-plot timeline-empty",children:b.jsx("p",{children:"No RMS record selected. Run the controlled demo or choose a fixture window."})}):b.jsx("div",{className:"timeline-plot","aria-hidden":"true",children:b.jsxs("svg",{viewBox:"0 0 100 100",preserveAspectRatio:"none",children:[b.jsx("line",{x1:"0",x2:"100",y1:"88",y2:"88",className:"plot-baseline"}),b.jsx("polyline",{points:ww(e,r,s.length),className:"plot-line"}),b.jsx("line",{x1:t/Math.max(1,d)*100,x2:t/Math.max(1,d)*100,y1:"8",y2:"92",className:"plot-cursor"})]})}),b.jsx("label",{htmlFor:"timeline-range",className:"range-label",children:e.length===0?`Choose the first fixture window for ${a}`:`Inspect ${a}, fixture window ${t+1}`}),b.jsx("input",{id:"timeline-range",type:"range",min:0,max:d,step:1,value:t,onChange:p=>u(Number(p.currentTarget.value)),onKeyDown:f}),b.jsxs("div",{className:"step-controls",children:[b.jsx("button",{type:"button",onClick:()=>u(Math.max(0,t-1)),disabled:t===0,children:"Previous window"}),b.jsx("button",{type:"button",onClick:()=>u(Math.min(d,t+1)),disabled:t===d,children:"Next window"})]}),b.jsxs("p",{className:"definition-copy",children:["Each point is a per-window RMS value, not a raw vibration waveform.",l===null?" The upper comparison becomes available after baseline readiness.":` The selected upper threshold is ${l.toFixed(5)} demo units.`]})]})}const w0="(prefers-reduced-motion: reduce)";function Aw(){return typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia(w0).matches}function Rw(){const[s,e]=ft.useState(Aw);return ft.useEffect(()=>{if(typeof window.matchMedia!="function")return;const t=window.matchMedia(w0),r=()=>e(t.matches);return r(),t.addEventListener?.("change",r),()=>t.removeEventListener?.("change",r)},[]),s}const es=["Bearing 1 · X","Bearing 1 · Y","Bearing 2 · X","Bearing 2 · Y","Bearing 3 · X","Bearing 3 · Y","Bearing 4 · X","Bearing 4 · Y"],Cw="Explanatory visualization — motion visually amplified; not reconstructed from sensor data.";function ta(s,e,t){return Math.min(t,Math.max(e,s))}function ph(s){if(s.length!==es.length)throw new Error(`Expected ${es.length} RMS channels, received ${s.length}.`);return s}function bw(s){const e=s.frames.slice(0,s.baselineSampleCount);if(e.length!==s.baselineSampleCount||e.length===0)throw new Error(`Fixture ${s.id} does not contain its declared baseline window.`);const t=ph(es.map((a,l)=>e.reduce((u,d)=>u+d.rms[l],0)/e.length)),r=ph(es.map((a,l)=>{const u=e.reduce((d,f)=>{const p=f.rms[l]-t[l];return d+p*p},0)/e.length;return Math.sqrt(u)}));return{mean:t,standardDeviation:r}}function Pw(s,e){return s<=e?100:s>=15?0:ta(100*(1-(s-e)/(15-e)),0,100)}function Lw(s,e){if(e==="at-threshold")return"At the demo threshold — not exceeded. The rule changes state only when the RMS value is strictly above the upper threshold.";switch(s){case"not-started":return"The controlled fixture is ready. Start or scrub to inspect its RMS records.";case"learning-demo-baseline":return"The first fixed set of controlled RMS records is building the demo reference; no score is shown yet.";case"comparing-rms":return"The first post-baseline RMS record is being compared with the fixed mean and upper threshold.";case"within-demo-reference":return"All current RMS channels remain at or below their selected upper statistical thresholds.";case"approaching-demo-threshold":return"A controlled RMS channel is nearing the selected upper statistical threshold.";case"demo-threshold-exceeded":return"At least one controlled RMS channel is above mean plus the selected sigma multiplier.";case"scenario-complete":return"The controlled timeline is complete and remains available for inspection or replay."}}function Dw(s){return{"not-started":"Controlled demo ready","learning-demo-baseline":"Learning demo baseline","comparing-rms":"Comparing RMS values","within-demo-reference":"Within demo reference","approaching-demo-threshold":"Approaching demo threshold","demo-threshold-exceeded":"Demo threshold exceeded","scenario-complete":"Scenario complete — inspect or replay"}[s]}function Iw(s){return ia[s]}function Nw(s,e,t={}){const r=Iw(s),a=ta(Number.isFinite(e)?e:0,0,1),l=t.hasStarted??!0,u=ta(t.thresholdSigma??r.defaultThresholdSigma,1,6),d=r.frames.length-1,f=l?Math.round(a*d):0,p=r.frames[f],g=l?Math.min(f+1,r.baselineSampleCount):0,v=l&&f>=r.baselineSampleCount,x=bw(r),S=ph(x.mean.map((U,k)=>U+x.standardDeviation[k]*u)),M=p.rms.map((U,k)=>{if(!v)return{channel:k,label:es[k],rms:U,mean:null,standardDeviation:null,upperThreshold:null,signedZScore:null,absoluteZScore:null,upperThresholdExceeded:!1};const P=x.standardDeviation[k],R=P===0?0:(U-x.mean[k])/P;return{channel:k,label:es[k],rms:U,mean:x.mean[k],standardDeviation:P,upperThreshold:S[k],signedZScore:R,absoluteZScore:Math.abs(R),upperThresholdExceeded:U>S[k]}}),w=v?M.reduce((U,k)=>(k.absoluteZScore??0)>(U.absoluteZScore??0)?k:U).channel:p.rms.reduce((U,k,P)=>k>p.rms[U]?P:U,0),y=t.selectedChannel!==void 0&&Number.isInteger(t.selectedChannel)&&t.selectedChannel>=0&&t.selectedChannel<es.length?t.selectedChannel:w,_=v?Math.max(...M.map(U=>U.absoluteZScore??0)):null,I=v?M[y].signedZScore??0:null,L=M.filter(U=>U.upperThresholdExceeded).map(U=>U.channel);let C;l?v?t.complete?C="scenario-complete":L.length>0?C="demo-threshold-exceeded":(I??0)>=u*.8?C="approaching-demo-threshold":f===r.baselineSampleCount?C="comparing-rms":C="within-demo-reference":C="learning-demo-baseline":C="not-started";const W=v?ta(((I??0)-1)/Math.max(1,u),0,1):.12*(g/r.baselineSampleCount),O=_===null?null:Pw(_,u);return{fixtureContract:r.contract,scenarioId:s,scenarioTitle:r.title,stage:C,statusLabel:Dw(C),explanation:Lw(C,p.checkpoint),dataLabel:"CONTROLLED DEMO",currentReadingAvailable:l,currentRms:p.rms,rmsTimeline:l?r.frames.slice(0,f+1):[],baseline:{ready:v,samplesSeen:g,samplesRequired:r.baselineSampleCount,mean:v?x.mean:null,standardDeviation:v?x.standardDeviation:null,upperThreshold:v?S:null},channels:M,thresholdSigma:u,thresholdExceededChannels:L,demoDeviationScore:C==="comparing-rms"?null:O,selectedChannel:y,maxAbsoluteZScore:_,scrubber:{value:d===0?0:f/d,min:0,max:1,step:d===0?1:1/d,frameIndex:f,elapsedMs:p.elapsedMs,durationMs:r.frames[d].elapsedMs},motion:{rotorTurnsPerSecond:rw,vibrationAmplitude:.003+W*.032,materialResponse:W,sensorPulse:v?ta((I??0)/u,.08,1):.18},visualizationLabel:Cw}}function Uw(){const s=new URLSearchParams(window.location.search),e=s.get("scenario"),t=g0.includes(e)?e:"within-reference-v1",r=Number(s.get("step")),a=s.has("step")&&Number.isFinite(r);return{scenario:t,progress:a?Math.min(1,Math.max(0,r)):0,started:a||s.has("scenario"),forceFallback:s.get("webgl")==="off"}}function Ig(s){typeof window.requestAnimationFrame=="function"?window.requestAnimationFrame(s):window.setTimeout(s,0)}function Fw(){const s=ft.useMemo(Uw,[]),e=Rw(),[t,r]=ft.useState(s.scenario),[a,l]=ft.useState(s.progress),[u,d]=ft.useState(s.started),[f,p]=ft.useState(!1),[g,v]=ft.useState(!0),[x,S]=ft.useState(!1),[M,w]=ft.useState(3),y=is(0),[_,I]=ft.useState(y.stationId),[L,C]=ft.useState(y.axisId),[W,O]=ft.useState(0),[U,k]=ft.useState("full-assembly"),[P,R]=ft.useState(0),[H,re]=ft.useState(s.forceFallback),[K,le]=ft.useState(null),de=ft.useRef(null),oe=ft.useRef(null),ue=ia[t],z=ue.frames.length-1,ce=Math.round(a*z),ee=ft.useMemo(()=>Nw(t,a,{thresholdSigma:M,hasStarted:u,complete:x,selectedChannel:W}),[x,u,a,t,W,M]),F=ee.channels[W]??ee.channels[ee.selectedChannel],se=ft.useCallback(st=>{d(!0),S(!1),p(!1),v(!1),l(Math.min(z,Math.max(0,st))/Math.max(1,z))},[z]),Ne=()=>{r("controlled-deviation-v1"),w(3),O(0),I("B1"),C("X"),k("full-assembly"),l(0),d(!0),S(!1),v(!0),p(!e),Ig(()=>oe.current?.scrollIntoView?.({behavior:"auto",block:"start"}))},Q=()=>{if(!e){if(f){p(!1);return}ce>=z&&l(0),d(!0),S(!1),p(!0)}},he=()=>{const st=ia["controlled-deviation-v1"];r("controlled-deviation-v1"),l(st.baselineSampleCount/(st.frames.length-1)),d(!0),S(!1),p(!1),v(!1),O(0),I("B1"),C("X"),k("full-assembly"),Ig(()=>{oe.current?.scrollIntoView?.({behavior:"auto",block:"start"}),de.current?.focus({preventScroll:!0})})},Se=st=>{const $e=uw(st);r($e.scenarioId),w($e.thresholdSigma),l($e.progress),d($e.hasStarted),S($e.complete),p($e.playing),v(!1),O($e.selectedChannel),I($e.selectedStation),C($e.selectedAxis),k($e.modelMode),R(lt=>lt+1)},ve=st=>{I(st),O(aa(st,L)),k("inspect-station")},Re=st=>{C(st),O(aa(_,st))},Ue=st=>{const $e=is(st);O($e.channelIndex),I($e.stationId),C($e.axisId)},Ke=st=>{k(st),st==="exploded-signal"&&p(!1)};ft.useEffect(()=>{e&&p(!1)},[e]),ft.useEffect(()=>{if(!f)return;const st=window.setTimeout(()=>{l($e=>{const lt=Math.round($e*z);return lt+1>=z?(p(!1),S(!0),v(!1),1):(lt+1)/z})},g?76e3/Math.max(1,z):1250);return()=>window.clearTimeout(st)},[g,z,f,a]);const St=E0(F,ee.baseline.ready,M),pt=St==="unavailable"?"Reference not ready":St==="equal"?"At threshold — not exceeded":St==="exceeded"?"Above upper demo threshold":St==="approaching"?"Approaching upper demo threshold":"At or below upper demo threshold",Dt=ft.useCallback(st=>le(st),[]),q=ft.useCallback(()=>re(!0),[]);return b.jsxs(b.Fragment,{children:[b.jsxs("header",{className:"site-header",children:[b.jsxs("a",{href:"#top",className:"wordmark","aria-label":"Silent-Ear home",children:[b.jsx("span",{className:"wordmark-mark","aria-hidden":"true",children:"SE"}),b.jsx("span",{children:"SILENT-EAR"})]}),b.jsxs("nav",{"aria-label":"Page sections",children:[b.jsx("a",{href:"#scenario-lab",children:"Scenario lab"}),b.jsx("a",{href:"#technical-flow",children:"Technical flow"})]})]}),b.jsxs("main",{id:"main-content",children:[b.jsxs("section",{id:"top",className:"hero","aria-labelledby":"hero-title",children:[b.jsxs("div",{className:"hero-copy",children:[b.jsx("p",{className:"act-label",children:"Act I · The invisible signal change"}),b.jsx("p",{className:"eyebrow",children:"SILENT-EAR · CONTROLLED DEMO"}),b.jsx("h1",{id:"hero-title",children:"See a statistical deviation, step by step."}),b.jsx("p",{className:"hero-support",children:"Follow eight vibration-derived RMS values through a fixed demo reference and an inspectable upper-threshold rule."}),b.jsxs("div",{className:"hero-actions",children:[b.jsx("button",{className:"primary-action",type:"button",onClick:Ne,children:"Run the controlled demo"}),b.jsx("a",{className:"secondary-action",href:"#technical-flow",children:"Inspect the technical flow"})]}),b.jsxs("div",{className:"source-row",children:[b.jsxs("span",{className:"source-chip",children:["CONTROLLED DEMO · ",ee.fixtureContract]}),b.jsx("span",{children:ee.scenarioTitle})]}),b.jsx("p",{className:"safety-line",children:"Demonstration and educational software; not certified for safety-critical industrial use."})]}),b.jsxs("div",{className:"hero-machine",children:[b.jsxs("figure",{className:"scene-figure",children:[b.jsx(Mw,{snapshot:ee,selectedChannel:W,playing:f,reducedMotion:e,forceFallback:H,modelMode:U,selectedStation:_,selectedAxis:L,cameraResetKey:P,onStationSelect:ve,onFallback:q,onMetrics:Dt}),b.jsx("figcaption",{children:ee.visualizationLabel})]}),b.jsx(x_,{mode:U,station:_,axis:L,playing:f,reducedMotion:e,measurement:{channelId:rc[W],channelLabel:F.label,currentRms:ee.currentReadingAvailable?F.rms:null,fixedMean:F.mean,standardDeviation:F.standardDeviation,upperThreshold:F.upperThreshold,comparisonLabel:pt,comparisonGlyph:St,units:"demo units"},exceededChannels:ee.thresholdExceededChannels.map(st=>rc[st]),onModeChange:Ke,onStationChange:ve,onAxisChange:Re,onResetCamera:()=>R(st=>st+1),onTogglePlayback:Q})]})]}),b.jsxs("section",{className:"mechanism-strip","aria-labelledby":"mechanism-title",children:[b.jsx("p",{className:"act-label",children:"Act II · How Silent-Ear listens"}),b.jsx("h2",{id:"mechanism-title",children:"RMS input → fixed reference → upper comparison → inspectable result"}),b.jsx("p",{children:"RMS values, not a raw waveform. Each point summarizes one controlled fixture window."})]}),b.jsxs("section",{id:"scenario-lab",ref:oe,className:"lab","aria-label":"Controlled scenario laboratory",children:[b.jsxs("div",{className:"lab-status",children:[b.jsx(S_,{snapshot:ee}),b.jsxs("div",{className:"playback-card","aria-label":"Guided journey controls",children:[b.jsxs("div",{children:[b.jsx("p",{className:"section-kicker",children:"Guided journey"}),b.jsx("p",{children:g?"76-second paced explanation":"Direct inspection mode"})]}),b.jsxs("div",{className:"playback-actions",children:[b.jsx("button",{type:"button",onClick:Q,disabled:e,children:e?"Playback paused":f?"Pause journey":"Play journey"}),b.jsx("button",{type:"button",onClick:he,children:"Skip guided journey"})]}),e&&b.jsx("p",{className:"mode-note",children:"Reduced motion is active. Playback starts paused; use the window controls for direct steps."})]})]}),b.jsx(Tw,{frames:ue.frames,visibleFrames:ee.rmsTimeline,frameIndex:ce,selectedChannel:W,channelLabel:F.label,upperThreshold:F.upperThreshold,onFrameChange:se}),b.jsxs("div",{className:"lab-controls-grid",children:[b.jsx(M_,{scenarios:g0.map(st=>ia[st]),selected:t,onSelect:Se,headingRef:de}),b.jsxs("section",{className:"sensitivity-card","aria-labelledby":"sensitivity-title",children:[b.jsx("p",{className:"section-kicker",children:"Educational control"}),b.jsx("h2",{id:"sensitivity-title",children:"Demo threshold sensitivity (kσ)"}),b.jsxs("label",{htmlFor:"threshold-range",children:["Selected multiplier: ",M.toFixed(2),"σ"]}),b.jsx("input",{id:"threshold-range",type:"range",min:"1",max:"6",step:"0.25",value:M,onChange:st=>{w(Number(st.currentTarget.value)),p(!1),S(!1)}}),b.jsx("p",{children:"Changes the educational comparison rule for this fixture; the fixed reference and RMS values do not change."}),b.jsxs("dl",{className:"selected-facts",children:[b.jsxs("div",{children:[b.jsx("dt",{children:"Selected channel"}),b.jsx("dd",{children:F.label})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Current RMS"}),b.jsx("dd",{children:ee.currentReadingAvailable?`${F.rms.toFixed(5)} demo units`:"Not started"})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Fixed mean"}),b.jsx("dd",{children:F.mean?.toFixed(5)??"Not ready"})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Upper rule"}),b.jsx("dd",{children:F.upperThreshold?.toFixed(5)??"Not ready"})]})]})]})]}),b.jsx(m_,{snapshot:ee,selectedChannel:W,onSelectChannel:Ue})]}),b.jsxs("section",{id:"technical-flow",className:"technical-flow","aria-labelledby":"technical-title",children:[b.jsx("p",{className:"act-label",children:"Act IV · Evidence and next step"}),b.jsx("h2",{id:"technical-title",children:"Inspect the technical flow"}),b.jsx("p",{className:"technical-intro",children:"One deterministic fixture drives the explanatory motion, RMS timeline, fixed statistics, upper threshold, status, score and scrubber."}),b.jsx(Ew,{}),b.jsxs("div",{className:"evidence-grid",children:[b.jsxs("article",{children:[b.jsx("p",{className:"section-kicker",children:"Source-backed surfaces"}),b.jsx("h3",{children:"Local Rust service"}),b.jsx("p",{children:"REST status, WebSocket updates, optional MQTT publishing, Prometheus-format metrics and ARM64 build configuration are implementation surfaces—not device validation."})]}),b.jsxs("article",{children:[b.jsx("p",{className:"section-kicker",children:"Renderer evidence"}),b.jsx("h3",{children:"Measured in this view"}),K?b.jsxs("dl",{className:"renderer-metrics","data-testid":"renderer-metrics",children:[b.jsxs("div",{children:[b.jsx("dt",{children:"Quality tier"}),b.jsx("dd",{children:K.tier})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Capped DPR"}),b.jsx("dd",{children:K.dpr.toFixed(2)})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Draw calls"}),b.jsx("dd",{children:K.drawCalls})]}),b.jsxs("div",{children:[b.jsx("dt",{children:"Triangles"}),b.jsx("dd",{children:K.triangles.toLocaleString()})]})]}):b.jsx("p",{children:"3D renderer metrics are unavailable in the complete 2D mode."})]}),b.jsxs("article",{children:[b.jsx("p",{className:"section-kicker",children:"Boundary"}),b.jsx("h3",{children:"Statistical comparison only"}),b.jsx("p",{children:"This demonstration does not identify a physical cause, forecast future behavior, or measure machine condition."})]})]}),b.jsxs("aside",{className:"final-boundary","aria-label":"Safety and next step",children:[b.jsx("p",{children:"Demonstration and educational software; not certified for safety-critical industrial use."}),b.jsx("p",{children:"Review the controlled states and technical boundary locally before discussing any pilot evaluation."})]})]})]}),b.jsxs("footer",{children:[b.jsx("span",{children:"Silent-Ear · Controlled product experience"}),b.jsxs("span",{children:[ee.fixtureContract," · SAMPLE DATA"]})]})]})}const T0=document.getElementById("root");if(!T0)throw new Error("Silent-Ear application root was not found.");p_.createRoot(T0).render(b.jsx(ft.StrictMode,{children:b.jsx(Fw,{})}));
