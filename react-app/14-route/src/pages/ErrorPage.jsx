import MainNavigation from "../component/MainNavigation";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation/>
      <main className={classes.content}>
        <h1>Oops, the page is not found!</h1>
      </main>
    </>
  )
}

export default ErrorPage;
