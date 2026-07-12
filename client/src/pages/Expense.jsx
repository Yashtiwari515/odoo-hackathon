import { useEffect, useState } from "react";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../api/expenseApi";
import ExpenseTable from "../components/expense/ExpenseTable";
import ExpenseForm from "../components/expense/ExpenseForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

export default function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await getExpenses();
      setExpenses(res.data);
    } catch (err) {
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAdd = () => {
    setEditingExpense(null);
    setShowModal(true);
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      toast.success("Expense deleted");
      fetchExpenses();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingExpense) {
        await updateExpense(editingExpense.id, data);
        toast.success("Expense updated");
      } else {
        await createExpense(data);
        toast.success("Expense added");
      }
      setShowModal(false);
      fetchExpenses();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Expenses</h1>
        <Button onClick={handleAdd}>+ Add Expense</Button>
      </div>

      {loading ? <Loader /> : (
        <ExpenseTable expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingExpense ? "Edit Expense" : "Add Expense"}>
        <ExpenseForm
          initialData={editingExpense}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
