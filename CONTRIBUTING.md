## Contributing
If you're interested in contributing new features requests, synthesis research, bug fixes, or desired enhancements to decentralized interfaces, DIY nodes, and Stable Diffusion integrations, you are always encouraged to open an issue, ask questions, or make note of anything that might be unclear, confusing, or just plain out of place.

Please follow the contribution steps for a general workflow of what contributions might look like before submitting a pull request.

#### Cloning the repository
To start contributing to the project, clone it to your local machine using git:

`git clone https://github.com/emmajane1313/inarisynth.git`

Or the  [GitHub CLI](https://cli.github.com/):

`gh repo clone emmajane1313/inarisynth`

#### Installing dependencies

Once in the project's root directory, run the following command to install the project's dependencies:

```bash
npm install
# or
npm i
```

#### Starting the development server

Once in the project's root directory, run the following to start the development server:

`npm run dev`

Inari Synth uses `Next.js`, `Typescript`, and `tailwindcss`.

#### Environment Variables
You will need the following environment variables for authentication credentials to run the image synthesis api, hash files to IPFS and connect to an RPC through Rainbow Wallet:
* Replicate API Token
* Web3 Storage 
* Alchemy ID

You can also choose to use another IPFS storage or RPC provider. 

#### Submitting a pull request

When you're ready to submit a pull request, you can follow these naming conventions:

-   Pull request titles use the  [Imperative Mood](https://en.wikipedia.org/wiki/Imperative_mood)  (e.g.,  `Add something`,  `Fix something`).

When you submit a pull request, GitHub will automatically lint, build, and test your changes. If you see an ❌, it's most likely a bug in your code. Please, inspect the logs through the GitHub UI to find the cause.

  