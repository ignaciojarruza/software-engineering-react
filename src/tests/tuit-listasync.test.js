import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
        //This is a tuit I know is in my database
        //I wanted to isolate front-end so I used a tuit already in the database instead of inserting one.
        //If this were a more sensitive data, I would not undergoe thie quick 'hack'
    const linkElement = screen.getByText("Test tuit");
    expect(linkElement).toBeInTheDocument();
  })

  //had to move this test into another file because mocking would disrupt connection.