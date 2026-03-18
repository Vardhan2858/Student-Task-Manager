import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    taskName: '',
    subject: '',
    priority: 'Medium',
    dueDate: '',
    description: '',
  })
  const [tasks, setTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [hoverState, setHoverState] = useState({
    taskId: null,
    x: 0,
    y: 0,
  })

  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) {
      return tasks
    }
    return tasks.filter((task) => task.taskName.toLowerCase().includes(query))
  }, [searchTerm, tasks])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      taskName: '',
      subject: '',
      priority: 'Medium',
      dueDate: '',
      description: '',
    })
    setEditingTaskId(null)
  }

  const submitTask = () => {
    const normalizedTask = {
      taskName: formData.taskName.trim(),
      subject: formData.subject.trim(),
      priority: formData.priority,
      dueDate: formData.dueDate,
      description: formData.description.trim(),
    }

    if (!normalizedTask.taskName || !normalizedTask.subject || !normalizedTask.dueDate) {
      return
    }

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId ? { ...task, ...normalizedTask } : task,
        ),
      )
      resetForm()
      return
    }

    setTasks((prev) => [
      {
        id: Date.now().toString(),
        ...normalizedTask,
        completed: false,
      },
      ...prev,
    ])
    resetForm()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    submitTask()
  }

  const handleFormKeyDown = (event) => {
    const isTextArea = event.target.tagName === 'TEXTAREA'
    if (event.key === 'Enter' && !isTextArea) {
      event.preventDefault()
      submitTask()
    }
  }

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
    if (taskId === editingTaskId) {
      resetForm()
    }
  }

  const handleToggleCompleted = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  const handleEditTask = (task) => {
    setFormData({
      taskName: task.taskName,
      subject: task.subject,
      priority: task.priority,
      dueDate: task.dueDate,
      description: task.description,
    })
    setEditingTaskId(task.id)
  }

  const handleTaskMouseMove = (event, taskId) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setHoverState({
      taskId,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  return (
    <main className="app-shell">
      <header className="page-header">
        <h1>Student Task Manager</h1>
      </header>

      <section className="panel">
        <h2>{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>
        <form className="task-form" onSubmit={handleSubmit} onKeyDown={handleFormKeyDown}>
          <label>
            Task Name
            <input
              type="text"
              name="taskName"
              value={formData.taskName}
              onChange={handleInputChange}
              placeholder="Example: Study chapter 5"
              required
            />
          </label>

          <label>
            Subject
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Example: Physics"
              required
            />
          </label>

          <label>
            Priority
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <label>
            Due Date
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="full-width">
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Include notes, goals, or resources"
            />
          </label>

          <div className="form-actions full-width">
            <button type="submit">
              {editingTaskId ? 'Update Task' : 'Add Task'}
            </button>
            {editingTaskId && (
              <button type="button" className="secondary" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="tasks-heading">
          <h2>Tasks</h2>
          <input
            type="search"
            className="search-box"
            placeholder="Search by task name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        {filteredTasks.length === 0 ? (
          <p className="empty-state">No tasks found. Add a task to get started.</p>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => {
              const isHovered = hoverState.taskId === task.id
              const style = isHovered
                ? {
                    '--mouse-x': `${hoverState.x}px`,
                    '--mouse-y': `${hoverState.y}px`,
                  }
                : undefined

              return (
                <article
                  key={task.id}
                  style={style}
                  className={`task-item priority-${task.priority.toLowerCase()} ${
                    task.completed ? 'completed' : ''
                  }`}
                  onMouseEnter={() => setHoverState((prev) => ({ ...prev, taskId: task.id }))}
                  onMouseLeave={() => setHoverState({ taskId: null, x: 0, y: 0 })}
                  onMouseMove={(event) => handleTaskMouseMove(event, task.id)}
                >
                  <div className="task-main">
                    <div>
                      <h3>{task.taskName}</h3>
                      <p className="meta">
                        {task.subject} | Due: {task.dueDate}
                      </p>
                    </div>
                    <span className={`badge badge-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>

                  {task.description && <p className="description">{task.description}</p>}

                  <div className="task-actions">
                    <button type="button" onClick={() => handleToggleCompleted(task.id)}>
                      {task.completed ? 'Mark Pending' : 'Mark Completed'}
                    </button>
                    <button type="button" className="secondary" onClick={() => handleEditTask(task)}>
                      Edit
                    </button>
                    <button type="button" className="danger" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

export default App
