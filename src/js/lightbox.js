import imagesListTmpl from '../tamplates/tamplate.hbs';
import refs from './refs.js';
const { formRef, inputRef, loadMoreBtn, list, scrollBtn } = refs;

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';


function largeImgOpen(event) { 
  const largeImgUrl = event.target.dataset.largeImg;
  
  if (!largeImgUrl) return;

  const instance = basicLightbox.create(`
    <img src="${largeImgUrl}" width="800" height="600">
`);

  instance.show()
}

list.addEventListener('click', largeImgOpen);