import { CreateProduct } from '@/components/CreateProduct';
import { Spinner } from '@/components/Spinner';
import { useGetAllProductsQuery, Product } from '@/graphql/generated/graphql';
import moment from 'moment';
import { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const Products = () => {
  const { data, loading, error } = useGetAllProductsQuery();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              {data && data?.getAllProducts?.__typename === 'Products' && (
                <div className="text-center self-center max-w-2xl mx-auto w-[90%] h-fit">
                  <h2 className="pb-8 font-bold text-xl flex items-center justify-evenly">
                    Products (starters, main courses, dessert and drinks){' '}
                    <Link
                      to="/products/create"
                      className="text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </h2>
                  <div className="relative overflow-x-auto shadow-md rounded-lg custom-scrollbar">
                    <table className="w-full text-sm text-left text-gray-500">
                      <thead className="text-xs text-white uppercase bg-primary-500">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            created At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.getAllProducts?.entities.map((product: Product) => (
                          <tr key={product?._id} className="bg-white border-b hover:bg-gray-50 ">
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                            >
                              {product?.name}
                            </th>
                            <td className="px-6 py-4">{product?.category}</td>
                            <td className="px-6 py-4">{product?.price}</td>
                            <td className="px-6 py-4">{moment(product?.createdAt).format('YYYY-MM-DD, h:mm a')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {data && data?.getAllProducts?.__typename === 'ProductNotFound' && (
                <div className="flex flex-col justify-center items-center h-full mx-auto self-center">
                  <h2 className="pb-8 font-bold text-xl flex items-center justify-evenly">
                    Oops! No products available currently!
                    <Link
                      to="/products/create"
                      className="text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </h2>
                 
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
          }
        />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </>
  );
};

export default Products;
