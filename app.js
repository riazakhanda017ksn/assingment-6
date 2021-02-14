// *************************here i showed that input box clicked************************************//


 document.getElementById("search")

.addEventListener("keypress", function(event) {
    if (event.key== 'Enter')
    document.getElementById("search-btn").click();
});


const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';

// show images 
const showImages = (images) => {
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
  toggleSpinner()
}

const getImages = (query) => {
  const url=`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`
  toggleSpinner()
  fetch(url)
     
    .then(response => response.json())
    .then(data => showImages(data.hits))

/////here i added error message if API suddenly crack down or face any problem------------/////

    .catch( error => errorMessageShow ('Something went wrong! Please try again letter'))
    
}

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.toggle('added');

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  }
  
  else {
    // alert('Hey, Already added !')
    delete  sliders[item]
  }
}


var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  const duration = document.getElementById('doration').value  || 1000

if(

  duration < 0
){
  
const minusValue=document.getElementById("minusValue")
      minusValue.innerHTML=`
      <div class="alert alert-success w-75 centerItem" role="alert">
      <h4 class="alert-heading">Sorry!</h4>
      <p>Aww sorry, you unsuccessful to make a slider with minus(-) value. You can only added the plus (+) value for slider 
      change duration.</p>
      <hr>
      <p class="mb-0">Whenever you need to, be sure to use plus value else its not working.</p>
    </div>
     `



}else{

  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);



}

  }



// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  createSlider()
})


// for bonus point
///<---------------------->spinner<------------------>>>//////

const toggleSpinner=()=>{

const spinner= document.getElementById("spinner")

  spinner.classList.toggle('d-none')



}

///for bonus -point

/////here i added error message if API suddenly crack down or face any problem------------/////
///---------------Error message show----------------///

const errorMessageShow=error=>{


  const errorMessage=document.getElementById("errorMessage")
  
  errorMessage.innerText=error;
  
  }




