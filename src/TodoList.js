import { getQueriesForElement } from "@testing-library/react";
import { useState, useEffect } from "react";
import './TodoList.css';


const TodoList = () => {

    document.title = "Tareas Externas";
    const [counterUser, setCounterUser] = useState(1);
    const [user, setUser] = useState([]);
    const [userChore, setUserChore] = useState([]);

    useEffect(() => {

        const getDataChore = async () => {
            const infoUser = await fetch(
                `https://jsonplaceholder.typicode.com/users/${counterUser}/todos`
            );
            const dataUser = await infoUser.json();
            console.log("tareas", dataUser);
            setUserChore(dataUser);
        };
        getDataChore();


        const getData = async () => {
            const infoUser = await fetch(
                `https://jsonplaceholder.typicode.com/users/${counterUser}`
            );
            const dataHeadUser = await infoUser.json();
            console.log("usuario", dataHeadUser);
            setUser(dataHeadUser);
        };
        getData();
    }, [counterUser]);



    //BUTTONS FUNCTIONS

    const handleAddTask = () => {
        const title = document.querySelector('#task').value;
        setUserChore(prevState => [
            ...prevState, {
                title,
                completed: false
            }
        ]);
        document.querySelector('#task').value = '';

    };

    const handleRemoveChore = (index) => {
        setUserChore((prevTask) => {
            return prevTask.filter((task, i) => i !== index);
        });
    };

    const handleNextUser = () => {
        if (counterUser < 10) {
            setCounterUser(counterUser + 1);
        }
    };

    const handlePreviousUser = () => {
        if (counterUser > 1) {
            setCounterUser(counterUser - 1);
        }
    };

    const handleCompletedChore = (index) => {
        setUserChore((prevState) => {
            const newListChore = [...prevState];
            newListChore[index].completed = true;
            return newListChore;
        });
    };


    return (

        <>
            <div>
                <button onClick={handlePreviousUser} disabled={counterUser <= 1}>Anterior usuario</button>
                <button onClick={handleNextUser} disabled={counterUser >= 10}>Siguiente usuario</button>
            </div>
            <div>
                <h1>Información del usuario</h1>
                <ul>
                    <li>
                        <strong>Nombre: </strong>
                        {user.name}
                    </li>
                    <li>
                        <strong>Usuario: </strong>
                        {user.username}
                    </li>
                    <li>
                        <strong>Email: </strong>
                        {user.email}
                    </li>
                    <li>
                        <strong>Web: </strong>
                        {user.website}
                    </li>
                    <li>
                        <strong>Teléfono: </strong>
                        {user.phone}
                    </li>
                </ul>
            </div>
            <div>
                <label>Tarea</label>
                <input type="text" id="task" />
                <button onClick={handleAddTask}>Agregar tarea</button>
            </div>
            <h1>Lista de tareas ({userChore.length} en total)</h1>
            <table>
                <thead>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Eliminar</th>
                </thead>
                <tbody>
                    {userChore.map((task, index) => (
                        <tr key={index}>
                            <td>{task.title}</td>
                            <td>
                                {
                                    task.completed ? <h7 id="bo-co"><stong>Completada</stong></h7> : <button id="bo-ma" onClick={() => handleCompletedChore(index)}>Marcar como completada</button>
                                }
                            </td>
                            <td><button onClick={() => handleRemoveChore(index)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default TodoList;
