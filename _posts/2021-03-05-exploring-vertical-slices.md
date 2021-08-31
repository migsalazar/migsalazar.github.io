---
layout: post
title: Exploring vertical slices in dotnet core
description: description
summary: summary
category: dotnet
tags: [dotnet, architecture, verticalslices, designpatterns]
---

> This article was originally published in [HTech Blog](https://dev.to/htech)

Talking about software architecture is complex, often due to the technical aspects but largely due to the fact that there's no single answer, rarely conclusions and always depends on the context.

Why it depends on the context? because it can contains a lot concerns; the strategy and business model, cost and time constraints, team capabilities and skills of each individual team-member, technologies/techniques and [their accidental complexity](https://en.wikipedia.org/wiki/No_Silver_Bullet), etc. So, our technical decisions might be biased by all of these things and will change our path toward desired state.

The fact is, [technical debt](https://en.wikipedia.org/wiki/Technical_debt) is inherent in software and this gives us enough reasons to look for answers and the best way to build software; even, when the reality [can be quite painful](https://hennyportman.wordpress.com/2021/01/06/review-standish-group-chaos-2020-beyond-infinity/).

## Our context

Recently at HTech, we started a project that aims to manage the features of other software products. From a *digital product* perspective, it could be categorized as a back-office software. For me, it represents a set of rules that acts as an interface of business rules from other products. Some considerations about our project are:

1. The interface rules -inside of our back-office software- of a specific product, must be built by the team that knows the business rules that the specific product has. This means that one team should be able to add functionality without fear of impacting the functionality of another team.
2. The team is variable depending on the their time and anyone could *select for development* a jira-issue and work on it.
3. From (1) and (2) it's likely that the work will be triggered in a bounded time, and there will be a lot of *commits* of multiple teams at the same time. *[Communication channels complexity here?](https://project-management.info/number-of-communication-channels-pmp-formula-calculator/)*
4. The functionalities are clearly independent from others and also this tasks are generally feature oriented.

# Software layers

Generally, in the software architecture space, what we're looking for is an appropriate component segregation. The traditional way is separate the software in *layers*, and we understand as "layer", as a segregation oriented to non-functional responsibilities; sometimes it's just in a logical and chaotic way; and at best, physical and orderly.


![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/21ugoaw79brlrzvefm3a.jpg)


The real struggle and non-trivial thing about layered architecture, is *how* this layers interact with each other. Some of the most popular software architecture approaches, and accepted in the community, are the concentric-like architectures. For example [hexagonal architecture](https://alistair.cockburn.us/hexagonal-architecture/), [onion architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/), [domain driven design](https://www.dddcommunity.org/), [clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), etcetera.

Something that these approaches have in common is that all of these are trying to keep the core/business layer (a.k.a domain) independent of frameworks and isolated from the rest of the layers. My *mental representation* of this looks like:


![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m2y8m8b4yo9uiox3qqdg.jpg)


In our backend, generally, we follow these approaches. Although I agree with this, it's true that for many contexts these approaches might not be suitable -or at least not from the beginning-. These architectures are usually complex by nature, they have rigid rules of [inversion of control](https://martinfowler.com/articles/injection.html), a lot of abstractions and in many cases they are unnecessary.

My aim here isn't to break with the [*separation of concerns*](https://en.wikipedia.org/wiki/Separation_of_concerns) -and other benefits that these approaches bring us- but given the conditions of our context, such as the fact that the team could be constantly rotating in a bounded time, I am looking for a way to reduce the learning curve that the concentric architectures has. But, at the same time, without losing the notion of the fact that the domain must be pushed toward the center and keeping [the ubiquitous language](https://martinfowler.com/bliki/UbiquitousLanguage.html).

# Vertical slices

The first time I heard the "vertical-slices" term was [in the agile world](https://en.wikipedia.org/wiki/Vertical_slice); and recently, I had the opportunity to listen [an online talk](https://www.youtube.com/watch?v=5kOzZz2vj2o) by Jimmy Bogard, who promotes an architecture oriented to vertical slices. Basically, his approach is in the following way:


![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3tet9a0m7dmic2d3xr4m.jpg)


The way he describes this is:

> When adding or changing a feature in an application, I'm typically touching many different "layers" in an application. I'm changing the user interface, adding fields to models, modifying validation, and so on. **Instead of coupling across a layer, we couple vertically along a slice. Minimize coupling between slices, and maximize coupling in a slice.**

So, We can assume that the separation by features can be done simply by organizing the code with the following structure:

```bash
|-- src
|   |-- OurProject.csproj
|   |-- Program.cs
|   |-- appsettings.json
|   |-- Feature1
|   |   |-- Controllers
|   |   |-- Services
|   |   |-- Models
|   |-- Feature2
|   |   |-- Controllers
|   |   |-- Services
|   |   |-- Models
|   |-- SharedLogic
|   |   |-- Services
|   |   |-- Models
```

However, the problem with this -and I have always seen with backend APIs- is that we tend to build a lot of [application/domain services](https://martinfowler.com/eaaCatalog/serviceLayer.html), something like this:


![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6kr0u8kfurpid63n4cg3.jpg)

This leads us to build a kind of *main service* that acts as an orchestrator in a typical procedural way; at other hand, this makes us lose notion of which service we need to use when adding new functionality and, even, where to physically locate that service. After a while it becomes chaotic, and indirectly causes, just to mention an example, that our domain entities become into [anemic domain models](https://www.martinfowler.com/bliki/AnemicDomainModel.html).

Given that, the need to have an intermediary that works as an orchestrator and avoid the use of domain and/or application services for this purpose. One way to solve this is through [the mediator pattern](https://refactoring.guru/design-patterns/mediator).


![Image from refactoring.guru](https://refactoring.guru/images/patterns/content/mediator/mediator.png)


At this point, we find [Mediatr](https://github.com/jbogard/MediatR), which is a library that implements the mediator pattern by decoupling the in-process sending of messages from handling messages. The approach, considering the organization by features, is given by the following way:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n42zockmz9bcmhnrik4e.jpg)

## Walkthrough

### Register handlers

First of all, assuming we are using ASP.NET Core and its built-in injection dependency pattern, we need to [configure the Mediatr dependencies](https://github.com/jbogard/MediatR/wiki#aspnet-core) to register our handlers:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddMediatR(typeof(Startup));
}
```

### Handlers

We can think that the Handlers acts -in some way- [as the Use Cases of clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). This is the entry point of our feature, from a business logic perspectie. A brief example:

```csharp
public static class GetBy
{
    public class Query : IRequest<Result>
    {
        public Guid Id { get; set; }
    }

    public class Result
    {
        public Order Order { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result>
    {
        public async Task<Result> Handle(Query query, CancellationToken cancellationToken)
        {
            // our logic here
        }
    }
}
```

As you notice, there are two nested classes: `Query` and `Result`. This two types are scoped under `GetBy` static class in order to -logically- structure the *use case* of our feature. That means, this isn't a generic input/output, this is only used in a specific case `GetBy`. With this, the inputs and outputs of our API are easily to identify and gives us more evident the use of [CQRS](https://martinfowler.com/bliki/CQRS.html) pattern -which by the way is [more like conceptual pattern rather than archiectural pattern](http://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/)-. 

But, What's CQRS?. From Greg Young's [post](http://codebetter.com/gregyoung/2010/02/16/cqrs-task-based-uis-event-sourcing-agh/):

> *CQRS is simply the creation of two objects where there was previously only one*. The separation occurs based upon whether the methods are a command or a query (the same definition that is used by Meyer in Command and Query Separation, a command is any method that mutates state and a query is any method that returns a value).

There are [some other libraries](https://github.com/BrighterCommand/Brighter) to implement this, even [from scratch](https://blogs.cuttingedge.it/steven/posts/2011/meanwhile-on-the-query-side-of-my-architecture/), but at this time I'm using the same Mediatr library, implementing `IRquest` and `IRequestHandler` interfaces.

These concerns (Querys/Commands, Handler and DTO's) can be written in the same file. However, I prefer *-but not for all cases-* to separate each of these into single files, namespaced by `static partial class`.

### Refactoring our controllers

Then, our controller methods will take the following form:

```csharp
// obvious code here omitted for brevity

public OurController(IMediator mediator)
    => _mediatr = mediator;

[HttpGet("{id}")]
public async Task<IActionResult> GetBy(GetBy.Query query)
    => Ok(await _mediatr.Send(query));

[HttpPost]
public async Task<IActionResult> Create(Create.Command command)
    => Ok(await _mediatr.Send(command));
```

*Take note that the goal here, is to turn the controller into a logic-agnostic component that just represent a set of input/outputs points for our api.*

With this approach, each vertical slice can decide how to manage their request/response:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/t6rc07osyas03akfgl9e.jpg)

### Pushing the domain

Under this organization, the important thing is to take care the growth of our Handlers. Is extremely important consider the capabilities of our team, to timely detect code-smells and push logic down into domain layer and out of Handlers. There are some code-smells that I consider are very likely to occur with this approach and we must bear in mind.

For example, this bad smells in logic and/or behavioral code:

- Large Class
- Long Method
- Duplicated Code
- Combinatorial Explosion
- Repeated Switches
- Feature Envy
- Conditional Complexity
- Inappropriate Intimacy
- Middle Man

We can use refactoring techniques that are [very well documented by Martin Fowler](https://refactoring.com/), such as:

- Extract Class
- Extract Subclass
- Extract Interface
- Extract Method
- Replace Method with Method Object
- Move Function
- Compose Method
- Inline function
- Replace parameter with Query

Eventually, if we're on the right way, the approach will take on a domain-centric style.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u90xo2sfgfbqtamyvkni.jpg)

Also, we can organize our input and output rules through pipelines around the core. This [pipelines can be implemented](https://github.com/jbogard/MediatR/wiki/Behaviors) with the same Mediatr library:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zl6n0avedjime10lizdf.jpg)

### So...

This approach will helps us, in addition to orchestrating certain logic, to be able to recognize what we must push to the domain or to external layers, without worrying at the beginning of our project. And, mainly, it can guide to the team to work on independent features without conflicts and minimize problems to identify how the architecture works.

My aim with this is to experiment another approach to organize our code and try to measure in order to find if this really brings productivity to the team; but, without losing sight of SOLID principles, keeping technical debt out and promoting refactoring as a daily practice.

*[WIP] The complete demo of this post [can be found here](https://github.com/migsalazar/vertialslice-demo)*

