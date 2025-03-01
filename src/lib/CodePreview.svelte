<script lang="ts">
  import { onMount } from "svelte";
  import hljs from "highlight.js/lib/core";
  // Import languages correctly
  import javascript from "highlight.js/lib/languages/javascript";
  import python from "highlight.js/lib/languages/python";
  import java from "highlight.js/lib/languages/java";
  import csharp from "highlight.js/lib/languages/csharp";
  import rust from "highlight.js/lib/languages/rust";
  import "highlight.js/styles/github-dark.css";
    import type { theme } from "../Types.svelte";
  
  // fields
  export let colors: theme;
  
  // Tab management
  let selectedTab = "javascript";
  let tabs = [
    { id: "javascript", name: "JavaScript" },
    { id: "python", name: "Python" },
    { id: "java", name: "Java" },
    { id: "csharp", name: "C#" },
    { id: "rust", name: "Rust" }
  ];
  interface CodeSnippets {
    [key: string]: string;
  }

  // Code snippets for each language
  const codeSnippets: CodeSnippets = {
    javascript: `// Modules and advanced JavaScript features
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
main();`,

    python: `# Welcome to Code: Color
import asyncio
import json
from dataclasses import dataclass
from typing import List, Dict, Optional, Any

"""
A simple Python demonstration
with various language features
"""

@dataclass
class Person:
    name: str
    age: int
    flying_force: float = 9999.99
    
    def speak(self) -> None:
        print(f"Hello, my name is {self.name}")
    
    @classmethod
    def create_default(cls) -> 'Person':
        return cls("Alice", 30)
    
    def __str__(self) -> str:
        return f"{self.name} ({self.age})"

async def fetch_data(url: str) -> Dict[str, Any]:
    try:
        # This is a simulation since asyncio doesn't have fetch
        await asyncio.sleep(1)  # Simulate network delay
        return {"status": "success", "data": [1, 2, 3, 4, 5]}
    except Exception as e:
        print(f"Error fetching data: {e}")
        return {"status": "error", "message": str(e)}

def main() -> None:
    # Conditional logic
    x = 5
    if x > 3:
        print("x is greater than 3")
    elif x == 3:
        print("x is 3")
    else:
        print("x is less than 3")
    
    # Match statement (Python 3.10+)
    match x:
        case 1:
            print("one")
        case 2:
            print("two")
        case _:
            print("something else")
    
    # Loops
    for i in range(5):
        print(f"i is {i}")
    
    # List comprehension
    numbers = [1, 2, 3, 4, 5]
    squares = [n**2 for n in numbers if n % 2 == 0]
    print(f"Squares of even numbers: {squares}")
    
    # Creating an instance and using methods
    person = Person(
        name="Alice",
        age=30,
        flying_force=9999.99
    )
    person.speak()
    
    # Dictionary unpacking
    person_dict = {"name": person.name, "age": person.age}
    print(f"{person_dict['name']} is {person_dict['age']} years old")
    
    # Using a generator
    def number_generator():
        for i in range(1, 4):
            yield i
    
    gen = number_generator()
    for num in gen:
        print(num)

# Call the main function
if __name__ == "__main__":
    main()
    asyncio.run(fetch_data("https://api.example.com/data"))`,

    java: `// Welcome to Code: Color
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.concurrent.CompletableFuture;

/**
 * Example Java code with various language features
 */
public class CodeColorDemo {
    // Main class definition
    public static void main(String[] args) {
        // Conditional logic
        int x = 5;
        if (x > 3) {
            System.out.println("x is greater than 3");
        } else if (x == 3) {
            System.out.println("x is 3");
        } else {
            System.out.println("x is less than 3");
        }
        
        // Switch statement with newer syntax
        switch (x) {
            case 1 -> System.out.println("one");
            case 2 -> System.out.println("two");
            default -> System.out.println("something else");
        }
        
        // For loop
        for (int i = 0; i < 5; i++) {
            System.out.println("i is " + i);
        }
        
        // Functional style with streams
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        numbers.forEach(System.out::println);
        
        // Stream processing
        List<Integer> evenSquares = numbers.stream()
                .filter(n -> n % 2 == 0)
                .map(n -> n * n)
                .collect(Collectors.toList());
        System.out.println("Even squares: " + evenSquares);
        
        // Creating an instance and using methods
        Person person = new Person("Alice", 30, 9999.99);
        person.speak();
        
        // Using Optional
        Optional<String> optionalName = Optional.of(person.getName());
        optionalName.ifPresent(name -> 
            System.out.println(name + " is " + person.getAge() + " years old"));
        
        // Asynchronous programming with CompletableFuture
        CompletableFuture<String> future = fetchDataAsync("https://api.example.com/data");
        future.thenAccept(System.out::println)
              .exceptionally(ex -> {
                  System.err.println("Error: " + ex.getMessage());
                  return null;
              });
    }
    
    // Asynchronous method example
    private static CompletableFuture<String> fetchDataAsync(String url) {
        return CompletableFuture.supplyAsync(() -> {
            // Simulate API call
            try {
                Thread.sleep(1000);
                return "{\"status\": \"success\", \"data\": [1, 2, 3, 4, 5]}";
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });
    }
}

// Class definition with various features
class Person {
    private final String name;
    private final int age;
    private final double flyingForce;
    
    public Person(String name, int age, double flyingForce) {
        this.name = name;
        this.age = age;
        this.flyingForce = flyingForce;
    }
    
    public void speak() {
        System.out.println("Hello, my name is " + name);
    }
    
    public static Person createDefault() {
        return new Person("Alice", 30, 9999.99);
    }
    
    // Getters
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    public double getFlyingForce() {
        return flyingForce;
    }
}`,

    csharp: `// Welcome to Code: Color
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CodeColorDemo
{
    /// <summary>
    /// Demo class showing various C# features
    /// </summary>
    class Program
    {
        static async Task Main(string[] args)
        {
            // Conditional logic
            int x = 5;
            if (x > 3)
            {
                Console.WriteLine("x is greater than 3");
            }
            else if (x == 3)
            {
                Console.WriteLine("x is 3");
            }
            else
            {
                Console.WriteLine("x is less than 3");
            }
            
            // Switch expression (C# 8.0+)
            string result = x switch
            {
                1 => "one",
                2 => "two",
                _ => "something else"
            };
            Console.WriteLine(result);
            
            // For loop
            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine($"i is {i}");
            }
            
            // LINQ and functional approaches
            var numbers = new List<int> { 1, 2, 3, 4, 5 };
            foreach (var num in numbers)
            {
                Console.WriteLine(num);
            }
            
            // LINQ query
            var evenSquares = numbers
                .Where(n => n % 2 == 0)
                .Select(n => n * n)
                .ToList();
            Console.WriteLine($"Even squares: {string.Join(", ", evenSquares)}");
            
            // Creating an instance and using methods
            var person = new Person(
                name: "Alice", 
                age: 30, 
                flyingForce: 9999.99m
            );
            person.Speak();
            
            // Tuple deconstruction
            var (name, age) = person;
            Console.WriteLine($"{name} is {age} years old");
            
            // Async/await pattern
            try
            {
                var data = await FetchDataAsync("https://api.example.com/data");
                Console.WriteLine(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching data: {ex.Message}");
            }
        }
        
        // Async method
        static async Task<string> FetchDataAsync(string url)
        {
            // Simulated API call
            await Task.Delay(1000);
            return @"{""status"": ""success"", ""data"": [1, 2, 3, 4, 5]}";
        }
    }
    
    // Record type (C# 9.0+)
    public record Person(string Name, int Age, decimal FlyingForce = 9999.99m)
    {
        // Method
        public void Speak() => 
            Console.WriteLine($"Hello, my name is {Name}");
        
        // Static factory method
        public static Person CreateDefault() => 
            new Person("Alice", 30);
            
        // Deconstruct for tuple unpacking
        public void Deconstruct(out string name, out int age)
        {
            name = Name;
            age = Age;
        }
    }
}`,

    rust: `// Welcome to Code: Color
use std::collections::HashMap;
use async_trait::async_trait;
use tokio::time::{sleep, Duration};

/// A struct representing a person
#[derive(Debug, Clone)]
struct Person {
    name: String,
    age: u32,
    flying_force: f64,
}

impl Person {
    /// Creates a new Person
    fn new(name: &str, age: u32, flying_force: f64) -> Self {
        Self {
            name: name.to_string(),
            age,
            flying_force,
        }
    }
    
    /// Default factory method
    fn create_default() -> Self {
        Self::new("Alice", 30, 9999.99)
    }
    
    /// Person speaks
    fn speak(&self) {
        println!("Hello, my name is {}", self.name);
    }
}

#[async_trait]
trait DataFetcher {
    async fn fetch_data(&self, url: &str) -> Result<String, Box<dyn std::error::Error>>;
}

struct ApiClient;

#[async_trait]
impl DataFetcher for ApiClient {
    async fn fetch_data(&self, url: &str) -> Result<String, Box<dyn std::error::Error>> {
        // Simulating network delay
        sleep(Duration::from_secs(1)).await;
        Ok(String::from("{{\"status\": \"success\", \"data\": [1, 2, 3, 4, 5]}}"))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Conditional logic
    let x = 5;
    if x > 3 {
        println!("x is greater than 3");
    } else if x == 3 {
        println!("x is 3");
    } else {
        println!("x is less than 3");
    }
    
    // Match expression
    match x {
        1 => println!("one"),
        2 => println!("two"),
        _ => println!("something else"),
    }
    
    // For loop
    for i in 0..5 {
        println!("i is {}", i);
    }
    
    // Functional iterator methods
    let numbers = vec![1, 2, 3, 4, 5];
    numbers.iter().for_each(|&num| {
        println!("{}", num);
    });
    
    // Functional transformations
    let even_squares: Vec<i32> = numbers
        .iter()
        .filter(|&&n| n % 2 == 0)
        .map(|&n| n * n)
        .collect();
    println!("Even squares: {:?}", even_squares);
    
    // Creating an instance and using methods
    let person = Person::new("Alice", 30, 9999.99);
    person.speak();
    
    // Pattern matching and destructuring
    let Person { name, age, .. } = person.clone();
    println!("{} is {} years old", name, age);
    
    // Using HashMap
    let mut map = HashMap::new();
    map.insert("name", person.name);
    map.insert("age", person.age.to_string());
    
    if let Some(name) = map.get("name") {
        println!("Name from map: {}", name);
    }
    
    // Option and Result handling
    let maybe_value: Option<i32> = Some(42);
    if let Some(value) = maybe_value {
        println!("The value is {}", value);
    }
    
    // Async/await
    let client = ApiClient;
    match client.fetch_data("https://api.example.com/data").await {
        Ok(data) => println!("Received: {}", data),
        Err(e) => eprintln!("Error fetching data: {}", e),
    }
    
    Ok(())
}`
  };

  let highlighted: CodeSnippets = {};

  onMount(() => {
    // Register languages
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("python", python);
    hljs.registerLanguage("java", java);
    hljs.registerLanguage("csharp", csharp);
    hljs.registerLanguage("rust", rust);
    // Fix the reactive statement to use the correct parameter format
    highlighted[selectedTab] = hljs.highlight(codeSnippets[selectedTab], { language: selectedTab }).value;
  });

  // Function to change the selected tab
  function selectTab(tabId: string) {
    selectedTab = tabId;
    highlighted[selectedTab] = hljs.highlight(codeSnippets[selectedTab], { language: selectedTab }).value;
  }

</script>

<div class="code-preview-container" style="--base: {colors.text}; --surface: {colors.background};">
  <div class="tabs">
    {#each tabs as tab}
      <button 
        class="tab-button" 
        class:active={selectedTab === tab.id}
        on:click={() => selectTab(tab.id)}
      >
        {tab.name}
      </button>
    {/each}
  </div>
  
  <div class="code-preview">
    <pre><code>{@html highlighted[selectedTab] || codeSnippets[selectedTab]}</code></pre>
  </div>
</div>

<style>
  .code-preview-container {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .tabs {
    display: flex;
    background-color: var(--card-bg);
    border-bottom: 1px solid var(--border-color);
    overflow-x: auto;
    scrollbar-width: thin;
  }
  
  .tab-button {
    padding: 0.5rem 1rem;
    background: transparent;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    font-size: 0.9rem;
    border-bottom: 2px solid transparent;
    transition: background-color 0.2s, border-color 0.2s;
    white-space: nowrap;
  }
  
  .tab-button:hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
  
  .tab-button.active {
    border-bottom: 2px solid var(--primary);
    font-weight: 600;
  }
  
  .code-preview {
    background-color: var(--surface);
    padding: 1rem;
    border-radius: 0 0 8px 8px;
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
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .tabs {
      flex-wrap: nowrap;
    }
    
    .tab-button {
      padding: 0.4rem 0.8rem;
      font-size: 0.8rem;
    }
  }
</style>
