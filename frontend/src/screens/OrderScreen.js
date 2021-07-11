 import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PayPalButton } from 'react-paypal-button-v2'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserSubscription,payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'

function OrderScreen({ match, history }) {
    const orderId = match.params.id
    const dispatch = useDispatch()
    console.log(match.params.id)

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay,error:errorPay } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if (!loading && !error) {
        order.price = order.price
    }


    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AcUxrVfqbSH36k18pd_sTH2e6Q8CjLepK86iji-I6AXp-EBcqcZfZDiUFvCTal-5ESsDxLsFzT7gPy8p'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!userInfo) {
            history.push('/login')
        }

        if (!order || successPay || order._id !== Number(orderId)) {
            dispatch({ type: ORDER_PAY_RESET })         
            dispatch(getUserSubscription(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderId, successPay])


    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId,paymentResult))
    }


    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
    <div>
        <Row>
        <h1>Order: {order._id}</h1>
        <Col md={8}>
                <ListGroup variant='flush'>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>
                                Paid on {order.paidAt}<br/>
                                
                                Membership Details : From {order.paidAt} - To {order.endDate}
                            </Message>
                            
                        ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}

                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h4>Congratulations <a href={`mailto:${order.user.email}`}>
                                {order.user_details}
                            </a> you have become a Member!! </h4>
                    </ListGroup.Item> 

                    <ListGroup.Item>                           
                            <Row>
                                <Col>
                                    <h2>
                                        <Link to={`/subscriptions/${order.plan_name}`}>
                                            {order.plan_name}
                                        </Link>
                                    </h2>
                                </Col>

                                <Col md={4}>
                                <h2>
                                    ₹ {order.price}
                                </h2>
                                </Col>
                            </Row>                               
                    </ListGroup.Item>

                    {!order.isPaid && (
                                <ListGroup.Item>
                                            {loadingPay && <Loader />}

                                            {!sdkReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.price}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )} 
                                        </ListGroup.Item>
                                    )}
                </ListGroup>

            </Col>
        </Row>
        
    </div>
            )
}

export default OrderScreen