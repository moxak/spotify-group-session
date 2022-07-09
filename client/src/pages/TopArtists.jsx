import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { getTopArtists } from '../spotify';
import { SectionWrapper, ArtistsGrid, TimeRangeButtons } from '../components';


const TopArtists = () => {
    const [topArtists, setTopArtists] = useState(null);
    const [activeRange, setActiveRange] = useState('short');

    useEffect(() => {
        const fetchData = async () => {
          const userTopArtists = await getTopArtists(`${activeRange}_term`);
          setTopArtists(userTopArtists.data);
        };
    
        catchErrors(fetchData());
      }, [activeRange]);
      
    return (
        <>
            <main>
                <SectionWrapper title="Top artists" breadcrumb="true">
                <TimeRangeButtons 
                    activeRange={activeRange} 
                    setActiveRange={setActiveRange} 
                />
                
                {topArtists && (
                    <ArtistsGrid artists={topArtists.items} />
                )}
                </SectionWrapper>
            </main>
            
        </>
    );
};

export default TopArtists;