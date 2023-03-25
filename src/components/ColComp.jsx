import React from "react";
import { Link } from "react-router-dom";
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs';
dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

class ColComp extends React.Component {
    render() {
        return(
            <div class="p-4 lg:w-1/3">
            <div class="h-full bg-thor bg-opacity-40 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h1 class="title-font sm:text-2xl text-xl font-medium text-primary mb-3">{this.props.title}</h1>
              <p class="leading-relaxed text-primary mb-3">{this.props.desc}</p>
              <Link to={`/collection/${this.props.id}/`} class="text-indigo-400 inline-flex text-loki items-center">Verses
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <div class="text-center mt-2 leading-none flex justify-center absolute left-0 w-full py-4">
                <span class="text-gray-500 inline-flex items-center leading-none text-sm">
                <button type="button" class="inline-flex text-primary bg-thor hover:bg-loki border border-thor font-jura font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2">Created On { dayjs.unix(this.props.date).format('ll') }
                </button>
                </span>
              </div>
            </div>
          </div>
        );
    }
}

export default ColComp;