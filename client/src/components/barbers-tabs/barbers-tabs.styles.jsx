import styled from "styled-components"
import Tabs from 'react-bootstrap/Tabs';

export const BarbersTab = styled(Tabs)`
    &.nav{
        --bs-nav-link-color: white;
        padding: 1rem;
        background: rgb(143 128 128 / 35%);
        overflow-y: auto;
        flex-wrap: unset;
    }

    .nav-link{
        font-size: 1.5rem;
    }
`
