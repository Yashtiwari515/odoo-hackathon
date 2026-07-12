export default function VehicleTable({ vehicles, onEdit, onDelete }) {
  if (!vehicles.length) {
    return <p className="text-gray-500 text-sm mt-4">No vehicles added yet</p>;
  }

  return (
    <table className="w-full text-sm border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Reg No</th>
          <th className="p-2 text-left">Model</th>
          <th className="p-2 text-left">Type</th>
          <th className="p-2 text-left">Capacity</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((v) => (
          <tr key={v.id} className="border-t">
            <td className="p-2">{v.vehicleNo}</td>
            <td className="p-2">{v.model}</td>
            <td className="p-2">{v.type}</td>
            <td className="p-2">{v.capacity}</td>
            <td className="p-2">
              <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                {v.status}
              </span>
            </td>
            <td className="p-2 flex gap-2">
              <button onClick={() => onEdit(v)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(v.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
