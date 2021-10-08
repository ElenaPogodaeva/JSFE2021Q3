const player = document.querySelector('.video');
const video = player.querySelector('.viewer');

function tooglePlay() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}