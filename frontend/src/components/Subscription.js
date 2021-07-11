import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Subscription({ subscription }) {

    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/subscription/${subscription._id}`}>
                <Card.Img src={subscription.image} />
            </Link>
        
            <Card.Body>
                <Link to={`/subscription/${subscription._id}`}>
                    <Card.Title>
                        <h3>
                            <strong>{subscription.name}</strong>
                        </h3>
                    </Card.Title>
                </Link>

                    {subscription.name =='Free'?(                   
                            <Card.Text as="h4">
                                Unlimited Duration <br/>
                                ₹ {subscription.price}                                   
                            </Card.Text>
                        ):(
                            <Card.Text as="h4">
                                {subscription.duration} days <br/>
                                ₹ {subscription.price}                                   
                            </Card.Text>
                        )}
            </Card.Body>
        </Card>
    )
}

export default Subscription
