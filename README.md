## Getting Started

First, install dependencies:
```bash
npm install
# or
yarn
```


run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## File structure

You'll be spending most of your time developing inside the "src" directory.

### Pages

A file in pages corresponds to a page. Next.js automatically parses this directory to determine routing. Therefore,
/pages/index.tsx corresponds to "/". /pages/api corresponds to "/api". /pages/[id] corresponds to "/[id]".

A page should not have much logic in it. It should pretty much only render the corresponding container and nothing else. In some cases you might want to get the router query ids in this layer and pass it on to the containers, but you should not make service calls in this layer.

### Containers

A file in containers corresponds to a single file in pages. Containers should be smart in the sense that they are making data requests and service calls. Containers compose components together to create the view for a page.


### Components

These are, well, components that are meant to be reused and extended. Take a look at EventFlags and see how WhenEventFlag is composed of GenericEventFlag. 

Components should be "dumb". In other words, they should not make data requests and service calls. If you want an event object, have it as a prop that is passed in, and have the container that uses the component to get the event object from the backend and pass it down.

Components should not have margins. If a component A uses component B and C and wants to have spacing between B and C, we should *never* have component B and C have margins to do this. We should instead make use of flexboxs with space between in component A. Having margins in components leads to unpredictable behaviour when we reuse them in various scenarios.

### Constants

This is where constants are defined. For sizes, colours, etc. This standarizes the UI so that we can define our own colour scheme. In addition data constants should be here too. If the number of event types keep increasing, we can instead store this as an array in the constants.

### Services

This is where the frontend does communication with the outside world. The event file contains code for CRUD requests to the backend for events. It returns a promise that containers that call it should resolve. In the future if we integrate Google Analytics or other services, we should place the api request code here.

## Styles

Since we are using tailwindcss, this folder is pretty empty. However in the future as we move away from tailwindcss, we should have css style files for each component and container.

## SVG

Define SVG's you want to use here. Remember to create a component that wraps the SVG so we can use it as a component

## Utils

Commonly used functions


### Considerations

If you ever realize that you are drilling props several components down, it might be time to look into useContext or Redux. This should be easy to do by adding a StoreProvider around a page.