import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginLoading, loginResponse, loginRequest } from '../Reducer/loginSlice';
import { Link } from 'react-router-dom';
import { Container, Row, Col} from "react-bootstrap";
import { Toast } from '../utilities/notification';
import { Toaster, toast } from 'react-hot-toast';

//post per login
const Login = () => {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })  

  const successToast = new Toast('Logged IN!')
  const errorToast = new Toast('Not Allowed!')
 
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const isLoading = useSelector(loginLoading);
  const response = useSelector(loginResponse)


  //rifatto con redux
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("loggedIn"));
  //   console.log('user')
  //   console.log(user)
  //   if (user && user.payload.email.length > 0) { //&& user?.email.length > 0
  //       navigate("../home", {replace:true})
  //   }
  // }, [navigate])

  const post = async (e) => {
    e.preventDefault();
    //rifatto con REDUX
    // try {
    //   const req = await fetch('http://localhost:5050/login',{
    //     method: 'POST',
    //     body: JSON.stringify(formData),
    //     headers: {
    //       "Content-Type": 'application/json',
    //     }
    //   })   
    //   const user = await req.json();   
    //   if (req.ok){
    //     localStorage.setItem('loggedIn', JSON.stringify(user))
    //     navigate('/Home')
    //   }
    //   return user;
    // } catch (error) {
    //   console.log(error)
    // }
    dispatch(loginRequest(formData))
    .then(()=>{
      if (localStorage.getItem("loggedIn")){
        successToast.success()
        setTimeout(()=>{
          navigate('/Home',{replace:true})
        }, 1500) } 
      else {
        errorToast.error()
        
      }   
    })
  }

  useEffect(()=>{
    localStorage.clear();
  },[])

  return (
    <>
      <Container className="m-5">
        <Row>
          <h1 className='text-center'>Pagina di Login</h1>
          <div className='my-3 d-flex'>
            <h5>Links:</h5>
            <Link className='mx-3' to={"/users"}>Users Page</Link>
          </div>
          <Form onSubmit={post}>
            <Form.Control
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              type="email"
              placeholder="insert email"
              className="my-2"
              aria-label="email"
            />
            <Form.Control
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              type="password"
              placeholder="insert password"
              className="my-2"
              aria-label="password"
            />
            <div><Toaster/></div>
            <Button type="Submit">Login</Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default Login