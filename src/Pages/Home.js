import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { postsArray, postsResponse, postsLoading, getPosts,} from "../Reducer/postsSlice";
import { postsFilteredResponse, postsFilteredLoading, postsFilteredArray, getPostsFiltered } from "../Reducer/postsFilterSlice";
import { useSelector, useDispatch } from "react-redux";
import SingleCard from '../components/SingleCard'
import AddPostForm from "../forms/AddPostForm";
//paginazione
//vedi https://github.com/AdeleD/react-paginate
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
//importiamo hook useSession
import useSession from '../hook/useSession';

const Home = () => {
  const navigate = useNavigate();

  //filtro post
  const [filter, setFilter] = useState(false)

  //Logout
  const [logout, setLogout] = useState(null);
  const logoutBtn = () => {
    localStorage.clear(); //removeItem("loggedIn")
    setLogout(true);
  };

   const test = useSession();
  
  //REDUX
  const dispatch = useDispatch();
  const isLoading = useSelector(postsLoading);
  const allPosts = useSelector(postsArray);
  //console.log(allPosts)
  const isFilterLoading = useSelector(postsFilteredLoading);
  const allFilteredPosts = useSelector(postsFilteredArray);

  const handleFilter = () => {
    setFilter(!filter)
    //console.log(filter)
  }

  //paginazione
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const paramSlice = { page: page, pageSize: pageSize }
  const [paramFilter, setParamFilter] = useState(null)
  const [modalToggle, setModalToggle] = useState(false)

  const handlePageSize = (e) => {
    if (!e.target.value || e.target.value < 1) {
      setPageSize(10)
      return
    }
    setPageSize(Math.round(e.target.value))
  }

  const handleSearchFilter = (e) => {
    setParamFilter(e.target.value)
    //console.log(paramFilter)
  }

  useEffect(() => {
    dispatch(getPosts(paramSlice));
  }, [page, pageSize])

  //useEffect
  useEffect(() => {
    if (logout) {
      navigate("/", { replace: true });
    }
  },[logout]);

  useEffect(() => {
    if (!filter){
      dispatch(getPosts(paramSlice));
    }
  },[dispatch,filter]);

  useEffect(() => {
    if (filter) {
      if (!paramFilter){
        return
      }
      dispatch(getPostsFiltered(paramFilter))
    }
  }, [filter, paramFilter]);

  const addPostModal = () => {
    setModalToggle(!modalToggle)
  }

  return (
    <>
      {modalToggle && <AddPostForm close={addPostModal}/>}
      <Container className="my-3">
        <Row>
          <h1 className="text-center">Pagina HOME</h1>
          <h5 className="text-center">Pagina ad accesso protetto</h5>
          <div className="my-3 d-flex">
            <h5>Links:</h5>
            <Link className="mx-3" to={"/users"}>
              Users Page
            </Link>
            <div className="ms-auto">
              <Button className="mx-2" variant="danger" onClick={logoutBtn}>LOGOUT</Button>
              <Button className="mx-2" variant="primary" onClick={addPostModal}>AddPost</Button>
              <Button className="mx-2" variant={filter?"info":"secondary"} onClick={handleFilter}>{filter?"Filter ON":"Filter OFF"}</Button>
            </div>
          </div>
        </Row>
        <Row>
          {!filter && <div className="d-flex">
            <h5>Post per page:</h5>
            <input type="number" placeholder="6" onChange={handlePageSize}></input>
          </div>}
          {filter && <div className="d-flex">
            <h5>Filtro ricerca:</h5>
            <input type="text" placeholder="insert param filter" onChange={handleSearchFilter}></input>
          </div>}
        </Row>
      </Container>
      <Container className="my-3">
        <h5>Posts list</h5>              
        <Row>          
          {!filter && isLoading && <div>...Loading...</div>}
          {!filter && !isLoading &&
            allPosts.posts &&
            allPosts.posts.map((item) => {
              return (
                <Col className="mb-4" key={item._id}>
                  <SingleCard
                    title={item.title}
                    content={item.content}
                    author={item.author.name}
                    rate={item.rate}
                    img={item.img}
                  />
                </Col>
              );
            })}          
          {filter && isFilterLoading && <div>...Filter Loading...</div>}  
          {filter && !isFilterLoading && (!allFilteredPosts.postByTitle || !paramFilter )&& <div>...Inserire un filtro di ricerca...</div>}        
          {filter && !isFilterLoading && paramFilter &&
            allFilteredPosts.postByTitle &&
            allFilteredPosts.postByTitle.map((item) => {
              return (                               
                <Col className="mb-4" key={item._id}>
                  <SingleCard
                    title={item.title}
                    content={item.content}
                    author={item.author.name}
                    rate={item.rate}
                    img={item.img}
                  />
                </Col>
              );
            })}
        </Row>
      </Container>
      <Container className="my-3">
        <Row>
          <ResponsivePagination
            current={page}
            total={allPosts.totalPages}
            onPageChange={setPage}
          />
        </Row>
      </Container>
    </>
  );
};

export default Home;
