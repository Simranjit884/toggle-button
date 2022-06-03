import React, { useEffect, useState, useCallback, useMemo } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const transformedTask = useCallback((requestObj) => {
    const loadedTasks = [];

    for (const taskKey in requestObj) {
      loadedTasks.push({ id: taskKey, text: requestObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const httpUrl = useMemo(() => {
    return {
      url: "https://dummy-https-default-rtdb.firebaseio.com/tasks.json",
    };
  }, []);

  const {
    isLoading,
    error,
    sendRequest: fetchTasks,
  } = useHttp(httpUrl, transformedTask);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
