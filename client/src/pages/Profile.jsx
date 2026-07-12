import { getUser } from "../utils/auth";

export default function Profile() {
  const user = getUser();

  if (!user) {
    return <p className="p-6 text-gray-500">No user data found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Profile</h1>
      <div className="bg-white border rounded-lg p-6 max-w-md">
        <div className="flex flex-col gap-3 text-sm">
          <div>
            <span className="text-gray-500">Name</span>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <span className="text-gray-500">Email</span>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <span className="text-gray-500">Role</span>
            <p className="font-medium">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}