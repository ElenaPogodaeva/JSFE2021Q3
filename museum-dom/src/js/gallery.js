
function loadImages() {
  const sources = ['assets/img/galery/galery1.jpg','assets/img/galery/galery2.jpg',
  'assets/img/galery/galery3.jpg', 'assets/img/galery/galery4.jpg', 'assets/img/galery/galery5.jpg',
  'assets/img/galery/galery6.jpg', 'assets/img/galery/galery7.jpg', 'assets/img/galery/galery8.jpg',
  'assets/img/galery/galery9.jpg', 'assets/img/galery/galery10.jpg', 'assets/img/galery/galery11.jpg',
  'assets/img/galery/galery12.jpg', 'assets/img/galery/galery13.jpg', 'assets/img/galery/galery14.jpg',
  'assets/img/galery/galery15.jpg'];

  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  
  const pictureInnerContainer = document.querySelector('.picture-inner-container');
  shuffle(sources);
  sources.map((item, index) => {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = item;
    img.alt = `galery${index + 1}`;
    pictureInnerContainer.append(img);
  });
}

export default loadImages;