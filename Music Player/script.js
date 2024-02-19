document.addEventListener('DOMContentLoaded', () => {


    const playBtn = document.getElementById('play')
    const previous = document.getElementById('previous')
    const forward = document.getElementById('forward')
    const audio = document.getElementById('audio')
    const img = document.querySelector('.img')
    const time = document.querySelector('.time')
    const songName = document.querySelector('.song-name')
    const artist = document.querySelector('.artist')
    const currentTime = document.querySelector('.current-time')
    const totalTime = document.querySelector('.total-time')

    let playList = {
        0 : {
           audio: 'lost-in-city-lights-145038.mp3',
           artist: 'Cosmo Sheldrake',
           songName: 'Lost in the City Lights',
           backgroundImage: 'cover-1.png'
        },
        1 : {
           audio: 'forest-lullaby-110624.mp3',
           artist: 'Lesfm',
           songName: 'Forest Lullaby',
           backgroundImage: 'cover-2.png'
        },
        2 : {
           audio: 'JET LAG Song By Talhah Yunus.mp3',
           artist: 'Talhah Yunus',
           songName: 'Jet Lag',
           backgroundImage: 'cover-3.jpg'
        },
        
    }
    let track = 0;

    function switchTrack(numTrack) {
        audio.src = 'assets/' + playList[numTrack].audio;
        img.src = 'assets/' + playList[numTrack].backgroundImage;
        songName.innerHTML = playList[numTrack].songName;
        artist.innerHTML = playList[numTrack].artist;
        audio.currentTime = 0;
        audio.play();
    }

    switchTrack(track)

    playBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause()
        }
    })

    previous.addEventListener("click", () => {
        track = (track - 1 + Object.keys(playList).length) % Object.keys(playList).length;
        switchTrack(track)
    })

    forward.addEventListener("click", () => {
        track = (track + 1) % Object.keys(playList).length;
        switchTrack(track)
    })

    audio.addEventListener("ended", () => {
        track = (track + 1) % Object.keys(playList).length;
        switchTrack(track)
    })
    audio.addEventListener("timeupdate", () => {
        let audioTime = Math.round(audio.currentTime)
        let audioLength = Math.round(audio.duration)
        time.style.width = (audioTime * 100) / audioLength + '%'
        currentTime.innerHTML = formatTime(audio.currentTime)
        totalTime.innerHTML = formatTime(audio.duration)
    })

    function formatTime(seconds){
        let minutes = Math.floor(seconds/60);
        let remainingSeconds = Math.floor(seconds%60)
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

    }

})  