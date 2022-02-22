# Contributing

Thank you for your interest in contributing to the the Bibliotheca interfaces!

# Development

## Running the interface locally

1. `yarn install`
1. `yarn start`

## Creating a production build

1. `yarn install`
1. `yarn build`

## Engineering standards

Code merged into the `main` branch of this repository should adhere to high standards of correctness and maintainability.
Use your best judgment when applying these standards. If code is in the critical path, will be frequently visited, or
makes large architectural changes, consider following all the standards.

- Have at least one engineer approve of large code refactorings
- At least manually test small code changes, prefer automated tests
- Thoroughly unit test when code is not obviously correct
- If something breaks, add automated tests so it doesn't break again
- Add integration tests for new pages or flows
- Verify that all CI checks pass before merging
- Have at least one product manager or designer approve of any significant UX changes

## Guidelines

The following points should help guide your development:

- Security: the interface is safe to use
  - Avoid adding unnecessary dependencies due to [supply chain risk](https://github.com/LavaMoat/lavamoat#further-reading-on-software-supplychain-security)
- Reproducibility: anyone can build the interface
  - Avoid adding steps to the development/build processes
  - The build must be deterministic, i.e. a particular commit hash always produces the same build
- Decentralization: anyone can run the interface
- Accessibility: anyone can use the interface
  - The interface should be responsive, and where possible should run well on low performance devices (majority of swaps on mobile!)

## Release process

TBD - Releases are currently formed around product launches and required fixes

Fix pull requests should be merged whenever ready and tested.
If a fix is urgently needed in production, releases can be manually triggered on [GitHub](\\
after the fix is merged into `main`.

Features should not be merged into `main` until they are ready for users.
When building larger features or collaborating with other developers, create a new branch from `main` to track its development.
Use the automatic Vercel preview for sharing the feature to collect feedback.  
When the feature is ready for review, create a new pull request from the feature branch into `main` and request reviews from
the appropriate UX reviewers (PMs or designers).

## Finding a first issue

Start with issues with the label
testdep
