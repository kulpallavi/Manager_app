import React,{useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Row,Col,Image,ListGroup,Button,Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listSubscriptionsDetails} from '../actions/subActions'


const SubscriptionPlan = ({ match,history }) => {
    console.log(match)
    const dispatch = useDispatch()
    
    const subDetails = useSelector(state => state.subDetails)
    const {error,loading,subscription} = subDetails

    useEffect(() => {
        dispatch(listSubscriptionsDetails(match.params.id))

    }, [dispatch,match])

    const addToSubscribedHandler = () =>{
        console.log(match.params.id)
        history.push(`/selected/${match.params.id}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>
              Home
            </Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <Row>
                            <Col md={5}>
                                <Image 
                                    src={subscription.image} 
                                    alt={subscription.name} 
                                    fluid 
                                />
                            </Col> 
                
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{subscription.name}</h3>
                                    </ListGroup.Item>
            
                                    {subscription.name =='Free'?(
                                        <ListGroup.Item>
                                            <h3>Unlimited Duration</h3>
                                        </ListGroup.Item>                                     
                                    ) : (                       
                                        <ListGroup.Item>
                                            <h3>{subscription.duration} days</h3>
                                        </ListGroup.Item>                       
                                    )}
                                
                                    <ListGroup.Item>
                                        Price: ₹ {subscription.price}
                                    </ListGroup.Item>
            
                                    <ListGroup.Item>
                                        Description: {subscription.description}
                                    </ListGroup.Item>
            
                                    <ListGroup.Item>
                                        Features: {subscription.features}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
            
                            <Col md={2}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>₹{subscription.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
            
                                    <ListGroup.Item>
                                        <Button 
                                            onClick={addToSubscribedHandler}
                                            disabled={subscription.name =='Free'}
                                            className='btn-block' 
                                            type='button'>
                                            Subscribe Plan
                                        </Button>
                                    </ListGroup.Item>
            
                                </Card>
                            </Col>               
                        </Row>
                )}
            
        </div>
        
    )
}

export default SubscriptionPlan

