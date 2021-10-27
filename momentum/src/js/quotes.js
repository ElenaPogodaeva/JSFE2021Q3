export default function showQuotes() {
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const changeBtn = document.querySelector(".change-quote");
  const langInput  = document.querySelectorAll('input[name=lang]');
  //let randomNum;

  function getRandomNum(max) {
    // return Math.random()*20 + 1;
    return Math.floor(Math.random() * max);
  }

  async function getQuotes(lang = "en") {
    
    const quotes = `./assets/data/data_${lang}.json`;
    const res = await fetch(quotes);
    const data = await res.json();
    const randomNum = getRandomNum(data.length);
    quote.textContent = `"${data[randomNum].text}"`;
    author.textContent = `${data[randomNum].author}`;
    
  }

  function changeQuote() {
    const langChecked = document.querySelector('input[name=lang]:checked');
    const lang = langChecked.value;
    getQuotes(lang);
  }
  getQuotes();

  function setLang() {
    
    const langChecked = document.querySelector('input[name=lang]:checked');
    const lang = langChecked.value;
    
    getQuotes(lang);
    
  }
  changeBtn.addEventListener("click", changeQuote);
  langInput.forEach(el => el.addEventListener("click", changeQuote));
}
