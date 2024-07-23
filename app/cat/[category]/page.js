/* eslint-disable react-hooks/exhaustive-deps */
'use server'
import ProductItem from "@/Components/ProductItem";
import prisma from "@/lib/prisma";
// import { MongoClient } from "mongodb";






const CategoryProds = async ({ params }) => {
  const category = params.category;
  // const client = new MongoClient(vars.mongoUri)
  // const db = client.db("pandeyIndustries")
  // const collection = db.collection("products")
  // const prods = await collection.find({category: category}).toArray();
  // await client.close()
  const prods = await prisma.products.findMany({where: {category: category}})
  return (
    <section className="text-gray-600 body-font dark:bg-gray-900">
      <p className="text-center font-bold text-4xl md:text-6xl lg:text-8xl font-mono italic dark:text-white text-black my-12 -mb-4">
        {category === "fashion" ? "Latest Fashion Eve..." : "It Must Be Handy..."}
      </p>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4 space-y-2 space-x-4 justify-center px-4">
          {prods.map((prod) => {
            return (
              <ProductItem
                key={prod.id}
                image={`${prod.image}`}
                name={prod.name}
                category={prod.category}
                price={prod.price}
                slug={prod.slug}
              />
            );
          })}
        </div>
      </div>
    </section>
    // <></>
  );
};

export default CategoryProds;
