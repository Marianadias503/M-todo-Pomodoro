import { HandPalm, Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, TaskInput, StartCountDownButton, StopCountDownButton } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptDate?: Date;
  finishedDate?:Date;
}

const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60),
  });

  const { register, handleSubmit, watch, reset } = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  });

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {

      interval = window.setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
           activeCycle.startDate
          )

          if (secondsDifference>= totalSeconds){

            setCycles
            ( state => state.map((cycle) => {
              if ( cycle.id === activeCycleId) {
                return{...cycle, finishedDate : new Date()}
          
              } else{
                return cycle
              }
            }),
             
          )

            setAmountSecondsPassed(totalSeconds)

            clearInterval(interval)

          } else {
            setAmountSecondsPassed( secondsDifference);
          }
               
       
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeCycle,totalSeconds]);




  function handleCreateNewCycle(data: any) {
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
  }
  

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
  
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {

    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />
          <datalist id="task-suggestions">
            <option value="Projeto1"></option>
            <option value="Projeto2"></option>
            <option value="Projeto3"></option>
            <option value="Projeto4"></option>
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountDownButton onClick={handleInterruptCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
};

export default Home;
