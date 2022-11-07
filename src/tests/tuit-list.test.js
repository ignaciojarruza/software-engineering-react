import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";

jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  {tuit: "alice's tuit", postedBy: "alice"},
  {tuit: "bob's tuit", postedBy: "bob"},
  {tuit: "charlie's tuit", postedBy: "charlie"},
];

test('tuit list renders static tuit array', () => {
  render(
    <HashRouter>
      <Tuits tuits={MOCKED_TUITS}/>
    </HashRouter>);
  const linkElementAlice = screen.getByText("alice's tuit");
  const linkElementBob = screen.getByText("bob's tuit");
  const linkElementCharlie = screen.getByText("charlie's tuit");
  expect(linkElementAlice).toBeInTheDocument();
  expect(linkElementBob).toBeInTheDocument();
  expect(linkElementCharlie).toBeInTheDocument();
});

test('tuit list renders mocked', async () => {
  axios.get.mockImplementation(() => 
    Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
  const response = await findAllTuits();
  const tuits = response.tuits;

  render(
    <HashRouter>
      <Tuits tuits={tuits}/>
    </HashRouter>);
    const tuit1 = screen.getByText("alice's tuit");
    const tuit2 = screen.getByText("bob's tuit");
    const tuit3 = screen.getByText("charlie's tuit");
});
