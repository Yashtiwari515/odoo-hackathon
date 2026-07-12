const prisma = require("../config/db");

// Get All Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      include: {
        vehicle: true,
      },
    });

    res.json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Expense By Id
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await prisma.expense.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create Expense
exports.createExpense = async (req, res) => {
  try {
    const expense = await prisma.expense.create({
      data: {
        category: req.body.category,
        amount: Number(req.body.amount),
        description: req.body.description,
        date: new Date(req.body.date),
        vehicleId: req.body.vehicleId ? Number(req.body.vehicleId) : null,
      },
    });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await prisma.expense.update({
      where: {
        id: Number(req.params.id),
      },
      data: req.body,
    });

    res.json({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await prisma.expense.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    res.json({
      success: true,
      message: "Expense Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
