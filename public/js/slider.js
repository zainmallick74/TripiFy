const images = document.querySelectorAll(".gallery-image");

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

let currentImage = 0;

function showImage(index) {

  images.forEach((image) => {
    image.style.display = "none";
  });

  images[index].style.display = "block";
}

showImage(currentImage);

nextBtn.addEventListener("click", () => {
  currentImage++;

  if(currentImage >= images.length ) {
    currentImage = 0;
  }
  showImage(currentImage);

})

prevBtn.addEventListener("click", ()=> {
  currentImage--;

  if(currentImage < 0) {
    currentImage = images.length-1;
  }

  showImage(currentImage);

})