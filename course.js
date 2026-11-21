// All curriculum content is static and ships with the site; there is no content API.
export const videos = {
  java: {title:'Java + DSA Bootcamp', channel:'Kunal Kushwaha', list:'PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ', url:'https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ'},
  git: {title:'Git and GitHub Full Tutorial',channel:'Kunal Kushwaha',id:'apGV9Kg7ics'},
  boot: {title:'Spring Boot & Spring Data JPA Course',channel:'freeCodeCamp.org',id:'5rNk7m_zlAg'},
  sql: {title:'Learn PostgreSQL Full Course',channel:'freeCodeCamp.org',id:'qw--VYLpxG4'},
  react: {title:'React Beginner Tutorial',channel:'freeCodeCamp.org',id:'x4rFhThSX04'},
  ts: {title:'TypeScript with React',channel:'freeCodeCamp.org',id:'aJP1AbZSqz8'},
  security: {title:'Spring Security Course',channel:'Amigoscode',id:'zYop3D8EXYU'},
  docker: {title:'Docker Tutorial for Beginners',channel:'TechWorld with Nana',id:'3c-iBn73dDE'},
  aws: {title:'AWS Cloud Practitioner Course',channel:'freeCodeCamp.org',id:'7HKot-brXFE'},
  ai: {title:'Spring AI for Java Developers',channel:'Dan Vega',id:'FzLABAppJfM'},
  rag: {title:'RAG with Java and Spring AI',channel:'Dan Vega',id:'4-rG2qsTrAs'}
};
Object.values(videos).forEach(v=>{if(!v.url)v.url=`https://www.youtube.com/watch?v=${v.id}`; v.embed=v.list?`https://www.youtube-nocookie.com/embed/videoseries?list=${v.list}`:`https://www.youtube-nocookie.com/embed/${v.id}`;});

// Each line is a different topic and its corresponding independent coding deliverable.
const phaseData = [
 {name:'Java foundations',short:'Java',start:1,end:15,color:'#72d9a2',video:'java',quiz:[
  ['Which collection stores unique values?',['Set','List','ArrayList','Queue'],0,'A Set prevents duplicate elements.'],
  ['Which Java keyword defines a class inheritance relationship?',['extends','implements','import','final'],0,'extends is used to inherit a class.'],
  ['Which feature enables passing behavior as a value?',['Lambdas','Packages','Enums','Comments'],0,'Lambda expressions represent functional interface implementations.'],
  ['Which tool records code history?',['Git','JVM','JDBC','JUnit'],0,'Git is a distributed version control system.']
 ], topics:`Java developer environment|Configure JDK and run a HelloWorld project in an IDE
Classes and objects|Model students and courses as Java classes
Encapsulation and access modifiers|Create a bank account class with validated deposits
Inheritance and polymorphism|Build a polymorphic vehicle rental calculator
Interfaces and abstraction|Define a payment provider interface with two implementations
Collections: List and Set|Build a deduplicated contacts manager
Maps and generics|Create a generic inventory index by item ID
Exception handling|Make a robust CLI with custom exceptions
Lambdas and method references|Build sortable employee lists with comparators
Streams and collectors|Aggregate sales records by category
Optional and null safety|Refactor a lookup service to use Optional safely
File I/O and serialization|Save and reload a text-based task list
Threads and concurrency|Compare sequential and concurrent tasks safely
SOLID principles and refactoring|Refactor a tightly coupled order processor
Git, GitHub and Java mini-capstone|Publish a Java CLI expense tracker with README`},
 {name:'DSA & problem solving',short:'DSA',start:16,end:35,color:'#78bafa',video:'java',quiz:[
  ['Binary search on sorted data typically takes what time?',['O(log n)','O(n²)','O(n!)','O(n³)'],0,'Binary search halves the search space each step.'],
  ['What data structure is FIFO?',['Queue','Stack','Tree','Heap'],0,'A queue processes first-in, first-out.'],
  ['Which technique expands and shrinks a contiguous range?',['Sliding window','Depth-first search','Merge sort','Hash chaining'],0,'Sliding window tracks a subarray or substring.'],
  ['Which traversal commonly uses a queue?',['BFS','DFS recursion','Inorder','Postorder'],0,'Breadth-first search uses a queue.']
 ],topics:`Big O and complexity analysis|Analyze three algorithms and explain runtime vs memory
Arrays and indexing|Implement array rotations and prefix sums
Strings and character counts|Build an anagram detector with frequency maps
Hash maps and hashing|Implement Two Sum and frequency counting
Two pointers technique|Solve pair sum in sorted arrays
Sliding window fixed size|Find maximum sum subarray of length k
Sliding window variable size|Find longest substring without repeated characters
Linear and binary search|Implement binary search and lower bound
Sorting fundamentals|Implement insertion, merge and quick sort
Recursion and backtracking|Generate subsets of a small set
Linked lists|Build singly linked list with insert and delete
Stack problems|Implement balanced parentheses validator
Queue and deque problems|Implement sliding-window maximum using deque
Binary trees and traversals|Build a tree with BFS and DFS traversal
Binary search trees|Implement insert, search and inorder print
Priority queues and heaps|Find top K frequent numbers
Graph representation and BFS|Find shortest path in an unweighted graph
DFS and cycle detection|Detect cycles in a graph
Dynamic programming introduction|Solve climbing stairs and coin change
DSA timed assessment|Solve four mixed problems with written complexity notes`},
 {name:'Spring Boot & SQL',short:'Backend',start:36,end:56,color:'#cf9eff',video:'boot',quiz:[
  ['Which annotation exposes a REST controller?',['@RestController','@Entity','@Repository','@Value'],0,'@RestController combines @Controller and @ResponseBody.'],
  ['What does HTTP 201 commonly indicate?',['Created','Not found','Unauthorized','Server error'],0,'201 indicates a new resource was created.'],
  ['Which JPA annotation identifies an entity?',['@Entity','@Controller','@Bean','@Autowired'],0,'@Entity marks a class mapped to a database table.'],
  ['What does a database index typically improve?',['Lookup speed','Password strength','Network bandwidth','Java compilation'],0,'Indexes can accelerate reads, with storage/write tradeoffs.']
 ],topics:`Spring framework and dependency injection|Build a minimal dependency-injected service
First Spring Boot application|Create and run a health-check endpoint
Maven and application configuration|Add separate dev settings and dependency management
HTTP methods and REST fundamentals|Document CRUD API routes and status codes
Controllers and request mapping|Expose GET and POST routes for employees
Service layer patterns|Move business rules out of controllers
DTOs and JSON binding|Add request and response DTOs
Validation and errors|Return useful field validation errors
SQL revision and joins|Write inner, left and group-by queries
PostgreSQL setup and schema design|Create normalized employee and department tables
JDBC and data access concepts|Compare JDBC queries with repository abstraction
JPA entities and repositories|Map Employee entity and persist employees
Entity relationships|Implement one-to-many department relationships
Pagination and sorting|Add paginated employee listing endpoint
Query methods and custom queries|Filter employees by salary and department
Transactions and consistency|Create a transactional employee transfer operation
Exception handlers|Build consistent API error responses
API documentation|Document endpoints with OpenAPI examples
Testing APIs with a client|Write a repeatable API test checklist
Backend project structure|Organize config, controllers, services and repositories
Spring Boot mini-capstone|Finish employee management API and README`},
 {name:'Security & testing',short:'Security',start:57,end:68,color:'#f5c477',video:'security',quiz:[
  ['How should passwords be stored?',['Salted adaptive hashes','Plain text','Base64 only','Encrypted URLs'],0,'Use a password hashing function such as Argon2 or bcrypt.'],
  ['What does HTTP 403 mean?',['Forbidden','Created','Accepted','Moved'],0,'403 means the server understood but refuses authorization.'],
  ['What is JUnit used for?',['Java testing','CSS bundling','Container images','Relational modeling'],0,'JUnit provides a Java testing framework.'],
  ['What prevents SQL injection with user input?',['Parameterized queries','String concatenation','Longer passwords only','More CSS'],0,'Parameterized queries separate data from SQL instructions.']
 ],topics:`Spring Security foundations|Protect endpoints with authenticated access
Password handling|Implement safe password hashing
JWT concepts and validation|Build token validation and expiry rules
Role-based authorization|Separate USER and ADMIN endpoint permissions
OAuth2 concepts|Diagram an OAuth2 authorization code flow
Input validation and OWASP|Strengthen inputs against common web risks
Secure API configuration|Configure restrictive CORS and secrets handling
Unit testing with JUnit 5|Write tests for core banking business rules
Mocking services with Mockito|Test service edge cases using mocks
Integration testing|Run repository integration tests
Logging and debugging|Add structured security-aware logs
Secure banking backend capstone|Complete transfer flow with tests and authorization`},
 {name:'React & TypeScript',short:'Frontend',start:69,end:83,color:'#64d8ef',video:'react',quiz:[
  ['What does useState provide?',['Component state','A database','An API server','A Git branch'],0,'useState manages local React component state.'],
  ['What is a TypeScript interface commonly used for?',['Describing object shapes','Running SQL','Encrypting passwords','Deploying Docker'],0,'Interfaces express structural types.'],
  ['What is the purpose of React keys in lists?',['Track item identity','Hide elements','Store JWTs','Fetch data'],0,'Stable keys help React reconcile list items.'],
  ['Which browser API is commonly used for HTTP requests?',['fetch','setTimeout','alert','localStorage'],0,'fetch performs HTTP network requests.']
 ],topics:`TypeScript types and interfaces|Convert a small JavaScript utility to strict TypeScript
Typescript unions and generics|Build typed Result and pagination helpers
React project structure|Create a Vite React TypeScript starter
JSX components and props|Build reusable employee cards
State and event handling|Create an interactive salary filter
Hooks and effect lifecycles|Build a controlled data-loading component
React Router and navigation|Add dashboard and employee routes
Forms and validation|Build an accessible add-employee form
HTTP requests and API states|Fetch employee API with loading/error states
Reusable component design|Create Button, Modal and EmptyState components
Tailwind and responsive styling|Build a responsive dashboard layout
Accessibility and keyboard usage|Audit and fix labels, focus and dialogs
Frontend tests and debugging|Test form behavior and error handling
Connecting React to Spring Boot|Integrate employee CRUD with your API
React mini-capstone|Finish responsive employee dashboard with screenshots`},
 {name:'Cloud & DevOps',short:'DevOps',start:84,end:93,color:'#f398b5',video:'docker',quiz:[
  ['What does a Dockerfile describe?',['How to build an image','A SQL schema','A DNS server','A Git secret'],0,'Dockerfile instructions build container images.'],
  ['What is a CI pipeline?',['Automated build/test workflow','A database index','A React hook','A password manager'],0,'CI automates checks on code changes.'],
  ['What is least privilege?',['Minimum necessary access','Admin for everyone','Public credentials','No authentication'],0,'Grant only permissions required for a task.'],
  ['What should never be committed to a repository?',['Secrets','README','Tests','Code comments'],0,'Never commit private credentials or tokens.']
 ],topics:`Linux shell and permissions|Practice file and process commands on a safe local environment
Git branching and pull requests|Create a feature branch and documented PR
Docker images and containers|Run a Java application in a container
Dockerfiles and multi-stage builds|Write a small production-style Java Dockerfile
Docker Compose basics|Coordinate a local app and database
CI with GitHub Actions|Run Java tests on every push
AWS account and IAM concepts|Draw least-privilege cloud access design
EC2, S3 and cloud services|Compare hosting and object storage choices
Environment config and monitoring|Separate config from code and inspect logs
Cloud and DevOps mini-capstone|Publish Docker + CI instructions with verified build`},
 {name:'AI application engineering',short:'AI',start:94,end:108,color:'#b2a4ff',video:'ai',quiz:[
  ['What does RAG combine with generation?',['Retrieved external context','CSS selectors','Git history only','CPU overclocking'],0,'Retrieval-augmented generation provides relevant sources to a model.'],
  ['What is a vector embedding used for?',['Representing semantic similarity','Compressing MP4 only','Database backups','User passwords'],0,'Embeddings map content into vectors for similarity search.'],
  ['What is prompt injection?',['Untrusted content attempting to redirect an AI system','A Java annotation','A Docker flag','A UI framework'],0,'Prompt injection exploits model handling of untrusted instructions.'],
  ['Why evaluate AI outputs?',['To detect errors and regressions','To avoid all testing','To increase font size','To skip source checks'],0,'Evaluation helps assess correctness, safety and quality.']
 ],topics:`LLM application architecture|Sketch frontend, API, model and storage boundaries
Prompts and structured outputs|Write tested prompts that return validated JSON
AI provider APIs|Build an interface with mocked provider responses
Tokens, latency and costs|Estimate latency and token budgets for a workflow
Spring AI integration|Create a simple Spring AI service interface
Embeddings and similarity|Visualize how embedding similarity retrieval works
Vector database concepts|Compare basic vector indexing approaches
RAG ingestion and retrieval|Design a document chunk and retrieval pipeline
RAG quality and citations|Evaluate cited responses against reference documents
AI tools and function calling|Design safe function schemas with validation
AI agents and workflows|Build a bounded multi-step tool workflow design
Prompt injection defense|Write adversarial tests for untrusted documents
AI evaluation and observability|Build a small rubric-based evaluation set
AI interview app implementation|Add question generation and safe feedback mock flows
AI mini-capstone|Document AI interview app architecture, tests and tradeoffs`},
 {name:'Capstone & career launch',short:'Career',start:109,end:120,color:'#f8df90',video:'boot',quiz:[
  ['What makes a project portfolio credible?',['Working demo, tests and clear README','Only a screenshot','Unverified claims','Copied code without understanding'],0,'Evidence of working features and reproducible tests matters.'],
  ['What should you do before merging a pull request?',['Review and run tests','Commit credentials','Remove test files','Disable error handling'],0,'Reviews and testing reduce regressions.'],
  ['Why include project tradeoffs in interviews?',['Shows engineering reasoning','Replaces coding skills','Hides mistakes','Increases compile speed'],0,'Explaining constraints demonstrates sound judgment.'],
  ['Which metric best reflects a completed roadmap day?',['Verified completed activities','Opening the website','Watching a spinning loader','A random percentage'],0,'Use actual completed learning tasks and deliverables.']
 ],topics:`Choose capstone requirements|Write scoped feature list and user stories
Architecture and database design|Draw API contracts, schema and data flows
Implement backend core|Build working business endpoints with validation
Implement frontend core|Create accessible screens and API integration
Authentication and security review|Test login and authorization boundaries
Automated testing milestone|Add unit, integration and UI test cases
Deployment and troubleshooting|Deploy a demo and document setup pitfalls
Performance and debugging|Profile slow endpoints and optimize one bottleneck
Portfolio and GitHub documentation|Publish annotated README and demonstration images
Java, Spring and SQL interviews|Record answers to 20 technical questions
DSA and frontend mock interviews|Complete timed coding and React questions
Final review and application plan|Audit projects, update resume and create application tracker`}
];
const timeblocks=[
 {title:'Learn + active recall',minutes:90,kind:'video'},
 {title:'Guided implementation',minutes:90,kind:'guided'},
 {title:'Independent coding project',minutes:90,kind:'build'},
 {title:'Java DSA workout',minutes:45,kind:'dsa'},
 {title:'Quiz + debugging',minutes:30,kind:'quiz'},
 {title:'Revision + journal',minutes:15,kind:'journal'}
];
const dsaTopics=['Arrays: Two Sum','Reverse a string','Binary search','Count character frequency','Valid parentheses','Find maximum subarray','Remove duplicates','Merge sorted arrays','First nonrepeating character','Two pointers pair sum','Linked list reversal','Queue using stacks','Sliding-window maximum','Tree level order traversal','Check balanced brackets','Find top K elements','Graph BFS','Graph DFS','Memoized Fibonacci','Find longest unique substring'];
export const phases = phaseData.map(({topics,quiz,...p})=>({...p,quiz,lessons:topics.trim().split('\n').map(x=>{const [title,assignment]=x.split('|');return {title,assignment};})}));
export const curriculum = phases.flatMap((p,phaseIndex)=>p.lessons.map((topic,i)=>{
 const day=p.start+i;
 const videoKey=day===15?'git':p.short==='Backend'&&[44,45,46].includes(day)?'sql':p.short==='Frontend'&&day<72?'ts':p.short==='DevOps'&&day>=90?'aws':p.short==='AI'&&day>=100?'rag':p.video;
 const challenge=dsaTopics[(day-1)%dsaTopics.length];
 return {day,phaseIndex,phase:p.name,short:p.short,color:p.color,title:topic.title,assignment:topic.assignment,videoKey,
  objectives:[`Explain the purpose and tradeoffs of ${topic.title.toLowerCase()}.`,`Implement: ${topic.assignment}.`,`Test edge cases, then summarize what you learned without AI.`],
  blocks:timeblocks.map((b,idx)=>({...b,id:idx,detail:[`Watch a relevant segment of ${videos[videoKey].title}, take notes, and practice active recall about ${topic.title}.`,`Follow the examples from the lesson, change the inputs, and debug one intentional bug.`,`Independently: ${topic.assignment}. Commit work to GitHub when appropriate.`,`Solve a Java problem on ${challenge}; write time and space complexity.`,`Answer the topic quiz, test your work, and correct any mistakes.`,`Write three insights, one tricky part, and your next-step plan.`][idx]})),
  quiz:p.quiz[i%p.quiz.length],dsa:challenge,deliverable:topic.assignment,
  links:[{title:'Official Java Documentation',url:'https://docs.oracle.com/en/java/'},{title:'Spring Guides',url:'https://spring.io/guides/'},{title:'React Learn',url:'https://react.dev/learn'},{title:'TypeScript Handbook',url:'https://www.typescriptlang.org/docs/handbook/intro.html'},{title:'AWS Skill Builder',url:'https://skillbuilder.aws/'}]
 }; }));
export const totalHours=120*6;
if(curriculum.length!==120||curriculum.some(l=>l.blocks.reduce((s,b)=>s+b.minutes,0)!==360))throw Error('Curriculum integrity check failed');
