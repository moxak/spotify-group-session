import styled from 'styled-components/macro';

const StyledNowPlayingBar = styled.div`
    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    display: flex;
    bottom: 0;
    position: fixed;
    z-index: 100;
    justify-content: center;
    /* padding: var(--spacing-sm) var(--spacing-xl); */

    background-color: rgba(0,0,0,.7);
    
    .playing {
        background-color: var(--green);
    }
    

    height: 4rem;
    width: 100%;

    button {
        background-color: transparent;

        :hover{
            background-color: transparent;
        }
        &:focus,
        &:active,
        &::after {
            background-color: transparent;
        }

    }


    .track__contrainer {
        display: inherit;
        font-size: 1.3rem;
        align-items: center;
        /* border: 1px solid var(--black); */
        width: 100%;
        list-style: none;

        .track__item__title-group {
            margin-left: var(--spacing-sm);
            display: flex;
            width: 30%;
            /* border: 1px solid var(--black); */
            align-items: center;
        }

        .track__item__img {
            margin-right: var(--spacing-sm);
            width: 40px;
            height: 40px;
            flex-shrink: 0;
            /* background-color: var(--dark-grey); */
        }

        .track__item__name {
            color: var(--white);
            font-size: var(--fz-xl);
        }

        .track__item__artist {
            color: var(--white);
            font-size: var(--fz-md);
        }

        .track__item__album {
            display: none;

            @media (min-width: 768px) {
            display: block;
            white-space: nowrap;
            }
        }
    }
    
    .playling__bar {
        display: inherit;
        font-size: 1.3rem;
        align-items: center;
        justify-content: center;
        /* border: 1px solid var(--black); */
        width: 40%;
    }

    .playling__volume {
        display: inherit;
        align-items: center;
        font-size: 1.3rem;
        justify-content: center;
        /* border: 1px solid var(--black); */
        width: 30%;
    }
`;

export default StyledNowPlayingBar;