import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { BiMessageSquareDetail } from "react-icons/bi";

const ShopDashboardSidebar = ({ active }) => {
  const sidebarItems = [
    { id: 1, icon: RxDashboard, label: "Dashboard", path: "/dashboard" },
    { id: 2, icon: FiShoppingBag, label: "All Orders", path: "/dashboard-orders" },
    { id: 3, icon: FiPackage, label: "All Products", path: "/dashboard-products" },
    { id: 4, icon: AiOutlineFolderAdd, label: "Create Product", path: "/dashboard-create-product" },
    { id: 5, icon: MdOutlineLocalOffer, label: "All Events", path: "/dashboard-events" },
    { id: 6, icon: VscNewFile, label: "Create Event", path: "/dashboard-create-event" },
    { id: 7, icon: CiMoneyBill, label: "Withdraw Money", path: "/dashboard-withdraw-money" },
    { id: 8, icon: BiMessageSquareDetail, label: "Shop Inbox", path: "/dashboard-messages" },
    { id: 9, icon: AiOutlineGift, label: "Discount Codes", path: "/dashboard-coupons" },
    { id: 10, icon: HiOutlineReceiptRefund, label: "Refunds", path: "/dashboard-refunds" },
    { id: 11, icon: CiSettings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-full h-[89vh] bg-gradient-to-b from-gray-50 via-white to-gray-100 shadow-lg overflow-y-auto sticky top-0 left-0 z-10 border-r border-gray-100">

      {/* Header */}
      <div className="p-6 border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-md">
            <FiShoppingBag className="text-white" size={22} />
          </div>

          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Seller Portal
            </h3>

            <p className="text-xs text-gray-500">
              Manage your shop
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Items */}
      <div className="py-4 px-2">

        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center
                px-5 py-3
                mx-2 mb-2
                rounded-xl
                transition-all duration-300
                group

                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-[1.02]"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900 hover:translate-x-1"
                }
              `}
            >
              <div
                className={`
                  p-2 rounded-lg transition-all duration-300
                  ${
                    isActive
                      ? "bg-white/20"
                      : "bg-gray-100 group-hover:bg-white"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={`
                    ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-blue-600"
                    }
                  `}
                />
              </div>

              <h5
                className={`
                  hidden 800px:block
                  pl-4 text-[15px] font-medium
                  ${
                    isActive
                      ? "text-white"
                      : "text-gray-700"
                  }
                `}
              >
                {item.label}
              </h5>
            </Link>
          );
        })}

      </div>
    </div>
  );
};

export default ShopDashboardSidebar;