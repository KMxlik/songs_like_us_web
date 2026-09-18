const audio = document.getElementById('audioPlayer');
const playerBar = document.getElementById('playerBar');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const playerCover = document.getElementById('playerCover');

const buttons = document.querySelectorAll('.play-btn[data-audio]');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const sameSong = audio && audio.src.endsWith(button.dataset.audio);
    if (sameSong && !audio.paused) {
      audio.pause();
      button.textContent = '▶';
      return;
    }
    buttons.forEach(b => b.textContent = '▶');
    audio.src = button.dataset.audio;
    playerTitle.textContent = button.dataset.song;
    const info = button.previousElementSibling;
    playerArtist.textContent = info ? info.querySelector('p').textContent : '';
    const cover = button.closest('.track').querySelector('.cover-image');
    playerCover.src = cover ? cover.src : '';
    playerBar.classList.remove('hidden');
    button.textContent = '❚❚';
    audio.play().catch(() => {});
  });
});
if (audio) {
  audio.addEventListener('play', () => {
    buttons.forEach(b => {
      if (audio.src.endsWith(b.dataset.audio)) b.textContent = '❚❚';
    });
  });
  audio.addEventListener('pause', () => buttons.forEach(b => b.textContent = '▶'));
  audio.addEventListener('ended', () => buttons.forEach(b => b.textContent = '▶'));
}
