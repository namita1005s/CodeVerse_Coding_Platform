

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Home, RefreshCw, Zap, Video, Settings, Users, Database, Shield } from 'lucide-react';
import { NavLink } from 'react-router';

function Admin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const adminOptions = [
    {
      id: 'create',
      title: 'Create Problem',
      description: 'Add a new coding challenge to CodEVerse platform',
      icon: Plus,
      color: 'btn-success',
      bgColor: 'bg-success/20',
      iconColor: 'text-success',
      route: '/admin/create'
    },
    {
      id: 'update',
      title: 'Update Problem',
      description: 'Edit existing challenges and their details',
      icon: Edit,
      color: 'btn-warning',
      bgColor: 'bg-warning/20',
      iconColor: 'text-warning',
      route: '/admin/update'
    },
    {
      id: 'delete',
      title: 'Delete Problem',
      description: 'Remove challenges from CodEVerse platform',
      icon: Trash2,
      color: 'btn-error',
      bgColor: 'bg-error/20',
      iconColor: 'text-error',
      route: '/admin/delete'
    },
    {
      id: 'video',
      title: 'Video Management',
      description: 'Upload and manage tutorial videos',
      icon: Video,
      color: 'btn-info',
      bgColor: 'bg-info/20',
      iconColor: 'text-info',
      route: '/admin/video'
    },
    {
      id: 'users',
      title: 'User Management',
      description: 'Manage CodEVerse users and their permissions',
      icon: Users,
      color: 'btn-primary',
      bgColor: 'bg-primary/20',
      iconColor: 'text-primary',
      route: '/admin/users'
    },
    
  ];

  const stats = [
    { label: 'Total Problems', value: '1,247', change: '+12%' },
    { label: 'Active Users', value: '8,542', change: '+8%' },
    { label: 'Videos Uploaded', value: '324', change: '+5%' },
    { label: 'Avg. Rating', value: '4.8/5', change: '+0.2' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            CodEVerse Admin Panel
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Manage and maintain the CodEVerse coding platform with powerful administrative tools
          </p>
        </div>

        {/* Admin Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {adminOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <NavLink
                key={option.id}
                to={option.route}
                className="block"
              >
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden">
                    <div className="card-body p-8">
                      {/* Icon with gradient background */}
                      <div className={`${option.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent size={28} className={option.iconColor} />
                      </div>
                      
                      {/* Title */}
                      <h2 className="card-title text-xl font-bold text-gray-900 dark:text-white mb-3 justify-center text-center">
                        {option.title}
                      </h2>
                      
                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                        {option.description}
                      </p>
                      
                      {/* Action Button */}
                      <div className="card-actions justify-center">
                        <button className={`btn ${option.color} btn-wide shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105`}>
                          Access {option.title.split(' ')[0]}
                          <IconComponent size={18} className="ml-2" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Hover effect line */}
                    <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"></div>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>

        {/* Quick Actions Footer */}
        <div className="max-w-6xl mx-auto mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Quick Actions
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Frequently used administrative functions
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
                <NavLink to="/" className="btn btn-outline btn-success btn-sm">
                  <Home size={16} className="mr-2" />
                  Back to Home
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="max-w-6xl mx-auto mt-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-4">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
              <div>
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  <strong>Security Notice:</strong> You are accessing the CodEVerse administrative panel. 
                  All actions are logged and monitored for security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;