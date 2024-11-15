import { createGlobalStyle } from "styled-components";

export const GLobalStyle = createGlobalStyle`
    @font-face {
        font-family: "CenturyGothic";
        src: url("./fonts/CenturyGothic.ttf") format("truetype");
    }
    html{
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        width: 100%;
    }
    body {
        margin: 0;
        font-family: 'Sawarabi Gothic', sans-serif,'Adamina', serif,'Bigelow Rules',-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    .invisible-scrollbar{
        &::-webkit-scrollbar-thumb {
            background-color: darkgray; /* Thumb color */
            border-radius: 50px; /* Rounded edges */
            cursor: pointer;
        }

        &::-webkit-scrollbar {
            height: 6px; /* Width of the scrollbar */
        }

        &::-webkit-scrollbar-track {
            background-color: lightgray; /* Track color */
            border-radius: 50px; /* Rounded edges */
            cursor: pointer;
        }
    }

    // ::-webkit-scrollbar {
    //     width: 0px;
    //     background: transparent; /* make scrollbar transparent */
    //   }
`;
