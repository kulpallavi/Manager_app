import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row,Form,Button } from 'react-bootstrap'
import { createOrder, getUserSubscription } from '../actions/orderActions'
import Message from '../components/Message'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function BecomePro({history}) {
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate


    const selectedSub = useSelector(state => state.selectedSub)
    const {subItem,paymentMethod}  = selectedSub
    const subname=subItem.name

    if (!selectedSub.paymentMethod) {
        history.push('/payment')
    }

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, history])

    const placeOrder = () =>{
        dispatch(createOrder(subname,paymentMethod))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>
              Home
            </Link>
            <h1> Why Become Pro ? </h1>
            <p>Member Splash provides all key membership management functionality for your swim club. 
                Our system will save you time, save you money and ensure your club captures the revenues it deserves.
                Member Splash is the only membership platform that is built specifically for swim clubs.  
                We understand and support the unique pricing structures, account types and club rules you work with.
                swim clubs in over 20 states choose Member Splash to manage their club memberships</p>
            <Row>
                <Form method="post">
                    <label>Membership Type</label>
                    <br/>
                    <Button
                        type='button'
                        className='btn-block'
                        onClick= {placeOrder}
                    >
                        Pay ₹ {subItem.price}
                    </Button>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    
                </Form>
            </Row>
        </div>
    )
}

export default BecomePro

