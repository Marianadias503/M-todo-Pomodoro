import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";



export function Home() {
   return (
      <HomeContainer>
        <form action="">
         <FormContainer>
        
            <label htmlFor="task"  >Vou trabalhar em</label>
            <TaskInput
              id="task" 
              list="task-suggestions"
              placeholder="Dê um nome para o seu projeto"  />

              <datalist id="task-suggestions">
                  <option value="Projeto1"></option>
                  <option value="Projeto2"></option>
                  <option value="Projeto3"></option>
                  <option value="Projeto4"></option>
              </datalist>
            
            <label htmlFor="task">Durante</label>
            <MinutesAmountInput type="number"   
              id="minutesAmount" 
              placeholder="00" 
              step={5}
              min={5}
              max={60} />

            <span className="text">minutos.</span>
       

          </FormContainer>
           
    
         <CountdownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>:</Separator>
            <span>0</span>
            <span>0</span>
         </CountdownContainer>


<StartCountDownButton disabled type="submit">
   <Play size={24}/>
   Começar
</StartCountDownButton>

</form>



      </HomeContainer>
   );
}
