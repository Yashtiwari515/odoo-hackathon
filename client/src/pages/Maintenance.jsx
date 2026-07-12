import { useEffect, useState } from "react";
import { getMaintenances, createMaintenance, updateMaintenance, deleteMaintenance } from "../api/maintenanceApi";
import MaintenanceTable from "../components/maintenance/MaintenanceTable";
import MaintenanceForm from "../components/maintenance/MaintenanceForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

export default function Maintenance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await getMaintenances();
      setRecords(res.data);
    } catch (err) {
      toast.error("Failed to load maintenance records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleAdd = () => {
    setEditingRecord(null);
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this record?")) return;
    try {
      await deleteMaintenance(id);
      toast.success("Record deleted");
      fetchRecords();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingRecord) {
        await updateMaintenance(editingRecord.id, data);
        toast.success("Record updated");
      } else {
        await createMaintenance(data);
        toast.success("Record added");
      }
      setShowModal(false);
      fetchRecords();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Maintenance</h1>
        <Button onClick={handleAdd}>+ Add Record</Button>
      </div>

      {loading ? <Loader /> : (
        <MaintenanceTable records={records} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingRecord ? "Edit Record" : "Add Record"}>
        <MaintenanceForm
          initialData={editingRecord}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
