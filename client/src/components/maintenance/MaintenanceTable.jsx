export default function MaintenanceTable({ records, onEdit, onDelete }) {
  if (!records.length) {
    return <p className="text-gray-500 text-sm mt-4">No maintenance records found.</p>;
  }

  return (
    <table className="w-full text-sm border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Vehicle</th>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Cost</th>
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.map((m) => (
          <tr key={m.id} className="border-t">
            <td className="p-2">{m.vehicle?.vehicleNo || "-"}</td>
            <td className="p-2">{m.type}</td>
            <td className="p-2">₹{m.cost}</td>
            <td className="p-2">{new Date(m.date).toLocaleDateString()}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded-full text-xs ${m.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {m.status}
              </span>
            </td>
            <td className="p-2 flex gap-2">
              <button onClick={() => onEdit(m)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(m.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
