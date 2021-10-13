function calcPrice() {
  const ticketTypes = document.querySelectorAll('input[name=ticket-type]');
  const buttons = document.querySelectorAll('.count-change');
  const price = document.querySelector('.price');
  const basic = document.getElementById('basic');
  const senior= document.getElementById('senior');
  
  function calc() {
    const ticketType = document.querySelector('input[name=ticket-type]:checked');
    
    let basicPrice = ticketType.value;
    let seniorPrice = basicPrice / 2;
    let basicCount = basic.value;
    let seniorCount = senior.value;
    
    let result=  basicPrice * basicCount + seniorPrice * seniorCount;
    price.innerHTML = result;
    
  }
 
  ticketTypes.forEach(type => type.addEventListener('click', calc));
  buttons.forEach(el => el.addEventListener('click', calc));
 // basic.addEventListener('input', calc);
 // senior.addEventListener('change', calc);
}

export default calcPrice;