import styled from '@emotion/styled';

export const Main = styled.div`
  & .spinner {
    z-index: 1000;
    position: fixed;
    left: 50%;
    top: 50%;
    font-size: 50px;
  }
`;

export const Table = styled.table`
  width: 100%;
  background-color: white;
  box-shadow: 0px 2px 8px 0px rgba(180, 180, 180, 1);
  & > thead > tr > th,
  & > tbody > tr > td {
    padding: 5px 10px;
    text-align: left;
    border-left: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
  }

  & > thead > tr > th:first-of-type,
  & > tbody > tr > td:first-of-type {
    border-left: none;
  }

  & > tbody > tr:last-of-type > td {
    border-bottom: none;
  }

  & > thead > tr > th {
    font-weight: 500;
  }
`;

export const Th = styled.th`
  cursor: pointer;
  &:before {
    right: 1rem;
    margin-right: 2px;
    content: '\\2191';
    color: ${props => (props.clicked ? 'black' : 'grey')};
  }
  &:after {
    margin-left: 2px;
    color: ${props => (props.clicked ? 'grey' : 'black')};
    left: 0.5em;
    content: '\\2193';
  }
`;

export const Search = styled.div`
  margin-bottom: 5px;
  & a {
    border: 1px dashed blue;
    padding: 3px;
  }

  & > div {
    box-shadow: 0px 2px 8px 0px rgba(180, 180, 180, 1);
    position: absolute;
    display: none;
    padding: 10px;
    background-color: white;
  }

  & > div.show {
    z-index: 1000;
    display: block;
  }

  & > div > form {
    height: 100%;
    width: 100%;
  }

  & > div > form > div {
    // display: flex;
    display: block;
    align-items: center;
    justify-content: center;
  }

  & #search {
    margin: 10px;
  }
  & > div > form button {
    margin: 10px;
    color: #fff;
    cursor: pointer;
    line-height: 1.5;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    background-color: #007bff;
    border-color: #007bff;
  }
  & input[type='search'] {
    display: block;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }
`;

export const PaginationContainer = styled.div``;

export const Total = styled.div``;

export const Button = styled.div`
  color: ${props => (props.active ? 'white' : 'black')};
  border: ${props => (props.active ? '1px solid #0099FF' : '1px solid #ddd')};
  background-color: ${props => (props.active ? '#0099FF' : '')};
  cursor: pointer;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color 0.3s;
  border-radius: 2px;
  &.disabled {
    visibility: hidden;
  }
`;
