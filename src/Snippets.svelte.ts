export interface CodeSnippets {
  [key: string]: string;
}

export const codeSnippets: CodeSnippets = {
  rust: "",
  lua: "",
  go: "",
  c: "",
  html: "",
  css: "",
  python: "",
  typescript: "",
  javascript: "",
  java: "",
  csharp: "",
};

//************************
// Javascript
//************************
codeSnippets.javascript = `import { EventEmitter } from 'events';
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
main();
`;

//************************
// Python
//************************
codeSnippets.python = `# Welcome to Code: Color
import asyncio
import json
from dataclasses import dataclass
from typing import List, Dict, Optional, Any

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
  asyncio.run(fetch_data("https://api.example.com/data"))
`;

//************************
// Java
//************************
codeSnippets.java = `
// Welcome to Code: Color
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
}`;

//************************
// C#
//************************
codeSnippets.csharp = `
// Welcome to Code: Color
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
}`;

//************************
// Rust
//************************
codeSnippets.rust = `// Welcome to Code: Color
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
}`;

//************************
// Lua
//************************
codeSnippets.lua = `-- Welcome to Code: Color
-- Class-like implementation using metatables

local Person = {}
Person.__index = Person

function Person.new(name, age, flyingForce)
    local self = {
        name = name,
        age = age,
        flyingForce = flyingForce or 9999.99
    }
    return setmetatable(self, Person)
end

function Person:speak()
    print(string.format("Hello, my name is %s", self.name))
end

function Person.createDefault()
    return Person.new("Alice", 30, 9999.99)
end

-- Main function
local function main()
    -- Conditional logic
    local x = 5
    if x > 3 then
        print("x is greater than 3")
    elseif x == 3 then
        print("x is 3")
    else
        print("x is less than 3")
    end

    -- Generic for loop
    for i = 1, 5 do
        print(string.format("i is %d", i))
    end

    -- Table iteration
    local numbers = {1, 2, 3, 4, 5}
    for _, num in ipairs(numbers) do
        print(num)
    end

    -- Creating an instance and using methods
    local person = Person.new("Alice", 30, 9999.99)
    person:speak()

    -- Table manipulation
    local data = {
        name = "Alice",
        age = 30,
        details = {
            occupation = "Developer",
            level = "Senior"
        }
    }

    -- Coroutine example
    local function numberGenerator()
        for i = 1, 3 do
            coroutine.yield(i)
        end
    end

    local co = coroutine.create(numberGenerator)
    while true do
        local status, value = coroutine.resume(co)
        if not status then break end
        print(value)
    end
end

-- Call the main function
main()
`;

//************************
// TypeScript
//************************
codeSnippets.typescript = `// Welcome to Code: Color

interface DataResponse<T> {
  status: string;
  data: T;
}

class Person<T = number> {
  private privateField: T;

  constructor(
    private readonly name: string,
    private readonly age: T,
    private readonly flyingForce: number = 9999.99
  ) {
    this.privateField = age;
  }

  speak = (): void => {
    console.log(\`Hello, my name is \${this.name}\`);
  }

  static createDefault(): Person {
    return new Person("Alice", 30);
  }
}

async function fetchData<T>(url: string): Promise<DataResponse<T>> {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw new Error(\`Failed to fetch: \${error}\`);
  }
}

const main = async (): Promise<void> => {
  // Type annotations
  let x: number = 5;

  // Conditional logic with type narrowing
  if (typeof x === "number" && x > 3) {
    console.log("x is greater than 3");
  }

  // Generic array
  const numbers: Array<number> = [1, 2, 3, 4, 5];

  // Array methods with type inference
  const doubled = numbers.map((n): number => n * 2);
  const filtered = numbers.filter((n): boolean => n % 2 === 0);

  // Using the generic class
  const person = new Person<number>("Alice", 30);
  person.speak();

  // Destructuring with type annotations
  const { name, age }: { name: string; age: number } = {
    name: "Alice",
    age: 30
  };

  // Union types
  type Status = "pending" | "success" | "error";
  let status: Status = "pending";

  // Enum example
  enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
  }

  // Type guards
  function isString(value: unknown): value is string {
    return typeof value === "string";
  }

  // Async/await with error handling
  try {
    const data = await fetchData<number[]>("https://api.example.com/data");
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

main().catch(console.error);
`;

//************************
// C
//************************
codeSnippets.c = `// Welcome to Code: Color
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NAME_LENGTH 50
#define DEFAULT_FLYING_FORCE 9999.99

// Structure definition
typedef struct {
    char name[MAX_NAME_LENGTH];
    int age;
    double flying_force;
} Person;

// Function prototypes
void person_speak(const Person* person);
Person* person_create(const char* name, int age, double flying_force);
Person* person_create_default(void);
void person_free(Person* person);

// Implementation
void person_speak(const Person* person) {
    printf("Hello, my name is %s\\n", person->name);
}

Person* person_create(const char* name, int age, double flying_force) {
    Person* person = (Person*)malloc(sizeof(Person));
    if (person == NULL) {
        return NULL;
    }

    strncpy(person->name, name, MAX_NAME_LENGTH - 1);
    person->name[MAX_NAME_LENGTH - 1] = '\\0';
    person->age = age;
    person->flying_force = flying_force;

    return person;
}

Person* person_create_default(void) {
    return person_create("Alice", 30, DEFAULT_FLYING_FORCE);
}

void person_free(Person* person) {
    free(person);
}

// Main function
int main(void) {
    // Conditional logic
    int x = 5;
    if (x > 3) {
        printf("x is greater than 3\\n");
    } else if (x == 3) {
        printf("x is 3\\n");
    } else {
        printf("x is less than 3\\n");
    }

    // Switch statement
    switch(x) {
        case 1:
            printf("one\\n");
            break;
        case 2:
            printf("two\\n");
            break;
        default:
            printf("something else\\n");
    }

    // For loop
    for (int i = 0; i < 5; i++) {
        printf("i is %d\\n", i);
    }

    // Array manipulation
    int numbers[] = {1, 2, 3, 4, 5};
    int array_size = sizeof(numbers) / sizeof(numbers[0]);

    for (int i = 0; i < array_size; i++) {
        printf("%d\\n", numbers[i]);
    }

    // Dynamic memory allocation
    Person* person = person_create("Alice", 30, DEFAULT_FLYING_FORCE);
    if (person != NULL) {
        person_speak(person);
        printf("%s is %d years old\\n", person->name, person->age);
        person_free(person);
    }

    // Pointer arithmetic
    int* dynamic_array = (int*)malloc(5 * sizeof(int));
    if (dynamic_array != NULL) {
        for (int i = 0; i < 5; i++) {
            *(dynamic_array + i) = i + 1;
        }
        free(dynamic_array);
    }

    return 0;
}
`;

//************************
// Go
//************************
codeSnippets.go = `// Welcome to Code: Color
package main

import (
    "fmt"
    "sync"
    "time"
)

// Person struct definition
type Person struct {
    name        string
    age         int
    flyingForce float64
}

// Method for Person
func (p *Person) speak() {
    fmt.Printf("Hello, my name is %s\\n", p.name)
}

// Factory function for Person
func createDefaultPerson() *Person {
    return &Person{
        name:        "Alice",
        age:         30,
        flyingForce: 9999.99,
    }
}

// Interface definition
type DataFetcher interface {
    FetchData(url string) ([]byte, error)
}

// Channel example
func generateNumbers(done chan bool) chan int {
    numbers := make(chan int)
    go func() {
        defer close(numbers)
        for i := 1; i <= 5; i++ {
            numbers <- i
        }
        done <- true
    }()
    return numbers
}

// Main function
func main() {
    // Conditional logic
    x := 5
    if x > 3 {
        fmt.Println("x is greater than 3")
    } else if x == 3 {
        fmt.Println("x is 3")
    } else {
        fmt.Println("x is less than 3")
    }

    // Switch statement
    switch x {
    case 1:
        fmt.Println("one")
    case 2:
        fmt.Println("two")
    default:
        fmt.Println("something else")
    }

    // Slice operations
    numbers := []int{1, 2, 3, 4, 5}
    for i, num := range numbers {
        fmt.Printf("numbers[%d] = %d\\n", i, num)
    }

    // Creating and using a struct
    person := &Person{
        name:        "Alice",
        age:         30,
        flyingForce: 9999.99,
    }
    person.speak()

    // Goroutine with WaitGroup
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        defer wg.Done()
        time.Sleep(time.Millisecond * 100)
        fmt.Println("Goroutine completed")
    }()

    // Channel usage
    done := make(chan bool)
    numberChan := generateNumbers(done)
    go func() {
        for num := range numberChan {
            fmt.Printf("Received: %d\\n", num)
        }
    }()
    <-done

    // Error handling
    result, err := divide(10, 2)
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
    } else {
        fmt.Printf("Result: %f\\n", result)
    }

    // Map usage
    data := map[string]interface{}{
        "name": "Alice",
        "age":  30,
    }
    if val, ok := data["name"]; ok {
        fmt.Printf("Name: %v\\n", val)
    }

    wg.Wait()
}

// Error handling example
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}
`;

//************************
// HTML
//************************
codeSnippets.html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code: Color Demo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Header Section -->
    <header class="site-header">
        <nav class="main-nav">
            <a href="#" class="logo">Code: Color</a>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="container">
        <section class="hero">
            <h1>Welcome to Code: Color</h1>
            <p>A beautiful code editor for developers</p>
            <button class="cta-button">Get Started</button>
        </section>

        <!-- Features Grid -->
        <section class="features">
            <div class="feature-card">
                <i class="icon">🎨</i>
                <h3>Beautiful Themes</h3>
                <p>Choose from various color schemes</p>
            </div>
            <div class="feature-card">
                <i class="icon">⚡</i>
                <h3>Fast Performance</h3>
                <p>Lightning quick response times</p>
            </div>
            <div class="feature-card">
                <i class="icon">🛠️</i>
                <h3>Customizable</h3>
                <p>Make it your own</p>
            </div>
        </section>

        <!-- Contact Form -->
        <form class="contact-form">
            <input type="text" placeholder="Name" required>
            <input type="email" placeholder="Email" required>
            <textarea placeholder="Message"></textarea>
            <button type="submit">Send Message</button>
        </form>
    </main>

    <!-- Footer -->
    <footer class="site-footer">
        <p>&copy; 2024 Code: Color. All rights reserved.</p>
    </footer>
</body>
</html>`;

//************************
// CSS
//************************
codeSnippets.css = `/* Welcome to Code: Color */
/* Reset and Base Styles */
:root {
    --primary-color: #6200ee;
    --secondary-color: #03dac6;
    --background-color: #ffffff;
    --text-color: #333333;
    --spacing-unit: 1rem;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
}

/* Layout Components */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-unit);
}

/* Header and Navigation */
.site-header {
    background-color: var(--primary-color);
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-unit);
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a {
    color: white;
    text-decoration: none;
    transition: color 0.3s ease;
}

.nav-links a:hover {
    color: var(--secondary-color);
}

/* Hero Section */
.hero {
    text-align: center;
    padding: 4rem 0;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

/* Buttons */
.cta-button {
    background-color: var(--secondary-color);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.cta-button:hover {
    transform: translateY(-2px);
}

/* Feature Cards */
.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 4rem 0;
}

.feature-card {
    padding: 2rem;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

/* Contact Form */
.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 600px;
    margin: 4rem auto;
}

.contact-form input,
.contact-form textarea {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.contact-form textarea {
    min-height: 150px;
}

/* Footer */
.site-footer {
    background-color: #f5f5f5;
    padding: 2rem 0;
    text-align: center;
    margin-top: 4rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-links {
        display: none;
    }

    .hero h1 {
        font-size: 2rem;
    }

    .features {
        grid-template-columns: 1fr;
    }
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.feature-card {
    animation: fadeIn 0.5s ease-out forwards;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-color);
}`;
