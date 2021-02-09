const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySong(data.data);
    }
    catch (error) {
        displayError('Something Went Wrong!! Please Try After Sometime!');
    }

}

const displaySong = songs => {
    const songsContainer = document.getElementById('songs-container')
    songsContainer.innerHTML = '';
    songs.forEach(song => {
        const songsDiv = document.createElement('div');
        songsDiv.className = 'single-result row align-items-center my-3 p-3';
        songsDiv.innerHTML = `
                <div class="col-md-9">
                    <h3 class="lyrics-name">${song.title}</h3>
                    <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    <audio controls>
                        <source src = "${song.preview}">
                    </audio>
                </div>
                <div class="col-md-3 text-md-right text-center">
                    <button onclick = "getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
                </div>
            `;
        songsContainer.appendChild(songsDiv);
    })
}


const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics)
    }
    catch (error) {
        displayError('Sorry! Failed To Loaded Lyric ! Please Try After Sometime.');

    };
}

const displayLyric = lyrics => {
    const lyricDiv = document.getElementById('song-lyric');
    lyricDiv.innerText = lyrics;
}
const displayError = error => {
    const errorTag = document.getElementById('display-error');
    errorTag.innerText = error;
}