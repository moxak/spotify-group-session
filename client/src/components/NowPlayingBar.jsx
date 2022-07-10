import { useState, useEffect, useMemo} from 'react';
import { catchErrors } from '../utils';
import { StyledNowPlayingBar } from '../styles';
import { getPlaybackState, pausePlayback, startPlayback } from '../spotify';
import { AudioSpectrum } from '../components';
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';

const NowPlayingBar = () => {
    const [playbackState, setPlaybackState] = useState(null);
    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
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

    }, []);

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
                <div>Spotify is not active</div>
            )}
            
            <div className="playling__bar">
                <button 
                    onClick={()=> {
                        if (isPlaying) {
                            setIsPlaying(false);
                            pausePlayback();
                        } else {
                            setIsPlaying(true);
                            startPlayback();
                        }
                    }}
                >
                {isPlaying ? (<BsFillPauseCircleFill size={42}/>) : (<BsFillPlayCircleFill size={42}/>)}
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
