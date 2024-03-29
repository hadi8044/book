import { useContext, useState } from "react";
import CartContext from "../../Context/CartContext";
import AdminTable from "../../components/Admin/AdminTable";
import addCommasToNumber from "../../utils/AddCommasToNumber";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import DeleteFromCartBtn from "../../components/DeleteFromCartBtn/DeleteFromCartBtn";
import { Toaster } from "react-hot-toast";

function Cart() {
  const { cart } = useContext(CartContext);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const columns = [
    {
      Header: "تصویر",
      accessor: "col1",
    },
    {
      Header: "کالا",
      accessor: "col2",
    },
    {
      Header: "قیمت (تومان)",
      accessor: "col3",
    },
    {
      Header: "تعداد",
      accessor: "col4",
    },
    {
      Header: "",
      accessor: "col5",
    },
  ];

  const slicedData = cart.slice(startIndex, endIndex);
  const data = slicedData.map((item) => ({
    col1: (
      <img
        className="w-7 h-[41.44px]"
        src={`https://clean-bat-cape.cyclic.app/images/products/images/${item.image}`}
        alt="product-image"
      />
    ),
    col2: (
      <Link
        to={`/product/${item.productId}`}
        className="text-blue-700 hover:underline">
        {item.name}
      </Link>
    ),
    col3: addCommasToNumber(item.price/10),
    col4: item.count,
    col5: <DeleteFromCartBtn productID={item.productId} />,
  }));
  return (
    <div className="flex flex-col gap-10 w-full h-[80vh] justify-center items-center">
      <div className="w-3/5 flex flex-col gap-6">
        <div className="w-full flex justify-between">
          <span className="text-2xl font-[rokh-bold]">سبد خرید</span>
        </div>
        <AdminTable columns={columns} data={data} />
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(cart.length / 4)}
          setPage={setPage}
        />
      </div>
      {cart.length > 0 && (
        <div className="w-3/5 flex items-center justify-between">
          <p className="">
            جمع:{" "}
            <span className="text-lg font-[sans-semibold]">
              {addCommasToNumber(
                cart.reduce((prev, curr) => prev + curr.price * curr.count, 0)/10
              )}{" "}
              تومان
            </span>
          </p>
          <Link
            to={"/shipping"}
            className="w-fit flex items-center gap-2 bg-[#4B429F] text-white hover:bg-[#E5D1FA] hover:text-black px-4 py-2 rounded-lg ">
            نهایی کردن خرید
          </Link>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default Cart;
