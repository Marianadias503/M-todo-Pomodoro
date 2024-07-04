import { HandPalm, Play } from "phosphor-react";
import {  HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useEffect, useState } from 'react';
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?:Date;
}


interface CyclesContextType{
 activeCycle: Cycle | undefined
 activeCycleId: string | null
 markCurrentCycleAsFinished : () => void
 
  

}


 export const CyclesContext = createContext ({} as CyclesContextType)


const Home = () => 
{
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
   
   function markCurrentCycleAsFinished (){
    setCycles ((state) => state.map((cycle) => {
      if ( cycle.id === activeCycleId) {
        return{...cycle, finishedDate : new Date()}
  
      } else{
        return cycle
      }
    }),
  )
}



 /* function handleCreateNewCycle(data: any) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  } */
  

function handleInterruptCycle(){


  setCycles( state => state.map((cycle) => {
    if ( cycle.id === activeCycleId) {
      return{...cycle, interruptDate: new Date()}

    } else{
      return cycle
    }
  }),
)
   setActiveCycleId(null)

}
   
//const task = watch('task');
//const isSubmitDisabled = !task;
  return (
    <HomeContainer>
      <form /*</HomeContainer> onSubmit={handleSubmit(handleCreateNewCycle)}*/ action="">

      <CyclesContext.Provider value ={{activeCycle, activeCycleId,markCurrentCycleAsFinished}}>
    { /* < NewCycleForm /> */}
      <Countdown />

      </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton /*disabled={isSubmitDisabled}*/ type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
};

export default Home;
