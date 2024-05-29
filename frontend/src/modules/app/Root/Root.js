import React from "react";
import Navbar from "../Navbar";
import CreateTaskBox from "../../dashboard/CreateTaskBox";
import TaskListBox from "../../dashboard/TaskListBox";
import { useState } from "react";

const Root = () => {
    const [newTaskCreated, setNewTaskCreated] = useState(false);

    return <>
        {/*<Navbar />*/}
        <CreateTaskBox setNewTaskCreated={setNewTaskCreated} newTaskCreated={newTaskCreated} />
    </>
}

export default Root;
