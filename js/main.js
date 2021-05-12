const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const playBtnIcon = playBtn.querySelector('i.fas');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

const songs = ['hey', 'summer', 'ukulele'];
const playClassName = 'play';
const pauseClassName = 'pause';

let songIndex = 0;

loadSong = (songIndex) => {
    const song = songs[songIndex];

    title.innerText = song;
    audio.src = `./assets/musics/${song}.mp3`;
    cover.src = `./assets/images/${song}.jpg`;
};

playSong = () => {
    musicContainer.classList.add(playClassName);
    playBtnIcon.classList.remove(`fa-${playClassName}`);
    playBtnIcon.classList.add(`fa-${pauseClassName}`);
    audio.play();
};

pauseSong = () => {
    musicContainer.classList.remove(playClassName);
    playBtnIcon.classList.add(`fa-${playClassName}`);
    playBtnIcon.classList.remove(`fa-${pauseClassName}`);
    audio.pause();
};

prevSong = (isPlaying) => {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);

    if (isPlaying) {
        playSong();
    }
};

nextSong = (isPlaying) => {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }

    loadSong(songIndex);

    if (isPlaying) {
        playSong();
    }
};

updateProgress = (evt) => {
    const { duration, currentTime } = evt.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
};

setProgress = (evt) => {
    const width = evt.srcElement.clientWidth;
    const clickX = evt.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

isPlaying = () => {
    return musicContainer.classList.contains(playClassName);
}

playBtn.addEventListener('click', () => {
    if (isPlaying()) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', () => {
    prevSong(isPlaying());
});

nextBtn.addEventListener('click', () => {
    nextSong(isPlaying());
});

audio.addEventListener('timeupdate', updateProgress);

audio.addEventListener('ended', () => {
    nextSong(isPlaying());
});

progressContainer.addEventListener('click', setProgress);

loadSong(songIndex);