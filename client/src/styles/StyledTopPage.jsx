import styled from 'styled-components/macro';

const StyledTopPage = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    h1 {
        font-size: clamp(6rem, 10vw, 6rem);
        display: inline-block;
        padding: var(--spacing-sm) var(--spacing-xl);

        &:hover {
            text-decoration: none;
            color: var(--green);
            filter: brightness(1.1);
            transition: 1s ease-in;
        }
    }

`;

export default StyledTopPage;