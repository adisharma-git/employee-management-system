const prisma = require('../utils/prisma');

// 1. CREATE A PROJECT (Admin Only)
exports.createProject = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ success: false, message: "Project name is required." });

    const project = await prisma.project.create({
      data: {
        name,
        description,
        createdBy: adminId
      }
    });

    res.status(201).json({ success: true, message: "Project board created successfully.", data: project });
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET ALL PROJECTS (Directory)
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        _count: { select: { tasks: true } } // Returns the total number of tasks inside it
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 3. GET SINGLE PROJECT & ITS KANBAN BOARD
exports.getProjectBoard = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          orderBy: { position: 'asc' }, // MUST be ordered by position for drag-and-drop!
          include: {
            employee: { select: { name: true, designation: true } }
          }
        }
      }
    });

    if (!project) return res.status(404).json({ success: false, message: "Project not found." });

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};