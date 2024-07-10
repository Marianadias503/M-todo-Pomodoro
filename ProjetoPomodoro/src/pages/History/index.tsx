import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History() {
    const { cycles } = useContext(CyclesContext)

    return (
        <HistoryContainer>
            <h1>Meu histórico</h1>
            <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre>
            
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cycles.map((cycle) => (
                            <tr key={cycle.id}>
                                <td>{cycle.task}</td>
                                <td>{cycle.minutesAmount} minutos</td>
                                <td>{cycle.startDate.toString()}</td>
                                <td>
                                    <Status statusColor={getStatusColor(cycle)}>
                                        {getStatusText(cycle)}
                                    </Status>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}

function getStatusColor(cycle) {
    if (cycle.finishedDate) {
        return 'green';
    }
    if (cycle.interruptDate) {
        return 'red';
    }
    return 'yellow';
}

function getStatusText(cycle) {
    if (cycle.finishedDate) {
        return 'Concluído';
    }
    if (cycle.interruptDate) {
        return 'Interrompido';
    }
    return 'Em andamento';
}
