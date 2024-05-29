import React, { useState, useRef, useEffect,Component } from "react";
import "./InvoiceTemp.css";
import { RxLoop } from "react-icons/rx";
import { RiDownloadLine } from "react-icons/ri";
import ReactToPrint from "react-to-print";


        

function InvoiceTemp() {
  const [items, setItems] = useState([
    { description: "", quantity: 1, rate: 0 },
  ]);
  const [currency, setCurrency] = useState("USD");
  const [logoUrl, setLogoUrl] = useState("");
  const [logo, setLogo] = useState(null);
  const [inputMode, setInputMode] = useState("%");
  const [discounts, setDiscounts] = useState([]);
  const [showAddDiscountButton, setShowAddDiscountButton] = useState(true);
  const [shipping, setShipping] = useState([]);
  const [showAddShipping, setShowAddShippping] = useState(true);
  const [tax, setTax] = useState({ value: 0, type: "%" });
  const [subtotal, setSubtotal] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [balanceDue, setBalanceDue] = useState(0);

  const formRef = useRef();
  
  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, rate: 0 }]);
  };

  //addshiping
  const handleItemChange = (index, field, value) => {
    const newItems = items.slice();
    newItems[index][field] = value;
    setItems(newItems);
  };
  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  
  const handleLogoChange = (file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(file);
      setLogoUrl(url);
    }
  };

  const handleRemoveLogo = (e) => {
    e.preventDefault();
    setLogo(null);
    setLogoUrl('');
    document.getElementById('logo').value = '';
  };

  const toggleInputMode = () => {
    setInputMode((prevMode) => (prevMode === "%" ? "$" : "%"));
  };
  const addDiscount = () => {
    setDiscounts([...discounts, { value: "", type: "%" }]);
    setShowAddDiscountButton(false); // Hide the +dicount button after adding a discount
  };
  const addShipping = () => {
    setShipping([...shipping, { value: "" }]);
    setShowAddShippping(false); // Hide the +dicount button after adding a discount
  };
  const handleDiscountChange = (index, field, value) => {
    const newDiscounts = discounts.slice();
    newDiscounts[index][field] = value;
    setDiscounts(newDiscounts);
  };
  const handleShippingChange = (index, field, value) => {
    const newShipping = shipping.slice();
    newShipping[index][field] = value;
    setShipping(newShipping);
  };
  const toggleDiscountType = (index) => {
    const newDiscounts = discounts.slice();
    newDiscounts[index].type = newDiscounts[index].type === '%' ? '$' : '%';
    setDiscounts(newDiscounts);
  };
  const removeDiscount = (index) => {
    const newDiscounts = discounts.slice();
    newDiscounts.splice(index, 1);
    setDiscounts(newDiscounts);
    setShowAddDiscountButton(true); // Show the "+ Discount" button after removing a discount
  };
  const removeShipping = (index) => {
    const newShipping = [...shipping];
    newShipping.splice(index, 1);
    setShipping(newShipping);
    setShowAddShippping(true); // Show the "+ Shipping" button after removing a shipping
  };

  const calculateSubtotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.quantity * item.rate;
    });
    setSubtotal(total);
  };
  const toggleTaxType = () => {
    setTax((prevTax) => ({
      ...prevTax,
      type: prevTax.type === "%" ? "$" : "%",
    }));
  };

  const getTotal = () => {
    let total = subtotal;
    // Apply discounts
    discounts.forEach((discount) => {
      if (discount.type === "%") {
        total -= (subtotal * parseFloat(discount.value)) / 100;
      } else {
        total -= parseFloat(discount.value);
      }
    });
    // Apply tax
    if (tax.type === "%") {
      total += (subtotal * parseFloat(tax.value)) / 100;
    } else {
      total += parseFloat(tax.value);
    }
    // Add shipping
    shipping.forEach((ship) => {
      total += parseFloat(ship.value);
    });
    return total;
  };
  React.useEffect(() => {
    calculateSubtotal();
  }, [tax]);

  // Calculate subtotal whenever items change
  React.useEffect(() => {
    calculateSubtotal();
  }, [items]);

  useEffect(() => {
    setBalanceDue(getTotal() - amountPaid);
  }, [amountPaid, subtotal, discounts, tax, shipping]);
  

  return (
    <div className="container">
      <div className="upper">
        <div className="upper-text">
          <h2>Free Invoice Template</h2>
          <h4>Make beautiful invoices with one click!</h4>
          <div className="upper-p">
            <p>
              Welcome to the original Invoice Generator, trusted by millions of
              people. Invoice Generator lets you instantly make invoices with
              our attractive invoice template straight from your web browser.
              The invoices you make can be sent and paid online or downloaded as
              a PDF.
            </p>
            <p>
              Did we also mention that Invoice Generator lets you generate an
              unlimited number of invoices?
            </p>
          </div>
          <div classname="upper-btn">
            <button style={{ height: "3em", fontSize: "18px" }}>
              OK, Got it
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>

      <div className="form-holder">
      <div ref={(el) => formRef.current = el}>
        <div className="form-container">
          <form className="invoice-editor">
            <div className="header">
              <div className="header-inputs" style={{ width: "100%" }}>
                <div className="form-row" style={{ width: "100%" }}>
                  <div
                    className="form-column"
                    style={{
                      height: "100px",
                      width: "100px",
                      paddingRight: "5px",
                    }}
                  >
                    <input
                      type="file"
                      id="logo"
                      accept="image/*"
                      className="logo"
                      onChange={(e) => handleLogoChange(e.target.files[0])}
                    />
                    {logoUrl ? (
                      <>
                        <img
                          src={logoUrl}
                          alt="Uploaded Logo"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "auto",
                            height: "auto",
                          }}
                        />
                        <button
                          className="remove-logo-btn"
                          onClick={handleRemoveLogo}
                        >
                          X
                        </button>
                      </>
                    ) : (
                      <label
                        htmlFor="logo"
                        className="logo-label"
                        style={{
                          height: "100px",
                          width: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        + Add your logo
                      </label>
                    )}
                  </div>
                  <div className="form-column">
                    <input
                      type="text"
                      placeholder="Invoice"
                      className="title-input"
                      style={{ width: "500px", marginLeft: "2em" }}
                    />
                  </div>
                </div>
              </div>
              <div className="title-no">
                <div className="space"></div>
                <div
                  className="no"
                  style={{
                    marginTop: "-30px",
                    position: "relative",
                    zIndex: "3",
                  }}
                >
                  <input
                    type="text"
                    placeholder="#"
                    className="invoice-no"
                    style={{
                      width: "150px",
                      marginTop: "0px",
                      position: "relative",
                      zIndex: "2",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="details"
              style={{ marginTop: "20px", position: "relative", zIndex: "1" }}
            >
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Who is this invoice from? required"
                  required
                  style={{ width: "400px" }}
                />
              </div>
              <div className="form-row">
                <div className="form-row"style={{paddingBottom:'8em'}}>
                  <div className="form-column" >
                    <input
                      type="text"
                      placeholder="Bill To"
                      required
                      className="col-in"
                      style={{ width: "260px", height: "46px" }}
                    />
                  </div>
                  <div className="form-column">
                    <input
                      type="text"
                      placeholder="Ship To "
                      className="col-in"
                      style={{ width: "260px", height: "46px" }}
                    />
                  </div>
                </div>

                <div
                  className="form-column"
                  style={{ paddingRight: "40px", position: "" }}
                >
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Date"
                      className="col-in"
                      style={{ width: "80px", height: "36px" }}
                    />
                    <input
                      type="date"
                      placeholder=""
                      style={{ width: "200px", height: "36px" }}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Payment Terms"
                      className="col-in"
                      style={{ width: "50px", height: "36px" }}
                    />
                    <input
                      type="text"
                      placeholder=""
                      style={{ width: "200px", height: "36px" }}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Due Date"
                      className="col-in"
                      style={{ width: "50px", height: "36px" }}
                    />
                    <input
                      type="date"
                      placeholder=""
                      style={{ width: "200px", height: "36px" }}
                    />
                  </div>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="PO Number"
                      className="col-in"
                      style={{ width: "50px", height: "36px" }}
                    />
                    <input
                      type="text"
                      placeholder=""
                      style={{ width: "200px", height: "36px" }}
                    />
                  </div>
                </div>
              </div>
              <div
                className="form-row"
                style={{
                  marginTop: "-130px",
                  position: "relative",
                  zIndex: "3",
                }}
              >
                <div className="form-column" style={{ marginRight: "-330px" }}>
                  <input
                    type="text"
                    placeholder="Who is this invoice from? required"
                    required
                    style={{ width: "256px" }}
                  />
                </div>
                <div className="form-column">
                  <input
                    type="text"
                    placeholder="Who is this invoice from? required"
                    required
                    style={{ width: "260px" }}
                  />
                </div>
              </div>
            </div>
          <div className="items">
            <table style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr className="header"style={{ backgroundColor: "#05083b", color:'#fff' }}>
                        <th style={{ border: 'none', fontWeight:'300', paddingLeft:'10px',width: '40%'}}>Item</th>
                        <th style={{ border: 'none', fontWeight:'300', paddingLeft:'10px',textAlign:'center'}}>Qty</th>
                        <th style={{ border: 'none', fontWeight:'300', paddingLeft:'10px',textAlign:'center'}}>Rate</th>
                        <th style={{ border: 'none', fontWeight:'300', paddingRight:'10px',textAlign:'right'}}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr className="tbl-row"  key={index}>
                          <td  >
                            <input
                              type="text"
                              placeholder="Description of service or product"
                              value={item.description}
                              className="d-row"
                              onChange={(e) =>
                                handleItemChange(index, "description", e.target.value)
                              }
                              style={{ width: "450px" ,height:'40px', marginRight:'10px'}}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              placeholder="Quantity"
                              value={item.quantity}
                              className="d-row"
                              onChange={(e) =>
                                handleItemChange(index, "quantity", e.target.value)
                              }
                              style={{height:'40px',textAlign:"right"}}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              placeholder="Rate"
                              value={item.rate}
                              className="d-row"
                              onChange={(e) =>
                                handleItemChange(index, "rate", e.target.value)
                              }
                              style={{height:'40px',textAlign:"right"}}
                            />
                          </td>
                          <td style={{height:'40px',textAlign:"right"}}>{item.quantity * item.rate}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="remove-btn"
                            >
                              x
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <button
                    type="button"
                    onClick={addItem}
                    style={{
                      backgroundColor: "#fff",
                      color: "#198754",
                      border: "1px solid #198754",
                    }}
                  >
                    + Line Item
                  </button>
                  </div>
            <div className="totals">
              <div className="container-right">
                <div className="form-column">
                  <input
                    type="text"
                    placeholder="Notes"
                    required
                    className="col-in"
                    style={{ width: "260px", height: "46px" }}
                  />
                </div>
                <div className="form-column">
                  <input
                    type="text"
                    placeholder="Notes - any relevant information not already covered"
                    required
                    style={{
                      width: "400px",
                      height: "60px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
                <div className="form-column">
                  <input
                    type="text"
                    placeholder="Terms"
                    required
                    className="col-in"
                    style={{ width: "260px", height: "46px" }}
                  />
                </div>
                <div className="form-column">
                  <input
                    type="text"
                    placeholder="Terms and conditions - Late fees, payment metods,delivery shedule"
                    required
                    style={{
                      width: "400px",
                      height: "60px",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  />
                </div>

                {/*<div className='form-row'>
                <input type="text" placeholder="Date" className='col-in' style={{width:'80px', height:'36px'}} />              
                <input type="date" placeholder=""  style={{width:'200px', height:'36px',}} /> 
              </div> */}
              </div>
              <div className="container-left">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Subtotal"
                    className="col-in"
                    style={{ width: "80px", height: "36px" }}
                  />
                  <input
                    type=""
                    placeholder="$0.00"
                    value={subtotal}
                    readOnly
                    style={{
                      width: "200px",
                      height: "36px",
                      textAlign: "right",
                      border: "none",
                    }}
                  />
                </div>
                <div className="form-row" style={{ paddingTop: "2px" }}>
                  <input type="text" placeholder="Tax" className="col-in" />
                  <div className="tax-input-container">
                    <input
                      type="Number"
                      placeholder=""
                      className="percentage-input"
                      value={tax.value}
                      onChange={(e) =>
                        setTax({ ...tax, value: e.target.value })
                      }
                    />
                    <span style={{paddingRight:'5px',marginLeft:'0px'}}>{tax.type}</span>
                    <button
                      type="button"
                      className="loop-button"
                      onClick={toggleTaxType}
                    >
                      <i style={{ background: "none" }}>
                        <RxLoop />
                      </i>
                    </button>
                  </div>
                </div>

                <div className="total-row">
                  <div className="form-row">
                    {showAddDiscountButton && (
                      <button
                        type="button"
                        onClick={addDiscount}
                        style={{
                          backgroundColor: "#fff",
                          color: "#198754",
                          border: "none",
                        }}
                      >
                        + Discount
                      </button>
                    )}
                  </div>

                  <div className="form-row">
                    {showAddShipping && (
                      <button
                        type="button"
                        onClick={addShipping}
                        style={{
                          backgroundColor: "#fff",
                          color: "#198754",
                          border: "none",
                        }}
                      >
                        + Shiping
                      </button>
                    )}
                  </div>
                </div>
                {discounts.map((discount, index) => (
                  <div className="total-row" key={index}>
                    <input
                      type="text"
                      placeholder="Discount"
                      className="col-in"
                      style={{ paddingl: "10px",textAlign:'left' }}
                    />
                    <div className="dis-input-container">
                      <input
                        type="Number"
                        placeholder={discount.type}
                        className="percentage-input"
                        value={discount.value}
                        onChange={(e) =>
                          handleDiscountChange(index, "value", e.target.value)
                        }
                        style={{ border: "none", paddingRight: "20px" }}
                      />
                      
                      <button
                        type="button"
                        className="loop-button"
                        style={{ alignItems: "end", width: "100px" }}
                        onClick={() => toggleDiscountType(index)}
                      >
                        <i style={{ background: "none", alignItems: "end" }}>
                          <RxLoop />
                        </i>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDiscount(index)}
                      className="remove-btn"
                    >
                      x
                    </button>
                  </div>
                ))}
                {shipping.map((shipping, index) => (
                  <div className="total-row" key={index}>
                    <input
                      type="text"
                      placeholder="Shipping"
                      className="col-in"
                      style={{ paddingRight: "0px", width: "100" ,textAlign:'left'}}
                    />
                    <div
                      className="dis-input-container"
                      style={{ width: "200px" }}
                    >
                      <input
                        type="text"
                        placeholder=""
                        className="percentage-input"
                        value={shipping.value}
                        onChange={(e) =>
                          handleShippingChange(index, "value", e.target.value)
                        }
                        style={{ border: "none", paddingRight: "20px" }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeShipping(index)}
                      className="remove-btn"
                    >
                      x
                    </button>
                  </div>
                ))}

                <div className="form-row">
                  <input
                    type=""
                    placeholder="Total"
                    className="col-in"
                    style={{ width: "80px", height: "36px" }}
                  />
                  <input
                    type=""
                    className="Ftotal"
                    placeholder="$0.00"
                    value={getTotal()}
                    readOnly
                    style={{ width: "200px", height: "36px" }}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Amount Paid"
                    className="col-in"
                    style={{ width: "80px", height: "36px" }}
                  />
                  <input
                    type="Number"
                    placeholder=""
                    className="col"
                    value={amountPaid}
                    onChange={(e) =>
                      setAmountPaid(parseFloat(e.target.value) || 0)
                    }
                    style={{
                      width: "80px",
                      height: "36px",
                      textAlign: "right",
                    }}
                  />
                </div>
                <div className="form-row">
                  <input
                    type=""
                    placeholder="Balance Due"
                    className="col-in"
                    style={{ width: "80px", height: "36px" }}
                  />
                  <input
                    type=""
                    className="Ftotal"
                    placeholder="$0.00"
                    value={balanceDue}
                    readOnly
                    style={{ width: "200px", height: "36px",marginTop:'10px' }}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        </div>
        <div className="submit-container">
          <div className="sbt-btn">
          <ReactToPrint 
    trigger={() => (
        <button>
            <RiDownloadLine
                style={{
                    fontSize: "16px",
                    marginRight: "10px",
                    fontWeight: "bold",
                }}
            />
            Download PDF
        </button>
    )}
    content={() => formRef.current}
    documentTitle="new document"
    pageStyle="print"
/>

          </div>
          <div className="currency-selector">
            <div className="selector">
              <label style={{ marginTop: "5px", color: "#b8b7b7" }}>
                Currency
              </label>
              <select
                style={{ width: "160px", height: "35px" }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="optn"
              >
                <option value="USD">USD ($) </option>
                <option value="EUR">EUR </option>
                <option value="GBP">GBP </option>
                <option value="JPY">JPY </option>
                <option value="AUD">AUD </option>
                <option value="CAD">CAD </option>
                <option value="CHF">CHF </option>
                <option value="CNY">CNY </option>
                <option value="SEK">SEK </option>
                <option value="NZD">NZD </option>
                <option value="NZD">LKR (Rs) </option>
              </select>
              <div className="save">
                <span>Save Default</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceTemp;
{/* <div className="items">
              <div className="item-row" style={{ backgroundColor: "#05083b" }}>
                <input type="text" placeholder="item" className="tble" />
                <input type="text" placeholder="Qty" className="tbl" />
                <input type="text" placeholder="Rate" className="tbl" />
                <input type="text" placeholder="Amount" className="tbl" />
              </div>

              {items.map((item, index) => (
                <div className="item-row" key={index}>
                  <input
                    type="text"
                    placeholder="Description of service or product"
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                    style={{ width: "350px" }}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(index, "rate", e.target.value)
                    }
                  />
                  <span>{item.quantity * item.rate}</span>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="remove-btn"
                  >
                    x
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addItem}
                style={{
                  backgroundColor: "#fff",
                  color: "#198754",
                  border: "1px solid #198754",
                }}
              >
                + Line Item
              </button>
              </div>*/}