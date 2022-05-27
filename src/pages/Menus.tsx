import { Spinner } from '@/components/Spinner';
import { useGetAllMenusQuery, Menu, Product } from '@/graphql/generated/graphql';

const Menus = () => {
  const { data, loading, error } = useGetAllMenusQuery();

  return (
    <>
      {data && Array.isArray(data) && data.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[90%] custom-scrollbar">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-primary-500">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Products
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((product: Menu) => (
                <tr key={product?._id} className="bg-white border-b hover:bg-gray-50 ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {product?.name}
                  </th>
                  <td className="px-6 py-4">
                    {/* {product?.products?.map((product: Product) => (
                      <div key={product?._id} className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5">
                          <span className="inline-block h-5 w-5 rounded-full bg-gray-100"></span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm">{product?.name}</div>
                          <div className="text-xs text-gray-500">{product?.description}</div>
                        </div>
                      </div>
                    ))} */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full mx-auto self-center">
          <h2 className="pb-8 font-bold text-xl">Oops! No menus available currently!</h2>
          <img className="rounded-lg shadow-md" src="images/no_products.webp" alt="No menus available illustration" />
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

export default Menus;
