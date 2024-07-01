import { Play } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod';
import { useState } from 'react';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
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

  function handleCreateNewCycle(data: any) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

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

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};

export default Home;
