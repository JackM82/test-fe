import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const singleCard = ({img,title,content,author,rate}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
            {content.slice(0,40)}
        </Card.Text>
        <Card.Text>author: {author}</Card.Text>
        <Card.Text>rate: {rate}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default singleCard