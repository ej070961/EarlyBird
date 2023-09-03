import React, {useState} from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function TodoList() {

    const [Todo, setTodo] = useState([
        {
            id: 1,
            text: '리액트 기초 알아보기',
            checked: true,
          },
          {
            id: 2,
            text: '컴포넌트 스타일링 하기',
            checked: true,
          },
          {
            id: 3,
            text: '투두리스트 만들기',
            checked: false,
          },
    ]);

    const [ReviseState, setReviseState] = useState(false);

    const handleChange = (id, newText) => {
      // Todo 배열 복사
      const updatedTodo = [...Todo];
      // Todo 배열에서 해당 id에 해당하는 항목 찾기
      const todoToUpdate = updatedTodo.find((todo) => todo.id === id);
      if (todoToUpdate) {
        // 해당 항목의 text 업데이트
        todoToUpdate.text = newText;
        // 상태 업데이트
        setTodo(updatedTodo);
      }
    };
    const todoListItem = Todo.map((todo, index)=>{
        return (
            <ItemLayout key={index}>
            {ReviseState ? 
             <input type="text" value={todo.text} onChange={(e)=>handleChange(todo.id, e.target.value)}/>
            
            : 

             
            <div>
              <StyledLabel htmlFor={todo.text}>
              <StyledInput type="checkbox" id={todo.text} name={todo.text}/>
              <StyledP>{todo.text}</StyledP>
              </StyledLabel>
            </div>}
            
          
           
            </ItemLayout>
          );

    })
    return (
        <CheckListLayout>
            <ItemLayout>
            <StyledP>Did you..?</StyledP>
            <svg onClick={()=>setReviseState(!ReviseState)}style={{fill:'#000', margin: '20px'}} xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 512 512">
              <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"/>
              </svg>
            </ItemLayout>
            {todoListItem}
        
    
        </CheckListLayout>
    )
}

export default TodoList


const CheckListLayout = styled.div`
  display: flex;
  width: 800px;
  flex-direction: column;
  margin: 30px;
  margin-right: 20px;
`
const ItemLayout = styled.li`
  display: flex;
  flex-direction: inline;
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  border-radius: 30px;
  background: rgba(179, 157, 219, 0.40);
  margin-bottom: 15px;
 
  list-style-type: none;

`

const StyledInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  margin-left: 20px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 30px;
    margin: 20px;
`;
