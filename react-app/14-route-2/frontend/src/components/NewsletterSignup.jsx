import classes from './NewsletterSignup.module.css';
import {useFetcher} from "react-router-dom";
import {useEffect} from "react";

function NewsletterSignup() {
  // useFetcher() hook very useful if we want to execute a form without trigger a navigation.
  // Example, if we submit NewsletterSignup from MainNavigation then we don't have go to page /newsletter after submit.
  // Without fetcher.Form, the original Form will trigger a navigation after submit.
  // useFetcher will by passed the navigation, feels like the submit running in background.
  const fetcher = useFetcher();
  const {data, state} = fetcher;

  useEffect(() => {
    if (state === "idle" && data?.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form action={"/newsletter"} method="post" className={classes.newsletter}>
      <input
        type="email"
        name="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
        required
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
