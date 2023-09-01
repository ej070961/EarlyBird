import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { firestore } from '../../../../firebase';
function Calendar(props) {
    const [squaresData, setSquaresData] = useState( Array(364).fill({level:0}));
    const [Posts, setPosts] = useState([]);
    const currentUser = props.currentUser;

    useEffect(() => {
        const posts = firestore.collection("posts")

        posts.where("Uid","==", currentUser.Uid)
        .onSnapshot(snapshot => {
          const updatedSquaresData = [...squaresData];
            snapshot.docs.forEach((doc)=>{
              const post = doc.data();
              const postTime = post.Time;
              console.log("postTime", postTime);
              const [ year, month, day] = postTime.split(' ')[0].split('.');
              console.log("year, month, day", year, month, day);
              const lastDayOfMonth = new Date(year, month, 0).getDate(); // Get the last day of the month
              console.log(lastDayOfMonth)
              const dayIndex = (parseInt(month) - 1) * lastDayOfMonth + parseInt(day);

              // Update squaresData for the specific dayIndex
              if (dayIndex >= 0 && dayIndex < squaresData.length) {
                updatedSquaresData[dayIndex+1] = { level: 1 }; // Post created
              }
            })
            setSquaresData(updatedSquaresData);
            
        }, error => {
          console.log(error);
        });

      
      }, []);

      console.log(squaresData)
     
    return (
        <CalendarContainer>
        <Months>
        <li>Jan</li>
        <li>Feb</li>
        <li>Mar</li>
        <li>Apr</li>
        <li>May</li>
        <li>Jun</li>
        <li>Jul</li>
        <li>Aug</li>
        <li>Sep</li>
        <li>Oct</li>
        <li>Nov</li>
        <li>Dec</li>
        </Months>
        <Days>
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
        </Days>
        <Squares className="squares">
        {squaresData.map((square, index) => (
            <Square key={index} level={square.level} />
        ))}
        </Squares>
    </CalendarContainer>
    )
}

export default Calendar
const CalendarContainer = styled.div`
  display: inline-grid;
  grid-template-areas: "empty months"
                      "days squares";
  grid-template-columns: auto 1fr;
  grid-gap: 10px;
  background: #FFF;
  border-radius: 20px;
  width: 1200px;
  margin: 40px;

`;

const Months = styled.ul`

  display: grid;
  grid-area: months;
  margin-bottom: 0px;
  padding-left: 20px;
  grid-template-columns: calc(20px * 5) /* Jan */
                        calc(20px * 4) /* Feb */
                        calc(20px * 5) /* Mar */
                        calc(20px * 4) /* Apr */
                        calc(20px * 5) /* May */
                        calc(20px * 4) /* Jun */
                        calc(20px * 5) /* Jul */
                        calc(20px * 4) /* Aug */
                        calc(20px * 5) /* Sep */
                        calc(20px * 4) /* Oct */
                        calc(20px * 5) /* Nov */
                        calc(20px * 4) /* Dec */;
  li {
    list-style-type: none;
    font-family: 'SeoulHangang';
    font-style: normal;
    font-size: 17px;
  }

`
const Days = styled.ul`
    display: grid;
    grid-gap: 15px;
    grid-template-rows: repeat(7, 15px);
    grid-area: days; 
    display: grid;
    margin-top: 10px;
    li {
        list-style-type: none;
        font-family: 'SeoulHangang';
        font-style: normal;
        font-size: 17px;
    }
`;

const Squares = styled.ul`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 5px;
  grid-gap: 15px;
  grid-area: squares;
  padding-left: 20px;
  margin-top: 10px;

  grid-template-rows: repeat(7, 15px);
`;

const Square = styled.li`
  list-style-type: none;
  width: 15px;
  height: 15px;
  background-color: ${({ level }) => {
    if (level === 1) return '#B47EE5';
    return '#ebedf0';
  }};
`;