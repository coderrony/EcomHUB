'use client';

import useAddToCart from '@/hook/useAddToCart';
import useToastHook from '@/hook/useToastHook';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from '../common/Spinner';
import { Button } from '../ui/button';
import useAuthInfo from '@/hook/useAuthInfo';

function CheckoutOrder({ shipping, setIsShipping }) {
  const auth = useAuthInfo();
  const [myCart, setMyCart] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false); // For loading spinner when downloading PDF
  const [downloadPDF, setDownloadPDF] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { cart } = useAddToCart();
  const router = useRouter();
  const showToast = useToastHook();

  const totalAmount = cart.reduce((sum, item) => sum + item.amount, 0) + 120; // Delivery charge
  const subTotal = cart.reduce((sum, item) => sum + item.amount, 0);

  useEffect(() => {
    if (cart.length > 0) {
      setMyCart(cart);
    } else {
      setMyCart([]);
    }
  }, [cart]);



  const handleOrder = async () => {
    setLoading(true);
    if (shipping) {
      try {
        const res = await fetch('/api/place-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            orders: myCart,
            userId: auth.id,
            totalAmount: totalAmount,
            email: auth.email,
            mobile: auth.mobile.number,
          }),
        });

        const responseData = await res.json();


        if (responseData.status === 400) {
          setMessage(responseData?.message);
          showToast({
            variant: 'toastDanger',
            title: 'Order Declined',
            description:
              'Please remove the unavailable product(s) from the cart.',
          });
        } else if (responseData.status === 200) {
          showToast({
            variant: 'toastSuccess',
            title: 'Order Confirmed',
            description: 'Your order has been placed successfully!',
          });
          setOrderId(responseData.orderId);
          setDownloadPDF(true);
        } else {
          showToast({
            variant: 'toastDanger',
            title: 'Error Processing Order',
            description: responseData?.message,
          });
        }
      } catch (error) {
        showToast({
          variant: 'toastDanger',
          title: 'Server Error',
          description:
            'An error occurred while placing the order. Please try again later.',
        });
      }
    } else {
      showToast({
        variant: 'toastDanger',
        title: 'Shipping Address Unverified!',
        description: 'Please add shipping details.',
      });
      setIsShipping(true);
    }
    setLoading(false);
  };

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      if (orderId !== null) {
        const res = await fetch(`/api/pdf-generator/${orderId}`, {
          method: 'GET',
        });

        if (res.ok) {
          const blob = await res.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'invoice.pdf';
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          showToast({
            variant: 'toastDanger',
            title: 'Download Failed',
            description:
              'Failed to generate the PDF invoice. Please try again.',
          });
        }
      }
    } catch (error) {
      showToast({
        variant: 'toastDanger',
        title: 'Error',
        description:
          'An error occurred while downloading the invoice. Please try again later.',
      });
    }
    setPdfLoading(false);
  };

  const render = () => {
    return myCart.map(item => {
      const unavailableProduct = message?.find(v => v.id === item.id) || false;

      return (
        <>
          <div className='flex justify-between' key={item.id}>
            <div>
              <h5
                className={`${
                  unavailableProduct ? 'text-red-500' : 'text-gray-800'
                } font-medium`}>
                {item.productName}
              </h5>
              <p
                className={`text-sm ${
                  unavailableProduct ? 'text-red-500' : 'text-gray-600'
                }`}>
                Price: ${item.price}
              </p>
            </div>
            <p
              className={`${
                unavailableProduct ? 'text-red-500' : 'text-gray-600'
              }`}>
              x{item.quantity}
            </p>
            <p
              className={`${
                unavailableProduct ? 'text-red-500' : 'text-gray-800'
              } font-medium`}>
              ${item.amount}
            </p>
            {unavailableProduct && (
              <p className='text-xs text-red-600'>{unavailableProduct?.msg}</p>
            )}
          </div>
        </>
      );
    });
  };

  return (
    <div className='border border-gray-200 p-4 rounded'>
      <h4 className='text-gray-800 text-lg mb-4 font-medium uppercase'>
        Order Summary
      </h4>
      {myCart.length > 0 ? (
        <div>
          <div className='space-y-2'>{render()}</div>

          <div className='flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase'>
            <p>Subtotal</p>
            <p>${parseFloat(subTotal.toFixed(2))}</p>
          </div>

          <div className='flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercase'>
            <p>Shipping</p>
            <p>$120</p>
          </div>

          <div className='flex justify-between text-gray-800 font-medium py-3 uppercase'>
            <p className='font-semibold'>Total</p>
            <p>${parseFloat(totalAmount.toFixed(2))}</p>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading}
            className={`block w-full py-3 px-4 text-center text-white ${
              loading ? 'bg-slate-500' : 'bg-primary'
            } border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium`}>
            {loading ? <Spinner /> : 'Place Order'}
          </button>

          {downloadPDF && (
            <Button
              variant='outline'
              onClick={handleDownloadPDF}
              className='w-full mt-4 p-6 bg-zinc-500 text-zinc-50'
              disabled={pdfLoading}>
              {pdfLoading ? <Spinner /> : 'Download Invoice'}
            </Button>
          )}
        </div>
      ) : (
        <div className='max-w-md mx-auto text-center p-10'>
          <h1 className='text-2xl text-zinc-500'>No Order Selected</h1>
          <button
            className='p-3 text-xs text-white bg-primary max-w-sm mt-2'
            onClick={() => router.push('/shop')}>
            Add Product
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckoutOrder;
