// import "./App.css";
// import { Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           {/* <Route index element={<Navigate to="/books" />} /> */}
//         </Route>
//       </Routes>
//     </>
//   );
// }

// export default App;


import { Outlet } from 'react-router-dom';

const App = () => {
  return <Outlet />;
};

export default App;

