
// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
// save all songItem in form of array
let songItems = Array.from(document.getElementsByClassName('songItem'));

// make object for store differen info about songs
let songs = [
    { songName: "Lily", filePath: "songs/1.mp3" , coverPath: "covers/c1.jpg", duration: "05:00" },
    { songName: "Unstoppable", filePath: "songs/2.mp3", coverPath: "covers/c2.jpg", duration: "05:00" },
    { songName: "Blank Space", filePath: "songs/3.mp3", coverPath: "covers/c3.jpg", duration: "05:00" },
    { songName: "Rockabye", filePath: "songs/4.mp3", coverPath: "covers/c4.jpg", duration: "05:00" },
    { songName: "Cheap Thrills", filePath: "songs/5.mp3", coverPath: "covers/c5.jpg", duration: "05:00" },
    { songName: "Calm Down", filePath: "songs/2.mp3", coverPath: "covers/c6.jpg", duration: "05:00" },
    { songName: "Bad Boy", filePath: "songs/2.mp3", coverPath: "covers/c7.jpg", duration: "05:00" },
    { songName: "One Kiss", filePath: "songs/2.mp3", coverPath: "covers/c8.jpg", duration: "05:00" },
    { songName: "On My Way", filePath: "songs/2.mp3", coverPath: "covers/c9.jpg", duration: "05:00" },
    { songName: "Senorita", filePath: "songs/4.mp3", coverPath: "covers/c10.jpg", duration: "05:00" }
];

//put songName,songImage & songDuration
songItems.forEach((element, i) => {
    //get the image from object and put in the HTML
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    //get the duration from object and put in the HTML
    element.getElementsByClassName("timestamp")[0].innerHTML = songs[i].duration;
    //get the song name from object and put in the HTML
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})



// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
    }
})

// to update time on progress bar
audioElement.addEventListener('timeupdate', () => {

    progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
})
// for change time on progress bar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

// Handle play/pause in songsItems
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        //if pause
        if (e.target.classList.contains('fa-play-circle')) {
            songIndex = parseInt(e.target.id);//get id
            //change icon
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;//change song

            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            //change icon
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
        else if (e.target.classList.contains('fa-pause-circle')) {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    })
})

//Next Button
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;

    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
//Previous Button
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


