import styled from "styled-components";
import defaultImg from "../../images/logo.svg";
const StyledHero = styled.header`
  /* background: url(${defaultImg}); */
  background: url(${props => (props.img ? props.img : defaultImg)}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
`;

export default StyledHero;