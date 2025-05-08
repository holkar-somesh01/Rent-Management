const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Logo and Brand Name */}
                <div className="text-lg font-semibold">
                    <span className="text-blue-500">Rent</span> Management
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-blue-400">Home</a>
                    <a href="#" className="hover:text-blue-400">About</a>
                    <a href="#" className="hover:text-blue-400">Services</a>
                    <a href="#" className="hover:text-blue-400">Contact</a>
                </div>

                {/* Contact Information */}
                <div className="text-sm mt-4 md:mt-0 text-center md:text-left">
                    <p>Email: support@rentmanagement.com</p>
                    <p>Phone: +1 (123) 456-7890</p>
                    <p>Address: 123 Rent Street, City, Country</p>
                </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6 flex justify-center space-x-4">
                <a href="#" className="hover:text-blue-400">Facebook</a>
                <a href="#" className="hover:text-blue-400">Twitter</a>
                <a href="#" className="hover:text-blue-400">LinkedIn</a>
                <a href="#" className="hover:text-blue-400">Instagram</a>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm mt-4">
                &copy; {new Date().getFullYear()} Rent Management. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;















// // import Checkout from '../../components/dashboard/ecommerce/checkout/Checkout'
// import { Container, Row, Col, Form, Button, Card, OverlayTrigger, Tooltip, Image, Modal, ListGroup, Card6 } from 'react-bootstrap';
// import { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import InputMask from 'react-input-mask';
// import { Link, useNavigate } from 'react-router-dom';

// import FedEx from './../../assets/images/svg/payment-logo-fedex.svg';
// import DHL from './../../assets/images/svg/payment-logo-dhl.svg';

// import { useContext, useEffect, useState } from 'react'
// import { convertToCurrency } from '../../helper/utils';

// // import Product2 from './../../../assets/images/ecommerce/product-shoe-02.jpg';
// import Product2 from './../../assets/images/ecommerce/product-shoe-02.jpg';
// import Product4 from './../../assets/images/ecommerce/product-shoe-04.jpg';
// import Product5 from './../../assets/images/ecommerce/product-shoe-05.jpg';
// import Product6 from './../../assets/images/ecommerce/product-shoe-06.jpg';
// import Product7 from './../../assets/images/ecommerce/product-shoe-07.jpg';
// import Product8 from './../../assets/images/ecommerce/product-shoe-08.jpg';
// import EcommerceImg1 from './../../assets/images/ecommerce/ecommerce-img-1.jpg';
// import EcommerceImg4 from './../../assets/images/ecommerce/ecommerce-img-4.jpg';
// import EcommerceImg9 from './../../assets/images/ecommerce/ecommerce-img-9.jpg';
// import useCartOperations from '../../hooks/useCartOperations';
// import { CartContext } from '../../context/Context';
// import { useCart } from '../../layouts/AllRoutes';
// import { useGetTaxesQuery } from '../../redux/apis/publicApi';
// import { useAddAddressMutation, useCreateOrderMutation, useDeleteFullCartMutation, useGetAddressesQuery, useGetAllPaymentMethodUserQuery, usePhonePeMutation, useRazorpayMutation, useVerifyPaymentMutation } from '../../redux/apis/userApi';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// const RistelCheckout = () => {
//     return <>
//         <Container className='my-5'>
//             <Checkout />
//         </Container>
//     </>
// }


// const Checkout = () => {
//     const { cartData, setCartData } = useCart();

//     const { user } = useSelector(state => state.user);
//     const { data: addresses } = useGetAddressesQuery(user && user._id);
//     const [selectedAddress, setSelectedAddress] = useState();
//     const navigate = useNavigate();
//     const { data: taxes } = useGetTaxesQuery();
//     // console.log(cartData);
//     const finalData = cartData && cartData.cartItems.map(item => {
//         const x = item.productId.varient.find(v => v._id == item.varientId)
//         return { ...item, varient: x }
//     })
//     // console.log(finalData);

//     const salesTax = taxes?.find(tax => tax.taxName === 'Sales Tax')?.percent || 0;
//     const discount = taxes?.find(tax => tax.taxName === 'Discount')?.percent || 0;
//     const makingCharges = taxes?.find(tax => tax.taxName === 'Making Charges')?.percent || 0;

//     const totalProductPrice = cartData.cartItems.reduce((acc, item) => {
//         const variant = item.productId.varient.find(v => v._id === item.varientId);
//         const variantPrice = variant ? Number(variant.price) : 0;
//         return acc + (variantPrice * item.quantity);
//     }, 0);

//     const totalAfterDiscount = totalProductPrice - (totalProductPrice * (discount / 100));
//     const makingChargesAmount = totalAfterDiscount * (makingCharges / 100);
//     const salesTaxAmount = totalAfterDiscount * (salesTax / 100);
//     const total = totalAfterDiscount + makingChargesAmount + salesTaxAmount;

//     const next = () => {
//         setCurrentStep(currentStep === 4 ? 1 : currentStep + 1);
//     };
//     const previous = () => {
//         setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
//     };
//     const handlePayNow = () => {
//         if (selectedAddress) {
//             const totalInCents = Math.round(total);
//             setCartData(prevData => ({
//                 ...prevData,
//                 subtotal: totalInCents,
//                 deliveryAddressId: selectedAddress,
//                 cartItems: finalData
//             }));
//             next()
//             // navigate("/user/payment");
//         } else {
//             toast.error("Please select an address before proceeding.");
//         }
//     };


//     // ---------------

//     const [currentStep, setCurrentStep] = useState(1);
//     const [formData, setFormData] = useState();
//     const handleChange = (event) => {
//         setFormData({
//             ...formData,
//             [event.target.name]: event.target.value
//         });
//         // console.log(formData);
//     };


//     const steps = [

//         {
//             id: 1,
//             title: 'Shipping Details',
//             content: (
//                 <ShippingInformation
//                     handlePayNow={handlePayNow}
//                     data={formData}
//                     handleChange={handleChange}
//                     next={next}
//                     previous={previous}
//                     selectedAddress={selectedAddress}
//                     setSelectedAddress={setSelectedAddress}
//                 />
//             )
//         },
//         {
//             id: 2,
//             title: 'Payment Info',
//             content: (
//                 <PaymentSelection
//                     data={formData}
//                     handleChange={handleChange}
//                     next={next}
//                     previous={previous}
//                 />
//             )
//         }
//     ];
//     return (
//         <div>
//             <Row>
//                 <Col lg={12} md={12} xs={12}>
//                     <div className="border-bottom pb-3 mb-3 ">
//                         <div className="mb-2 mb-lg-0">
//                             <h1 className="mb-0 h2 fw-bold"> Checkout </h1>
//                         </div>
//                     </div>
//                 </Col>
//             </Row>
//             <Row>
//                 <Col lg={7} xl={8}>
//                     <div id="stepperForm" className="bs-stepper">
//                         <Row>
//                             <div>
//                                 {/* Stepper Button and content */}
//                                 <GKStepper3 currentStep={currentStep} steps={steps} />
//                             </div>
//                         </Row>
//                     </div>
//                 </Col>
//                 <Col xl={4} lg={5}>
//                     <OrderSummary
//                         cartData={cartData}
//                         totalProductPrice={totalProductPrice}
//                         salesTax={salesTax}
//                         discount={discount}
//                         makingCharges={makingCharges}
//                         totalAfterDiscount={totalAfterDiscount}
//                         makingChargesAmount={makingChargesAmount}
//                         salesTaxAmount={salesTaxAmount}
//                         total={total}
//                     />
//                 </Col>
//             </Row>
//         </div>
//     );
// }

// // const BillingInformation = (props) => {
// //     const { next } = props;

// //     const countryOptions = [
// //         { value: 'India', label: 'India' },
// //         { value: 'UK', label: 'UK' },
// //         { value: 'US', label: 'US' }
// //     ];
// //     return (
// //         <Form>
// //             <div className="bs-stepper-content">
// //                 {/* Content one */}
// //                 <div role="tabpanel" className="bs-stepper-pane active dstepper-block">
// //                     {/* heading */}
// //                     <div className="mb-5">
// //                         <h3 className="mb-1">Billing Information</h3>
// //                         <p className="mb-0">Please fill all information below
// //                         </p>
// //                     </div>
// //                     <Row className="gx-3">
// //                         <Col md={6} className="mb-3">
// //                             {/* First Name */}
// //                             <Form.Label htmlFor="firstname">First Name</Form.Label>
// //                             <Form.Control type="text" id="firstname" placeholder="Enter first name" />
// //                         </Col>
// //                         <Col md={6} className="mb-3">
// //                             {/* Last Name */}
// //                             <Form.Label htmlFor="lastName">Last Name</Form.Label>
// //                             <Form.Control type="text" id="lastName" placeholder="Enter last name" />
// //                         </Col>
// //                         <Col md={6} className="mb-3">
// //                             {/* Email */}
// //                             <Form.Label htmlFor="email">Email</Form.Label>
// //                             <Form.Control type="email" id="email" placeholder="Enter email address" />
// //                         </Col>
// //                         <Col md={6} className="mb-3">
// //                             {/* Phone */}
// //                             <Form.Label htmlFor="phone">Phone</Form.Label>
// //                             <Form.Control type="text" placeholder="Enter phone number" id="phone" />
// //                         </Col>
// //                         <Col xs={12} className="mb-3">
// //                             {/* Address */}
// //                             <Form.Label htmlFor="address">Address</Form.Label>
// //                             <Form.Control type="text" placeholder="Enter address" id="address" />
// //                         </Col>
// //                         <Col xs={12} className="mb-3">
// //                             {/* Town / City */}
// //                             <Form.Label htmlFor="town">Town / City</Form.Label>
// //                             <Form.Control type="text" placeholder="Enter City" id="town" />
// //                         </Col>
// //                         <Col xs={12} className="mb-3">
// //                             {/* State */}
// //                             <Form.Label htmlFor="state">State</Form.Label>
// //                             <Form.Control type="text" placeholder="Enter State" id="state" />
// //                         </Col>
// //                         <Col xs={12} className="mb-3">
// //                             {/* Zip / Postal Code */}
// //                             <Form.Label htmlFor="zip">Zip / Postal Code</Form.Label>
// //                             <Form.Control type="text" placeholder="Zip / Postal Code" id="zip" />
// //                         </Col>
// //                         <Col xs={12} className="mb-3">
// //                             {/* select country */}
// //                             <Form.Label htmlFor="country">Country</Form.Label>
// //                             <Form.Control as={FormSelect} id="country" placeholder="Select Country" options={countryOptions} />
// //                         </Col>
// //                         {/* checkbox */}
// //                         <Col xs={12} className="mb-3">
// //                             {/* shipping address confirmation chechbox */}
// //                             <Form.Check
// //                                 type="checkbox"
// //                                 id="shipAddress"
// //                                 label="Ship to different address ?"
// //                                 value=""
// //                             />
// //                         </Col>
// //                     </Row>

// //                     {/* Button */}
// //                     <div className="d-flex justify-content-end">
// //                         <Button variant="primary" onClick={next}>
// //                             Proceed to Shipping <i className="fe fe-shopping-bag ms-1"></i>
// //                         </Button>
// //                     </div>
// //                 </div>
// //             </div>
// //         </Form>
// //     );
// // };

// const FormSelect = ({
//     placeholder = '',
//     defaultselected = 'Select',
//     options = [],
//     id = '',
//     name = '',
//     style = '',
//     onChange,
//     required = false,
// }) => {
//     return (
//         <Fragment>
//             <Form.Select
//                 defaultValue={defaultselected}
//                 id={id}
//                 name={name}
//                 onChange={onChange}
//                 required={required}
//                 style={style ? style : {}}
//             >
//                 {placeholder ? (
//                     <option value="" className="text-muted">
//                         {placeholder}
//                     </option>
//                 ) : (
//                     ''
//                 )}
//                 {options.map((item, index) => {
//                     return (
//                         <option key={index} value={item.value} className="text-dark">
//                             {item.label}
//                         </option>
//                     );
//                 })}
//             </Form.Select>
//         </Fragment>
//     );
// };
// FormSelect.propTypes = {
//     placeholder: PropTypes.string,
//     defaultselected: PropTypes.string,
//     id: PropTypes.string,
//     name: PropTypes.string,
//     required: PropTypes.bool
// };

// // payment

// const PaymentSelection = (props) => {
//     const { previous } = props;

//     const [raz, { isSuccess: razSuccess, data, isLoading }] = useRazorpayMutation();
//     const { data: paymentMethods } = useGetAllPaymentMethodUserQuery();
//     // console.log(paymentMethods);
//     const [phonePe, { isSuccess: phonePeSuccess, isLoading: phonePeLoading, data: phonePeData }] = usePhonePeMutation()
//     const [initiate, { isSuccess: initiateSuccess, isLoading: initiateLoading }] = useVerifyPaymentMutation();
//     const { user } = useSelector(state => state.user);
//     const [createOrder, { isSuccess, isLoading: codLoading }] = useCreateOrderMutation();
//     const { cartData, setCartData } = useCart();
//     const [deleteFull, { isSuccess: deleteSuccess }] = useDeleteFullCartMutation();
//     // const [postHistory] = usePostHistoryMutation()
//     const [paymentMethod, setPaymentMethod] = useState('');

//     // Fetch and set taxes
//     const { data: taxes } = useGetTaxesQuery();
//     const [discount, setDiscount] = useState(0);
//     const [makingCharges, setMakingCharges] = useState(0);
//     const [salesTax, setSalesTax] = useState(0);

//     // taxes ke liye
//     useEffect(() => {
//         if (taxes) {
//             setDiscount(taxes.find(tax => tax.taxName === 'Discount')?.percent || 0);
//             setMakingCharges(taxes.find(tax => tax.taxName === 'Making Charges')?.percent || 0);
//             setSalesTax(taxes.find(tax => tax.taxName === 'Sales Tax')?.percent || 0);
//         }
//     }, [taxes]);

//     // useEffect(() => {
//     //     addView({ type: "Payment Page" })
//     // }, [])
//     // Calculate order totals
//     const subtotal = cartData.subtotal || 0;
//     const calculateDiscount = (amount) => amount * (discount / 100);
//     const totalAfterDiscount = subtotal - calculateDiscount(subtotal);
//     const makingChargesAmount = totalAfterDiscount * (makingCharges / 100);
//     const salesTaxAmount = totalAfterDiscount * (salesTax / 100);
//     const totalWithTaxAndCharges = totalAfterDiscount + makingChargesAmount + salesTaxAmount;
//     // console.log("totalWithTaxAndCharges form data", subtotal);

//     const handlePaymentMethodChange = (e) => {
//         setPaymentMethod(e.target.value);
//     };


//     // const pData = {
//     //     name: "faiz",
//     //     number: 9960669624,
//     //     amount: 50,
//     //     MUID: "MUID" + Date.now(),
//     //     transactionId: "T" + Date.now()
//     // }

//     console.log("order data", cartData);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const orderData = {
//             deliveryAddressId: cartData.deliveryAddressId,
//             paymentMethod,
//             subtotal: cartData.subtotal,
//             orderItems: cartData.cartItems.map(item => ({
//                 _id: item.productId._id,
//                 quantity: item.quantity,
//                 varientId: item.varient._id
//             })),
//         };

//         if (paymentMethod === 'razorpay') {
//             raz({
//                 ...orderData, userId: user._id, currency: "INR",
//                 receipt: `${user._id}${user.name}`,
//                 subtotal: subtotal.toFixed(2)
//             });
//         } else if (paymentMethod == "cod") {
//             createOrder({
//                 ...orderData,
//                 userId: user._id,
//                 orderItems: cartData.cartItems.map(item => ({
//                     _id: item.productId._id,
//                     quantity: item.quantity,
//                     varientId: item.varient._id
//                 })),
//             });
//         }
//         // } else {
//         //     phonePe(pData)
//         // }
//     };
//     // console.log("order items", orderItems);

//     useEffect(() => {
//         if (phonePeSuccess) {
//             console.log(phonePeData);


//         }
//     }, [phonePeSuccess])

//     useEffect(() => {
//         if (razSuccess) {
//             const razor = new window.Razorpay({
//                 key: import.meta.env.VITE_RAZORPAY_API_KEY,
//                 amount: data.amount * 100,
//                 name: user.name,
//                 currency: "INR",
//                 order_id: data.id,
//                 prefill: {
//                     name: user && user.name,
//                     email: user && user.email,
//                     contact: user && user.contact
//                 },
//                 theme: {
//                     color: "#f9f2e8"
//                 },
//                 handler: res => initiate({
//                     ...res, amount: data.amount,
//                     deliveryAddressId: cartData.deliveryAddressId,
//                     paymentMethod: paymentMethod,
//                     userId: user._id,
//                     orderItems: cartData.cartItems.map(item => ({
//                         _id: item.productId._id,
//                         quantity: item.quantity,
//                         varientId: item.varient._id
//                     })),
//                 }),
//             });
//             razor.on('payment.failed', (res) => {
//                 console.log('Payment Failed: ' + res.error.description);
//             });
//             razor.open();
//         }
//     }, [razSuccess, data]);

//     const navigate = useNavigate();
//     useEffect(() => {
//         if (isSuccess || initiateSuccess) {
//             toast.success("Order placed successfully! Thank you.");
//             // if (cartData.cartItems.length > 1) {
//             deleteFull({ userId: user._id });

//             setCartData({});
//             navigate("/");
//             localStorage.removeItem("cartData");
//         }
//     }, [isSuccess, initiateSuccess]);

//     useEffect(() => {
//         if (deleteSuccess) {
//             navigate("/");
//         }
//     }, [deleteSuccess]);

//     // useEffect(() => {
//     //     if (user) {
//     //         postHistory({ userId: user._id, type: "paymentPage" })
//     //     }
//     // }, [])







//     // ------------------
//     // const states = [
//     //     { value: 'Gujarat', label: 'Gujarat' },
//     //     { value: 'Maharashtra', label: 'Maharashtra' },
//     //     { value: 'MP', label: 'MP' },
//     //     { value: 'UP', label: 'UP' }
//     // ];
//     // const radios = [
//     //     { name: 'Full Time', value: '1' },
//     //     { name: 'Freelance', value: '2' },
//     //     { name: 'Contract', value: '3' }
//     // ];
//     const CardNumberInput = (props) => (
//         <InputMask
//             mask="9999-9999-9999-9999"
//             placeholder="xxxx-xxxx-xxxx-xxxx"
//             value={props.value}
//             onChange={props.onChange}
//             className="form-control bg-white px-4 py-2.1"
//         >
//             {(inputProps) => <input {...inputProps} type="tel" id={props.id} />}
//         </InputMask>
//     );

//     const ExpiryDate = (props) => (
//         <InputMask
//             mask={props.mask}
//             placeholder={props.placeholder}
//             value={props.value}
//             onChange={props.onChange}
//             className="form-control bg-white px-4 py-2.1"
//         >
//             {(inputProps) => <input {...inputProps} type="tel" id={props.id} />}
//         </InputMask>
//     );

//     return (
//         <Form>
//             <div className="bs-stepper-content">
//                 {/* Content three */}
//                 <div role="tabpanel" className="bs-stepper-pane ">
//                     {/* Card */}
//                     <div className="mb-5">
//                         <h3 className="mb-1">Payment selection</h3>
//                         <p className="mb-0">Please select and enter your billing information.
//                         </p>
//                     </div>


//                     {/* Cash On Delivery Payment Method */}
//                     <Card className="card-bordered shadow-none mb-2">
//                         <Card.Body>
//                             <div className="d-flex">
//                                 <Form.Check className="mb-2">
//                                     <Form.Check.Input
//                                         type="radio"
//                                         id="cod"
//                                         name="paymentMethod"
//                                         value="cod"
//                                         checked={paymentMethod === 'cod'}
//                                         onChange={handlePaymentMethodChange}
//                                         className="form-radio size-6"
//                                         disabled={!paymentMethods?.find(pm => pm.method === 'cod' && pm.active)}
//                                     />
//                                     <Form.Check.Label className="ms-2 w-100" ></Form.Check.Label>
//                                 </Form.Check>
//                                 <div>
//                                     <h5 className="mb-1"> Cash on Delivery</h5>
//                                     <p className="mb-0 fs-6">Pay with cash when your order is delivered.</p>
//                                 </div>
//                             </div>
//                         </Card.Body>
//                     </Card>


//                     {/* COD Payment Method */}
//                     {/* <Card className="card-bordered shadow-none mb-2">
//                         <Card.Body>
//                             <div className="d-flex">
//                                 <Form.Check className="mb-2">
//                                     <Form.Check.Input

//                                         type="radio"
//                                         id="cod"
//                                         name="paymentMethod"
//                                         value="cod"
//                                         checked={paymentMethod === 'cod'}
//                                         onChange={handlePaymentMethodChange}
//                                         className="form-radio size-6"
//                                         disabled={!paymentMethods?.find(pm => pm.method === 'cod' && pm.active)}
//                                     />
//                                     <Form.Check.Label className="ms-2 w-100" ></Form.Check.Label>
//                                 </Form.Check>
//                                 <div>
//                                     <h5 className="mb-1"> Cash On Delivery</h5>
//                                     <p className="mb-0 fs-6">You will be redirected to Razorpay website to complete your purchase securely.</p>
//                                 </div>
//                             </div>
//                         </Card.Body>
//                     </Card> */}

//                     {/* Razorpay Payment Method */}
//                     <Card className="card-bordered shadow-none mb-2">
//                         <Card.Body>
//                             <div className="d-flex">
//                                 <Form.Check className="mb-2">
//                                     <Form.Check.Input name="paymentMethod"
//                                         value="razorpay"
//                                         checked={paymentMethod === 'razorpay'}
//                                         onChange={handlePaymentMethodChange}
//                                         className="form-radio size-6"
//                                         disabled={!paymentMethods?.find(pm => pm.method === 'razorpay' && pm.active)}
//                                         type="radio"
//                                         id="razorpay" />
//                                     <Form.Check.Label className="ms-2 w-100" ></Form.Check.Label>
//                                 </Form.Check>
//                                 <div>
//                                     <h5 className="mb-1"> Payment with RazorPay</h5>
//                                     <p className="mb-0 fs-6">You will be redirected to Razorpay website to complete your purchase securely.</p>
//                                 </div>
//                             </div>
//                         </Card.Body>
//                     </Card>





//                     {/* Paypal Payment Method */}



//                     {/* Button */}
//                     <div className="d-flex justify-content-between mt-3">
//                         <Button variant='outline-primary' className="mb-2 mb-md-0" onClick={previous}>
//                             Back to shipping
//                         </Button>
//                         <Button onClick={handleSubmit}>
//                             Complete Order
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </Form>
//     );
// }

// // checkout

// const ShippingInformation = (props) => {
//     const { next, previous, selectedAddress, setSelectedAddress, handlePayNow } = props;
//     const [modalShow, setModalShow] = useState(false);
//     const { user } = useSelector(state => state.user);
//     const { data: addresses } = useGetAddressesQuery(user && user._id);


//     const countryOptions = [
//         { value: 'India', label: 'India' },
//         { value: 'UK', label: 'UK' },
//         { value: 'US', label: 'US' },
//         { value: 'Canada', label: 'Canada' },
//         { value: 'Australia', label: 'Australia' },
//         { value: 'Germany', label: 'Germany' },
//         { value: 'France', label: 'France' },
//         { value: 'China', label: 'China' },
//         { value: 'Japan', label: 'Japan' },
//         { value: 'Brazil', label: 'Brazil' },
//         { value: 'South Africa', label: 'South Africa' },
//         { value: 'Russia', label: 'Russia' },
//         { value: 'Mexico', label: 'Mexico' },
//         { value: 'Italy', label: 'Italy' },
//         { value: 'Netherlands', label: 'Netherlands' },
//         { value: 'Spain', label: 'Spain' },
//         { value: 'Sweden', label: 'Sweden' },
//         { value: 'Norway', label: 'Norway' },
//         { value: 'Argentina', label: 'Argentina' },
//         { value: 'South Korea', label: 'South Korea' },
//         { value: 'Saudi Arabia', label: 'Saudi Arabia' },
//         { value: 'United Arab Emirates', label: 'United Arab Emirates' }
//     ];

//     const AddNewAddressModal = (props) => {
//         const [addAddress, { isSuccess, isLoading }] = useAddAddressMutation();

//         const formik = useFormik({
//             enableReinitialize: true,
//             initialValues: {
//                 pincode: "",
//                 address: "",
//                 city: "",
//                 state: "",
//                 country: "",
//                 addressType: "",
//                 mobile: "",
//                 email: "",
//                 firstname: "",
//                 lastName: "",
//             },
//             validationSchema: yup.object({
//                 pincode: yup.string().required("Enter pincode"),
//                 address: yup.string().required("Enter address"),
//                 city: yup.string().required("Enter city"),
//                 state: yup.string().required("Enter state"),
//                 country: yup.string().required("Enter country"),
//                 addressType: yup.string().required("Select address type"),
//                 mobile: yup.string().required("Enter mobile number"),
//                 email: yup.string().email("Invalid email format"),
//                 firstname: yup.string().required("Enter first name"),
//                 lastName: yup.string().required("Enter last name"),
//             }),
//             onSubmit: (values, { resetForm }) => {
//                 // if (!user.email) {
//                 //     const x = localStorage.getItem("user");
//                 //     const y = JSON.parse(x);
//                 //     const z = { ...y, email: values.email };
//                 //     localStorage.setItem("user", JSON.stringify(z));
//                 // }
//                 // console.log(values);

//                 // addAddress({ ...values, userId: user._id });
//                 resetForm();
//                 props.setModalShow(false);
//             },
//         });

//         useEffect(() => {
//             if (isSuccess) {
//                 toast.success("Address Added Success ")
//             }
//         }, [isSuccess])


//         return (
//             <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
//                 <form onSubmit={formik.handleSubmit}>
//                     <Modal.Body>
//                         <pre>{JSON.stringify(formik.values, null, 2)}</pre>
//                         <Row>
//                             <Col md={6} className="mb-3">
//                                 <Form.Label htmlFor="firstname">First Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     id="firstname"
//                                     placeholder="Enter first name"
//                                     {...formik.getFieldProps("firstname")}
//                                     isInvalid={formik.touched.firstname && formik.errors.firstname}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.firstname}</Form.Control.Feedback>
//                             </Col>

//                             <Col md={6} className="mb-3">
//                                 <Form.Label htmlFor="lastName">Last Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     id="lastName"
//                                     placeholder="Enter last name"
//                                     {...formik.getFieldProps("lastName")}
//                                     isInvalid={formik.touched.lastName && formik.errors.lastName}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.lastName}</Form.Control.Feedback>
//                             </Col>

//                             <Col md={6} className="mb-3">
//                                 <Form.Label htmlFor="email">Email (Optional)</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     id="email"
//                                     placeholder="Enter email address"
//                                     {...formik.getFieldProps("email")}
//                                     isInvalid={formik.touched.email && formik.errors.email}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
//                             </Col>

//                             <Col md={6} className="mb-3">
//                                 <Form.Label htmlFor="mobile">Phone</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     id="mobile"
//                                     placeholder="Enter phone number"
//                                     {...formik.getFieldProps("mobile")}
//                                     isInvalid={formik.touched.mobile && formik.errors.mobile}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.mobile}</Form.Control.Feedback>
//                             </Col>

//                             <Col xs={6} className="mb-3">
//                                 <Form.Label htmlFor="address">Address</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     id="address"
//                                     placeholder="Enter address"
//                                     {...formik.getFieldProps("address")}
//                                     isInvalid={formik.touched.address && formik.errors.address}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.address}</Form.Control.Feedback>
//                             </Col>

//                             <Col xs={6} className="mb-3">
//                                 <Form.Label htmlFor="city">Town / City</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     id="city"
//                                     placeholder="Enter City"
//                                     {...formik.getFieldProps("city")}
//                                     isInvalid={formik.touched.city && formik.errors.city}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.city}</Form.Control.Feedback>
//                             </Col>
//                             <Col xs={12} className="mb-3">
//                                 <Form.Label htmlFor="country">Address Type</Form.Label>
//                                 <Form.Select
//                                     id="country"
//                                     {...formik.getFieldProps("addressType")}
//                                     isInvalid={formik.touched.addressType && formik.errors.addressType}
//                                 >
//                                     <option disabled value="">Select Address Type</option>
//                                     <option value="home">HOME</option>
//                                     <option value="office">OFFICE</option>
//                                     {/* {countryOptions.map((country) => (
//                                         <option key={country.value} value={country.value}>{country.label}</option>
//                                     ))} */}
//                                 </Form.Select>
//                                 <Form.Control.Feedback type="invalid">{formik.errors.addressType}</Form.Control.Feedback>
//                             </Col>

//                             <Col xs={6} className="mb-3">
//                                 <Form.Label htmlFor="state">State</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     id="state"
//                                     placeholder="Enter State"
//                                     {...formik.getFieldProps("state")}
//                                     isInvalid={formik.touched.state && formik.errors.state}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.state}</Form.Control.Feedback>
//                             </Col>

//                             <Col xs={6} className="mb-3">
//                                 <Form.Label htmlFor="pincode">Zip / Postal Code</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     id="pincode"
//                                     placeholder="Zip / Postal Code"
//                                     {...formik.getFieldProps("pincode")}
//                                     isInvalid={formik.touched.pincode && formik.errors.pincode}
//                                 />
//                                 <Form.Control.Feedback type="invalid">{formik.errors.pincode}</Form.Control.Feedback>
//                             </Col>

//                             <Col xs={12} className="mb-3">
//                                 <Form.Label htmlFor="country">Country</Form.Label>
//                                 <Form.Select
//                                     id="country"
//                                     {...formik.getFieldProps("country")}
//                                     isInvalid={formik.touched.country && formik.errors.country}
//                                 >
//                                     <option value="">Select Country</option>
//                                     {countryOptions.map((country) => (
//                                         <option key={country.value} value={country.value}>{country.label}</option>
//                                     ))}
//                                 </Form.Select>
//                                 <Form.Control.Feedback type="invalid">{formik.errors.country}</Form.Control.Feedback>
//                             </Col>
//                         </Row>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={e => props.setModalShow(false)}>Close</Button>
//                         <Button type="submit" onClick={e => {
//                             const values = formik.values
//                             if (!user.email) {
//                                 const x = localStorage.getItem("user");
//                                 const y = JSON.parse(x);
//                                 const z = { ...y, email: values.email };
//                                 localStorage.setItem("user", JSON.stringify(z));
//                             }
//                             // console.log(values);
//                             props.setModalShow(false);
//                             addAddress({ ...values, userId: user._id });
//                         }} disabled={isLoading}>Save Changes</Button>
//                     </Modal.Footer>
//                 </form>
//             </Modal>
//         );
//     };


//     const handleAddressChange = (addressId) => {
//         setSelectedAddress(addressId);
//     };

//     useEffect(() => {
//         // const handleAddressChange = (addressId) => {
//         setSelectedAddress(addresses && addresses[0]._id);


//     }, [])


//     return (
//         <Form>
//             <div className="bs-stepper-content w-100">
//                 <div role="tabpanel" className="bs-stepper-pane">
//                     {/* Section Header */}
//                     <div className="mb-5">
//                         <pre>{JSON.stringify(selectedAddress, null, 2)}</pre>
//                         <h3 className="mb-1">Shipping Information</h3>
//                         <p className="mb-0">Fill the form below to send you the orders invoice.</p>
//                     </div>

//                     {/* Saved Address Section */}
//                     <div className="d-flex  justify-content-between align-items-center mb-3">
//                         <h4 className="mb-0 flex-grow-1">Saved Address</h4>
//                         <div>
//                             <Button variant="outline-primary" onClick={() => setModalShow(true)}>
//                                 + Add New Address
//                             </Button>
//                         </div>

//                         {/* Add New Address Modal */}
//                         <AddNewAddressModal show={modalShow} setModalShow={setModalShow} />
//                     </div>

//                     {/* Address List */}
//                     <Row>
//                         {addresses &&
//                             addresses.map((item, i) => (
//                                 <Col lg={6} xs={12} className="mb-4" key={item._id}>
//                                     <div
//                                         className={`border p-4 rounded-3 ${selectedAddress === item._id ? "border-primary shadow-sm" : ""
//                                             }`}
//                                     >
//                                         <Form.Check className="mb-2">
//                                             <Form.Check.Input
//                                                 checked={selectedAddress === item._id || (!selectedAddress && i === 0)}
//                                                 onChange={() => handleAddressChange(item._id)}
//                                                 type="radio"
//                                                 name="addressRadio"
//                                                 id={addressRadio - ${i}}
//                                             />
//                                             <Form.Check.Label className="text-dark fw-semibold">
//                                                 {item.addressType}
//                                             </Form.Check.Label>
//                                         </Form.Check>
//                                         <p className="mb-0 text-muted">
//                                             {item.address}<br />
//                                             {item.city}, {item.state} {item.pincode}<br />
//                                             {item.country}
//                                         </p>
//                                     </div>
//                                 </Col>
//                             ))}
//                     </Row>

//                     {/* Navigation Buttons */}
//                     <div className="d-md-flex justify-content-between mt-4">
//                         <Button variant="outline-secondary" className="mb-2 mb-md-0" onClick={previous}>
//                             Back to Info
//                         </Button>
//                         <Button variant="primary" onClick={handlePayNow}>
//                             Continue to Payment <i className="fe fe-credit-card ms-2"></i>
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </Form>


//     );
// }
// // overview

// const OrderSummary = ({
//     cartData,
//     totalProductPrice,
//     salesTax,
//     discount,
//     makingCharges,
//     totalAfterDiscount,
//     makingChargesAmount,
//     salesTaxAmount,
//     total }) => {

//     // const [cartSubTotal, setCartSubTotal] = useState(0);
//     // const {
//     //     getCartSubtotal,
//     //     getGrandTotal
//     // } = useCartOperations();

//     // const {
//     //     CartState: { cartItems, cartSummary },
//     // } = useContext(CartContext);

//     // useEffect(() => {
//     //     setCartSubTotal(getCartSubtotal(cartItems));
//     // }, [cartItems]);

//     return (
//         <Card className="mt-4 mt-lg-0">
//             <Card.Body>
//                 <div className="mb-4 d-flex justify-content-between align-items-center">
//                     <h4 className="mb-1">Order Summary</h4>
//                     <Link to="/dashboard/ecommerce/shopping-cart">Edit Cart</Link>
//                 </div>
//                 {cartData && cartData.cartItems.map((product, index) => {
//                     const variant = product.productId.varient.find(v => v._id === product.varientId);
//                     const variantPrice = variant ? Number(variant.price) : 0;
//                     const discountedPrice = variantPrice * (1 - (discount / 100));
//                     return (
//                         <CartItem
//                             key={index}
//                             variant={variant}
//                             product={product}
//                             index={index}
//                             totalItems={cartData.cartItems.length}
//                             discountedPrice={discountedPrice}
//                             discount={discount}
//                         />
//                     )
//                 })}
//             </Card.Body>
//             <Card.Body className="border-top pt-2">
//                 <ListGroup variant="flush">
//                     <ListGroup.Item className='d-flex justify-content-between px-0 pb-0'>
//                         <span>Sub Total :</span>
//                         <span className='text-dark fw-semibold'>
//                             {totalProductPrice.toFixed(2)}
//                         </span>
//                     </ListGroup.Item>
//                     {/* <span>Discount <span className="text-muted">({discount})</span>: </span> */}
//                     {/* <span className='text-dark fw-semibold'>-{}</span> */}
//                     {/* {cartSummary.coupon && <ListGroup.Item className='d-flex justify-content-between px-0 pb-0'>
//                     </ListGroup.Item>} */}
//                     <ListGroup.Item className='d-flex justify-content-between px-0 pb-0'>
//                         <span>Sales Tax {salesTax.toFixed(2)}% (included) :</span>
//                         <span className='text-dark fw-semibold'>{salesTaxAmount.toFixed(2)}</span>
//                     </ListGroup.Item>
//                     <ListGroup.Item className='d-flex justify-content-between px-0 pb-0'>
//                         <span>Making Charges {makingCharges.toFixed(2)}% (included) :</span>
//                         <span className='text-dark fw-semibold'>{makingChargesAmount.toFixed(2)}</span>
//                     </ListGroup.Item>
//                     <ListGroup.Item className='d-flex justify-content-between px-0 pb-0'>
//                         <span>Discount {discount.toFixed(2)}% (included) :</span>
//                         <span className='text-dark fw-semibold'>{(totalProductPrice * (discount / 100)).toFixed(2)}</span>
//                     </ListGroup.Item>
//                     <ListGroup.Item className='d-flex justify-content-between px-0 pb-0'>
//                         <span>Shipping Charge :</span>
//                         <span className='text-dark fw-semibold'>FREE</span>
//                     </ListGroup.Item>
//                     <ListGroup.Item className='d-flex justify-content-between px-0 pb-0'>
//                         <span className='fs-4 fw-semibold text-dark'>Grand Total :</span>
//                         <span className='fw-semibold text-dark'>{total.toFixed(2)}</span>
//                     </ListGroup.Item>
//                 </ListGroup>
//             </Card.Body>
//         </Card>
//     )
// }
// const CartItem = ({ product, index, totalItems, discountedPrice, variant }) => {
//     // const { id } = product;

//     // const productInfo = ProductsData.filter((product) => product.id === id);
//     // console.log(product);

//     return (
//         <Fragment>
//             <div className="d-md-flex">
//                 <div>
//                     <Image src={product.productId.images[0]} alt="" className="img-4by3-xl rounded" />
//                 </div>
//                 <div className="ms-md-4 mt-2">
//                     <h4 className="mb-1 text-primary-hover">
//                         {product.productId.name}
//                     </h4>
//                     <h5>{product.productId.price}</h5>
//                     <h6>Price : {variant.price}</h6>
//                     <span>Qty:{product.quantity}</span>
//                 </div>
//             </div>
//             {index === totalItems - 1 ? '' : <hr className="my-3" />}
//         </Fragment>
//     );
// };

// const ProductsData = [
//     {
//         id: 1,
//         name: 'The Ganiru Oval Bangle',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 74500.00,
//         mrp: 112500,
//         sale: false,
//         rating: 5.0,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: "https://kinclimg5.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BIPM0025R22_YAA22XXXXXXXXXXXX_ABCD00-PICS-00001-1024-2701.jpg"
//             },
//             {
//                 id: 2,
//                 image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BVGC0661B01_YAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-55413.png"
//             },
//             {
//                 id: 3,
//                 image: "https://kinclimg8.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISK0368R03_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66176.png"
//             }
//         ],
//     },
//     {
//         id: 2,
//         name: 'The Ganiru Oval Bangle',
//         colors: ['danger', 'primary', 'dark'],
//         salePrice: 139.00,
//         mrp: 139.00,
//         sale: false,
//         rating: 4.6,
//         new: false,
//         status: 'draft',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: "https://kinclimg6.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BVGC0661B01_YAA18XXXXXXXXXXXX_ABCD00-PICS-00002-1024-55413.png"
//             }
//         ],
//     },
//     {
//         id: 3,
//         name: 'The Ganiru Oval Bangle',
//         colors: ['danger', 'success', 'dark'],
//         salePrice: 39.00,
//         mrp: 49.00,
//         sale: true,
//         rating: 3.6,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: "https://kinclimg8.bluestone.com/f_webp,c_scale,w_1024,b_rgb:f0f0f0/giproduct/BISK0368R03_YAA18DIG6XXXXXXXX_ABCD00-PICS-00001-1024-66176.png"
//             }
//         ],
//     },
//     {
//         id: 4,
//         name: 'Nike SuperRep Go',
//         colors: ['danger', 'warning', 'info'],
//         salePrice: 69.00,
//         mrp: 69.00,
//         sale: false,
//         rating: 3.6,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product4
//             }
//         ],
//     },
//     {
//         id: 5,
//         name: 'Unpaired maroon plimsoll',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 49.00,
//         mrp: 49.00,
//         sale: false,
//         rating: 4.2,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product5
//             }
//         ],
//     },
//     {
//         id: 6,
//         name: 'Nike Legend Essential 2',
//         colors: ['primary', 'dark'],
//         salePrice: 30.00,
//         mrp: 39.00,
//         sale: true,
//         rating: 3.8,
//         new: true,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product6
//             }
//         ],
//     },
//     {
//         id: 7,
//         name: 'Nike Black and White',
//         colors: ['danger', 'info', 'dark'],
//         salePrice: 239.00,
//         mrp: 239.00,
//         sale: false,
//         rating: 3.9,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product7
//             }
//         ],
//     },
//     {
//         id: 8,
//         name: 'Nike shoes Dark Brown',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 29.00,
//         mrp: 29.00,
//         sale: false,
//         rating: 2.9,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product8
//             }
//         ],
//     },
//     {
//         salePrice: 39.00,
//         id: 9,
//         name: 'Henry Saxton',
//         colors: ['danger', 'primary', 'dark'],
//         mrp: 39.00,
//         sale: false,
//         rating: 3.9,
//         new: false,
//         status: 'draft',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product2
//             }
//         ],
//     },
//     {
//         id: 10,
//         name: 'Juanita Diener',
//         colors: ['primary', 'dark'],
//         salePrice: 29.00,
//         mrp: 29.00,
//         sale: false,
//         rating: 2.9,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product4
//             }
//         ],
//     },
//     {
//         id: 11,
//         name: 'Boris Ortiz',
//         colors: ['danger', 'warning', 'info'],
//         salePrice: 39.00,
//         mrp: 39.00,
//         sale: false,
//         rating: 4.9,
//         new: false,
//         status: 'draft',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product6
//             }
//         ],
//     },
//     {
//         id: 12,
//         name: 'Mr. Stefan Jenkins',
//         colors: ['danger', 'success', 'dark'],
//         salePrice: 129.00,
//         mrp: 129.00,
//         sale: false,
//         rating: 3.8,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: Product8
//             }
//         ],
//     },
//     {
//         id: 13,
//         name: 'Wayfarer Styled Sunglasses',
//         colors: ['danger', 'success', 'dark'],
//         salePrice: 39.00,
//         mrp: 39.00,
//         sale: false,
//         rating: 3.8,
//         new: false,
//         status: 'archived',
//         inventory: 5,
//         category: 'Glasses',
//         images: [
//             {
//                 id: 1,
//                 image: EcommerceImg4
//             }
//         ],
//     },
//     {
//         id: 14,
//         name: 'Nike Black and White',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 79.00,
//         mrp: 79.00,
//         sale: false,
//         rating: 5.0,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: EcommerceImg9
//             }
//         ],
//     },
//     ,
//     {
//         id: 15,
//         name: 'White & Red Nike Athletic Shoe',
//         colors: ['danger', 'warning', 'dark'],
//         salePrice: 49.00,
//         mrp: 49.00,
//         sale: false,
//         rating: 5.0,
//         new: false,
//         status: 'active',
//         inventory: 5,
//         category: 'Shoe',
//         images: [
//             {
//                 id: 1,
//                 image: EcommerceImg1
//             }
//         ],
//     },

// ];

// const GKStepper3 = (props) => {
//     const { currentStep, steps } = props;
//     return (
//         <Fragment>
//             <div id="stepperForm" className="bs-stepper">
//                 <Card>
//                     <Card.Header>
//                         {/* Stepper Button */}
//                         <div className="bs-stepper-header p-0 bg-transparent" role="tablist">
//                             {steps.map((step) => {
//                                 return (
//                                     <Fragment key={step.id}>
//                                         <div className={step ${step.id === currentStep ? 'active' : ''}}>
//                                         <Button bsPrefix="step-trigger d-block bg-transparent border-0">
//                                             <span className={`bs-stepper-circle p-2 me-2 ${steps.length === step.id ? '' : 'step-line'} `} >
//                                                 {step.id}
//                                             </span>
//                                             <span className="bs-stepper-label">{step.title}</span>
//                                         </Button>
//                                     </div>
//                                         { steps.length === step.id ? '' : <div className="bs-stepper-line"></div> }
//                                     </Fragment>
//                         );
//                             })}
//                     </div>
//                 </Card.Header>
//                 <Card.Body>
//                     {/* Stepper content */}
//                     {steps[currentStep - 1].content}
//                 </Card.Body>
//             </Card>
//         </div>
//         </Fragment >
//     );
// };
// export default RistelCheckout