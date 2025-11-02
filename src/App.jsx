import React, { useState } from 'react';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Form from './components/ui/Form';
import Table from './components/ui/Table';
import Checkbox from './components/ui/CheckBox';
import Modal from './components/ui/Modal';
import Card from './components/ui/Card';
import Dropdown from './components/ui/Dropdown';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Homepage', assignee: 'John Doe', status: 'completed', priority: 'high' },
    { id: 2, title: 'API Integration', assignee: 'Jane Smith', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'User Testing', assignee: 'Mike Johnson', status: 'pending', priority: 'low' },
    { id: 4, title: 'Documentation', assignee: 'Sarah Wilson', status: 'in-progress', priority: 'medium' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    assignee: '',
    priority: 'medium'
  });

  const tableHeaders = [
    { key: 'title', label: 'Task Title' },
    { key: 'assignee', label: 'Assignee' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Priority' },
    { key: 'actions', label: 'Actions' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      assignee: newTask.assignee,
      status: 'pending',
      priority: newTask.priority
    };
    setTasks([...tasks, task]);
    setNewTask({ title: '', assignee: '', priority: 'medium' });
    setIsModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { class: 'status-completed', text: 'Completed' },
      'in-progress': { class: 'status-in-progress', text: 'In Progress' },
      'pending': { class: 'status-pending', text: 'Pending' }
    };
    const config = statusConfig[status];
    return <span className={config.class}>{config.text}</span>;
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      'high': { class: 'badge-danger', text: 'High' },
      'medium': { class: 'badge-warning', text: 'Medium' },
      'low': { class: 'badge-success', text: 'Low' }
    };
    const config = priorityConfig[priority];
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>TaskFlow</h2>
        <nav>
          <ul>
            <li><a href="#" className="active">Dashboard</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Tasks</a></li>
            <li><a href="#">Team</a></li>
            <li><a href="#">Calendar</a></li>
            <li><a href="#">Settings</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Project Dashboard</h1>
          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
          >
            + Add New Task
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <Card title="Total Tasks" variant="primary">
            <h3>{tasks.length}</h3>
            <p>All projects</p>
          </Card>
          <Card title="Completed" variant="default">
            <h3 className="status-completed">
              {tasks.filter(t => t.status === 'completed').length}
            </h3>
            <p>Tasks done</p>
          </Card>
          <Card title="In Progress" variant="default">
            <h3 className="status-in-progress">
              {tasks.filter(t => t.status === 'in-progress').length}
            </h3>
            <p>Active work</p>
          </Card>
          <Card title="Pending" variant="default">
            <h3 className="status-pending">
              {tasks.filter(t => t.status === 'pending').length}
            </h3>
            <p>Waiting to start</p>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Tasks Table */}
          <Card title="Recent Tasks">
            <Table
              headers={tableHeaders}
              data={tasks}
              renderRow={(task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.assignee}</td>
                  <td>{getStatusBadge(task.status)}</td>
                  <td>{getPriorityBadge(task.priority)}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="small"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )}
            />
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Button variant="primary">Create Project</Button>
              <Button variant="secondary">Generate Report</Button>
              <Button variant="success">Invite Team Member</Button>
              
              <Form title="Filter Tasks" onSubmit={(e) => e.preventDefault()}>
                <Checkbox label="Show completed tasks" />
                <Checkbox label="Show high priority only" />
                <Button type="submit" variant="primary" size="small">
                  Apply Filters
                </Button>
              </Form>
            </div>
          </Card>
        </div>

        {/* Add Task Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Task"
        >
          <Form onSubmit={handleAddTask}>
            <Input
              label="Task Title"
              placeholder="Enter task title"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              required
            />
            <Input
              label="Assignee"
              placeholder="Assign to team member"
              value={newTask.assignee}
              onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
              required
            />
            <Dropdown
              label="Priority"
              options={priorityOptions}
              value={newTask.priority}
              onChange={(value) => setNewTask({...newTask, priority: value})}
            />
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <Button type="submit" variant="primary">
                Create Task
              </Button>
              <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default App;