import { useState } from 'react';
import { List, Input, Button, Checkbox, Card } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const ToDoList = () => {
  const [tasks, setTasks] = useState([{ text: 'Làm bài tập React', done: false }]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <Card title="To-Do List" style={{ maxWidth: 500, margin: 'auto', marginTop: 20, borderRadius: 10, boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}>
      <Input
        placeholder="Thêm công việc mới..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onPressEnter={addTask}
        suffix={<Button type="primary" icon={<PlusOutlined />} onClick={addTask} />}
      />
      <List
        style={{ marginTop: 20 }}
        bordered
        dataSource={tasks}
        renderItem={(item, index) => (
          <List.Item
            style={{ textDecoration: item.done ? 'line-through' : 'none', display: 'flex', justifyContent: 'space-between' }}
          >
            <Checkbox checked={item.done} onChange={() => toggleTask(index)}>
              {item.text}
            </Checkbox>
            <Button type="text" icon={<DeleteOutlined />} danger onClick={() => deleteTask(index)} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ToDoList;
