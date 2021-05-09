import React from 'react';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Button } from 'react-bootstrap';

//frontend app uses localhost:3000 by default.
//The app will allow the user to display all game data.
//The suer will be able to enter new game information using a form
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.fetchData();
    // axios.get('http://localhost:3001/games').then(response => {
    //   console.log(response.data)
    //   this.setState({
    //     games: response.data
    //   })
    // })
  }

  fetchData() {
    axios.get('http://localhost:3001/games').then(response => {
      console.log(response.data)
      this.setState({
        games: response.data
      });
    });
  }

  //The line of code below is handler function that listens to the form being rendered in the browser. The axios.post below is how we send the data request from the frontend to the backend server.
  handleFormSubmit = (event) => {
    // event.preventDefault();
    let dataForServer = {
      platform: event.target.platform.value,
      game: event.target.game.value,
      genre: event.target.genre.value,
      stars: event.target.stars.value
    };
    console.log(dataForServer);
    axios.post('http://localhost:3001/games', dataForServer).then(responseData => {
      this.fetchData();
    //   let newGames = this.state.games;
    //   newGames.push(responseData.data);
    //   this.setState({
    //     games: newGames
    //   })
    // })
   });
  }

  handleDelete = (id) => {
    axios.delete(`http://localhost:3001/games/${id}`).then
    (responseData => {
      this.fetchData();
      // this.setState({
        //   games: this.state.games.filter(x => x._id !== id)
        // });
    })
  }

  render() {
    return (
      <div>
        <h1>Games!</h1>
        <Carousel>
          {this.state.games && this.state.games.map(game => (
            <Carousel.Item key={game._id}>
              <Carousel.Caption>
                <h2>{game.platform}</h2>
                <h3>{game.game}</h3>
                <h4>{game.genre}</h4>
                <p>Level {game.stars} on {game.date}</p>
                <Button onClick={() => this.handleDelete(game._id)}>Delete</Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
         <Form onSubmit={this.handleFormSubmit}> 
           <Form.Group controlId="formPlatform">
             <Form.Label>Platform</Form.Label>
             <Form.Control name="platform"/>
           </Form.Group>
           <Form.Group controlId="formGame">
             <Form.Label>Game</Form.Label>
             <Form.Control name="game" />
           </Form.Group>
           <Form.Group controlId="formGenre">
             <Form.Label>Genre</Form.Label>
             <Form.Control name="genre" />
           </Form.Group>
           <Form.Group controlId="formIntensity">
             <Form.Label>Stars</Form.Label>
             <Form.Control type="number" name="stars"/>
           </Form.Group>
           <Button type="submit">Submit</Button>
         </Form>
      </div>
      
    )
  }
}

export default App;

