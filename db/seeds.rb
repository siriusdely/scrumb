# -*- coding: utf-8 -*-
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
wenhan = User.create!(first_name: 'Wenhan', last_name: 'Zhou', email: 'wenhan@voiceping.com', password: 'asdfasdf', password_confirmation: 'asdfasdf')
sirius = User.create!(first_name: 'Sirius', last_name: 'Dely', email: 'sirius@voiceping.com', password: 'asdfasdf', password_confirmation: 'asdfasdf')
fadil = User.create!(first_name: 'Fadil', last_name: 'Sethyo', email: 'fadil@voiceping.com', password: 'asdfasdf', password_confirmation: 'asdfasdf')
aditya = User.create!(first_name: 'Aditya', last_name: 'Wibisana', email: 'aditya@voiceping.com', password: 'asdfasdf', password_confirmation: 'asdfasdf')

vp_scrum = Scrum.create!(
  title: 'VoicePing Devs Work Log',
  description: 'Daily Stand-up Meeting for VoicePing Developers Scrum'
)

vp_scrum.memberships.create!(user: wenhan, role: :owner)
vp_scrum.memberships.create!(user: sirius, role: :creator)
vp_scrum.memberships.create!(user: fadil, role: :admin)
vp_scrum.memberships.create!(user: aditya, role: :member)

day = vp_scrum.days.create!

task = vp_scrum.tasks.create!(
  title: 'Texting and response API',
  description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"',
  owner: sirius
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 1)

task = vp_scrum.tasks.create!(
  title: 'Focus with Aditya on Releasing 2.7.9',
  description: '- No breaks\n- No new bugs (forever spinning, anything else?)\n- Hiding the "Downloading Group Messages"',
  owner: fadil
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 1)

task = vp_scrum.tasks.create!(
  title: 'Forever Spinning Bug',
  description: '- Try on Idol 3\n- etc\n- etc\n- etc',
  owner: aditya
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 1)

task = vp_scrum.tasks.create!(
  title: 'Continue 2.8.0 after 2.7.9 release',
  owner: fadil
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 2)

task = vp_scrum.tasks.create!(
  title: 'max time',
  description: 'https://www.pivotaltracker.com/n/projects/1197302/stories/158050295',
  owner: aditya
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 2)

task = vp_scrum.tasks.create!(
  title: 'copy paste long text',
  description: 'https://www.pivotaltracker.com/story/show/158056052 ',
  owner: aditya
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 3)

task = vp_scrum.tasks.create!(
  title: 'Chrome upload',
  owner: fadil
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 3)

task = vp_scrum.tasks.create!(
  title: "Review AW's PR",
  owner: fadil
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 4)

task = vp_scrum.tasks.create!(
  title: '3 pending Staging test',
  owner: sirius
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 2)

task = vp_scrum.tasks.create!(
  title: 'Start work on Task management in VP',
  owner: sirius
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 3)

task = vp_scrum.tasks.create!(
  title: 'iOS DC every 2 minutes',
  description: 'Android doesnt have problem, this is ios specific',
  owner: sirius
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 4)

task = vp_scrum.tasks.create!(
  title: 'install NewRelic Infrastructure Monitoring',
  owner: sirius
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 5)

task = vp_scrum.tasks.create!(
  title: '[Everyone] Scrum - Playstore debug APK?',
  description: 'Staging server > Test SR Changes',
  owner: wenhan
)
day.rotations.create!(task: task, user: task.owner, type: :tomorrow, order: 1)

task = vp_scrum.tasks.create!(
  title: 'Not joining Scrum. Travelling in Malaysia for meeting',
  owner: wenhan
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 1)

task = vp_scrum.tasks.create!(
  title: '[Everyone] Please read above',
  description: 'Dev Road Map - June/July 2018',
  owner: wenhan
)
day.rotations.create!(task: task, user: task.owner, type: :tomorrow, order: 2)

task = vp_scrum.tasks.create!(
  title: '[FD/AW] standby as updating taxi (100 users) at 1130',
  description: '[AW] confirm no 15 sec bug on wired/BT',
  owner: fadil
)
day.rotations.create!(task: task, user: wenhan, type: :tomorrow, order: 3)

task = vp_scrum.tasks.create!(
  title: '[AW] Please make latest release builds for all versions',
  description: 'Will be slowly updating blackview customers \nMAKE RELEASE PLAYSTORE so Yoga can start testing',
  owner: aditya
)
day.rotations.create!(task: task, user: wenhan, type: :tomorrow, order: 4)

task = vp_scrum.tasks.create!(
  title: 'Test Intranet APK with intranet server',
  owner: wenhan
)
day.rotations.create!(task: task, user: task.owner, type: :today, order: 2)

task = vp_scrum.tasks.create!(
  title: '[HB/SR] iOS testing with production server to ensure no problem on server',
  owner: sirius
)
day.rotations.create!(task: task, user: wenhan, type: :tomorrow, order: 5)

task = vp_scrum.tasks.create!(
  title: '[WH] ask leave monday 2 july?',
  owner: wenhan
)
day.rotations.create!(task: task, user: aditya, type: :tomorrow, order: 1)

task = vp_scrum.tasks.create!(
  title: '[AW/FD] You can check idenptt branch. Lots of the code related to GRID are placed at grid directory (com.media2359.voiceping -> grid)',
  description: 'Doc: https://docs.google.com/document/d/1As_CBuY7IeoGttopsF1UsjHHXmN8CK6HEvft6EqtGEw/edit',
  owner: fadil
)
day.rotations.create!(task: task, user: sirius, type: :tomorrow, order: 1)

task = vp_scrum.tasks.create!(
  title: 'VoicePing APK with Intranet Server',
  description: 'https://www.pivotaltracker.com/story/show/157996665',
  owner: sirius
)
day.rotations.create!(task: task, user: fadil, type: :tomorrow, order: 3)

task = vp_scrum.tasks.create!(
  title: 'help dashboard production deploy',
  owner: sirius
)
day.rotations.create!(task: task, user: fadil, type: :tomorrow, order: 4)

task = vp_scrum.tasks.create!(
  title: 'Foreground and other 281 stories',
  description: 'Rework the foreground: https://www.pivotaltracker.com/story/show/157764792 (Waiting for test result for Herbert)',
  owner: fadil
)
day.rotations.create!(task: task, user: task.owner, type: :yesterday, order: 1)

task = vp_scrum.tasks.create!(
  title: 'interactive text, prevent user answer twice',
  description: 'https://www.pivotaltracker.com/story/show/158523751',
  owner: aditya
)
day.rotations.create!(task: task, user: task.owner, type: :yesterday, order: 1)

task = vp_scrum.tasks.create!(
  title: 'Screen timeout',
  description: 'https://www.pivotaltracker.com/n/projects/1197302/stories/158021394 app-taxi-release-2.8.1.11-132-d992a0cb0',
  owner: aditya
)
day.rotations.create!(task: task, user: task.owner, type: :yesterday, order: 2)

task = vp_scrum.tasks.create!(
  title: 'Group locking bug happened during yesterday scrum',
  description: '- Test on staging during today scrum \n- Update production on Tuesday night',
  owner: sirius
)
day.rotations.create!(task: task, user: task.owner, type: :yesterday, order: 1)

task = vp_scrum.tasks.create!(
  title: 'Custom URL Build',
  owner: fadil
)
day.rotations.create!(task: task, user: task.owner, type: :yesterday, order: 2)

task = vp_scrum.tasks.create!(
  title: "Review AW's PR",
  owner: fadil
)
day.rotations.create!(task: task, user: task.owner, type: :yesterday, order: 3)

user = User.create!(first_name: 'Asdf', last_name: 'Ghjk', email: 'asdf@asdf.asdf', password: 'asdfasdf', password_confirmation: 'asdfasdf')

first_scrum = Scrum.create(
  title: "Two-Minute Breakfast Boost",
  description: "Whizz up a low-fat breakfast smoothie in no time. Use banana with other soft fruit, plus honey for a little sweetness and oats for slow-release fuel.",
  items: "Put all the items in a blender and whizz for 1 min until smooth. Pour the mixture into two glasses to serve.",
  link: "https://www.bbcgoodfood.com/recipes/two-minute-breakfast-smoothie"
)
first_scrum.memberships.create!(user: user, role: :owner)

task = first_scrum.tasks.create(title: "1 banana")
discussion = task.create_discussion!(topic: task.title)
discussion.messages.create!(content: 'hohoho', user: user)

task = first_scrum.tasks.create(title: "1 tbsp porridge oats")
discussion = task.create_discussion!(topic: task.title)
discussion.messages.create!(content: 'hohoho', user: user)

first_scrum.tasks.create(title: "80g soft fruit (like mango or strawberries)")
first_scrum.tasks.create(title: "150ml milk")
first_scrum.tasks.create(title: "1 tsp honey")
first_scrum.tasks.create(title: "1 tsp vanilla extract")

second_scrum = Scrum.create(
  title: "Kale And Hearty Smoothie",
  description: "Give yourself a dose of vitamin C in the morning with this vegan green smoothie. Along with kale and avocado, there's a hit of zesty lime and pineapple.",
  items: "Put all of the items into a bullet or smoothie maker, add a large splash of water and blitz. Add more water until you have the desired consistency.",
  link: "https://www.bbcgoodfood.com/recipes/kale-smoothie",
)
second_scrum.memberships.create!(user: user, role: :owner)

second_scrum.tasks.create(title: "2 handfuls kale")
second_scrum.tasks.create(title: "½ avocado")
second_scrum.tasks.create(title: "½ lime, juice only")
second_scrum.tasks.create(title: "large handful frozen pineapple chunks")
second_scrum.tasks.create(title: "medium-sized chunk ginger")
second_scrum.tasks.create(title: "1 tbsp cashew nuts")
second_scrum.tasks.create(title: "1 banana, optional")
