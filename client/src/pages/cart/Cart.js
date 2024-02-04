import {  useEffect } from "react";
import { UseCartContext } from "../../hooks/UseCartContext";
import { Link } from "react-router-dom";
import noItem from '../../assets/images/noItem.jpg'

function Cart() {
  const { cartItems , removeFromCart } = UseCartContext();
  const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="bg-white pt-10 pb-10">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div class="rounded-lg md:w-2/3">
        {cartItems.length === 0 ? (
            <img src={noItem}  className="w-64 h-64 object-cover rounded-md" alt="Empty Cart" />
          ) : (
            cartItems.map((item, id) => (
            <div key={id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img
                 src={item.image}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                 
                    <p className="w-8 bg-white text-center text-xs outline-none">
                      <span className="mt-30 text-lg">{item.quantity}</span>
                    </p>
                    <button onClick={() => removeFromCart(item.id)}>
                      <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                       </svg>
                      </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">Ksh {item.quantity * item.price}</p>
                  </div>
                </div>
              </div>
            </div>
           ))
         )}
        </div>

         {cartItems.length >= 1 && (
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                {cartItems.map((item, id) => (
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">{item.name}</p>
                    <p className="text-gray-700">{item.quantity * item.price}</p>
                  </div>
                ))}

              <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">Ksh {totalPrice}</p>
                  </div>
                </div>

                <Link to='/checkout'>
                  <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"> Check out</button>
                </Link>

                <Link to='/single-collection'>
                  <div className="flex items-center mt-5">
                    <span className="text-md underline  font-medium text-blue-500">Continue Shopping</span>
                  </div>
                </Link>
              </div>
          )}
      </div>
    </div>
  );
}

export default Cart;