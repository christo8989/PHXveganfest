# PHXveganfest

## Views
Html compiled from Jade.
Css compiled from sass.
I also have some bootstrap for the carousel.

## Javascript
Just regular javascript. I thought about using babel but the time constraints made it easier to just continue with regualar javascript.

## Build
I'm building with gulp. You can bring in the dev dependencies or look at the package.json file.
The actual build tasks are broken and I didn't have time to fix. I probably won't fix it on this project but I would like to fix it in my startup project.

## Deploy
For development purposes, I used surge to deploy to a development site. This was part of gulps process. I also have another project that sets this up for the developer if they run an init.sh script. It'll take in the development url as an argument and update the gulpfile automatically.

