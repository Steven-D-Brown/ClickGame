import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    topScore: 0,
    currentScore: 0,
    shuffle: array => {
      var i = 0,
        j = 0,
        temp = null;

      for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
  };

  friendClicked = id => {
    console.log(this.state.friends.filter(item => item.id === id));
    if (this.state.friends.filter(item => item.id === id)[0].guessed) {

      this.setState({
        currentScore: 0,
        friends: this.state.friends.map(item => {
          item.guessed = false;
          return item;
        })
      });
    }
    else {
      let curScore = this.state.currentScore + 1;
      if (curScore > this.state.topScore)
        this.setState({ topScore: curScore });
      this.setState({
        currentScore: curScore,
        friends: this.state.friends.map(item => {
          if (item.id === id)
            item.guessed = true;
          return item;
        })

      });
    }
    this.setState({ friends: this.state.shuffle(friends) });
  };



  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    const navText = {
      color: "white",
      textAlign: "center",
      fontWeight: "bolder",
      fontFamily: "'Fjalla One', sans-serif",
      backgroundColor: "black",
      margin: "0px",
      padding: "10px",
      marginBottom: "5px"
    };

    const scoreText = {
      textAlign: "right",
      backgroundColor: "#ECEFF1",
      marginTop: "8px",
      marginBottom: "-3px",
      padding: "9px",
      fontFamily: "'Fjalla One', sans-serif",
      fontWeight: "bold",
      fontSize: "1.2em"
    }

    return (
      <div>
        <nav style={navText}>
          <h1 style={navText}>Clicking Memory Game</h1>
        </nav>
        <div style={scoreText}>Current Score: {this.state.currentScore}</div>
        <div style={scoreText}>High Score: {this.state.topScore}</div>
        <Wrapper>

          {this.state.friends.map(friend => (
            <FriendCard
              friendClicked={this.friendClicked}
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
            />
          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;
