const prisma = require('../utils/prisma');

// 1. CREATE A KANBAN CARD
exports.createTask = async (req, res) => {
  try {
    const assignerId = req.user.id;
    const { projectId, assignedTo, title, description, priority, dueDate, status } = req.body;

    // Put it at the bottom of the column by counting existing tasks in that status
    const targetStatus = status || 'todo';
    const existingTasksCount = await prisma.task.count({
      where: { projectId, status: targetStatus }
    });

    const task = await prisma.task.create({
      data: {
        projectId,
        assignedTo,
        assignedBy: assignerId,
        title,
        description,
        priority: priority || 'medium',
        dueDate: dueDate ? new Date(dueDate) : null,
        status: targetStatus,
        position: existingTasksCount // Places it at the bottom of the list
      },
      include: { employee: { select: { userId: true, name: true } } }
    });

    // Send an In-App Notification to the Employee
    await prisma.notification.create({
      data: {
        userId: task.employee.userId,
        title: `New Task Assigned: ${title}`,
        message: `You have been assigned a new ${priority || 'medium'} priority task.`,
        type: 'task'
      }
    });

    res.status(201).json({ success: true, message: "Task created successfully.", data: task });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. THE DRAG-AND-DROP ENDPOINT
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, position } = req.body; // The frontend sends the new column and new index
    const userId = req.user.id;
    const userRole = req.user.role;

    const allowedStatuses = ['todo', 'in-progress', 'code-review', 'qa-testing', 'done'];

    if (!status || position === undefined) {
      return res.status(400).json({ success: false, message: "Status and position are required." });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid task status." });
    }

    if (!Number.isInteger(position) || position < 0) {
      return res.status(400).json({ success: false, message: "Position must be a non-negative integer." });
    }

    const task = await prisma.task.findUnique({
      where: { id },
      select: { id: true, assignedTo: true }
    });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found." });
    }

    if (userRole !== 'admin') {
      const employee = await prisma.employee.findUnique({
        where: { userId },
        select: { id: true }
      });

      if (!employee) {
        return res.status(404).json({ success: false, message: "Employee profile not found." });
      }

      if (task.assignedTo !== employee.id) {
        return res.status(403).json({ success: false, message: "You can only update your assigned tasks." });
      }
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status, position }
    });

    res.status(200).json({ success: true, message: "Task moved successfully.", data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 3. GET MY TASKS (Employee View)
exports.getMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find the employee ID linked to this logged-in user
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ success: false, message: "Employee profile not found." });

    const tasks = await prisma.task.findMany({
      where: { assignedTo: employee.id },
      include: {
        project: { select: { name: true } },
        assigner: { select: { email: true } }
      },
      orderBy: { dueDate: 'asc' }
    });

    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};