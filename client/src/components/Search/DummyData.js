const initialState = {
  data: [
    {
      DummyData: true,
      id: 350171311,
      readable: true,
      title: "HUMBLE.",
      title_short: "HUMBLE.",
      title_version: "",
      link: "https://www.deezer.com/track/350171311",
      duration: 177,
      rank: 881294,
      explicit_lyrics: true,
      explicit_content_lyrics: 1,
      explicit_content_cover: 1,
      preview:
        "https://cdns-preview-e.dzcdn.net/stream/c-e99276844e12072cd449b6728f74c65f-4.mp3",
      artist: {
        id: 525046,
        name: "Kendrick Lamar",
        link: "https://www.deezer.com/artist/525046",
        picture: "https://api.deezer.com/artist/525046/image",
        picture_small:
          "https://e-cdns-images.dzcdn.net/images/artist/b0f016efccad94e838c6bff3fe758db6/56x56-000000-80-0-0.jpg",
        picture_medium:
          "https://e-cdns-images.dzcdn.net/images/artist/b0f016efccad94e838c6bff3fe758db6/250x250-000000-80-0-0.jpg",
        picture_big:
          "https://e-cdns-images.dzcdn.net/images/artist/b0f016efccad94e838c6bff3fe758db6/500x500-000000-80-0-0.jpg",
        picture_xl:
          "https://e-cdns-images.dzcdn.net/images/artist/b0f016efccad94e838c6bff3fe758db6/1000x1000-000000-80-0-0.jpg",
        tracklist: "https://api.deezer.com/artist/525046/top?limit=50",
        type: "artist",
      },
      album: {
        id: 39949511,
        title: "DAMN.",
        cover: "https://api.deezer.com/album/39949511/image",
        cover_small:
          "https://e-cdns-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/56x56-000000-80-0-0.jpg",
        cover_medium:
          "https://e-cdns-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/250x250-000000-80-0-0.jpg",
        cover_big:
          "https://e-cdns-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/500x500-000000-80-0-0.jpg",
        cover_xl:
          "https://e-cdns-images.dzcdn.net/images/cover/7ce6b8452fae425557067db6e6a1cad5/1000x1000-000000-80-0-0.jpg",
        tracklist: "https://api.deezer.com/album/39949511/tracks",
        type: "album",
      },
    },
  ],
};

export default initialState;
/*

async function musicVideoButton(Args) {
    const result = await (
      await fetch("http://localhost:4020/buttonUI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_key: Args[0],
          music_video_button_click: Args[1],
        }),
      })
    ).json();

    if (!result.error) {
      setState({
        ...state,
        key: result.key,
        musicVideoButtonClicked: result.musicVideoButtonClicked,
        audiobuttonDisplay: "show-music-button",
        videoButtonDisplay: "hide-video-button",
      });
    } else {
      console.log("message", result.error);
    }
  }

  async function musicAudioButton(Args) {
    const result = await (
      await fetch("http://localhost:4020/buttonUI", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          song_key: Args[0],
          music_audio_button_click: Args[1],
        }),
      })
    ).json();

    if (!result.error) {
      setState({
        ...state,
        key: result.key,
        musicAudioButtonClicked: result.musicAudioButtonClicked,
        audioButtonDisplay: "hide-music-button",
        videoButtonDisplay: "show-video-button",
      });
    } else {
      console.log("message", result.error);
    }
  }
   {result.id === state.key &&
                        state.musicVideoButtonClicked === true ? (
                          <iframe
                            src={result.youtubeLink}
                            className="iframe"
                            title="This is a unique title prop"
                          />
                        ) : (
                          <div className={state.videoButtonDisplay}>
                            <button
                              className="btn btn-dark"
                              type="submit"
                              onClick={musicVideoButton.bind(this, [
                                result.id,
                                true,
                              ])}
                            >
                              <i className="fab fa-google-play" />
                            </button>
                          </div>
                        )}










                        
      const songs = firstResult.data.slice(0, 6);
      //get result song titles from first searchResult
      const titles = [];
      for (let i = 0; i < songs.length; i++) {
        titles.push(`${songs[i].artist.name}` + " " + `${songs[i].title}`);
      }

      //perform a search for each title and get the youtubeVideoID
      const videoIDs = [];
      for (let i = 0; i < titles.length; i++) {
        const googleApi = `https://www.googleapis.com/youtube/v3/search?q=${titles[i]}&part=snippet&key=AIzaSyCB3A6tR-JHZoGro-X6vCQx1JRDG9V7npY`;
        const videoResult = await (await fetch(googleApi)).json();
        videoIDs.push(videoResult.items[0].id.videoId);
      }

      const youtubeVideoLinks = [];
      for (let i = 0; i < videoIDs.length; i++) {
        let youtubeVideoLink = "https://www.youtube.com/embed/";
        youtubeVideoLink += videoIDs[i];
        youtubeVideoLinks.push(youtubeVideoLink);
        youtubeVideoLink = "https://www.youtube.com/embed/";
      }

      //Adding the youTube The Link to The Respective Object in Songs
      for (let i = 0; i < songs.length; i++) {
        songs[i].youtubeLink = youtubeVideoLinks[i];
      }

      Cache.set(`${req.body.search_text}`, songs, 691200);
      res.json({ data: songs });
  
  */
