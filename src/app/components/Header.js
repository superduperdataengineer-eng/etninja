'use client';

import { useState } from "react";
import {useSession} from "next-auth/react";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { data: session } = useSession();

  const paymentOptions = [
    { name: "PayPal", id: "paypal" },
    { name: "Stripe (Credit/Debit + PIX)", id: "stripe" },
    // { name: "Western Union / MoneyGram", id: "western" },
    // { name: "Other Payment Methods", id: "other" },
  ];

  const handlePaymentClick = (id) => {
    setSelectedPayment(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  return (
    <>
      <div style={{
        background: "linear-gradient(90deg, #2cff02ff, #17ae0cff, #0ba32cff)",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "1rem"
      }}>
        <div>Exclusive Membership: $5/month</div>
        {session ? (
            <button 
                onClick={() => setShowModal(true)} 
                style={{
                    background: "#65f300ff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}>
                Get Membership
            </button>) :
            (<p style={{ color: "red", fontWeight: "bold" }}>Please sign in to subscribe.</p>)
        }
        
      </div>

      {showModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000
        }}>
          <div style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "16px",
            width: "90%",
            maxWidth: "500px",
            textAlign: "center",
            position: "relative"
          }}>
            <h2>Choose Payment Method</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
              {paymentOptions.map(option => (
                <button 
                  key={option.id} 
                  onClick={() => handlePaymentClick(option.id)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    background: selectedPayment === option.id ? "#f3c200" : "#fff",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {option.name}
                </button>
              ))}
            </div>

            {selectedPayment && (
              <div style={{ marginTop: "20px", textAlign: "left" }}>
                {selectedPayment === "paypal" && (
                  <p>Pay securely via PayPal. You will be redirected to PayPal to complete your subscription.</p>
                )}
                {selectedPayment === "stripe" && (
                  <p>Enter your credit/debit card details or pay instantly using PIX (Brazil). Stripe handles everything securely.</p>
                )}
                {selectedPayment === "western" && (
                  <p>Instructions for Western Union / MoneyGram payment will be emailed to you after clicking confirm.</p>
                )}
                {selectedPayment === "other" && (
                  <p>Contact us for alternative payment methods.</p>
                )}
                {/* <button
                  onClick={() => alert("Proceeding with " + selectedPayment)}
                  style={{
                    marginTop: "10px",
                    background: "#f3c200",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Confirm Payment Method
                </button> */}

                <button
                onClick={async () => {
                    if (!session) {
                    alert("Please sign in first.");
                    return;
                    }

                    try {
                    const res = await fetch("/api/create-subscription", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                        paymentMethod: selectedPayment,
                        email: session.user.email, // identifying user
                        }),
                    });

                    const data = await res.json();

                    if (res.ok && data.url) {
                        // Redirect to Stripe or PayPal checkout
                        window.location.href = data.url;
                    } else {
                        alert(data.error || "Error creating subscription.");
                    }
                    } catch (err) {
                    console.error(err);
                    alert("An unexpected error occurred.");
                    }
                }}
                style={{
                    marginTop: "10px",
                    background: "#f3c200",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
                >
                Confirm Payment Method
                </button>
              </div>
            )}

            <button 
              onClick={handleClose} 
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "1.2rem",
                cursor: "pointer"
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
