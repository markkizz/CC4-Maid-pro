import styled from 'styled-components'

export const ButtonFilter = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 32px;
  line-height: 14px;
  border: none;
  border-radius: 18.5px;
  background-color: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  outline: none !important;
  transition: background-color 0.5s ease;
  &:active {
    color: white;
    background-color: #26485F
  }
`
