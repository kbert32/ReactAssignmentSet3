import useHttp from '../../custom-hook/use-http';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const {isLoading, error, sendRequest: postTasks} = useHttp();

  function transformTasks(taskText, tasksObj) {
      const generatedId = tasksObj.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
  };

  function enterTaskHandler(taskText) {
    postTasks({
      url: 'https://react-customhooks-tasks-be642-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {text: taskText},  
    }, transformTasks.bind(null, taskText));    //bind allows taskText to be bound to the function for use when transformTasks is 
  };                                            //called from useHttp custom hook: null replaces 'this', tasksObj (data) will be
                                                //added after taskText; Also could have been done without using bind, by 
  return (                                      //nesting transformTasks within enterTaskHandler, giving transformTasks access to enterTaskHandler's argument
    <Section>                                   
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
