const statusColors = {
  Available: "bg-green-100 text-green-700",
  "On Trip": "bg-blue-100 text-blue-700",
  "Off Duty": "bg-gray-100 text-gray-700",
  Suspended: "bg-red-100 text-red-700",
};

export default function DriverTable({ drivers, onEdit, onDelete }) {
  if (!drivers.length) {
    return <p className="text-gray-500 text-sm mt-4">No drivers added yet.</p>;
  }

  return (
    <table className="w-full text-sm border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Phone</th>
          <th className="p-2 text-left">License No</th>
          <th className="p-2 text-left">Experience</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {drivers.map((d) => (
          <tr key={d.id} className="border-t">
            <td className="p-2">{d.name}</td>
            <td className="p-2">{d.phone}</td>
            <td className="p-2">{d.licenseNo}</td>
            <td className="p-2">{d.experience ? `${d.experience} yrs` : "-"}</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[d.status] || "bg-gray-100 text-gray-700"}`}>
                {d.status}
              </span>
            </td>
            <td className="p-2 flex gap-2">
              <button onClick={() => onEdit(d)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(d.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
