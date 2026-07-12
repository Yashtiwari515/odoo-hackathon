export default function ExpenseTable({ expenses, onEdit, onDelete }) {
  if (!expenses.length) {
    return <p className="text-gray-500 text-sm mt-4">No expense records found.</p>;
  }

  return (
    <table className="w-full text-sm border mt-4">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Category</th>
          <th className="p-2 text-left">Amount</th>
          <th className="p-2 text-left">Vehicle</th>
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((e) => (
          <tr key={e.id} className="border-t">
            <td className="p-2">{e.category}</td>
            <td className="p-2">₹{e.amount}</td>
            <td className="p-2">{e.vehicle?.vehicleNo || "-"}</td>
            <td className="p-2">{new Date(e.date).toLocaleDateString()}</td>
            <td className="p-2 flex gap-2">
              <button onClick={() => onEdit(e)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => onDelete(e.id)} className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
