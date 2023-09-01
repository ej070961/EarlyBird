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

    const todoListItem = Todo.map((todo, index)=>{
        return (
            <ItemLayout key={index}>
           
            <input type="checkbox"/>
            <input type="text" value={todo.text}/>
            <svg style={{fill:'#000', margin: '20px'}} xmlns="http://www.w3.org/2000/svg" height="1.8em" viewBox="0 0 512 512">
                <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"/>
            </svg>
            </ItemLayout>
          );

    })
    return (
        <CheckListLayout>
            <Title>
            <p>Did you..?</p>
            </Title>
            {todoListItem}
        
    
        </CheckListLayout>
    )
}

export default TodoList

const CheckListLayout = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  margin: 30px;
  margin-right: 20px;
`

const Title = styled.div`
    width: 100%;
    height: 80px;
    flex-shrink: 0;
    border-radius: 30px;
    background: rgba(179, 157, 219, 0.40);
    margin-bottom: 15px;
    
  p{
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 30px;
    margin: 20px;
  }
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
