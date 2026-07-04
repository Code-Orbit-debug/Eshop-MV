import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
const AllCoupons = () => {
  const [name, setName] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [value, setValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [open, setOpen] = useState(false);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!seller?._id) return;
    axios
      .get(`${server}/coupon/get-coupon/${seller?._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setisLoading(false);
        console.log(res.data);
        setCoupons(res.data.couponCode);
      })
      .catch((error) => {
        setisLoading(false);
      });
  }, [seller?._id]);
  
  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Coupon code deleted succesfully!");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/create-coupun-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shop: seller,
          shopId: seller?._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + "%",
      });
    });
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <div className="w-full flex justify-end ">
            <div
              onClick={() => setOpen(true)}
              className={`${styles.button} !h-[45px] !rounded-[5px] !w-[180px] mr-3 px-3 mb-3`}
            >
              <span className="text-white">Create Coupon Code</span>
            </div>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000020] z-[2000] flex items-center justify-center p-4">
              <div className="w-full max-w-[500px] max-h-[90vh] p-6 rounded-lg bg-white shadow-lg relative flex flex-col">
                <div className="w-full flex justify-between items-center mb-4">
                  <h5 className="text-[24px] font-Poppins font-semibold text-gray-800">
                    Create Coupon Code
                  </h5>
                  <RxCross1
                    size={24}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                  />
                </div>
                {/* Create Coupon Code Form */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={name}
                        className="w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter coupon code name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Discount Percentage <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="value"
                        value={value}
                        required
                        min="0"
                        max="100"
                        className="w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter discount percentage"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Amount <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="minAmount"
                        value={minAmount}
                        min="0"
                        className="w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        onChange={(e) => setMinAmount(e.target.value)}
                        placeholder="Enter minimum order amount"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Amount <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="maxAmount"
                        value={maxAmount}
                        min="0"
                        className="w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        onChange={(e) => setMaxAmount(e.target.value)}
                        placeholder="Enter maximum discount amount"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Selected Products
                      </label>
                      <select
                        className="w-full px-3 h-[40px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                        value={selectedProducts}
                        onChange={(e) => setSelectedProducts(e.target.value)}
                      >
                        <option value="">Choose a product (optional)</option>
                        {products &&
                          products.map((i) => (
                            <option value={i.name} key={i.name}>
                              {i.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </form>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <input
                    type="submit"
                    value="Create Coupon"
                    className="w-full h-[45px] bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default AllCoupons;
