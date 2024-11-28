import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(NavLink)`
    border-radius: 0.5rem;
    padding-right: 1rem;
    padding-left: 1rem;

    &.active{
        color: white;
        background-color: rgba(107, 114, 128, 0.2);    
    }

    &:hover{
        background-color: rgba(107, 114, 128, 0.4);
        color: white;
    }
`