import { useState, useEffect } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const emptyForm = { name: "", phone: "", licenseNo: "", experience: "", status: "Available" };

export default function DriverForm({ initialData, onSubmit, onCancel }) {
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
      <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
      <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
      <Input label="License Number" name="licenseNo" value={form.licenseNo} onChange={handleChange} required />
      <Input label="Experience (years)" name="experience" type="number" value={form.experience} onChange={handleChange} />

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
          <option value="Off Duty">Off Duty</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}