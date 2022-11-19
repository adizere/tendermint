(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{767:function(e,t,n){"use strict";n.r(t);var s=n(1),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"rfc-003-taxonomy-of-potential-performance-issues-in-tendermint"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rfc-003-taxonomy-of-potential-performance-issues-in-tendermint"}},[e._v("#")]),e._v(" RFC 003: Taxonomy of potential performance issues in Tendermint")]),e._v(" "),n("h2",{attrs:{id:"changelog"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),n("ul",[n("li",[e._v("2021-09-02: Created initial draft (@wbanfield)")]),e._v(" "),n("li",[e._v("2021-09-14: Add discussion of the event system (@wbanfield)")])]),e._v(" "),n("h2",{attrs:{id:"abstract"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),n("p",[e._v("This document discusses the various sources of performance issues in Tendermint and\nattempts to clarify what work may be required to understand and address them.")]),e._v(" "),n("h2",{attrs:{id:"background"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#background"}},[e._v("#")]),e._v(" Background")]),e._v(" "),n("p",[e._v("Performance, loosely defined as the ability of a software process to perform its work\nquickly and efficiently under load and within reasonable resource limits, is a frequent\ntopic of discussion in the Tendermint project.\nTo effectively address any issues with Tendermint performance we need to\ncategorize the various issues, understand their potential sources, and gauge their\nimpact on users.")]),e._v(" "),n("p",[e._v("Categorizing the different known performance issues will allow us to discuss and fix them\nmore systematically. This document proposes a rough taxonomy of performance issues\nand highlights areas where more research into potential performance problems is required.")]),e._v(" "),n("p",[e._v("Understanding Tendermint's performance limitations will also be critically important\nas we make changes to many of its subsystems. Performance is a central concern for\nupcoming decisions regarding the "),n("code",[e._v("p2p")]),e._v(" protocol, RPC message encoding and structure,\ndatabase usage and selection, and consensus protocol updates.")]),e._v(" "),n("h2",{attrs:{id:"discussion"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#discussion"}},[e._v("#")]),e._v(" Discussion")]),e._v(" "),n("p",[e._v("This section attempts to delineate the different sections of Tendermint functionality\nthat are often cited as having performance issues. It raises questions and suggests\nlines of inquiry that may be valuable for better understanding Tendermint's performance issues.")]),e._v(" "),n("p",[e._v("As a note: We should avoid quickly adding many microbenchmarks or package level benchmarks.\nThese are prone to being worse than useless as they can obscure what "),n("em",[e._v("should")]),e._v(" be\nfocused on: performance of the system from the perspective of a user. We should,\ninstead, tune performance with an eye towards user needs and actions users make. These users comprise\nboth operators of Tendermint chains and the people generating transactions for\nTendermint chains. Both of these sets of users are largely aligned in wanting an end-to-end\nsystem that operates quickly and efficiently.")]),e._v(" "),n("p",[e._v("REQUEST: The list below may be incomplete, if there are additional sections that are often\ncited as creating poor performance, please comment so that they may be included.")]),e._v(" "),n("h3",{attrs:{id:"p2p"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#p2p"}},[e._v("#")]),e._v(" P2P")]),e._v(" "),n("h4",{attrs:{id:"claim-tendermint-cannot-scale-to-large-numbers-of-nodes"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-tendermint-cannot-scale-to-large-numbers-of-nodes"}},[e._v("#")]),e._v(" Claim: Tendermint cannot scale to large numbers of nodes")]),e._v(" "),n("p",[e._v("A complaint has been reported that Tendermint networks cannot scale to large numbers of nodes.\nThe listed number of nodes a user reported as causing issue was in the thousands.\nWe don't currently have evidence about what the upper-limit of nodes that Tendermint's\nP2P stack can scale to.")]),e._v(" "),n("p",[e._v("We need to more concretely understand the source of issues and determine what layer\nis causing a problem. It's possible that the P2P layer, in the absence of any reactors\nsending data, is perfectly capable of managing thousands of peer connections. For\na reasonable networking and application setup, thousands of connections should not present any\nissue for the application.")]),e._v(" "),n("p",[e._v("We need more data to understand the problem directly. We want to drive the popularity\nand adoption of Tendermint and this will mean allowing for chains with more validators.\nWe should follow up with users experiencing this issue. We may then want to add\na series of metrics to the P2P layer to better understand the inefficiencies it produces.")]),e._v(" "),n("p",[e._v("The following metrics can help us understand the sources of latency in the Tendermint P2P stack:")]),e._v(" "),n("ul",[n("li",[e._v("Number of messages sent and received per second")]),e._v(" "),n("li",[e._v("Time of a message spent on the P2P layer send and receive queues")])]),e._v(" "),n("p",[e._v("The following metrics exist and should be leveraged in addition to those added:")]),e._v(" "),n("ul",[n("li",[e._v("Number of peers node's connected to")]),e._v(" "),n("li",[e._v("Number of bytes per channel sent and received from each peer")])]),e._v(" "),n("h3",{attrs:{id:"sync"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sync"}},[e._v("#")]),e._v(" Sync")]),e._v(" "),n("h4",{attrs:{id:"claim-block-syncing-is-slow"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-block-syncing-is-slow"}},[e._v("#")]),e._v(" Claim: Block Syncing is slow")]),e._v(" "),n("p",[e._v("Bootstrapping a new node in a network to the height of the rest of the network is believed to\ntake longer than users would like. Block sync requires fetching all of the blocks from\npeers and placing them into the local disk for storage. A useful line of inquiry\nis understanding how quickly a perfectly tuned system "),n("em",[e._v("could")]),e._v(" fetch all of the state\nover a network so that we understand how much overhead Tendermint actually adds.")]),e._v(" "),n("p",[e._v("The operation is likely to be "),n("em",[e._v("incredibly")]),e._v(" dependent on the environment in which\nthe node is being run. The factors that will influence syncing include:")]),e._v(" "),n("ol",[n("li",[e._v("Number of peers that a syncing node may fetch from.")]),e._v(" "),n("li",[e._v("Speed of the disk that a validator is writing to.")]),e._v(" "),n("li",[e._v("Speed of the network connection between the different peers that node is\nsyncing from.")])]),e._v(" "),n("p",[e._v("We should calculate how quickly this operation "),n("em",[e._v("could possibly")]),e._v(" complete for common chains and nodes.\nTo calculate how quickly this operation could possibly complete, we should assume that\na node is reading at line-rate of the NIC and writing at the full drive speed to its\nlocal storage. Comparing this theoretical upper-limit to the actual sync times\nobserved by node operators will give us a good point of comparison for understanding\nhow much overhead Tendermint incurs.")]),e._v(" "),n("p",[e._v("We should additionally add metrics to the blocksync operation to more clearly pinpoint\nslow operations. The following metrics should be added to the block syncing operation:")]),e._v(" "),n("ul",[n("li",[e._v("Time to fetch and validate each block")]),e._v(" "),n("li",[e._v("Time to execute a block")]),e._v(" "),n("li",[e._v("Blocks sync'd per unit time")])]),e._v(" "),n("h3",{attrs:{id:"application"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#application"}},[e._v("#")]),e._v(" Application")]),e._v(" "),n("p",[e._v("Applications performing complex state transitions have the potential to bottleneck\nthe Tendermint node.")]),e._v(" "),n("h4",{attrs:{id:"claim-abci-block-delivery-could-cause-slowdown"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-abci-block-delivery-could-cause-slowdown"}},[e._v("#")]),e._v(" Claim: ABCI block delivery could cause slowdown")]),e._v(" "),n("p",[e._v("ABCI delivers blocks in several methods: "),n("code",[e._v("BeginBlock")]),e._v(", "),n("code",[e._v("DeliverTx")]),e._v(", "),n("code",[e._v("EndBlock")]),e._v(", "),n("code",[e._v("Commit")]),e._v(".")]),e._v(" "),n("p",[e._v("Tendermint delivers transactions one-by-one via the "),n("code",[e._v("DeliverTx")]),e._v(" call. Most of the\ntransaction delivery in Tendermint occurs asynchronously and therefore appears unlikely to\nform a bottleneck in ABCI.")]),e._v(" "),n("p",[e._v("After delivering all transactions, Tendermint then calls the "),n("code",[e._v("Commit")]),e._v(" ABCI method.\nTendermint "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/spec/abci/abci++_methods.md#commit",target:"_blank",rel:"noopener noreferrer"}},[e._v("locks all access to the mempool"),n("OutboundLink")],1),e._v(" while "),n("code",[e._v("Commit")]),e._v("\nproceeds. This means that an application that is slow to execute all of its\ntransactions or finalize state during the "),n("code",[e._v("Commit")]),e._v(" method will prevent any new\ntransactions from being added to the mempool.  Apps that are slow to commit will\nprevent consensus from proceeded to the next consensus height since Tendermint\ncannot validate block proposals or produce block proposals without the\nAppHash obtained from the "),n("code",[e._v("Commit")]),e._v(" method. We should add a metric for each\nstep in the ABCI protocol to track the amount of time that a node spends communicating\nwith the application at each step.")]),e._v(" "),n("h4",{attrs:{id:"claim-abci-serialization-overhead-causes-slowdown"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-abci-serialization-overhead-causes-slowdown"}},[e._v("#")]),e._v(" Claim: ABCI serialization overhead causes slowdown")]),e._v(" "),n("p",[e._v("The most common way to run a Tendermint application is using the Cosmos-SDK.\nThe Cosmos-SDK runs the ABCI application within the same process as Tendermint.\nWhen an application is run in the same process as Tendermint, a serialization penalty\nis not paid. This is because the local ABCI client does not serialize method calls\nand instead passes the protobuf type through directly. This can be seen\nin "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/511bd3eb7f037855a793a27ff4c53c12f085b570/abci/client/local_client.go#L84",target:"_blank",rel:"noopener noreferrer"}},[e._v("local_client.go"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("p",[e._v("Serialization and deserialization in the gRPC and socket protocol ABCI methods\nmay cause slowdown. While these may cause issue, they are not part of the primary\nusecase of Tendermint and do not necessarily need to be addressed at this time.")]),e._v(" "),n("h3",{attrs:{id:"rpc"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rpc"}},[e._v("#")]),e._v(" RPC")]),e._v(" "),n("h4",{attrs:{id:"claim-the-query-api-is-slow"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-the-query-api-is-slow"}},[e._v("#")]),e._v(" Claim: The Query API is slow.")]),e._v(" "),n("p",[e._v("The query API locks a mutex across the ABCI connections. This causes consensus to\nslow during queries, as ABCI is no longer able to make progress. This is known\nto be causing issue in the cosmos-sdk and is being addressed "),n("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/pull/10045",target:"_blank",rel:"noopener noreferrer"}},[e._v("in the sdk"),n("OutboundLink")],1),e._v("\nbut a more robust solution may be required. Adding metrics to each ABCI client connection\nand message as described in the Application section of this document would allow us\nto further introspect the issue here.")]),e._v(" "),n("h4",{attrs:{id:"claim-rpc-serialization-may-cause-slowdown"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-rpc-serialization-may-cause-slowdown"}},[e._v("#")]),e._v(" Claim: RPC Serialization may cause slowdown")]),e._v(" "),n("p",[e._v("The Tendermint RPC uses a modified version of JSON-RPC. This RPC powers the "),n("code",[e._v("broadcast_tx_*")]),e._v(" methods,\nwhich is a critical method for adding transactions to Tendermint at the moment. This method is\nlikely invoked quite frequently on popular networks. Being able to perform efficiently\non this common and critical operation is very important. The current JSON-RPC implementation\nrelies heavily on type introspection via reflection, which is known to be very slow in\nGo. We should therefore produce benchmarks of this method to determine how much overhead\nwe are adding to what, is likely to be, a very common operation.")]),e._v(" "),n("p",[e._v("The other JSON-RPC methods are much less critical to the core functionality of Tendermint.\nWhile there may other points of performance consideration within the RPC, methods that do not\nreceive high volumes of requests should not be prioritized for performance consideration.")]),e._v(" "),n("p",[e._v("NOTE: Previous discussion of the RPC framework was done in "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/docs/architecture/adr-057-RPC.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("ADR 57"),n("OutboundLink")],1),e._v(" and\nthere is ongoing work to inspect and alter the JSON-RPC framework in "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/pull/6913",target:"_blank",rel:"noopener noreferrer"}},[e._v("RFC 002"),n("OutboundLink")],1),e._v(".\nMuch of these RPC-related performance considerations can either wait until the work of RFC 002 work is done or be\nconsidered concordantly with the in-flight changes to the JSON-RPC.")]),e._v(" "),n("h3",{attrs:{id:"protocol"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#protocol"}},[e._v("#")]),e._v(" Protocol")]),e._v(" "),n("h4",{attrs:{id:"claim-gossiping-messages-is-a-slow-process"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-gossiping-messages-is-a-slow-process"}},[e._v("#")]),e._v(" Claim: Gossiping messages is a slow process")]),e._v(" "),n("p",[e._v("Currently, for any validator to successfully vote in a consensus "),n("em",[e._v("step")]),e._v(", it must\nreceive votes from greater than 2/3 of the validators on the network. In many cases,\nit's preferable to receive as many votes as possible from correct validators.")]),e._v(" "),n("p",[e._v("This produces a quadratic increase in messages that are communicated as more validators join the network.\n(Each of the N validators must communicate with all other N-1 validators).")]),e._v(" "),n("p",[e._v("This large number of messages communicated per step has been identified to impact\nperformance of the protocol. Given that the number of messages communicated has been\nidentified as a bottleneck, it would be extremely valuable to gather data on how long\nit takes for popular chains with many validators to gather all votes within a step.")]),e._v(" "),n("p",[e._v("Metrics that would improve visibility into this include:")]),e._v(" "),n("ul",[n("li",[e._v("Amount of time for a node to gather votes in a step.")]),e._v(" "),n("li",[e._v("Amount of time for a node to gather all block parts.")]),e._v(" "),n("li",[e._v("Number of votes each node sends to gossip (i.e. not its own votes, but votes it is\ntransmitting for a peer).")]),e._v(" "),n("li",[e._v("Total number of votes each node sends to receives (A node may receive duplicate votes\nso understanding how frequently this occurs will be valuable in evaluating the performance\nof the gossip system).")])]),e._v(" "),n("h4",{attrs:{id:"claim-hashing-txs-causes-slowdown-in-tendermint"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-hashing-txs-causes-slowdown-in-tendermint"}},[e._v("#")]),e._v(" Claim: Hashing Txs causes slowdown in Tendermint")]),e._v(" "),n("p",[e._v("Using a faster hash algorithm for Tx hashes is currently a point of discussion\nin Tendermint. Namely, it is being considered as part of the "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/pull/6773",target:"_blank",rel:"noopener noreferrer"}},[e._v("modular hashing proposal"),n("OutboundLink")],1),e._v(".\nIt is currently unknown if hashing transactions in the Mempool forms a significant bottleneck.\nAlthough it does not appear to be documented as slow, there are a few open github\nissues that indicate a possible user preference for a faster hashing algorithm,\nincluding "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/2187",target:"_blank",rel:"noopener noreferrer"}},[e._v("issue 2187"),n("OutboundLink")],1),e._v(" and "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/issues/2186",target:"_blank",rel:"noopener noreferrer"}},[e._v("issue 2186"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("p",[e._v("It is likely worth investigating what order of magnitude Tx hashing takes in comparison to other\naspects of adding a Tx to the mempool. It is not currently clear if the rate of adding Tx\nto the mempool is a source of user pain. We should not endeavor to make large changes to\nconsensus critical components without first being certain that the change is highly\nvaluable and impactful.")]),e._v(" "),n("h3",{attrs:{id:"digital-signatures"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#digital-signatures"}},[e._v("#")]),e._v(" Digital Signatures")]),e._v(" "),n("h4",{attrs:{id:"claim-verification-of-digital-signatures-may-cause-slowdown-in-tendermint"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-verification-of-digital-signatures-may-cause-slowdown-in-tendermint"}},[e._v("#")]),e._v(" Claim: Verification of digital signatures may cause slowdown in Tendermint")]),e._v(" "),n("p",[e._v("Working with cryptographic signatures can be computationally expensive. The cosmos\nhub uses "),n("a",{attrs:{href:"https://github.com/cosmos/gaia/blob/0ecb6ed8a244d835807f1ced49217d54a9ca2070/docs/resources/genesis.md#consensus-parameters",target:"_blank",rel:"noopener noreferrer"}},[e._v("ed25519 signatures"),n("OutboundLink")],1),e._v(". The library performing signature\nverification in Tendermint on votes is "),n("a",{attrs:{href:"https://github.com/oasisprotocol/curve25519-voi/blob/d2e7fc59fe38c18ca990c84c4186cba2cc45b1f9/PERFORMANCE.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("benchmarked"),n("OutboundLink")],1),e._v(" to be able to perform an "),n("code",[e._v("ed25519")]),e._v("\nsignature in 75μs on a decently fast CPU. A validator in the Cosmos Hub performs\n3 sets of verifications on the signatures of the 140 validators in the Hub\nin a consensus round, during block verification, when verifying the prevotes, and\nwhen verifying the precommits. With no batching, this would be roughly "),n("code",[e._v("3ms")]),e._v(" per\nround. It is quite unlikely, therefore, that this accounts for any serious amount\nof the ~7 seconds of block time per height in the Hub.")]),e._v(" "),n("p",[e._v("This may cause slowdown when syncing, since the process needs to constantly verify\nsignatures. It's possible that improved signature aggregation will lead to improved\nlight client or other syncing performance. In general, a metric should be added\nto track block rate while blocksyncing.")]),e._v(" "),n("h4",{attrs:{id:"claim-our-use-of-digital-signatures-in-the-consensus-protocol-contributes-to-performance-issue"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-our-use-of-digital-signatures-in-the-consensus-protocol-contributes-to-performance-issue"}},[e._v("#")]),e._v(" Claim: Our use of digital signatures in the consensus protocol contributes to performance issue")]),e._v(" "),n("p",[e._v("Currently, Tendermint's digital signature verification requires that all validators\nreceive all vote messages. Each validator must receive the complete digital signature\nalong with the vote message that it corresponds to. This means that all N validators\nmust receive messages from at least 2/3 of the N validators in each consensus\nround. Given the potential for oddly shaped network topologies and the expected\nvariable network roundtrip times of a few hundred milliseconds in a blockchain,\nit is highly likely that this amount of gossiping is leading to a significant amount\nof the slowdown in the Cosmos Hub and in Tendermint consensus.")]),e._v(" "),n("h3",{attrs:{id:"tendermint-event-system"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#tendermint-event-system"}},[e._v("#")]),e._v(" Tendermint Event System")]),e._v(" "),n("h4",{attrs:{id:"claim-the-event-system-is-a-bottleneck-in-tendermint"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#claim-the-event-system-is-a-bottleneck-in-tendermint"}},[e._v("#")]),e._v(" Claim: The event system is a bottleneck in Tendermint")]),e._v(" "),n("p",[e._v("The Tendermint Event system is used to communicate and store information about\ninternal Tendermint execution. The system uses channels internally to send messages\nto different subscribers. Sending an event "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/5bd3b286a2b715737f6d6c33051b69061d38f8ef/libs/pubsub/pubsub.go#L338",target:"_blank",rel:"noopener noreferrer"}},[e._v("blocks on the internal channel"),n("OutboundLink")],1),e._v(".\nThe default configuration is to "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/5bd3b286a2b715737f6d6c33051b69061d38f8ef/types/event_bus.go#L14",target:"_blank",rel:"noopener noreferrer"}},[e._v("use an unbuffered channel for event publishes"),n("OutboundLink")],1),e._v(".\nSeveral consumers of the event system also use an unbuffered channel for reads.\nAn example of this is the "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/5bd3b286a2b715737f6d6c33051b69061d38f8ef/state/indexer/indexer_service.go#L39",target:"_blank",rel:"noopener noreferrer"}},[e._v("event indexer"),n("OutboundLink")],1),e._v(", which takes an\nunbuffered subscription to the event system. The result is that these unbuffered readers\ncan cause writes to the event system to block or slow down depending on contention in the\nevent system. This has implications for the consensus system, which "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/5bd3b286a2b715737f6d6c33051b69061d38f8ef/internal/consensus/state.go#L1573",target:"_blank",rel:"noopener noreferrer"}},[e._v("publishes events"),n("OutboundLink")],1),e._v(".\nTo better understand the performance of the event system, we should add metrics to track the timing of\nevent sends. The following metrics would be a good start for tracking this performance:")]),e._v(" "),n("ul",[n("li",[e._v("Time in event send, labeled by Event Type")]),e._v(" "),n("li",[e._v("Time in event receive, labeled by subscriber")]),e._v(" "),n("li",[e._v("Event throughput, measured in events per unit time.")])]),e._v(" "),n("h3",{attrs:{id:"references"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")])])}),[],!1,null,null,null);t.default=o.exports}}]);