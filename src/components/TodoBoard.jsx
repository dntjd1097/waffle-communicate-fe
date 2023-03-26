import { React, useState } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoDispatch, useTodoState } from "../Context";
import Toast from "./Toast";
import { customMedia } from "../styles/globalStyles";

const Container_status = styled.div`
  display: flex;
  width: 100%;
  border: 3px solid;
  background-color: ${(props) => props.theme.contain_status_bg};
`;

const Wrapper_uncomplete = styled.div`
  border-right: 2px solid;
  width: 50%;
`;
const Wrapper_complete = styled.div`
  width: 50%;
`;
const Status = styled.h1`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  height: 100%;
  font-size: 1.5rem;
  padding: 2% 6%;
  font-weight: bold;
  ${customMedia.lessThan('mobile')`
		width: 100%;
		font-size: 15px;
	`}
`;
const Container_board = styled.div`
  display: grid;
  grid-auto-flow: dense;
  width: 100%;
  height: 150%;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  background-color: ${(props) => props.theme.todo_create_bg};
  border: 2px solid;
  border-top: none;
  margin-bottom: 500px;
`;
function TodoBoard() {
  const [toastState, setToastState] = useState(false);
  const [code, setcode] = useState("");
  const dispatch = useTodoDispatch();
  const DraggingOver = (e) => {
    e.preventDefault();
  };
  const dragDropped = (e) => {
    const transferedTodoID1 = parseInt(e.dataTransfer.getData("drag_startID"));
    //setToastState(true);
    setcode("success");
    dispatch({
      type: "COMPLETE",
      id: transferedTodoID1,
    });
  };
  const todos = useTodoState();
  const [uncomplete, complete] = [
    todos.filter((todo) => !todo.done),
    todos.filter((todo) => todo.done),
  ];
  const Alert = () => {
    return (
      <>
        {toastState === true ? (
          <Toast setToastState={setToastState} code={code} />
        ) : null}
      </>
    );
  };

  return (
    <>
      <Alert />
      <Container_status>
        <Wrapper_uncomplete>
          <Status>
            <div>UNCOMPLETE</div>
            <div>({uncomplete.length})</div>
          </Status>
        </Wrapper_uncomplete>
        <Wrapper_complete>
        <Status>
            <div>COMPLETE</div>
            <div>({complete.length})</div>
          </Status>
        </Wrapper_complete>
      </Container_status>
      <Container_board
        droppable
        onDragOver={(e) => DraggingOver(e)}
        onDrop={(e) => dragDropped(e)}
      >
        {todos.map((todo) => (
          <TodoItem
            id={todo.id}
            text={todo.text}
            done={todo.done}
            key={todo.id}
          />
        ))}
      </Container_board>
    </>
  );
}

export default TodoBoard;
