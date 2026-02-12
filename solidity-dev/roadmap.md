# PHASE 0 — Prerequisites

* Basic programming logic (if/else, functions, variables)
* Basic CLI usage

# PHASE 1 — Blockchain fundamentals

Learn these concepts deeply:

* What is a blockchain
* Transactions vs blocks
* What is gas & fees
* Wallets & addresses
* Public/private keys
* What is consensus
* What is a smart contract

# PHASE 2 — Crypto basics for devs

Learn:

* Hash functions (SHA256, Keccak)
* Digital signatures
* Addresses
* Merkle trees (basic idea)

Not math-heavy — just **how it’s used**.


# PHASE 3 — Solidity language

### Topics:

* Data types (`uint`, `address`, `bool`)
* Functions
* Visibility (`public`, `private`)
* `mapping`, `struct`, `array`
* `require`, `revert`
* `msg.sender`, `msg.value`
* Events
* Modifiers
* Enums
* Inheritance

Example:

```solidity
mapping(address => uint) balances;

function deposit() public payable {
    balances[msg.sender] += msg.value;
}
```

Goal:
Write simple contracts yourself.


# PHASE 4 — Development tools

Learn:

* Remix (quick tests)
* Hardhat or Foundry
* Local blockchain
* Unit tests
* Deploy scripts

Skills:

* Compile
* Deploy
* Test
* Debug

# PHASE 5 — Smart contract security

This is what separates pros from noobs.

Learn:

* Reentrancy
* Integer overflow
* Access control bugs
* Approval misuse
* Front-running
* Denial of service
* Flash loan attacks

Tools:

* Slither
* Mythril
* OpenZeppelin


# PHASE 6 — Token standards

Learn:

* ERC20 (fungible tokens)
* ERC721 (NFTs)
* ERC1155 (multi-token)

Understand:

* `transfer`
* `approve`
* `mint`
* `burn`


# PHASE 7 — DeFi patterns (optional but powerful)

Learn:

* Staking contracts
* Vaults
* Liquidity pools
* Oracles
* Lending

Not build Uniswap — just understand logic.


# PHASE 8 — Advanced topics

* Upgradeable contracts
* Gas optimization
* Proxies
* Multi-sig wallets
* Cross-chain
* Layer 2


# Practice projects (contract-only)

Start with:

1. Counter contract
2. Simple bank
3. ERC20 token
4. Voting contract
5. Escrow
6. Staking contract
7. NFT minting contract

Each project should:
✔ Have tests
✔ Handle errors
✔ Be secure

# Career roles this leads to

* Smart Contract Engineer
* Web3 Backend Engineer
* Blockchain Protocol Dev
* Security Researcher (later)


# One-line summary

> Learn blockchain → cryptography → Solidity → tools → security → token standards → advanced patterns.
