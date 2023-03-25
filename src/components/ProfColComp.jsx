import React from "react";
import { Link } from "react-router-dom";

class ProfColComp extends React.Component {
    render() {
        return(
          <div className="h-screen w-screen">
            <div class="p-4 lg:w-1/3">
            <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">{this.props.title}</h1> <br />
              <p class="leading-relaxed text-primary mb-3">{this.props.desc.slice(0,99)}</p> <br />
              <Link to={`/collection/${this.props.id}/`} class="text-indigo-400 inline-flex text-loki items-center">Verses 
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link> <br />
            </div>
          </div>
          </div>
        );
    }
}

export default ProfColComp;