# -*- coding: utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

first_scrum = Scrum.create(
  title: "Two-Minute Breakfast Boost",
  description: "Whizz up a low-fat breakfast smoothie in no time. Use banana with other soft fruit, plus honey for a little sweetness and oats for slow-release fuel.",
  items: "Put all the items in a blender and whizz for 1 min until smooth. Pour the mixture into two glasses to serve.",
  link: "https://www.bbcgoodfood.com/recipes/two-minute-breakfast-smoothie"
)
first_scrum.items.create(description: "1 banana")
first_scrum.items.create(description: "1 tbsp porridge oats")
first_scrum.items.create(description: "80g soft fruit (like mango or strawberries)")
first_scrum.items.create(description: "150ml milk")
first_scrum.items.create(description: "1 tsp honey")
first_scrum.items.create(description: "1 tsp vanilla extract")

second_scrum = Scrum.create(
  title: "Kale And Hearty Smoothie",
  description: "Give yourself a dose of vitamin C in the morning with this vegan green smoothie. Along with kale and avocado, there's a hit of zesty lime and pineapple.",
  items: "Put all of the items into a bullet or smoothie maker, add a large splash of water and blitz. Add more water until you have the desired consistency.",
  link: "https://www.bbcgoodfood.com/recipes/kale-smoothie",
)
second_scrum.items.create(description: "2 handfuls kale")
second_scrum.items.create(description: "½ avocado")
second_scrum.items.create(description: "½ lime, juice only")
second_scrum.items.create(description: "large handful frozen pineapple chunks")
second_scrum.items.create(description: "medium-sized chunk ginger")
second_scrum.items.create(description: "1 tbsp cashew nuts")
second_scrum.items.create(description: "1 banana, optional")
