const prisma = require('../utils/prisma');
const { v4: uuidv4 } = require('uuid'); 

// Start of Day (Midnight)
const getStartOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

// 1. ADD LOG
exports.addLog = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, status, timeTaken } = req.body;

    const today = getStartOfDay(new Date());

    // A. Find existing bucket for today
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Now search correctly using employee.id
    let dailyLog = await prisma.dailyLog.findFirst({
      where: {
        employeeId: employee.id,
        date: today
      }
    });

    // B. Create the new Task Object
    const newTask = {
      id: uuidv4(), 
      title,
      description,
      status,
      timeTaken: parseFloat(timeTaken)
    };

    if (!dailyLog) {
      // Scenario 1: First log of the day -> CREATE
      dailyLog = await prisma.dailyLog.create({
        data: {
          employeeId: employee.id,
          date: today,
          workItems: [newTask], 
          totalHours: newTask.timeTaken
        }
      });
    } else {
      // Scenario 2: Row exists -> UPDATE (Append)
      const currentItems = dailyLog.workItems || [];
      const updatedItems = [...currentItems, newTask];
      const newTotal = dailyLog.totalHours + newTask.timeTaken;

      dailyLog = await prisma.dailyLog.update({
        where: { id: dailyLog.id },
        data: {
          workItems: updatedItems,
          totalHours: newTotal
        }
      });
    }

    res.status(200).json({ success: true, data: dailyLog });

  } catch (error) {
    console.error("Add Log Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// 2. DELETE LOG ITEM
exports.deleteLogItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { logId, taskId } = req.body; // logId = The Row ID, taskId = The specific item ID

    // A. Fetch the Log Row
    const dailyLog = await prisma.dailyLog.findUnique({ where: { id: logId } });
    if (!dailyLog) return res.status(404).json({ message: "Log entry not found" });

    // B. "Same Day" Constraint Check
    const logDate = getStartOfDay(dailyLog.date);
    const today = getStartOfDay(new Date());
    if (logDate.getTime() !== today.getTime()) {
      return res.status(403).json({ message: "You can only delete logs for the current day." });
    }

    // C. Filter out the task
    const currentItems = dailyLog.workItems;
    const taskToDelete = currentItems.find(item => item.id === taskId);
    
    if (!taskToDelete) return res.status(404).json({ message: "Task item not found" });

    const updatedItems = currentItems.filter(item => item.id !== taskId);
    const newTotal = dailyLog.totalHours - taskToDelete.timeTaken;

    // D. Save
    const updatedLog = await prisma.dailyLog.update({
      where: { id: logId },
      data: {
        workItems: updatedItems,
        totalHours: newTotal
      }
    });

    res.status(200).json({ success: true, message: "Item deleted", data: updatedLog });

  } catch (error) {
    res.status(500).json({ message: "Delete Error", error: error.message });
  }
};

// 3. EDIT LOG ITEM (Update)
exports.updateLogItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { logId, taskId, updates } = req.body; // updates = { title: "New", timeTaken: 3 }

    // A. Fetch
    const dailyLog = await prisma.dailyLog.findUnique({ where: { id: logId } });
    if (!dailyLog) return res.status(404).json({ message: "Log not found" });

    // B. "Same Day" Constraint
    const logDate = getStartOfDay(dailyLog.date);
    const today = getStartOfDay(new Date());
    if (logDate.getTime() !== today.getTime()) {
      return res.status(403).json({ message: "You can only edit logs for the current day." });
    }

    // C. Find and Modify in Array
    let oldTime = 0;
    let newTime = 0;
    
    const updatedItems = dailyLog.workItems.map(item => {
      if (item.id === taskId) {
        oldTime = item.timeTaken;
        const mergedItem = { ...item, ...updates };
        newTime = parseFloat(mergedItem.timeTaken); 
        return mergedItem;
      }
      return item;
    });

    // D. Recalculate Total
    const newTotal = dailyLog.totalHours - oldTime + newTime;

    // E. Save
    const finalLog = await prisma.dailyLog.update({
      where: { id: logId },
      data: {
        workItems: updatedItems,
        totalHours: newTotal
      }
    });

    res.status(200).json({ success: true, message: "Item updated", data: finalLog });

  } catch (error) {
    res.status(500).json({ message: "Update Error", error: error.message });
  }
};

// 4. GET LOGS (Read History)
exports.getLogs = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Find Employee ID
    const employee = await prisma.employee.findUnique({ where: { userId } });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // 2. Fetch Logs (Newest date first)
    const logs = await prisma.dailyLog.findMany({
      where: { employeeId: employee.id },
      orderBy: { date: 'desc' },
      take: 30 // Optional: Limit to last 30 entries to keep it fast
    });

    res.status(200).json({ success: true, count: logs.length, data: logs });

  } catch (error) {
    res.status(500).json({ message: "Fetch Error", error: error.message });
  }
};