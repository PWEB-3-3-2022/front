import{S as v,i as y,s as $,e as f,a as z,b as u,c as w,d,f as g,n as h,g as _,h as M,m as q,t as m,j as p,k as O,l as A,o as N,p as S}from"./vendor.d8fae489.js";const T=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}};T();function B(o){let t,s,n,e,r;return{c(){t=f("div"),s=f("img"),e=z(),r=f("div"),r.innerHTML=`<h4>title</h4> 
        <span>year</span>`,u(s,"class","thumbnail svelte-1wzngsc"),w(s.src,n=o[0])||u(s,"src",n),u(s,"alt","thumbnail"),u(r,"class","mosaic-tile-details svelte-1wzngsc"),u(t,"class","mosaic-tile svelte-1wzngsc")},m(i,l){d(i,t,l),g(t,s),g(t,e),g(t,r)},p(i,[l]){l&1&&!w(s.src,n=i[0])&&u(s,"src",n)},i:h,o:h,d(i){i&&_(t)}}}function C(o,t,s){let{item:n}=t;return o.$$set=e=>{"item"in e&&s(0,n=e.item)},[n]}class E extends v{constructor(t){super();y(this,t,C,B,$,{item:0})}}function k(o,t,s){const n=o.slice();return n[1]=t[s],n}function L(o){let t;return{c(){t=f("p"),t.textContent="Loading ..."},m(s,n){d(s,t,n)},d(s){s&&_(t)}}}function x(o){let t,s;return t=new E({props:{item:o[1]}}),{c(){M(t.$$.fragment)},m(n,e){q(t,n,e),s=!0},p(n,e){const r={};e&1&&(r.item=n[1]),t.$set(r)},i(n){s||(m(t.$$.fragment,n),s=!0)},o(n){p(t.$$.fragment,n),s=!1},d(n){O(t,n)}}}function I(o){let t,s,n=o[0],e=[];for(let l=0;l<n.length;l+=1)e[l]=x(k(o,n,l));const r=l=>p(e[l],1,1,()=>{e[l]=null});let i=null;return n.length||(i=L()),{c(){t=f("div");for(let l=0;l<e.length;l+=1)e[l].c();i&&i.c(),u(t,"class","mosaic svelte-qk7oo4")},m(l,a){d(l,t,a);for(let c=0;c<e.length;c+=1)e[c].m(t,null);i&&i.m(t,null),s=!0},p(l,[a]){if(a&1){n=l[0];let c;for(c=0;c<n.length;c+=1){const b=k(l,n,c);e[c]?(e[c].p(b,a),m(e[c],1)):(e[c]=x(b),e[c].c(),m(e[c],1),e[c].m(t,null))}for(A(),c=n.length;c<e.length;c+=1)r(c);N(),n.length?i&&(i.d(1),i=null):i||(i=L(),i.c(),i.m(t,null))}},i(l){if(!s){for(let a=0;a<n.length;a+=1)m(e[a]);s=!0}},o(l){e=e.filter(Boolean);for(let a=0;a<e.length;a+=1)p(e[a]);s=!1},d(l){l&&_(t),S(e,l),i&&i.d()}}}function P(o,t,s){let{items:n=[]}=t;return o.$$set=e=>{"items"in e&&s(0,n=e.items)},[n]}class j extends v{constructor(t){super();y(this,t,P,I,$,{items:0})}}function F(o){let t,s,n;return s=new j({props:{items:o[0]}}),{c(){t=f("main"),M(s.$$.fragment),u(t,"class","svelte-12k1e54")},m(e,r){d(e,t,r),q(s,t,null),n=!0},p:h,i(e){n||(m(s.$$.fragment,e),n=!0)},o(e){p(s.$$.fragment,e),n=!1},d(e){e&&_(t),O(s)}}}function H(o){const t=[];for(let s=0;s<20;s+=1)t.push("https://api.lorem.space/image/movie?w=180&h=220");return[t]}class K extends v{constructor(t){super();y(this,t,H,F,$,{})}}new K({target:document.getElementById("app")});
