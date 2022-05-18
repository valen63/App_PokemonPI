import "./Wait.css";

function Wait() {
    return (
      <div className="container" id="container">
        <img alt="" src="https://c.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif" className="img"/>
        <div className="preloader">
          <p>Loading...</p>
          <label className="waiting">Please wait while the pokemon's finish loading.</label>
        </div>
      </div>
    );
}
  
export default Wait;