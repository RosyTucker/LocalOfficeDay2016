let currentTask;

const putTask = (destination, type) => {
    const task = {destination: destination, type: type};
    currentTask = task;
};

const getTask = () => {
    return currentTask;
};

export default {
    putTask,
    getTask
};