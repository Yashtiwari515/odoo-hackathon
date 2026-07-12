import { useEffect, useState } from "react";
import { getFuelLogs, createFuelLog, updateFuelLog, deleteFuelLog } from "../api/fuelApi";
import FuelTable from "../components/fuel/FuelTable";
import FuelForm from "../components/fuel/FuelForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

export default function Fuel() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLog, setEditingLog] = useState(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await getFuelLogs();
      setLogs(res.data);
    } catch (err) {
      toast.error("Failed to load fuel logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleAdd = () => {
    setEditingLog(null);
    setShowModal(true);
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this fuel log?")) return;
    try {
      await deleteFuelLog(id);
      toast.success("Log deleted");
      fetchLogs();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingLog) {
        await updateFuelLog(editingLog.id, data);
        toast.success("Log updated");
      } else {
        await createFuelLog(data);
        toast.success("Log added");
      }
      setShowModal(false);
      fetchLogs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Fuel Logs</h1>
        <Button onClick={handleAdd}>+ Add Log</Button>
      </div>

      {loading ? <Loader /> : (
        <FuelTable logs={logs} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingLog ? "Edit Log" : "Add Log"}>
        <FuelForm
          initialData={editingLog}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
