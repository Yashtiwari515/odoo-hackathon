import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const emptyForm = { vehicleNo: "", model: "", type: "", capacity: "", status: "Available" };

export default function VehicleForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Registration No" name="vehicleNo" value={form.vehicleNo} onChange={handleChange} required />
      <Input label="Model" name="model" value={form.model} onChange={handleChange} required />
      <Input label="Type" name="type" value={form.type} onChange={handleChange} required />
      <Input label="Max Capacity (kg)" name="capacity" type="number" value={form.capacity} onChange={handleChange} />

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
        >
          <option value="Available">Available</option>
          <option value="On Trip">On Trip</option>
          <option value="In Shop">In Shop</option>
          <option value="Retired">Retired</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}