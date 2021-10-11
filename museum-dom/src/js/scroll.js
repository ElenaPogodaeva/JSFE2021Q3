export default function animOnScroll() {
 /* function debounce(func, wait = 10, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }; */

  const galleryImages = document.getElementsByClassName('gallery-img');

  function checkSlide() {

    for (let galleryImage of galleryImages) {
        const slideInAt = (window.scrollY + window.innerHeight);// - galleryImage.height / 20;
        // bottom of the image
        const top = galleryImage.getBoundingClientRect().top + window.scrollY;
        const imageBottom = top + galleryImage.height;
        
        const isHalfShown = slideInAt > top;
     //   const isHalfShown = window.innerHeight > galleryImage.getBoundingClientRect().top ;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
          galleryImage.classList.add('active');
          
        } else {
          galleryImage.classList.remove('active');
        } 
    } 
   /* for (let galleryImage of galleryImages) {
        const galleryImageOffset = offset(galleryImage);
        const galleryImageHeight =  galleryImage.offsetHeight;
        let animPoint = window.innerHeight - galleryImageHeight / 4;
        if ((window.pageYOffset > galleryImageOffset - animPoint) && window.pageYOffset < (galleryImageOffset + galleryImageHeight)) {
            galleryImage.classList.add('active');
        
        } else {
           galleryImage.classList.remove('active');
        } 
    } */
  }
  /*
  function offset(el) {
      const rect = el.getBoundingClientRect(),
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return rect.top + scrollTop;
  } */
  window.addEventListener('scroll',checkSlide);
}