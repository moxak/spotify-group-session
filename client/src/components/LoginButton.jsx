import styled from 'styled-components/macro';

const StyledLoginButton = styled.a`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`;

const LOGIN_URI = 
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://spotify-group-session-for-dt.herokuapp.com/login';

const Login = () => (
    <StyledLoginButton href={LOGIN_URI}>
      Log in to Spotify
    </StyledLoginButton>
);

export default Login;