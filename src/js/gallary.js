import imagesApi from './apiService.js';
import imagesListTmpl from '../tamplates/tamplate.hbs';
import refs from './refs.js';
const { formRef, inputRef, loadMoreBtn, list, scrollBtn } = refs;

import { alert, error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

const BASE_URL = `https://pixabay.com/api/`;
let API_KEY = `23557482-2b701da460ed677d29657aa4e`;

class imagesPagination{
  constructor(){
    this._page=1;
    this._queryStr = '';
    this.perPage=1;
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }
 get queryStr() {
      return this._queryStr
    }
    set queryStr(value) {
      return (this._queryStr = value)
    }
  
    get page() {
      return this._page
    }
    set page(value) {
      return (this._page += value)
    }
  onFormSubmit(event){
 
    event.preventDefault();
        this.page = 1; 
    this.queryStr=event.target.elements.query.value.trim();
    list.innerHTML='';

    if(this.queryStr){
      this.fetchImages();
    }else if
      (event.target.elements.query.disabled=true){
      error({
      text: 'No matches found, please enter a new query.',
    })} 
        
        formRef.reset()
    }
  fetchImages(){
    return imagesApi(this._page, this._queryStr)
    .then(this.renderImages)
    .catch(err => console.log(err));
  
  }
  renderImages({hits}){

     if (hits.status === 404) {
    error({ text: 'Nothing was found!' })}else if(hits.length===0){
error({
      text: 'Nothing was found. Please try another search',
    })
    }
    else{
const imagesMarkUp = imagesListTmpl(hits);
   list.insertAdjacentHTML('beforeend', imagesMarkUp);
    }
    
  }
   loadMore(){
     this.page+=1
         this.fetchImages()
     
   }
   onReset(e){
     console.log(e.target);
     if(e.target.nodeName==='FORM'){
      list.innerHTML='';
     }
   }
  
   scrollImg() {
   loadMoreBtn.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  })
   }
  }
  const images = new imagesPagination();
  formRef.addEventListener('submit', images.onFormSubmit);
  loadMoreBtn.addEventListener('click', images.loadMore);
  scrollBtn.addEventListener('click', images.scrollImg);
window.addEventListener('click', images.onReset)

