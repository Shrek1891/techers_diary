import styled from "styled-components";

const StyledLogo = styled.div`
    text-align: center;
`;
const Img = styled.img`
    height: 9.6rem;
    width: auto;
    border-radius: 25%;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
`;

function Logo() {
    return (
        <StyledLogo>
            <Img src="/logo.jpg" alt="Logo"/>
        </StyledLogo>
    );
}

export default Logo;
