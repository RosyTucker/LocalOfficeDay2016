let currentTask;

const putTask = (task) => {
    currentTask = task;
};

const getTask = () => {
    return currentTask;
};

export default {
    putTask,
    getTask
};