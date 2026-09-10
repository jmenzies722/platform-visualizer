import type { Concept, CurriculumSection } from "@/lib/types";

const ref = (label: string, href: string, source: string) => ({
  label,
  href,
  source,
});

function concept(
  slug: string,
  title: string,
  what: string,
  why: string,
  mentalModel: string,
  extra: Partial<Concept> = {},
): Concept {
  return { slug, title, what, why, mentalModel, ...extra };
}

export const curriculum: CurriculumSection[] = [
  {
    id: "computer-foundations",
    number: "01",
    title: "Computer Foundations",
    shortTitle: "Foundations",
    blurb: "What a program actually is when the machine runs it.",
    concepts: [
      concept("cpu", "CPU", "The chip that fetches and executes instructions.", "Every program eventually becomes a stream of instructions here.", "A very fast clerk following a list."),
      concept("cpu-cores", "CPU cores", "Independent execution units on one chip.", "More cores mean more things can make progress at once.", "Several clerks sharing one office."),
      concept("ram", "RAM", "Fast, volatile working memory.", "The CPU can only operate on what is close.", "The desk — not the filing cabinet."),
      concept("storage", "Storage", "Persistent bytes on disk or SSD.", "State that must survive a reboot lives here.", "The filing cabinet."),
      concept(
        "processes",
        "Processes",
        "An OS abstraction: a running program with its own address space.",
        "Isolation and scheduling start here.",
        "A running copy of a program.",
        {
          simulationId: "process",
          beginnerRefs: [
            ref("Processes", "https://man7.org/linux/man-pages/man7/sched.7.html", "Linux man-pages"),
            ref("Anatomy of a program in memory", "https://manybutfinite.com/post/anatomy-of-a-program-in-memory/", "Gustavo Duarte"),
          ],
          technicalRefs: [
            ref("execve(2)", "https://man7.org/linux/man-pages/man2/execve.2.html", "Linux man-pages"),
            ref("Kernel process docs", "https://docs.kernel.org/process/", "Linux kernel"),
          ],
        },
      ),
      concept("threads", "Threads", "Multiple execution contexts inside one process.", "They share memory, so they can cooperate — and race.", "Coworkers sharing one desk."),
      concept("kernel", "Kernel", "The privileged core of the operating system.", "It owns hardware, processes, and isolation.", "The building manager with master keys."),
      concept("user-space-vs-kernel-space", "User space vs kernel space", "Two privilege worlds. Apps live in user space.", "A crash in user space should not take down the machine.", "Customers vs the staff-only hallway."),
      concept("filesystem", "Filesystem", "The tree of names that map to bytes on storage.", "Programs find data by path, not by raw disk offset.", "A labeled cabinet system."),
      concept("file-descriptors", "File descriptors", "Small integers a process uses to refer to open files and sockets.", "Almost all I/O is “write to this number.”", "Coat-check tickets for open resources."),
      concept("system-calls", "System calls", "The official door from user space into the kernel.", "A process cannot talk to hardware except through this API.", "Asking the building manager to unlock a door."),
      concept("sockets", "Sockets", "Endpoints for sending and receiving bytes over a network.", "Processes on different machines meet here.", "A phone line with two ends."),
      concept("environment-variables", "Environment variables", "Key-value configuration injected into a process.", "They configure behavior without rebuilding the binary.", "Sticky notes on the process’s cubicle."),
    ],
  },
  {
    id: "linux",
    number: "02",
    title: "Linux",
    shortTitle: "Linux",
    blurb: "How Unix machines actually start, isolate, and connect processes.",
    concepts: [
      concept("shell", "Shell", "A program that reads commands and starts other programs.", "It is the human interface to processes and pipes.", "A concierge that launches workers."),
      concept("terminal", "Terminal", "The window that displays a shell and its I/O.", "It is a display, not the operating system.", "A telephone handset — the shell is the person."),
      concept("linux-processes", "Processes", "Linux tracks every running program as a task with a PID.", "You debug production by watching these, not “the server.”", "Named jobs the kernel can stop or signal."),
      concept("process-tree", "Process tree", "Every process has a parent. The tree shows who spawned whom.", "Killing a parent without reaping children leaves orphans.", "A family tree of running programs."),
      concept("pid", "PID", "The kernel’s identifier for a process.", "Signals, cgroups, and containers all key off this.", "An employee badge number."),
      concept("signals", "Signals", "Tiny asynchronous messages: stop, hang up, kill, interrupt.", "They are how operators and the terminal talk to processes.", "A tap on the shoulder with a meaning."),
      concept("users", "Users", "Identity the kernel uses for permission checks.", "Files and processes are owned by someone.", "A badge that unlocks some doors."),
      concept("groups", "Groups", "Shared permission sets across users.", "A team can share a directory without sharing an account.", "A department on the badge."),
      concept("permissions", "Permissions", "Read, write, execute bits on files, plus ownership.", "They are the first access-control model you will ever operate.", "A lock on each folder."),
      concept("chmod", "chmod", "The command that changes those bits.", "Mis-set bits are a common outage and a common breach.", "Changing the lock combination."),
      concept("services", "Services", "Long-running programs meant to stay up.", "Platforms are mostly services, not one-shot commands.", "A shop that never closes."),
      concept("daemons", "Daemons", "Background services, often started at boot.", "They do not need a terminal attached.", "Staff who work after the lobby closes."),
      concept("systemd", "systemd", "The default Linux init and service manager.", "It starts, restarts, and supervises almost everything after the kernel.", "The shift supervisor for daemons."),
      concept(
        "pipes",
        "Pipes",
        "A kernel buffer connecting one process’s stdout to another’s stdin.",
        "This is how `ls | grep` actually works.",
        "A tube between two workers.",
        {
          simulationId: "pipes",
          beginnerRefs: [
            ref("Pipes", "https://www.gnu.org/software/libc/manual/html_node/Pipes-and-FIFOs.html", "GNU libc"),
            ref("pipe(7)", "https://man7.org/linux/man-pages/man7/pipe.7.html", "Linux man-pages"),
          ],
          technicalRefs: [
            ref("pipe(2)", "https://man7.org/linux/man-pages/man2/pipe.2.html", "Linux man-pages"),
            ref("dup2(2)", "https://man7.org/linux/man-pages/man2/dup2.2.html", "Linux man-pages"),
          ],
        },
      ),
      concept("stdin", "stdin", "The default input stream — file descriptor 0.", "Programs read here unless you redirect.", "The inbox."),
      concept("stdout", "stdout", "The default output stream — file descriptor 1.", "Pipes and logs usually start here.", "The outbox."),
      concept("stderr", "stderr", "The diagnostic stream — file descriptor 2.", "Errors stay visible even when stdout is piped.", "A separate side channel for problems."),
      concept("linux-filesystem", "Linux filesystem", "A single rooted tree. Disks are mounted into it.", "There is no C: drive — only `/`.", "One big building with rooms attached."),
      concept("mounts", "Mounts", "Attaching a filesystem onto a directory.", "Containers and images are mostly mount tricks.", "Hanging a new room on an existing door."),
    ],
  },
  {
    id: "networking",
    number: "03",
    title: "Networking",
    shortTitle: "Networking",
    blurb: "How a name becomes packets, sessions, and a loaded page.",
    concepts: [
      concept("network-interface", "Network interface", "A NIC or virtual device the kernel can send frames from.", "No interface, no packets.", "A doorway onto a network."),
      concept("mac-address", "MAC address", "The link-layer address on a local segment.", "Switches deliver frames using this, not IP.", "The apartment number in this building."),
      concept("ip-address", "IP address", "A routable address for a host or interface.", "Routers forward using this.", "The street address."),
      concept("ipv4", "IPv4", "32-bit addresses, still the workhorse of most clouds.", "You will read these on every packet capture.", "The common street-address format."),
      concept("subnet", "Subnet", "A slice of address space that shares a prefix.", "Hosts in one subnet can usually ARP each other directly.", "A city block."),
      concept("cidr", "CIDR", "Prefix notation like 10.0.1.0/24.", "It is how we write subnets and routes.", "The block size on a map."),
      concept("gateway", "Gateway", "The next hop for traffic leaving a subnet.", "Your laptop only knows this door, not the whole internet.", "The on-ramp."),
      concept("router", "Router", "A device that forwards packets between networks.", "This is how separate subnets become one system.", "A junction with a map."),
      concept("switch", "Switch", "Forwards frames inside a layer-2 domain.", "It does not NAT and usually does not route.", "Hallways inside one building."),
      concept("arp", "ARP", "Resolves an IP on the local subnet to a MAC.", "IP cannot leave the NIC until this succeeds.", "Looking up the apartment number for a street address."),
      concept("nat", "NAT", "Rewrites addresses so many private hosts share a public IP.", "Home routers and cloud NAT gateways both do this.", "A mailroom that changes the return address."),
      concept(
        "dns",
        "DNS",
        "Converts a domain name such as google.com into the IP address computers use to communicate.",
        "Humans remember names better than numeric IP addresses.",
        "Think of DNS as the internet’s phone book.",
        {
          simulationId: "dns",
          beginnerRefs: [
            ref("What is DNS?", "https://www.cloudflare.com/learning/dns/what-is-dns/", "Cloudflare Learning"),
            ref("MDN: DNS", "https://developer.mozilla.org/en-US/docs/Glossary/DNS", "MDN"),
          ],
          technicalRefs: [
            ref("RFC 1035", "https://www.rfc-editor.org/rfc/rfc1035", "IETF"),
            ref("AWS Route 53 DNS concepts", "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-dns-service.html", "AWS"),
          ],
        },
      ),
      concept("ports", "Ports", "A 16-bit number that selects a process on a host.", "IP finds the machine. The port finds the service.", "The suite number."),
      concept("net-sockets", "Sockets", "The OS object binding an address and port to a process.", "Servers listen. Clients connect.", "A reserved booth on that suite."),
      concept("tcp", "TCP", "A reliable, ordered byte stream between two sockets.", "Most application protocols sit on this pipe.", "A tracked phone call, not a postcard."),
      concept("udp", "UDP", "Datagrams with no connection or retry.", "DNS and many real-time systems prefer this.", "Postcards — fast, no receipt."),
      concept("packets", "Packets", "The chunks IP actually forwards.", "Everything you “send” is cut into these.", "Envelopes on the wire."),
      concept("tcp-handshake", "TCP handshake", "SYN, SYN-ACK, ACK — the three packets that open a session.", "No handshake, no HTTP.", "Agreeing to keep a conversation."),
      concept("tls", "TLS", "Encryption and authentication on top of TCP.", "This is what turns HTTP into HTTPS.", "Sealing the envelope and showing ID."),
      concept("http", "HTTP", "A request/response protocol for documents and APIs.", "The web’s common language.", "A standardized order form."),
      concept(
        "https",
        "HTTPS request",
        "A full browser request: DNS, routing, TCP, TLS, then HTTP.",
        "This is the path a user actually takes to your service.",
        "Find the building, knock, show ID, then place the order.",
        {
          simulationId: "https",
          beginnerRefs: [
            ref("How HTTPS works", "https://www.cloudflare.com/learning/ssl/what-is-https/", "Cloudflare Learning"),
            ref("MDN: HTTPS", "https://developer.mozilla.org/en-US/docs/Glossary/HTTPS", "MDN"),
          ],
          technicalRefs: [
            ref("RFC 9110 HTTP Semantics", "https://www.rfc-editor.org/rfc/rfc9110", "IETF"),
            ref("RFC 8446 TLS 1.3", "https://www.rfc-editor.org/rfc/rfc8446", "IETF"),
          ],
        },
      ),
      concept("proxy", "Proxy", "A client-side middlebox that forwards outbound requests.", "Enterprises and egress controls use these.", "An assistant who places calls for you."),
      concept("reverse-proxy", "Reverse proxy", "A server-side middlebox that receives traffic for many backends.", "TLS, routing, and buffering often live here.", "A receptionist for the building."),
      concept("load-balancer", "Load balancer", "A reverse proxy that spreads connections across healthy instances.", "One name, many machines.", "A host seating guests at empty tables."),
      concept("firewall", "Firewall", "A policy that allows or drops packets.", "Security groups are this idea in the cloud.", "A bouncer with a list."),
      concept("cdn", "CDN", "Caches and serves content from locations near users.", "Most of the web’s bytes never reach origin.", "Newsstands that already have today’s paper."),
    ],
  },
  {
    id: "cloud",
    number: "04",
    title: "Cloud",
    shortTitle: "Cloud",
    blurb: "Regions, networks, and managed building blocks — then the AWS names.",
    concepts: [
      concept("region", "Region", "A geographic cluster of data centers.", "Latency, law, and blast radius start with this choice.", "A city where you rent buildings."),
      concept("availability-zone", "Availability zone", "An isolated facility inside a region.", "Multi-AZ is how you survive a building failure.", "Separate city blocks with their own power."),
      concept("virtual-network", "Virtual network", "A software-defined network you control.", "Cloud networking is routing tables, not extra cables.", "A private campus drawn in software."),
      concept(
        "vpc",
        "VPC request path",
        "A software-defined network: public edge, private workloads, no public database.",
        "Your security story is mostly VPC design — routes and security groups, not extra cables.",
        "A fenced campus: street-facing lobby, interior rooms, a one-way loading dock.",
        {
          simulationId: "cloud",
          beginnerRefs: [
            ref("What is a VPC?", "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html", "AWS"),
            ref("Public and private subnets", "https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html", "AWS"),
          ],
          technicalRefs: [
            ref("Security groups", "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html", "AWS"),
            ref("Internet gateway", "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html", "AWS"),
          ],
        },
      ),
      concept("cloud-subnet", "Subnet", "A slice of the VPC, usually tied to one AZ.", "Public and private placement is decided here.", "A lot on the campus."),
      concept("public-private-subnet", "Public / private subnet", "Public has a route to an internet gateway. Private does not.", "Databases almost never need a public address.", "Street-facing vs interior rooms."),
      concept("route-table", "Route table", "Where packets go next from a subnet.", "Mis-routes look like “the app is down.”", "The campus map."),
      concept("internet-gateway", "Internet gateway", "The VPC’s door to the public internet.", "Public subnets point default routes here.", "The front gate."),
      concept("nat-gateway", "NAT gateway", "Outbound internet for private subnets, no inbound.", "Patching and API calls leave; attackers cannot walk in.", "A one-way loading dock."),
      concept("security-groups", "Security groups", "Stateful allow-lists on ENIs.", "They are the cloud firewall you will actually use.", "Per-door guest lists."),
      concept("compute", "Compute", "Rented CPU, memory, and time.", "Everything else exists to feed this.", "Leased workshops."),
      concept("virtual-machines", "Virtual machines", "Full guest machines on a hypervisor.", "EC2 is this idea.", "A rented workshop with its own lock."),
      concept("object-storage", "Object storage", "Immutable blobs addressed by key.", "S3 is the pattern: durable, cheap, not a filesystem.", "A warehouse of labeled crates."),
      concept("block-storage", "Block storage", "A virtual disk you attach to a machine.", "EBS volumes look like /dev/nvme to the guest.", "A hard drive you can move between rooms."),
      concept("databases", "Databases", "Managed stateful engines.", "RDS is a database plus backups, failover, and plumbing.", "A filing system someone else keeps online."),
      concept("queues", "Queues", "Durable handoff between producers and consumers.", "They absorb spikes and decouple failures.", "A waiting line with tickets."),
      concept("serverless", "Serverless", "Run code without owning the instance lifecycle.", "Lambda is a scale-to-zero compute API.", "A workshop that appears when you knock."),
      concept("autoscaling", "Autoscaling", "Add or remove replicas from a metric.", "Capacity becomes a control loop.", "Hiring extra clerks when the line grows."),
      concept("cloud-load-balancing", "Load balancing", "Managed distribution of connections.", "ALB/NLB are the AWS names for the same idea you already know.", "A hosted maître d’."),
      concept("iam", "IAM", "Identity and policies for people and machines.", "Every cloud outage that is not DNS is often IAM.", "Badges and a written rulebook."),
    ],
  },
  {
    id: "containers",
    number: "05",
    title: "Containers",
    shortTitle: "Containers",
    blurb: "Images, isolation, and why a container is not a tiny VM.",
    concepts: [
      concept(
        "container",
        "Container lifecycle",
        "A process with kernel-enforced isolation, started from an image.",
        "This is how almost every modern service ships.",
        "A process wearing a disguise, not a mini computer.",
        {
          simulationId: "docker",
          beginnerRefs: [
            ref("What is a container?", "https://docs.docker.com/get-started/docker-overview/", "Docker"),
            ref("Containers vs VMs", "https://kubernetes.io/docs/concepts/overview/", "Kubernetes"),
          ],
          technicalRefs: [
            ref("OCI runtime spec", "https://github.com/opencontainers/runtime-spec", "OCI"),
            ref("runc", "https://github.com/opencontainers/runc", "OCI"),
          ],
        },
      ),
      concept("image", "Image", "An immutable package of layers plus a default command.", "You ship images. You run containers.", "A sealed meal kit."),
      concept("dockerfile", "Dockerfile", "The recipe that builds an image.", "Reproducible builds start with this file.", "A cooking card."),
      concept("image-layers", "Image layers", "Stacked filesystem diffs, cached by digest.", "Order your instructions so the expensive layers change least.", "Transparent sheets on a projector."),
      concept("registry", "Registry", "A server that stores and serves images.", "CI pushes here. Clusters pull from here.", "A warehouse for meal kits."),
      concept("container-runtime", "Container runtime", "The component that creates namespaces and starts PID 1.", "Kubernetes talks to this, not to Docker the product.", "The kitchen staff."),
      concept("namespaces", "Namespaces", "Kernel views: PID, mount, net, user, UTS, IPC.", "They make a process believe it is alone.", "Blinders on a horse."),
      concept("cgroups", "cgroups", "Kernel limits and accounting for CPU, memory, I/O.", "They stop a noisy neighbor from eating the node.", "A power meter on each apartment."),
      concept("volumes", "Volumes", "Storage that outlives a container’s writable layer.", "Databases do not keep state in the container filesystem.", "A locked drawer outside the costume."),
      concept("container-networking", "Container networking", "Virtual ethernet, bridges, and CNI.", "A container’s localhost is not the host’s localhost.", "A private phone line that may be NAT’d."),
      concept("container-ports", "Ports", "Publishing a container port onto a host or service IP.", "Without this, the process is isolated from callers.", "Forwarding suite 3000 to the street."),
    ],
  },
  {
    id: "iac",
    number: "06",
    title: "Infrastructure as Code",
    shortTitle: "IaC",
    blurb: "Desired state, a plan, an API call, and a state file.",
    concepts: [
      concept("declarative-infrastructure", "Declarative infrastructure", "You describe the end state, not the SSH steps.", "Diffing desired vs actual is the whole job.", "A blueprint, not a diary of hammer swings."),
      concept(
        "terraform",
        "Terraform plan / apply",
        "A popular engine for desired state: providers, a state file, a plan, then API calls.",
        "You change a number. Terraform subtracts. It does not rebuild the fleet.",
        "A contractor who reads blueprints, measures the site, and calls the vendor only for the delta.",
        {
          simulationId: "terraform",
          beginnerRefs: [
            ref("Terraform intro", "https://developer.hashicorp.com/terraform/intro", "HashiCorp"),
            ref("Plan and apply", "https://developer.hashicorp.com/terraform/cli/run", "HashiCorp"),
          ],
          technicalRefs: [
            ref("State", "https://developer.hashicorp.com/terraform/language/state", "HashiCorp"),
            ref("Providers", "https://developer.hashicorp.com/terraform/language/providers", "HashiCorp"),
          ],
        },
      ),
      concept("provider", "Provider", "The plugin that knows one API — AWS, Kubernetes, GitHub.", "Terraform itself does not know what an EC2 instance is.", "A specialist trade."),
      concept("resource", "Resource", "An object Terraform intends to create and manage.", "Each block becomes API calls plus state.", "A room on the blueprint."),
      concept("data-source", "Data source", "A read-only lookup of something already there.", "Use it to join managed and unmanaged worlds.", "Measuring an existing wall."),
      concept("variable", "Variable", "Input to a module.", "Same code, different environments.", "A blank on the form."),
      concept("output", "Output", "A value other modules or humans need after apply.", "IDs and URLs usually leave this way.", "The address written on the key."),
      concept("state", "State", "Terraform’s memory of what it created.", "Without state, it cannot diff.", "The as-built drawing."),
      concept("remote-state", "Remote state", "State stored in S3/Consul/etc with locking.", "Teams cannot share a laptop file.", "The drawings in a shared vault."),
      concept("module", "Module", "A reusable bundle of resources.", "This is how platforms stay consistent.", "A typical floor plan."),
      concept("plan", "Plan", "The calculated diff before anything changes.", "Read this like a blast radius.", "A change order."),
      concept("apply", "Apply", "Execute the plan against real APIs.", "This is when money and outages happen.", "The construction crew arriving."),
      concept("drift", "Drift", "Reality no longer matches state — someone clicked the console.", "Detect it or the next plan lies.", "A wall that moved overnight."),
    ],
  },
  {
    id: "git-cicd",
    number: "07",
    title: "Git + CI/CD",
    shortTitle: "Git + CI/CD",
    blurb: "From a commit to a running environment, on purpose.",
    concepts: [
      concept("repository", "Repository", "The history of a project as commits.", "It is the source of truth for code — and often for desired infra.", "A ledger of snapshots."),
      concept("commit", "Commit", "An immutable snapshot with a parent.", "CI runs against these, not “whatever is on disk.”", "A saved checkpoint."),
      concept("branch", "Branch", "A movable pointer to a commit.", "Isolation for work, until you merge.", "A parallel timeline."),
      concept("merge", "Merge", "Combining histories.", "This is how isolated work becomes shared truth.", "Weaving two timelines."),
      concept("ci", "CI", "Automatic checks on every change.", "If it is not in CI, it is optional — and will rot.", "A night watch for the ledger."),
      concept(
        "pipeline",
        "Pipeline",
        "A sequenced set of jobs: install, test, build, deploy.",
        "Visibility of the path is the product.",
        "An assembly line.",
        {
          simulationId: "cicd",
          beginnerRefs: [
            ref("Understanding GitHub Actions", "https://docs.github.com/en/actions/get-started/understand-github-actions", "GitHub"),
            ref("GitLab CI/CD pipelines", "https://docs.gitlab.com/ci/pipelines/", "GitLab"),
          ],
          technicalRefs: [
            ref("Workflow syntax for GitHub Actions", "https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax", "GitHub"),
          ],
        },
      ),
      concept("build", "Build", "Turn source into an artifact.", "The thing you deploy should not be “the laptop folder.”", "Baking the meal kit."),
      concept("test", "Test", "Automated proof the artifact still behaves.", "Pipelines exist so humans do not click through every time.", "Tasting before service."),
      concept("artifact", "Artifact", "The immutable output of a build — image, binary, bundle.", "Promote artifacts. Do not rebuild per environment if you can help it.", "A sealed crate with a hash."),
      concept("deployment", "Deployment", "Making an artifact live in an environment.", "This is a change to production reality.", "Putting the crate on the floor."),
      concept("environments", "Environments", "Isolated destinations: dev, staging, prod.", "Same artifact, different blast radius.", "Different dining rooms."),
      concept("rollback", "Rollback", "Return to a previous artifact.", "You need the old crate still sitting in the warehouse.", "Bringing yesterday’s kit back out."),
      concept("progressive-deployment", "Progressive deployment", "Ship to a slice of traffic first.", "Canaries and bake times turn deploys into experiments.", "A tasting table before the whole room."),
      concept("gitops", "GitOps", "Desired cluster state lives in git; a controller applies it.", "The PR becomes the change ticket.", "The blueprint repo is the control panel."),
    ],
  },
  {
    id: "kubernetes",
    number: "08",
    title: "Kubernetes",
    shortTitle: "Kubernetes",
    blurb: "Desired state, controllers, and a cluster that repairs itself.",
    concepts: [
      concept("cluster", "Cluster", "Control plane plus worker nodes.", "This is the computer. Pods are the processes.", "A factory with an office and a floor."),
      concept("control-plane", "Control plane", "API, etcd, scheduler, controllers.", "It decides. It does not run your app.", "The office."),
      concept("api-server", "API server", "The authenticated front door to cluster state.", "kubectl, controllers, and kubelets all meet here.", "The receptionist who writes in the ledger."),
      concept("etcd", "etcd", "Consistent storage for all cluster objects.", "Lose this unsafely and you lose the cluster’s memory.", "The ledger."),
      concept("scheduler", "Scheduler", "Binds pending pods to nodes.", "Placement is a policy problem, not luck.", "Assigning workstations."),
      concept("controller-manager", "Controller manager", "Runs the built-in reconciliation loops.", "Deployments, nodes, jobs — all loops.", "Supervisors walking the floor."),
      concept("node", "Node", "A worker machine with kubelet and a runtime.", "This is where processes actually exist.", "A workstation on the floor."),
      concept("kubelet", "kubelet", "The agent that makes assigned pods real.", "It reports status back to the API.", "The worker who reads the assignment board."),
      concept("k8s-runtime", "Container runtime", "containerd/CRI-O starting the containers.", "Kubernetes stopped depending on Docker as a runtime.", "The tools on the bench."),
      concept("pod", "Pod", "One or more containers sharing a network namespace.", "The atom of scheduling.", "A tray that can hold several cups."),
      concept("replica-set", "ReplicaSet", "Keeps N identical pods alive.", "This is the simple desired=N loop.", "A supervisor counting chairs."),
      concept(
        "deployment",
        "Deployment + reconciliation",
        "A rolling desired-state object that owns ReplicaSets.",
        "You change a number. The cluster walks toward it — and repairs drift.",
        "A thermostat for replica count and image version.",
        {
          simulationId: "kubernetes",
          beginnerRefs: [
            ref("Deployments", "https://kubernetes.io/docs/concepts/workloads/controllers/deployment/", "kubernetes.io"),
            ref("Controller pattern", "https://kubernetes.io/docs/concepts/architecture/controller/", "kubernetes.io"),
          ],
          technicalRefs: [
            ref("API overview", "https://kubernetes.io/docs/concepts/overview/kubernetes-api/", "kubernetes.io"),
            ref("kube-scheduler", "https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/", "kubernetes.io"),
          ],
        },
      ),
      concept("service", "Service", "A stable virtual IP in front of pods.", "Pods die. The Service name should not.", "A desk number that stays as staff rotate."),
      concept("configmap", "ConfigMap", "Non-secret configuration as an object.", "Change config without rebuilding the image.", "A clipboard on the wall."),
      concept("secret", "Secret", "Sensitive bytes the API stores separately.", "Still encrypt at rest and limit RBAC. It is not magic.", "A locked drawer."),
      concept("namespace", "Namespace", "A scope for names and policies inside one cluster.", "Multi-team clusters start here.", "A floor of the building."),
      concept("ingress", "Ingress", "Classic HTTP routing into Services.", "Host and path rules at the edge.", "A directory in the lobby."),
      concept("gateway-api", "Gateway API", "The successor routing API: Gateways + Routes, role-aware.", "More expressive than Ingress, and portable across implementations.", "A modern lobby with typed doors."),
      concept("requests-limits", "Requests / limits", "How much CPU/memory you ask for vs the cap.", "Scheduling uses requests. Throttling uses limits.", "Reserved desk space vs a hard wall."),
      concept("probes", "Probes", "Questions kubelet asks: live, ready, started.", "Ready is traffic. Live is restart.", "A pulse check and a “can I seat guests?” check."),
      concept("hpa", "HPA", "Horizontal Pod Autoscaler — replicas from metrics.", "The deployment’s replica field becomes a moving target.", "Hiring more chairs when the line grows."),
      concept("rbac", "RBAC", "Who can speak which verbs on which resources.", "The API server’s authorization model.", "Keys to specific drawers."),
    ],
  },
  {
    id: "observability",
    number: "09",
    title: "Observability + SRE",
    shortTitle: "Observability",
    blurb: "One request, three signals, and a budget for failure.",
    concepts: [
      concept("logs", "Logs", "Timestamped events from a process.", "They explain a single moment. They do not graph a fleet.", "A diary."),
      concept("metrics", "Metrics", "Numbers over time, cheap to aggregate.", "They tell you the shape of the system.", "A speedometer."),
      concept("traces", "Traces", "A request’s path across services.", "They answer “where did the time go?”", "A highlighted route on a map."),
      concept("spans", "Spans", "Timed operations inside a trace.", "Parent/child spans are the causal tree.", "One street on that route."),
      concept(
        "opentelemetry",
        "OpenTelemetry",
        "The standard way to produce logs, metrics, and traces from one request.",
        "Instrument once, export anywhere. The three signals describe the same call differently.",
        "A common plug for telemetry — one checkout, three pictures.",
        {
          simulationId: "otel",
          beginnerRefs: [
            ref("What is OpenTelemetry?", "https://opentelemetry.io/docs/what-is-opentelemetry/", "OpenTelemetry"),
            ref("Observability primer", "https://opentelemetry.io/docs/concepts/observability-primer/", "OpenTelemetry"),
          ],
          technicalRefs: [
            ref("Traces", "https://opentelemetry.io/docs/concepts/signals/traces/", "OpenTelemetry"),
            ref("W3C Trace Context", "https://www.w3.org/TR/trace-context/", "W3C"),
          ],
        },
      ),
      concept("prometheus", "Prometheus", "A pull-based metrics TSDB and query language.", "The default language of Kubernetes metrics.", "A clipboard that walks around and writes numbers."),
      concept("grafana", "Grafana", "Dashboards and alerts over many backends.", "Humans need pictures of the numbers.", "The wall of gauges."),
      concept("alerts", "Alerts", "Conditions that page a human.", "If nobody should wake, it is not an alert.", "A fire bell — use sparingly."),
      concept("latency", "Latency", "How long a request took.", "Users feel this. Averages lie — use percentiles.", "Wait time."),
      concept("throughput", "Throughput", "How many units per second.", "Capacity planning starts here.", "Customers per hour."),
      concept("errors", "Errors", "Failed requests or failed work.", "Rate and type matter more than a single stack trace.", "Dropped plates."),
      concept("saturation", "Saturation", "How full a resource is.", "The system is often slow before it is down.", "How full the kitchen is."),
      concept("sli", "SLI", "The measured indicator — e.g. 99th percentile latency.", "You cannot have an SLO on a vibe.", "The actual wait-time reading."),
      concept("slo", "SLO", "The promise you make about that indicator.", "This is the product conversation, not the tool conversation.", "“95% of tables seated in 10 minutes.”"),
      concept("error-budget", "Error budget", "The allowed unreliability in a window.", "Spend it on speed. Exhaust it and freeze risk.", "How many late tables you can afford this month."),
    ],
  },
  {
    id: "platform-engineering",
    number: "10",
    title: "Platform Engineering",
    shortTitle: "Platform",
    blurb: "Paved roads, self-service, and hiding the machinery on purpose.",
    concepts: [
      concept("devops-vs-platform-vs-sre", "DevOps vs Platform vs SRE", "DevOps is a culture. Platform is a product. SRE is reliability as engineering.", "Teams fail when they treat these as job titles for the same work.", "Coach vs road-builder vs crash investigator."),
      concept(
        "internal-developer-platform",
        "Internal developer platform",
        "The product your engineers use to ship.",
        "If it needs a ticket, it is not self-service yet.",
        "An internal Apple Store for infrastructure.",
        {
          simulationId: "platform",
          beginnerRefs: [
            ref("CNCF Platforms White Paper", "https://tag-app-delivery.cncf.io/whitepapers/platforms/", "CNCF"),
            ref("What is Backstage?", "https://backstage.io/docs/overview/what-is-backstage/", "Backstage"),
          ],
          technicalRefs: [
            ref("Team Topologies — key concepts", "https://teamtopologies.com/key-concepts", "Team Topologies"),
          ],
        },
      ),
      concept("platform-api", "Platform API", "A stable interface over Terraform, Kubernetes, and CI.", "The UI is optional. The API is the platform.", "A service desk with a contract."),
      concept("self-service", "Self-service", "A developer can get a path without a human in the loop.", "This is the difference between a team and a bottleneck.", "A vending machine, not a waiter."),
      concept("golden-path", "Golden path", "The blessed way to build a service here.", "Opinionated defaults beat infinite flexibility.", "The paved trail with railings."),
      concept("templates", "Templates", "Cookie-cutters that mint a new service onto the golden path.", "Day 1 consistency is cheaper than day 400 cleanup.", "A starter house plan."),
      concept("service-catalog", "Service catalog", "An inventory of what exists and who owns it.", "You cannot operate what you cannot find.", "A phone book of systems."),
      concept("developer-portal", "Developer portal", "The UI on top of catalog, docs, and templates.", "Backstage is one implementation of this idea.", "The lobby of the platform."),
      concept("policy", "Policy", "Guardrails encoded as checks, not wiki pages.", "If it is not enforced, it is folklore.", "The building code."),
      concept("infrastructure-abstraction", "Infrastructure abstraction", "Developers ask for a database, not a subnet + SG + RDS + secret.", "The platform still creates those — they just stop being the UI.", "Ordering “a kitchen,” not every pipe."),
      concept("platform-team", "Platform team", "A product team whose customers are other engineers.", "They need UX, SLOs, and a roadmap — not a ticket queue.", "A small company inside the company."),
      concept("developer-experience", "Developer experience", "Time from idea to safe production.", "This is the metric. Tool count is not.", "How it feels to drive the paved road."),
      concept("paved-roads", "Paved roads", "Golden paths that are easier than the dirt road.", "Make the right thing the easy thing.", "Asphalt vs bushwhacking."),
      concept("multi-tenancy", "Multi-tenancy", "Many teams sharing one platform safely.", "Namespaces, quotas, and identity make this possible.", "One building, many companies."),
    ],
  },
  {
    id: "distributed-systems",
    number: "11",
    title: "Distributed Systems",
    shortTitle: "Distributed",
    blurb: "Copies, delays, and the lies we tell about “now.”",
    concepts: [
      concept("replication", "Replication", "Keeping copies of the same data on more than one machine.", "Machines die. Copies are how we pretend they do not.", "Carbon copies of a notebook."),
      concept("partitioning", "Partitioning", "Splitting data across machines by key.", "This is how you grow past one box.", "Sharding the notebook by last name."),
      concept("leader-follower", "Leader / follower", "One writer, many readers or standbys.", "Most databases you run look like this.", "One person with the pen."),
      concept("consensus-basics", "Consensus basics", "Agreeing on one value when nodes can fail or delay.", "etcd and Raft exist because majority votes beat hope.", "A committee that only acts with a quorum."),
      concept("ds-queues", "Queues", "Asynchronous handoff with buffering.", "They turn spikes into backlog instead of outages.", "An inbox between rooms."),
      concept("event-streams", "Event streams", "An ordered log many consumers can replay.", "Kafka is this idea at fleet scale.", "A shared black box recorder."),
      concept("caching", "Caching", "Serving a faster, possibly older copy.", "Every cache is a consistency decision.", "A sticky note of yesterday’s answer."),
      concept(
        "eventual-consistency",
        "Eventual consistency",
        "Copies converge later, not in the same millisecond.",
        "The delay is the lesson — not a bug if you chose it.",
        "Phone trees: the last house hears last.",
        {
          simulationId: "consistency",
          beginnerRefs: [
            ref("Read consistency", "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadConsistency.html", "AWS DynamoDB"),
            ref("Eventually Consistent", "https://www.allthingsdistributed.com/2008/12/eventually_consistent.html", "Werner Vogels"),
          ],
          technicalRefs: [
            ref("Designing Data-Intensive Applications", "https://dataintensive.net/", "Martin Kleppmann"),
          ],
        },
      ),
      concept("retries", "Retries", "Doing the same call again after failure.", "Networks flake. Blind retries amplify outages.", "Knocking again."),
      concept("backoff", "Backoff", "Waiting longer between retries.", "This is how you stop a retry storm.", "Knock, wait, knock slower."),
      concept("idempotency", "Idempotency", "Doing it twice has the same effect as once.", "Retries are only safe if this is true.", "A button that does not double-charge."),
      concept("circuit-breakers", "Circuit breakers", "Stop calling a sick dependency for a while.", "Fail fast, recover later.", "A fuse that opens."),
      concept("service-discovery", "Service discovery", "Finding current healthy instances by name.", "IPs change. Names should not.", "Asking the front desk who is on shift."),
    ],
  },
  {
    id: "ai-foundations",
    number: "12",
    title: "AI Foundations",
    shortTitle: "AI Foundations",
    blurb: "The infrastructure-relevant pieces of a language model. No math course.",
    concepts: [
      concept("model", "Model", "A large function that maps tokens to next-token probabilities.", "You operate it like software with unusually expensive hardware.", "A machine that finishes sentences."),
      concept("parameters", "Parameters", "The billions of numbers that define the function.", "Size drives VRAM, cost, and quality.", "The knobs, frozen after training."),
      concept("weights", "Weights", "The stored parameter tensors you load onto a GPU.", "A checkpoint is mostly these.", "The saved knobs on disk."),
      concept("tokenizer", "Tokenizer", "Splits text into the discrete tokens the model knows.", "Cost and context are counted here, not in words.", "A butcher cutting text into standard pieces."),
      concept("tokens", "Tokens", "The atoms of model I/O — pieces of words, punctuation, code.", "Billing, latency, and context windows are all token math.", "Lego bricks of language."),
      concept("embeddings", "Embeddings", "Vectors that place tokens in a space the model can compute on.", "Search and RAG start with this idea.", "Coordinates for meaning."),
      concept("context-window", "Context window", "How many tokens the model can attend to at once.", "Overflow is silent failure: it just forgets the front.", "The size of the desk."),
      concept(
        "inference",
        "Inference",
        "Running the trained model to produce new tokens.",
        "This is the production workload. Training is the factory.",
        "Using the machine, not building it.",
        {
          simulationId: "inference",
          beginnerRefs: [
            ref("What is inference?", "https://huggingface.co/docs/transformers/en/llm_tutorial", "Hugging Face"),
            ref("Let's build the GPT Tokenizer", "https://www.youtube.com/watch?v=zduSFxRajkE", "Andrej Karpathy"),
          ],
          technicalRefs: [
            ref("OpenAI tokenizer", "https://platform.openai.com/tokenizer", "OpenAI"),
          ],
        },
      ),
      concept("training-vs-inference", "Training vs inference", "Training updates weights. Inference uses them.", "Different hardware shape, duty cycle, and cost model.", "Building the engine vs driving the car."),
      concept("transformer", "Transformer (high level)", "A block that lets every token look at other tokens, then update.", "You do not need the paper to operate the serving stack — but you need this picture.", "A room where every word can hear every other word."),
      concept("checkpoint", "Model checkpoint", "A snapshot of weights (and sometimes optimizer state).", "This is what you version, scan, and roll forward.", "A save file."),
    ],
  },
  {
    id: "gpu-infrastructure",
    number: "13",
    title: "GPU Infrastructure",
    shortTitle: "GPUs",
    blurb: "Why these chips exist, and what they starve on.",
    concepts: [
      concept(
        "cpu-vs-gpu",
        "CPU vs GPU",
        "CPUs are few wide brains. GPUs are thousands of narrow ones.",
        "Matrix math wins on the second shape.",
        "A chef vs a factory of identical mixers.",
        {
          simulationId: "cpu-gpu",
          beginnerRefs: [
            ref("Making Deep Learning Go Brrrr", "https://horace.io/brrr_intro.html", "Horace He"),
            ref("GPU Performance Background", "https://docs.nvidia.com/deeplearning/performance/dl-performance-gpu-background/index.html", "NVIDIA"),
          ],
          technicalRefs: [
            ref("CUDA C++ Programming Guide", "https://docs.nvidia.com/cuda/cuda-c-programming-guide/", "NVIDIA"),
          ],
        },
      ),
      concept("gpu-core-concepts", "GPU core concepts", "SMs, warps, kernels, HBM.", "You schedule work in huge parallel chunks.", "A stadium doing the same wave."),
      concept("parallel-processing", "Parallel processing", "The same operation across a batch or a tensor.", "Utilization dies when the batch is too small.", "One recipe, a thousand bowls."),
      concept("cuda", "CUDA", "NVIDIA’s programming and runtime model for GPUs.", "Most ML software bottoms out here.", "The language the factory understands."),
      concept("gpu-memory", "GPU memory", "HBM sitting next to the cores.", "Moving bytes on and off the device is often the tax.", "The counter beside the mixers."),
      concept("vram", "VRAM", "The usual name for that on-device memory.", "Models and KV caches live here. Eviction is fatal to latency.", "The limited counter space."),
      concept("gpu-node", "GPU node", "A machine with one or more GPUs, a CPU, and a NIC.", "You schedule nodes, then devices.", "A kitchen station with special ovens."),
      concept("gpu-scheduling", "GPU scheduling", "Assigning jobs or pods to devices, sometimes sharing them.", "Kubernetes + device plugins make this visible as a resource.", "Who gets the oven this hour."),
      concept("batching", "Batching", "Running several sequences through one kernel.", "This is the first lever for tokens/sec.", "Baking a full sheet, not one cookie."),
      concept("tensor-parallelism", "Tensor parallelism", "Splitting one layer’s math across GPUs.", "Large models do not fit, or do not go fast enough, on one device.", "Several mixers on one batter."),
      concept("model-parallelism", "Model parallelism", "Splitting layers or shards across devices.", "Pipeline and tensor parallel are both this family.", "Different stations for different courses."),
      concept("memory-pressure", "Memory pressure", "VRAM demand approaching the ceiling.", "This is how 1000 users die even when FLOPs remain.", "The counter overflowing."),
      concept("utilization", "Utilization", "How busy the GPU actually is.", "A reserved GPU at 5% is a cost incident.", "Ovens on, nothing inside."),
    ],
  },
  {
    id: "model-serving",
    number: "14",
    title: "AI Model Serving",
    shortTitle: "Model Serving",
    blurb: "Turning a checkpoint into a reliable token stream.",
    concepts: [
      concept("inference-server", "Inference server", "A process that loads a model and serves generate() over a network.", "This is the application server of AI.", "A kitchen that only plates one menu."),
      concept(
        "vllm",
        "vLLM + GPU inference",
        "A serving engine built for high-throughput, memory-efficient generation.",
        "This is what “the GPU is the bottleneck” actually looks like as load climbs.",
        "A restaurant pass: tickets in, tokens out, one grill kept hot.",
        {
          simulationId: "gpu-inference",
          beginnerRefs: [
            ref("vLLM documentation", "https://docs.vllm.ai/", "vLLM"),
            ref("What is inference?", "https://huggingface.co/docs/transformers/en/llm_tutorial", "Hugging Face"),
          ],
          technicalRefs: [
            ref("vLLM GitHub", "https://github.com/vllm-project/vllm", "vLLM"),
            ref("NVIDIA inference", "https://docs.nvidia.com/deeplearning/triton-inference-server/user-guide/docs/index.html", "NVIDIA"),
          ],
        },
      ),
      concept("model-endpoint", "Model endpoint", "A stable URL in front of one or more replicas.", "Apps bind to this, not to a GPU UUID.", "The phone number for the kitchen."),
      concept("serving-batching", "Batching", "Grouping requests to fill the GPU.", "Static batches wait. That wait is latency.", "Baking a full sheet, not one cookie."),
      concept("continuous-batching", "Continuous batching", "Sequences join and leave a batch at iteration boundaries.", "This is why modern engines beat naive servers.", "Adding a ticket to a grill already cooking."),
      concept("kv-cache", "KV cache", "Stored attention keys/values so we do not recompute the prompt each token.", "It is the hidden memory cost of concurrency.", "Leaving mise en place on the counter."),
      concept("model-registry", "Model registry", "Versioned storage and metadata for checkpoints.", "You cannot roll back what you did not keep.", "The wine cellar with labels."),
      concept("model-gateway", "Model gateway", "Auth, routing, spend limits in front of many models.", "The platform’s control point.", "The host stand."),
      concept("serving-autoscaling", "Autoscaling", "Replicas from queue depth, tokens/sec, or GPU util.", "Scale on the scarce resource, not on CPU.", "Opening more grills when tickets pile up."),
      concept("serving-latency", "Latency", "Time to first token and time per token.", "Users feel TTFT. Capacity planners feel TPOT.", "How long until the first bite, then the pace."),
      concept("serving-throughput", "Throughput", "Tokens per second across the fleet.", "This is the economic metric.", "Plates per hour."),
      concept("tokens-sec", "Tokens/sec", "The unit both latency and cost collapse into.", "A GPU has a tokens/sec curve, not a request curve.", "The speedometer that actually matters."),
    ],
  },
  {
    id: "ai-platform-engineering",
    number: "15",
    title: "AI Platform Engineering",
    shortTitle: "AI Platform",
    blurb: "The whole stack: portal to GPU to traces.",
    concepts: [
      concept(
        "ai-developer-platform",
        "AI developer platform",
        "Self-service for models, evals, and endpoints.",
        "Same product idea as the IDP — new scarce resource.",
        "An internal store for model capability.",
        {
          simulationId: "ai-platform",
          beginnerRefs: [
            ref("OpenAI platform overview", "https://platform.openai.com/docs/overview", "OpenAI"),
            ref("Anthropic API overview", "https://docs.anthropic.com/en/api/overview", "Anthropic"),
          ],
          technicalRefs: [
            ref("CNCF Platforms White Paper", "https://tag-app-delivery.cncf.io/whitepapers/platforms/", "CNCF"),
          ],
        },
      ),
      concept("model-deployment", "Model deployment", "Checkpoint → serving replica → endpoint.", "This is apply(), for GPUs.", "Putting a new recipe on the line."),
      concept("gpu-fleet", "GPU fleet", "A pool of heterogeneous devices with quotas.", "Bin-packing and fragmentation are the daily work.", "A hangar of specialized ovens."),
      concept("inference-gateway", "Inference gateway", "The shared front door for every model call.", "Policy and cost live here.", "Customs for prompts."),
      concept("ai-model-registry", "Model registry", "The catalog of what may run.", "Promotion between stages belongs here.", "An approved menu."),
      concept("k8s-gpu-scheduling", "Kubernetes GPU scheduling", "Extended resources, device plugins, sometimes DRA.", "Pods request nvidia.com/gpu — placement does the rest.", "The assignment board with oven icons."),
      concept("model-observability", "Model observability", "Tokens, latency, quality, and GPU signals together.", "A 200 OK can still be a bad answer.", "Tasting plus the ticket times."),
      concept("ai-cost-management", "AI cost management", "Attribution by team, model, and token.", "GPUs do not forgive unused reservations.", "The check, itemized."),
      concept("model-routing", "Model routing", "Pick a model (or a cascade) per request.", "Not every prompt needs the largest brain.", "Sending simple tickets to the prix fixe."),
      concept("ai-autoscaling", "Autoscaling", "Scale replicas and maybe scale to zero.", "Cold starts on big models are the tax.", "Dark kitchens that wake when tickets arrive."),
      concept("prompt-observability", "Prompt / request observability", "Trace the prompt, tools, and tokens without leaking secrets.", "You cannot debug an agent from CPU graphs.", "A redacted ticket history."),
      concept("ai-reliability", "Reliability", "Timeouts, fallbacks, budgets for a non-deterministic backend.", "SLOs still apply. The variance is just wider.", "A kitchen that still seats guests when one grill dies."),
      concept("multi-model-infrastructure", "Multi-model infrastructure", "Many checkpoints, one control plane.", "This is the end state of an AI platform.", "One dining room, many kitchens."),
    ],
  },
  {
    id: "agentic-infrastructure",
    number: "16",
    title: "Agentic Infrastructure",
    shortTitle: "Agents",
    blurb: "Reasoning is not action. The platform must keep them apart.",
    concepts: [
      concept(
        "ai-agent",
        "AI agent",
        "A loop that uses a model to choose actions toward a goal.",
        "Reasoning is not action. The platform must keep them apart.",
        "An intern who can think — and a manager who decides whether they may touch the cluster.",
        {
          simulationId: "agent",
          beginnerRefs: [
            ref("MCP specification", "https://modelcontextprotocol.io/", "MCP"),
            ref("OpenTelemetry for LLMs", "https://opentelemetry.io/docs/specs/semconv/gen-ai/", "OpenTelemetry"),
          ],
          technicalRefs: [
            ref("Function calling", "https://platform.openai.com/docs/guides/function-calling", "OpenAI"),
            ref("MCP authorization", "https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization", "MCP"),
          ],
        },
      ),
      concept("reasoning-loop", "Reasoning loop", "Observe → think → act → observe.", "The loop is the program. The model is one step inside it.", "A plan-do-check cycle."),
      concept("tools", "Tools", "APIs the agent is allowed to call.", "Capability is defined here, not in the prompt poetry.", "The intern’s badge-activated doors."),
      concept("function-calling", "Function calling", "The model returns a structured tool request instead of prose.", "This is how thought becomes a typed action.", "Filling a work order, not chatting."),
      concept("mcp", "MCP", "A standard way to expose tools and context to models.", "The USB-C of agent tooling — still needs auth.", "A common plug for tools."),
      concept("agent-runtime", "Agent runtime", "The process that hosts the loop, memory, and tool calls.", "Do not let the model talk to prod without this layer.", "The intern’s manager."),
      concept("agent-memory", "Memory", "State the loop keeps across steps or sessions.", "Unbounded memory is a leak and a safety hole.", "A notebook — with a shredder."),
      concept("tool-permissions", "Tool permissions", "Which tools, on which resources, for which identity.", "This is IAM for actions the model proposed.", "A badge that does not open payroll."),
      concept("identity", "Identity", "Who the agent is acting as.", "Audit and least privilege start with a real principal.", "A named intern, not “the model.”"),
      concept("agent-gateway", "Agent gateway", "Policy, identity, and tracing in front of agent runs.", "Treat it like an API gateway for intentions.", "Security at the thinking door."),
      concept("evaluations", "Evaluations", "Tests for behavior, not just token likelihood.", "Agents regress in ways unit tests miss.", "Mystery shoppers for the intern."),
      concept("agent-tracing", "Tracing", "Spans for thoughts, tool calls, and observations.", "You must see the difference between a thought and a DELETE.", "A camera on both the notebook and the keyboard."),
      concept("guardrails", "Guardrails", "Checks before and after actions.", "The model will eventually try something dumb.", "A second adult in the room."),
      concept("multi-agent-systems", "Multi-agent systems", "Several loops coordinating, often through messages.", "You just built a distributed system with extra entropy.", "A committee of interns — still needs a manager."),
    ],
  },
];

export const flagshipHrefs = [
  {
    href: "/learn/networking/dns",
    title: "DNS resolution",
    section: "03 Networking",
    line: "A name becomes an address by walking a hierarchy — not by magic.",
  },
  {
    href: "/learn/networking/https",
    title: "TCP + TLS + HTTP",
    section: "03 Networking",
    line: "Opening a URL is four protocols stacked, not one.",
  },
  {
    href: "/learn/containers/container",
    title: "Container lifecycle",
    section: "05 Containers",
    line: "An image is a package. A container is a process on a shared kernel.",
  },
  {
    href: "/learn/kubernetes/deployment",
    title: "Kubernetes reconciliation",
    section: "08 Kubernetes",
    line: "desired=3, actual=2. The loop notices. A replacement appears.",
  },
  {
    href: "/learn/model-serving/vllm",
    title: "LLM GPU inference",
    section: "14 Model Serving",
    line: "Raise the load. Watch which resource hits the wall first.",
  },
  {
    href: "/learn/computer-foundations/processes",
    title: "Running a program",
    section: "01 Foundations",
    line: "A file becomes a PID, then a thread, then a syscall — then it exits.",
  },
  {
    href: "/learn/linux/pipes",
    title: "ls | grep api",
    section: "02 Linux",
    line: "Two processes. One kernel buffer. That is a pipe.",
  },
  {
    href: "/learn/cloud/vpc",
    title: "VPC request path",
    section: "04 Cloud",
    line: "Public ALB. Private app. Private RDS. Toggle network vs security.",
  },
  {
    href: "/learn/iac/terraform",
    title: "Terraform plan / apply",
    section: "06 IaC",
    line: "Change count 2 → 3. Watch it calculate +1 create — not a rebuild.",
  },
  {
    href: "/learn/observability/opentelemetry",
    title: "One request, three signals",
    section: "09 Observability",
    line: "Metrics count it. Logs describe it. The trace places it.",
  },
  {
    href: "/learn/agentic-infrastructure/ai-agent",
    title: "Agent reasoning vs action",
    section: "16 Agents",
    line: "Purple is thought. The cluster hop is the only side effect.",
  },
  {
    href: "/learn/git-cicd/pipeline",
    title: "CI/CD pipeline",
    section: "07 Git + CI/CD",
    line: "Commit becomes artifact, or a red light. Production pulls a digest.",
  },
  {
    href: "/learn/platform-engineering/internal-developer-platform",
    title: "Internal developer platform",
    section: "10 Platform",
    line: "A form becomes a repo, a pipeline, and a URL. The stack stays backstage.",
  },
  {
    href: "/learn/distributed-systems/eventual-consistency",
    title: "Eventual consistency",
    section: "11 Distributed",
    line: "Write west, read east. The stale 100 is the system working as designed.",
  },
  {
    href: "/learn/ai-foundations/inference",
    title: "Inference loop",
    section: "12 AI Foundations",
    line: "Tokenize, forward, sample, append. A reply is that loop, rented on a GPU.",
  },
  {
    href: "/learn/gpu-infrastructure/cpu-vs-gpu",
    title: "CPU vs GPU",
    section: "13 GPUs",
    line: "Eight identical tiles. The CPU walks them. The GPU takes them at once.",
  },
  {
    href: "/learn/ai-platform-engineering/ai-developer-platform",
    title: "AI developer platform",
    section: "15 AI Platform",
    line: "Portal to GPU to traces. The whole curriculum on one request.",
  },
] as const;

export function allConcepts() {
  return curriculum.flatMap((section) =>
    section.concepts.map((item) => ({ section, concept: item })),
  );
}

export function findConcept(sectionId: string, slug: string) {
  const section = curriculum.find((item) => item.id === sectionId);
  if (!section) return null;
  const item = section.concepts.find((concept) => concept.slug === slug);
  if (!item) return null;
  return { section, concept: item };
}

export function searchConcepts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return allConcepts().filter(({ section, concept }) => {
    const hay = `${section.title} ${section.shortTitle} ${concept.title} ${concept.what} ${concept.slug}`;
    return hay.toLowerCase().includes(q);
  });
}

export function findConceptBySlug(slug: string) {
  return allConcepts().find(({ concept }) => concept.slug === slug) ?? null;
}

export function neighbors(sectionId: string, slug: string) {
  const list = allConcepts();
  const index = list.findIndex(
    ({ section, concept }) => section.id === sectionId && concept.slug === slug,
  );
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : null,
  };
}
