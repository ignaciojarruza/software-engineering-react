import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import * as serviceProfile from "../../services/auth-service";
import Tuits from "../tuits";
import { useNavigate } from "react-router-dom";

const MyTuits = () => {
  const [tuits, setTuits] = useState([]);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  useEffect(async () => {
    try {
      const user = await serviceProfile.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const findMyTuits = () =>
    service.findTuitsByUser("me")
      .then(tuits => setTuits(tuits));
  useEffect(findMyTuits, []);
  const deleteTuit = (tid) =>
    service.deleteTuit(tid)
      .then(findMyTuits);
  return(
    <Tuits tuits={tuits}
           deleteTuit={deleteTuit}/>
  );
};

export default MyTuits;