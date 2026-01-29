# ⚡ AI Training Simulator: Logic Auditor & Code Evaluator



## 📋 Project Overview

**The Logic Auditor** is a technical simulation dashboard designed to demonstrate high-level code evaluation, debugging, and optimization skills. 

Unlike standard portfolio projects that focus on UI construction, this tool focuses on **Correctness, Performance, and Logic Verification**—the core competencies required for AI Training and Reinforcement Learning from Human Feedback (RLHF).

The application presents the user with 20 distinct coding scenarios (ranging from Security Vulnerabilities to Big O Complexity issues), simulating an environment where an AI model has generated suboptimal code. The user's role—simulated by the system—is to audit the code, identify the flaw, and provide the optimal solution with a detailed explanation.

### 🎯 Key Objectives
* **Demonstrate Algorithmic Thinking:** Identifying $O(n^2)$ bottlenecks and refactoring to $O(n)$ or $O(\log n)$.
* **Showcase Polyglot Proficiency:** Scenarios cover **JavaScript, Python, React, and SQL**.
* **Simulate RLHF Workflows:** Replicating the "Prompt -> Bad Response -> Critique -> Correction" loop used in training Large Language Models (LLMs).

---

## 🛠️ Technical Scenarios Covered

This project includes a database of 20 technical scenarios that I have implemented to demonstrate breadth of knowledge.

| Category | Specific Concept Audited |
| :--- | :--- |
| **Big O Complexity** | Nested Loop optimization ($O(n^2)$ to $O(n)$ using Hash Maps) |
| **Recursion** | Memoization techniques to prevent Exponential Time Complexity ($O(2^n)$) |
| **Security** | SQL Injection prevention & parameterized queries |
| **Security** | ReDoS (Regular Expression Denial of Service) mitigation |
| **Memory Management** | Identifying memory leaks in Event Listeners and Timers |
| **React.js** | `useEffect` dependency array optimization & infinite loop prevention |
| **State Management** | React State batching and functional updates |
| **Async Logic** | Parallelizing Promises (`Promise.all`) vs. Waterfall requests |
| **Python** | Mutable default arguments risks (the `list=[]` trap) |
| **Floating Point** | Precision errors (IEEE 754) handling |

---

## 🚀 How It Works

1.  **Input Context:** The system generates a user prompt and a "hallucinated" or "junior-level" code snippet containing a specific flaw.
2.  **Audit Process:** The engine analyzes the code against known best practices.
3.  **Senior Evaluation:** The system outputs a structured report containing:
    * **Critique:** A concise explanation of *why* the code fails or is inefficient.
    * **Refactored Solution:** The industry-standard, clean implementation.
    * **Reasoning:** Deep-dive logic explaining the fix (e.g., explaining why Binary Search is preferred over Linear Search for sorted data).

---

## 💻 Tech Stack

* **Core:** HTML5, CSS3 (Flexbox/Grid), Vanilla ES6+ JavaScript.
* **Architecture:** Single Page Application (SPA) using a custom state-based rendering engine.
* **UI/UX:** Responsive Dashboard designed for high-density information scanning (similar to IDEs and Labeling interfaces).
* **Performance:** Zero-dependency architecture to ensure <100ms load times.

---

## 🧠 Why This Matters for AI Training

This project serves as a proof-of-work for roles involving **Code Evaluation** and **Data Annotation**. It proves:
1.  I can **spot bugs** that automated linters might miss (logic errors vs syntax errors).
2.  I can **explain complex concepts** clearly (essential for teaching AI models).
3.  I understand **edge cases** (null checks, race conditions, floating point math).

## 🔗 Links

* **Live Project:** [View on CodePen](https://codepen.io/Carmen-Singh/pen/KwMQzwj)
