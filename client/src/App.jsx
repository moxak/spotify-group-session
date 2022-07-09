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
import { Login, Profile } from './pages';
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


function ScrollToTop() {
  const { pathname }  = useLocation;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    setToken(accessToken);
  }, []);
  function Artists() {
    return (
      <h1>Top Artists</h1>
    );
  }
  function Tracks() {
    return (
      <h1>Top Tracks</h1>
    );
  }
  function Playlist() {
    return (
      <h1>Playlist</h1>
    );
  }
  function Playlists() {
    return (
      <h1>Playlists</h1>
    );
  }


  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <Login />
        ) :(
          <>
            <StyledLogoutButton onClick={logout}>Log Out</StyledLogoutButton>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/top-artists" element={<Artists />} />
                <Route path="/top-tracks" element={<Tracks />} />
                <Route path="/playlists/:id" element={<Playlist />} />
                <Route path="/playlists" element={<Playlists />}  />
                <Route path="/" element={<Profile />} />
              </Routes>
            </Router>
          </>
        )}
      </header>
    </div>
  );
}



export default App;