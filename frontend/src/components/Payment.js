import React from 'react'
import { Card } from 'react-bootstrap'

function Payment({price}) {
    return (
        <div>
            <Card.Body>
                    <Card.Title>
                            <strong>{price}</strong>
                    </Card.Title>
            </Card.Body>
        </div>
    )
}

export default Payment

