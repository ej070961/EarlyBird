import React from 'react';
import styled from "styled-components";
import {Link} from 'react-router-dom';
import FlockItem from './FlockItem';

function ItemList(){
  return(
        <FlockListBlock>
        {/* <Link to="/flock/detail"><FlockItem/></Link> */}
        <FlockItem></FlockItem>
        {/* <FlockItem></FlockItem>
        <FlockItem></FlockItem>
        <FlockItem></FlockItem>
        <FlockItem></FlockItem>
        <FlockItem></FlockItem>
        <FlockItem></FlockItem>
        <FlockItem></FlockItem> */}
        </FlockListBlock>
  )
  };
  
const FlockListBlock = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

`
  export default ItemList;