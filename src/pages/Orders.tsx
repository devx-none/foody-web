import { Spinner } from '@/components/Spinner';
import { Order, Product, useGetAllOrdersQuery } from '@/graphql/generated/graphql';

const Orders = () => {
  const { data, loading, error } = useGetAllOrdersQuery();

  return (
    <>
      {data && Array.isArray(data) && data.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[90%] custom-scrollbar">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-primary-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
                <th scope="col" className="px-6 py-3">
                  Menus
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((order: Order) => (
                <tr key={order?._id} className="bg-white border-b hover:bg-gray-50 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {order?.user?.firstname} {order?.user?.lastname}
                  </th>
                  <td className="px-6 py-4">
                    {order?.products &&
                      order?.products.length > 0 &&
                      order?.products.map((product: any) => <span key={product?._id}>{product?.name}</span>)}
                  </td>
                  <td className="px-6 py-4">
                    {order?.menus &&
                      order?.menus.length > 0 &&
                      order?.menus.map((menu: any) => <span key={menu?._id}>{menu?.name}</span>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full mx-auto self-center">
          <h2 className="pb-8 font-bold text-xl">Oops! No orders available currently!</h2>
          <img className="rounded-lg shadow-md" src="images/no_products.webp" alt="No orders available illustration" />
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

export default Orders;
