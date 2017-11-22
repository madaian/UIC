# Crowdsourced Language Translation

Group project for CS-E5220 - User Interface Construction

## Git stuff (command line)

**Cloning the repo**
- Click 'clone or download'
- Copy ssh or https link
  - https asks for login credentials when handling repo
  - ssh requires ssh key
- Terminal (in appropriate folder): `git clone [link]`

**Working with the repo**
- Make changes
  - `git status`: see if you have uncommitted changes
  - `git add [filepath for certain file or -A to add everything]`: prepare for commit
  - `git commit -m "commit message here"`: add a descriptive message of what the changes are
  - `git push`: push the changes to the repo
    - Might get message about not being up-to-date, requires pulling and possibly merging
- Retrieve changes
  - `git pull`: pull changes from the repo
    - might get message about "merge conflict", check the file names and fix them manually
