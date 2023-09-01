import React, {useState} from "react";
import styled from "styled-components";
import {firestore} from '../../../firebase'
import Auth from '../../../hoc/auth'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import { useSelector } from "react-redux";
function UploadFlock(props) {
    const {onClose} = props;
    const [title, setTitle] = useState('');
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const [numOfPeople, setNumOfPeople] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState(['','','']);

    // const [currentUser, setcurrentUser] = useState();

    const user = useSelector(state=>state.User);
    const currentUser = user.userData.Uid;
    // useEffect(()=>{
    //   if(user && Object.keys(user).length > 0){
    //     console.log(user);
    //     setcurrentUser(user.userData);
    //   }else{
    //     console.log("No user")
    //   }
    // }, [user]);
  // console.log(user);
    const handleCloseModal = () => {
        onClose(false);
        setTitle('');
        // setPeriod('');
        setNumOfPeople('');
        setDescription('');

    };

    const handleSubmit = () => {
        console.log({title, startDate, endDate, numOfPeople, description, tags});

        
        const flock = firestore.collection("flock").doc();

        let variable = {
          Uid: currentUser,
          FlockId: flock.id,
          Title: title,
          StartDate: startDate,
          EndDate: endDate,
          NumOfPeple: numOfPeople,
          Description: description,
          Tags: tags

        }
        flock
        .set(variable)
        .then( res=>{
          console.log('success');
        }
        )
        .catch(error => {
          console.log(error);
        });

        handleCloseModal();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'title':
              setTitle(value);
            break;
            case 'startdate':
              setstartDate(value);
            break;
            case 'enddate':
              setendDate(value);
            break;
            case 'numOfPeople':
              const onlyNumber = value.replace(/[^0-9]/g, '')
              setNumOfPeople(onlyNumber);
            break;
            case 'description':
              setDescription(value);
            break;
            default:
            break;
        }

    };

    const handleTagInputChange = (e, index) => { 
        const newTags = [...tags];
        newTags[index] = e.target.value;
        setTags(newTags);
    }


        // ... (이전 코드와 동일)
        return (
          <ModalLayout>
            <div style={{height: '90px'}}>
            <UploadSpan>Create your own flock</UploadSpan>
            <Line />
            </div>

            <div style={{display: 'flex', flexDirection: 'column', margin: '2.1rem'}}>
                <InputBox>
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={handleChange}
                  />
                </InputBox>
                <div style={{ display:'flex', flexDirection: 'inline', justifyContent: 'space-between'}}>
                <InputBox>
                  <label>Start date</label>
                  <DatePicker showIcon name="startdate" selected={startDate} onChange={date => setstartDate(date)} />
                </InputBox>
              
                <InputBox>
                  <label>End date</label>
                  <DatePicker showIcon name="enddate" selected={endDate} onChange={date => setendDate(date)} />
                </InputBox>
                <InputBox>
                  <label>Num of people</label>
                  <input
                    type="text"
                    name="numOfPeople"
                    placeholder="모집 인원 수를 입력하세요"
                    value={numOfPeople}
                    onChange={handleChange}
                  />
                </InputBox>
                </div>
                <InputBox>
                  <label>Content</label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="이곳에 모임 소개글을 입력하세요."
                    value={description}
                    onChange={handleChange}
                    rows="4"
                  />
                </InputBox>
      
                <div style={{display: 'flex', flexDirection: 'inline'}}>

                <TagLabel>태그달기 :</TagLabel>
                {tags.map((tag, index) => (
                  <TagInput
                      key={index}
                      type="text"
                      value={tag}
                      onChange={(e) => handleTagInputChange(e, index)}
                    />
                  ))}

         
                  <ButtonBox type="submit" onClick={handleSubmit}>등록</ButtonBox>
                  <ButtonBox type="cancel" onClick={handleCloseModal}>취소</ButtonBox>
          
               </div>
      </div>
      
    </ModalLayout>
  );
}

const ModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 610px;
  background: #FFFFFF;
  border-radius: 30px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  z-index: 5;
  margin-bottom: 10px;
  display: 'flex';
  flex-direction: column;
`;  

const UploadSpan = styled.span`
  position: absolute;
  width: 100%;
  top: 3%;
  font-family: 'SeoulHangang';
  font-style: normal;
  font-size: 40px;
  text-align: center;
  color: #460A9A;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Line = styled.hr`
  position: absolute;
  width: 100%;
  height: 0px;
  top: 80px;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
`;


const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  margin-left: 10px;

  label{
    font-family: 'SeoulHangang';
    width: 100%%;
    font-style: normal;
    font-size: 22px;
    color: #460A9A;
    margin-bottom: 5px;
  }

  input{
    box-sizing: border-box;
    width: 100%;
    background: #FFFFFF;
    height: 3rem;
    opacity: 0.8;
    border: 3px solid #460A9A;
    border-radius: 20px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 20px;
    padding: 10px;
    opacity: 0.7;
  }

  textarea{
    box-sizing: border-box;
    width: 100%;
    background: #FFFFFF;
    opacity: 0.8;
    border: 3px solid #460A9A;
    border-radius: 20px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 22px;
    padding: 30px;
    opacity: 0.7;

  }
  
`;
const TagLabel = styled.label`
  font-family: 'SeoulHangang';
  font-weight: 400;
  font-size: 20px;
  color: #460A9A;
`;

const TagInput = styled.input`
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  margin-left: 5px;
  background: #B39DDB;
  border: 3px solid #B39DDB;
  border-radius: 20px;
`;

const ButtonBox = styled.button`

    box-sizing: border-box;
    width: 80px;
    height: 40px;
    background: #460A9A;
    border: 3px solid #460A9A;
    border-radius: 10px;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 22px;
    color: #FFFFFF;
    margin-right: 5px;
    margin-top: 5px;
  

  @media (max-width: 768px) {
    width: 100%;
  }
`;





export default Auth(UploadFlock, true);