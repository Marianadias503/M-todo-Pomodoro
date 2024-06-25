 
import { Play } from "phosphor-react";
import{useForm} from 'react-hook-form'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

const Home = () => {
  
 
  const {register, handleSubmit,watch} = useForm()

  function handleCreateNewCycle(data:any){
    console.log(data)
  }

    const task = watch('task')
    const isSubmitDisable = !task

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
            {...register('minutesAmount',{valueAsNumber:true})}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton disabled={isSubmitDisable}
         type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  );
};

export default Home;
