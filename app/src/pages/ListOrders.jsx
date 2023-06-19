import { useState } from "react";
import styled from "styled-components";
import {mobile} from "../responsive";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Product from "../components/Product";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: gray;
  background-size: cover;
  display: flex;
  align-items: top;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 85%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #545454;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link_a = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const AddProducts = () => {

  return (
    <Container>
      <Wrapper>
        <Title>Listagem de pedidos</Title>
        <Form>
           { [1,2,3,4,5,6,7,8,9,10,11,12,13].map((item) => (
                <Wrapper>
                  {item}
                  <Wrapper>
                    {item}
                    <p>{item}</p>
                    <p>{item}</p>
                  </Wrapper>
                </Wrapper>
            )) }
        </Form>
      </Wrapper>
    </Container>
  );
};

export default AddProducts;
