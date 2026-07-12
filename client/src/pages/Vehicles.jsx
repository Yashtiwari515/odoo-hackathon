import { useEffect, useState } from "react";
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from "../api/vehicleApi";
import VehicleTable from "../components/vehicle/VehicleTable";
import VehicleForm from "../components/vehicle/VehicleForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getVehicles();
      setVehicles(res.data);
    } catch (err) {
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAdd = () => {
    setEditingVehicle(null);
    setShowModal(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this vehicle?")) return;
    try {
      await deleteVehicle(id);
      toast.success("Vehicle deleted");
      fetchVehicles();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingVehicle) {
        await updateVehicle(editingVehicle.id, data);
        toast.success("Vehicle updated");
      } else {
        await createVehicle(data);
        toast.success("Vehicle added");
      }
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Vehicles</h1>
        <Button onClick={handleAdd}>+ Add Vehicle</Button>
      </div>

      {loading ? <Loader /> : (
        <VehicleTable vehicles={vehicles} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingVehicle ? "Edit Vehicle" : "Add Vehicle"}>
        <VehicleForm
          initialData={editingVehicle}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
