import styled from 'styled-components/macro';
import { LoginButton, Loader } from '../components';
import { StyledTopPage } from '../styles';

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TopPage = () => (
    <StyledTopPage>
        <h1>
            Spotify<br></br>
            Group Session
        </h1>
        <LoginButton />
        <Loader />
    </StyledTopPage>
);

export default TopPage;