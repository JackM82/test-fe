import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';
//paginazione
//vedi https://github.com/AdeleD/react-paginate
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css'; 

const UsersList = () => {
  
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [pageSize, setPageSize] = useState(2)

  const getUsers = async () => {
    try {
        const response = await fetch(`https://epiblog-jm.onrender.com/users?page=${page}&pageSize=${pageSize}`)
        const data = await response.json()
        //console.log(data)
        setData(data)
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    getUsers()
  },[page,pageSize])

  return (
    <Container className="m-5">
      <Row>
        <h1 className="text-center">Pagina Users</h1>
        <div className="my-3 d-flex">
          <h5>Links:</h5>
          <Link className="mx-3" to={"/"}>
            Home Page
          </Link>
        </div>
        <div>
          <ul>
            {data &&
              data.users?.map((user) => {
                //il "?"
                return <li key={user._id}>{user.userName}</li>;
              })}
          </ul> 
          <ResponsivePagination
            current={page}
            total={data.totalPages}
            onPageChange={setPage}
          />
        </div>
      </Row>
    </Container>
  );
}

export default UsersList


