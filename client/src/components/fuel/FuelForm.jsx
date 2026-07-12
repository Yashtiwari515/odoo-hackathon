import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { getVehicles } from "../../api/vehicleApi";

const emptyForm = { vehicleId: "", liters: "", pricePerLiter: "", odometer: "", date: "" };

export default function FuelForm({ initialData, onSubmit, onCancel }) {
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
    // totalCost backend khud calculate kare to best hai, lekin agar controller expect karta
    // hai to yahan bhi bhej dete hain taaki dono taraf se safe rahe
    const liters = Number(form.liters) || 0;
    const price = Number(form.pricePerLiter) || 0;
    onSubmit({ ...form, totalCost: liters * price });
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

      <Input label="Liters" name="liters" type="number" value={form.liters} onChange={handleChange} required />
      <Input label="Price per Liter" name="pricePerLiter" type="number" value={form.pricePerLiter} onChange={handleChange} required />
      <Input label="Odometer" name="odometer" type="number" value={form.odometer} onChange={handleChange} required />
      <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}