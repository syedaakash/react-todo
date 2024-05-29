// @flow

import {fetchCollection, createRecord, updateRecord, deleteRecord} from "../../lib/comms_v2/actionCreators";
import type, { CrudAction } from '../../lib/comms_v2/typeDefs';

export const getAllTasksAction = (): CrudAction => fetchCollection('Task', 'tasks/');

export const updateTaskAction = (id, data): CrudAction => updateRecord('Task', id, `tasks/${id}`, data);

export const deleteTaskAction = (id): CrudAction => deleteRecord('Task', id, `tasks/${id}`);

export const createTaskAction = (data): CrudAction => createRecord('Task',`tasks/`, data);
