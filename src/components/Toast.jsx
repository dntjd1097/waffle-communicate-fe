import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoAlert } from "react-icons/go";

const Alarm = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.bgColor};
  border-radius: 10px;
  box-shadow: 0 0.5rem 1rem reg(0 0 0 /15%);
  padding: 5px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
`;

function Toast(props) {
  let err;
  useEffect(() => {
    let timer = setTimeout(() => {
      props.setToastState(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const Alert = () => {
    switch (props.code) {
      case "repeated":
        err = "이미 존재하는 제목입니다.";
        return (
          <>
            <GoAlert />
            <p>{err}</p>
          </>
        );

      case "empty":
        err = "내용을 입력해주세요.";
        return (
          <>
            <GoAlert />
            <p>{err}</p>
          </>
        );
      case "success":
        err = "완료되었습니다.";
        return (
          <>
            <GoAlert />
            <p>{err}</p>
          </>
        );
      default:
        return (
          <>
          error
          </>
        );
    }
  };

  return <Alarm>{Alert()}</Alarm>;
}

export default Toast;
