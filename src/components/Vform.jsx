import React from 'react'

function Vform() {
  return (
    <div className='w-full h-full'>
        <section class="bg-main font-jura">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <form action="#">
          <div class="grid gap-4 sm:grid-cols-1 sm:gap-6">
              <div class="sm:col-span-2">
              <input type="Title" class="block py-2.5 px-0 w-full text-lg text-primary bg-main border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="Verse Title" required />
              </div>
              <div>
                  <select id="category" class="block py-2.5 px-0 w-full text-lg text-primary bg-main border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                      <option selected="">Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                  </select>
              </div>
              <div class="sm:col-span-2">
                <label for="description" class="block mb-2 text-lg font-medium text-primary dark:text-white">Verse</label>
                  <textarea id="description" rows="8" class="block p-2.5 w-full text-sm text-primary bg-secondary rounded-lg border border-main focus:ring-secondary focus:border-secondary " placeholder="Your description here"></textarea>
              </div>
          </div>
          <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-lg font-medium text-center text-primary bg-secondary rounded-lg hover:bg-main">
              Add Verse
          </button>
      </form>
  </div>
</section>
    </div>
  )
}

export default Vform