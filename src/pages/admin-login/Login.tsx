import styled from "styled-components";
import woman from "../../assets/home_woman.png";
import nia_logo from "../../assets/NIA_logo.png";
import eye from "../../assets/eye.svg";
import eye_slash from "../../assets/eyeslash.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import Cookies from "js-cookie";
import axios from "axios";

interface FormData {
  emailOrPhone: string;
  password: string;
}

interface SubmitBtnProps {
  $completed: boolean;
}

const Login = () => {
  const [revealPassword, setRevealPassword] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    emailOrPhone: "",
    password: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const userToken = Cookies.get("authToken");
    if (userToken) {
      navigate("admin/dashboard");
    }
  });

  useEffect(() => {
    if (formData.password !== "" && formData.emailOrPhone !== "") {
      setComplete(true);
    } else {
      setComplete(false);
    }
  }, [formData]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      formData.emailOrPhone.trim() === "" ||
      formData.password.trim() === ""
    ) {
      setError("Please all fields are required");
      return;
    }
    setLoading(true);
    try {
      const login = await axiosInstance.post("auth/login", {
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
      });
      console.log(login.data.access_token);
      Cookies.set("authToken", login.data.access_token);
      setLoading(false);
      window.location.href = "/admin/dashboard";
    } catch (error: unknown) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "An error occurred while logging in"
        );
      } else {
        setError("An unexpected error occurred");
      }

      console.log(error);
    }
  };

  return (
    <Container>
      <Left>
        <LeftOverLay />
      </Left>
      <Right>
        <Logo src={nia_logo} alt="NIA Logo" />
        <FormContainer>
          <Welcome>Welcome</Welcome>
          <Subtext>Login to your account to continue</Subtext>
          <Form onSubmit={handleSubmit}>
            <InputField
              type="text"
              placeholder="Email or phone number"
              value={formData.emailOrPhone}
              name="emailOrPhone"
              onChange={handleFormChange}
            />
            <PassworContainer>
              <PasswordInput
                type={`${revealPassword ? "text" : "password"}`}
                value={formData.password}
                name="password"
                onChange={handleFormChange}
              />
              <PasswordViewIcon
                src={revealPassword ? eye_slash : eye}
                alt="Show Password"
                onClick={() =>
                  revealPassword
                    ? setRevealPassword(false)
                    : setRevealPassword(true)
                }
              />
            </PassworContainer>
            <ForgotPasswordContainer>
              <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
              <ForgotPasswordLink to="/forgot-password">
                Reset
              </ForgotPasswordLink>
            </ForgotPasswordContainer>
            <ErrorMessage>{error}</ErrorMessage>
            <SubmitButton type="submit" $completed={complete}>
              {loading ? "Loading..." : "Login"}
            </SubmitButton>
          </Form>
        </FormContainer>
      </Right>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  background: linear-gradient(#015800b5, #015800b5),
    url(${woman}) center/cover no-repeat;
  background-color: #025800;
  width: 50%;
  height: 100%;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  position: relative;
  overflow: hidden;
`;

const LeftOverLay = styled.div`
  width: 100%;
  position: absolute;
  background-color: #025800;
  opacity: 0.5;
  height: 100%;
`;

const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  margin-bottom: 2rem;
`;

const FormContainer = styled.div`
  border: 1px solid #ecf2ff;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 20rem;
`;

const Welcome = styled.h3`
  margin-bottom: 0.2rem;
`;
const Subtext = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 1.1rem;
`;

const Form = styled.form``;
const InputField = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border-radius: 0.3rem;
  border: 1px solid #e1e1ef;
  outline: none;
  margin-bottom: 1rem;
`;

const PassworContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border-radius: 0.3rem;
  border: 1px solid #e1e1ef;
  padding: 0.8rem;
`;

const PasswordInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
`;

const PasswordViewIcon = styled.img`
  width: 20px;
  cursor: pointer;
`;

const ForgotPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.2rem;
`;

const ForgotPasswordText = styled.p`
  font-size: 0.8rem;
  color: #707a91;
  font-weight: 500;
  margin-right: 0.4rem;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 0.8rem;
  color: #009206;
  font-weight: 500;

  &:hover {
    color: #009206;
  }
`;

const SubmitButton = styled.button<SubmitBtnProps>`
  width: 100%;
  padding: 0.8rem 1rem;
  background-color: ${(props: SubmitBtnProps) =>
    props.$completed ? "#009205" : "rgba(0, 146, 6, 1)"};
  opacity: ${(props: SubmitBtnProps) => (props.$completed ? "1" : "0.5")};
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  font-weight: 500;
  color: #ff0048;
  margin-bottom: 0.5rem;
`;

export default Login;
