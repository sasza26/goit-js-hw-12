import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import axios from 'axios';

import { getImage } from './js/pixabay-api';
import { imagesTemplate } from './js/render-functions';
//=========================================================================
const refs = {
  formEl: document.querySelector('.form'),
  listEL: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('[data-action=load-more]'),
};
//===========================================================================

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

//===========================================================================

let currentPage = 1;
let maxPage = 0;
let value;
const pageSize = 15;

//===========================================================================

refs.formEl.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

//===========================================================================

async function onFormSubmit(event) {
  event.preventDefault();
  refs.listEL.innerHTML = '';
  currentPage = 1;
  value = event.target.elements.value.value.trim();

  if (!value) {
    iziToast.error({
      title: 'Error',
      message: 'The search field is empty. Please try again!',
      position: 'topRight',
    });
    hideLoadMoreBtn();
  } else {
    try {
      showLoader();
      const data = await getImage(value, currentPage);
      maxPage = Math.ceil(data.totalHits / pageSize);
      if (!data.hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        hideLoader();
        hideLoadMoreBtn();
      } else {
        const markup = imagesTemplate(data.hits);
        refs.listEL.insertAdjacentHTML('beforeend', markup);
        lightbox.refresh();
        hideLoader();
        checkBtnStatus();
      }
    } catch (error) {
      console.log(error);
    }
    refs.formEl.reset();
  }
}

async function onLoadMoreClick() {
  currentPage += 1;
  showLoader();
  try {
    const data = await getImage(value, currentPage);
    const markup = imagesTemplate(data.hits);
    refs.listEL.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }

  myScroll();
  hideLoader();
  checkBtnStatus();
}
//=========================================================================
function showLoader() {
  refs.loaderEl.classList.remove('is-hidden');
}
function hideLoader() {
  refs.loaderEl.classList.add('is-hidden');
}
function showLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
function hideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}
function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMoreBtn();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showLoadMoreBtn();
  }
}
function myScroll() {
  const height = refs.listEL.firstChild.getBoundingClientRect().height;

  scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
