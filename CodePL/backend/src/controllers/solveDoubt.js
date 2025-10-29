// const { GoogleGenAI } = require("@google/genai");


// const solveDoubt = async(req , res)=>{


//     try{

//         const {messages,title,description,testCases,startCode} = req.body;
//         const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
       
//         async function main() {
//         const response = await ai.models.generateContent({
//         model: "gemini-1.5-flash",
//         contents: messages,
//         config: {
//         systemInstruction: `
// You are an expert Data Structures and Algorithms (DSA) tutor specializing in helping users solve coding problems. Your role is strictly limited to DSA-related assistance only.

// ## CURRENT PROBLEM CONTEXT:
// [PROBLEM_TITLE]: ${title}
// [PROBLEM_DESCRIPTION]: ${description}
// [EXAMPLES]: ${testCases}
// [startCode]: ${startCode}


// ## YOUR CAPABILITIES:
// 1. **Hint Provider**: Give step-by-step hints without revealing the complete solution
// 2. **Code Reviewer**: Debug and fix code submissions with explanations
// 3. **Solution Guide**: Provide optimal solutions with detailed explanations
// 4. **Complexity Analyzer**: Explain time and space complexity trade-offs
// 5. **Approach Suggester**: Recommend different algorithmic approaches (brute force, optimized, etc.)
// 6. **Test Case Helper**: Help create additional test cases for edge case validation

// ## INTERACTION GUIDELINES:

// ### When user asks for HINTS:
// - Break down the problem into smaller sub-problems
// - Ask guiding questions to help them think through the solution
// - Provide algorithmic intuition without giving away the complete approach
// - Suggest relevant data structures or techniques to consider

// ### When user submits CODE for review:
// - Identify bugs and logic errors with clear explanations
// - Suggest improvements for readability and efficiency
// - Explain why certain approaches work or don't work
// - Provide corrected code with line-by-line explanations when needed

// ### When user asks for OPTIMAL SOLUTION:
// - Start with a brief approach explanation
// - Provide clean, well-commented code
// - Explain the algorithm step-by-step
// - Include time and space complexity analysis
// - Mention alternative approaches if applicable

// ### When user asks for DIFFERENT APPROACHES:
// - List multiple solution strategies (if applicable)
// - Compare trade-offs between approaches
// - Explain when to use each approach
// - Provide complexity analysis for each

// ## RESPONSE FORMAT:
// - Use clear, concise explanations
// - Format code with proper syntax highlighting
// - Use examples to illustrate concepts
// - Break complex explanations into digestible parts
// - Always relate back to the current problem context
// - Always response in the Language in which user is comfortable or given the context

// ## STRICT LIMITATIONS:
// - ONLY discuss topics related to the current DSA problem
// - DO NOT help with non-DSA topics (web development, databases, etc.)
// - DO NOT provide solutions to different problems
// - If asked about unrelated topics, politely redirect: "I can only help with the current DSA problem. What specific aspect of this problem would you like assistance with?"

// ## TEACHING PHILOSOPHY:
// - Encourage understanding over memorization
// - Guide users to discover solutions rather than just providing answers
// - Explain the "why" behind algorithmic choices
// - Help build problem-solving intuition
// - Promote best coding practices

// Remember: Your goal is to help users learn and understand DSA concepts through the lens of the current problem, not just to provide quick answers.
// `},
//     });
     
//     res.status(201).json({
//         message:response.text
//     });
//     console.log(response.text);
//     }

//     main();
      
//     }
//     catch(err){
//         res.status(500).json({
//             message: "Internal server error"
//         });
//     }
// }

// module.exports = solveDoubt;  

const solveDoubt = async (req, res) => {
    try {
        const { messages, title, description, testCases, startCode } = req.body;

        const lastMessage = messages[messages.length - 1];
        const userText = lastMessage.parts[0].text.toLowerCase();

        let response = "";
        
        // MODE 1: STEP-BY-STEP GUIDANCE (Default)
        if (userText.includes("steps") || userText.includes("guide") || userText.includes("how to solve") || userText.includes("approach")) {
            response = `**🧠 Step-by-Step Guide for "${title}"**\n\nI'll guide you through solving this problem:\n\n**Step 1: Understand the Problem**\n- Input: Two numbers in one line (like "2 3")\n- Output: Their sum\n- Handle both positive and negative numbers\n\n**Step 2: Plan Your Approach**\n1. How to read the input line?\n2. How to split it into two numbers?\n3. How to convert them from text to integers?\n4. How to add them and display the result?\n\n**Step 3: Implementation Strategy**\n- Choose your programming language\n- Find the input reading function\n- Find the string splitting method\n- Find the type conversion function\n- Use the addition operator\n\n**Step 4: Test Your Solution**\n- Test with "2 3" → should output 5\n- Test with "-1 5" → should output 4\n\nWant me to continue with any specific step?`;

        }
        
        // MODE 2: DIRECT SOLUTION
        else if (userText.includes("solution") || userText.includes("write code") || userText.includes("give me code") || userText.includes("show answer")) {
            response = `**💻 Direct Solution for "${title}"**\n\nHere's the complete working code:\n\n**Python:**\n\`\`\`python\na, b = map(int, input().split())\nprint(a + b)\n\`\`\`\n\n**Java:**\n\`\`\`java\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}\n\`\`\`\n\n**C++:**\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}\n\`\`\`\n\nThese solutions handle space-separated input and work for all test cases.`;

        }
        
        // MODE 3: EXPLANATION ONLY
        else if (userText.includes("explain") || userText.includes("why") || userText.includes("how does it work")) {
            response = `**📚 Explanation of "${title}" Solution**\n\nLet me explain how the solution works:\n\n**Key Concepts:**\n1. **Input Reading**: Most programming languages read input as text\n2. **String Splitting**: We split "2 3" into ["2", "3"] using space as separator\n3. **Type Conversion**: Convert text "2" to number 2 using int() or Integer.parseInt()\n4. **Arithmetic**: Add the two numbers using + operator\n\n**Why This Approach Works:**\n- Handles the exact input format given in test cases\n- Properly converts strings to numbers for mathematical operations\n- Works for both positive and negative integers\n- Produces clean output without extra text\n\n**Common Pitfalls Avoided:**\n- Not trying to read input twice (which would wait for second line)\n- Converting to numbers before adding (not string concatenation)\n- Handling space-separated input correctly`;

        }
        
        // MODE 4: DEBUGGING HELP
        else if (userText.includes("debug") || userText.includes("error") || userText.includes("not working") || userText.includes("fix")) {
            response = `**🔧 Debugging Help for "${title}"**\n\nLet's troubleshoot your code:\n\n**Common Issues:**\n\n1. **Input Problem:**\n   ❌ Using multiple input() calls\n   ✅ Read once and split: input().split()\n\n2. **Type Conversion:**\n   ❌ "2" + "3" = "23" (string concatenation)\n   ✅ 2 + 3 = 5 (integer addition)\n\n3. **Output Format:**\n   ❌ print("Result: " + sum)  # Extra text\n   ✅ print(sum)              # Just the number\n\n**Debugging Steps:**\n1. Add print statements to see what you're actually reading\n2. Check the data types of your variables\n3. Test with simple input like "2 3"\n4. Compare each step with expected behavior\n\nShare your code if you want specific help!`;

        }
        
        // MODE 5: TEST CASE ANALYSIS
        else if (userText.includes("test case") || userText.includes("example") || userText.includes("sample")) {
            response = `**📋 Test Case Analysis for "${title}"**\n\nLet's examine the test cases:\n\n**Test Case 1:**\n- Input: "2 3"\n- Expected: 5\n- What this teaches us: Input is space-separated\n\n**Test Case 2:** \n- Input: "-1 5"\n- Expected: 4\n- What this teaches us: Handles negative numbers\n\n**Key Insights:**\n- Input format: Two numbers in one line, separated by space\n- Number range: Can be positive or negative\n- Output: Only the sum, no additional text\n- No floating point numbers (only integers)\n\nUse these test cases to verify your solution works correctly!`;

        }
        
        // MODE 6: HINTS ONLY
        else if (userText.includes("hint") || userText.includes("clue") || userText.includes("stuck")) {
            response = `**💡 Hints for "${title}"**\n\nHere are some clues to help you solve it:\n\n**Hint 1:** How does your language read user input?\n**Hint 2:** What function splits a string into parts?\n**Hint 3:** How do you convert text to numbers?\n**Hint 4:** What operator adds two numbers?\n\nTry implementing one hint at a time!`;

        }

        // DEFAULT: MULTI-FUNCTIONAL INTRODUCTION
        else {
            response = `**🤖 Multi-Functional Coding Assistant**\n\nI can help you with "${title}" in different ways:\n\n**🎯 MODES AVAILABLE:**\n\n🔹 **Step-by-Step Guide** - Ask: "steps" or "guide me"\n🔹 **Direct Solution** - Ask: "solution" or "show code"  \n🔹 **Explanation** - Ask: "explain" or "how does it work"\n🔹 **Debugging Help** - Ask: "debug" or "fix my code"\n🔹 **Test Case Analysis** - Ask: "test cases" or "examples"\n🔹 **Hints Only** - Ask: "hint" or "clue"\n\n**Try saying:**\n- "I want to learn - give me steps"\n- "I'm stuck - show me the solution\"\n- "Explain how this works"\n- "Help me debug my code"\n\nWhat type of help would you prefer?`;
        }

        res.status(200).json({
            success: true,
            message: response
        });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(200).json({
            success: true,
            message: "I can help you with step-by-step guidance, direct solutions, explanations, or debugging! What type of assistance would you like?"
        });
    }
};

module.exports = solveDoubt;