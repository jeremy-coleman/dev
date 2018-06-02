// outside your component class
function increaseScore (state, props) {
  return {score : state.score + 1}
}
class User{
  ...
// inside your component class
  handleIncreaseScore () {
    this.setState( increaseScore)
  }
  ...
}


