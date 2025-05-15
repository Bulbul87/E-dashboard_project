
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Productlist() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteproduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Product List Container */}
      <div className="flex-grow container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center text-violet-900">
          Product List
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search product..."
            className="border border-violet-900 p-3 w-full max-w-lg rounded-md focus:outline-none focus:ring-2 focus:ring-violet-900"
            onChange={searchHandle}
          />
        </div>

        {/* Table Container with Scroll */}
        <div className="overflow-y-auto max-h-96 border border-gray-300 rounded-lg">
          <table className="w-full border-collapse bg-white">
            {/* Fixed Header */}
            <thead className="sticky top-0 bg-violet-900 text-white text-lg">
              <tr>
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

         
            <tbody>
              {products.length > 0 ? (
                products.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{item.name}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      ${item.price}
                    </td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3 flex gap-3">
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        onClick={() => deleteproduct(item._id)}
                      >
                        Delete
                      </button>
                      <Link
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                        to={"/update/" + item._id}
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 p-4 italic"
                  >
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Productlist;
