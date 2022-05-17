---
title: Introducing Depot — A faster way to build Docker images
description: We have spent a lot of time building and deploying Docker images.
publishedAt: '2022-01-01'
tags:
  - devops
  - docker
  - showdev
---

We have spent a lot of time building and deploying Docker images, as application developers packaging our applications into containers, or as platform engineers tasked with providing fast, stable build infrastructure for organizations.

Along the way, we have noticed a few common challenges: docker build can be slow. Optimizing for speed is tedious and many times brittle. Generally, CI providers aren't designed for container builds, and often are themselves the source of slow builds.

Today we are launching Depot in closed beta to solve all these problems and many more. Depot is a hosted container build service that provides blazing fast compute and persistent intelligent caching with zero configuration. It's the tool we wanted to use ourselves, and we're building it into the tool you've wanted as well!

## Why are Docker builds slow?

Being able to reuse previous work is what makes Docker builds fast. Knowing when you're able to reuse that cache, and managing the actual contents of the cache, are what make things slow.

Docker, and its modern engine BuildKit, have very rudimentary caching. They use the abstraction of layers to describe lines in a Dockerfile. If one layer of your image changes between two builds, the entire cache after that point gets invalidated. All future layers after that point must be built again.

There's a certain art to writing Dockerfiles that understand this layer caching. They can be quite simple for naive things. But there's a potential for subtle mistakes that can cause build times to explode. Gaining the expertise with these intricate details isn't something every developer on every team needs or wants to spend their time on. At the same time, these slow builds can affect productivity and developer happiness.

Optimizing builds for cache reuse is only the first challenge with Docker caching.

Managing large Docker build caches is the second painful challenge.

On a developer's laptop, Docker caches can take up gigabytes of disk space. That cache disk usage is duplicated on every teammate's laptop for every local build. So even if your coworker has already built the expensive Docker image, you have to re-build it yourself from scratch to use it on your machine.

To make matters worse, current CI systems restrict the amount of disk space you can have. So even if you do all the Docker best practices around caching, it may not even fit on disk. Or you have to manage the saving/loading of cache yourself, oftentimes negating any performance boost you would see.

## Introducing Depot: Our solution to all these problems

When we started working on Depot, we asked ourselves one question, what if all this was just handled for me?

We built Depot to address the pain we've felt with docker build over the years. Depot is a remote container build service where your builds are executed on our fast machines with persistent disks.

It consists of a few key elements that, when combined, make it easier to achieve consistently fast builds in CI and on local machines. Directly integrating with all of Docker's best caching mechanisms:

- Each build machine offers 4 CPUs, 8GB of memory, and 50GB of local SSD cache
- Builders run BuildKit, the most modern, advanced container builder engine
- All configuration, especially cache configuration, is fully managed with no effort on your part
- You can route builds to Depot from your existing CI provider or from your local machine

Depot builders come with a managed persistent SSD cache. They instantly launch new builds with all the basic and advanced Docker cache already loaded in mere seconds. We support any optimizations you've made to your Dockerfile out of the box.

Our fleet of builders come with more CPUs and disk space than many generic CI providers offer. So both cached and uncached builds can be quick. Some of our early adopters have seen speedups of 11x!

Depot is fully compatible with the existing ecosystem of container tooling. Builders run the latest version of BuildKit to support Docker, OCI, and any other available BuildKit output formats. Our CLI is a drop-in replacement for docker build, so adoption can often be as simple as switching to depot build in your existing CI workflow:

```diff
- run: docker build -t ...
+ run: depot build -t ...
```

Another cool thing about Depot is that, as a remote build service, time savings from caching is shared. Since depot build works in CI and on your laptop, everyone gets to use the same cache! If your coworker already built that slow image, your build will automatically detect this and just download the result. If you've already built your image on your machine before opening a pull request, your CI build might be almost instantaneous after the file hashes are checked!

## One more thing...

With the rise in popularity of Arm CPUs, for instance, Apple M1, AWS Graviton, and Azure Ampere, it's becoming difficult to build Docker images on Intel CPUs for Arm targets, or vice versa. Very few CI providers offer Arm runners at all. And it can be especially difficult if you need to build multi-platform images that support both architectures in a single tag.

**Depot supports both Intel (amd64) and Arm (arm64) builds natively, without emulation.**

When you run depot build, we detect the architecture of your machine and route your build to a builder of the same architecture. You can directly route your build to another target architecture with the `--platform` CLI flag. And we support multi-platform images built in a single pass with `--platform` `linux/amd64`, `linux/arm64`!

You can find more info about multi-platform builds [in our documentation](https://depot.dev/docs/guides/arm-containers).

## Join our closed beta

This is the first iteration of Depot, and we're excited to launch it into the world! We are currently in closed beta and are very excited to get all the feedback we can get. If you want to give Depot a try during this beta phase, please [sign up](https://depot.dev/sign-up) for an account or [contact us](https://mailto:contact@depot.dev/) with any questions and we will set you up!

We look forward to making builds faster for everyone!
