import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { getVehicles } from "../../api/vehicleApi";
import { getDrivers } from "../../api/driverApi";

const emptyForm = {
  vehicleId: "",
  driverId: "",
  source: "",
  destination: "",
  distance: "",
  startTime: "",
  endTime: "",
  status: "ACTIVE",
};

export default function TripForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // dropdown ke liye vehicles/drivers laa rahe hain
    getVehicles().then((res) => setVehicles(res.data)).catch(() => setVehicles([]));
    getDrivers().then((res) => setDrivers(res.data)).catch(() => setDrivers([]));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        startTime: initialData.startTime?.slice(0, 16) || "",
        endTime: initialData.endTime?.slice(0, 16) || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  // sirf available vehicle/driver hi dispatch pool mein dikhne chahiye
  const availableVehicles = vehicles.filter(
    (v) => v.status === "Available" || v.id === Number(form.vehicleId)
  );
  const availableDrivers = drivers.filter(
    (d) => d.status === "Available" || d.id === Number(form.driverId)
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Vehicle</label>
        <select
          name="vehicleId"
          value={form.vehicleId}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
        >
          <option value="">-- select vehicle --</option>
          {availableVehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.vehicleNo} ({v.model})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Driver</label>
        <select
          name="driverId"
          value={form.driverId}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
        >
          <option value="">-- select driver --</option>
          {availableDrivers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      <Input label="Source" name="source" value={form.source} onChange={handleChange} required />
      <Input label="Destination" name="destination" value={form.destination} onChange={handleChange} required />
      <Input label="Distance (km)" name="distance" type="number" value={form.distance} onChange={handleChange} required />
      <Input label="Start Time" name="startTime" type="datetime-local" value={form.startTime} onChange={handleChange} required />
      <Input label="End Time" name="endTime" type="datetime-local" value={form.endTime} onChange={handleChange} />

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
        >
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}