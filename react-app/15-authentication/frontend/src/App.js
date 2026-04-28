import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage, {action as authenticationAction} from "./pages/Authentication";
import {action as logoutAction} from "./pages/Logout";
import {tokenLoader} from "./auth";
import {PrivateRoute} from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <PrivateRoute><EventDetailPage /></PrivateRoute>,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <PrivateRoute><EditEventPage /></PrivateRoute>,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <PrivateRoute><NewEventPage /></PrivateRoute>,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'auth',
        children: [
          {
            index: true,
            element: <AuthenticationPage />,
            action: authenticationAction,
          }
        ]
      },
      {
        path: 'logout',
        action: logoutAction
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
