import{S as w,i as x,s as k,e as p,a as H,t as C,b as f,c as N,d as _,f as g,g as z,n as h,h as v,j as L,m as A,k as y,l as q,o as M,p as X,q as Y,r as Z,u as U,v as ee,w as D,x as R,y as F,z as K,A as te,B as G,C as O,D as P,E as T,R as se}from"./vendor.34dc7df8.js";const ne=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}};ne();function le(l){let e,s,t,n,r,i,a=l[0].title+"",c,o,m,$=l[0].year+"",d;return{c(){e=p("div"),s=p("img"),n=H(),r=p("div"),i=p("h4"),c=C(a),o=H(),m=p("span"),d=C($),f(s,"alt","thumbnail"),f(s,"class","thumbnail svelte-1wzngsc"),N(s.src,t=l[0].poster)||f(s,"src",t),f(i,"class","text-xl"),f(m,"class","text-sm"),f(r,"class","mosaic-tile-details svelte-1wzngsc"),f(e,"class","mosaic-tile svelte-1wzngsc")},m(b,j){_(b,e,j),g(e,s),g(e,n),g(e,r),g(r,i),g(i,c),g(r,o),g(r,m),g(m,d)},p(b,[j]){j&1&&!N(s.src,t=b[0].poster)&&f(s,"src",t),j&1&&a!==(a=b[0].title+"")&&z(c,a),j&1&&$!==($=b[0].year+"")&&z(d,$)},i:h,o:h,d(b){b&&v(e)}}}function re(l,e,s){let{media:t}=e;return l.$$set=n=>{"media"in n&&s(0,t=n.media)},[t]}class ae extends w{constructor(e){super();x(this,e,re,le,k,{media:0})}}function W(l,e,s){const t=l.slice();return t[1]=e[s],t}function J(l){let e;return{c(){e=p("p"),e.textContent="Loading ..."},m(s,t){_(s,e,t)},d(s){s&&v(e)}}}function Q(l){let e,s;return e=new ae({props:{media:l[1]}}),{c(){L(e.$$.fragment)},m(t,n){A(e,t,n),s=!0},p(t,n){const r={};n&1&&(r.media=t[1]),e.$set(r)},i(t){s||(y(e.$$.fragment,t),s=!0)},o(t){q(e.$$.fragment,t),s=!1},d(t){M(e,t)}}}function ie(l){let e,s,t=l[0],n=[];for(let a=0;a<t.length;a+=1)n[a]=Q(W(l,t,a));const r=a=>q(n[a],1,1,()=>{n[a]=null});let i=null;return t.length||(i=J()),{c(){e=p("div");for(let a=0;a<n.length;a+=1)n[a].c();i&&i.c(),f(e,"class","mosaic svelte-qk7oo4")},m(a,c){_(a,e,c);for(let o=0;o<n.length;o+=1)n[o].m(e,null);i&&i.m(e,null),s=!0},p(a,[c]){if(c&1){t=a[0];let o;for(o=0;o<t.length;o+=1){const m=W(a,t,o);n[o]?(n[o].p(m,c),y(n[o],1)):(n[o]=Q(m),n[o].c(),y(n[o],1),n[o].m(e,null))}for(X(),o=t.length;o<n.length;o+=1)r(o);Y(),t.length?i&&(i.d(1),i=null):i||(i=J(),i.c(),i.m(e,null))}},i(a){if(!s){for(let c=0;c<t.length;c+=1)y(n[c]);s=!0}},o(a){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)q(n[c]);s=!1},d(a){a&&v(e),Z(n,a),i&&i.d()}}}function oe(l,e,s){let{medias:t=[]}=e;return l.$$set=n=>{"medias"in n&&s(0,t=n.medias)},[t]}class V extends w{constructor(e){super();x(this,e,oe,ie,k,{medias:0})}}function ce(l){let e,s,t;return s=new V({props:{medias:l[0]}}),{c(){e=p("main"),L(s.$$.fragment),f(e,"class","svelte-1qxxaxi")},m(n,r){_(n,e,r),A(s,e,null),t=!0},p:h,i(n){t||(y(s.$$.fragment,n),t=!0)},o(n){q(s.$$.fragment,n),t=!1},d(n){n&&v(e),M(s)}}}function ue(l){const e=[];for(let s=0;s<20;s+=1)e.push({poster:"https://api.lorem.space/image/movie?w=180&h=220"});return[e]}class fe extends w{constructor(e){super();x(this,e,ue,ce,k,{})}}const pe="https://tcflix.herokuapp.com";async function me(l){return(await fetch(`${pe}/medias/search?query=${l}`)).json()}function de(l){let e,s,t,n,r,i,a,c;return a=new V({props:{medias:l[1]}}),{c(){e=p("main"),s=p("span"),t=C('Results for "'),n=C(l[0]),r=C('"'),i=H(),L(a.$$.fragment)},m(o,m){_(o,e,m),g(e,s),g(s,t),g(s,n),g(s,r),g(e,i),A(a,e,null),c=!0},p(o,[m]){(!c||m&1)&&z(n,o[0]);const $={};m&2&&($.medias=o[1]),a.$set($)},i(o){c||(y(a.$$.fragment,o),c=!0)},o(o){q(a.$$.fragment,o),c=!1},d(o){o&&v(e),M(a)}}}function ge(l,e,s){let t,n;U(l,D,a=>s(3,t=a));let r=new URLSearchParams(t).get("query");const i=ee(D,(a,c)=>{s(0,r=new URLSearchParams(a).get("query")),me(r).then(c).catch(o=>console.log(`Failed to search for medias : ${o}`))});return U(l,i,a=>s(1,n=a)),[r,n,i]}class _e extends w{constructor(e){super();x(this,e,ge,de,k,{})}}function ve(l){let e,s,t,n;return{c(){e=p("p"),e.textContent="Hello there",s=H(),t=p("img"),N(t.src,n="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.redd.it%2Fcaa6g5u9amoy.jpg&f=1&nofb=1")||f(t,"src",n),f(t,"alt","obiwan")},m(r,i){_(r,e,i),_(r,s,i),_(r,t,i)},p:h,i:h,o:h,d(r){r&&v(e),r&&v(s),r&&v(t)}}}class he extends w{constructor(e){super();x(this,e,null,ve,k,{})}}var $e="/front/assets/tcflix_logo.a4acd197.png";function be(l){let e,s,t;return{c(){e=p("a"),s=p("img"),N(s.src,t=$e)||f(s,"src",t),f(s,"alt","logo"),f(s,"width","119"),f(s,"height","45"),f(e,"href","#/")},m(n,r){_(n,e,r),g(e,s)},p:h,i:h,o:h,d(n){n&&v(e)}}}class ye extends w{constructor(e){super();x(this,e,null,be,k,{})}}function qe(l){let e,s,t;return{c(){e=p("button"),e.innerHTML='<svg height="24" width="32" class="svelte-1k9t7ut"><line id="top" x1="0" x2="32" y1="2" y2="2" class="svelte-1k9t7ut"></line><line id="middle" x1="0" x2="24" y1="12" y2="12" class="svelte-1k9t7ut"></line><line id="bottom" x1="0" x2="32" y1="22" y2="22" class="svelte-1k9t7ut"></line></svg>',f(e,"class","text-white hover:text-gray-800 cursor-pointer mr-4 border-none focus:outline-none svelte-1k9t7ut"),R(e,"open",l[0])},m(n,r){_(n,e,r),s||(t=F(e,"click",l[1]),s=!0)},p(n,[r]){r&1&&R(e,"open",n[0])},i:h,o:h,d(n){n&&v(e),s=!1,t()}}}function we(l,e,s){let{open:t=!1}=e;const n=()=>{s(0,t=!t)};return l.$$set=r=>{"open"in r&&s(0,t=r.open)},[t,n]}class xe extends w{constructor(e){super();x(this,e,we,qe,k,{open:0})}}function ke(l){let e,s,t,n,r;return{c(){e=p("div"),s=p("form"),t=p("input"),f(t,"type","text"),f(t,"id","search-input"),f(t,"name","query"),f(t,"placeholder","Search..."),f(t,"class","svelte-1rhvl8h"),f(e,"class","searchContainer svelte-1rhvl8h")},m(i,a){_(i,e,a),g(e,s),g(s,t),K(t,l[0]),n||(r=[F(t,"input",l[3]),F(t,"keyup",l[2]),F(s,"submit",l[1])],n=!0)},p(i,[a]){a&1&&t.value!==i[0]&&K(t,i[0])},i:h,o:h,d(i){i&&v(e),n=!1,te(r)}}}function je(l,e,s){let t="";function n(a){a.preventDefault(),G(`/search?query=${t}`)}function r(){G(`/search?query=${t}`)}function i(){t=this.value,s(0,t)}return[t,n,r,i]}class Se extends w{constructor(e){super();x(this,e,je,ke,k,{})}}function Le(l){let e,s,t,n,r,i,a,c,o;function m(d){l[1](d)}let $={};return l[0]!==void 0&&($.open=l[0]),t=new xe({props:$}),O.push(()=>P(t,"open",m)),i=new ye({}),c=new Se({}),{c(){e=p("header"),s=p("nav"),L(t.$$.fragment),r=H(),L(i.$$.fragment),a=H(),L(c.$$.fragment),f(s,"class","flex"),f(e,"class","bg-black p-2 text-xl text-red-600")},m(d,b){_(d,e,b),g(e,s),A(t,s,null),g(s,r),A(i,s,null),g(s,a),A(c,s,null),o=!0},p(d,[b]){const j={};!n&&b&1&&(n=!0,j.open=d[0],T(()=>n=!1)),t.$set(j)},i(d){o||(y(t.$$.fragment,d),y(i.$$.fragment,d),y(c.$$.fragment,d),o=!0)},o(d){q(t.$$.fragment,d),q(i.$$.fragment,d),q(c.$$.fragment,d),o=!1},d(d){d&&v(e),M(t),M(i),M(c)}}}function Ae(l,e,s){let{sidebar:t=!1}=e;function n(r){t=r,s(0,t)}return l.$$set=r=>{"sidebar"in r&&s(0,t=r.sidebar)},[t,n]}class Me extends w{constructor(e){super();x(this,e,Ae,Le,k,{sidebar:0})}}function He(l){let e;return{c(){e=p("aside"),e.innerHTML=`<nav class="p-12 text-xl"><a class="block text-white hover:text-red-600" href="#/">Home</a> 
        <a class="block text-white hover:text-red-600" href="#/about">About</a></nav>`,f(e,"class","absolute w-half h-full bg-black border-r-2 shadow-lg svelte-wqzycy"),R(e,"open",l[0])},m(s,t){_(s,e,t)},p(s,[t]){t&1&&R(e,"open",s[0])},i:h,o:h,d(s){s&&v(e)}}}function Ce(l,e,s){let{open:t=!1}=e;return l.$$set=n=>{"open"in n&&s(0,t=n.open)},[t]}class Fe extends w{constructor(e){super();x(this,e,Ce,He,k,{open:0})}}function Ne(l){let e;return{c(){e=p("footer"),e.innerHTML=`<div class="contain svelte-75q67j"><div class="col svelte-75q67j"><h1 class="svelte-75q67j">Company</h1> 
            <ul class="svelte-75q67j"><li class="svelte-75q67j">About</li> 
                <li class="svelte-75q67j">Mission</li> 
                <li class="svelte-75q67j">Services</li> 
                <li class="svelte-75q67j">Social</li> 
                <li class="svelte-75q67j">Get in touch</li></ul></div> 
        <div class="col svelte-75q67j"><h1 class="svelte-75q67j">Support</h1> 
            <ul class="svelte-75q67j"><li class="svelte-75q67j">Contact us</li> 
                <li class="svelte-75q67j">Web chat</li> 
                <li class="svelte-75q67j">Open ticket</li></ul></div> 
        <div class="col social svelte-75q67j"><h1 class="svelte-75q67j">Social</h1> 
            <ul class="svelte-75q67j"><li class="svelte-75q67j"><img src="https://svgshare.com/i/5fq.svg" width="32" style="width: 32px;" alt="Social Network"/></li> 
                <li class="svelte-75q67j"><img src="https://svgshare.com/i/5eA.svg" width="32" style="width: 32px;" alt="Social Network"/></li> 
                <li class="svelte-75q67j"><img src="https://svgshare.com/i/5f_.svg" width="32" style="width: 32px;" alt="Social Network"/></li></ul></div> 
        <div class="clearfix svelte-75q67j"></div></div>`,f(e,"class","footer svelte-75q67j")},m(s,t){_(s,e,t)},p:h,i:h,o:h,d(s){s&&v(e)}}}class Re extends w{constructor(e){super();x(this,e,null,Ne,k,{})}}function ze(l){let e,s,t,n,r,i,a,c,o,m,$;function d(u){l[3](u)}let b={};l[0]!==void 0&&(b.open=l[0]),e=new Fe({props:b}),O.push(()=>P(e,"open",d));function j(u){l[4](u)}let B={};return l[0]!==void 0&&(B.sidebar=l[0]),n=new Me({props:B}),O.push(()=>P(n,"sidebar",j)),c=new se({props:{routes:l[1]}}),c.$on("routeLoaded",l[2]),m=new Re({}),{c(){L(e.$$.fragment),t=H(),L(n.$$.fragment),i=H(),a=p("div"),L(c.$$.fragment),o=H(),L(m.$$.fragment),f(a,"id","main"),f(a,"class","svelte-1fyb8ly")},m(u,S){A(e,u,S),_(u,t,S),A(n,u,S),_(u,i,S),_(u,a,S),A(c,a,null),_(u,o,S),A(m,u,S),$=!0},p(u,[S]){const E={};!s&&S&1&&(s=!0,E.open=u[0],T(()=>s=!1)),e.$set(E);const I={};!r&&S&1&&(r=!0,I.sidebar=u[0],T(()=>r=!1)),n.$set(I)},i(u){$||(y(e.$$.fragment,u),y(n.$$.fragment,u),y(c.$$.fragment,u),y(m.$$.fragment,u),$=!0)},o(u){q(e.$$.fragment,u),q(n.$$.fragment,u),q(c.$$.fragment,u),q(m.$$.fragment,u),$=!1},d(u){M(e,u),u&&v(t),M(n,u),u&&v(i),u&&v(a),M(c),u&&v(o),M(m,u)}}}function Oe(l,e,s){let t=!1;const n={"/":fe,"/search":_e,"/about":he};function r(){s(0,t=!1)}function i(c){t=c,s(0,t)}function a(c){t=c,s(0,t)}return[t,n,r,i,a]}class Pe extends w{constructor(e){super();x(this,e,Oe,ze,k,{})}}new Pe({target:document.getElementById("app")});
