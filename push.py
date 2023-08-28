from os import system

message = input('message: ')

system('git config user.name "feliperalves"')
system('git config user.email "feliperchalves@gmail.com"')
system('git add .')
system('git commit -m "' + message + '"')
system('git push origin master')