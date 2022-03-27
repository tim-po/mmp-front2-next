import styled from "styled-components";

const Button = styled.button`
  transition: all 0.2s;
  font-size: 12px;
  padding: 6px;
  border: 2px solid rgba(0,0,0,0);
  border-radius: 6px;
  color: white;
  background: blueviolet;
  margin-top: 16px;
  
  &:hover{
    border: 2px solid palevioletred;
  }
`;

const Container = styled.div`
  padding: 16px 20px;
  border: 1px solid gray;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
`

export const Connector = {
  Button,
  Container
}
