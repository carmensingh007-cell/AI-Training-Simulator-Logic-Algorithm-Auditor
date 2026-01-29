/* THE DATA ENGINE 
  Contains 20 technical scenarios designed to demonstrate breadth of knowledge
  (Algorithms, Security, React, SQL, Python, Logic)
*/
const scenarios = [
  {
    id: 1,
    category: "Time Complexity",
    prompt: "Write a function to find two numbers in an array that add up to a target.",
    badCode: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j && nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
}`,
    critique: "The provided solution uses nested loops, resulting in O(n²) time complexity. This will timeout on large datasets.",
    goodCode: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}`,
    reasoning: "Using a Hash Map allows us to check for the complement in O(1) time, reducing the total complexity to O(n)."
  },
  {
    id: 2,
    category: "Recursion Risk",
    prompt: "Calculate the Nth Fibonacci number.",
    badCode: `function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}`,
    critique: "This recursive approach re-calculates the same values repeatedly, leading to exponential time complexity O(2^n). It will crash the browser for n > 40.",
    goodCode: `function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
    reasoning: "Implementing Memoization (caching results) ensures we only calculate each number once, reducing complexity to O(n)."
  },
  {
    id: 3,
    category: "Security (SQL)",
    prompt: "Create a query to fetch a user by name based on input.",
    badCode: `const query = "SELECT * FROM users WHERE name = '" + userName + "'";`,
    critique: "Catastrophic Security Vulnerability. This code is susceptible to SQL Injection. A user input of \"' OR '1'='1\" would dump the entire database.",
    goodCode: `const query = "SELECT * FROM users WHERE name = ?";
db.execute(query, [userName]);`,
    reasoning: "Always use Parameterized Queries (Prepared Statements). The database engine treats the input as data, not executable code."
  },
  {
    id: 4,
    category: "React.js",
    prompt: "Fetch data when the component loads.",
    badCode: `useEffect(() => {
  fetchData().then(data => setData(data));
}); // Missing dependency array`,
    critique: "The `useEffect` hook is missing the dependency array. This causes the effect to run on *every* render, creating an infinite loop of fetching and re-rendering.",
    goodCode: `useEffect(() => {
  fetchData().then(data => setData(data));
}, []); // Empty array runs only on mount`,
    reasoning: "Adding the empty dependency array `[]` ensures the effect runs only once when the component mounts."
  },
  {
    id: 5,
    category: "Floating Point Math",
    prompt: "Check if the user has exactly $0.30 in their wallet.",
    badCode: `let wallet = 0.10 + 0.20;
if (wallet === 0.30) {
  grantAccess();
}`,
    critique: "Standard floating-point precision error. In binary floating point, 0.1 + 0.2 results in 0.30000000000000004, so the check fails.",
    goodCode: `let wallet = 0.10 + 0.20;
if (Math.abs(wallet - 0.30) < Number.EPSILON) {
  grantAccess();
}`,
    reasoning: "Never compare floats directly. Use an epsilon threshold or convert to integers (cents) before adding."
  },
  {
    id: 6,
    category: "Performance (DOM)",
    prompt: "Add 1000 items to a list.",
    badCode: `const list = document.getElementById('ul');
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.innerText = 'Item ' + i;
  list.appendChild(item);
}`,
    critique: "This causes a 'Reflow' and 'Repaint' of the DOM 1000 times, which is highly inefficient and creates UI lag.",
    goodCode: `const list = document.getElementById('ul');
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const item = document.createElement('li');
  item.innerText = 'Item ' + i;
  fragment.appendChild(item);
}
list.appendChild(fragment);`,
    reasoning: "Using a `DocumentFragment` batches all changes into a single DOM update, significantly improving rendering performance."
  },
  {
    id: 7,
    category: "Async Logic",
    prompt: "Download 3 files sequentially.",
    badCode: `async function downloadAll() {
  await download('file1');
  await download('file2');
  await download('file3');
}`,
    critique: "The files are independent but are being downloaded one by one (Waterfall effect). This is unnecessary waiting.",
    goodCode: `async function downloadAll() {
  await Promise.all([
    download('file1'), 
    download('file2'), 
    download('file3')
  ]);
}`,
    reasoning: "`Promise.all` executes the requests in parallel, reducing total wait time to the duration of the slowest request."
  },
  {
    id: 8,
    category: "Python Mutable Args",
    prompt: "Python: Function to add a student to a class list.",
    badCode: `def add_student(student, class_list=[]):
    class_list.append(student)
    return class_list`,
    critique: "In Python, default arguments are evaluated only once at definition time. All calls to this function will share the *same* list.",
    goodCode: `def add_student(student, class_list=None):
    if class_list is None:
        class_list = []
    class_list.append(student)
    return class_list`,
    reasoning: "Using `None` as the default and initializing the list inside the function ensures a new list is created for every call."
  },
  {
    id: 9,
    category: "Object Reference",
    prompt: "Create a copy of the user settings object.",
    badCode: `const original = { theme: 'dark', notifs: { email: true } };
const copy = original;
copy.theme = 'light'; // Oops, this changes original too`,
    critique: "Assigning objects only copies the *reference*, not the data. Modifying the copy mutates the original.",
    goodCode: `const copy = JSON.parse(JSON.stringify(original));
// Or structuredClone(original) in modern browsers`,
    reasoning: "We need a 'Deep Copy' to break the reference link. `structuredClone` or JSON parsing creates a totally new object in memory."
  },
  {
    id: 10,
    category: "CSS Layout",
    prompt: "Center a div horizontally and vertically.",
    badCode: `.container { position: relative; }
.box {
  position: absolute;
  top: 50%; left: 50%;
  /* Missing translation */
}`,
    critique: "Setting top/left to 50% puts the *top-left corner* of the box in the center, not the center of the box.",
    goodCode: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
    reasoning: "Flexbox is the modern, robust standard for alignment. It handles variable content sizes automatically."
  },
  {
    id: 11,
    category: "RegEx Security",
    prompt: "Validate a user email address via Regex.",
    badCode: `const regex = /^([a-zA-Z0-9]+)*$/;`,
    critique: "Catastrophic ReDoS (Regular Expression Denial of Service). The nested quantifiers `+` and `*` create exponential backtracking on failing inputs.",
    goodCode: `// Use a standard library or simple non-nested regex
const regex = /^[a-zA-Z0-9]+$/;`,
    reasoning: "Evil Regex patterns can allow attackers to freeze your server CPU by sending a carefully crafted string (e.g., 'aaaaaaaaa!')."
  },
  {
    id: 12,
    category: "Array Logic",
    prompt: "Sort an array of numbers: [10, 2, 5].",
    badCode: `const nums = [10, 2, 5];
nums.sort(); // Result: [10, 2, 5]`,
    critique: "JavaScript's default `sort()` converts elements to strings. '10' comes before '2' in ASCII order.",
    goodCode: `nums.sort((a, b) => a - b);`,
    reasoning: "You must provide a comparator function to perform numeric sorting instead of lexicographical sorting."
  },
  {
    id: 13,
    category: "React State",
    prompt: "Increment a counter 3 times.",
    badCode: `const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}`,
    critique: "State updates in React are batched. `count` in this scope doesn't update immediately, so all 3 calls use the old value.",
    goodCode: `const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
}`,
    reasoning: "Using the functional update form `setCount(prev => ...)` ensures you are working with the latest pending state."
  },
  {
    id: 14,
    category: "Algorithms (Search)",
    prompt: "Find an item in a sorted list.",
    badCode: `function find(arr, val) {
  for(let x of arr) { // O(n)
    if(x === val) return true;
  }
}`,
    critique: "Linear search is inefficient for sorted data. We are not leveraging the fact that the data is already sorted.",
    goodCode: `function binarySearch(arr, val) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === val) return true;
    else if (arr[mid] < val) left = mid + 1;
    else right = mid - 1;
  }
}`,
    reasoning: "Binary Search reduces the complexity to O(log n), which is vastly faster for large datasets."
  },
  {
    id: 15,
    category: "Memory Management",
    prompt: "Set up a timer.",
    badCode: `function start() {
  setInterval(() => console.log('Tick'), 1000);
}
// User navigates away, but timer keeps running`,
    critique: "The timer is created but never cleared. If the component unmounts, this becomes a memory leak running in the background.",
    goodCode: `const timerId = setInterval(...)
// Later, on cleanup:
clearInterval(timerId);`,
    reasoning: "Always clean up side effects (timers, event listeners) when they are no longer needed to free up memory."
  },
  {
    id: 16,
    category: "Error Handling",
    prompt: "Read JSON from an API.",
    badCode: `const data = JSON.parse(responseString);`,
    critique: "`JSON.parse` will throw a hard error and crash the script if the input is malformed. It lacks error boundaries.",
    goodCode: `try {
  const data = JSON.parse(responseString);
} catch (e) {
  console.error("Invalid JSON provided");
}`,
    reasoning: "Defensive coding requires wrapping parsing logic in try/catch blocks to handle unexpected input gracefully."
  },
  {
    id: 17,
    category: "Variables",
    prompt: "Use a loop variable later.",
    badCode: `for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints "5" five times`,
    critique: "`var` has function scope, not block scope. The variable `i` is shared across all iterations and timeouts.",
    goodCode: `for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100);
}`,
    reasoning: "`let` has block scope. It creates a new binding for `i` in each iteration of the loop."
  },
  {
    id: 18,
    category: "Accessibility (A11y)",
    prompt: "Create a clickable button.",
    badCode: `<div onclick="submit()">Submit</div>`,
    critique: "A `div` is not focusable by keyboard (Tab key) and is invisible to screen readers looking for buttons.",
    goodCode: `<button onclick="submit()">Submit</button>`,
    reasoning: "Using semantic HTML (`<button>`) ensures native keyboard support and accessibility compliance automatically."
  },
  {
    id: 19,
    category: "Comparison Logic",
    prompt: "Check if value is 0.",
    badCode: `if (inputValue == 0) { ... }`,
    critique: "Loose equality `==` performs type coercion. An empty string `''` or `false` will also equal `0`, causing bugs.",
    goodCode: `if (inputValue === 0) { ... }`,
    reasoning: "Always use strict equality `===` to ensure you are checking both value and type."
  },
  {
    id: 20,
    category: "Dates",
    prompt: "Format a date.",
    badCode: `const date = new Date("2023-05-01"); 
// Result depends on user's timezone`,
    critique: "Parsing date strings varies by browser and often defaults to UTC, which might show as the previous day in local time.",
    goodCode: `const date = new Date(2023, 4, 1); // Month is 0-indexed`,
    reasoning: "Avoid string parsing for dates. Use specific constructors or libraries like date-fns/Luxon for consistency."
  }
];

/* APP LOGIC 
  Handles the state and user interaction 
*/
let currentIndex = 0;

const dom = {
  counter: document.getElementById('counter'),
  topic: document.getElementById('topic-badge'),
  prompt: document.getElementById('prompt-text'),
  badCode: document.getElementById('bad-code'),
  btnAudit: document.getElementById('btn-audit'),
  btnNext: document.getElementById('btn-next'),
  solutionPane: document.getElementById('solution-pane'),
  auditReport: document.getElementById('audit-report'),
  critiqueText: document.getElementById('critique-text'),
  goodCode: document.getElementById('good-code'),
  reasoningText: document.getElementById('reasoning-text'),
  emptyState: document.querySelector('.empty-state'),
  navControls: document.getElementById('nav-controls')
};

function loadScenario(index) {
  const data = scenarios[index];
  
  // Update UI Text
  dom.counter.innerText = `${index + 1} / ${scenarios.length}`;
  dom.topic.innerText = data.category;
  dom.prompt.innerText = data.prompt;
  dom.badCode.innerText = data.badCode;
  
  // Reset Right Pane
  dom.auditReport.classList.add('hidden');
  dom.navControls.classList.add('hidden');
  dom.emptyState.classList.remove('hidden');
  dom.emptyState.innerHTML = '<p>Waiting for audit...</p>';
  dom.btnAudit.disabled = false;
  dom.btnAudit.innerText = "Run Logic Audit ➜";
}

function runAudit() {
  const data = scenarios[currentIndex];
  
  // Simulate "Thinking" Time
  dom.btnAudit.disabled = true;
  dom.btnAudit.innerText = "Analyzing...";
  dom.emptyState.innerHTML = '<div class="loader">Processing...</div>';
  
  setTimeout(() => {
    // Reveal Data
    dom.emptyState.classList.add('hidden');
    dom.auditReport.classList.remove('hidden');
    dom.navControls.classList.remove('hidden');
    
    // Fill Content
    dom.critiqueText.innerText = data.critique;
    dom.goodCode.innerText = data.goodCode;
    dom.reasoningText.innerText = data.reasoning;
    
    dom.btnAudit.innerText = "Audit Complete ✓";
  }, 600); // 600ms delay for realism
}

dom.btnAudit.addEventListener('click', runAudit);

dom.btnNext.addEventListener('click', () => {
  if (currentIndex < scenarios.length - 1) {
    currentIndex++;
    loadScenario(currentIndex);
  } else {
    alert("Simulation Complete! You have audited all scenarios.");
    currentIndex = 0;
    loadScenario(0);
  }
});

// Initialize
loadScenario(0);