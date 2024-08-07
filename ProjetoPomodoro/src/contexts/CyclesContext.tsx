import { createContext, ReactNode, useState, useReducer, useEffect } from 'react';
import { Cycle, cyclesReducer} from '../reducers/cycles/reducer';
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';

interface CreateCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleData) => void;
  interruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
  children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);



export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer( cyclesReducer,
    {
    cycles: [],
    activeCycleId: null,
  },()=>{

    const storedStateJSON= localStorage.getItem('@Pomodoro:cycles-state-1.0.0');
    if(storedStateJSON){
      return JSON.parse(storedStateJSON)
    }

  });

  useEffect (()=> {

    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@Pomodoro:cycles-state-1.0.0' , stateJSON)


  },[cyclesState])

  const { cycles, activeCycleId } = cyclesState;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction (newCycle));
    setAmountSecondsPassed(0);
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
