import { createGlobalStyle } from "styled-components";

export const GLobalStyle = createGlobalStyle`
    @font-face {
        font-family: "CenturyGothic";
        src: url("./fonts/CenturyGothic.ttf") format("truetype");
    }
    body {
        margin: 0;
        font-family: 'Sawarabi Gothic', sans-serif,'Adamina', serif,'Bigelow Rules',-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        // padding: 20px 40px;
    }
    
    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }
`