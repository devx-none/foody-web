import { Spinner } from '@/components/Spinner';
import { useGetAllUsersQuery, User } from '@/graphql/generated/graphql';
import moment from 'moment';

const Users = () => {
  const { data, loading, error } = useGetAllUsersQuery();

  return (
    <>
      {data && data?.getAllUsers?.__typename === 'Users' && (
        <div className="text-center self-center max-w-2xl mx-auto w-[90%] h-fit">
          <h2 className="pb-8 font-bold text-xl flex items-center justify-evenly">
            Current customers
          </h2>
          <div className="relative overflow-x-auto shadow-md rounded-lg custom-scrollbar">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-white uppercase bg-primary-500">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Fidelity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.getAllUsers?.entities.map((user: User) => (
                  <tr key={user?._id} className="bg-white border-b hover:bg-gray-50 ">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {user?.firstname} {user?.lastname}
                    </th>
                    <td className="px-6 py-4">{user?.email}</td>
                    <td className="px-6 py-4">{user?.fidelity}</td>
                    <td className="px-6 py-4">{moment(user?.createdAt).format('YYYY-MM-DD, h:mm a')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {data && data?.getAllUsers?.__typename === 'UserNotFound' && (
        <div className="flex flex-col justify-center items-center h-full mx-auto self-center">
          <h2 className="pb-8 font-bold text-xl">Oops! No users available currently!</h2>
          <img
            className="rounded-lg shadow-md"
            src="images/no_users.webp"
            alt="No users available illustration"
          />
        </div>
      )}
      {loading && (
        <Spinner
          spinningColor="text-secondary-500"
          bgColor="fill-primary-500"
          size="24"
          classNames="grid place-content-center w-full h-screen"
        />
      )}
      {error && <p>Error</p>}
    </>
  );
};

export default Users;
