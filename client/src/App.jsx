import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import { accessToken, logout } from './spotify';
import { catchErrors } from './utils';
import { GlobalStyle } from './styles';
import { TopPage, Profile, TopArtists, TopTracks, Playlists, Playlist } from './pages';
import { NowPlayingBar } from './components';
import styled from 'styled-components/macro';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;


/**
 * When the pathname changes, scroll to the top of the page.
 * @returns Nothing.
 */
function ScrollToTop() {
  const { pathname }  = useLocation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return;
}

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(accessToken);
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <TopPage/>
        ) :(
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-tracks" element={<TopTracks />} />
                <Route path="/playlists/:id" element={<Playlist />} />
                <Route path="/playlists" element={<Playlists />}  />
                <Route path="/" element={<Profile />} />
              </Routes>
            </Router>
            <NowPlayingBar />
          </>
        )}
      </header>
    </div>
  );
}



export default App;