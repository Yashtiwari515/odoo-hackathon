import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { getVehicles } from "../../api/vehicleApi";

const emptyForm = { vehicleId: "", type: "", description: "", cost: "", date: "", status: "PENDING" };

export default function MaintenanceForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getVehicles().then((res) => setVehicles(res.data)).catch(() => setVehicles([]));
  }, []);

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, date: initialData.date?.slice(0, 10) || "" });
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

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
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.vehicleNo} ({v.model})</option>
          ))}
        </select>
      </div>

      <Input label="Type (e.g. Oil Change)" name="type" value={form.type} onChange={handleChange} required />
      <Input label="Description" name="description" value={form.description} onChange={handleChange} required />
      <Input label="Cost" name="cost" type="number" value={form.cost} onChange={handleChange} required />
      <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
        >
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}