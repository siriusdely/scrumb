# -*- coding: utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
user = User.create!(email: 'asdf@asdf.asdf', password: 'asdfasdf', password_confirmation: 'asdfasdf')

first_scrum = Scrum.create(
  title: "Two-Minute Breakfast Boost",
  description: "Whizz up a low-fat breakfast smoothie in no time. Use banana with other soft fruit, plus honey for a little sweetness and oats for slow-release fuel.",
  items: "Put all the items in a blender and whizz for 1 min until smooth. Pour the mixture into two glasses to serve.",
  link: "https://www.bbcgoodfood.com/recipes/two-minute-breakfast-smoothie"
)
first_scrum.memberships.create!(user: user, role: :owner)

task = first_scrum.tasks.create(title: "1 banana")
first_scrum.tasks.create(title: "1 tbsp porridge oats")
first_scrum.tasks.create(title: "80g soft fruit (like mango or strawberries)")
first_scrum.tasks.create(title: "150ml milk")
first_scrum.tasks.create(title: "1 tsp honey")
first_scrum.tasks.create(title: "1 tsp vanilla extract")

discussion = task.create_discussion!(topic: task.title)
discussion.messages.create!(content: 'hohoho', user: user)

second_scrum = Scrum.create(
  title: "Kale And Hearty Smoothie",
  description: "Give yourself a dose of vitamin C in the morning with this vegan green smoothie. Along with kale and avocado, there's a hit of zesty lime and pineapple.",
  items: "Put all of the items into a bullet or smoothie maker, add a large splash of water and blitz. Add more water until you have the desired consistency.",
  link: "https://www.bbcgoodfood.com/recipes/kale-smoothie",
)
second_scrum.tasks.create(title: "2 handfuls kale")
second_scrum.tasks.create(title: "½ avocado")
second_scrum.tasks.create(title: "½ lime, juice only")
second_scrum.tasks.create(title: "large handful frozen pineapple chunks")
second_scrum.tasks.create(title: "medium-sized chunk ginger")
second_scrum.tasks.create(title: "1 tbsp cashew nuts")
second_scrum.tasks.create(title: "1 banana, optional")
