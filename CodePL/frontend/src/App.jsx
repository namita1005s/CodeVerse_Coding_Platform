// import { Routes, Route, Navigate } from "react-router";
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from "react";
// import { checkAuth } from "./authSlice";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Homepage from "./pages/Homepage";
// import LandingPage from "./pages/LandingPage";
// import ProblemPage from "./pages/ProblemPage";
// import Admin from "./pages/Admin";
// import AdminPanel from "./components/AdminPanel";
// import AdminVideo from "./components/AdminVideo";
// import AdminDelete from "./components/AdminDelete";
// import AdminUpload from "./components/AdminUpload";
// import AdminUserManagement from "./components/AdminUserManagement";
// import LeaderboardPage from "./pages/LeaderBoardPage";
// import ContestsPage from './pages/ContestsPage';
// import Loading from "./pages/loading";

// // import ProfilePage from "./pages/ProfilePage";

// function App() {
//   const dispatch = useDispatch();
//   const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   const isAdmin = isAuthenticated && user?.role === 'admin';

//   return (
//     <Routes>
//       <Route 
//         path="/" 
//         element={isAuthenticated ? <Homepage /> : <LandingPage />} 
//       />
      
//       <Route 
//         path="/login" 
//         element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
//       />
//       <Route 
//         path="/signup" 
//         element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} 
//       />
      
//       <Route 
//         path="/problem/:problemId" 
//         element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" replace />} 
//       />
      
//       {/* Profile Route - Added
//       <Route 
//         path="/profile" 
//         element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />} 
//       />
//        */}
//       {/* Admin Routes */}
//       <Route 
//         path="/admin" 
//         element={isAdmin ? <Admin /> : <Navigate to="/" replace />} 
//       />
//       <Route 
//         path="/admin/create" 
//         element={isAdmin ? <AdminPanel /> : <Navigate to="/" replace />} 
//       />
//       <Route 
//         path="/admin/delete" 
//         element={isAdmin ? <AdminDelete /> : <Navigate to="/" replace />} 
//       />
//       <Route 
//         path="/admin/video" 
//         element={isAdmin ? <AdminVideo /> : <Navigate to="/" replace />} 
//       />
//       <Route 
//         path="/admin/upload/:problemId" 
//         element={isAdmin ? <AdminUpload /> : <Navigate to="/" replace />} 
//       />
//       <Route 
//         path="/admin/users" 
//         element={isAdmin ? <AdminUserManagement /> : <Navigate to="/" replace />} 
//       />
//       <Route 
//   path="/leaderboard" 
//   element={isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login" replace />} 
// />
// <Route 
//   path="/contests" 
//   element={isAuthenticated ? <ContestsPage /> : <Navigate to="/login" replace />} 
// />
      
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

// export default App;

// // import {Routes, Route ,Navigate} from "react-router";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import Homepage from "./pages/Homepage";
// // import { useDispatch, useSelector } from 'react-redux';
// // import { checkAuth } from "./authSlice";
// // import { useEffect } from "react";
// // import AdminPanel from "./components/AdminPanel";
// // import ProblemPage from "./pages/ProblemPage"
// // import LandingPage from "./pages/LandingPage";
// // import Admin from "./pages/Admin";
// // import AdminVideo from "./components/AdminVideo"
// // import AdminDelete from "./components/AdminDelete"
// // import AdminUpload from "./components/AdminUpload"

// // function App(){
  
// //   const dispatch = useDispatch();
// //   const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

// //   // check initial authentication
// //   useEffect(() => {
// //     dispatch(checkAuth());
// //   }, [dispatch]);
  
// //   if (loading) {
// //     return <div className="min-h-screen flex items-center justify-center">
// //       <span className="loading loading-spinner loading-lg"></span>
// //     </div>;
// //   }

// //   return(
// //   <>
// //     <Routes>
       
// //           <Route
// //             path="/"
// //             element={isAuthenticated ? <HomePage /> : <LandingPage />}</Route>
// //       <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
// //       <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
// //       <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
// //       <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
// //       <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
// //       <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
// //       <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
// //       <Route path="/admin/upload/:problemId" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
// //       <Route path="/problem/:problemId" element={<ProblemPage/>}></Route>
      
// //     </Routes>
// //   </>
// //   )
// // }

// // export default App;

import { Routes, Route, Navigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { checkAuth } from "./authSlice";

// Pages & Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import ProblemPage from "./pages/ProblemPage";
import Admin from "./pages/Admin";
import AdminPanel from "./components/AdminPanel";
import AdminVideo from "./components/AdminVideo";
import AdminDelete from "./components/AdminDelete";
import AdminUpload from "./components/AdminUpload";
import AdminUserManagement from "./components/AdminUserManagement";
import LeaderboardPage from "./pages/LeaderBoardPage";
import ContestsPage from './pages/ContestsPage';
import Loading from "./pages/loading"; // ✅ Corrected import (capital L)

// import ProfilePage from "./pages/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // ✅ Show your custom Loading animation instead of plain spinner
  if (loading) {
    return <Loading />;
  }

  const isAdmin = isAuthenticated && user?.role === 'admin';

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Homepage /> : <LandingPage />} 
      />

      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />

      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Signup />} 
      />

      <Route 
        path="/problem/:problemId" 
        element={isAuthenticated ? <ProblemPage /> : <Navigate to="/login" replace />} 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={isAdmin ? <Admin /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/admin/create" 
        element={isAdmin ? <AdminPanel /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/admin/delete" 
        element={isAdmin ? <AdminDelete /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/admin/video" 
        element={isAdmin ? <AdminVideo /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/admin/upload/:problemId" 
        element={isAdmin ? <AdminUpload /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/admin/users" 
        element={isAdmin ? <AdminUserManagement /> : <Navigate to="/" replace />} 
      />

      <Route 
        path="/leaderboard" 
        element={isAuthenticated ? <LeaderboardPage /> : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/contests" 
        element={isAuthenticated ? <ContestsPage /> : <Navigate to="/login" replace />} 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
