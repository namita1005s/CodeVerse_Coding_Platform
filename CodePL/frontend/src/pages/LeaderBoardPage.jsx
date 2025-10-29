import React, { useState, useEffect } from 'react';
import { Crown, Trophy, ArrowLeft, Medal, Users, RefreshCw, AlertCircle } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

const LeaderboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('advanced');

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('Fetching leaderboard...');
      const endpoint = viewMode === 'simple' ? '/leaderboard/simple' : '/leaderboard';
      console.log('Endpoint:', endpoint);

      const response = await axiosClient.get(endpoint);
      console.log('Full response:', response);
      console.log('Response data:', response.data);

      if (!response.data.success) {
        setError(`API Error: ${response.data.message || 'Failed to fetch leaderboard data'}`);
        return;
      }

      const userList = response.data.users || [];
      console.log('User list:', userList);

      const formattedUsers = userList.map(user => ({
        ...user,
        rank: user.rank || 0,
        problemsSolved: user.problemsSolved || 0,
        score: user.score || 0,
        firstName: user.firstName || 'Anonymous',
        email: user.email || user.emailId || '',
        totalSubmissions: user.totalSubmissions || 0,
        acceptedSubmissions: user.acceptedSubmissions || 0,
        joinDate: user.joinDate || user.createdAt
      }));

      setUsers(formattedUsers);
      
    } catch (err) {
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Unknown error occurred';
      setError(`Failed to fetch leaderboard: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [viewMode]);

  // Rest of your component remains the same...
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: 
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: 
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: 
        return <Medal className="w-6 h-6 text-orange-500" />;
      default: 
        return <span className="text-lg font-bold text-gray-600">{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white';
      case 2: return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
      case 3: return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white';
      default: return 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => window.history.back()} className="btn btn-ghost btn-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="join">
                <button
                  className={`join-item btn btn-sm ${viewMode === 'advanced' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('advanced')}
                >
                  Advanced
                </button>
                <button
                  className={`join-item btn btn-sm ${viewMode === 'simple' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setViewMode('simple')}
                >
                  Simple
                </button>
              </div>
              
              <button 
                onClick={fetchLeaderboard} 
                className="btn btn-ghost btn-sm"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {error && (
          <div className="alert alert-error mb-6">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
            <div className="flex gap-2 mt-2">
              <button onClick={fetchLeaderboard} className="btn btn-sm">Retry</button>
              <button onClick={() => setError('')} className="btn btn-ghost btn-sm">Dismiss</button>
            </div>
          </div>
        )}

        {/* Rest of your JSX remains the same */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {viewMode === 'advanced' ? 'Advanced Leaderboard' : 'Simple Leaderboard'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {users.length > 0 
                  ? `Ranking ${users.length} coders by performance`
                  : 'No data available'
                }
              </p>
            </div>
            
            {users.length > 0 && (
              <div className="flex gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-2xl text-green-600">{users[0]?.problemsSolved || 0}</div>
                  <div className="text-gray-500">Top Score</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-2xl text-blue-600">{users.length}</div>
                  <div className="text-gray-500">Total Coders</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {users.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="font-semibold text-center w-20">Rank</th>
                    <th className="font-semibold">Coder</th>
                    <th className="font-semibold text-center">Solved</th>
                    <th className="font-semibold text-center">Score</th>
                    {viewMode === 'advanced' && (
                      <>
                        <th className="font-semibold text-center">Submissions</th>
                        <th className="font-semibold text-center">Accuracy</th>
                      </>
                    )}
                    <th className="font-semibold text-center">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id || user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="text-center">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${getRankBadge(user.rank)}`}>
                          {getRankIcon(user.rank)}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-primary text-primary-content rounded-full w-12">
                              <span className="text-lg font-bold">
                                {user.firstName?.charAt(0).toUpperCase() || 'U'}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white">
                              {user.firstName}
                            </div>
                            {user.email && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="font-bold text-lg text-gray-900 dark:text-white">
                          {user.problemsSolved}
                        </span>
                      </td>
                      <td className="text-center">
                        <span className="font-bold text-lg text-purple-600 dark:text-purple-400">
                          {user.score}
                        </span>
                      </td>
                      {viewMode === 'advanced' && (
                        <>
                          <td className="text-center">
                            <div className="text-sm">
                              <div className="font-semibold text-green-600">{user.acceptedSubmissions}</div>
                              <div className="text-gray-500 text-xs">of {user.totalSubmissions}</div>
                            </div>
                          </td>
                          <td className="text-center">
                            <span className="font-bold text-green-600">
                              {user.totalSubmissions > 0 
                                ? `${Math.round((user.acceptedSubmissions / user.totalSubmissions) * 100)}%`
                                : '0%'
                              }
                            </span>
                          </td>
                        </>
                      )}
                      <td className="w-40">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${Math.min((user.problemsSolved / Math.max(users[0]?.problemsSolved, 1)) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 w-8">
                            {Math.round((user.problemsSolved / Math.max(users[0]?.problemsSolved, 1)) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : !error && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              There are no users to display on the leaderboard yet.
            </p>
            <button 
              onClick={fetchLeaderboard} 
              className="btn btn-primary"
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;