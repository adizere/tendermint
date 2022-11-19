(window.webpackJsonp=window.webpackJsonp||[]).push([[169],{807:function(e,t,n){"use strict";n.r(t);var o=n(1),r=Object(o.a)({},(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"rfc-021-the-future-of-the-socket-protocol"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rfc-021-the-future-of-the-socket-protocol"}},[e._v("#")]),e._v(" RFC 021: The Future of the Socket Protocol")]),e._v(" "),n("h2",{attrs:{id:"changelog"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),n("ul",[n("li",[e._v("19-May-2022: Initial draft (@creachadair)")]),e._v(" "),n("li",[e._v("19-Jul-2022: Converted from ADR to RFC (@creachadair)")])]),e._v(" "),n("h2",{attrs:{id:"abstract"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),n("p",[e._v("This RFC captures some technical discussion about the ABCI socket protocol that\nwas originally documented to solicit an architectural decision.  This topic was\nnot high-enough priority as of this writing to justify making a final decision.")]),e._v(" "),n("p",[e._v("For that reason, the text of this RFC has the general structure of an ADR, but\nshould be viewed primarily as a record of the issue for future reference.")]),e._v(" "),n("h2",{attrs:{id:"background"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#background"}},[e._v("#")]),e._v(" Background")]),e._v(" "),n("p",[e._v("The "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/tree/main/spec/abci",target:"_blank",rel:"noopener noreferrer"}},[e._v("Application Blockchain Interface (ABCI)"),n("OutboundLink")],1),e._v(" is a client-server protocol\nused by the Tendermint consensus engine to communicate with the application on\nwhose behalf it performs state replication. There are currently three transport\noptions available for ABCI applications:")]),e._v(" "),n("ol",[n("li",[n("p",[n("strong",[e._v("In-process")]),e._v(': Applications written in Go can be linked directly into the\nsame binary as the consensus node. Such applications use a "local" ABCI\nconnection, which exposes application methods to the node as direct function\ncalls.')])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Socket protocol")]),e._v(": Out-of-process applications may export the ABCI service\nvia a custom socket protocol that sends requests and responses over a\nUnix-domain or TCP socket connection as length-prefixed protocol buffers.\nIn Tendermint, this is handled by the "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/abci/client/socket_client.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("socket client"),n("OutboundLink")],1),e._v(".")])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("gRPC")]),e._v(": Out-of-process applications may export the ABCI service via gRPC.\nIn Tendermint, this is handled by the "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/abci/client/grpc_client.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("gRPC client"),n("OutboundLink")],1),e._v(".")])])]),e._v(" "),n("p",[e._v("Both the out-of-process options (2) and (3) have a long history in Tendermint.\nThe beginnings of the gRPC client were added in "),n("a",{attrs:{href:"https://github.com/tendermint/abci/commit/1ab3c747182aaa38418258679c667090c2bb1e0d",target:"_blank",rel:"noopener noreferrer"}},[e._v("May 2016"),n("OutboundLink")],1),e._v(' when\nABCI was still hosted in a separate repository, and the socket client (formerly\ncalled the "remote client") was part of ABCI from its inception in November\n2015.')]),e._v(" "),n("p",[e._v("At that time when ABCI was first being developed, the gRPC project was very new\n(it launched Q4 2015) and it was not an obvious choice for use in Tendermint.\nIt took a while before the language coverage and quality of gRPC reached a\npoint where it could be a viable solution for out-of-process applications.  For\nthat reason, it made sense for the initial design of ABCI to focus on a custom\nprotocol for out-of-process applications.")]),e._v(" "),n("h2",{attrs:{id:"problem-statement"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#problem-statement"}},[e._v("#")]),e._v(" Problem Statement")]),e._v(" "),n("p",[e._v("For practical reasons, ABCI needs an interprocess communication option to\nsupport applications not written in Go. The two practical options are RPC and\nFFI, and for operational reasons an RPC mechanism makes more sense.")]),e._v(" "),n("p",[e._v("The socket protocol has not changed all that substantially since its original\ndesign, and has the advantage of being simple to implement in almost any\nreasonable language.  However, its simplicity includes some limitations that\nhave had a negative impact on the stability and performance of out-of-process\napplications using it. In particular:")]),e._v(" "),n("ul",[n("li",[n("p",[e._v("The protocol lacks request identifiers, so the client and server must return\nresponses in strict FIFO order. Even if the client issues requests that have\nno dependency on each other, the protocol has no way except order of issue to\nmap responses to requests.")]),e._v(" "),n("p",[e._v("This reduces (in some cases substantially) the concurrency an application can\nexploit, since the parallelism of requests in flight is gated by the slowest\nactive request at any moment.  There have been complaints from some network\noperators on that basis.")])]),e._v(" "),n("li",[n("p",[e._v("The protocol lacks method identifiers, so the only way for the client and\nserver to understand which operation is requested is to dispatch on the type\nof the request and response payloads. For responses, this means that "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/abci/client/socket_client.go#L149",target:"_blank",rel:"noopener noreferrer"}},[e._v("any\nerror condition is terminal not only to the request, but to the entire ABCI\nclient"),n("OutboundLink")],1),e._v(".")]),e._v(" "),n("p",[e._v("The historical intent of terminating for any error seems to have been that\nall ABCI errors are unrecoverable and hence protocol fatal "),e._v("\n(see "),n("a",{attrs:{href:"#note1"}},[e._v("Note 1")]),e._v(").  In practice, however, this greatly complicates\ndebugging a faulty node, since the only way to respond to errors is to panic\nthe node which loses valuable context that could have been logged.")])]),e._v(" "),n("li",[n("p",[e._v("There are subtle concurrency management dependencies between the client and\nthe server that are not clearly documented anywhere, and it is very easy for\nsmall changes in both the client and the server to lead to tricky deadlocks,\npanics, race conditions, and slowdowns. As a recent example of this, see\nhttps://github.com/tendermint/tendermint/pull/8581.")])])]),e._v(" "),n("p",[e._v("These limitations are fixable, but one important question is whether it is\nworthwhile to fix them.  We can add request and method identifiers, for\nexample, but doing so would be a breaking change to the protocol requiring\nevery application using it to update.  If applications have to migrate anyway,\nthe stability and language coverage of gRPC have improved a lot, and today it\nis probably simpler to set up and maintain an application using gRPC transport\nthan to reimplement the Tendermint socket protocol.")]),e._v(" "),n("p",[e._v("Moreover, gRPC addresses all the above issues out-of-the-box, and requires\n(much) less custom code for both the server (i.e., the application) and the\nclient. The project is well-funded and widely-used, which makes it a safe bet\nfor a dependency.")]),e._v(" "),n("h2",{attrs:{id:"decision"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),n("p",[e._v("There is a set of related alternatives to consider:")]),e._v(" "),n("ul",[n("li",[n("p",[e._v("Question 1: Designate a single IPC standard for out-of-process applications?")]),e._v(" "),n("p",[e._v("Claim: We should converge on one (and only one) IPC option for out-of-process\napplications. We should choose an option that, after a suitable period of\ndeprecation for alternatives, will address most or all the highest-impact\nuses of Tendermint.  Maintaining multiple options increases the surface area\nfor bugs and vulnerabilities, and we should not have multiple options for\nbasic interfaces without a clear and well-documented reason.")])]),e._v(" "),n("li",[n("p",[e._v("Question 2a: Choose gRPC and deprecate/remove the socket protocol?")]),e._v(" "),n("p",[e._v("Claim: Maintaining and improving a custom RPC protocol is a substantial\nproject and not directly relevant to the requirements of consensus. We would\nbe better served by depending on a well-maintained open-source library like\ngRPC.")])]),e._v(" "),n("li",[n("p",[e._v("Question 2b: Improve the socket protocol and deprecate/remove gRPC?")]),e._v(" "),n("p",[e._v("Claim: If we find meaningful advantages to maintaining our own custom RPC\nprotocol in Tendermint, we should treat it as a first-class project within\nthe core and invest in making it good enough that we do not require other\noptions.")])])]),e._v(" "),n("p",[n("strong",[e._v("One important consideration")]),e._v(" when discussing these questions is that "),n("em",[e._v("any\noutcome which includes keeping the socket protocol will have eventual migration\nimpacts for out-of-process applications")]),e._v(" regardless. To fix the limitations of\nthe socket protocol as it is currently designed will require making "),n("em",[e._v("breaking\nchanges")]),e._v(" to the protocol.  So, while we may put off a migration cost for\nout-of-process applications by retaining the socket protocol in the short term,\nwe will eventually have to pay those costs to fix the problems in its current\ndesign.")]),e._v(" "),n("h2",{attrs:{id:"detailed-design"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#detailed-design"}},[e._v("#")]),e._v(" Detailed Design")]),e._v(" "),n("ol",[n("li",[n("p",[e._v("If we choose to standardize on gRPC, the main work in Tendermint core will\nbe removing and cleaning up the code for the socket client and server.")]),e._v(" "),n("p",[e._v("Besides the code cleanup, we will also need to clearly document a\ndeprecation schedule, and invest time in making the migration easier for\napplications currently using the socket protocol.")]),e._v(" "),n("blockquote",[n("p",[n("strong",[e._v("Point for discussion:")]),e._v(" Migrating from the socket protocol to gRPC\nshould mostly be a plumbing change, as long as we do it during a release\nin which we are not making other breaking changes to ABCI. However, the\neffort may be more or less depending on how gRPC integration works in the\napplication's implementation language, and would have to be sure networks\nhave plenty of time not only to make the change but to verify that it\npreserves the function of the network.")]),e._v(" "),n("p",[e._v("What questions should we be asking node operators and application\ndevelopers to understand the migration costs better?")])])]),e._v(" "),n("li",[n("p",[e._v("If we choose to keep only the socket protocol, we will need to follow up\nwith a more detailed design for extending and upgrading the protocol to fix\nthe existing performance and operational issues with the protocol.")]),e._v(" "),n("p",[e._v("Moreover, since the gRPC interface has been around for a long time we will\nalso need a deprecation plan for it.")])]),e._v(" "),n("li",[n("p",[e._v("If we choose to keep both options, we will still need to do all the work of\n(2), but the gRPC implementation should not require any immediate changes.")])])]),e._v(" "),n("h2",{attrs:{id:"alternatives-considered"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#alternatives-considered"}},[e._v("#")]),e._v(" Alternatives Considered")]),e._v(" "),n("ul",[n("li",[n("p",[n("strong",[e._v("FFI")]),e._v(". Another approach we could take is to use a C-based FFI interface so\nthat applications written in other languages are linked directly with the\nconsensus node, an option currently only available for Go applications.")]),e._v(" "),n("p",[e._v("An FFI interface is possible for a lot of languages, but FFI support varies\nwidely in coverage and quality across languages and the points of friction\ncan be tricky to work around.  Moreover, it's much harder to add FFI support\nto a language where it's missing after-the-fact for an application developer.")]),e._v(" "),n("p",[e._v("Although a basic FFI interface is not too difficult on the Go side, the C\nshims for an FFI can get complicated if there's a lot of variability in the\nruntime environment on the other end.")]),e._v(" "),n("p",[e._v("If we want to have one answer for non-Go applications, we are better off\npicking an IPC-based solution (whether that's gRPC or an extension of our\ncustom socket protocol or something else).")])])]),e._v(" "),n("h2",{attrs:{id:"consequences"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),n("ul",[n("li",[n("p",[n("strong",[e._v("Standardize on gRPC")])]),e._v(" "),n("ul",[n("li",[e._v("✅ Addresses existing performance and operational issues.")]),e._v(" "),n("li",[e._v("✅ Replaces custom code with a well-maintained widely-used library.")]),e._v(" "),n("li",[e._v("✅ Aligns with Cosmos SDK, which already uses gRPC extensively.")]),e._v(" "),n("li",[e._v("✅ Aligns with priv validator interface, for which the socket protocol is already deprecated for gRPC.")]),e._v(" "),n("li",[e._v("❓ Applications will be hard to implement in a language without gRPC support.")]),e._v(" "),n("li",[e._v("⛔ All users of the socket protocol have to migrate to gRPC, and we believe most current out-of-process applications use the socket protocol.")])])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Standardize on socket protocol")])]),e._v(" "),n("ul",[n("li",[e._v("✅ Less immediate impact for existing users (but see below).")]),e._v(" "),n("li",[e._v("✅ Simplifies ABCI API surface by removing gRPC.")]),e._v(" "),n("li",[e._v("❓ Users of the socket protocol will have a (smaller) migration.")]),e._v(" "),n("li",[e._v("❓ Potentially easier to implement for languages that do not have support.")]),e._v(" "),n("li",[e._v("⛔ Need to do all the work to fix the socket protocol (which will require existing users to update anyway later).")]),e._v(" "),n("li",[e._v("⛔ Ongoing maintenance burden for per-language server implementations.")])])]),e._v(" "),n("li",[n("p",[n("strong",[e._v("Keep both options")])]),e._v(" "),n("ul",[n("li",[e._v("✅ Less immediate impact for existing users (but see below).")]),e._v(" "),n("li",[e._v("❓ Users of the socket protocol will have a (smaller) migration.")]),e._v(" "),n("li",[e._v("⛔ Still need to do all the work to fix the socket protocol (which will require existing users to update anyway later).")]),e._v(" "),n("li",[e._v("⛔ Requires ongoing maintenance and support of both gRPC and socket protocol integrations.")])])])]),e._v(" "),n("h2",{attrs:{id:"references"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),n("ul",[n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/tree/main/spec/abci",target:"_blank",rel:"noopener noreferrer"}},[e._v("Application Blockchain Interface (ABCI)"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/abci/client/socket_client.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tendermint ABCI socket client"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/abci/client/grpc_client.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tendermint ABCI gRPC client"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/tendermint/abci/commit/1ab3c747182aaa38418258679c667090c2bb1e0d",target:"_blank",rel:"noopener noreferrer"}},[e._v("Initial commit of gRPC client"),n("OutboundLink")],1)])]),e._v(" "),n("h2",{attrs:{id:"notes"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[e._v("#")]),e._v(" Notes")]),e._v(" "),n("ul",[n("li",[n("p",[n("a",{attrs:{id:"note1"}}),n("strong",[e._v("Note 1")]),e._v(": The choice to make all ABCI errors protocol-fatal\nwas intended to avoid the risk that recovering an application error could\ncause application state to diverge.  Divergence can break consensus, so it's\nessential to avoid it.")]),e._v(" "),n("p",[e._v('This is a sound principle, but conflates protocol errors with "mechanical"\nerrors such as timeouts, resoures exhaustion, failed connections, and so on.\nBecause the protocol has no way to distinguish these conditions, the only way\nfor an application to report an error is to panic or crash.')]),e._v(" "),n("p",[e._v("Whether a node is running in the same process as the application or as a\nseparate process, application errors should not be suppressed or hidden.\nHowever, it's important to ensure that errors are handled at a consistent and\nwell-defined point in the protocol: Having the application panic or crash\nrather than reporting an error means the node sees different results\ndepending on whether the application runs in-process or out-of-process, even\nif the application logic is otherwise identical.")])])]),e._v(" "),n("h2",{attrs:{id:"appendix-known-implementations-of-abci-socket-protocol"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#appendix-known-implementations-of-abci-socket-protocol"}},[e._v("#")]),e._v(" Appendix: Known Implementations of ABCI Socket Protocol")]),e._v(" "),n("p",[e._v("This is a list of known implementations of the Tendermint custom socket\nprotocol. Note that in most cases I have not checked how complete or correct\nthese implementations are; these are based on search results and a cursory\nvisual inspection.")]),e._v(" "),n("ul",[n("li",[e._v("Tendermint Core (Go): "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/abci/client/socket_client.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("client"),n("OutboundLink")],1),e._v(", "),n("a",{attrs:{href:"https://github.com/tendermint/tendermint/blob/main/abci/server/socket_server.go",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[e._v("Informal Systems "),n("a",{attrs:{href:"https://github.com/informalsystems/tendermint-rs",target:"_blank",rel:"noopener noreferrer"}},[e._v("tendermint-rs"),n("OutboundLink")],1),e._v(" (Rust): "),n("a",{attrs:{href:"https://github.com/informalsystems/tendermint-rs/blob/master/abci/src/client.rs",target:"_blank",rel:"noopener noreferrer"}},[e._v("client"),n("OutboundLink")],1),e._v(", "),n("a",{attrs:{href:"https://github.com/informalsystems/tendermint-rs/blob/master/abci/src/server.rs",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[e._v("Tendermint "),n("a",{attrs:{href:"https://github.com/tendermint/js-abci",target:"_blank",rel:"noopener noreferrer"}},[e._v("js-abci"),n("OutboundLink")],1),e._v(" (JS): "),n("a",{attrs:{href:"https://github.com/tendermint/js-abci/blob/master/src/server.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/Hotmoka/hotmoka",target:"_blank",rel:"noopener noreferrer"}},[e._v("Hotmoka"),n("OutboundLink")],1),e._v(" ABCI (Java): "),n("a",{attrs:{href:"https://github.com/Hotmoka/hotmoka/blob/master/io-hotmoka-tendermint-abci/src/main/java/io/hotmoka/tendermint_abci/Server.java",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/penumbra-zone/tower-abci",target:"_blank",rel:"noopener noreferrer"}},[e._v("Tower ABCI"),n("OutboundLink")],1),e._v(" (Rust): "),n("a",{attrs:{href:"https://github.com/penumbra-zone/tower-abci/blob/main/src/server.rs",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/datopia/abci-host",target:"_blank",rel:"noopener noreferrer"}},[e._v("abci-host"),n("OutboundLink")],1),e._v(" (Clojure): "),n("a",{attrs:{href:"https://github.com/datopia/abci-host/blob/master/src/abci/host.clj",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/KrzysiekJ/abci_server",target:"_blank",rel:"noopener noreferrer"}},[e._v("abci_server"),n("OutboundLink")],1),e._v(" (Erlang): "),n("a",{attrs:{href:"https://github.com/KrzysiekJ/abci_server/blob/master/src/abci_server.erl",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/davebryson/py-abci",target:"_blank",rel:"noopener noreferrer"}},[e._v("py-abci"),n("OutboundLink")],1),e._v(" (Python): "),n("a",{attrs:{href:"https://github.com/davebryson/py-abci/blob/master/src/abci/server.py",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/intechsa/scala-tendermint-server",target:"_blank",rel:"noopener noreferrer"}},[e._v("scala-tendermint-server"),n("OutboundLink")],1),e._v(" (Scala): "),n("a",{attrs:{href:"https://github.com/InTechSA/scala-tendermint-server/blob/master/src/main/scala/lu/intech/tendermint/Server.scala",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)]),e._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/f-o-a-m/kepler",target:"_blank",rel:"noopener noreferrer"}},[e._v("kepler"),n("OutboundLink")],1),e._v(" (Rust): "),n("a",{attrs:{href:"https://github.com/f-o-a-m/kepler/blob/master/hs-abci-server/src/Network/ABCI/Server.hs",target:"_blank",rel:"noopener noreferrer"}},[e._v("server"),n("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=r.exports}}]);