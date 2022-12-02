import React from "react";
import Tuits from "../tuits";
import * as service from "../../services/tuits-service";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const userId = useParams();
  const [tuits, setTuits] = useState([]);
  const [tuit, setTuit] = useState('');
  const [uid, setUid] = useState('');
  //const userId = uid;
  //need to remove my tuits to render all tuits
  const findTuits = () => {
    /* if(userId) {
      return service.findTuitsByUser(uid)
        .then(tuits => setTuits(tuits))
    } else {
      return service.findAllTuits()
        .then(tuits => setTuits(tuits))
    } */
    return service.findAllTuits().then(tuits => setTuits(tuits))
  }
  useEffect(() => {
    setUid(userId);
    let isMounted = true;
    findTuits()
    return () => {isMounted = false;}
  }, []);
  const createTuit = () => {
    console.log(uid.uid);
    const tuitFormatted = {tuit: tuit, postedBy: uid.uid, postedOn: Date.now()};
    service.createTuit(uid.uid, tuitFormatted)
          .then(findTuits)
  }
      
  const deleteTuit = (tid) =>
      service.deleteTuit(tid)
          .then(findTuits)
  return(
    <div className="ttr-home">
      <div className="border border-bottom-0">
        <h4 className="fw-bold p-2">Home Screen</h4>
        {
          uid &&
          <div className="d-flex">
            <div className="p-2">
              <img className="ttr-width-50px rounded-circle"
                   src="../images/nasa-logo.jpg"/>
            </div>
            <div className="p-2 w-100">
              <textarea
                  onChange={(e) =>
                      setTuit(e.target.value)}
                placeholder="What's happening?"
                className="w-100 border-0"></textarea>
              <div className="row">
                <div className="col-10 ttr-font-size-150pc text-primary">
                  <i className="fas fa-portrait me-3"></i>
                  <i className="far fa-gif me-3"></i>
                  <i className="far fa-bar-chart me-3"></i>
                  <i className="far fa-face-smile me-3"></i>
                  <i className="far fa-calendar me-3"></i>
                  <i className="far fa-map-location me-3"></i>
                </div>
                <div className="col-2">
                  <a onClick={createTuit}
                     className={`btn btn-primary rounded-pill fa-pull-right
                                  fw-bold ps-4 pe-4`}>
                    Tuit
                  </a>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Tuits tuits={tuits} deleteTuit={deleteTuit}/>
    </div>
  );
};
export default Home;