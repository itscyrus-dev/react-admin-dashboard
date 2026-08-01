import { MotionConfig } from "motion/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </MotionConfig>
  );
}

export default App;
