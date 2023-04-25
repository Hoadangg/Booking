import React, { useState } from "react";
import "./App_paypal.css";
import PayPal from "./components/PayPal";

function App_paypal(props) {
  const [checkout, setCheckOut] = useState(false);

  return (
    <div className="App_paypal">
      {checkout ? (
        <PayPal price={props.price} />
      ) : (
        <button
          className="App_paypal_button"
          onClick={() => {
            // props.handlClick();
            props.handleClick();
            setCheckOut(!checkout);
          }}
        >
          PayPal
        </button>
      )}
    </div>
  );
}

export default App_paypal;
