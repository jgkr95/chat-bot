import { useState } from "react";
import SideBar from "./components/SideBar";
import Chat from "./components/Chat";
import store from "./redux/store"
import { Provider } from 'react-redux';
import Home from "./components/Home"
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

export default function App() {
	const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/:chatId",
      element: <Chat />,
    },
  ]);

	return (
    <Provider store={store}>
       <RouterProvider router={router} />
		</Provider>
	);
}
