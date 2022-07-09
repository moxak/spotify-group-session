import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { getTopTracks } from '../spotify';
import { Loader, SectionWrapper, TrackList, TimeRangeButtons } from '../components';


const TopTracks = () => {
    const [topTracks, setTopTracks] = useState(null);
    const [activeRange, setActiveRange] = useState('short');

    useEffect(() => {
        const fetchData = async () => {
          const userTopTracks = await getTopTracks(`${activeRange}_term`);
          setTopTracks(userTopTracks.data);
        };
    
        catchErrors(fetchData());
      }, [activeRange]);
      
    return (
        <main>
            { topTracks ? (
                <SectionWrapper title="Top tracks this month" breadcrumb="true">
                    <TimeRangeButtons 
                        activeRange={activeRange} 
                        setActiveRange={setActiveRange} 
                    />
                    { topTracks && topTracks.items && (                    
                        <TrackList tracks={topTracks.items} />
                    )}
                </SectionWrapper>
            ) : (
                <loader />
            )}
        </main>
    );
};

export default TopTracks;