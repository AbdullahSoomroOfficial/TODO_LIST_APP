export const cardString =  `<div class="card text-bg-primary mb-4" style="max-width: 18rem;">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col cardDate"></div>
                                        <div class="col text-end">
                                            <i class="fa-solid fa-pen-to-square mx-3" data-bs-toggle="modal" data-bs-target="#updateTask"></i>
                                            <i class="fa-solid fa-xmark"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                <h5 class="card-title mb-3 cardTitle"></h5>
                                </div>
                             </div>`
                                    // <p class="card-text cardDesc"></p>


export function convertStringToHTML(str, id) {
    const parser = new DOMParser();
    const parsedString = parser.parseFromString(str, 'text/html');
    parsedString.body.firstChild.setAttribute('id',id);
    return parsedString.body.firstChild;
}