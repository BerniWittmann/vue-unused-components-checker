# Contributing to Vue Unused Component Checker

✨ Thanks for contributing to **Vue Unused Component Checker** ✨

## How to contribute?

### Improve documentation

As a user, you are the perfect candidate to help us improve our documentation: typo corrections, clarifications, more examples, etc. Every improvement is welcome.

### Give feedback on issues

Some [issues](https://github.com/BerniWittmann/vue-unused-components-checker/issues) are created without enough information to reproduce or resolve them. Help make them easier to resolve by adding any relevant information.

### Fix bugs and implement features

Take a look at the currently open [issues](https://github.com/BerniWittmann/vue-unused-components-checker/issues) or find a bug or feature you want to see implemented and go for it.

## Working with the code

### Setup the workspace

You should have [node](https://nodejs.org/en/) and npm or [yarn](https://yarnpkg.com) installed.

Fork the project and clone your fork:

```bash
# Clone Repository
$ git clone https://github.com/BerniWittmann/vue-unused-components-checker/
# Navigate to newly cloned directory
$ cd vue-unused-components-checker
# Install dependencies
$ npm install
```

### Linting

The project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for formatting

Before pushing your code changes make sure there are no linting errors with

```bash
$ npm run lint
```

### Tests

This repository uses [Jest](https://jestjs.io) for writing and running tests.

Before pushing your code changes make sure there are no failing tests

```bash
$ npm run test
```

## Commit Guidelines

Before each commit, this repository uses [husky](https://typicode.github.io/husky/#/) to check for linting errors and whether the commit message guidelines have been met.

### Commit message guidelines

#### Atomic commits

If possible, make [atomic commits](https://en.wikipedia.org/wiki/Atomic_commit), which means:

- a commit should contain exactly one self-contained functional change
- a functional change should be contained in exactly one commit
- a commit should not create an inconsistent state (such as test errors, linting errors, partial fix, feature with documentation etc...)

A complex feature can be broken down into multiple commits as long as each one maintains a consistent state and consists of a self-contained change.

#### Commit message format

This project uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), a standard to create an explicit commit history.

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```commit
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

The **footer** can contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages).

#### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type

The type must be one of the following:

| Type         | Description                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| **build**    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| **ci**       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| **docs**     | Documentation only changes                                                                                  |
| **feat**     | A new feature                                                                                               |
| **fix**      | A bug fix                                                                                                   |
| **perf**     | A code change that improves performance                                                                     |
| **refactor** | A code change that neither fixes a bug nor adds a feature                                                   |
| **style**    | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)      |
| **test**     | Adding missing tests or correcting existing tests                                                           |

#### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

#### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

#### Examples

```commit
fix(pencil): stop graphite breaking when too much pressure applied
```

```commit
feat(pencil): add 'graphiteWidth' option

Fix #42
```

```commit
perf(pencil): remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed.

The default graphite width of 10mm is always used for performance reasons.
```

## Submitting a Pull Request

Good pull requests, whether patches, improvements, or new features, are a fantastic help. They should remain focused in scope and avoid containing unrelated commits.

**Please ask first** before embarking on any significant pull requests (e.g. implementing features, refactoring code), otherwise you risk spending a lot of time working on something that the project's developers might not want to merge into the project.

If you have never created a pull request before, welcome 🎉 😄. [Here is a great tutorial](https://opensource.guide/how-to-contribute/#opening-a-pull-request) on how to send one :)

Here is a summary of the steps to follow:

1. [Set up the workspace](#setup-the-workspace)
2. If you cloned a while ago, get the latest changes from upstream and update dependencies:

```bash
$ git checkout master
$ git pull upstream master
$ rm -rf node_modules
$ npm install
```

3. Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

```bash
$ git checkout -b <topic-branch-name>
```

4. Make your code changes, following the [Coding rules](#commit-guidelines)
5. Push your topic branch up to your fork:

```bash
$ git push origin <topic-branch-name>
```

6. [Open a Pull Request](https://help.github.com/articles/creating-a-pull-request/#creating-the-pull-request) with a clear title and description.

**Tips**:

- For ambitious tasks, open a Pull Request as soon as possible with the `[WIP]` prefix in the title, in order to get feedback and help from the community.
- [Allow maintainers to make changes to your Pull Request branch](https://help.github.com/articles/allowing-changes-to-a-pull-request-branch-created-from-a-fork). This way, we can rebase it and make some minor changes if necessary.

## Support

Should you need any help, let the maintainers know, send an [email](mailto:dev@bernhardwittmann.com), or open an [issue](https://github.com/BerniWittmann/vue-unused-components-checker/issues).
