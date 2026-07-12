import { useEffect, useState } from "react";
import { getTrips, createTrip, updateTrip, deleteTrip } from "../api/tripApi";
import TripTable from "../components/trip/TripTable";
import TripForm from "../components/trip/TripForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import { toast } from "react-toastify";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const res = await getTrips();
      setTrips(res.data);
    } catch (err) {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleAdd = () => {
    setEditingTrip(null);
    setShowModal(true);
  };

  const handleEdit = (trip) => {
    setEditingTrip(trip);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this trip?")) return;
    try {
      await deleteTrip(id);
      toast.success("Trip deleted");
      fetchTrips();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingTrip) {
        await updateTrip(editingTrip.id, data);
        toast.success("Trip updated");
      } else {
        await createTrip(data);
        toast.success("Trip created");
      }
      setShowModal(false);
      fetchTrips();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Trips</h1>
        <Button onClick={handleAdd}>+ New Trip</Button>
      </div>

      {loading ? <Loader /> : (
        <TripTable trips={trips} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingTrip ? "Edit Trip" : "New Trip"}>
        <TripForm
          initialData={editingTrip}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
