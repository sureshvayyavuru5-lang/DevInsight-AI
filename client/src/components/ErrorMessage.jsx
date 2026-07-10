import "../styles/ErrorMessage.css";


function ErrorMessage({ message }) {

  return (

    <div className="error-box">

      <h3>❌ {message}</h3>

      <p>Please enter a valid GitHub username.</p>

    </div>

  );

}


export default ErrorMessage;