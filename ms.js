/** @format */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cd = $(".cd");
const playlists = $(".playlist");
const heading = $("header h2");
const img = $(".cd-thumb");
const au = $("#audio");
const togglePlay = $(".btn-toggle-play");
const player = $(".player");
const repeat = $(".btn-repeat");
const progress = $("#progress");
const cdCover = $(".cd-cover");
const btnNext = $(".btn-next");
const btnPrev = $(".btn-prev");
const btnRandom = $(".btn-random");
const btnRepeat = $(".btn-repeat");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  songs: [
    {
      name: "Click Pow Get Down",
      singer: "Raftaar x Fortnite",
      path: "https://mp3.filmisongs.com/go.php?id=Damn%20Song%20Raftaar%20Ft%20KrSNa.mp3",
      image: "https://i.scdn.co/image/ab67616d0000b2731171db27fc808fcc85fb81c9",
    },
    {
      name: "Tu Phir Se Aana",
      singer: "Raftaar x Salim Merchant x Karma",
      path: "https://mp3.filmisongs.com/go.php?id=Satisfya%20Mp3%20Song%20by%20Imran%20Khan.mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
    },
    {
      name: "Naachne Ka Shaunq",
      singer: "Raftaar x Brobha V",
      path: "https://mp3.filmisongs.com/go.php?id=Satisfya%20Mp3%20Song%20by%20Imran%20Khan.mp3",
      image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
    },
    {
      name: "Mantoiyat",
      singer: "Raftaar x Nawazuddin Siddiqui",
      path: "https://mp3.filmisongs.com/go.php?id=Naam%20Song%20Tulsi%20Kumar%20Ft.%20Millind%20Gaba.mp3",
      image:
        "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
    },
    {
      name: "Aage Chal",
      singer: "Raftaar",
      path: "https://mp3.filmisongs.com/go.php?id=Naam%20Song%20Tulsi%20Kumar%20Ft.%20Millind%20Gaba.mp3",
      image:
        "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
    },
    {
      name: "Damn",
      singer: "Raftaar x kr$na",
      path: "https://songs14.vlcmusic.com/download.php?track_id=29547&format=320",
      image:
        "https://songs14.vlcmusic.com/tiny_image/timthumb.php?q=100&w=250&src=images/29547.png",
    },
    {
      name: "Feeling You",
      singer: "Raftaar x Harjas",
      path: "https://mp3.filmisongs.com/go.php?id=Sau%20Sau%20Wari%20Khat%20Likhe%20Song%20Goldie%20Sohel%20Ft%20Srishti%20Bhandari.mp3",
      image:
        "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
    },
  ],
  render: function () {
    const xml = this.songs.map(function (song) {
      return `<div class="song">
      <div class="song-image">
        <img src="${song.image}" alt="${song.name}" class="thumb">
      </div>
      <div class="song-info">
        <h3>${song.name}</h3>
        <p>${song.singer}</p>
      </div>
      <audio controls class="audio-source">
        <source src="${song.path}" type="audio/mpeg">
      </audio>
      <div class="set-info">...</div>
    </div>`;
    });
    // console.log(xml.join(""));
    $(".playlist").innerHTML = xml.join("");
  },
  defineProperties: function () {
    // defineProperty() is a method of Object.prototype
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    img.style.backgroundImage = `url(${this.currentSong.image})`;
    au.src = this.currentSong.path;
  },
  handleEvent: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    const animateImg = img.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    animateImg.pause();
    document.onscroll = function () {
      // console.log(window.scrollY);
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const widthNew = cdWidth - scrollTop;
      cd.style.width = widthNew > 0 ? widthNew + "px" : "0px";
      cd.style.opacity = widthNew / scrollTop;
      cdCover.style.transition = "0.5";
      cdCover.style.display = widthNew > 199 ? "block" : "none";
    };
    //playlist

    togglePlay.onclick = function () {
      if (_this.isPlaying) {
        au.pause();
      } else {
        au.play();
      }
    };
    au.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      animateImg.play();
    };

    au.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      animateImg.pause();
    };
    au.ontimeupdate = function () {
      if (au.duration) {
        const progressPercent = Math.floor(
          (au.currentTime / au.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    progress.oninput = function (e) {
      const seekTime = (au.duration / 100) * e.target.value;
      au.currentTime = seekTime;
    };
    btnNext.onclick = function () {
      if (_this.randomSongs) {
        _this.randomSongs();
      } else {
        _this.nextSongs();
      }
      au.play();
    };
    btnPrev.onclick = function () {
      if (_this.randomSongs) {
        _this.randomSongs();
      } else {
        _this.preSongs();
      }
      au.play();
    };
    btnRandom.onclick = function () {
      _this.isRandom = !_this.isRandom;
      btnRandom.classList.toggle("active", _this.isRandom);
    };
    btnRepeat.onclick = function () {
      _this.repeatSongs();
    };
    // const n = false;

    // togglePlay.onclick = () => {
    //   if (n) {
    //     console.log("hello");
    //   } else {
    //     console.log("BYE");
    //   }
    // };
  },
  nextSongs: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  preSongs: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSongs: function () {
    let oldSongs;
    do {
      oldSongs = Math.floor(Math.random() * this.songs.length);
    } while (oldSongs === this.currentIndex);
    this.currentIndex = oldSongs;
    this.loadCurrentSong();
    console.log("oldSongs", oldSongs);
  },
  repeatSongs: function () {
    currentIndex.load();
  },
  start: function () {
    this.defineProperties();
    this.handleEvent();
    this.loadCurrentSong();
    this.render();
  },
};

app.start();
