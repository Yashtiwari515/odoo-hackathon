import MainLayout from "../layouts/MainLayout";

function Profile() {
  return (
    <MainLayout>
      <div className="bg-white rounded-xl shadow p-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            A
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Admin User</h2>
            <p className="text-gray-500">admin@example.com</p>
            <p className="text-gray-500">Role : Administrator</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">
          <div>
            <label className="text-gray-500 text-sm">Full Name</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              value="Admin User"
              readOnly
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm">Email</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              value="admin@example.com"
              readOnly
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm">Role</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              value="Administrator"
              readOnly
            />
          </div>

          <div>
            <label className="text-gray-500 text-sm">Phone</label>

            <input
              className="w-full border rounded-lg p-3 mt-2"
              value="+91 9876543210"
              readOnly
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Profile;