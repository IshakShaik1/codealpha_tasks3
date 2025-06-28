const songs = [
  {
    title: "poy ra poy ra",
    artist: "Artist DHANUSH",
    src: "song1.mp3.mp3",
    image: "album1.jpg"
  },
  {
    title: "Kubhera trance",
    artist: "Artist DSP",
    src: "song2.mp3.mp3",
    image: "album3.jpg"
  },
  {
    title: "Naa koduka",
    artist: "Artist Nandha kishore",
    src: "song3.mp3.mp3",
    image: "album3.jpg"
  }
];

let songIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("play");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const albumArt = document.getElementById("album-art");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  albumArt.src = song.image;
  document.getElementById("download-link").href = song.src;
  updatePlaylistUI();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playBtn.textContent = "⏸️";
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function updateProgress() {
  if (audio.duration) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;

    let mins = Math.floor(audio.currentTime / 60);
    let secs = Math.floor(audio.currentTime % 60);
    if (secs < 10) secs = `0${secs}`;
    currentTimeEl.textContent = `${mins}:${secs}`;

    let dmins = Math.floor(audio.duration / 60);
    let dsecs = Math.floor(audio.duration % 60);
    if (dsecs < 10) dsecs = `0${dsecs}`;
    durationEl.textContent = `${dmins}:${dsecs}`;
  }
}

function setVolume(value) {
  audio.volume = value;
}

function updatePlaylistUI() {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.className = index === songIndex ? "active" : "";
    li.onclick = () => {
      songIndex = index;
      loadSong(song);
      audio.play();
      playBtn.textContent = "⏸️";
    };
    playlist.appendChild(li);
  });
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgress);

loadSong(songs[songIndex]);
