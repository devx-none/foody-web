import { Card } from '@/components/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className='w-full'>
      <div className="h-full grid md:grid-cols-2 gap-4 p-3 place-content-center place-items-center mx-auto w-fit place">
        <Card
          link="/products"
          title="Products"
          description="Manage various products: starters, main courses, desserts and drinks."
          image="images/products.jpg"
          alt=""
        />
        <Card link="/menus" title="Menus" description="Available menus and offers." image="images/menus.jpg" alt="" />
        <Card
          link="/users"
          title="Customers"
          description="Check current customers"
          image="images/customers.jpg"
          alt=""
        />
        <Card
          link="/orders"
          title="Orders"
          description="All orders made by customers."
          image="images/orders.jpg"
          alt=""
        />
      </div>
    </section>
  );
};

export default Home;
