import React from "react";
import styled from "styled-components";

function FlockItem({title, tag}){
    return(
        <CardLayout>
            <div className="card-title">
            </div>
            <div className="tag">

            </div>
        </CardLayout>
    );
}

const CardLayout = styled.div`
    flex-basis: calc(33.33% - 50px);
    margin-bottom: 20px;
    height: 330px;
    background: #B39DDB;
    border: 2px solid #FFFFFF;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:not(:last-child) {
        margin-right: 20px;
      }
    
    @media screen and (max-width: 1024px) {
        width: calc(50% - 20px); 
        height: 440px;
    }
    
    @media screen and (max-width: 768px) {
        width: calc(100% - 20px); 
        margin-left: 20px;
        margin-right: 20px;
    }

    .card-title{
        position: relative;
        width: 90%;
        height: 15%;
        left: 20px;
        top: 20px;
        background: #FFFFFF;
        border-radius: 30px;
    }
    .tag{
        width: 130px;
        height: 40px;
        flex-shrink: 0;
        border-radius: 30px;
        background: rgba(38, 15, 69, 0.40);
        margin: 10px;

    }
    
`;
export default FlockItem;