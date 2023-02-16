import useHttp from '../../custom-hook/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: postTasks} = useHttp();

  
  function enterTaskHandler(taskText) {
    function transformTasks(tasksObj) {
        const generatedId = tasksObj.name; // firebase-specific => "name" contains generated id
        const createdTask = { id: generatedId, text: taskText };
  
        props.onAddTask(createdTask);
    };
    postTasks({
      url: 'https://react-customhooks-tasks-be642-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: taskText}),  
    }, transformTasks);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
