import { useState, useEffect, useMemo} from 'react';
import { catchErrors } from '../utils';
import { StyledNowPlayingBar } from '../styles';
import { getPlaybackState, pausePlayback, startPlayback } from '../spotify';
import { AudioSpectrum } from '../components';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import { IoReloadOutline } from 'react-icons/io5';

const NowPlayingBar = () => {
    const [playbackState, setPlaybackState] = useState(null);
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasLoad, setHasLoad ] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setHasLoad(false)
            
            const { status ,data } = await getPlaybackState();
            if (status === 200) {
                setPlaybackState(data);
                setTrack(data.item);
                setIsPlaying(data.is_playing);
            } else if (status === 204) {
                setPlaybackState(null);
                setTrack(null);
            }
            
        }

        catchErrors(fetchData());

    }, [hasLoad]);

    console.log(track);

    return (
        <StyledNowPlayingBar>

        <div className={`track__contrainer ${isPlaying ? "playing" : ""}`}>
            { track ? (
                <div className="track__item__title-group">
                    {track.album.images.length && track.album.images[2] && (
                        <div className="track__item__img">
                            <img src={track.album.images[2].url} alt={track.name} />
                        </div>
                    )}
                    <div className="track__item__name-artist">
                        <div className="track__item__name overflow-ellipsis">
                            {track.name}
                        </div>
                        <div className="track__item__artist overflow-ellipsis">
                            {track.artists.map(artist => artist.name).join(', ')}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="track__item__title-group">
                <div>Spotify is not active</div>
                </div>
            )}
            
            <div className="playling__bar">
                <button 
                    alt="Play/Pause button"
                    onClick={()=> {
                        if (isPlaying) {
                            pausePlayback().then(()=>{setIsPlaying(false);});
                        } else {
                            startPlayback().then(() => {setIsPlaying(true);});
                        }
                    }}
                >
                {isPlaying ? (<BsFillPauseCircleFill size={42}/>) : (<BsFillPlayCircleFill size={42}/>)}
                </button>
                <button alt="Reload playback"
                    onClick={()=> setHasLoad(true) }>
                    <IoReloadOutline size={42} />
                </button>
            </div>
            <div className="playling__volume">
                { isPlaying ? (<AudioSpectrum />): null }
            </div>
        </div>

    </StyledNowPlayingBar>
    );
};

export default NowPlayingBar;
