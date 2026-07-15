import re

with open('style.css', 'r') as f:
    css = f.read()

# We only want to wrap specific main interactive components.
classes_to_wrap = ['.project-card:hover', '.skill-card:hover', '.repo-card:hover', '.btn-primary:hover', '.btn-secondary:hover', '.about-lens:hover', '.filter-btn:hover', '.nav-link:hover']

# Actually, an easier way is to just append a @media (hover: none) at the bottom 
# and override the transform/box-shadow back to initial, but that's messy.

# Let's just find and wrap the blocks.
# We'll use a simple parser.
blocks = []
current_block = ""
in_block = False
brace_count = 0

for line in css.split('\n'):
    pass
