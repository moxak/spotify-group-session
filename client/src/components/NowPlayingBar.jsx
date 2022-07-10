import { useState, useEffect, useMemo} from 'react';
import { catchErrors } from '../utils';
import { StyledNowPlayingBar } from '../styles';
import { getPlaybackState, pausePlayback, startPlayback } from '../spotify';
import { AudioSpectrum } from '../components';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';

const NowPlayingBar = () => {
    const [playbackState, setPlaybackState] = useState(null);
    const [track, setTrack] = useState(null);
    let isActive = useMemo(() => playbackState && playbackState.is_playing ? true : false, [playbackState]);

    useEffect(() => {
        const fetchData = async() => {
            const { status ,data } = await getPlaybackState();
            if (status === 200) {
                setPlaybackState(data);
                setTrack(data.item);
            } else if (status === 204) {
                setPlaybackState(null);
                setTrack(null);
            }
        }

        // Calling the function fetchData every 10 seconds.
        setInterval(() => {
            catchErrors(fetchData());
        }, 10000);

    }, []);

    return (
        <StyledNowPlayingBar>
            <div className={`track__contrainer ${isActive ? "playing" : ""}`}>
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
                    <div>Spotify is not active</div>
                )}
                
                <div className="playling__bar">
                    <button 
                        onClick={()=> {
                            if (isActive) {
                                isActive = false;
                                pausePlayback();
                            } else {
                                isActive = true;
                                startPlayback();
                            }
                        }}
                    >
                    {isActive ? (<BsFillPauseCircleFill size={42}/>) : (<BsFillPlayCircleFill size={42}/>)}
                    </button>
                </div>
                <div className="playling__volume">
                    { isActive ? (<AudioSpectrum />): null }
                </div>
            </div>

        </StyledNowPlayingBar>
    );
};

export default NowPlayingBar;
