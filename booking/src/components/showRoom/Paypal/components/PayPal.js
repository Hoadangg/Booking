import React, { useRef, useEffect } from "react";
import App_showRoom from "../../App_showRoom";
import "./PayPay.css";

export default function Paypal(props) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                // description: "Cool looking table",
                amount: {
                //   currency_code: "USD",
                  value:parseInt(props.price),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
  //  <div className="paypal-item" ref={paypal}></div>
    <div className="paypal-contaiter">
      <button className="paypal-title">PayPal</button>
        <div className="paypal-item" ref={paypal}>
         
        </div>
    </div>
   
    
  );
}
