import React,{useEffect} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import { Row,Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Subscription from '../components/Subscription'
import {listSubscriptions} from '../actions/subActions'



function Home() {
    const dispatch =useDispatch()
    const subList = useSelector(state => state.subList)
    const {error,loading,subscriptions} = subList

    useEffect(() => {
        dispatch(listSubscriptions())

    }, [])

    return (
            <div>
                {loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :<div>
                            <h1>Subscriptions</h1>
                            <Row>
                                {subscriptions.map(subscription => (
                                    <Col key={subscription._id} sm={12} md={6} xl={3}>
                                        <Subscription subscription={subscription} />
                                        
                                    </Col>
                                ))}
                            </Row>
                        </div>                   
                }
            </div>     
    )
}

export default Home
