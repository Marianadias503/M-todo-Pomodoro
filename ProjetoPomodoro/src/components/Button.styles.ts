
import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' ;
interface ButtonContainerPros {
    variant: ButtonVariant;
}
const buttonVariants = {
    primary:'purple',
    secondary:'orange',
    danger:'red',
    success:'green',
 };
 
export const ButtonContainer = styled.button <ButtonContainerPros>`

width:100px;
height:40px;

${props =>{
    return  `background-color: ${buttonVariants[props.variant]}`

}}



`