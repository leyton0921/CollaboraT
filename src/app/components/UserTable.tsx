import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const UserTable = () => {
  const users = useSelector((state: RootState) => state.users.users);
  console.log(users)

  return (
    <div className="bg-purple-50 p-4 rounded-lg shadow-md">
    <table className="w-full table-auto">
      <thead>
        <tr className="text-left">
          <th className="py-2 pl-4">Name</th>
          <th className="py-2">rol</th>
          <th className="py-2">Assign Task</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index} className="bg-white border-b">
            <td className="flex items-center space-x-4 py-4 pl-4">
              <span className="h-8 w-8 bg-purple-300 rounded-full flex items-center justify-center text-white font-bold">{user.name.charAt(0).toUpperCase()}</span>
              <span>{user.name}</span>
            </td>

            <td className="py-4">{user.role || 'No role assigned'}</td>

            <td className="py-4 text-center">
              <input type="checkbox" className="h-5 w-5 text-green-600 rounded-md" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default UserTable;
