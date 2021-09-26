
const BASE_URL = `https://pixabay.com/api/`;
let API_KEY = `23557482-2b701da460ed677d29657aa4e`;

async function fetchImages(page,query){
    // let page = 1;
  const params = `?image_type=photo&orientation=horizontal&q=`;
  let url = `${BASE_URL}${params}${query}&page=${page}&per_page=12&key=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.status);
      }
      return await response.json();
    };
export default fetchImages;