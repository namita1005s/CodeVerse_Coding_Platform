// 


import { useState, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submittedProblem/${problemId}`);
        
        // FIX: Handle different response formats
        let submissionsData = [];
        
        if (Array.isArray(response.data)) {
          // If response.data is already an array
          submissionsData = response.data;
        } else if (response.data && Array.isArray(response.data.submissions)) {
          // If response.data has a submissions property that's an array
          submissionsData = response.data.submissions;
        } else if (response.data && response.data.submissions === undefined) {
          // If response.data exists but no submissions property
          submissionsData = response.data;
        }
        
        // Ensure it's always an array
        if (!Array.isArray(submissionsData)) {
          submissionsData = [];
        }
        
        setSubmissions(submissionsData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch submission history');
        console.error('Error fetching submissions:', err);
        setSubmissions([]); // Ensure submissions is empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (problemId) {
      fetchSubmissions();
    }
  }, [problemId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'badge-success';
      case 'wrong': return 'badge-error';
      case 'error': return 'badge-warning';
      case 'pending': return 'badge-info';
      default: return 'badge-neutral';
    }
  };

  const formatMemory = (memory) => {
    if (!memory) return 'N/A';
    if (memory < 1024) return `${memory} kB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Add safe accessors for submission properties
  const getSubmissionProperty = (sub, property, defaultValue = 'N/A') => {
    return sub && sub[property] !== undefined ? sub[property] : defaultValue;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg my-4">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Submission History</h2>
      
      {!submissions || submissions.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>No submissions found for this problem</span>
          </div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Language</th>
                  <th>Status</th>
                  <th>Runtime</th>
                  <th>Memory</th>
                  <th>Test Cases</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, index) => (
                  <tr key={sub._id || index}>
                    <td>{index + 1}</td>
                    <td className="font-mono">{getSubmissionProperty(sub, 'language')}</td>
                    <td>
                      <span className={`badge ${getStatusColor(getSubmissionProperty(sub, 'status', 'pending'))}`}>
                        {getSubmissionProperty(sub, 'status', 'pending').charAt(0).toUpperCase() + getSubmissionProperty(sub, 'status', 'pending').slice(1)}
                      </span>
                    </td>
                    <td className="font-mono">{getSubmissionProperty(sub, 'runtime')}s</td>
                    <td className="font-mono">{formatMemory(getSubmissionProperty(sub, 'memory'))}</td>
                    <td className="font-mono">
                      {getSubmissionProperty(sub, 'testCasesPassed', 0)}/{getSubmissionProperty(sub, 'testCasesTotal', 0)}
                    </td>
                    <td>{formatDate(getSubmissionProperty(sub, 'createdAt'))}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline"
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        View Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </p>
        </>
      )}

      {/* Code View Modal */}
      {selectedSubmission && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl">
            <h3 className="font-bold text-lg mb-4">
              Submission Details: {getSubmissionProperty(selectedSubmission, 'language')}
            </h3>
            
            <div className="mb-4">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`badge ${getStatusColor(getSubmissionProperty(selectedSubmission, 'status', 'pending'))}`}>
                  {getSubmissionProperty(selectedSubmission, 'status', 'pending')}
                </span>
                <span className="badge badge-outline">
                  Runtime: {getSubmissionProperty(selectedSubmission, 'runtime', 'N/A')}s
                </span>
                <span className="badge badge-outline">
                  Memory: {formatMemory(getSubmissionProperty(selectedSubmission, 'memory'))}
                </span>
                <span className="badge badge-outline">
                  Passed: {getSubmissionProperty(selectedSubmission, 'testCasesPassed', 0)}/{getSubmissionProperty(selectedSubmission, 'testCasesTotal', 0)}
                </span>
              </div>
              
              {selectedSubmission.errorMessage && (
                <div className="alert alert-error mt-2">
                  <div>
                    <span>{selectedSubmission.errorMessage}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-gray-900 rounded p-4 max-h-96 overflow-auto">
              <pre className="text-gray-100 whitespace-pre-wrap">
                <code>{getSubmissionProperty(selectedSubmission, 'code', 'No code available')}</code>
              </pre>
            </div>
            
            <div className="modal-action">
              <button 
                className="btn"
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionHistory;