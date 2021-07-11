import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../actions/orderActions'
import { Link } from 'react-router-dom'

const PaymentScreen = ({history}) => {
    
    const selectedSub = useSelector(state => state.selectedSub)
    const {subItem}  = selectedSub
    
    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>
                Home
            </Link>
            <FormContainer>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                            <Col>
                                <Form.Check
                                    type='radio'
                                    label='PayPal   or  Credit Card'
                                    id='paypal'
                                    name='paymentMethod'
                                    checked
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                >
                                </Form.Check>
                            </Col>
                    </Form.Group>
                    <Button 
                        type='submit' 
                        variant='primary'
                    >
                        Continue
                    </Button>                 
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen