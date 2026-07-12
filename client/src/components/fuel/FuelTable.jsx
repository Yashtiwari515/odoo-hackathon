export default function FuelTable({ logs, onEdit, onDelete }) {
  if (!logs.length) {
    return <p className="text-gray-500 text-sm mt-4">No fuel logs found.</p>;
  }

  return (
    <table className="w-full text-sm border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Vehicle</th>
          <th className="p-2 text-left">Liters</th>
          <th className="p-2 text-left">Price/L</th>
          <th className="p-2 text-left">Total Cost</th>
          <th className="p-2 text-left">Odometer</th>
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((f) => (
          <tr key={f.id} className="border-t">
            <td className="p-2">{f.vehicle?.vehicleNo || "-"}</td>
            <td className="p-2">{f.liters} L</td>
            <td className="p-2">₹{f.pricePerLiter}</td>
            <td className="p-2">₹{f.totalCost}</td>
            <td className="p-2">{f.odometer}</td>
            <td className="p-2">{new Date(f.date).toLocaleDateString()}</td>
            <td className="p-2 flex gap-2">
              <button onClick={() => onEdit(f)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(f.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
