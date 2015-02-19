import sys
import pdb;
from subprocess import call


def test (str) :
    file = open("code.py", "a")
    st = "\nimport os\nimport inspect\nimport re\nimports = 'os', 're', 'inspect', 'sys'\n_file_ = open('vars.py', 'w')\n_file1_ = open('params.py', 'w')\nfor name in dir():\n   if name == ('_return_')  or name.startswith('_') == 0 and name not in imports and name != ('imports') and name != ('_file_') and name != ('_file1_'):\n      if (str(eval(name))).startswith('<function') == 1 :\n         s = name + ' = ' + str(inspect.getargspec(eval(name))[0]) + '\\n'\n         _file1_.write(name + '\\n')\n         for i in range(0, len(inspect.getargspec(eval(name))[0])):\n            _file1_.write(str(inspect.getargspec(eval(name))[0][i]) + '\\n')\n      else:\n         s = name + ' = ' + str(eval(name))+ '\\n'\n      _file_.write(s)\n_file_.close()\n_file1_.close()"
    file.write(st)
    file.close()
    print(call("python code.py"))

if __name__ == "__main__":
    # Map command line arguments to function arguments.
    test(sys.argv[1:])








