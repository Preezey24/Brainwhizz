from flask.cli import AppGroup

seed_commands = AppGroup('seed')

@seed_commands.command('all')
def seed(): 
    seed_users()

@seed_commands.command('undo')
def undo(): 
    undo_users()