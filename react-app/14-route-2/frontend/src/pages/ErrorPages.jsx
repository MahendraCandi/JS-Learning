import PageContent from "./PageContent";
import {useRouteError} from "react-router-dom";
import {FetchException} from "../utils/events-fetch";
import MainNavigation from "../components/MainNavigation";

const ErrorPages = () => {
  const exception = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (exception instanceof FetchException) {
    switch (exception.status) {
      case 404:
        title = "Not Found - 404";
        message = "The requested resource was not found.";
        break;
      case 500:
        title = "Internal Server Error - 500";
        message = exception.errorMessage;
        break;
    }
  }

  return (
    <>
      <MainNavigation/>
      <PageContent title={title}><p>{message}</p></PageContent>
    </>
  );
}

export default ErrorPages;
