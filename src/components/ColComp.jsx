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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" class="text-primary w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
                </span>
              </button>
            </div>
          </div>
        );
    }
}

export default ColComp;