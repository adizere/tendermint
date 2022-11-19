(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{772:function(e,t,a){"use strict";a.r(t);var n=a(1),o=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"rfc-011-remove-gas-from-tendermint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rfc-011-remove-gas-from-tendermint"}},[e._v("#")]),e._v(" RFC 011: Remove Gas From Tendermint")]),e._v(" "),a("h2",{attrs:{id:"changelog"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),a("ul",[a("li",[e._v("03-Feb-2022: Initial draft (@williambanfield).")]),e._v(" "),a("li",[e._v("10-Feb-2022: Update in response to feedback (@williambanfield).")]),e._v(" "),a("li",[e._v("11-Feb-2022: Add reflection on MaxGas during consensus (@williambanfield).")])]),e._v(" "),a("h2",{attrs:{id:"abstract"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),a("p",[e._v("In the v0.25.0 release, Tendermint added a mechanism for tracking 'Gas' in the mempool.\nAt a high level, Gas allows applications to specify how much it will cost the network,\noften in compute resources, to execute a given transaction. While such a mechanism is common\nin blockchain applications, it is not generalizable enough to be a maintained as a part\nof Tendermint. This RFC explores the possibility of removing the concept of Gas from\nTendermint while still allowing applications the power to control the contents of\nblocks to achieve similar goals.")]),e._v(" "),a("h2",{attrs:{id:"background"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#background"}},[e._v("#")]),e._v(" Background")]),e._v(" "),a("p",[e._v("The notion of Gas was included in the original Ethereum whitepaper and exists as\nan important feature of the Ethereum blockchain.")]),e._v(" "),a("p",[e._v("The "),a("a",{attrs:{href:"https://ethereum.org/en/whitepaper/#messages-and-transactions",target:"_blank",rel:"noopener noreferrer"}},[e._v("whitepaper describes Gas"),a("OutboundLink")],1),e._v(" as an Anti-DoS mechanism. The Ethereum Virtual Machine\nprovides a Turing complete execution platform. Without any limitations, malicious\nactors could waste computation resources by directing the EVM to perform large\nor even infinite computations. Gas serves as a metering mechanism to prevent this.")]),e._v(" "),a("p",[e._v("Gas appears to have been added to Tendermint multiple times, initially as part of\na now defunct "),a("code",[e._v("/vm")]),e._v(" package, and in its most recent iteration "),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/pull/2360",target:"_blank",rel:"noopener noreferrer"}},[e._v("as part of v0.25.0"),a("OutboundLink")],1),e._v("\nas a mechanism to limit the transactions that will be included in the block by an additional\nparameter.")]),e._v(" "),a("p",[e._v("Gas has gained adoption within the Cosmos ecosystem "),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/c00cedb1427240a730d6eb2be6f7cb01f43869d3/docs/basics/gas-fees.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("as part of the Cosmos SDK"),a("OutboundLink")],1),e._v(".\nThe SDK provides facilities for tracking how much 'Gas' a transaction is expected to take\nand a mechanism for tracking how much gas a transaction has already taken.")]),e._v(" "),a("p",[e._v("Non-SDK applications also make use of the concept of Gas. Anoma appears to implement\n"),a("a",{attrs:{href:"https://github.com/anoma/anoma/blob/6974fe1532a59db3574fc02e7f7e65d1216c1eb2/docs/src/specs/ledger.md#transaction-execution",target:"_blank",rel:"noopener noreferrer"}},[e._v("a gas system"),a("OutboundLink")],1),e._v(" to meter the transactions it executes.")]),e._v(" "),a("p",[e._v("While the notion of gas is present in projects that make use of Tendermint, it is\nnot a concern of Tendermint's. Tendermint's value and goal is producing blocks\nvia a distributed consensus algorithm. Tendermint relies on the application specific\ncode to decide how to handle the transactions Tendermint has produced (or if the\napplication wants to consider them at all). Gas is an application concern.")]),e._v(" "),a("p",[e._v("Our implementation of Gas is not currently enforced by consensus. Our current validation check that\noccurs during block propagation does not verify that the block is under the configured "),a("code",[e._v("MaxGas")]),e._v(".\nEnsuring that the transactions in a proposed block do not exceed "),a("code",[e._v("MaxGas")]),e._v(" would require\ninput from the application during propagation. The "),a("code",[e._v("ProcessProposal")]),e._v(" method introduced\nas part of ABCI++ would enable such input but would further entwine Tendermint and\nthe application. The issue of checking "),a("code",[e._v("MaxGas")]),e._v(" during block propagation is important\nbecause it demonstrates that the feature as it currently exists is not implemented\nas fully as it perhaps should be.")]),e._v(" "),a("p",[e._v("Our implementation of Gas is causing issues for node operators and relayers. At\nthe moment, transactions that overflow the configured 'MaxGas' can be silently rejected\nfrom the mempool. Overflowing MaxGas is the "),a("em",[e._v("only")]),e._v(" way that a transaction can be considered\ninvalid that is not directly a result of failing the "),a("code",[e._v("CheckTx")]),e._v(". Operators, and the application,\ndo not know that a transaction was removed from the mempool for this reason. A stateless check\nof this nature is exactly what "),a("code",[e._v("CheckTx")]),e._v(" exists for and there is no reason for the mempool\nto keep track of this data separately. A special "),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/205bfca66f6da1b2dded381efb9ad3792f9404cf/rpc/coretypes/responses.go#L239",target:"_blank",rel:"noopener noreferrer"}},[e._v("MempoolError"),a("OutboundLink")],1),e._v(" field\nwas added in v0.35 to communicate to clients that a transaction failed after "),a("code",[e._v("CheckTx")]),e._v(".\nWhile this should alleviate the pain for operators wishing to understand if their\ntransaction was included in the mempool, it highlights that the abstraction of\nwhat is included in the mempool is not currently well defined.")]),e._v(" "),a("p",[e._v("Removing Gas from Tendermint and the mempool would allow for the mempool to be a better\nabstraction: any transaction that arrived at "),a("code",[e._v("CheckTx")]),e._v(" and passed the check will either be\na candidate for a later block or evicted after a TTL is reached or to make room for\nother, higher priority transactions. All other transactions are completely invalid and can be discarded forever.")]),e._v(" "),a("p",[e._v("Removing gas will not be completely straightforward. It will mean ensuring that\nequivalent functionality can be implemented outside of the mempool using the mempool's API.")]),e._v(" "),a("h2",{attrs:{id:"discussion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#discussion"}},[e._v("#")]),e._v(" Discussion")]),e._v(" "),a("p",[e._v("This section catalogs the functionality that will need to exist within the Tendermint\nmempool to allow Gas to be removed and replaced by application-side bookkeeping.")]),e._v(" "),a("h3",{attrs:{id:"requirement-provide-mempool-tx-sorting-mechanism"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requirement-provide-mempool-tx-sorting-mechanism"}},[e._v("#")]),e._v(" Requirement: Provide Mempool Tx Sorting Mechanism")]),e._v(" "),a("p",[e._v("Gas produces a market for inclusion in a block. On many networks, a "),a("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/c00cedb1427240a730d6eb2be6f7cb01f43869d3/docs/basics/tx-lifecycle.md#gas-and-fees",target:"_blank",rel:"noopener noreferrer"}},[e._v("gas fee"),a("OutboundLink")],1),e._v(" is\nincluded in pending transactions. This fee indicates how much a user is willing to\npay per unit of execution and the fees are distributed to validators.")]),e._v(" "),a("p",[e._v("Validators wishing to extract higher gas fees are incentivized to include transactions\nwith the highest listed gas fees into each block. This produces a natural ordering\nof the pending transactions. Applications wishing to implement a gas mechanism need\nto be able to order the transactions in the mempool. This can trivially be accomplished\nby sorting transactions using the "),a("code",[e._v("priority")]),e._v(" field available to applications as part of\nv0.35's "),a("code",[e._v("ResponseCheckTx")]),e._v(" message.")]),e._v(" "),a("h3",{attrs:{id:"requirement-allow-application-defined-block-resizing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requirement-allow-application-defined-block-resizing"}},[e._v("#")]),e._v(" Requirement: Allow Application-Defined Block Resizing")]),e._v(" "),a("p",[e._v("When creating a block proposal, Tendermint pulls a set of possible transactions out of\nthe mempool to include in the next block. Tendermint uses MaxGas to limit the set of transactions\nit pulls out of the mempool fetching a set of transactions whose sum is less than MaxGas.")]),e._v(" "),a("p",[e._v("By removing gas tracking from Tendermint's mempool, Tendermint will need to provide a way for\napplications to determine an acceptable set of transactions to include in the block.")]),e._v(" "),a("p",[e._v("This is what the new ABCI++ "),a("code",[e._v("PrepareProposal")]),e._v(" method is useful for. Applications\nthat wish to limit the contents of a block by an application-defined limit may\ndo so by removing transactions from the proposal it is passed during "),a("code",[e._v("PrepareProposal")]),e._v(".\nApplications wishing to reach parity with the current Gas implementation may do\nso by creating an application-side limit: filtering out transactions from\n"),a("code",[e._v("PrepareProposal")]),e._v(" the cause the proposal the exceed the maximum gas. Additionally,\napplications can currently opt to have all transactions in the mempool delivered\nduring "),a("code",[e._v("PrepareProposal")]),e._v(" by passing "),a("code",[e._v("-1")]),e._v(" for "),a("code",[e._v("MaxGas")]),e._v(" and "),a("code",[e._v("MaxBytes")]),e._v(" into\n"),a("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/1ac58469f32a98f1c0e2905ca1773d9eac7b7103/internal/mempool/types.go#L45",target:"_blank",rel:"noopener noreferrer"}},[e._v("ReapMaxBytesMaxGas"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"requirement-handle-transaction-metadata"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#requirement-handle-transaction-metadata"}},[e._v("#")]),e._v(" Requirement: Handle Transaction Metadata")]),e._v(" "),a("p",[e._v("Moving the gas mechanism into applications adds an additional piece of complexity\nto applications. The application must now track how much gas it expects a transaction\nto consume. The mempool currently handles this bookkeeping responsibility and uses the estimated\ngas to determine the set of transactions to include in the block. In order to task\nthe application with keeping track of this metadata, we should make it easier for the\napplication to do so. In general, we'll want to keep only one copy of this type\nof metadata in the program at a time, either in the application or in Tendermint.")]),e._v(" "),a("p",[e._v("The following sections are possible solutions to the problem of storing transaction\nmetadata without duplication.")]),e._v(" "),a("h4",{attrs:{id:"metadata-handling-evicttx-callback"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#metadata-handling-evicttx-callback"}},[e._v("#")]),e._v(" Metadata Handling: EvictTx Callback")]),e._v(" "),a("p",[e._v("A possible approach to handling transaction metadata is by adding a new "),a("code",[e._v("EvictTx")]),e._v("\nABCI method. Whenever the mempool is removing a transaction, either because it has\nreached its TTL or because it failed "),a("code",[e._v("RecheckTx")]),e._v(", "),a("code",[e._v("EvictTx")]),e._v(" would be called with\nthe transaction hash. This would indicate to the application that it could free any\nmetadata it was storing about the transaction such as the computed gas fee.")]),e._v(" "),a("p",[e._v("Eviction callbacks are pretty common in caching systems, so this would be very\nwell-worn territory.")]),e._v(" "),a("h4",{attrs:{id:"metadata-handling-application-specific-metadata-field-s"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#metadata-handling-application-specific-metadata-field-s"}},[e._v("#")]),e._v(" Metadata Handling: Application-Specific Metadata Field(s)")]),e._v(" "),a("p",[e._v("An alternative approach to handling transaction metadata would be would be the\naddition of a new application-metadata field in the "),a("code",[e._v("ResponseCheckTx")]),e._v(". This field\nwould be a protocol buffer message whose contents were entirely opaque to Tendermint.\nThe application would be responsible for marshalling and unmarshalling whatever data\nit stored in this field. During "),a("code",[e._v("PrepareProposal")]),e._v(", the application would be passed\nthis metadata along with the transaction, allowing the application to use it to perform\nany necessary filtering.")]),e._v(" "),a("p",[e._v("If either of these proposed metadata handling techniques are selected, it's likely\nuseful to enable applications to gossip metadata along with the transaction it is\ngossiping. This could easily take the form of an opaque proto message that is\ngossiped along with the transaction.")]),e._v(" "),a("h2",{attrs:{id:"references"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")])])}),[],!1,null,null,null);t.default=o.exports}}]);