
// about form and submit button default behavior:
// by default a form will submit HTTP request to the server.
// this request will have a GET method.
// also the default behavior all the input will be sent as query parameter.
// the target server is the root of the domain.
// to solve this problem we can:
// 1. change the type into button, because the default type is submit
// 2. add onSubmit attribute in tag form and pass event attribute to prevent default behaviour
export default function Login() {
  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Submitted!");
  }

  return (
    <form onSubmit={submitHandler}>
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
        <button className="button">Login</button>
      </p>
    </form>
  );
}
