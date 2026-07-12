import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { getVehicles } from "../../api/vehicleApi";

const emptyForm = { category: "", amount: "", description: "", date: "", vehicleId: "" };

export default function ExpenseForm({ initialData, onSubmit, onCancel }) {
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
    onSubmit({ ...form, vehicleId: form.vehicleId || null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Category (e.g. Toll)" name="category" value={form.category} onChange={handleChange} required />
      <Input label="Amount" name="amount" type="number" value={form.amount} onChange={handleChange} required />
      <Input label="Description" name="description" value={form.description} onChange={handleChange} />
      <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />

      <div className="mb-3">
        <label className="text-sm font-medium text-gray-700">Vehicle (optional)</label>
        <select
          name="vehicleId"
          value={form.vehicleId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
        >
          <option value="">-- none --</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>{v.vehicleNo} ({v.model})</option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}