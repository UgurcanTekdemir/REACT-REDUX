import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import Button from "../components/Button";
import { modalToggle } from "../redux/modalSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  let loc = location?.search.split("=")[1];
  useEffect(() => {
    if (loc) {
      setProductInfo(data.find((dt) => dt.id == loc));
    }
  }, [loc]);

  // console.log(location?.search.split("=")[1], "data");
  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalToggle()); // Close the modal after creating the product
  };
  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: loc }));
    dispatch(modalToggle());
    navigate("/");
  };
  const contentModal = (
    <>
      <input
        value={productInfo.name}
        type="text"
        placeholder="Ürün ekle"
        name="name"
        id="name"
        onChange={(e) => onChangeFunc(e, "name")}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        value={productInfo.price}
        type="text"
        placeholder="Fiyat ekle"
        name="price"
        id="price"
        onChange={(e) => onChangeFunc(e, "price")}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        placeholder="Resim Seç"
        name="url"
        id="url"
        onChange={(e) => onChangeFunc(e, "url")}
        className="w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <Button
        btnText={loc ? "Ürün güncelle" : "Ürün oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );
  const filteredItems = data?.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );

  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Ürün güncelle" : "Ürün oluştur"}
          btnText="Kapat"
          btnFunc={() => dispatch(modalToggle())}
          onClose={() => dispatch(modalToggle())}
        />
      )}
    </div>
  );
};

export default Product;
