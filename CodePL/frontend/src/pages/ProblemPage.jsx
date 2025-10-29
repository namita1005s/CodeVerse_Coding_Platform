// import { useState, useEffect, useRef } from 'react';
// import { useForm } from 'react-hook-form';
// import Editor from '@monaco-editor/react';
// import { useParams } from 'react-router';
// import axiosClient from "../utils/axiosClient"
// import SubmissionHistory from "../components/SubmissionHistory"
// import ChatAi from '../components/ChatAi';
// import Editorial from '../components/Editorial';

// const langMap = {
//         cpp: 'C++',
//         java: 'Java',
//         javascript: 'JavaScript'
// };


// const ProblemPage = () => {
//   const [problem, setProblem] = useState(null);
//   const [selectedLanguage, setSelectedLanguage] = useState('javascript');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [runResult, setRunResult] = useState(null);
//   const [submitResult, setSubmitResult] = useState(null);
//   const [activeLeftTab, setActiveLeftTab] = useState('description');
//   const [activeRightTab, setActiveRightTab] = useState('code');
//   const editorRef = useRef(null);
//   let {problemId}  = useParams();

  

//   const { handleSubmit } = useForm();

//  useEffect(() => {
//     const fetchProblem = async () => {
//       setLoading(true);
//       try {
        
//         const response = await axiosClient.get(`/problem/problemById/${problemId}`);
       
        
//         const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;

//         setProblem(response.data);
        
//         setCode(initialCode);
//         setLoading(false);
        
//       } catch (error) {
//         console.error('Error fetching problem:', error);
//         setLoading(false);
//       }
//     };

//     fetchProblem();
//   }, [problemId]);

//   // Update code when language changes
//   useEffect(() => {
//     if (problem) {
//       const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage]).initialCode;
//       setCode(initialCode);
//     }
//   }, [selectedLanguage, problem]);

//   const handleEditorChange = (value) => {
//     setCode(value || '');
//   };

//   const handleEditorDidMount = (editor) => {
//     editorRef.current = editor;
//   };

//   const handleLanguageChange = (language) => {
//     setSelectedLanguage(language);
//   };

//   const handleRun = async () => {
//     setLoading(true);
//     setRunResult(null);
    
//     try {
//       const response = await axiosClient.post(`/submission/run/${problemId}`, {
//         code,
//         language: selectedLanguage
//       });

//       setRunResult(response.data);
//       setLoading(false);
//       setActiveRightTab('testcase');
      
//     } catch (error) {
//       console.error('Error running code:', error);
//       setRunResult({
//         success: false,
//         error: 'Internal server error'
//       });
//       setLoading(false);
//       setActiveRightTab('testcase');
//     }
//   };

//   const handleSubmitCode = async () => {
//     setLoading(true);
//     setSubmitResult(null);
    
//     try {
//         const response = await axiosClient.post(`/submission/submit/${problemId}`, {
//         code:code,
//         language: selectedLanguage
//       });

//        setSubmitResult(response.data);
//        setLoading(false);
//        setActiveRightTab('result');
      
//     } catch (error) {
//       console.error('Error submitting code:', error);
//       setSubmitResult(null);
//       setLoading(false);
//       setActiveRightTab('result');
//     }
//   };

//   const getLanguageForMonaco = (lang) => {
//     switch (lang) {
//       case 'javascript': return 'javascript';
//       case 'java': return 'java';
//       case 'cpp': return 'cpp';
//       default: return 'javascript';
//     }
//   };

//   const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//       case 'easy': return 'text-green-500';
//       case 'medium': return 'text-yellow-500';
//       case 'hard': return 'text-red-500';
//       default: return 'text-gray-500';
//     }
//   };

//   if (loading && !problem) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="h-screen flex bg-base-100">
//       {/* Left Panel */}
//       <div className="w-1/2 flex flex-col border-r border-base-300">
//         {/* Left Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button 
//             className={`tab ${activeLeftTab === 'description' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('description')}
//           >
//             Description
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'editorial' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('editorial')}
//           >
//             Editorial
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'solutions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('solutions')}
//           >
//             Solutions
//           </button>
//           <button 
//             className={`tab ${activeLeftTab === 'submissions' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('submissions')}
//           >
//             Submissions
//           </button>

//           <button 
//             className={`tab ${activeLeftTab === 'chatAI' ? 'tab-active' : ''}`}
//             onClick={() => setActiveLeftTab('chatAI')}
//           >
//             ChatAI
//           </button>


//         </div>

//         {/* Left Content */}
//         <div className="flex-1 overflow-y-auto p-6">
//           {problem && (
//             <>
//               {activeLeftTab === 'description' && (
//                 <div>
//                   <div className="flex items-center gap-4 mb-6">
//                     <h1 className="text-2xl font-bold">{problem.title}</h1>
//                     <div className={`badge badge-outline ${getDifficultyColor(problem.difficulty)}`}>
//                       {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
//                     </div>
//                     <div className="badge badge-primary">{problem.tags}</div>
//                   </div>

//                   <div className="prose max-w-none">
//                     <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                       {problem.description}
//                     </div>
//                   </div>

//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold mb-4">Examples:</h3>
//                     <div className="space-y-4">
//                       {problem.visibleTestCases.map((example, index) => (
//                         <div key={index} className="bg-base-200 p-4 rounded-lg">
//                           <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
//                           <div className="space-y-2 text-sm font-mono">
//                             <div><strong>Input:</strong> {example.input}</div>
//                             <div><strong>Output:</strong> {example.output}</div>
//                             <div><strong>Explanation:</strong> {example.explanation}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'editorial' && (
//                 <div className="prose max-w-none">
//                   <h2 className="text-xl font-bold mb-4">Editorial</h2>
//                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                     <Editorial secureUrl={problem.secureUrl} thumbnailUrl={problem.thumbnailUrl} duration={problem.duration}/>
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'solutions' && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">Solutions</h2>
//                   <div className="space-y-6">
//                     {problem.referenceSolution?.map((solution, index) => (
//                       <div key={index} className="border border-base-300 rounded-lg">
//                         <div className="bg-base-200 px-4 py-2 rounded-t-lg">
//                           <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
//                         </div>
//                         <div className="p-4">
//                           <pre className="bg-base-300 p-4 rounded text-sm overflow-x-auto">
//                             <code>{solution?.completeCode}</code>
//                           </pre>
//                         </div>
//                       </div>
//                     )) || <p className="text-gray-500">Solutions will be available after you solve the problem.</p>}
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'submissions' && (
//                 <div>
//                   <h2 className="text-xl font-bold mb-4">My Submissions</h2>
//                   <div className="text-gray-500">
//                     <SubmissionHistory problemId={problemId} />
//                   </div>
//                 </div>
//               )}

//               {activeLeftTab === 'chatAI' && (
//                 <div className="prose max-w-none">
//                   <h2 className="text-xl font-bold mb-4">CHAT with AI</h2>
//                   <div className="whitespace-pre-wrap text-sm leading-relaxed">
//                     <ChatAi problem={problem}></ChatAi>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="w-1/2 flex flex-col">
//         {/* Right Tabs */}
//         <div className="tabs tabs-bordered bg-base-200 px-4">
//           <button 
//             className={`tab ${activeRightTab === 'code' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('code')}
//           >
//             Code
//           </button>
//           <button 
//             className={`tab ${activeRightTab === 'testcase' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('testcase')}
//           >
//             Testcase
//           </button>
//           <button 
//             className={`tab ${activeRightTab === 'result' ? 'tab-active' : ''}`}
//             onClick={() => setActiveRightTab('result')}
//           >
//             Result
//           </button>
//         </div>

//         {/* Right Content */}
//         <div className="flex-1 flex flex-col">
//           {activeRightTab === 'code' && (
//             <div className="flex-1 flex flex-col">
//               {/* Language Selector */}
//               <div className="flex justify-between items-center p-4 border-b border-base-300">
//                 <div className="flex gap-2">
//                   {['javascript', 'java', 'cpp'].map((lang) => (
//                     <button
//                       key={lang}
//                       className={`btn btn-sm ${selectedLanguage === lang ? 'btn-primary' : 'btn-ghost'}`}
//                       onClick={() => handleLanguageChange(lang)}
//                     >
//                       {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Monaco Editor */}
//               <div className="flex-1">
//                 <Editor
//                   height="100%"
//                   language={getLanguageForMonaco(selectedLanguage)}
//                   value={code}
//                   onChange={handleEditorChange}
//                   onMount={handleEditorDidMount}
//                   theme="vs-dark"
//                   options={{
//                     fontSize: 14,
//                     minimap: { enabled: false },
//                     scrollBeyondLastLine: false,
//                     automaticLayout: true,
//                     tabSize: 2,
//                     insertSpaces: true,
//                     wordWrap: 'on',
//                     lineNumbers: 'on',
//                     glyphMargin: false,
//                     folding: true,
//                     lineDecorationsWidth: 10,
//                     lineNumbersMinChars: 3,
//                     renderLineHighlight: 'line',
//                     selectOnLineNumbers: true,
//                     roundedSelection: false,
//                     readOnly: false,
//                     cursorStyle: 'line',
//                     mouseWheelZoom: true,
//                   }}
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="p-4 border-t border-base-300 flex justify-between">
//                 <div className="flex gap-2">
//                   <button 
//                     className="btn btn-ghost btn-sm"
//                     onClick={() => setActiveRightTab('testcase')}
//                   >
//                     Console
//                   </button>
//                 </div>
//                 <div className="flex gap-2">
//                   <button
//                     className={`btn btn-outline btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleRun}
//                     disabled={loading}
//                   >
//                     Run
//                   </button>
//                   <button
//                     className={`btn btn-primary btn-sm ${loading ? 'loading' : ''}`}
//                     onClick={handleSubmitCode}
//                     disabled={loading}
//                   >
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeRightTab === 'testcase' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Test Results</h3>
//               {runResult ? (
//                 <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} mb-4`}>
//                   <div>
//                     {runResult.success ? (
//                       <div>
//                         <h4 className="font-bold">✅ All test cases passed!</h4>
//                         <p className="text-sm mt-2">Runtime: {runResult.runtime+" sec"}</p>
//                         <p className="text-sm">Memory: {runResult.memory+" KB"}</p>
                        
//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
//                               <div className="font-mono">
//                                 <div><strong>Input:</strong> {tc.stdin}</div>
//                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
//                                 <div><strong>Output:</strong> {tc.stdout}</div>
//                                 <div className={'text-green-600'}>
//                                   {'✓ Passed'}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold">❌ Error</h4>
//                         <div className="mt-4 space-y-2">
//                           {runResult.testCases.map((tc, i) => (
//                             <div key={i} className="bg-base-100 p-3 rounded text-xs">
//                               <div className="font-mono">
//                                 <div><strong>Input:</strong> {tc.stdin}</div>
//                                 <div><strong>Expected:</strong> {tc.expected_output}</div>
//                                 <div><strong>Output:</strong> {tc.stdout}</div>
//                                 <div className={tc.status_id==3 ? 'text-green-600' : 'text-red-600'}>
//                                   {tc.status_id==3 ? '✓ Passed' : '✗ Failed'}
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Run" to test your code with the example test cases.
//                 </div>
//               )}
//             </div>
//           )}

//           {activeRightTab === 'result' && (
//             <div className="flex-1 p-4 overflow-y-auto">
//               <h3 className="font-semibold mb-4">Submission Result</h3>
//               {submitResult ? (
//                 <div className={`alert ${submitResult.accepted ? 'alert-success' : 'alert-error'}`}>
//                   <div>
//                     {submitResult.accepted ? (
//                       <div>
//                         <h4 className="font-bold text-lg">🎉 Accepted</h4>
//                         <div className="mt-4 space-y-2">
//                           <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
//                           <p>Runtime: {submitResult.runtime + " sec"}</p>
//                           <p>Memory: {submitResult.memory + "KB"} </p>
//                         </div>
//                       </div>
//                     ) : (
//                       <div>
//                         <h4 className="font-bold text-lg">❌ {submitResult.error}</h4>
//                         <div className="mt-4 space-y-2">
//                           <p>Test Cases Passed: {submitResult.passedTestCases}/{submitResult.totalTestCases}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-gray-500">
//                   Click "Submit" to submit your solution for evaluation.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;


import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import { useParams, useNavigate } from 'react-router';
import axiosClient from "../utils/axiosClient"
import SubmissionHistory from "../components/SubmissionHistory"
import ChatAi from '../components/ChatAi';
import Editorial from '../components/Editorial';

const langMap = {
  cpp: 'C++',
  java: 'Java',
  javascript: 'JavaScript'
};

const ProblemPage = () => {
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState('description');
  const [activeRightTab, setActiveRightTab] = useState('code');
  const editorRef = useRef(null);
  let { problemId } = useParams();
  const navigate = useNavigate();

  const { handleSubmit } = useForm();

  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/problem/problemById/${problemId}`);
        const initialCode = response.data.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode || '';

        setProblem(response.data);
        setCode(initialCode);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching problem:', error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.startCode.find(sc => sc.language === langMap[selectedLanguage])?.initialCode || '';
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  const handleEditorChange = (value) => {
    setCode(value || '');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const handleRun = async () => {
    setLoading(true);
    setRunResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: selectedLanguage
      });

      setRunResult(response.data);
      setLoading(false);
      setActiveRightTab('testcase');
    } catch (error) {
      console.error('Error running code:', error);
      setRunResult({
        success: false,
        error: 'Internal server error'
      });
      setLoading(false);
      setActiveRightTab('testcase');
    }
  };

  const handleSubmitCode = async () => {
    setLoading(true);
    setSubmitResult(null);
    
    try {
      const response = await axiosClient.post(`/submission/submit/${problemId}`, {
        code: code,
        language: selectedLanguage
      });

      setSubmitResult(response.data);
      setLoading(false);
      setActiveRightTab('result');
    } catch (error) {
      console.error('Error submitting code:', error);
      setSubmitResult(null);
      setLoading(false);
      setActiveRightTab('result');
    }
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case 'javascript': return 'javascript';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'javascript';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'badge-success';
      case 'medium': return 'badge-warning';
      case 'hard': return 'badge-error';
      default: return 'badge-neutral';
    }
  };

  const getStatusIcon = (statusId) => {
    return statusId === 3 ? '✅' : '❌';
  };

  if (loading && !problem) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-base-100 overflow-hidden">
      {/* Left Panel - Problem Details */}
      <div className="w-1/2 flex flex-col border-r border-base-300 bg-base-50">
        {/* Enhanced Header */}
        <div className="bg-base-200 border-b border-base-300 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-base-content">{problem?.title}</h1>
              {problem && (
                <div className={`badge ${getDifficultyColor(problem.difficulty)} badge-lg font-semibold`}>
                  {problem.difficulty?.charAt(0).toUpperCase() + problem.difficulty?.slice(1)}
                </div>
              )}
            </div>
            {problem && (
              <div className="badge badge-primary badge-outline badge-lg">
                {problem.tags}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div className="tabs tabs-boxed bg-base-200 px-6 py-2 gap-2">
          {[
            { id: 'description', label: '📝 Description' },
            { id: 'editorial', label: '📚 Editorial' },
            { id: 'solutions', label: '💡 Solutions' },
            { id: 'submissions', label: '📊 Submissions' },
            { id: 'chatAI', label: '🤖 ChatAI' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab tab-lg font-medium transition-all duration-200 ${
                activeLeftTab === tab.id 
                  ? 'tab-active bg-primary text-primary-content shadow-sm' 
                  : 'hover:bg-base-300'
              }`}
              onClick={() => setActiveLeftTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-base-50">
          {problem && (
            <>
              {activeLeftTab === 'description' && (
                <div className="space-y-6">
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap text-base leading-relaxed text-base-content">
                      {problem.description}
                    </div>
                  </div>

                  <div className="bg-base-200 rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4 text-base-content flex items-center gap-2">
                      <span>📋</span> Examples
                    </h3>
                    <div className="space-y-4">
                      {problem.visibleTestCases.map((example, index) => (
                        <div key={index} className="bg-base-100 p-5 rounded-lg border border-base-300 shadow-sm">
                          <h4 className="font-semibold mb-3 text-base-content">Example {index + 1}</h4>
                          <div className="space-y-3 text-sm font-mono">
                            <div className="flex items-start gap-2">
                              <strong className="text-primary min-w-16">Input:</strong>
                              <code className="bg-base-300 px-2 py-1 rounded text-base-content">{example.input}</code>
                            </div>
                            <div className="flex items-start gap-2">
                              <strong className="text-primary min-w-16">Output:</strong>
                              <code className="bg-base-300 px-2 py-1 rounded text-base-content">{example.output}</code>
                            </div>
                            <div className="flex items-start gap-2">
                              <strong className="text-primary min-w-16">Explanation:</strong>
                              <span className="text-base-content">{example.explanation}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeLeftTab === 'editorial' && (
                <div className="bg-base-100 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 text-base-content">Editorial</h2>
                  <Editorial 
                    secureUrl={problem.secureUrl} 
                    thumbnailUrl={problem.thumbnailUrl} 
                    duration={problem.duration}
                  />
                </div>
              )}

              {activeLeftTab === 'solutions' && (
                <div className="bg-base-100 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 text-base-content">Solutions</h2>
                  <div className="space-y-4">
                    {problem.referenceSolution?.map((solution, index) => (
                      <div key={index} className="border border-base-300 rounded-lg overflow-hidden">
                        <div className="bg-primary text-primary-content px-4 py-3">
                          <h3 className="font-semibold">{problem?.title} - {solution?.language}</h3>
                        </div>
                        <div className="p-4 bg-base-200">
                          <pre className="bg-base-300 p-4 rounded-lg text-sm overflow-x-auto border border-base-300">
                            <code className="text-base-content">{solution?.completeCode}</code>
                          </pre>
                        </div>
                      </div>
                    )) || (
                      <div className="text-center py-8 text-base-content">
                        <div className="text-4xl mb-2">🔒</div>
                        <p>Solutions will be available after you solve the problem.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeLeftTab === 'submissions' && (
                <div className="bg-base-100 rounded-xl p-6">
                  <h2 className="text-xl font-bold mb-4 text-base-content">My Submissions</h2>
                  <SubmissionHistory problemId={problemId} />
                </div>
              )}

              {activeLeftTab === 'chatAI' && (
                <div className="bg-base-100 rounded-xl p-6 h-full">
                  <h2 className="text-xl font-bold mb-4 text-base-content">🤖 Chat with AI Assistant</h2>
                  <ChatAi problem={problem} />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Code Editor & Results */}
      <div className="w-1/2 flex flex-col bg-base-100">
        {/* Enhanced Right Tabs */}
        <div className="tabs tabs-boxed bg-base-200 px-6 py-2 gap-2">
          {[
            { id: 'code', label: '💻 Code' },
            { id: 'testcase', label: '🧪 Test Results' },
            { id: 'result', label: '📈 Submission' }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`tab tab-lg font-medium transition-all duration-200 ${
                activeRightTab === tab.id 
                  ? 'tab-active bg-primary text-primary-content shadow-sm' 
                  : 'hover:bg-base-300'
              }`}
              onClick={() => setActiveRightTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col">
          {activeRightTab === 'code' && (
            <div className="flex-1 flex flex-col">
              {/* Language Selector */}
              <div className="bg-base-200 px-6 py-3 border-b border-base-300">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {['javascript', 'java', 'cpp'].map((lang) => (
                      <button
                        key={lang}
                        className={`btn btn-sm capitalize transition-all duration-200 ${
                          selectedLanguage === lang 
                            ? 'btn-primary shadow-sm' 
                            : 'btn-ghost hover:bg-base-300'
                        }`}
                        onClick={() => handleLanguageChange(lang)}
                      >
                        {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Java'}
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-base-content opacity-70">
                    {selectedLanguage === 'cpp' ? 'C++' : selectedLanguage === 'javascript' ? 'JavaScript' : 'Java'}
                  </div>
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 border border-base-300 rounded-lg m-4 mb-0 overflow-hidden">
                <Editor
                  height="100%"
                  language={getLanguageForMonaco(selectedLanguage)}
                  value={code}
                  onChange={handleEditorChange}
                  onMount={handleEditorDidMount}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    insertSpaces: true,
                    wordWrap: 'on',
                    lineNumbers: 'on',
                    glyphMargin: false,
                    folding: true,
                    lineDecorationsWidth: 10,
                    lineNumbersMinChars: 3,
                    renderLineHighlight: 'line',
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    readOnly: false,
                    cursorStyle: 'line',
                    mouseWheelZoom: true,
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-base-300 bg-base-200">
                <div className="flex justify-between items-center">
                  {/* Home Button instead of Console Button */}
                  <button 
                    className="btn btn-ghost btn-sm hover:bg-base-300 flex items-center gap-2"
                    onClick={handleGoHome}
                  >
                    🏠 Homepage
                  </button>
                  <div className="flex gap-3">
                    <button
                      className={`btn btn-outline btn-md ${loading ? 'loading' : ''} hover:btn-warning`}
                      onClick={handleRun}
                      disabled={loading}
                    >
                      🚀 Run Code
                    </button>
                    <button
                      className={`btn btn-primary btn-md ${loading ? 'loading' : ''} hover:btn-secondary`}
                      onClick={handleSubmitCode}
                      disabled={loading}
                    >
                      📤 Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeRightTab === 'testcase' && (
            <div className="flex-1 p-6 overflow-y-auto bg-base-50">
              <h3 className="font-semibold text-xl mb-6 text-base-content flex items-center gap-2">
                <span>🧪</span> Test Results
              </h3>
              {runResult ? (
                <div className={`alert ${runResult.success ? 'alert-success' : 'alert-error'} shadow-lg mb-6`}>
                  <div className="w-full">
                    {runResult.success ? (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="text-2xl">✅</div>
                          <h4 className="font-bold text-lg">All test cases passed!</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                          <div className="bg-base-100 p-3 rounded-lg">
                            <span className="font-semibold">Runtime:</span> {runResult.runtime} sec
                          </div>
                          <div className="bg-base-100 p-3 rounded-lg">
                            <span className="font-semibold">Memory:</span> {runResult.memory} KB
                          </div>
                        </div>
                        <div className="space-y-3">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-base-100 p-4 rounded-lg border border-success/20">
                              <div className="font-mono text-sm space-y-2">
                                <div><strong>Input:</strong> {tc.stdin}</div>
                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                <div><strong>Output:</strong> {tc.stdout}</div>
                                <div className="text-success font-semibold flex items-center gap-2">
                                  ✅ Passed
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="text-2xl">❌</div>
                          <h4 className="font-bold text-lg">Test Results</h4>
                        </div>
                        <div className="space-y-3">
                          {runResult.testCases.map((tc, i) => (
                            <div key={i} className="bg-base-100 p-4 rounded-lg border border-error/20">
                              <div className="font-mono text-sm space-y-2">
                                <div><strong>Input:</strong> {tc.stdin}</div>
                                <div><strong>Expected:</strong> {tc.expected_output}</div>
                                <div><strong>Output:</strong> {tc.stdout}</div>
                                <div className={tc.status_id === 3 ? 'text-success font-semibold' : 'text-error font-semibold'}>
                                  {getStatusIcon(tc.status_id)} {tc.status_id === 3 ? 'Passed' : 'Failed'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-base-content opacity-70">
                  <div className="text-4xl mb-4">🧪</div>
                  <p className="text-lg">Click "Run Code" to test your solution</p>
                  <p className="text-sm mt-2">Your code will be tested against sample test cases</p>
                </div>
              )}
            </div>
          )}

          {activeRightTab === 'result' && (
            <div className="flex-1 p-6 overflow-y-auto bg-base-50">
              <h3 className="font-semibold text-xl mb-6 text-base-content flex items-center gap-2">
                <span>📈</span> Submission Result
              </h3>
              {submitResult ? (
                <div className={`alert ${submitResult.accepted ? 'alert-success' : 'alert-error'} shadow-lg`}>
                  <div className="w-full">
                    {submitResult.accepted ? (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-3xl">🎉</div>
                          <div>
                            <h4 className="font-bold text-xl">Accepted!</h4>
                            <p className="text-sm opacity-90">Your solution passed all test cases</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-base-100 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-success">{submitResult.passedTestCases}/{submitResult.totalTestCases}</div>
                            <div className="text-sm opacity-80">Test Cases</div>
                          </div>
                          <div className="bg-base-100 p-4 rounded-lg">
                            <div className="text-xl font-bold">{submitResult.runtime} sec</div>
                            <div className="text-sm opacity-80">Runtime</div>
                          </div>
                          <div className="bg-base-100 p-4 rounded-lg">
                            <div className="text-xl font-bold">{submitResult.memory} KB</div>
                            <div className="text-sm opacity-80">Memory</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-3xl">❌</div>
                          <div>
                            <h4 className="font-bold text-xl">{submitResult.error || 'Submission Failed'}</h4>
                            <p className="text-sm opacity-90">Some test cases didn't pass</p>
                          </div>
                        </div>
                        <div className="bg-base-100 p-4 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-bold">
                              {submitResult.passedTestCases}/{submitResult.totalTestCases} Test Cases Passed
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-base-content opacity-70">
                  <div className="text-4xl mb-4">📤</div>
                  <p className="text-lg">Click "Submit" to evaluate your solution</p>
                  <p className="text-sm mt-2">Your code will be tested against all hidden test cases</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;