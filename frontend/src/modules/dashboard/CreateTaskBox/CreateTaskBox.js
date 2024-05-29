import {Box, Button, Container, TextField, Typography, Grid} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";
import {useGlobalAction} from "../../../lib/comms_v2/nonGetActions";
import {createTaskAction} from "../actionCreators";
import { mutate } from 'swr'
import TaskListBox from "../TaskListBox";
import "../../../styles.css"

const CreateTaskBox = (props) => {
    const { setNewTaskCreated, newTaskCreated } = props;
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const createTask = useGlobalAction(createTaskAction)

    const handleAddTask = () => {
        const data = { title: title, description: desc };
        createTask(data).then(res => setNewTaskCreated(true));
        setTitle("");
        setDesc("");
    }

    const onClickTodoInput = () => {
        // const addButton = document.querySelector(".create-task-box .add-button")
        // addButton.style.height = "56px";
        // addButton.style.width = "56px";
    }

    return <>
        <Container className="create-task-box-container" sx={{
            marginTop: "120px",
            display: "flex",
            justifyContent: "center",
        }}>
            <Box className="create-task-box" sx={{}}>
                <Typography variant="h4" sx={{textAlign: "center"}}>Todo App</Typography>
                <Box className="add-todo-container"
                    sx={{
                        display: 'flex',
                    }}
                >
                    <TextField className="todo-input"
                               sx={{
                                   flexGrow: 1,
                               }}
                               label="Add your new todo"
                               value={title}
                               onChange={e => setTitle(e.target.value)}
                               onClick={onClickTodoInput}
                    />
                    <Button className="add-button"
                            onClick={handleAddTask} variant={'contained'}>
                        <AddIcon fontSize="large"/>
                    </Button>
                </Box>
                <TaskListBox setNewTaskCreated={setNewTaskCreated} newTaskCreated={newTaskCreated}/>
            </Box>
        </Container>
    </>
}

export default CreateTaskBox;
