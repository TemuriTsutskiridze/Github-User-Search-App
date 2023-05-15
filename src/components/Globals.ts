import { createGlobalStyle } from "styled-components";
import { css } from "styled-components";

import IGlobalStyles from "../interfaces/IGlobalStyles";

export const GlobalStyles = createGlobalStyle<IGlobalStyles>`
    ${(props) => css`
      @import url("https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap");

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Space Mono", monospace;
      }

      html {
        font-size: 62.5%;
      }

      body {
        min-height: 100vh;
        background-color: ${props.darktheme ? "#141D2F" : "#F6F8FF"};
        padding: 3.1rem 0 7.9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 400;

        @media (min-width: 48em) {
          padding: 14rem 0 23.6rem;
        }

        @media (min-width: 90em) {
          padding: 14.4rem 0 17rem;
        }
      }
    `}
    

    

`;
