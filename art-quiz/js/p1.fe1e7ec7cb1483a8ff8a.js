(()=>{var e={367:()=>{const e=document.querySelector(".main-screen"),t=document.querySelector(".question-author-text"),s=document.querySelector(".artists"),c=document.querySelector(".pictures"),n=document.querySelector(".categories"),o=document.querySelector(".question"),a=document.querySelector(".settings"),r=document.querySelector(".categories__items"),i=document.querySelector(".question-container");let d,l,m,u,_,g,p=0,v=0,L=[];function h(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}function y(e){e.sort((()=>Math.random()-.5))}function E(e){const t=document.querySelector(`audio[data-volume="${e}"]`);t.currentTime=0,t.play()}function f(){"author"===g?function(){i.innerHTML="";const e=document.createElement("div");e.classList.add("question-author__wrapper"),i.append(e),t.textContent="Кто автор данной картины?";let s=l[u][p].imageNum;const c=document.createElement("img");c.src=`https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/${s}.jpg`,c.alt="picture",e.append(c),m=l[u][p].author;const n=new Set;for(n.add(m);n.size<4;){let e=h(0,d.length-1);n.add(d[e].author)}const o=Array.from(n);y(o);const a=document.createElement("ul");a.classList.add("question-author__answers","answers"),o.map((e=>{const t=document.createElement("li");t.classList.add("answers__item"),t.textContent=e,t.setAttribute("data-answer",e),a.append(t)})),i.append(a),a.addEventListener("click",(e=>{e.target.classList.contains("answers__item")&&b(e)}))}():function(){i.innerHTML="";const e=document.createElement("div");e.classList.add("picture-container"),i.append(e);let s=l[u][p].author;t.textContent=`Какую картину нарисовал ${s}?`,m=l[u][p].imageNum;const c=new Set;for(c.add(m);c.size<4;){let e=h(0,d.length-1);c.add(d[e].imageNum)}const n=Array.from(c);y(n),n.map(((t,s)=>{const c=document.createElement("img");c.classList.add("question-picture__item"),c.src=`https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/${t}.jpg`,c.setAttribute("data-answer",t),c.alt=`picture${s+1}`,c.onload=function(){e.append(c)}})),e.addEventListener("click",(e=>{e.target.classList.contains("question-picture__item")&&b(e)}))}(),S()}async function q(){try{g=this.id;const t="./assets/data/data.json",s=await async function(e){const t=await fetch(e);return await t.json()}(t);d="author"===g?s.slice(0,120):s.slice(120),_=10,l=function(e,t){const s=[];for(let t=0;t<e.length;t+=10)s.push(e.slice(t,t+10));return s}(d),function(e){let t="";const s=["Portrait","Landscape","Still life","Graphic","Antique","Avant-garde","Renaissance","Surrealism","Kitsch","Minimalism","Interior","Industrial"];let c;e.map(((e,n)=>{c=document.createElement("img"),c.src=`https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/${e[0].imageNum}.jpg`,t+=`<div class="categories__item category-item" id = "${n}">\n     <div class="category-item__header">\n       <div class="category-item__title">${s[n]}</div>\n       <div class="category-item__total"></div>\n     </div>\n     <div class="category-item__img">\n       <img src = ${c.src}>     \n     </div>\n     <button class="category-item__score" id = "${n}">Score</button>\n   </div>`})),c.onload=function(){r.innerHTML=t}}(l),e.classList.add("hide"),n.classList.remove("hide")}catch(e){alert(e)}}function S(){const e=document.createElement("div");e.classList.add("progress-bar"),"picture"===g?document.querySelector(".picture-container").append(e):document.querySelector(".question-author__wrapper").append(e);let t="";for(let e=0;e<10;e++)t+="<div class = 'progress-bar__item'></div>";e.innerHTML=t;const s=document.querySelectorAll(".progress-bar__item");for(let e=0;e<p;e++)!0===L[e]?s[e].classList.add("progress-bar__item_correct"):s[e].classList.add("progress-bar__item_wrong")}function b(e){!function(){const e=document.querySelector(".modal__content"),t=l[u][p].imageNum,s=l[u][p].name,c=l[u][p].author,n=l[u][p].year;e.innerHTML="";const o=document.createElement("div");o.classList.add("modal__answer");const a=document.createElement("img");a.classList.add("modal__img"),a.src=`https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/${t}.jpg`;const r=document.createElement("div");r.classList.add("modal__title","text"),r.textContent=`${s}`;const i=document.createElement("div");i.classList.add("modal__author","text"),i.textContent=`${c}`;const d=document.createElement("div");d.classList.add("modal__year","text"),d.textContent=`${n}`;const m=document.createElement("button");m.classList.add("button","button-next"),m.textContent="Next",e.append(o),e.append(a),e.append(r),e.append(i),e.append(d),e.append(m),modal.classList.add("open"),m.addEventListener("click",x)}();const t=document.querySelector(".modal__answer");document.querySelectorAll(".progress-bar__item"),e.target.dataset.answer===m?(L[p]=!0,t.classList.add("correct"),v++,E("correct")):(L[p]=!1,t.classList.add("wrong"),E("wrong"))}function x(){if(p++,p<_)modal.classList.remove("open"),f();else{modal.classList.remove("open"),function(){const t=document.querySelector(".modal__content");t.innerHTML="";const s=document.createElement("div");s.classList.add("modal__cong","text"),s.textContent="Congratulations!";const c=document.createElement("div");c.classList.add("modal__result","text"),c.textContent=`${v} / ${_}`;const a=document.createElement("div");a.classList.add("modal__good");const r=document.createElement("div");r.classList.add("modal__wrapper");const i=document.createElement("button");i.classList.add("button","button-next-quiz"),i.textContent="Next Quiz";const d=document.createElement("button");d.classList.add("button","modal-button-home"),d.textContent="Home",t.append(s),t.append(c),t.append(a),t.append(r),r.append(i),r.append(d),modal.classList.add("open"),i.addEventListener("click",(()=>{modal.classList.remove("open"),o.classList.add("hide"),n.classList.remove("hide")})),d.addEventListener("click",(()=>{modal.classList.remove("open"),o.classList.add("hide"),e.classList.remove("hide")})),E("congrat")}();const t=document.querySelector(`.category-item[id="${u}"]`);document.querySelector(`.category-item[id="${u}"] .category-item__total`).textContent=v,t.classList.add("category-item-played")}}r.addEventListener("click",(e=>{e.target.closest(".category-item")&&!e.target.closest(".category-item__score")&&(u=e.target.closest(".category-item").id,v=0,p=0,f(),S(),n.classList.add("hide"),o.classList.remove("hide"))})),r.addEventListener("click",(e=>{e.target.closest(".category-item__score")&&(u=e.target.closest(".category-item__score").id,console.log(L),function(){const e=document.querySelector(".score__items");let t="";l[u].forEach(((s,c)=>{t=`<div class="score__item score-item" id = "${c}">\n     <div class="score-item__header">\n       <div class="score-item__title">01</div>\n     </div>\n     <div class="score-item__img">\n       <img src = https://raw.githubusercontent.com/ElenaPogodaeva/image-data/master/img/${s.imageNum}.jpg>     \n     </div>\n     <div class="score-item__info">\n       <p class="score-item__text text">${s.name}</p>\n       <p class="score-item__text text">${s.author}</p>\n       <p class="score-item__text text">${s.year}</p>\n     </div>\n    </div>`,e.insertAdjacentHTML("afterbegin",t);const n=document.querySelector(".score__item");!0===L[c]&&n.classList.add("score-item-correct")})),Array.from(document.querySelectorAll(".score__item")).forEach(((e,t)=>{e.addEventListener("click",(()=>{document.querySelectorAll(".score-item__info")[t].classList.toggle("score-item__info_show")}))}))}())})),document.querySelector(".categories__button").addEventListener("click",(()=>{n.classList.add("hide"),e.classList.remove("hide")})),document.querySelector(".question__button-home").addEventListener("click",(()=>{o.classList.add("hide"),e.classList.remove("hide")})),document.querySelector(".question__button-categories").addEventListener("click",(()=>{o.classList.add("hide"),n.classList.remove("hide")}));const w=document.querySelector(".score");r.addEventListener("click",(e=>{e.target.closest(".category-item__score")&&(n.classList.add("hide"),w.classList.remove("hide"))})),document.querySelector(".score__home").addEventListener("click",(()=>{w.classList.add("hide"),e.classList.remove("hide")})),document.querySelector(".score__categories").addEventListener("click",(()=>{w.classList.add("hide"),n.classList.remove("hide")})),s.addEventListener("click",q),c.addEventListener("click",q);const $=document.querySelector(".volume-progress"),k=document.querySelector(".volume__icon"),A=($.value,Array.from(document.querySelectorAll("audio"))),M=A[0];function C(){const e=$.value;$.style.background=`linear-gradient(to right, #710707 0%, #710707 ${100*e}%, #c4c4c4 ${100*e}%, #c4c4c4 100%)`}M.addEventListener("volumechange",(function(){M.muted||0===M.volume?k.classList.add("mute"):k.classList.remove("mute")})),k.addEventListener("click",(function(){A.forEach((e=>{e.muted?(e.muted=!1,$.value=.5,e.volume=$.value,C()):(e.muted=!0,$.value=0,C())}))})),$.addEventListener("input",(function(){const e=$.value;A.forEach((t=>{t.volume=e,0===t.volume?t.muted=!0:t.muted=!1,C()}))})),document.querySelector(".button-settings").addEventListener("click",(()=>{e.classList.add("hide"),a.classList.remove("hide")})),document.querySelector(".settings__button").addEventListener("click",(()=>{a.classList.add("hide"),e.classList.remove("hide")}))}},t={};function s(c){var n=t[c];if(void 0!==n)return n.exports;var o=t[c]={exports:{}};return e[c](o,o.exports,s),o.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var c in t)s.o(t,c)&&!s.o(e,c)&&Object.defineProperty(e,c,{enumerable:!0,get:t[c]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";s(367)})()})();