/*
* Welcome to Code: Color
*/
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
}
