import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Edit, Trash2, Shield, Mail, Calendar, ArrowLeft, RefreshCw } from 'lucide-react';
import { NavLink } from 'react-router';
import axiosClient from '../utils/axiosClient'; // Your axios client

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch actual users from your backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axiosClient.get('/admin/users'); // Adjust endpoint as needed
      setUsers(response.data.users || response.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    try {
      await axiosClient.put(`/admin/users/${userId}/role`, { role: newRole });
      // Update local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ));
    } catch (err) {
      setError('Failed to update user role');
      console.error('Error updating role:', err);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axiosClient.delete(`/admin/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { color: 'badge-error', text: 'Admin' },
      user: { color: 'badge-success', text: 'User' }
    };
    const config = roleConfig[role] || { color: 'badge-neutral', text: role };
    return <span className={`badge ${config.color} badge-sm`}>{config.text}</span>;
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? <span className="badge badge-success badge-sm">Active</span>
      : <span className="badge badge-error badge-sm">Inactive</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <NavLink to="/admin" className="btn btn-ghost btn-sm mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back to Admin
          </NavLink>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                User Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Manage CodEVerse users, roles, and permissions
              </p>
            </div>
            <div className="flex gap-4">
              <button onClick={fetchUsers} className="btn btn-outline btn-sm">
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">Total Users</div>
                  <div className="stat-value">{users.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-error mb-6">
            <span>{error}</span>
            <button onClick={() => setError('')} className="btn btn-ghost btn-sm">×</button>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="input input-bordered flex items-center gap-2">
                <Search size={16} />
                <input
                  type="text"
                  className="grow"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>
            </div>
            <div className="flex gap-4">
              <select 
                className="select select-bordered"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button className="btn btn-primary">
                <Filter size={16} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="font-semibold">User</th>
                  <th className="font-semibold">Role</th>
                  <th className="font-semibold">Status</th>
                  <th className="font-semibold">Join Date</th>
                  <th className="font-semibold">Problems Solved</th>
                  <th className="font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-10">
                            <span className="text-xs">
                              {user.name?.split(' ').map(n => n[0]).join('') || 'U'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white">
                            {user.name || 'Unknown User'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Mail size={12} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select 
                        className="select select-bordered select-sm"
                        value={user.role}
                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>{getStatusBadge(user.status || 'active')}</td>
                    <td>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar size={12} />
                        {new Date(user.createdAt || user.joinDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {user.problemsSolved || 0}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button 
                          className="btn btn-ghost btn-sm btn-square text-error"
                          onClick={() => deleteUser(user._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="btn btn-ghost btn-sm btn-square text-info">
                          <Shield size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No users found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {users.length === 0 ? 'No users in the system' : 'Try adjusting your search or filter criteria'}
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="stats shadow bg-white dark:bg-gray-800">
            <div className="stat">
              <div className="stat-figure text-primary">
                <Users size={24} />
              </div>
              <div className="stat-title">Total Users</div>
              <div className="stat-value">{users.length}</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white dark:bg-gray-800">
            <div className="stat">
              <div className="stat-figure text-success">
                <Shield size={24} />
              </div>
              <div className="stat-title">Admins</div>
              <div className="stat-value">{users.filter(u => u.role === 'admin').length}</div>
            </div>
          </div>
          
          <div className="stats shadow bg-white dark:bg-gray-800">
            <div className="stat">
              <div className="stat-figure text-info">
                <Users size={24} />
              </div>
              <div className="stat-title">Regular Users</div>
              <div className="stat-value">{users.filter(u => u.role === 'user').length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;