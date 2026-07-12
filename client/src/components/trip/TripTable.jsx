const statusColors = {
  ACTIVE: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function TripTable({ trips, onEdit, onDelete }) {
  if (!trips.length) {
    return <p className="text-gray-500 text-sm mt-4">No trips created yet.</p>;
  }

  return (
    <table className="w-full text-sm border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Vehicle</th>
          <th className="p-2 text-left">Driver</th>
          <th className="p-2 text-left">Route</th>
          <th className="p-2 text-left">Distance</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {trips.map((t) => (
          <tr key={t.id} className="border-t">
            <td className="p-2">{t.vehicle?.vehicleNo || "-"}</td>
            <td className="p-2">{t.driver?.name || "-"}</td>
            <td className="p-2">{t.source} → {t.destination}</td>
            <td className="p-2">{t.distance} km</td>
            <td className="p-2">
              <span className={`px-2 py-1 rounded-full text-xs ${statusColors[t.status] || "bg-gray-100 text-gray-700"}`}>
                {t.status}
              </span>
            </td>
            <td className="p-2 flex gap-2">
              <button onClick={() => onEdit(t)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(t.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
