(()=>{var e={450:()=>{console.log('\nСамооценка\n\n1. Вёрстка валидная +10\n2. Вёрстка семантическая +24\nВ коде страницы присутствуют семантические теги\n(header, nav, main, aside, section, code, footer, h1, h2, h3)\n3. Вёрстка соответствует макету +43\n4. Форма покупки билетов +16\n  - форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии.\n  В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран. \n  Форма и overlay прокручиваются вместе со страницей +2\n  - форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay +1\n  - при вёрстке формы используются следующие элементы: form, input type="date", input type="time", input type="text",\ninput type="email", input type="tel", input type="number", select +8\n  - вёрстка формы соответствует макету +5\n5. Требования к css +17\n  - добавлен favicon +2\n  - для построения сетки используются флексы или гриды +2\n  - при уменьшении масштаба страницы браузера вёрстка размещается по центру +2\n  - фоновый цвет каждого блока и секции тянется на всю ширину страницы +2\n  - иконки добавлены в формате .svg +2\n  - расстояние между буквами регулируется letter-spacing +2\n  - переключаются радиокнопки в блоке Tickets, одновременно может быть выбрана только одна кнопка +2\n  - в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel +2\n  - в футере добавлены ссылки на соцсети +1\n6. Интерактивность, реализуемая через css +21\n  - плавная прокрутка по якорям +5\n  - параллакс +5\n  - при кликам по кнопке Discover the Louvre и карточкам секции Visiting открываются полноэкранные панорамы Google Street View\n  встроенные при помощи iframe +5\n  - именение стиля интерактивных элементов при наведении и клике +6\n7. Интерактивность, реализуемая через js +14\n - можно передвигать ползунки громкости и прогресс-бар видео, при этом цвет шкалы до и после ползунка отличается и соответствует макету +2\n - кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20 +2\n - при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке + 10\n\nИтого: 145\n')},591:()=>{Array.from(document.querySelectorAll(".progress")).forEach((e=>e.addEventListener("input",(function(){const e=this.value;this.style.background=`linear-gradient(to right, #710707 0%, #710707 ${e}%, #c4c4c4 ${e}%, #c4c4c4 100%)`}))))}},s={};function t(a){var n=s[a];if(void 0!==n)return n.exports;var r=s[a]={exports:{}};return e[a](r,r.exports,t),r.exports}(()=>{"use strict";t(591),t(450);window.onload=function(){const e=["assets/img/galery/galery1.jpg","assets/img/galery/galery2.jpg","assets/img/galery/galery3.jpg","assets/img/galery/galery4.jpg","assets/img/galery/galery5.jpg","assets/img/galery/galery6.jpg","assets/img/galery/galery7.jpg","assets/img/galery/galery8.jpg","assets/img/galery/galery9.jpg","assets/img/galery/galery10.jpg","assets/img/galery/galery11.jpg","assets/img/galery/galery12.jpg","assets/img/galery/galery13.jpg","assets/img/galery/galery14.jpg","assets/img/galery/galery15.jpg"],s=document.querySelector(".picture-inner-container");e.sort((()=>Math.random()-.5)),e.map(((e,t)=>{const a=document.createElement("img");a.classList.add("gallery-img"),a.src=e,a.alt=`galery${t+1}`,s.append(a)}))}})()})();