# Contribution Guide

<!-- TOC -->

- [Guide For contribution](#Guide-For-contribution)
  
  - [To contribute and pull request](#Contribution-guide)
  - [Commit rules](#Commit-types)


<!-- /TOC -->

## Contribution guide

### 1. Fork this repository

Fork the repository https://github.com/pengcc/against-covid19

### 2. Clone your forked repository
```bash
# replace the XYZ with your own user name
git clone git@github.com:XYZ/against-covid19.git
cd against-covid19
```

### 3. Add remote upstream

```bash
# in the dir against-covid19
git remote add upstream git@github.com:pengcc/against-covid19.git
```

### 4. Create branch feat-bla-bla
```bash
git branch feat-bla-bla
# or switch to your new branch directly
git checkout -b feat-bla-bla develop
```

### 5. Commit your changes, see [Commit rules](#Commit-types)

### 6. Before push check the upstream
```bash
git fetch upstream 
# if need
git rebase upstream 
# if necessary fix the conflict 
```

### 7. Push your commit 
```bash
# don't force push
git push origin my-feat-branch 
```

### 8. Create pull request 
create pull request in the repository https://github.com/pengcc/against-covid19


<!-- /TOC -->
## Commit types

| Commit Type | Title                    | Description                                                                                                 | Emoji | Release                        | Include in changelog |
|:-----------:|--------------------------|-------------------------------------------------------------------------------------------------------------|:-----:|--------------------------------|:--------------------:|
|   `feat`    | Features                 | A new feature                                                                                               |   ✨   | `minor`                        |        `true`        |
|    `fix`    | Bug Fixes                | A bug Fix                                                                                                   |  🐛   | `patch`                        |        `true`        |
|   `docs`    | Documentation            | Documentation only changes                                                                                  |  📚   | `patch` if `scope` is `readme` |        `true`        |
|   `style`   | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |  💎   | -                              |        `true`        |
| `refactor`  | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |  📦   | -                              |        `true`        |
|   `perf`    | Performance Improvements | A code change that improves performance                                                                     |  🚀   | `patch`                        |        `true`        |
|   `test`    | Tests                    | Adding missing tests or correcting existing tests                                                           |  🚨   | -                              |        `true`        |
|   `build`   | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |  🛠   | `patch`                        |        `true`        |
|    `ci`     | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |  ⚙️   | -                              |        `true`        |
|   `chore`   | Chores                   | Other changes that don't modify src or test files                                                           |  ♻️   | -                              |        `true`        |
|  `revert`   | Reverts                  | Reverts a previous commit                                                                                   |  🗑   | -                              |        `true`        |
