import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import { addOrder } from '../actions/orderActions'
import SubDate from '../components/SubDate'

function SelectedSubscriptionScreen({ match, Location, history }) {
    const subId = match.params.id

    const dispatch = useDispatch()

    const selectedSub = useSelector(state => state.selectedSub)
    const {subItem}  = selectedSub

    useEffect(() => {   
            if(subId){
                dispatch(addOrder(subId))
            }
    }, [dispatch, subId])

    const checkoutHandler = () => {
        history.push('/login?redirect=payment')
    }

    var today = new Date();
    console.log(today)

return (
    <div>
        <Link to='/' className='btn btn-light my-3'>
              Home
        </Link>
        <Row>
            <Col md={8}>
                <h1>Subscription Order Details</h1>   
                    <Row>
                        <Col md={2}>
                            <Image src={subItem.image} alt={subItem.name} fluid rounded />
                        </Col>
                        
                        <Col md={3}>
                            <Link 
                                to={`/subscription/${subItem.subscription}`}
                            >
                                <h4>{subItem.name}</h4>
                            </Link>
                        </Col>

                        <Col md={2}>
                            If not satisfied, you can Cancel anytime
                        </Col>
                    </Row>

                    <br/>
                    
                    <Row>
                        <Col md={2}>
                            Start Date:
                        </Col>
                        
                        <Col md={3}>                  
                        <SubDate date={today}/>                    
                        </Col>

                        <Col md={2}>
                            ₹ {subItem.price}
                        </Col>
                    </Row>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            onClick={checkoutHandler}
                        >
                            Proceed To Payment
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    </div>
    
)
}

export default SelectedSubscriptionScreen