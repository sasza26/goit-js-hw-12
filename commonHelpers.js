import{a as E,S as b,i as d}from"./assets/vendor-BpSrBs7K.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();async function m(t,r){const o="45476779-a37d3eb685934422065bcfa30",i="https://pixabay.com/api/",e={key:o,q:t,image_type:"photo",orientation:"horizontal",page:r,per_page:14,safesearch:!0};return(await E.get(i,{params:e})).data}function w(t){const{largeImageURL:r,webformatURL:o,tags:i,likes:e,views:s,comments:l,downloads:_}=t;return`<li class="gallery-item">
	<a class="gallery-link" href="${r}">
		<img    
            loading="lazy"
            src="${o}"
            alt="${i}"
            width="360"
            height="200"
            class="gallery-img"
        />
        <ul class="gallery-descript">
        <li class="gallery-descript__item"><span class="gallery-descript__span">likes</span> ${e}</li>
        <li class="gallery-descript__item"><span class="gallery-descript__span">Views</span> ${s}</li>
        <li class="gallery-descript__item"><span class="gallery-descript__span">Coments</span> ${l}</li>
        <li class="gallery-descript__item"><span class="gallery-descript__span">Dowloads</span> ${_}</li>
     </ul>
	</a>
</li>`}function g(t){return t.map(w).join("")}const a={formEl:document.querySelector(".form"),listEL:document.querySelector(".gallery"),loaderEl:document.querySelector(".loader"),loadMoreBtn:document.querySelector("[data-action=load-more]")},f=new b(".gallery a",{captionsData:"alt",captionDelay:250});let n=1,h=0,c;const v=15;a.formEl.addEventListener("submit",M);a.loadMoreBtn.addEventListener("click",S);async function M(t){if(t.preventDefault(),a.listEL.innerHTML="",n=1,c=t.target.elements.value.value.trim(),!c)d.error({title:"Error",message:"The search field is empty. Please try again!",position:"topRight"}),p();else{try{y();const r=await m(c,n);if(h=Math.ceil(r.totalHits/v),!r.hits.length)d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u(),p();else{const o=g(r.hits);a.listEL.insertAdjacentHTML("beforeend",o),f.refresh(),u(),L()}}catch(r){console.log(r)}a.formEl.reset()}}async function S(){n+=1,y();try{const t=await m(c,n),r=g(t.hits);a.listEL.insertAdjacentHTML("beforeend",r),f.refresh()}catch(t){console.log(t)}P(),u(),L()}function y(){a.loaderEl.classList.remove("is-hidden")}function u(){a.loaderEl.classList.add("is-hidden")}function B(){a.loadMoreBtn.classList.remove("is-hidden")}function p(){a.loadMoreBtn.classList.add("is-hidden")}function L(){n>=h?(p(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):B()}function P(){const t=a.listEL.firstChild.getBoundingClientRect().height;scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
