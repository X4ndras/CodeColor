-- Welcome to Code: Color
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
