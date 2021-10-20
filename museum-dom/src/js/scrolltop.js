
export function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

export function scrollOnTop() {
    const topButton = document.getElementById('topBtn');
    // When the user clicks on the button, scroll to the top of the document
   function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
   }
   topButton.addEventListener('click', topFunction);
}