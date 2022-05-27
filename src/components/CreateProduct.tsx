import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateProductMutation } from '@/graphql/generated/graphql';
import { useEffect, useState } from 'react';
// @ts-ignore
import { storage } from '../firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

interface CreateProductFormInputs {
  name: string;
  category: string;
  description: string;
  images: Array<string>;
  price: number;
}

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  category: yup.string().trim().required(),
  description: yup.string().trim().required(),
  images: yup.array().of(yup.string().trim().required()),
  price: yup.number().required(),
});

export const CreateProduct = () => {
  const [imageUpload, setImageUpload] = useState<any>(null);
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);

  const [createProductMutation, { loading }] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateProductFormInputs> = async (formInputData) => {
    if (imageUrls.length === 0) return;
    formInputData.images = imageUrls;
    try {
      const response = await createProductMutation({
        variables: {
          input: formInputData,
        },
      });
      if (response && response?.data?.createProduct.__typename === 'ProductCreated') {
        console.log(response?.data.createProduct.message);
      } else if (response && response?.data?.createProduct.__typename === 'ProductNotFound') {
        console.log(response?.data.createProduct.message);
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const uploadImage = async (e: any) => {
    if (imageUpload == null) return;
    console.log(imageUpload);
    // imageUpload.forEach((file: any) => {
    for (const file of imageUpload) {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file, file.type).then(() => {
        console.log(`${file.name} uploaded`);
        getDownloadURL(imageRef).then((url) => {
          console.log(url);
          setImageUrls((prev) => [...prev, url]);
        });
      });
    }
    // setImageUpload(null);
  };

  useEffect(() => {
    console.log(imageUrls);
  }, [imageUrls]);

  return (
    <div className="grid grid-cols-2 gap-6 container max-w-2xl mx-auto my-12 overflow-hidden self-center">
      <form className="overflow-auto custom-scrollbar " onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-xl py-3">- Product Details:</h2>

        <div className="grid grid-cols-1 gap-4">
          <label className="text-lg font-medium text-gray-700 select-none">Name</label>
          <input className="input-primary" type="text" {...register('name')} />
          <p className="text-lg font-medium select-none text-primary-500">{errors.name?.message}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label className="text-lg font-medium text-gray-700 select-none">Category</label>
          <input className="input-primary" type="text" {...register('category')} />
          <p className="text-lg font-medium select-none text-primary-500">{errors.category?.message}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label className="text-lg font-medium text-gray-700 select-none">Description</label>
          <input className="input-primary" type="text" {...register('description')} />
          <p className="text-lg font-medium select-none text-primary-500">{errors.description?.message}</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <label className="text-lg font-medium text-gray-700 select-none">Price</label>
          <input className="input-primary" type="number" {...register('price')} />
          <p className="text-lg font-medium select-none text-primary-500">{errors.price?.message}</p>
        </div>

        <div className="flex justify-end">
          <button className="w-full py-3 mt-4 text-lg select-none btn-primary">Submit</button>
        </div>
      </form>
      <div>
        <h2 className="font-bold text-xl py-3">- Product Images:</h2>

        <div className="flex flex-col justify-center items-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col justify-center items-center w-full h-46 bg-gray-50 rounded-t-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">WEBP, PNG, JPG.</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              multiple
              onChange={(e: any) => {
                setImageUpload(e.target.files);
              }}
              className="hidden"
            />
          </label>
          <button
            type="button"
            className="bg-primary-500 rounded-b-lg font-bold text-white w-full py-3 hover:bg-primary-600"
            onClick={uploadImage}
          >
            Upload images
          </button>
        </div>
        <div className="grid grid-cols-2 grid-flow-row gap-2 mt-2 h-[310px] custom-scrollbar overflow-y-auto">
          {Array.isArray(imageUrls) &&
            imageUrls.length > 0 &&
            imageUrls.map((url: string) => (
              <img
                src={url}
                alt="product"
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              />
            ))}
        </div>
      </div>
    </div>
  );
};
