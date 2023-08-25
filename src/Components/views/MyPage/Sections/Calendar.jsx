import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
function Calendar() {
    const [squaresData, setSquaresData] = useState([]);

    useEffect(() => {
        const newSquaresData = [];
        for (let i = 1; i < 365; i++) {
          const level = Math.floor(Math.random() * 3).toString();
          newSquaresData.push({ level });
        }
        setSquaresData(newSquaresData);
      }, []);

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
  grid-template-columns: calc(20px * 4) /* Jan */
                        calc(20px * 4) /* Feb */
                        calc(20px * 4) /* Mar */
                        calc(20px * 5) /* Apr */
                        calc(20px * 4) /* May */
                        calc(20px * 4) /* Jun */
                        calc(20px * 5) /* Jul */
                        calc(20px * 4) /* Aug */
                        calc(20px * 4) /* Sep */
                        calc(20px * 5) /* Oct */
                        calc(20px * 4) /* Nov */
                        calc(20px * 5) /* Dec */;
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
    if (level === '1') return '#c6e48b';
    if (level === '2') return '#7bc96f';
    if (level === '3') return '#196127';
    return '#ebedf0';
  }};
`;