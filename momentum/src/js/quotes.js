export default function showQuotes() {
  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  const changeBtn = document.querySelector(".change-quote");

  //let randomNum;

  function getRandomNum() {
    // return Math.random()*20 + 1;
    return Math.floor(Math.random() * 3);
  }

  async function getQuotes() {
    const randomNum = getRandomNum();
    const quotes = "./assets/data/data.json";
    const res = await fetch(quotes);
    const data = await res.json();
    quote.textContent = `"${data[randomNum].text}"`;
    author.textContent = `${data[randomNum].author}`;
    console.log(randomNum);
    console.log(`${data[randomNum].text}`);
    console.log(`${data[randomNum].author}`);
  }

  function changeQuote() {
    getQuotes();
  }
  getQuotes();

  changeBtn.addEventListener("click", changeQuote);
}
