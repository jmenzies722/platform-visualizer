# Platform Visualizer

A visual learning platform for infrastructure. Concepts are taught by watching systems change over time — not by reading a course.

Beginner → Platform Engineer → AI Platform Engineer.

## What is live

Seventeen live simulations. Every one of the 16 sections has a flagship you can play.

1. **DNS resolution** — `/learn/networking/dns`
2. **TCP + TLS + HTTP** — `/learn/networking/https`
3. **Docker container lifecycle** — `/learn/containers/container`
4. **Kubernetes reconciliation** — `/learn/kubernetes/deployment`
5. **LLM GPU inference** — `/learn/model-serving/vllm`
6. **Running a program** — `/learn/computer-foundations/processes`
7. **ls | grep api** — `/learn/linux/pipes`
8. **VPC request path** — `/learn/cloud/vpc`
9. **Terraform plan / apply** — `/learn/iac/terraform`
10. **One request, three signals** — `/learn/observability/opentelemetry`
11. **Agent reasoning vs action** — `/learn/agentic-infrastructure/ai-agent`
12. **CI/CD pipeline** — `/learn/git-cicd/pipeline`
13. **Internal developer platform** — `/learn/platform-engineering/internal-developer-platform`
14. **Eventual consistency** — `/learn/distributed-systems/eventual-consistency`
15. **Inference loop** — `/learn/ai-foundations/inference`
16. **CPU vs GPU** — `/learn/gpu-infrastructure/cpu-vs-gpu`
17. **AI developer platform** — `/learn/ai-platform-engineering/ai-developer-platform`

Unbuilt concepts still show a reserved “Simulation coming next” state. No fake diagrams.

## Teach it like a video

On a live simulation:

- **Play / Pause / Restart / Prev / Next**
- **Speed** 0.5x · 1x · 2x
- **Auto Explain** captions as events fire
- **Teach mode** (or `F`) hides chrome so you can record
- **Space**, arrow keys, `R`, `1/2/3` for playback

Click any node to open the inspector.

Terraform: toggle desired instance count 2 → 3 and watch the plan.
Cloud: switch Request flow / Network boundaries / Security boundaries.
GPU: raise concurrent requests 10 → 100 → 1000.

## Stack

Next.js, TypeScript, Tailwind CSS, Motion, Lucide. Simulations are data: nodes, edges, steps, events. The canvas is a reusable engine, not a one-off diagram per page.

## Develop

```bash
pnpm install
pnpm dev
```

```bash
pnpm build
```
