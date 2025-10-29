import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import { 
  Code, 
  LogOut, 
  Settings, 
  User, 
  Filter, 
  Search, 
  Trophy, 
  Star, 
  TrendingUp, 
  CheckCircle2,
  PlayCircle,
  BarChart3,
  Shield,
  Crown,
  Calendar,
  GamepadIcon
} from 'lucide-react';

function Homepage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all' 
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/problemSolvedByUser');
        setSolvedProblems(data);
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    if (user) fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch = filters.status === 'all' || 
                      (filters.status === 'solved' && solvedProblems.some(sp => sp._id === problem._id)) ||
                      (filters.status === 'unsolved' && !solvedProblems.some(sp => sp._id === problem._id));
    const searchMatch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       problem.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return difficultyMatch && tagMatch && statusMatch && searchMatch;
  });

  const userStats = {
    totalSolved: solvedProblems.length,
    easySolved: solvedProblems.filter(p => p.difficulty === 'easy').length,
    mediumSolved: solvedProblems.filter(p => p.difficulty === 'medium').length,
    hardSolved: solvedProblems.filter(p => p.difficulty === 'hard').length,
    totalProblems: problems.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                CodEVerse
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLink 
                to="/leaderboard" 
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                <Crown className="w-5 h-5" />
                <span>Leaderboard</span>
              </NavLink>
              
              <NavLink 
                to="/contests" 
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 font-medium"
              >
                <Calendar className="w-5 h-5" />
                <span>Contests</span>
              </NavLink>
              
              <button 
                className="flex items-center space-x-2 text-gray-400 dark:text-gray-500 cursor-not-allowed font-medium"
                disabled
                title="Coming Soon"
              >
                <GamepadIcon className="w-5 h-5" />
                <span>Game</span>
                <span className="text-xs bg-yellow-500 text-white px-1.5 py-0.5 rounded-full">Soon</span>
              </button>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer">
                  <NavLink to="/profile" className="flex items-center space-x-3 no-underline">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {user.firstName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {user.firstName}
                    </span>
                  </NavLink>
                </div>
              )}
              
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle">
                  <Settings className="w-5 h-5" />
                </div>
                <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-box w-52 border border-gray-200 dark:border-gray-700">
                  {/* Profile Link in Dropdown */}
                  <li>
                    <NavLink to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400">
                      <User className="w-4 h-4" />
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <NavLink to="/admin" className="text-purple-600 hover:text-purple-700">
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-center space-x-6 py-4 border-t border-gray-200 dark:border-gray-700 mt-2">
            <NavLink 
              to="/leaderboard" 
              className="flex flex-col items-center space-y-1 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-xs"
            >
              <Crown className="w-5 h-5" />
              <span>Leaderboard</span>
            </NavLink>
            
            <NavLink 
              to="/contests" 
              className="flex flex-col items-center space-y-1 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200 text-xs"
            >
              <Calendar className="w-5 h-5" />
              <span>Contests</span>
            </NavLink>
            
            <button 
              className="flex flex-col items-center space-y-1 text-gray-400 dark:text-gray-500 cursor-not-allowed text-xs"
              disabled
              title="Coming Soon"
            >
              <GamepadIcon className="w-5 h-5" />
              <span>Game</span>
              <span className="text-xs bg-yellow-500 text-white px-1 py-0.5 rounded-full">Soon</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        {/* Welcome Section */}
        {user && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {user.firstName}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Continue your coding journey with new challenges and AI-powered learning.
            </p>
          </div>
        )}

        {/* Stats Overview */}
        {user && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Problems Solved</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userStats.totalSolved}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                  style={{ width: `${(userStats.totalSolved / userStats.totalProblems) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Easy</p>
                  <p className="text-2xl font-bold text-green-600">
                    {userStats.easySolved}
                  </p>
                </div>
                <Star className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Medium</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {userStats.mediumSolved}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Hard</p>
                  <p className="text-2xl font-bold text-red-600">
                    {userStats.hardSolved}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search problems by title or description..."
                  className="input input-bordered w-full pl-10 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select 
                className="select select-bordered bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="all">All Problems</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>

              <select 
                className="select select-bordered bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500"
                value={filters.difficulty}
                onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>

              <select 
                className="select select-bordered bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500"
                value={filters.tag}
                onChange={(e) => setFilters({...filters, tag: e.target.value})}
              >
                <option value="all">All Tags</option>
                <option value="array">Array</option>
                <option value="linkedList">Linked List</option>
                <option value="graph">Graph</option>
                <option value="dp">Dynamic Programming</option>
              </select>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="grid gap-4">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No problems found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filters to find more problems.
              </p>
            </div>
          ) : (
            filteredProblems.map(problem => (
              <div key={problem._id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="card-body p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h2 className="card-title text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300">
                        <NavLink to={`/problem/${problem._id}`} className="hover:no-underline">
                          {problem.title}
                        </NavLink>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                        {problem.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {solvedProblems.some(sp => sp._id === problem._id) && (
                        <div className="badge badge-success gap-2 px-3 py-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Solved
                        </div>
                      )}
                      <NavLink 
                        to={`/problem/${problem._id}`}
                        className="btn btn-primary btn-sm bg-gradient-to-r from-purple-600 to-blue-600 border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <PlayCircle className="w-4 h-4 mr-1" />
                        Solve
                      </NavLink>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)} gap-1 px-3 py-2 font-semibold`}>
                      {getDifficultyIcon(problem.difficulty)}
                      {problem.difficulty}
                    </div>
                    <div className="badge badge-info gap-1 px-3 py-2">
                      <Code className="w-3 h-3" />
                      {problem.tags}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const getDifficultyBadgeColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'badge-success text-white';
    case 'medium': return 'badge-warning text-white';
    case 'hard': return 'badge-error text-white';
    default: return 'badge-neutral';
  }
};

const getDifficultyIcon = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '⭐';
    case 'medium': return '🔥';
    case 'hard': return '💀';
    default: return '📝';
  }
};

export default Homepage;
// import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router'; // Fixed import
// import { useDispatch, useSelector } from 'react-redux';
// import axiosClient from '../utils/axiosClient';
// import { logoutUser } from '../authSlice';

// function Homepage() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const [problems, setProblems] = useState([]);
//   const [solvedProblems, setSolvedProblems] = useState([]);
//   const [filters, setFilters] = useState({
//     difficulty: 'all',
//     tag: 'all',
//     status: 'all' 
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/getAllProblem');
//         setProblems(data);
//       } catch (error) {
//         console.error('Error fetching problems:', error);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       try {
//         const { data } = await axiosClient.get('/problem/problemSolvedByUser');
//         setSolvedProblems(data);
//       } catch (error) {
//         console.error('Error fetching solved problems:', error);
//       }
//     };

//     fetchProblems();
//     if (user) fetchSolvedProblems();
//   }, [user]);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     setSolvedProblems([]); // Clear solved problems on logout
//   };

//   const filteredProblems = problems.filter(problem => {
//     const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
//     const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
//     const statusMatch = filters.status === 'all' || 
//                       solvedProblems.some(sp => sp._id === problem._id);
//     return difficultyMatch && tagMatch && statusMatch;
//   });

//   return (
//     <div className="min-h-screen bg-base-200">
//       {/* Navigation Bar */}
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1">
//           <NavLink to="/" className="btn btn-ghost text-xl">LeetCode</NavLink>
//         </div>
//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} className="btn btn-ghost">
//               {user?.firstName}
//             </div>
//             <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//               <li><button onClick={handleLogout}>Logout</button></li>
//               {user.role=='admin'&&<li><NavLink to="/admin">Admin</NavLink></li>}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="container mx-auto p-4">
//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6">
//           {/* New Status Filter */}
//           <select 
//             className="select select-bordered"
//             value={filters.status}
//             onChange={(e) => setFilters({...filters, status: e.target.value})}
//           >
//             <option value="all">All Problems</option>
//             <option value="solved">Solved Problems</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.difficulty}
//             onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
//           >
//             <option value="all">All Difficulties</option>
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>

//           <select 
//             className="select select-bordered"
//             value={filters.tag}
//             onChange={(e) => setFilters({...filters, tag: e.target.value})}
//           >
//             <option value="all">All Tags</option>
//             <option value="array">Array</option>
//             <option value="linkedList">Linked List</option>
//             <option value="graph">Graph</option>
//             <option value="dp">DP</option>
//           </select>
//         </div>

//         {/* Problems List */}
//         <div className="grid gap-4">
//           {filteredProblems.map(problem => (
//             <div key={problem._id} className="card bg-base-100 shadow-xl">
//               <div className="card-body">
//                 <div className="flex items-center justify-between">
//                   <h2 className="card-title">
//                     <NavLink to={`/problem/${problem._id}`} className="hover:text-primary">
//                       {problem.title}
//                     </NavLink>
//                   </h2>
//                   {solvedProblems.some(sp => sp._id === problem._id) && (
//                     <div className="badge badge-success gap-2">
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       Solved
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="flex gap-2">
//                   <div className={`badge ${getDifficultyBadgeColor(problem.difficulty)}`}>
//                     {problem.difficulty}
//                   </div>
//                   <div className="badge badge-info">
//                     {problem.tags}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// const getDifficultyBadgeColor = (difficulty) => {
//   switch (difficulty.toLowerCase()) {
//     case 'easy': return 'badge-success';
//     case 'medium': return 'badge-warning';
//     case 'hard': return 'badge-error';
//     default: return 'badge-neutral';
//   }
// };

// export default Homepage;