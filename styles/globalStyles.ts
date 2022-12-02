import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *, *::before, *::after{
        box-sizing: border-box;
        color: inherit;
    }
    html{
        font-size: 10px;
    }
    body{
        font-family: "Font_test";
        line-height: 1.5;
        background-color: ${({ theme }) => theme.colors.background_color};
        color: ${({ theme }) => theme.colors.text_color};
    }
    input, textarea, select, button {
        outline: none;
        font-size: inherit;
        font-family: inherit;
     }
    input:focus, textarea:focus, select:focus {
        outline: none;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    ol, ul, li {  
        list-style: none;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    
    @media ${({ theme }) => theme.device.mobile}{
        button{
            border-radius: 20px;
        }    
    }
    
`;

export default GlobalStyle;
