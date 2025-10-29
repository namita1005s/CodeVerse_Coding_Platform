import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router';
import { Calendar, Clock, Users, Trophy, ArrowLeft, Play, Lock } from 'lucide-react';
import axiosClient from '../utils/axiosClient';

const ContestsPage = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get('/contests');
        setContests(data);
      } catch (error) {
        console.error('Error fetching contests:', error);
        // Mock data for demonstration
        setContests([
          {
            _id: '1',
            title: 'Weekly Coding Challenge',
            description: 'Test your skills with this week\'s coding challenges',
            startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
            duration: 120, // minutes
            participants: 245,
            status: 'upcoming',
            difficulty: 'medium'
          },
          {
            _id: '2',
            title: 'Algorithm Masters',
            description: 'Advanced algorithm challenges for experienced coders',
            startTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
            duration: 180,
            participants: 189,
            status: 'ongoing',
            difficulty: 'hard'
          },
          {
            _id: '3',
            title: 'Beginner\'s Arena',
            description: 'Perfect for those starting their coding journey',
            startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            duration: 90,
            participants: 512,
            status: 'completed',
            difficulty: 'easy'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      upcoming: { color: 'badge-info', text: 'Upcoming' },
      ongoing: { color: 'badge-success', text: 'Live' },
      completed: { color: 'badge-neutral', text: 'Completed' }
    };
    const config = statusConfig[status] || { color: 'badge-neutral', text: status };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const getDifficultyBadge = (difficulty) => {
    const difficultyConfig = {
      easy: { color: 'badge-success', text: 'Easy' },
      medium: { color: 'badge-warning', text: 'Medium' },
      hard: { color: 'badge-error', text: 'Hard' }
    };
    const config = difficultyConfig[difficulty] || { color: 'badge-neutral', text: difficulty };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <NavLink to="/" className="btn btn-ghost btn-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </NavLink>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contests</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coding Contests</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Participate in timed coding challenges and compete with other developers
          </p>
        </div>

        {/* Contests Grid */}
        <div className="grid gap-6">
          {contests.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No contests available
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Check back later for upcoming coding contests!
              </p>
            </div>
          ) : (
            contests.map((contest) => (
              <div key={contest._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {contest.title}
                      </h3>
                      {getStatusBadge(contest.status)}
                      {getDifficultyBadge(contest.difficulty)}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {contest.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Starts: {formatTime(contest.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {formatDuration(contest.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{contest.participants} participants</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {contest.status === 'upcoming' && (
                      <button className="btn btn-primary btn-outline">
                        <Clock className="w-4 h-4 mr-2" />
                        Register
                      </button>
                    )}
                    {contest.status === 'ongoing' && (
                      <NavLink to={`/contest/${contest._id}`} className="btn btn-success">
                        <Play className="w-4 h-4 mr-2" />
                        Join Now
                      </NavLink>
                    )}
                    {contest.status === 'completed' && (
                      <button className="btn btn-ghost" disabled>
                        <Lock className="w-4 h-4 mr-2" />
                        View Results
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestsPage;