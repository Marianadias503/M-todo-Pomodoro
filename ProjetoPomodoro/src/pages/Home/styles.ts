import styled from "styled-components";


export const HomeContainer = styled.main `

    flex:1;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  
    
.text{
    padding-right:1rem;
    padding-left:1rem;
}

`
export const FormContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:3.5rem;
    width:100%;
    color: ${props=>props.theme['gray-100']};
    font-size:1.125rem;
    font-weight:bold;
    flex-wrap:wrap;
    `
export const CountdownContainer = styled.div`

    font-family:'Roboto mono', monospace;
    font-size:10rem;
    line-height:8rem;
    color:${(props)=>props.theme['gray-100']};
    display:flex;
    gap:1rem;

span{
    background:${(props)=>props.theme['gray-700']};
    padding:2rem 1rem;
    border-radius:2px;
}

`
 export const Separator =styled.div`
 
 padding:2rem 0;
 color:${(props) => props.theme['green-500']};
 width:4rem;
 overflow:hidden;
 display:flex;
 justify-content:center;
 
 `