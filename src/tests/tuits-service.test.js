import {
  createTuit,
  deleteTuit,
  findTuitById,
  findAllTuits
} from "../services/tuits-service";
import { createUser, deleteUsersByUsername } from "../services/users-service";

describe('can create tuit with REST API', () => {
  const fan = {
    username: 'soccerfan234',
    password: 'messi',
    email: 'ronaldoisbad@fifa.com'
  }

  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(fan.username);
  });
  afterAll(() => {
    return deleteUsersByUsername(fan.username);
  });

  test('can insert new tuit with REST API', async () => {
    const fanAccount = await createUser(fan);

    const testTuit = {
      tuit: 'tuit content',
      postedBy: fanAccount.id_,
      postedOn: 'Dec 25, 2021'
    }

    const newTuit = await createTuit(fanAccount.id_, testTuit);

    expect(newTuit.tuit).toEqual(testTuit.tuit);
    //had to do delete tuit by id here because id is out of scope in afterall (I think)
    const status = await deleteTuit(newTuit.id);
  });
});

describe('can delete tuit wtih REST API', () => {
  const fan = {
    username: 'soccerfan234',
    password: 'messi',
    email: 'ronaldoisbad@fifa.com'
  }

  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(fan.username);
  });
  afterAll(() => {
    return deleteUsersByUsername(fan.username);
  });
  test('can delete tuit with REST API', async () => {
    const fanAccount = await createUser(fan);

    const testTuit = {
      tuit: 'tuit content',
      postedBy: fanAccount.id_,
      postedOn: 'Dec 25, 2021'
    }

    const newTuit = await createTuit(fanAccount.id_, testTuit);
    const status = await deleteTuit(newTuit.id);
    expect(status.deletedCount).toBeGreaterThanOrEqual(1);
  })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  const fan = {
    username: 'soccerfan234',
    password: 'messi',
    email: 'ronaldoisbad@fifa.com'
  }

  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(fan.username);
  });
  afterAll(() => {
    return deleteUsersByUsername(fan.username);
  });
  test('can retrieve a tuit by their primary key with rest api', async () => {
    const fanAccount = await createUser(fan);

    const testTuit = {
      tuit: 'tuit content',
      postedBy: fanAccount.id_,
      postedOn: 'Dec 25, 2021'
    }

    const newTuit = await createTuit(fanAccount.id_, testTuit);

    const existingTuit = await findTuitById(newTuit.id);

    expect(existingTuit.tuit).toEqual(newTuit.tuit);
  })

});

describe('can retrieve all tuits with REST API', () => {
  //For this test, i'll add two tuits to the server and check if the length is greater than or equal to two
  //and check if the tuits are the same 
  const fan1 = {
    username: 'soccerfan234',
    password: 'messi',
    email: 'ronaldoisbad@fifa.com'
  }
  const fan2 = {
    username: 'futsalah',
    password: 'ronaldo',
    email: 'messicool@fifa.com'
  }
  beforeAll(() => {
    // clean up before the test making sure the user doesn't already exist
    return deleteUsersByUsername(fan1.username);
  });
  afterAll(() => {
    return deleteUsersByUsername(fan2.username);
  });

  test('can retrieve all tuits with rest api', async () => {
    const fanAccount1 = await createUser(fan1);
    const fanAccount2 = await createUser(fan2);
    const testTuit1 = {
      tuit: 'ronaldo is the goat',
      postedBy: fanAccount1.id_,
      postedOn: 'Dec 25, 2021'
    }
    const testTuit2 = {
      tuit: 'messi is the goat',
      postedBy: fanAccount2.id_,
      postedOn: 'Dec 25, 2021'
    }
    const newTuit1 = await createTuit(fanAccount1.id_, testTuit1);
    const newTuit2 = await createTuit(fanAccount2.id_, testTuit2);

    const tuits = await findAllTuits();
    expect(tuits.length).toBeGreaterThanOrEqual(2);
    
  })
});