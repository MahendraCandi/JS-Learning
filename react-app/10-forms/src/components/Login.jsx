
// about form and submit button default behavior:
// by default a form will submit HTTP request to the server.
// this request will have a GET method.
// also the default behavior all the input will be sent as query parameter.
// the target server is the root of the domain.
export default function Login() {
  const submitHandler = (event) => {
    console.log("Submitted!");
  }

  return (
    <form>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button" onSubmit={submitHandler}>Login</button>
      </p>
    </form>
  );
}
