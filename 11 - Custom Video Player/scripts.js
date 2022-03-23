/*
video::-webkit-media-controls {
  display:none !important;
}
js
  video.requestFullscreen()
  video.addEventListener("fullscreenchange")
  const videoWorks = !!document.createElement('video').canPlayType; 
  freshman.tech/custom-html5-video/
  Use the Fullscreen API on the container element, not on the video
*/

/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullScreen = player.querySelector(".fullScreen")

/* Build out functions */

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.webkitFullscreenElement) {
      // Need this to support Safari
      document.webkitExitFullscreen();
    } else if (player.webkitRequestFullscreen) {
      // Need this to support Safari
      player.webkitRequestFullscreen();
    } else {
      player.requestFullscreen();
    }
  }

/* Hook up the event listeners */
video.addEventListener("click", togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));
fullScreen.addEventListener('click', toggleFullScreen)

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
/* 
function togglePlay() {
  video[video.paused ? 'play' : 'pause'](); 
  toggle.textContent = video.paused ? '►' : '❚ ❚';
};

video.addEventListener("click", togglePlay);

toggle.addEventListener('click', togglePlay);
*/
