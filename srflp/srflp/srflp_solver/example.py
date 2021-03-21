import json
from pathlib import Path
import os

if __name__ == '__main__':
    from srflp_solver import validator
else:
    from .srflp_solver import validator


path_to_input_file = os.path.join(Path(__file__).parent, 'input-examples', 'basic.json')

with open(path_to_input_file) as json_file:
    srflp_input =json.load(json_file)
