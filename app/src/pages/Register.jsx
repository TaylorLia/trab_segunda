import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://media.gazetadopovo.com.br/haus/2016/10/cadeira-assento-escritorio-produtividade-design2-1024x681-547d3fb0.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #545454;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;

const Link_a = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin : 10px;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CRIE UMA CONTA</Title>
        <Form>
          <Input placeholder="Nome" />
          <Input placeholder="email" type="email" />
          <Input placeholder="Username" />
          <Input placeholder="CPF" />
          <Input placeholder="Celular" type="phone"/>
          <Input placeholder="Endereço" />
          <Input placeholder="Cidade" />
          <Input placeholder="Numero" />
          <Input placeholder="Senha" />
          <Agreement>
            Ou, então
            <Link to="/login">
              <span> </span>entre com sua conta
            </Link>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
