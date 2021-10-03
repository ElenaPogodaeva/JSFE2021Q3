
const progress = Array.from(document.querySelectorAll('.progress'));
  

  progress.forEach(el => el.addEventListener('input', function() { 
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
}));
