<script lang="ts">
  import { onMount } from "svelte";
  import hljs from "highlight.js/lib/core";
  import javascript from "highlight.js/lib/languages/javascript";
  import "highlight.js/styles/github-dark.css";
  import type { theme } from "../Types.svelte";

  // fields
  export let colors: theme;

  const codeSnippet = `// Modules and advanced JavaScript features
import { EventEmitter } from 'events';

/* 
* Welcome to Code: Color 
*/

// Class with advanced features
class Person {
    // Private field
    #privateField;

    constructor(name, age, flyingForce) {
        this.name = name;
        this.age = age;
        this.flyingForce = flyingForce;
    }

    // Method with arrow function syntax
    speak = () => {
        console.log(\`Hello, my name is \${this.name}\`);
    }

    // Static method
    static createDefault() {
        return new Person("Alice", 30, 9999.99);
    }
}

const main = () => {
    // Conditional logic
    let x = 5;

    if (x > 3) {
        console.log("x is greater than 3");
    } else if (x === 3) {
        console.log("x is 3");
    } else {
        console.log("x is less than 3");
    }

    // Switch statement
    switch(x) {
        case 1:
            console.log("one");
            break;
        case 2:
            console.log("two");
            break;
        default:
            console.log("something else");
    }

    // Loops with modern syntax
    for (let i = 0; i < 5; i++) {
        console.log(\`i is \${i}\`);
    }

    // Functional loop
    const numbers = [1, 2, 3, 4, 5];
    numbers.forEach(num => {
        console.log(num);
    });

    // Creating an instance and using methods
    const person = new Person(
        "Alice", 
        30, 
        9999.99
    );
    person.speak();

    // Destructuring and spread operator
    const { name, age } = person;
    console.log(\`\${name} is \${age} years old\`);

    async function fetchData() {
        try {
            const response = await fetch('https://api.example.com/data');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
};

// Generator function example
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

// Proxy example
const handler = {
    get: function(target, prop) {
        return prop in target ? target[prop] : 42;
    }
};

// Call the main function
main();`;

  let highlighted: string;

  onMount(() => {
    hljs.registerLanguage("javascript", javascript);
    highlighted = hljs.highlight(codeSnippet, { language: "javascript" }).value;
  });
</script>

<div
  class="code-preview"
  style="--base: {colors.text}; --surface: {colors.background};"
>
  <pre><code>{@html highlighted || codeSnippet}</code></pre>
</div>

<style>
  .code-preview {
    background-color: var(--surface);
    padding: 1rem;
    border-radius: 8px;
    overflow: auto;
    font-family: "JetBrains Mono", monospace;
    font-size: 14px;
    line-height: 1.5;
    max-height: 600px;
  }

  pre {
    margin: 0;
  }

  :global(.hljs) {
    background: transparent !important;
    color: var(--base) !important;
  }
</style>

