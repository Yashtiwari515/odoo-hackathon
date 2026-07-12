import { useEffect, useState } from "react";
import { getDrivers, createDriver, updateDriver, deleteDriver } from "../api/driverApi";
import DriverTable from "../components/driver/DriverTable";
import DriverForm from "../components/driver/DriverForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const res = await getDrivers();
      setDrivers(res.data);
    } catch (err) {
      toast.error("Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleAdd = () => {
    setEditingDriver(null);
    setShowModal(true);
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this driver?")) return;
    try {
      await deleteDriver(id);
      toast.success("Driver deleted");
      fetchDrivers();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingDriver) {
        await updateDriver(editingDriver.id, data);
        toast.success("Driver updated");
      } else {
        await createDriver(data);
        toast.success("Driver added");
      }
      setShowModal(false);
      fetchDrivers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Drivers</h1>
        <Button onClick={handleAdd}>+ Add Driver</Button>
      </div>

      {loading ? <Loader /> : (
        <DriverTable drivers={drivers} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingDriver ? "Edit Driver" : "Add Driver"}>
        <DriverForm
          initialData={editingDriver}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
