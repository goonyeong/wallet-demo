import styled from "styled-components";

export const ErrorFallback = ({ error, reset }: RenderFallbackProps) => {
  return (
    <Wrapper>
      <h3 className="notice">에러 발생!!!</h3>
      <p className="errorMessege">Error: {error.message}</p>
      <Btn_Container>
        <button onClick={reset}>다시 시도</button>
      </Btn_Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  flex: 1;
  .notice {
    font-size: 30px;
  }
  .errorMessege {
    font-size: 20px;
  }
`;

const Btn_Container = styled.div`
  width: 100px;
  height: 40px;
`;
