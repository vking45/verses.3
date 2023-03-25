import React from "react";

class ColComp extends React.Component {
    render() {
        return(
            <div class="p-4 lg:w-1/3">
            <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">{this.props.title}</h1>
              <p class="leading-relaxed text-primary mb-3">{this.props.desc}</p>
              <a class="text-indigo-400 inline-flex text-loki items-center">Verses
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
              <button class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
                <span class="text-gray-500 inline-flex items-center leading-none text-sm">
                <button type="button" class="inline-flex text-primary bg-thor hover:bg-loki border border-thor font-jura font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2">Subscribe
              <div className="mx-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="inline-flex mx-1 w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>69</div>
</button>
                </span>
              </button>
            </div>
          </div>
        );
    }
}

export default ColComp;