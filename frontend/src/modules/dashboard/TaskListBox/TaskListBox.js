import { Box, Container } from "@mui/material"
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useGlobalSWR } from "../../../lib/comms_v2/useGlobalSWR";
import * as actionCreators from "../actionCreators";
import {useGlobalAction} from "../../../lib/comms_v2/nonGetActions";
import DeleteIcon from '@mui/icons-material/Delete';
import TaskDialog from "../TaskDialog";
import {useEffect, useState} from "react";
import "../../../styles.css"
import {mutate} from "swr";

const TaskListBox = (props) => {
    const { newTaskCreated, setNewTaskCreated } = props;
    const [taskDialog, setTaskDialog] = React.useState({ data: null, open: false });
    const [checked, setChecked] = React.useState([0]);
    const [editMode, setEditMode] = useState(false);
    const [editableTaskId, setEditableTaskId] = useState(null);
    const [inputValue, setInputValue] = useState('');

    const tasks = useGlobalSWR(actionCreators.getAllTasksAction())
    const updateTask = useGlobalAction(actionCreators.updateTaskAction)
    const deleteTask = useGlobalAction(actionCreators.deleteTaskAction)

    useEffect(() => {
        if (newTaskCreated) {
            tasks.mutate();
            setNewTaskCreated(false);
        }
    }, [newTaskCreated]);

    const handleOnDelete = (id) => {
        deleteTask(id).then(res => tasks.mutate());
    }

    const handleCheckBoxOperation = (id, completed) => {
        const data = { completed: !completed };
        updateTask(id, data).then(res => tasks.mutate());
    }

    const handleEditClick = (taskId, taskTitle) => {
        const taskToUpdate = tasks.data.find(task => task.id === taskId)
        taskToUpdate["editMode"] = true
        setEditMode(true)
        setEditableTaskId(taskId);
        setInputValue(taskTitle);
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSaveClick = () => {
        setEditMode(false)
        setEditableTaskId(null);
        const taskToUpdate = tasks.data.find(task => task.id === editableTaskId)
        taskToUpdate.title = inputValue
        taskToUpdate["editMode"] = false
        updateTask(editableTaskId, { title: inputValue}).then(res => {
            mutate();
        });
    };

    return <>
        <Container className="task-list-box" sx={{
            display: "flex",
            justifyContent: "center",
            padding: "0 !important",
        }}>
            <Box sx={{
                maxWidth: "600px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                rowGap: "20px"
            }}>
                {/*<Typography variant="h5">Your Tasks</Typography>*/}
                <List sx={{ 
                    width: '100%', 
                    maxWidth: "100%", 
                    bgcolor: 'background.paper',
                }}>
                {!tasks.isLoading && tasks.data.map((task) => {
                    const labelId = `checkbox-list-label-${task.id}`;
                    return (
                    <ListItem sx={{
                        background: "rgba(0, 0, 0, 0.04)",
                        height: "56px"
                    }}
                        key={task.id}
                        secondaryAction={
                        <>
                            {!task.editMode && (
                                <>
                                    < IconButton className="delete-button" onClick={() => handleOnDelete(task.id)}
                                                 aria-label="comments">
                                        <DeleteIcon/>
                                    </IconButton>
                                    <IconButton className="edit-button"
                                                onClick={() => handleEditClick(task.id, task.title)}>
                                        <EditIcon/>
                                    </IconButton>
                                </>
                            )}
                            {task.editMode && (
                                <>
                                    <IconButton className="save-button" onClick={() => handleSaveClick()}>
                                        <CheckIcon/>
                                    </IconButton>
                                </>
                            )}
                        </>
                        }
                        disablePadding
                    >

                        {editableTaskId === task.id ?
                            <input
                                className="list-text"
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                autoFocus
                            />
                            :
                            <span className="list-text">{task.title}</span>
                        }
                    </ListItem>
                    );
                })}
                </List>
            </Box>
        </Container>
    </>
}

export default TaskListBox;
